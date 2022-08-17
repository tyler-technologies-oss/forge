import { ISplitViewPanelComponent, SplitViewPanelComponent } from '../split-view-panel';
import { SplitViewOrientation } from '../split-view/split-view-constants';

/**
 * Gets the appropriate cursor for the handle orientation.
 * 
 * @param orientation 
 * @returns A CSS cursor keyword value.
 */
export function getCursor(orientation: SplitViewOrientation): string {
  return orientation === 'horizontal' ? 'col-resize' : 'row-resize';
}

/**
 * Gets the approporate drag icon for the handle orientation.
 * 
 * @param orientation 
 * @returns A Forge icon name.
 */
export function getHandleIcon(orientation: SplitViewOrientation): string {
  return orientation === 'horizontal' ? 'drag_vertical_variant' : 'drag_handle';
}

/**
 * Converts a percent value to pixels.
 * 
 * @param amount A percent value.
 * @param containerSize The size of the parent element along the relevant axis.
 * @returns A pixel value.
 */
export function percentToPixels(amount: number, containerSize: number): number {
  if (containerSize === 0) {
    return 0;
  }
  return 100 / containerSize * amount;
}

/**
 * Converts a pixel value to a percentage.
 * 
 * @param amount A pixel value.
 * @param containerSize The size of the parent element along the relevant axis.
 * @returns A percent value.
 */
export function pixelsToPercent(amount: number, containerSize: number): number {
  if (containerSize === 0) {
    return 0;
  }
  return amount * 100 / containerSize;
}

/**
 * Gets the size of a panel as a percentage of it max size.
 * 
 * @param size The current size of the panel.
 * @param min The minimum size the panel can take.
 * @param max The maximum size the panel can take.
 * @returns A value representing the size of the panel scaled from 0 to 100.
 */
export function mapSizeToValue(size: number, min: number, max: number): number {
  const range = max - min;
  const adjustedSize = size - min;
  if (!range || !adjustedSize) {
    return 0;
  }
  return adjustedSize * 100 / range;
}

/**
 * Gets the max size that a panel can have in practice.
 * 
 * @param max The max size a panel is allowed to have.
 * @param availableSpace The size of a panel and its sibling in the direction it resizes.
 * @returns The lesser of `max` and `availableSpace`.
 */
export function getActualMax(max?: number, availableSpace?: number): number {
  // Default to Infinity to ignore undefined arguments
  return Math.min(max ?? Infinity, availableSpace ?? Infinity);
}

/**
 * Gets the panel that the given panel resizes into.
 * 
 * @param el A split view panel.
 * @returns A sibling split view panel or undefined if there is not a sibling.
 */
export function getSplitViewPanelSibling(el: ISplitViewPanelComponent): SplitViewPanelComponent | undefined {
  const direction = el.position;
  if (direction === 'none') {
    return undefined;
  }
  
  let sibling: Element | null = el;
  do {
    sibling = direction === 'start' ? sibling.nextElementSibling : sibling.previousElementSibling;
  } while (sibling instanceof SplitViewPanelComponent && !sibling.open);

  if (sibling instanceof SplitViewPanelComponent) {
    return sibling;
  }

  return undefined;
}
