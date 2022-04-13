import { SplitViewOrientation } from '../split-view/split-view-constants';

export function getCursor(orientation: SplitViewOrientation): string {
  return orientation === 'horizontal' ? 'col-resize' : 'row-resize';
}

export function getHandleIcon(orientation: SplitViewOrientation): string {
  return orientation === 'horizontal' ? 'drag_vertical_variant' : 'drag_handle';
}

export function percentToPixels(amount: number, containerSize: number): number {
  if (containerSize === 0) {
    return 0;
  }
  return 100 / containerSize * amount;
}

export function pixelsToPercent(amount: number, containerSize: number): number {
  if (containerSize === 0) {
    return 0;
  }
  return amount * 100 / containerSize;
}

export function mapSizeToValue(size: number, min: number, max: number): number {
  const range = max - min;
  if (range === 0) {
    return 0;
  }
  return size * 100 / range;
}
