import {
  ClampToEdgeWrapping,
  LinearFilter,
  Material,
  RawShaderMaterial,
  type RenderTargetOptions,
  SRGBColorSpace,
  type ShaderMaterialParameters,
  UnsignedByteType,
  WebGLRenderTarget,
} from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import blitFrag from '../shaders/postprocessing/blitFrag.glsl?raw';
import blitVert from '../shaders/postprocessing/blitVert.glsl?raw';
import { Properties } from '../utils/properties';

export class FBOHelper {
  static fsQuad: FullScreenQuad;
  static precisionPrefix = '';

  static init() {
    this.fsQuad = new FullScreenQuad();
    const precision = Properties.gl?.capabilities.precision || 'highp';
    this.precisionPrefix = `precision ${precision} float;\n`;
  }

  static render(material: Material, renderTarget: WebGLRenderTarget | null) {
    if (!Properties.gl || !this.fsQuad) return;

    this.fsQuad.material = material;
    Properties.gl.setRenderTarget(renderTarget);
    this.fsQuad.render(Properties.gl);
    Properties.gl.setRenderTarget(null);
  }

  static createRenderTarget(width: number, height: number, options?: RenderTargetOptions) {
    return new WebGLRenderTarget(width, height, {
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping,
      magFilter: LinearFilter,
      minFilter: LinearFilter,
      type: UnsignedByteType,
      anisotropy: 0,
      colorSpace: SRGBColorSpace,
      stencilBuffer: false,
      ...options,
    });
  }

  static createRawShaderMaterial(
    options: ShaderMaterialParameters & { vertexShaderPrefix?: string; fragmentShaderPrefix?: string }
  ) {
    const _options = {
      vertexShader: blitVert,
      fragmentShader: blitFrag,
      ...options,
    };

    _options.vertexShader =
      (_options.vertexShaderPrefix !== undefined ? _options.vertexShaderPrefix : this.precisionPrefix) +
      _options.vertexShader;

    _options.fragmentShader =
      (_options.fragmentShaderPrefix !== undefined ? _options.fragmentShaderPrefix : this.precisionPrefix) +
      _options.fragmentShader;

    delete _options.vertexShaderPrefix;
    delete _options.fragmentShaderPrefix;

    return new RawShaderMaterial(_options);
  }
}
