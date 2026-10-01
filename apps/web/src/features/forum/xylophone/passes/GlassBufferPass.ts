import { Pass } from 'postprocessing';
import {
  LinearFilter,
  LinearSRGBColorSpace,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three';
import { GLASS_LAYER } from '../configs/XylophoneConfig';

export class GlassBufferPass extends Pass {
  private renderTarget: WebGLRenderTarget;
  private glassScene: Scene;
  private glassCamera: PerspectiveCamera;
  private normalMaterial: ShaderMaterial;
  private resolutionScale: number;

  get glassTexture(): Texture {
    return this.renderTarget.texture;
  }

  constructor(scene: Scene, camera: PerspectiveCamera, normalMaterial: ShaderMaterial, resolutionScale = 0.5) {
    super('GlassBufferPass');

    this.needsSwap = false;
    this.glassScene = scene;
    this.glassCamera = camera;
    this.normalMaterial = normalMaterial;
    this.resolutionScale = resolutionScale;

    this.renderTarget = new WebGLRenderTarget(1, 1, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
      colorSpace: LinearSRGBColorSpace,
    });
    this.renderTarget.texture.name = 'GlassBuffer';
  }

  render(
    renderer: WebGLRenderer,
    _inputBuffer: WebGLRenderTarget | null,
    _outputBuffer: WebGLRenderTarget | null,
    _deltaTime?: number,
    _stencilTest?: boolean
  ): void {
    const prevTarget = renderer.getRenderTarget();
    const prevClearAlpha = renderer.getClearAlpha();
    const prevOverride = this.glassScene.overrideMaterial;
    const prevLayerMask = this.glassCamera.layers.mask;

    this.glassCamera.layers.set(GLASS_LAYER);

    renderer.setRenderTarget(this.renderTarget);
    renderer.setClearAlpha(0);
    renderer.clear();

    this.glassScene.overrideMaterial = this.normalMaterial;
    renderer.render(this.glassScene, this.glassCamera);

    this.glassCamera.layers.mask = prevLayerMask;
    this.glassScene.overrideMaterial = prevOverride;
    renderer.setClearAlpha(prevClearAlpha);
    renderer.setRenderTarget(prevTarget);
  }

  setSize(width: number, height: number): void {
    const w = Math.max(1, Math.round(width * this.resolutionScale));
    const h = Math.max(1, Math.round(height * this.resolutionScale));
    this.renderTarget.setSize(w, h);
  }

  dispose(): void {
    this.renderTarget.dispose();
    super.dispose();
  }
}
