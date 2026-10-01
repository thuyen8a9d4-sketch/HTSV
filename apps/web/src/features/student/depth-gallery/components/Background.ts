import {
  Color,
  MathUtils,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  type WebGLRenderer,
} from 'three';
import fragmentShader from '../shaders/fragment.glsl?raw';
import vertexShader from '../shaders/vertex.glsl?raw';

export interface MoodColors {
  background: string;
  blob1: string;
  blob2: string;
}

export interface MoodBlendData {
  currentMood: MoodColors;
  nextMood: MoodColors | null;
  blend: number;
}

export class Background {
  private scene = new Scene();
  private camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private material: ShaderMaterial;
  private mesh: Mesh;
  private geometry: PlaneGeometry;

  private backgroundColor = new Color('#fffaf0');
  private blob1Color = new Color('#fde047');
  private blob2Color = new Color('#fb923c');
  private nextBackgroundColor = new Color();
  private nextBlob1Color = new Color();
  private nextBlob2Color = new Color();

  private baseBlobRadius = 0.65;
  private secondaryBlobRadiusRatio = 0.78;
  private baseBlobStrength = 0.9;
  private depthToRadiusAmount = 0.08;
  private velocityToStrengthAmount = 0.1;

  private motionSmoothing = 0.1;
  private motionDepthProgress = 0;
  private motionVelocityIntensity = 0;
  private smoothedDepthProgress = 0;
  private smoothedVelocityIntensity = 0;

  private blobRadius = 0.65;
  private blobStrength = 0.9;
  private noiseStrength = 0.04;

  constructor() {
    this.geometry = new PlaneGeometry(2, 2);

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uBackgroundColor: { value: this.backgroundColor },
        uBlob1Color: { value: this.blob1Color },
        uBlob2Color: { value: this.blob2Color },
        uNoiseStrength: { value: this.noiseStrength },
        uBlobRadius: { value: this.blobRadius },
        uBlobRadiusSecondary: { value: this.blobRadius * this.secondaryBlobRadiusRatio },
        uBlobStrength: { value: this.blobStrength },
        uTime: { value: 0 },
        uVelocityIntensity: { value: 0 },
      },
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setMoodColors({ background, blob1, blob2 }: MoodColors) {
    if (background) this.backgroundColor.set(background);
    if (blob1) this.blob1Color.set(blob1);
    if (blob2) this.blob2Color.set(blob2);
    this.updateUniformColors();
  }

  setMoodBlend({ currentMood, nextMood, blend }: MoodBlendData) {
    if (!currentMood) return;

    const safeBlend = MathUtils.clamp(blend ?? 0, 0, 1);
    if (!nextMood || safeBlend <= 0) {
      this.setMoodColors(currentMood);
      return;
    }

    this.backgroundColor
      .set(currentMood.background)
      .lerp(this.nextBackgroundColor.set(nextMood.background), safeBlend);
    this.blob1Color
      .set(currentMood.blob1)
      .lerp(this.nextBlob1Color.set(nextMood.blob1), safeBlend);
    this.blob2Color
      .set(currentMood.blob2)
      .lerp(this.nextBlob2Color.set(nextMood.blob2), safeBlend);

    this.updateUniformColors();
  }

  private updateUniformColors() {
    if (!this.material) return;
    this.material.uniforms.uBackgroundColor.value = this.backgroundColor;
    this.material.uniforms.uBlob1Color.value = this.blob1Color;
    this.material.uniforms.uBlob2Color.value = this.blob2Color;
  }

  setMotionResponse({ depthProgress = 0, velocityIntensity = 0 }) {
    this.motionDepthProgress = MathUtils.clamp(depthProgress, 0, 1);
    this.motionVelocityIntensity = MathUtils.clamp(velocityIntensity, 0, 1);
  }

  private applyMotionToBlob() {
    this.blobRadius = this.baseBlobRadius + this.smoothedDepthProgress * this.depthToRadiusAmount;
    this.blobStrength = this.baseBlobStrength + this.smoothedVelocityIntensity * this.velocityToStrengthAmount;

    this.material.uniforms.uBlobRadius.value = this.blobRadius;
    this.material.uniforms.uBlobRadiusSecondary.value = this.blobRadius * this.secondaryBlobRadiusRatio;
    this.material.uniforms.uBlobStrength.value = this.blobStrength;
    this.material.uniforms.uVelocityIntensity.value = this.smoothedVelocityIntensity;
  }

  update(time: number) {
    this.smoothedDepthProgress = MathUtils.lerp(
      this.smoothedDepthProgress,
      this.motionDepthProgress,
      this.motionSmoothing
    );
    this.smoothedVelocityIntensity = MathUtils.lerp(
      this.smoothedVelocityIntensity,
      this.motionVelocityIntensity,
      this.motionSmoothing
    );

    this.applyMotionToBlob();
    this.material.uniforms.uTime.value = time;
  }

  render(renderer: WebGLRenderer) {
    renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
