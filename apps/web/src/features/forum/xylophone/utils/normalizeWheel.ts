const DELTA_MODE_LINE = 1;
const DELTA_MODE_PAGE = 2;

const PIXELS_PER_LINE = 40;
const PIXELS_PER_PAGE = 800;

export function normalizeWheelY(event: WheelEvent): number {
  switch (event.deltaMode) {
    case DELTA_MODE_LINE:
      return event.deltaY * PIXELS_PER_LINE;
    case DELTA_MODE_PAGE:
      return event.deltaY * PIXELS_PER_PAGE;
    default:
      return event.deltaY;
  }
}
