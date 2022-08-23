import { ISplitViewPanelComponent, SplitViewPanelComponent } from '../split-view-panel';
import { SplitViewOrientation } from '../split-view/split-view-constants';

/**
 * Gets the appropriate cursor for the handle orientation.
 * @param orientation 
 * @returns A CSS cursor keyword value.
 */
export function getCursor(orientation: SplitViewOrientation): string {
  return orientation === 'horizontal' ? 'col-resize' : 'row-resize';
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
  const direction = el.position;
  if (direction === 'default') {
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
