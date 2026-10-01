import {
  BufferGeometry,
  CanvasTexture,
  ClampToEdgeWrapping,
  DoubleSide,
  Euler,
  Group,
  LinearFilter,
  MathUtils,
  Mesh,
  PerspectiveCamera,
  Quaternion,
  Raycaster,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  Vector3,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modelUrl from '../../../../assets/models/xylophone-09.glb?url';
import xylophoneFrag from '../shaders/xylophone/xylophoneFrag.glsl?raw';
import xylophoneVert from '../shaders/xylophone/xylophoneVert.glsl?raw';
import { GLASS_LAYER, XYLOPHONE } from '../configs/XylophoneConfig';
import { Input } from '../utils/input';
import { Properties } from '../utils/properties';
import { buildInstancedGeometry, writeHelixTransforms, type BuiltGeometry } from './helix';
import { createHitWorkspace, hitBarIndex, type InstanceAttributes } from './picking';

function buildGradientTexture(): Texture {
  const width = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = 1;

  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, width, 0);
  grad.addColorStop(0.0, '#38bdf8'); // sky blue
  grad.addColorStop(0.25, '#2563eb'); // royal blue
  grad.addColorStop(0.5, '#7c3aed'); // purple
  grad.addColorStop(0.75, '#ec4899'); // rose
  grad.addColorStop(1.0, '#06b6d4'); // cyan
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, 1);

  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.wrapS = ClampToEdgeWrapping;
  tex.wrapT = ClampToEdgeWrapping;

  return tex;
}

export class Xylophone {
  private disposed = false;
  readonly group = new Group();

  readonly uniforms = {
    u_time: Properties.globalUniforms.u_time,
    u_spinSpeed: { value: 0 },
    u_swingScale: { value: 1.0 },
    u_swingAxis: { value: new Vector3(0, 1, 0) },

    // hover tint
    u_tFluid: { value: null as Texture | null },
    u_tGradient: { value: null as Texture | null },
    u_fluidStrength: { value: 1.0 },
    u_tintStrength: { value: 1.0 },
    u_tintGlow: { value: 0.18 },
    u_tintWrap: { value: XYLOPHONE.tintWrap },

    // frosted transmission
    u_tBackdrop: { value: null as Texture | null },
    u_transmission: { value: 0.84 },
    u_refractStrength: { value: 0.2 },
    u_fresnelPower: { value: 3.0 },

    // iridescence
    u_iridStrength: { value: 0.65 },
    u_iridCycles: { value: 3.0 },
    u_iridShift: { value: 0.0 },
    u_iridPower: { value: 2.5 },
    u_iridBody: { value: 0.12 },
  };

  private mesh?: Mesh;
  private material?: ShaderMaterial;
  private instances?: BuiltGeometry;
  private hitInstances?: InstanceAttributes;
  private geometryHeight = 1;

  private lastHitIndex = -1;
  private readonly raycast = new Raycaster();
  private readonly hitWorkspace = createHitWorkspace();

  private phaseTarget = 0;
  private phaseCurrent = 0;
  private phaseWritten = 0;
  private readonly scrollEuler = new Euler(0, 0, 0, 'YXZ');
  private readonly scrollQuat = new Quaternion();

  setFluid(fluidVelocity: { value: Texture | null }) {
    this.uniforms.u_tFluid = fluidVelocity;
  }

  setTheme(isDark: boolean) {
    if (isDark) {
      this.uniforms.u_transmission.value = 0.72;
      this.uniforms.u_tintGlow.value = 0.35;
      this.uniforms.u_refractStrength.value = 0.24;
      this.uniforms.u_iridStrength.value = 0.85;
    } else {
      this.uniforms.u_transmission.value = 0.84;
      this.uniforms.u_tintGlow.value = 0.18;
      this.uniforms.u_refractStrength.value = 0.2;
      this.uniforms.u_iridStrength.value = 0.65;
    }
  }

