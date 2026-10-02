const isMobile =
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(pointer: coarse)').matches ?? false) &&
  Math.min(window.innerWidth, window.innerHeight) < 900;

export const QUALITY = {
  isMobile,
  maxDpr: isMobile ? 1.25 : 2,
  glassBufferScale: isMobile ? 0.5 : 1,
} as const;

export const GLASS_LAYER = 1;
export const BG_LAYER = 2;

export const XYLOPHONE = {
  count: 64,
  radius: 1,
  tiltFalloff: 2,
  thetaStep: 0.175,
  thetaOffset: Math.PI,
  spinSpeed: 0.3,
  tintWrap: 10,
  group: { scale: 0.5, rotXDeg: 25, rotZDeg: 30 },
  scroll: { sensitivity: 0.005, lerp: 5 },
} as const;

export const FLUID = {
  simRes: 128,
  curlStrength: 0.2,
  splatRadius: 0.6,
  splatForce: 20,
  pressureIterations: 1,
  velocityDissipation: 0.93,
  pressureDissipation: 0.97,
} as const;

export const FROST = {
  strength: 0.9,
  maxBlurPx: 48,
} as const;

export const SSAO = {
  samples: 16,
  rings: 7,
  radius: 0.1,
  intensity: 2.2,
  bias: 0.03,
  fade: 0.02,
  luminanceInfluence: 0.6,
  worldDistanceThreshold: 20,
  worldDistanceFalloff: 5,
  worldProximityThreshold: 3,
  worldProximityFalloff: 1,
  resolutionScale: QUALITY.isMobile ? 0.5 : 1,
} as const;
