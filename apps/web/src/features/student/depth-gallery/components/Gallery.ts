import {
  DoubleSide,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Texture,
  Vector2,
} from 'three';
import { galleryPlaneData, type GalleryPlaneItem } from '../data/galleryData';
import type { MoodBlendData, MoodColors } from './Background';

export interface PlaneBlendData {
  currentPlaneIndex: number;
  nextPlaneIndex: number;
  blend: number;
}

export class Gallery {
  planes: Mesh[] = [];
  private texturesBySource = new Map<string, Texture>();
  private planeGeometry: PlaneGeometry;

  planeGap = 5;
  desktopPlaneScale = 0.76;
  mobilePlaneScale = 0.44;
  mobileXSpreadFactor = 0;
  mobileBreakpoint = 768;
  planeConfig: GalleryPlaneItem[] = galleryPlaneData;

  parallaxAmountX = 0.16;
  parallaxAmountY = 0.08;
  parallaxSmoothing = 0.08;
  pointerTarget = new Vector2(0, 0);
  pointerCurrent = new Vector2(0, 0);

  breathTiltAmount = 0.045;
  breathScaleAmount = 0.03;
  breathSmoothing = 0.14;
  breathGain = 1.1;
  breathIntensity = 0;
  targetBreathIntensity = 0;

  gestureParallaxAmountY = 0.05;
  gestureParallaxSmoothing = 0.05;
  driftCurrent = 0;
  driftTarget = 0;

  planeFadeSmoothing = 0.14;

