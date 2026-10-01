import { EffectComposer } from 'postprocessing';
import { Vector2, WebGLRenderer } from 'three';
import { QUALITY } from '../configs/XylophoneConfig';

export class Properties {
  static viewportWidth = 0;
  static viewportHeight = 0;
  static dpr = typeof window !== 'undefined' ? Math.min(QUALITY.maxDpr, window.devicePixelRatio || 1) : 1;
  static reduceMotion = typeof window !== 'undefined' ? (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false) : false;

  static gl?: WebGLRenderer;
  static composer = new EffectComposer();

  static time = 0;
  static deltaTime = 0;

  static globalUniforms = {
    u_time: { value: 0 },
    u_deltaTime: { value: 0 },
    u_resolution: { value: new Vector2() },
  };
}
