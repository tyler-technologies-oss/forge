/**
 * Highlights text in the given label by converting it to HTML and using a `<span>` tag to show the highlighted text within the original label.
 * @param label The full text.
 * @param highlightText The text to highlight.
 */
export function highlightTextHTML(label: string, highlightText: string): HTMLElement | undefined {
  const text = label.toLowerCase();
  const startIndex = text.indexOf(highlightText.toLowerCase());

  if (startIndex !== -1) {
    const endIndex = startIndex + highlightText.length;
    const wrapperSpan = document.createElement('span');
    const highlightSpan = document.createElement('span');

    highlightSpan.style.fontWeight = 'bold';
    highlightSpan.textContent = label.substring(startIndex, endIndex);
    
    wrapperSpan.appendChild(document.createTextNode(label.substring(0, startIndex)));
    wrapperSpan.appendChild(highlightSpan);
    wrapperSpan.appendChild(document.createTextNode(label.substring(endIndex)));
    
    return wrapperSpan;
  }

  return undefined;
}


/**
 * Awaits user interaction on an element in the form of `pointerenter` or `focusin` to let a listener know
 * when the user has attempted to interact with the provided element.
 * 
 * The listeners are only called once, and the other is removed after one of the listeners is called.
 * @param element The element to listen to.
 * @param capture Whether to use capturing listeners or not.
 * @returns A `Promise` that will be resolved when either of the listeners has executed.
 */
export function userInteractionListener(element: HTMLElement, { capture = true, pointerenter = true, focusin = true } = {}): Promise<'pointerenter' | 'focusin'> {
  return new Promise<'pointerenter' | 'focusin'>(resolve => {
    const listenerOpts: EventListenerOptions & { once: boolean } = { once: true, capture };
  
    const handlePointerenter = (): void => {
      if (focusin) {
        element.removeEventListener('focusin', handleFocusin, listenerOpts);
      }
      resolve('pointerenter');
    };
  
    const handleFocusin = (): void => {
      if (pointerenter) {
        element.removeEventListener('pointerenter', handlePointerenter, listenerOpts);
      }
      resolve('focusin');
    };

    if (pointerenter) {
      element.addEventListener('pointerenter', handlePointerenter, listenerOpts);
    }
    if (focusin) {
      element.addEventListener('focusin', handleFocusin, listenerOpts);
    }
  });
}