  private onPointerMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    this.pointerTarget.set(x, -y);
  };

  private onPointerLeave = () => {
    this.pointerTarget.set(0, 0);
  };

  constructor() {
    this.planeGeometry = new PlaneGeometry(3, 3);
  }

  setTextures(textures: Map<string, Texture>) {
    this.texturesBySource = textures;
  }

  getTextureSources(): string[] {
    return this.planeConfig.map((p) => p.textureSrc);
  }

  init(scene: Scene) {
    this.planes = [];

    this.planeConfig.forEach((plane, index) => {
      const texture = this.texturesBySource.get(plane.textureSrc) || null;
      const textureImage = texture?.image as HTMLImageElement | undefined;
      const aspectRatio =
        textureImage && textureImage.width > 0 && textureImage.height > 0
          ? textureImage.width / textureImage.height
          : 1;

      const fallbackColor = plane.fallbackColor || '#ffffff';
      const planeMaterial = new MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
        side: DoubleSide,
        transparent: true,
        depthWrite: false,
        opacity: index === 0 ? 1 : 0,
      });

      const planeMesh = new Mesh(this.planeGeometry, planeMaterial);
      planeMesh.userData = {
        basePosition: plane.position,
        baseColor: fallbackColor,
        accentColor: plane.accentColor || fallbackColor,
        backgroundColor: plane.backgroundColor || fallbackColor,
        blob1Color: plane.blob1Color || fallbackColor,
        blob2Color: plane.blob2Color || fallbackColor,
        label: plane.label,
        action: plane.action,
        aspectRatio,
      };

      scene.add(planeMesh);
      this.planes.push(planeMesh);
    });

    this.updatePlaneScale();
    this.layoutPlanes();
    this.bindPointerEvents();
  }

  private bindPointerEvents() {
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerleave', this.onPointerLeave, { passive: true });
  }

  private unbindPointerEvents() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerleave', this.onPointerLeave);
  }

  updatePlaneScale() {
    const isMobile = window.innerWidth <= this.mobileBreakpoint;
    const scale = isMobile ? this.mobilePlaneScale : this.desktopPlaneScale;

    this.planes.forEach((plane) => {
      const aspectRatio = (plane.userData.aspectRatio as number) || 1;
      plane.scale.set(scale * aspectRatio, scale, 1);
    });
  }

  layoutPlanes() {
    const isMobile = window.innerWidth <= this.mobileBreakpoint;
    const xSpread = isMobile ? this.mobileXSpreadFactor : 1;
    const yOffset = isMobile ? 0.20 : 0;

    this.planes.forEach((plane, index) => {
      const basePos = (plane.userData.basePosition as { x: number; y: number }) || { x: 0, y: 0 };
      plane.position.set(basePos.x * xSpread, basePos.y + yOffset, -index * this.planeGap);
    });
  }

  getDepthRange() {
    if (!this.planes.length) return { nearestZ: 0, deepestZ: 0 };
    const zPositions = this.planes.map((p) => p.position.z);
    return {
      nearestZ: Math.max(...zPositions),
      deepestZ: Math.min(...zPositions),
    };
  }

  getDepthProgress(cameraZ: number) {
    const { nearestZ, deepestZ } = this.getDepthRange();
    const span = nearestZ - deepestZ;
    if (span <= 0) return 0;
    return MathUtils.clamp((nearestZ - cameraZ) / span, 0, 1);
  }

  getActivePlaneIndex(cameraZ: number): number {
    if (!this.planes.length) return -1;
    const firstPlaneZ = this.planes[0].position.z;
    const planeGap = Math.max(this.planeGap, 0.0001);
    const sampledCameraZ = cameraZ - planeGap;
    const normalizedDepth = MathUtils.clamp(
      (firstPlaneZ - sampledCameraZ) / planeGap,
      0,
      this.planes.length - 1
    );
    return Math.round(normalizedDepth);
  }

  getMoodColorsByIndex(index: number): MoodColors | null {
    if (index < 0 || index >= this.planes.length) return null;
    const ud = this.planes[index].userData;
    return {
      background: ud.backgroundColor,
      blob1: ud.blob1Color,
      blob2: ud.blob2Color,
    };
  }

  getPlaneBlendData(cameraZ: number): PlaneBlendData | null {
    if (this.planes.length < 2) return null;

    const planeGap = Math.max(this.planeGap, 0.0001);
    const firstPlaneZ = this.planes[0].position.z;
    const lastPlaneIndex = this.planes.length - 1;
    const sampledCameraZ = cameraZ - planeGap;
    const normalizedDepth = MathUtils.clamp(
      (firstPlaneZ - sampledCameraZ) / planeGap,
      0,
      lastPlaneIndex
    );
    const currentPlaneIndex = Math.floor(normalizedDepth);
    const nextPlaneIndex = Math.min(currentPlaneIndex + 1, lastPlaneIndex);
    const blend = normalizedDepth - currentPlaneIndex;

    return {
      currentPlaneIndex,
      nextPlaneIndex,
      blend,
    };
  }

  getMoodBlendData(cameraZ: number): MoodBlendData | null {
    const blendData = this.getPlaneBlendData(cameraZ);
    if (!blendData) return null;

    const currentMood = this.getMoodColorsByIndex(blendData.currentPlaneIndex);
    const nextMood = this.getMoodColorsByIndex(blendData.nextPlaneIndex);
    if (!currentMood) return null;

    return {
      currentMood,
      nextMood,
      blend: blendData.blend,
    };
  }

  update(camera: PerspectiveCamera, scrollVelocity = 0) {
    // Pointer lerping for parallax
    this.pointerCurrent.lerp(this.pointerTarget, this.parallaxSmoothing);

    // Gesture drift
    this.driftTarget = MathUtils.clamp(scrollVelocity * 0.1, -1, 1);
    this.driftCurrent = MathUtils.lerp(this.driftCurrent, this.driftTarget, this.gestureParallaxSmoothing);

    // Breath calculation
    const time = performance.now() * 0.001;
    this.targetBreathIntensity = Math.abs(Math.sin(time * 0.8)) * this.breathGain;
    this.breathIntensity = MathUtils.lerp(this.breathIntensity, this.targetBreathIntensity, this.breathSmoothing);

    const isMobile = window.innerWidth <= this.mobileBreakpoint;
    const scaleFactor = isMobile ? this.mobilePlaneScale : this.desktopPlaneScale;
    const xSpread = isMobile ? this.mobileXSpreadFactor : 1;
    const yOffset = isMobile ? 0.20 : 0;

    // Blend data for smooth multi-plane cross-fading
    const blendData = this.getPlaneBlendData(camera.position.z);
    const currentPlaneIndex = blendData?.currentPlaneIndex ?? 0;
    const nextPlaneIndex = blendData?.nextPlaneIndex ?? 0;
    const blend = blendData?.blend ?? 0;

    // Plane updates
    this.planes.forEach((plane, index) => {
      const basePos = (plane.userData.basePosition as { x: number; y: number }) || { x: 0, y: 0 };
      const baseZ = -index * this.planeGap;

      // Parallax offset
      const px = basePos.x * xSpread + this.pointerCurrent.x * this.parallaxAmountX;
      const py = basePos.y + yOffset + this.pointerCurrent.y * this.parallaxAmountY + this.driftCurrent * this.gestureParallaxAmountY;

      plane.position.set(px, py, baseZ);

      // Breath tilt & scale
      const tilt = Math.sin(time + index) * this.breathTiltAmount * this.breathIntensity;
      plane.rotation.z = tilt;

      const aspectRatio = (plane.userData.aspectRatio as number) || 1;
      const breathScale = 1 + (this.breathIntensity - 0.5) * this.breathScaleAmount;
      plane.scale.set(scaleFactor * aspectRatio * breathScale, scaleFactor * breathScale, 1);

      // Smooth opacity based on blend data
      let targetOpacity = 0;
      if (index === currentPlaneIndex) {
        targetOpacity = 1 - blend;
      }
      if (index === nextPlaneIndex) {
        targetOpacity = Math.max(targetOpacity, blend);
      }

      const mat = plane.material as MeshBasicMaterial;
      mat.opacity = MathUtils.lerp(mat.opacity, targetOpacity, this.planeFadeSmoothing);
      plane.visible = mat.opacity > 0.01;
    });
  }

  dispose() {
    this.unbindPointerEvents();
    this.planes.forEach((plane) => {
      (plane.material as MeshBasicMaterial).dispose();
    });
    this.planeGeometry.dispose();
    this.texturesBySource.forEach((tex) => tex.dispose());
  }
}
