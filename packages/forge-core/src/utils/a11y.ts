/** Constructs a visually hidden element and returns the element instance. */
export function createVisuallyHiddenElement(attr = 'data-forge-live-announcer'): HTMLElement {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '0';
  div.style.height = '1px';
  div.style.width = '1px';
  div.style.padding = '1px';
  div.style.overflow = 'hidden';
  div.style.clip = 'rect(0px, 0px, 0px, 0px)';
  div.style.whiteSpace = 'nowrap';
  div.style.border = '0px';

  if (attr) {
    div.setAttribute(attr, '');
  }

  return div;
}
