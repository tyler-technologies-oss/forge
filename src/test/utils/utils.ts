import { POPOVER_CONSTANTS } from '@tylertech/forge';
import { removeElement, Platform } from '@tylertech/forge-core';

export function tryCleanupPopovers(): void {
  const popups = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName)) as HTMLElement[];
  popups.forEach(p => removeElement(p));
}

export function isVisibleInScrollContainer(scrollContainer: HTMLElement, element: HTMLElement): boolean {
  const elemTop = element.offsetTop - scrollContainer.offsetTop;
  const elemBottom = elemTop + element.offsetHeight;
  return (elemTop >= scrollContainer.scrollTop && elemBottom <= scrollContainer.scrollTop + scrollContainer.offsetHeight);
}

export function mockPlatform(property: string, value: any): () => void {
  const originalDescriptor = Object.getOwnPropertyDescriptor(Platform, property) as PropertyDescriptor;
  Object.defineProperty(Platform, property, { get: () => value });
  return () => Object.defineProperty(Platform, property, originalDescriptor);
}

