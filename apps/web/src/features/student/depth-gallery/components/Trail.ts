import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
  NormalBlending,
  Vector3,
} from 'three';

export class Trail {
  readonly group = new Group();
  private points: Vector3[] = [];
  private mesh: Mesh | null = null;

  minDistance = 0.006;
  maxPoints = 220;
  curveTension = 0.5;
  curveSegments = 220;
  radialSegments = 8;
  radiusHead = 0.012;
  radiusTail = 0.003;
  pointSmoothing = 0.3;
  maxTrimPerFrame = 4;
  jumpResetDistance = 999;

  readonly material = new MeshStandardMaterial({
    color: new Color('#f6f9ff'),
    emissive: new Color('#7fd5ff'),
    emissiveIntensity: 1.35,
    roughness: 0.2,
    metalness: 0.05,
    transparent: true,
    opacity: 0.84,
    depthWrite: false,
    depthTest: false,
    blending: NormalBlending,
  });

  get object() {
    return this.group;
  }

  addPoint(position: Vector3) {
    const lastPoint = this.points[this.points.length - 1] || null;

    if (lastPoint && position.distanceToSquared(lastPoint) < this.minDistance * this.minDistance) {
      return;
    }

    const nextPoint = position.clone();

    if (lastPoint && nextPoint.distanceTo(lastPoint) > this.jumpResetDistance) {
      this.points = [nextPoint];
      if (this.mesh) {
        this.mesh.geometry.dispose();
        this.group.remove(this.mesh);
        this.mesh = null;
      }
      return;
    }

    const easedPoint = lastPoint
      ? lastPoint.clone().lerp(nextPoint, this.pointSmoothing)
      : nextPoint;
    this.points.push(easedPoint);

    let trimBudget = this.maxTrimPerFrame;
    while (this.points.length > this.maxPoints && trimBudget > 0) {
      this.points.shift();
      trimBudget -= 1;
    }

    if (this.points.length < 2) return;

    const curve = new CatmullRomCurve3(this.points, false, 'centripetal', this.curveTension);
    const segments = Math.max(24, Math.min(this.curveSegments, this.points.length * 4));
    const nextGeometry = this.createTaperedTube(curve, segments, this.radiusHead, this.radiusTail);

    if (!this.mesh) {
      this.mesh = new Mesh(nextGeometry, this.material);
      this.mesh.renderOrder = 1200;
      this.group.add(this.mesh);
      return;
    }

    this.mesh.geometry.dispose();
    this.mesh.geometry = nextGeometry;
  }

  private createTaperedTube(
    curve: CatmullRomCurve3,
    segments: number,
    radiusHead: number,
    radiusTail: number
  ) {
    const pathPoints = curve.getSpacedPoints(segments);
    const radialSegments = this.radialSegments;
    const ringPoints = radialSegments + 1;

    const vertices: number[] = [];
    const indices: number[] = [];

    const up = new Vector3(0, 0, 1);
    const tangent = new Vector3();
    const normal = new Vector3();
    const binormal = new Vector3();
    const radialOffset = new Vector3();
    const vertexPosition = new Vector3();

    for (let i = 0; i < pathPoints.length; i += 1) {
      const t = i / Math.max(pathPoints.length - 1, 1);
      const radius = radiusHead + (radiusTail - radiusHead) * Math.pow(t, 1.5);

      curve.getTangent(t, tangent).normalize();
      normal.crossVectors(up, tangent).normalize();

      if (normal.lengthSq() === 0) {
        normal.set(1, 0, 0);
      }

      binormal.crossVectors(tangent, normal).normalize();

      for (let j = 0; j <= radialSegments; j += 1) {
        const angle = (j / radialSegments) * Math.PI * 2;
        const cx = -Math.cos(angle) * radius;
        const cy = Math.sin(angle) * radius;

        radialOffset.copy(normal).multiplyScalar(cx).addScaledVector(binormal, cy);
        vertexPosition.copy(pathPoints[i]).add(radialOffset);
        vertices.push(vertexPosition.x, vertexPosition.y, vertexPosition.z);
      }
    }

    for (let i = 0; i < pathPoints.length - 1; i += 1) {
      for (let j = 0; j < radialSegments; j += 1) {
        const baseIndex = i * ringPoints + j;
        indices.push(baseIndex, baseIndex + ringPoints, baseIndex + 1);
        indices.push(baseIndex + ringPoints, baseIndex + ringPoints + 1, baseIndex + 1);
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  dispose() {
    this.reset();
    this.material.dispose();
  }

  reset() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.group.remove(this.mesh);
      this.mesh = null;
    }
    this.points = [];
  }
}
