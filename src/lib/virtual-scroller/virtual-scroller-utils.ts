import { elementFromHTML, toggleAttribute } from '@tylertech/forge-core';
import { IVirtualScrollerItem, IVirtualScrollerItemBuilderResult, VirtualScrollerAlignment, VirtualScrollerItemBuilder } from './virtual-scroller-constants';

/**
 * Returns a spacer element used to set the scroll height of a container.
 * 
 * @param height 
 * @param marginTop 
 * @param marginBottom 
 * @returns A spacer `HTMLElement`
 */
export function createSpacer(height: number, marginTop: string, marginBottom: string): HTMLElement {
  const spacer = document.createElement('div');
  spacer.style.setProperty('position', 'absolute');
  spacer.style.setProperty('top', '0');
  spacer.style.setProperty('left', '0');
  spacer.style.setProperty('width', '1px');
  spacer.style.setProperty('height', `${height}px`);
  spacer.style.setProperty('margin-top', marginTop);
  spacer.style.setProperty('margin-bottom', marginBottom);
  spacer.style.setProperty('pointer-events', 'none');
  toggleAttribute(spacer, true, 'aria-hidden', 'true');
  return spacer;
}

/**
 * Returns an item.
 * 
 * @param index The item's position within its set.
 * @param data 
 * @param builder A function that outputs the item element.
 * @returns The item.
 */
export function createItem<T>(index: number, data: T, builder: VirtualScrollerItemBuilder<T>): IVirtualScrollerItem {
  const item = coerceVirtualScrollerItemBuilderResult(builder(data, index));
  item.element.style.setProperty('position', 'absolute');
  item.element.style.setProperty('left', '0');
  return item;
}

/**
 * Returns a virtual scroller item from a string, HTML element, or `IVirtualScrollerItemBuilderResult`.
 * 
 * @param value 
 * @returns A virtual scroller item.
 */
export function coerceVirtualScrollerItemBuilderResult(value: string | HTMLElement | IVirtualScrollerItemBuilderResult): IVirtualScrollerItem {
  if (typeof value === 'string') {
    return { element: definedElementFromHtml(value) };
  } else if (value instanceof HTMLElement) {
    return { element: value };
  } else {
    let element: HTMLElement;
    if (typeof value.element === 'string') {
      element = definedElementFromHtml(value.element);
    } else {
      element = value.element;
    }
    return {...value, element };
  }
}

/**
 * Creates a guaranteed element from an HTML string.
 * 
 * @param html 
 * @returns An HTML element.
 */
export function definedElementFromHtml(html: string): HTMLElement {
  return (elementFromHTML(html) ?? document.createElement('div')) as HTMLElement;
}

/**
 * Sets the `top` style value on an absolutely positioned element.
 * 
 * @param element The item element.
 * @param index The item's position within its set.
 * @param height The shared fixed height of all items.
 * @param inset An amount to offset by.
 */
export function setItemTop(element: IVirtualScrollerItem, index: number, height: number, inset: string): void {
  element.element.style.top = `calc(${index * height}px + ${inset})`;
}

/**
 * Sets `aria-setsize` and `aria-posinset` on an element.
 * 
 * @param element The item element.
 * @param index The item's position within its set.
 * @param setSize The number of items in the set.
 */
export function setItemAccessibility(element: IVirtualScrollerItem, index: number, setSize: number): void {
  toggleAttribute(element.element, true, 'aria-setsize', setSize.toString());
  toggleAttribute(element.element, true, 'aria-posinset', (index + 1).toString());
}

/**
 * Returns a limit on the number of items to attempt to render.
 * @param count The number of items queued to render.
 * @param max The maximum number of items to attempt to render.
 * @returns The lesser of `count` and `max`.
 */
export function limitCountToRender(count: number, max: number): number {
  return Math.min(count, max);
}

/**
 * Returns the key of the first entry in a map.
 * 
 * @param map A map object.
 * @returns The key of the first entry or undfined if the map has no entries.
 */
export function getFirstMapKey<T>(map: Map<T, unknown>): T | undefined {
  return map.keys().next().value;
}

/**
 * Deletes the first entry from a map.
 * 
 * @param map A map object.
 */
export function deleteFirstFromMap(map: Map<unknown, unknown>): void {
  const firstKey = getFirstMapKey(map);
  map.delete(firstKey);
}

/**
 * Returns a `scrollTop` value that will bring an item into view.
 * 
 * @param index The position index of the item.
 * @param itemHeight 
 * @param containerHeight 
 * @param alignment Where in the view container the item should be scrolled to.
 * @returns A `scrollTop` value.
 */
export function getScrollTopWithItemInView(index: number, itemHeight: number, containerHeight: number, alignment: VirtualScrollerAlignment = 'top'): number {
  const itemTop = index * itemHeight;

  switch (alignment) {
    case 'top':
      return itemTop;
    case 'center':
      return itemTop + itemHeight / 2 - containerHeight / 2;
    case 'bottom':
      return itemTop + itemHeight - containerHeight;
    default:
      return 0;
  }
}

/**
 * Scrolls an item into view.
 * 
 * @param index The position index of the item.
 * @param itemHeight 
 * @param container The item's parent element.
 * @param alignment Where in the view container the item should be scrolled to.
 * @param behavior 
 */
export function scrollToItem(index: number, itemHeight: number, container: HTMLElement, alignment: VirtualScrollerAlignment = 'top', behavior: 'smooth' | 'auto' = 'auto'): void {
  const scrollTop = getScrollTopWithItemInView(index, itemHeight, container.clientHeight, alignment);
  container.scrollTo({ top: scrollTop, behavior });
}
