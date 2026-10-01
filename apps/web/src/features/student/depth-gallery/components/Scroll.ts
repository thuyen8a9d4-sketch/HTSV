import { MathUtils, type PerspectiveCamera } from 'three';
import type { Gallery } from './Gallery';

export class Scroll {
  private camera: PerspectiveCamera;
  private gallery: Gallery;

  scrollTarget = 0;
  scrollCurrent = 0;
  scrollSmoothing = 0.08;
  scrollToWorldFactor = 0.01;
  wheelScrollSpeed = 1;
  touchScrollSpeed = 1.8;
  previousScrollCurrent = 0;
  invertScroll = false;

  rawVelocity = 0;
  velocity = 0;
  velocityDamping = 0.12;
  velocityMax = 1.5;
  velocityStopThreshold = 0.0001;

  useScrollBounds = true;
  firstPlaneViewOffset = 5;
  lastPlaneViewOffset = 4;
  minCameraZ = -Infinity;
  maxCameraZ = Infinity;
  cameraStartZ = 6;

  private touchY = 0;
  private isBound = false;

  private isScrollableOrInteractive(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest(
        'dialog, .glass-modal, .glass-drawer, .bottom-nav, .liquid-glass-nav-container, .student-utilities-shortcut, button, input, textarea, select, a, [role="dialog"], #home-content-section'
      )
    );
  }

  private onWheel = (event: WheelEvent) => {
    if (this.isScrollableOrInteractive(event.target) || window.scrollY > 10) {
      return;
    }
    const normalizedDelta = this.normalizeWheelDelta(event) * this.wheelScrollSpeed;
    const maximumScroll = this.scrollFromCameraZ(this.minCameraZ);

    if (this.scrollCurrent >= maximumScroll - 0.5 && normalizedDelta > 0) {
      const contentEl = document.getElementById('home-content-section');
      if (contentEl && window.scrollY < 20) {
        contentEl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    event.preventDefault();
    this.addScrollInput(normalizedDelta);
  };

  private onTouchStart = (event: TouchEvent) => {
    if (this.isScrollableOrInteractive(event.target) || window.scrollY > 10) {
      this.touchY = 0;
      return;
    }
    this.touchY = event.touches[0]?.clientY ?? 0;
  };

  private onTouchMove = (event: TouchEvent) => {
    if (this.isScrollableOrInteractive(event.target) || window.scrollY > 10) {
      return;
    }
    if (!this.touchY) return;

    const currentTouchY = event.touches[0]?.clientY ?? this.touchY;
    const deltaY = this.touchY - currentTouchY;
    const maximumScroll = this.scrollFromCameraZ(this.minCameraZ);

    if (this.scrollCurrent >= maximumScroll - 0.5 && deltaY > 0) {
      const contentEl = document.getElementById('home-content-section');
      if (contentEl && window.scrollY < 20) {
        contentEl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    event.preventDefault();
    this.addScrollInput(deltaY * this.touchScrollSpeed);
    this.touchY = currentTouchY;
  };

  constructor(camera: PerspectiveCamera, gallery: Gallery) {
    this.camera = camera;
    this.gallery = gallery;
  }

  init(container?: HTMLElement) {
    this.updateCameraBounds();
    this.cameraStartZ = this.maxCameraZ;
    this.camera.position.z = this.cameraStartZ;
    this.scrollTarget = 0;
    this.scrollCurrent = 0;
    this.previousScrollCurrent = 0;
    this.rawVelocity = 0;
    this.velocity = 0;

    this.bindEvents(container);
  }

  bindEvents(container?: HTMLElement) {
    if (this.isBound) return;
    const target = container || window;
    target.addEventListener('wheel', this.onWheel as EventListener, { passive: false });
    target.addEventListener('touchstart', this.onTouchStart as EventListener, { passive: true });
    target.addEventListener('touchmove', this.onTouchMove as EventListener, { passive: false });
    this.isBound = true;
  }

  updateCameraBounds() {
    const depthRange = this.gallery.getDepthRange();
    this.maxCameraZ = depthRange.nearestZ + this.firstPlaneViewOffset;
    this.minCameraZ = depthRange.deepestZ + this.lastPlaneViewOffset;

    if (this.minCameraZ > this.maxCameraZ) {
      this.minCameraZ = this.maxCameraZ;
    }
  }

  cameraZFromScroll(scrollAmount: number): number {
    return this.cameraStartZ - scrollAmount * this.scrollToWorldFactor;
  }

  scrollFromCameraZ(cameraZ: number): number {
    if (this.scrollToWorldFactor === 0) return 0;
    return (this.cameraStartZ - cameraZ) / this.scrollToWorldFactor;
  }

  private normalizeWheelDelta(event: WheelEvent): number {
    if (event.deltaMode === 1) return event.deltaY * 16;
    if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
    return event.deltaY;
  }

  addScrollInput(deltaY: number) {
    const scrollDirection = this.invertScroll ? -1 : 1;
    this.scrollTarget += deltaY * scrollDirection;
  }

  scrollToSlide(index: number) {
    if (!this.gallery.planes.length) return;
    const safeIndex = MathUtils.clamp(index, 0, this.gallery.planes.length - 1);
    const plane = this.gallery.planes[safeIndex];
    if (!plane) return;

    // Position camera just in front of plane
    const targetCameraZ = plane.position.z + 5;
    this.scrollTarget = this.scrollFromCameraZ(targetCameraZ);
  }

  private updateVelocity() {
    this.rawVelocity = this.scrollCurrent - this.previousScrollCurrent;
    this.velocity = MathUtils.lerp(this.velocity, this.rawVelocity, this.velocityDamping);
    this.velocity = MathUtils.clamp(this.velocity, -this.velocityMax, this.velocityMax);

    if (Math.abs(this.velocity) < this.velocityStopThreshold) {
      this.velocity = 0;
    }

    this.previousScrollCurrent = this.scrollCurrent;
  }

  update() {
    this.updateCameraBounds();
    this.scrollCurrent = MathUtils.lerp(
      this.scrollCurrent,
      this.scrollTarget,
      this.scrollSmoothing
    );

    if (this.useScrollBounds) {
      const minimumScroll = this.scrollFromCameraZ(this.maxCameraZ);
      const maximumScroll = this.scrollFromCameraZ(this.minCameraZ);

      this.scrollTarget = MathUtils.clamp(this.scrollTarget, minimumScroll, maximumScroll);
      this.scrollCurrent = MathUtils.clamp(this.scrollCurrent, minimumScroll, maximumScroll);
    }

    this.updateVelocity();

    const nextCameraZ = this.cameraZFromScroll(this.scrollCurrent);
    if (this.useScrollBounds) {
      this.camera.position.z = MathUtils.clamp(nextCameraZ, this.minCameraZ, this.maxCameraZ);
      return;
    }

    this.camera.position.z = nextCameraZ;
  }

  dispose() {
    window.removeEventListener('wheel', this.onWheel as EventListener);
    window.removeEventListener('touchstart', this.onTouchStart as EventListener);
    window.removeEventListener('touchmove', this.onTouchMove as EventListener);
    this.isBound = false;
  }
}
