import { GaussianBlurPass, Pass } from 'postprocessing';
import {
  LinearFilter,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Texture,
  UnsignedByteType,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three';
import { BG_LAYER } from '../configs/XylophoneConfig';

export class FrostBackdropPass extends Pass {
  private renderTarget: WebGLRenderTarget;
  private blurredTarget: WebGLRenderTarget;
  private bgScene: Scene;
  private bgCamera: PerspectiveCamera;

  private blurPass: GaussianBlurPass;
  private blurMaterial: { scale: number };
  private blurInitialized = false;

  get blurredTexture(): Texture {
    return this.blurredTarget.texture;
  }

  set blurRadius(px: number) {
    this.blurMaterial.scale = px / 48;
  }

  constructor(scene: Scene, camera: PerspectiveCamera) {
    super('FrostBackdropPass');

    this.needsSwap = false;
    this.bgScene = scene;
    this.bgCamera = camera;

    const options = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
      colorSpace: SRGBColorSpace,
    };
    this.renderTarget = new WebGLRenderTarget(1, 1, options);
    this.renderTarget.texture.name = 'FrostBackdropSharp';
    this.blurredTarget = new WebGLRenderTarget(1, 1, options);
    this.blurredTarget.texture.name = 'FrostBackdropBlurred';

    this.blurPass = new GaussianBlurPass({ kernelSize: 35, iterations: 3, resolutionScale: 0.25 });
    this.blurMaterial = (this.blurPass as unknown as { blurMaterial: { scale: number } }).blurMaterial;
  }

  render(
    renderer: WebGLRenderer,
    _inputBuffer: WebGLRenderTarget | null,
    _outputBuffer: WebGLRenderTarget | null,
    _deltaTime?: number,
    _stencilTest?: boolean
  ): void {
    const prevTarget = renderer.getRenderTarget();
    const prevLayerMask = this.bgCamera.layers.mask;

    this.bgCamera.layers.set(BG_LAYER);

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.bgScene, this.bgCamera);

    this.bgCamera.layers.mask = prevLayerMask;
    renderer.setRenderTarget(prevTarget);

    if (!this.blurInitialized) {
      this.blurPass.initialize(renderer, true, UnsignedByteType);
      this.blurInitialized = true;
    }

    this.blurPass.render(renderer, this.renderTarget, this.blurredTarget);
  }

  setSize(width: number, height: number): void {
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    this.renderTarget.setSize(w, h);
    this.blurredTarget.setSize(w, h);
    this.blurPass.setSize(w, h);
  }

  dispose(): void {
    this.renderTarget.dispose();
    this.blurredTarget.dispose();
    this.blurPass.dispose();
    super.dispose();
  }
}
