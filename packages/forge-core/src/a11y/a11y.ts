/**
 * Hides an element from the user visually, while keeping it in the DOM.
 * @param element The element to hide from view.
 */
export function hideElementVisually(element: HTMLElement): void {
  element.style.border = '0';
  element.style.clip = 'rect(0 0 0 0)';
  element.style.height = '1px';
  element.style.margin = '-1px';
  element.style.overflow = 'hidden';
  element.style.padding = '0';
  element.style.position = 'absolute';
  element.style.width = '1px';
  element.style.outline = '0';
  element.style.setProperty('-webkit-appearance', 'none');
  element.style.setProperty('-moz-appearance', 'none');
}
