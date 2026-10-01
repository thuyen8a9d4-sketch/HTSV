import { MathUtils, Vector2 } from 'three';
import { normalizeWheelY } from './normalizeWheel';
import { Properties } from './properties';

const MAX_SCROLL_PER_EVENT = 200;
const DRAG_AXIS_LOCK_PX = 8;
const DRAG_SCALE = 3;

export class Input {
  static mouseXY = new Vector2();
  static mouseScreenXY = new Vector2();
  static deltaScrollY = 0;
  static hasPointer = false;

  private static invViewportWidth = 0;
  private static invViewportHeight = 0;

  private static dragStartXY = new Vector2();
  private static dragPrevY = 0;
  private static dragAxis: 'none' | 'x' | 'y' = 'none';

  private static lastWindowScrollY = 0;

  private static readonly onMouseMove = (e: MouseEvent) => Input.onMove(e);
  private static readonly onWheel = (e: WheelEvent) => {
    Input.deltaScrollY += MathUtils.clamp(normalizeWheelY(e), -MAX_SCROLL_PER_EVENT, MAX_SCROLL_PER_EVENT);
  };

  private static readonly onScroll = () => {
    const currentY = window.scrollY;
    const diff = currentY - Input.lastWindowScrollY;
    Input.lastWindowScrollY = currentY;
    if (Math.abs(diff) > 0) {
      Input.deltaScrollY += MathUtils.clamp(diff, -MAX_SCROLL_PER_EVENT, MAX_SCROLL_PER_EVENT);
    }
  };

  private static readonly onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    Input.dragStartXY.set(touch.clientX, touch.clientY);
    Input.dragPrevY = touch.clientY;
    Input.dragAxis = 'none';
    Input.onMove(touch);
  };

  private static readonly onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0] ?? e.changedTouches[0];
    if (!touch) return;
    Input.onMove(touch);
    Input.updateDrag(touch);
  };

  private static readonly onTouchEnd = () => {
    Input.dragAxis = 'none';
  };

  static init() {
    this.resize();
    this.lastWindowScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('wheel', this.onWheel, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', this.onTouchEnd, { passive: true });
  }

  static resize() {
    const w = Properties.viewportWidth > 0 ? Properties.viewportWidth : (typeof window !== 'undefined' ? window.innerWidth : 1);
    const h = Properties.viewportHeight > 0 ? Properties.viewportHeight : (typeof window !== 'undefined' ? window.innerHeight : 1);
    this.invViewportWidth = 1 / Math.max(1, w);
    this.invViewportHeight = 1 / Math.max(1, h);
  }

  static postUpdate() {
    this.deltaScrollY = 0;
  }

  static destroy() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('touchcancel', this.onTouchEnd);
  }

  private static onMove(e: MouseEvent | Touch) {
    this.mouseXY.set(e.clientX * this.invViewportWidth * 2 - 1, 1 - e.clientY * this.invViewportHeight * 2);
    this.mouseScreenXY.set(e.clientX * this.invViewportWidth, 1 - e.clientY * this.invViewportHeight);
    this.hasPointer = true;
  }

  private static updateDrag(touch: Touch) {
    if (this.dragAxis === 'none') {
      const dx = touch.clientX - this.dragStartXY.x;
      const dy = touch.clientY - this.dragStartXY.y;
      if (Math.hypot(dx, dy) < DRAG_AXIS_LOCK_PX) return;
      this.dragAxis = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x';
      this.dragPrevY = touch.clientY;
    }

    if (this.dragAxis !== 'y') return;

    const delta = (this.dragPrevY - touch.clientY) * DRAG_SCALE;
    this.deltaScrollY += MathUtils.clamp(delta, -MAX_SCROLL_PER_EVENT, MAX_SCROLL_PER_EVENT);
    this.dragPrevY = touch.clientY;
  }
}
