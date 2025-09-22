export const ARIA_CONTROLS_PLACEHOLDER_ID = 'forge-aria-controls-placeholder';
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
export function createUserInteractionListener(
  element: HTMLElement,
  { capture = true, pointerenter = true, focusin = true } = {}
): { userInteraction: Promise<Event>; destroy: () => void } {
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
  return (amount / 100) * containerSize;
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
  return (amount * 100) / containerSize;
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
  return (adjustedValue * toMax) / range + toMin;
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
  if (!element.isConnected) {
    return null;
  }

  const rootNode = element.getRootNode() as Document | ShadowRoot;

  // Special case handling for a `:host` selector to easily target a host element
  // from within a shadow tree, given that this is a very common scenario
  if (id === ':host') {
    if (rootNode instanceof ShadowRoot) {
      return rootNode.host as HTMLElement;
    }
    return null;
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

/**
 * Wraps an array of elements in a new element.
 * @param elements The elements to wrap.
 * @param wrapper The new wrapper element.
 */
export function wrapElements(elements: HTMLElement[], wrapper: HTMLElement, exclude?: string[]): void {
  if (!elements.length) {
    return;
  }

  const parentNode = elements[0].parentNode;
  if (!parentNode) {
    return;
  }

  parentNode.insertBefore(wrapper, elements[0]);
  elements.forEach(el => {
    if (exclude?.length && exclude.some(ex => el.matches(ex))) {
      return;
    }
    wrapper.append(el);
  });
}

/**
 * Unwraps an element by moving its children to its parent and removing the element.
 * @param wrapper The element to unwrap.
 */
export function unwrapElements(wrapper: HTMLElement): void {
  const parentNode = wrapper.parentNode;
  if (!parentNode) {
    return;
  }

  while (wrapper.firstChild) {
    parentNode.insertBefore(wrapper.firstChild, wrapper);
  }

  wrapper.remove();
}

/**
 * Rounds a value to the nearest pixel based on the device pixel ratio.
 * @param {number} value The value to round.
 * @returns {number} The rounded value.
 */
export function roundByDPR(value: number): number {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}

/*
 * Creates a div as a temporary aria-controls placeholder for various components that use a dynamic popup.
 */
export function tryCreateAriaControlsPlaceholder(): void {
  const hasDiv = document.getElementById(ARIA_CONTROLS_PLACEHOLDER_ID);
  if (hasDiv) {
    return;
  }
  const placeholderDiv = document.createElement('div');
  placeholderDiv.id = ARIA_CONTROLS_PLACEHOLDER_ID;
  document.body.appendChild(placeholderDiv);
}

/**
 * Sets the aria-controls attribute of an element to the placeholder div
 */
export function setAriaControls(component: HTMLElement): void {
  const placeholderDiv = document.getElementById(ARIA_CONTROLS_PLACEHOLDER_ID);
  if (placeholderDiv && component) {
    component.setAttribute('aria-controls', placeholderDiv.id);
  }
}

/**
 * Converts `setTimeout()` to a `Promise` that resolves after a specified delay.
 *
 * Useful for delay some code until the next event loop cycle.
 */
export function task(duration = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}

/**
 * Converts `requestAnimationFrame()` to a `Promise`.
 *
 * Useful for delaying some code until the next animation frame is rendered by the browser.
 */
export function frame(): Promise<void> {
  return new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
}

/**
 * Determines if an object is an instance of a specific type.
 * @param obj The object to test.
 * @param name The name of the type to test against.
 * @returns `true` if the object is an instance of the type, otherwise `false`.
 */
export function isInstanceOf<T>(obj: any, name: string): obj is T {
  return Object.prototype.toString.call(obj) === `[object ${name}]`;
}

/**
 * Determines if an element is visible based on its computed styles.
 * @param element The element to check.
 * @returns `true` if the element is visible, otherwise `false`.
 */
export function checkVisibility(element: HTMLElement): boolean {
  // Use the `checkVisibility()` method on the element if available
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility();
  }

  // Fall back to computed styles on older browsers
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.visibility !== 'collapse' &&
    style.opacity !== '0' &&
    style.getPropertyValue('content-visibility') !== 'hidden'
  );
}

/**
 * Adds or removes a state from an element's custom state set.
 *
 * @param internals - The element's internals object.
 * @param state - The name of the custom state to toggle.
 * @param value - Whether to add or remove the state.
 */
export function toggleState(internals: ElementInternals, state: string, value: boolean): void {
  if (value) {
    try {
      internals.states.add(state);
    } catch {
      internals.states.add(`--${state}`);
    }
  } else {
    try {
      internals.states.delete(state);
    } catch {
      internals.states.delete(`--${state}`);
    }
  }
}

/**
 * Determines if an element is clipped by the viewport bounds
 * @param element The element to check.
 * @returns `true` if the element is clipped by the viewport, otherwise `false`.
 */
export function isElementClipped(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  return rect.top < 0 || rect.left < 0 || rect.bottom > viewportHeight || rect.right > viewportWidth;
}

/**
 * Moves an element into the viewport by adjusting its position to ensure it's fully visible.
 * @param element The element to move into view.
 * @param options Configuration options for the viewport adjustment.
 * @param options.padding The minimum distance from viewport edges (defaults to 8px).
 * @returns `true` if the position was adjusted, otherwise `false`.
 */
export function moveElementIntoViewport(element: HTMLElement | null, { padding = 8 } = {}): boolean {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Get current computed position values
  const computedStyle = window.getComputedStyle(element);
  const currentLeft = parseFloat(computedStyle.left) || 0;
  const currentTop = parseFloat(computedStyle.top) || 0;

  let newLeft = currentLeft;
  let newTop = currentTop;

  // Calculate the adjustments needed to bring the element into view
  // Handle horizontal positioning
  if (rect.left < 0) {
    // Element extends beyond left edge - move it right
    newLeft = currentLeft - rect.left + padding;
  } else if (rect.right > viewportWidth) {
    // Element extends beyond right edge - move it left
    newLeft = currentLeft - (rect.right - viewportWidth) - padding;
  }

  // Handle vertical positioning
  if (rect.top < 0) {
    // Element extends beyond top edge - move it down
    newTop = currentTop - rect.top + padding;
  } else if (rect.bottom > viewportHeight) {
    // Element extends beyond bottom edge - move it up
    newTop = currentTop - (rect.bottom - viewportHeight) - padding;
  }

  // Ensure the element doesn't exceed viewport bounds after adjustment
  // This prevents the element from being too large for the viewport
  const maxLeft = viewportWidth - rect.width - padding;
  const maxTop = viewportHeight - rect.height - padding;

  newLeft = Math.max(padding, Math.min(newLeft, maxLeft));
  newTop = Math.max(padding, Math.min(newTop, maxTop));

  // Only apply position changes if they're different from current values
  if (newLeft !== currentLeft || newTop !== currentTop) {
    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;
    return true;
  }

  return false;
}
