import { FloatType, type RenderTargetOptions, RGBAFormat, WebGLRenderTarget } from 'three';
import { FBOHelper } from './FBOHelper';

export class FBO {
  private fbo1: WebGLRenderTarget;
  private fbo2: WebGLRenderTarget;

  constructor(width: number, height: number, options?: RenderTargetOptions) {
    const config: RenderTargetOptions = {
      format: RGBAFormat,
      type: FloatType,
      generateMipmaps: false,
      depthBuffer: false,
      ...options,
    };

    this.fbo1 = FBOHelper.createRenderTarget(width, height, config);
    this.fbo2 = FBOHelper.createRenderTarget(width, height, config);
  }

  get read() {
    return this.fbo1;
  }

  get write() {
    return this.fbo2;
  }

  swap() {
    const temp = this.fbo1;
    this.fbo1 = this.fbo2;
    this.fbo2 = temp;
  }

  dispose() {
    this.fbo1.dispose();
    this.fbo2.dispose();
  }
}
