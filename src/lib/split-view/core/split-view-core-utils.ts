import { ISplitViewPaneComponent, SplitViewPaneComponent } from '../split-view-pane';
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
  const adjustedSize = size - min;
  if (!range || !adjustedSize) {
    return 0;
  }
  return adjustedSize * 100 / range;
}

export function getActualMax(max: number | undefined, availableSpace: number | undefined): number {
  console.log({max, availableSpace});
  // Default to Infinity to ignore undefined arguments
  return Math.min(max ?? Infinity, availableSpace ?? Infinity);
}

export function getSplitViewPaneSibling(el: ISplitViewPaneComponent): SplitViewPaneComponent | undefined {
  const direction = el.direction;
  if (direction === 'none') {
    return undefined;
  }
  const sibling = direction === 'start' ? el.nextElementSibling : el.previousElementSibling;
  if (sibling instanceof SplitViewPaneComponent) {
    return sibling;
  } else {
    return undefined;
  }
}
