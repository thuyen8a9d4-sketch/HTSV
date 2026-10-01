import { EffectPass, RenderPass, SMAAEffect, SMAAPreset, SSAOEffect } from 'postprocessing';
import {
  DoubleSide,
  NoToneMapping,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import glassNormalFrag from './shaders/xylophone/glassNormalFrag.glsl?raw';
import xylophoneVert from './shaders/xylophone/xylophoneVert.glsl?raw';
import { FBOHelper } from './common/FBOHelper';
import { FluidSim } from './components/FluidSim';
import { Xylophone } from './components/Xylophone';
import { XylophoneBg } from './components/XylophoneBg';
import { FLUID, FROST, QUALITY, SSAO } from './configs/XylophoneConfig';
import { FrostBackdropPass } from './passes/FrostBackdropPass';
import { GlassBufferPass } from './passes/GlassBufferPass';
import { Input } from './utils/input';
import { Properties } from './utils/properties';
import { RAFCollection } from './utils/RAFCollection';

const MAX_DELTA = 1 / 20;

export class XylophoneEngine {
  private readonly gl: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera: PerspectiveCamera;

  private readonly xylophone = new Xylophone();
  private readonly xylophoneBg = new XylophoneBg();
  private readonly fluid: FluidSim;

  private readonly frostBackdropPass: FrostBackdropPass;
  private readonly renderPass: RenderPass;
  private readonly glassBufferPass: GlassBufferPass;
  private readonly glassNormalMaterial: ShaderMaterial;
  private readonly ssaoEffect: SSAOEffect;
  private readonly ssaoPass: EffectPass;
  private readonly aaPass: EffectPass;

  private size = { width: 0, height: 0 };
  private dateTime = performance.now();
  private isContextLost = false;
  private rafId = 0;
  private isDestroyed = false;

  private readonly boundUpdate = this.update.bind(this);
  private readonly boundResize = this.resize.bind(this);
  private readonly onVisibilityChange = () => {
    window.cancelAnimationFrame(this.rafId);
    if (!document.hidden && !this.isContextLost && !this.isDestroyed) {
      this.dateTime = performance.now();
      this.update();
    }
  };
  private readonly onContextLost = (event: Event) => {
    event.preventDefault();
    this.isContextLost = true;
    window.cancelAnimationFrame(this.rafId);
  };
  private readonly onContextRestored = () => {
    this.isContextLost = false;
    this.onVisibilityChange();
  };

  private createGlassNormalMaterial() {
    const u = this.xylophone.uniforms;

    return new ShaderMaterial({
      vertexShader: xylophoneVert,
      fragmentShader: glassNormalFrag,
      side: DoubleSide,
      uniforms: {
        u_time: u.u_time,
        u_spinSpeed: u.u_spinSpeed,
        u_swingScale: u.u_swingScale,
        u_swingAxis: u.u_swingAxis,
      },
    });
  }

  constructor(canvas: HTMLCanvasElement, initialDark = false) {
    Properties.viewportWidth = window.innerWidth;
    Properties.viewportHeight = window.innerHeight;

    this.gl = new WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    });
    this.gl.outputColorSpace = SRGBColorSpace;
    this.gl.toneMapping = NoToneMapping;
    this.gl.setPixelRatio(Properties.dpr);
    this.gl.setSize(window.innerWidth, window.innerHeight);

    Properties.gl = this.gl;
    Properties.composer.setRenderer(this.gl);

    this.camera = new PerspectiveCamera(45, Properties.viewportWidth / Math.max(1, Properties.viewportHeight), 0.1, 200);
    this.camera.position.set(0, 0, 5);

    Input.init();
    FBOHelper.init();

    this.scene.add(this.xylophone.group);
    this.scene.add(this.xylophoneBg.build());

    this.fluid = new FluidSim(FLUID);
    this.xylophone.setFluid(this.fluid.uniforms.velocity);

    this.frostBackdropPass = new FrostBackdropPass(this.scene, this.camera);
    this.frostBackdropPass.blurRadius = FROST.strength * FROST.maxBlurPx;
    this.xylophone.uniforms.u_tBackdrop.value = this.frostBackdropPass.blurredTexture;

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.glassNormalMaterial = this.createGlassNormalMaterial();
    this.glassBufferPass = new GlassBufferPass(
      this.scene,
      this.camera,
      this.glassNormalMaterial,
      QUALITY.glassBufferScale
    );
    this.ssaoEffect = new SSAOEffect(this.camera, this.glassBufferPass.glassTexture, SSAO);
    this.ssaoPass = new EffectPass(this.camera, this.ssaoEffect);
    this.aaPass = new EffectPass(
      this.camera,
      new SMAAEffect({ preset: QUALITY.isMobile ? SMAAPreset.MEDIUM : SMAAPreset.ULTRA })
    );

    for (const pass of [this.frostBackdropPass, this.renderPass, this.glassBufferPass, this.ssaoPass, this.aaPass]) {
      Properties.composer.addPass(pass);
    }

    this.resize();
    window.addEventListener('resize', this.boundResize);

    canvas.addEventListener('webglcontextlost', this.onContextLost);
    canvas.addEventListener('webglcontextrestored', this.onContextRestored);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.setTheme(initialDark);

    void this.xylophone.load();

    this.update();
  }

  setTheme(isDark: boolean) {
    this.xylophoneBg.setTheme(isDark);
    this.xylophone.setTheme(isDark);
  }

  resize() {
    if (this.isDestroyed) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.size.width === width && this.size.height === height) return;
    this.size = { width, height };

    Properties.viewportWidth = width;
    Properties.viewportHeight = height;
    Properties.globalUniforms.u_resolution.value.set(width * Properties.dpr, height * Properties.dpr);

    this.gl.setSize(width, height);
    Properties.composer.setSize(width, height);
    Input.resize();

    this.camera.aspect = width / Math.max(1, height);
    this.camera.updateProjectionMatrix();
  }

  private update() {
    if (this.isDestroyed || document.hidden || this.isContextLost) return;
    this.rafId = window.requestAnimationFrame(this.boundUpdate);

    const now = performance.now();
    const delta = Math.min((now - this.dateTime) / 1e3, MAX_DELTA);
    this.dateTime = now;

    Properties.deltaTime = delta;
    Properties.time += delta;
    Properties.globalUniforms.u_deltaTime.value = delta;
    Properties.globalUniforms.u_time.value = Properties.time;

    RAFCollection.forEach((callback) => callback(delta));
    this.xylophone.update(delta, this.camera);

    Properties.composer.render(delta);
    Input.postUpdate();
  }

  destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;
    window.cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.gl.domElement.removeEventListener('webglcontextlost', this.onContextLost);
    this.gl.domElement.removeEventListener('webglcontextrestored', this.onContextRestored);
    Input.destroy();

    for (const pass of [this.frostBackdropPass, this.renderPass, this.glassBufferPass, this.ssaoPass, this.aaPass]) {
      Properties.composer.removePass(pass);
      pass.dispose();
    }

    this.glassNormalMaterial.dispose();
    this.fluid.dispose();
    this.xylophone.dispose();
    this.xylophoneBg.dispose();
    Properties.composer.dispose();
    this.gl.dispose();
  }
}
