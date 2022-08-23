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

/**
 * Converts a percent value to pixels.
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
 * Scales a value from one range to another.
 * @param value The original number value.
 * @param fromMin The lower bound of the input range.
 * @param fromMax The upper bound of the input range.
 * @param toMin The lower bound of the output range (defaults to 0).
 * @param toMax The lower bound of the output range (defaults to 100).
 * @returns A value mapped to the output range.
 */
export function scaleValue(value: number, fromMin: number, fromMax: number, toMin = 0, toMax = 100): number {
  const range = fromMax - fromMin;
  const adjustedValue = value - fromMin;
  if (!range || !adjustedValue) {
    return toMin;
  }
  return adjustedValue * toMax / range + toMin;
}

/**
 * Returns the min of a set of numbers where some values may be undefined.
 * @param args `number` or `undefined` values to compare.
 * @returns The min value or `Number.POSITIVE_INFINITY` if all values are `undefined`.
 */
export function safeMin(...args: (number | undefined)[]): number {
  return Math.min(...args.map(arg => arg ?? Number.POSITIVE_INFINITY));
}

/**
 * Returns the max of a set of numbers where some values may be undefined.
 * @param args `number` or `undefined` values to compare.
 * @returns The max value or `Number.NEGATIVE_INFINITY` if all values are `undefined`.
 */
export function safeMax(...args: (number | undefined)[]): number {
  return Math.max(...args.map(arg => arg ?? Number.NEGATIVE_INFINITY));
}
