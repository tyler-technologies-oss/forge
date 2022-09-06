import { ISplitViewPanelComponent, ISplitViewPanelCursorConfig, SplitViewPanelComponent } from '../split-view-panel';
import { SplitViewOrientation } from '../split-view/split-view-constants';

/**
 * Gets the appropriate cursor for the handle orientation.
 * @param orientation 
 * @returns A CSS cursor keyword value.
 */
export function getCursor(orientation: SplitViewOrientation, config?: ISplitViewPanelCursorConfig): string {
  if (orientation === 'horizontal') {
    switch (config?.boundary) {
      case 'min':
        return config.resizable === 'end' ? 'e-resize' : 'w-resize';
      case 'max':
        return config.resizable === 'end' ? 'w-resize' : 'e-resize';
      default:
        return 'col-resize';
    }
  } else {
    switch (config?.boundary) {
      case 'min':
        return config.resizable === 'end' ? 's-resize' : 'n-resize';
      case 'max':
        return config.resizable === 'end' ? 'n-resize' : 's-resize';
      default:
        return 'row-resize';
    }
  }
}

/**
 * Gets the approporate drag icon for the handle orientation.
 * @param orientation 
 * @returns A Forge icon name.
 */
export function getHandleIcon(orientation: SplitViewOrientation): string {
  return orientation === 'horizontal' ? 'drag_vertical_variant' : 'drag_handle';
}

/**
 * Gets the panel that the given panel resizes into.
 * @param el A split view panel.
 * @returns A sibling split view panel or undefined if there is not a sibling.
 */
export function getSplitViewPanelSibling(el: ISplitViewPanelComponent): SplitViewPanelComponent | undefined {
  const direction = el.resizable;
  if (direction === 'none') {
    return undefined;
  }
  
  let sibling: Element | null = el;
  do {
    sibling = direction === 'end' ? sibling.nextElementSibling : sibling.previousElementSibling;
  } while (sibling instanceof SplitViewPanelComponent && !sibling.open);

  if (sibling instanceof SplitViewPanelComponent) {
    return sibling;
  }

  return undefined;
}

/**
 * Extracts a size and unit from a `number` or `string` formatted as a CSS dimension using px or %.
 * A `number` is interpreted to be a pixel value.
 * @param value A `number` or `string` representing a size in pixels or percent.
 * @returns An object containing the parsed size and unit.
 */
export function parseSize(value: number | string): { amount: number; unit: 'px' | '%' | '' } {
  if (!isNaN(+value)) {
    return { amount: +value, unit: 'px' };
  }

  // Matches digits with or without decimals, any amount of whitespace, and 'px' or '%'
  const regex = /(^\d*\.?\d*)\s*(px|%$)?/i;
  const parts = (value as string).match(regex);
  const amount = parts?.[1] ? +parts[1] : -1;
  const unit = (parts?.[2]?.toLowerCase() ?? '') as 'px' | '%' | '';

  return { amount, unit };
}