  private updateScroll(delta: number) {
    if (!this.instances) return;

    this.phaseTarget += Input.deltaScrollY * XYLOPHONE.scroll.sensitivity;
    this.phaseCurrent = MathUtils.damp(this.phaseCurrent, this.phaseTarget, XYLOPHONE.scroll.lerp, delta);

    if (Math.abs(this.phaseCurrent - this.phaseWritten) <= 1e-5) return;

    const { positions, rotations } = this.instances.transforms;
    writeHelixTransforms(
      this.phaseCurrent,
      this.geometryHeight,
      XYLOPHONE,
      positions,
      rotations,
      this.scrollEuler,
      this.scrollQuat
    );

    this.instances.geometry.attributes.aPos.needsUpdate = true;
    this.instances.geometry.attributes.aRot.needsUpdate = true;
    this.phaseWritten = this.phaseCurrent;
  }

  private updateStrike(camera: PerspectiveCamera) {
    if (!this.instances || !this.hitInstances || !Input.hasPointer) return;

    this.raycast.setFromCamera(Input.mouseXY, camera);
    const index = hitBarIndex(
      this.raycast.ray,
      this.hitInstances,
      this.instances.localBox,
      this.group.matrixWorld,
      Properties.time,
      this.uniforms.u_spinSpeed.value,
      this.hitWorkspace
    );

    if (index !== -1 && index !== this.lastHitIndex) {
      this.instances.aStrikeTime.setX(index, Properties.time);
      this.instances.aStrikeTime.needsUpdate = true;
    }

    this.lastHitIndex = index;
  }

  private async loadBars() {
    let modelGeometry: BufferGeometry;
    const url = modelUrl || '/assets/models/xylophone-09.glb';
    try {
      const gltf = await new GLTFLoader().loadAsync(url);
      modelGeometry = (gltf.scene.children[0] as Mesh).geometry;
    } catch (err) {
      try {
        const gltf = await new GLTFLoader().loadAsync('/assets/models/xylophone-09.glb');
        modelGeometry = (gltf.scene.children[0] as Mesh).geometry;
      } catch (err2) {
        console.error('[Xylophone] bar model failed to load — nothing to render', err, err2);
        return;
      }
    }

    if (this.disposed) { modelGeometry.dispose(); return; }
    this.build(modelGeometry);
  }

  private build(modelGeometry: BufferGeometry) {
    this.instances = buildInstancedGeometry(modelGeometry, XYLOPHONE);
    this.geometryHeight = this.instances.localBox.max.y - this.instances.localBox.min.y;
    this.hitInstances = {
      aPos: this.instances.transforms.positions,
      aRot: this.instances.transforms.rotations,
    };

    this.uniforms.u_tGradient.value = buildGradientTexture();

    this.uniforms.u_swingScale.value = Properties.reduceMotion ? 0 : 1;
    this.uniforms.u_spinSpeed.value = Properties.reduceMotion ? 0 : XYLOPHONE.spinSpeed;

    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: xylophoneVert,
      fragmentShader: xylophoneFrag,
      side: DoubleSide,
    });

    this.mesh = new Mesh(this.instances.geometry, this.material);
    this.mesh.layers.enable(GLASS_LAYER);
    this.group.add(this.mesh);

  }

  async load() {
    this.group.scale.setScalar(XYLOPHONE.group.scale);
    this.group.rotation.set(MathUtils.degToRad(XYLOPHONE.group.rotXDeg), 0, MathUtils.degToRad(XYLOPHONE.group.rotZDeg));
    this.group.updateMatrixWorld();

    await this.loadBars();
  }

  update(delta: number, camera: PerspectiveCamera): void {
    if (!this.instances || !this.hitInstances) return;

    this.updateScroll(delta);
    this.updateStrike(camera);
  }

  dispose() {
    this.disposed = true;
    this.instances?.geometry.dispose();
    this.material?.dispose();
    this.uniforms.u_tGradient.value?.dispose();

    if (this.mesh) this.group.remove(this.mesh);
  }
}
