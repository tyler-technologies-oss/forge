import { INITIAL_ORIGIN_SCALE, PADDING, SOFT_EDGE_CONTAINER_RATIO, SOFT_EDGE_MINIMUM_SIZE, StateLayerCoords } from './state-layer-constants.js';

export function calcRippleSize(hostEl: HTMLElement): { rippleScale: string; rippleSize: string; initialSize: number } {
  const { height, width } = hostEl.getBoundingClientRect();
  const maxDim = Math.max(height, width);
  const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
  const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
  const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
  const maxRadius = hypotenuse + PADDING;
  const rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
  const rippleSize = `${initialSize}px`;
  return { rippleScale, rippleSize, initialSize };
}

export function getTranslationCoordinates(
  hostEl: HTMLElement,
  initialSize: number,
  coords?: StateLayerCoords
): { startPoint: { x: number; y: number }; endPoint: { x: number; y: number } } {
  const { height, width } = hostEl.getBoundingClientRect();
  const endPoint = {
    x: (width - initialSize) / 2,
    y: (height - initialSize) / 2
  };

  let startPoint;
  if (isValidCoords(coords)) {
    startPoint = toNormalizedCoords(hostEl, coords);
  } else {
    startPoint = {
      x: width / 2,
      y: height / 2
    };
  }

  startPoint = {
    x: startPoint.x - initialSize / 2,
    y: startPoint.y - initialSize / 2
  };

  return { startPoint, endPoint };
}

export function toNormalizedCoords(hostEl: HTMLElement, coords: StateLayerCoords): { x: number; y: number } {
  const { scrollX, scrollY } = window;
  const { left, top } = hostEl.getBoundingClientRect();
  const documentX = scrollX + left;
  const documentY = scrollY + top;
  const { x, y } = coords;
  return { x: x - documentX, y: y - documentY };
}

export function isInBounds(hostEl: HTMLElement, x: number, y: number): boolean {
  const { height, width } = hostEl.getBoundingClientRect();
  return x >= 0 && x <= width && y >= 0 && y <= height;
}

function isValidCoords(value: any): value is StateLayerCoords {
  return value && (value instanceof StateLayerCoords || ['x', 'y'].every(key => key in value));
}
