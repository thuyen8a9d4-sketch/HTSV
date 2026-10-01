import {
  Color,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from 'three';

interface ParticleItem {
  mesh: Mesh;
  velocity: Vector3;
  lifeRemaining: number;
  totalLife: number;
}

export class TrailHeadParticles {
  readonly group = new Group();
  isEnabled = true;
  maxParticles = 18;
  spawnPerSecond = 20;
  spawnRadius = 0.52;
  speedMin = 0.05;
  speedMax = 0.22;
  lifeMin = 0.25;
  lifeMax = 0.6;
  sizeMin = 0.007;
  sizeMax = 0.02;
  dragPerFrame = 0.94;

  private spawnAccumulator = 0;
  private nextSpawnIndex = 0;
  private sharedGeometry = new SphereGeometry(1, 5, 4);
  private particles: ParticleItem[] = [];

  constructor() {
    this.group.renderOrder = 1300;

    for (let index = 0; index < this.maxParticles; index += 1) {
      const material = new MeshBasicMaterial({
        color: new Color('#f6f9ff'),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
      });

      const mesh = new Mesh(this.sharedGeometry, material);
      mesh.visible = false;
      this.group.add(mesh);

      this.particles.push({
        mesh,
        velocity: new Vector3(),
        lifeRemaining: 0,
        totalLife: 0,
      });
    }
  }

  get object() {
    return this.group;
  }

  setEnabled(isEnabled: boolean) {
    if (this.isEnabled && !isEnabled) {
      this.clear();
    }
    this.isEnabled = Boolean(isEnabled);
    this.group.visible = this.isEnabled;
  }

  update(deltaSeconds: number, headPosition: Vector3, opacity = 1, shouldSpawn = true) {
    const safeDelta = Math.min(Math.max(deltaSeconds || 0, 0), 0.1);

    if (this.isEnabled && shouldSpawn && safeDelta > 0) {
      this.spawnAccumulator += safeDelta * this.spawnPerSecond;
      const spawnCount = Math.floor(this.spawnAccumulator);
      this.spawnAccumulator -= spawnCount;

      for (let index = 0; index < spawnCount; index += 1) {
        this.spawnParticle(headPosition);
      }
    } else {
      this.spawnAccumulator = 0;
    }

    const clampedOpacity = MathUtils.clamp(opacity, 0, 1);
    const drag = Math.pow(this.dragPerFrame, safeDelta * 60);

    this.particles.forEach((particle) => {
      if (particle.lifeRemaining <= 0) return;

      particle.lifeRemaining -= safeDelta;
      if (particle.lifeRemaining <= 0) {
        particle.lifeRemaining = 0;
        particle.mesh.visible = false;
        (particle.mesh.material as MeshBasicMaterial).opacity = 0;
        return;
      }

      particle.velocity.multiplyScalar(drag);
      particle.mesh.position.addScaledVector(particle.velocity, safeDelta);

      const lifeRatio = particle.lifeRemaining / particle.totalLife;
      (particle.mesh.material as MeshBasicMaterial).opacity = lifeRatio * clampedOpacity * 0.75;
    });
  }

  private spawnParticle(headPosition: Vector3) {
    const particle = this.particles[this.nextSpawnIndex];
    if (!particle) return;
    this.nextSpawnIndex = (this.nextSpawnIndex + 1) % this.particles.length;

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * this.spawnRadius;

    particle.mesh.position.set(
      headPosition.x + Math.cos(angle) * radius,
      headPosition.y + (Math.random() - 0.5) * this.spawnRadius * 0.6,
      headPosition.z + Math.sin(angle) * radius
    );

    const size = MathUtils.lerp(this.sizeMin, this.sizeMax, Math.random());
    particle.mesh.scale.setScalar(size);
    particle.mesh.visible = true;

    const speed = MathUtils.lerp(this.speedMin, this.speedMax, Math.random());
    particle.velocity.set(
      (Math.random() - 0.5) * speed,
      (Math.random() - 0.5) * speed * 0.6,
      (Math.random() - 0.5) * speed
    );

    particle.totalLife = MathUtils.lerp(this.lifeMin, this.lifeMax, Math.random());
    particle.lifeRemaining = particle.totalLife;
    (particle.mesh.material as MeshBasicMaterial).opacity = 0.4;
  }

  dispose() {
    this.clear();
    this.particles.forEach((particle) => {
      (particle.mesh.material as MeshBasicMaterial).dispose();
    });
    this.sharedGeometry.dispose();
    this.group.clear();
    this.particles = [];
  }

  clear() {
    this.spawnAccumulator = 0;
    this.particles.forEach((particle) => {
      particle.lifeRemaining = 0;
      particle.totalLife = 0;
      particle.mesh.visible = false;
      (particle.mesh.material as MeshBasicMaterial).opacity = 0;
    });
  }
}
