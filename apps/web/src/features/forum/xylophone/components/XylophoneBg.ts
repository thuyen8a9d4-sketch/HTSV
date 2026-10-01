import { Color, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import xylophoneBgFrag from '../shaders/xylophoneBg/xylophoneBgFrag.glsl?raw';
import xylophoneBgVert from '../shaders/xylophoneBg/xylophoneBgVert.glsl?raw';
import { BG_LAYER } from '../configs/XylophoneConfig';

export class XylophoneBg {
  readonly uniforms = {
    u_color: { value: new Color(0xdbeafe) },
    u_debugPattern: { value: 0 },
  };

  private mesh?: Mesh;
  private material?: ShaderMaterial;
  private geometry?: PlaneGeometry;

  setTheme(isDark: boolean) {
    if (isDark) {
      this.uniforms.u_color.value.setHex(0x14181f);
    } else {
      this.uniforms.u_color.value.setHex(0xdbeafe);
    }
  }

  build() {
    this.geometry = new PlaneGeometry(2, 2);
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: xylophoneBgVert,
      fragmentShader: xylophoneBgFrag,
      side: DoubleSide,
      depthTest: false,
      depthWrite: false,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.renderOrder = -1;
    this.mesh.frustumCulled = false;
    this.mesh.layers.enable(BG_LAYER);

    return this.mesh;
  }

  dispose() {
    this.geometry?.dispose();
    this.material?.dispose();
  }
}
