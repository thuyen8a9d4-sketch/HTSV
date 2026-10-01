import {
  MathUtils,
  type PerspectiveCamera,
  type Scene,
  Vector3,
} from 'three';
import { Trail } from './Trail';
import { TrailHeadParticles } from './TrailHeadParticles';
import type { Gallery } from './Gallery';
import type { Scroll } from './Scroll';

const FULL_CIRCLE_RADIANS = Math.PI * 2;

export class TrailController {
  readonly trail = new Trail();
  readonly trailHeadParticles = new TrailHeadParticles();
  private gallery: Gallery;
  private trailHeadPosition = new Vector3();
  private lastTime = performance.now();

  configuration = {
    isEnabled: true,
    pathSettings: {
      startXPosition: -0.96,
      startYPosition: -1.05,
      horizontalWidth: 3,
      horizontalCycles: 1.85,
      verticalAmplitude: 0.78,
      verticalCycles: 2.1,
      distanceAheadOfCamera: 1.65,
      baseDepthOffset: 4.78,
      depthSpan: 6.52,
      progressDepthOffset: -0.1,
    },
    responsiveSettings: {
      mobileBreakpoint: 768,
      mobileWidthScale: 0.35,
      mobileStartXOffset: 0.35,
    },
    pointSettings: {
      minimumPointCount: 14,
      maximumPointCount: 220,
      reverseLengthScale: 0.55,
      initialSeedPointCount: 10,
      initialSeedStepZ: 0.12,
      trimPerFrameForward: 4,
      trimPerFrameReverse: 32,
    },
    opacitySettings: {
      baseOpacity: 0.51,
      idleOpacityAtStart: 0.55,
      idleProgressThreshold: 0.01,
      startVisibilityBias: 0.1,
      edgeFadeStart: 0.04,
      edgeFadeEnd: 0.2,
      opacitySmoothing: 0.12,
    },
    visualSettings: {
      trailColor: '#f6f9ff',
      glowColor: '#7fd5ff',
      glowIntensity: 1.35,
      curveTension: 0.67,
      pointSmoothing: 0.53,
    },
    specialEffectsSettings: {
      showHeadParticles: true,
    },
    directionChangeEpsilon: 0.0005,
  };

  private runtimeState = {
    hasSeededInitialPoints: false,
    hasUserMovedFromStart: false,
    previousProgress: null as number | null,
    previousDirection: 0,
    currentOpacity: 0.51,
  };

  constructor(gallery: Gallery) {
    this.gallery = gallery;
    this.applyVisualSettings();
  }

  private applyVisualSettings() {
    const { visualSettings, opacitySettings } = this.configuration;
    this.trail.material.color.set(visualSettings.trailColor);
    this.trail.material.emissive.set(visualSettings.glowColor);
    this.trail.material.emissiveIntensity = visualSettings.glowIntensity;
    this.trail.material.opacity = opacitySettings.baseOpacity;
    this.trail.material.needsUpdate = true;
    this.trail.curveTension = visualSettings.curveTension;
    this.trail.pointSmoothing = visualSettings.pointSmoothing;
  }

  init(scene: Scene, camera: PerspectiveCamera) {
    scene.add(this.trail.object);
    scene.add(this.trailHeadParticles.object);
    this.seedInitialPoints(camera);
  }

  dispose() {
    this.trail.dispose();
    this.trailHeadParticles.dispose();
    this.runtimeState.hasSeededInitialPoints = false;
    this.runtimeState.hasUserMovedFromStart = false;
    this.runtimeState.previousProgress = null;
    this.runtimeState.previousDirection = 0;
  }

  update(camera: PerspectiveCamera | null, scroll: Scroll | null, time: number) {
    if (!camera) return;

    const deltaSeconds = Math.min(Math.max((time - this.lastTime) * 0.001, 0), 0.1);
    this.lastTime = time;

    this.trail.object.visible = this.configuration.isEnabled;
    this.trailHeadParticles.setEnabled(
      this.configuration.isEnabled && this.configuration.specialEffectsSettings.showHeadParticles
    );
    if (!this.configuration.isEnabled) return;

    const currentProgress = this.getProgress(camera, scroll);
    if (currentProgress > this.configuration.opacitySettings.idleProgressThreshold) {
      this.runtimeState.hasUserMovedFromStart = true;
    }

    const currentDirection = this.getDirection(currentProgress);
    const hasDirectionReversed =
      currentDirection !== 0 &&
      this.runtimeState.previousDirection !== 0 &&
      currentDirection !== this.runtimeState.previousDirection;

    this.updateLength(currentProgress, currentDirection || this.runtimeState.previousDirection);
    const trailHeadPosition = this.computeHeadPosition(camera.position.z, currentProgress);
    this.updateOpacity(currentProgress);

    if (hasDirectionReversed) {
      this.trail.reset();
      const restartLeadPosition = trailHeadPosition.clone();
      restartLeadPosition.z += currentDirection * this.configuration.pointSettings.initialSeedStepZ;
      this.trail.addPoint(restartLeadPosition);
    }

    this.trail.addPoint(trailHeadPosition);

    if (currentDirection !== 0) {
      this.runtimeState.previousDirection = currentDirection;
    }
    this.runtimeState.previousProgress = currentProgress;

    this.trailHeadParticles.update(
      deltaSeconds,
      trailHeadPosition,
      this.runtimeState.currentOpacity,
      true
    );
  }

