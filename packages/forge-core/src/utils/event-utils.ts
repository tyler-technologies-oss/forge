/**
 * Gets the node path from where the event originated from.
 * @param evt The event.
 */
export function getEventPath(evt: Event): HTMLElement[] {
  return (evt as any).path || ((evt as any).composedPath && (evt as any).composedPath()) || composedPath((evt as any).target);
}

/**
 * Equivalent to path/composedPath.
 * Note: Slots and shadow roots are detected, but aren't needed as they are virtually invisible anyway...
 */
export function composedPath(el: HTMLElement): HTMLElement[] {
  const path: HTMLElement[] = [];

  while (el) {
    if (el.shadowRoot) {
      if (el.shadowRoot.activeElement) {
        path.push(el.shadowRoot.activeElement as HTMLElement);
      }
      path.push(el.shadowRoot as any);
    }

    path.push(el);

    if (el.tagName === 'HTML') {
      path.push(document as any);
      path.push(window as any);
      break;
    }

    el = el.parentElement as HTMLElement;
  }

  return path;
}
