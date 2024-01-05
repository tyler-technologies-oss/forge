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
export function createUserInteractionListener(element: HTMLElement, { capture = true, pointerenter = true, focusin = true } = {}): { userInteraction: Promise<Event>; destroy: () => void } {
  let destroyFn: () => void;
  const destroy: () => void = () => {
    if (typeof destroyFn === 'function') {
      destroyFn();
    }
  };

  const userInteraction = new Promise<Event>(resolve => {
    const listenerOpts: EventListenerOptions & { once: boolean } = { once: true, capture };
  
    const handlePointerenter = (evt: Event): void => {
      if (focusin) {
        element.removeEventListener('focusin', handleFocusin, listenerOpts);
      }
      resolve(evt);
    };
  
    const handleFocusin = (evt: Event): void => {
      if (pointerenter) {
        element.removeEventListener('pointerenter', handlePointerenter, listenerOpts);
      }
      resolve(evt);
    };

    destroyFn = (): void => {
      if (pointerenter) {
        element.removeEventListener('pointerenter', handlePointerenter, listenerOpts);
      }
      if (focusin) {
        element.removeEventListener('focusin', handleFocusin, listenerOpts);
      }
    };

    if (pointerenter) {
      element.addEventListener('pointerenter', handlePointerenter, listenerOpts);
    }
    if (focusin) {
      element.addEventListener('focusin', handleFocusin, listenerOpts);
    }
  });

  return { userInteraction, destroy };
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
  return amount / 100 * containerSize;
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

/**
 * Determines if two elements are overlapping.
 * @param elA {Element | null}
 * @param elB {Element | null}
 * @returns 
 */
export function elementsOverlapping(elA: Element | null, elB: Element | null): boolean {
  if (!(elA && elB)) {
    return false;
  }
  const a = elA.getBoundingClientRect();
  const b = elB.getBoundingClientRect();
  return !(a.top > b.bottom || a.right < b.left || a.bottom < b.top || a.left > b.right);
}

/**
 * Determines if a pointer event is over an element.
 * @param event {PointerEvent} The pointer event to test.
 * @param element {HTMElement} The element to test against.
 * @returns 
 */
export function isPointerOverElement({ x, y }: { x: number; y: number }, element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }
  const { top, left, bottom, right } = element.getBoundingClientRect();
  return x >= left && x <= right && y >= top && y <= bottom;
}

/**
 * Attempts to locate a target element based on a heuristic.
 * 
 * We use the following heuristic for locating the target element:
 *  - If an id is set, we use that value to query the DOM for the target element
 *  - If id is set to `:host`, we use the host element from within a shadow tree (only if the root node is a ShadowRoot instance)
 *  - If an id is set but the querySelector returns null, we use the parent element
 *  - If an id is not set, we use the parent element
 * @param value {string | null} - A selector string to query the DOM for the target element
 */
export function locateTargetHeuristic(element: HTMLElement, id?: string | null): HTMLElement | null {
  let targetEl: HTMLElement | null = null;

  if (id) {
    targetEl = locateElementById(element, id);
  }

  if (!targetEl) {
    return element.parentElement;
  }

  return targetEl;
}

/**
 * Attempts to locate an element by id within its root node.
 * @param element The element to search from.
 * @param id The id of the element to locate.
 * @returns The element if found, otherwise `null`.
 */
export function locateElementById(element: HTMLElement, id?: string | null): HTMLElement | null {
  const rootNode = element.getRootNode() as Document | ShadowRoot;

  // Special case handling for a `:host` selector to easily target a host element
  // from within a shadow tree, given that this is a very common scenario
  if (id === ':host' && rootNode instanceof ShadowRoot) {
    return rootNode.host as HTMLElement;
  }

  return rootNode.querySelector(`#${id}`);
}

/**
 * Replaces an existing element with a new element, while optionally moving the children of the old element into the new element.
 * @param oldElement The element to replace.
 * @param newElement The element to replace with.
 * @param preserveChildren Whether or not to preserve the children of the old element in the new element.
 * @returns The new element.
 */
export function replaceElement<T extends HTMLElement>(oldElement: HTMLElement, newElement: T, preserveChildren = true): T {
  if (preserveChildren) {
    newElement.append(...oldElement.childNodes);
  }
  oldElement.insertAdjacentElement('beforebegin', newElement);
  oldElement.remove();
  return newElement;
}

/**
 * Coerces a string separated by `separator` into an array of strings. 
 * @param value The string to coerce.
 * @params [separator=','] The separator to use when splitting the string.
 * @returns An array of strings.
 */
export function coerceStringToArray<T extends string>(value: string, separator = ','): T[] {
  return value.split(separator).map(p => p.trim()) as T[];
}