  private getProgress(camera: PerspectiveCamera, scroll: Scroll | null): number {
    const scrollRange = (scroll?.maxCameraZ ?? 0) - (scroll?.minCameraZ ?? 0);

    if (Number.isFinite(scrollRange) && scrollRange > 0) {
      return MathUtils.clamp(
        ((scroll?.maxCameraZ ?? camera.position.z) - camera.position.z) / scrollRange,
        0,
        1
      );
    }

    const blend = this.gallery.getPlaneBlendData(camera.position.z);
    if (blend) {
      const lastIndex = Math.max(this.gallery.planes.length - 1, 1);
      return MathUtils.clamp((blend.currentPlaneIndex + blend.blend) / lastIndex, 0, 1);
    }

    return this.gallery.getDepthProgress(camera.position.z);
  }

  private computeHeadPosition(cameraZ: number, progress: number): Vector3 {
    const clampedProgress = MathUtils.clamp(progress, 0, 1);
    const { pathSettings, responsiveSettings } = this.configuration;
    const horizontalCycles = Math.max(pathSettings.horizontalCycles, 0.0001);
    const verticalCycles = Math.max(pathSettings.verticalCycles, 0.0001);
    const isMobile =
      typeof window !== 'undefined' && window.innerWidth <= responsiveSettings.mobileBreakpoint;
    const responsiveStartX =
      pathSettings.startXPosition + (isMobile ? responsiveSettings.mobileStartXOffset : 0);
    const responsiveWidth =
      pathSettings.horizontalWidth * (isMobile ? responsiveSettings.mobileWidthScale : 1);

    const x =
      responsiveStartX +
      Math.sin(clampedProgress * FULL_CIRCLE_RADIANS * horizontalCycles) * responsiveWidth;
    const y =
      pathSettings.startYPosition +
      Math.sin(clampedProgress * FULL_CIRCLE_RADIANS * verticalCycles) *
        pathSettings.verticalAmplitude;
    const depthProgress =
      pathSettings.progressDepthOffset + clampedProgress * (1 - pathSettings.progressDepthOffset);
    const z =
      cameraZ +
      pathSettings.distanceAheadOfCamera -
      (pathSettings.baseDepthOffset + depthProgress * pathSettings.depthSpan);

    this.trailHeadPosition.set(x, y, z);
    return this.trailHeadPosition;
  }

  private seedInitialPoints(camera: PerspectiveCamera) {
    if (this.runtimeState.hasSeededInitialPoints || !camera) return;

    const startPosition = this.computeHeadPosition(camera.position.z, 0).clone();
    for (
      let index = this.configuration.pointSettings.initialSeedPointCount;
      index >= 0;
      index -= 1
    ) {
      const seedPosition = startPosition.clone();
      seedPosition.z -= index * this.configuration.pointSettings.initialSeedStepZ;
      this.trail.addPoint(seedPosition);
    }

    this.runtimeState.hasSeededInitialPoints = true;
  }

  private getDirection(progress: number): number {
    if (this.runtimeState.previousProgress === null) return 0;
    const progressDelta = progress - this.runtimeState.previousProgress;
    if (Math.abs(progressDelta) <= this.configuration.directionChangeEpsilon) return 0;
    return Math.sign(progressDelta);
  }

  private updateLength(progress: number, direction: number) {
    const { pointSettings } = this.configuration;
    const lengthProgress = direction < 0 ? progress * pointSettings.reverseLengthScale : progress;

    this.trail.maxPoints = Math.round(
      MathUtils.lerp(
        pointSettings.minimumPointCount,
        pointSettings.maximumPointCount,
        MathUtils.clamp(lengthProgress, 0, 1)
      )
    );

    this.trail.maxTrimPerFrame =
      direction < 0 ? pointSettings.trimPerFrameReverse : pointSettings.trimPerFrameForward;
  }

  private updateOpacity(progress: number) {
    const { opacitySettings } = this.configuration;
    const startDistance = MathUtils.clamp(
      progress + opacitySettings.startVisibilityBias,
      0,
      1
    );
    const endDistance = 1 - progress;
    const closestEdgeDistance = Math.min(startDistance, endDistance);

    const edgeVisibility = MathUtils.smoothstep(
      closestEdgeDistance,
      opacitySettings.edgeFadeStart,
      opacitySettings.edgeFadeEnd
    );

    const startupVisibility =
      !this.runtimeState.hasUserMovedFromStart && progress <= opacitySettings.idleProgressThreshold
        ? opacitySettings.idleOpacityAtStart
        : 0;

    const visibility = Math.max(edgeVisibility, startupVisibility);
    const targetOpacity = opacitySettings.baseOpacity * visibility;

    this.runtimeState.currentOpacity = MathUtils.lerp(
      this.runtimeState.currentOpacity,
      targetOpacity,
      opacitySettings.opacitySmoothing
    );

    this.trail.material.opacity = this.runtimeState.currentOpacity;
  }
}
