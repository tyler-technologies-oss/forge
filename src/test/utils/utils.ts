import { POPOVER_CONSTANTS } from '@tylertech/forge';
import { removeElement } from '@tylertech/forge-core';

export function tryCleanupPopovers(): void {
  const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName)) as HTMLElement[];
  popovers.forEach(p => removeElement(p));
}

export function isVisibleInScrollContainer(scrollContainer: HTMLElement, element: HTMLElement): boolean {
  const elemTop = element.offsetTop - scrollContainer.offsetTop;
  const elemBottom = elemTop + element.offsetHeight;
  return (elemTop >= scrollContainer.scrollTop && elemBottom <= scrollContainer.scrollTop + scrollContainer.offsetHeight);
}
