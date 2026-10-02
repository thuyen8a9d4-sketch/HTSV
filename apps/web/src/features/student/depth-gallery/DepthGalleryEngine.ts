import {
  MathUtils,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { Background } from './components/Background';
import { Gallery } from './components/Gallery';
import { Scroll } from './components/Scroll';
import { TrailController } from './components/TrailController';
import { galleryPlaneData, type GalleryPlaneItem } from './data/galleryData';

export type SlideChangeCallback = (index: number, item: GalleryPlaneItem) => void;

export class DepthGalleryEngine {
  private canvas: HTMLCanvasElement;
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera: PerspectiveCamera;

  readonly gallery: Gallery;
  readonly background: Background;
  readonly trailController: TrailController;
  readonly scroll: Scroll;

  private isRunning = false;
  private isDestroyed = false;
  private isReady = false;
  private isVisible = true;
  private observer: IntersectionObserver;
  private rafId = 0;
  private activeIndex = -1;

  onSlideChange?: SlideChangeCallback;

  private readonly boundResize = this.resize.bind(this);
  private readonly boundAnimate = this.animate.bind(this);
  private readonly syncPlayback = () => {
    if (this.isReady && this.isVisible && !document.hidden) this.start();
    else this.stop();
  };

  constructor(canvas: HTMLCanvasElement, onSlideChange?: SlideChangeCallback) {
    this.canvas = canvas;
    this.onSlideChange = onSlideChange;

    const width = canvas.clientWidth || window.innerWidth || 1;
    const height = canvas.clientHeight || window.innerHeight || 1;

    this.camera = new PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 6);

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 2));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.autoClear = false;

    this.background = new Background();
    this.gallery = new Gallery();
    this.trailController = new TrailController(this.gallery);
    this.scroll = new Scroll(this.camera, this.gallery);

    window.addEventListener('resize', this.boundResize, { passive: true });
    document.addEventListener('visibilitychange', this.syncPlayback);
    this.observer = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
      this.syncPlayback();
    });
    this.observer.observe(canvas);
  }

  async init() {
    // Preload textures
    const textureLoader = new TextureLoader();
    const textures = new Map<string, Texture>();

    await Promise.all(
      galleryPlaneData.map(async (plane) => {
        try {
          const tex = await textureLoader.loadAsync(plane.textureSrc);
          if (this.isDestroyed) { tex.dispose(); return; }
          tex.colorSpace = SRGBColorSpace;
          textures.set(plane.textureSrc, tex);
        } catch (err) {
          console.warn('Failed to load gallery texture:', plane.textureSrc, err);
        }
      })
    );

    if (this.isDestroyed) {
      textures.forEach((texture) => texture.dispose());
      return;
    }

    this.gallery.setTextures(textures);
    this.gallery.init(this.scene);
    this.trailController.init(this.scene, this.camera);
    this.scroll.init((this.canvas.parentElement as HTMLElement) || this.canvas);

    this.resize();

    // Initial mood setup
    const initialMood = this.gallery.getMoodBlendData(this.camera.position.z);
    if (initialMood) {
      this.background.setMoodBlend(initialMood);
    }

    this.isReady = true;
    this.syncPlayback();
  }

  start() {
    if (this.isRunning || this.isDestroyed) return;
    this.isRunning = true;
    this.animate();
  }

  private stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.rafId);
  }

  jumpToSlide(index: number) {
    this.scroll.scrollToSlide(index);
  }

  resize() {
    if (this.isDestroyed) return;
    const width = this.canvas.clientWidth || window.innerWidth || 1;
    const height = this.canvas.clientHeight || window.innerHeight || 1;
    if (width <= 0 || height <= 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 768 ? 1.25 : 2));
    this.renderer.setSize(width, height, false);
    this.gallery.updatePlaneScale();
    this.gallery.layoutPlanes();
  }

  private animate() {
    if (!this.isRunning || this.isDestroyed) return;
    this.rafId = requestAnimationFrame(this.boundAnimate);

    const time = performance.now();

    this.scroll.update();
    this.trailController.update(this.camera, this.scroll, time);
    this.gallery.update(this.camera, this.scroll.velocity);

    // Mood and motion response
    const planeBlendData = this.gallery.getPlaneBlendData(this.camera.position.z);
    const moodBlendData = this.gallery.getMoodBlendData(this.camera.position.z);
    if (moodBlendData) {
      this.background.setMoodBlend(moodBlendData);
    }

    const depthProgress = this.gallery.getDepthProgress(this.camera.position.z);
    const velocityIntensity = MathUtils.clamp(
      Math.abs(this.scroll.velocity) / Math.max(this.scroll.velocityMax, 0.0001),
      0,
      1
    );
    const blend = planeBlendData?.blend ?? 0;
    const distanceFromCenter = Math.abs(blend - 0.5) * 2;
    const transitionStability = MathUtils.smoothstep(distanceFromCenter, 0.35, 1);

    this.background.setMotionResponse({
      depthProgress,
      velocityIntensity: velocityIntensity * transitionStability,
    });
    this.background.update(time);

    // Active slide detection
    const currentActiveIndex = this.gallery.getActivePlaneIndex(this.camera.position.z);
    if (currentActiveIndex >= 0 && currentActiveIndex !== this.activeIndex) {
      this.activeIndex = currentActiveIndex;
      const currentItem = galleryPlaneData[currentActiveIndex];
      if (currentItem && this.onSlideChange) {
        this.onSlideChange(currentActiveIndex, currentItem);
      }
    }

    // Render both layers
    this.renderer.clear(true, true, true);
    this.background.render(this.renderer);
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;
    this.stop();
    this.observer.disconnect();
    document.removeEventListener('visibilitychange', this.syncPlayback);
    window.removeEventListener('resize', this.boundResize);

    this.scroll.dispose();
    this.trailController.dispose();
    this.gallery.dispose();
    this.background.dispose();
    this.renderer.dispose();
  }
}
