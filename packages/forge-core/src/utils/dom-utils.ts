import { isArray } from './utils.js';

export interface IScrollbarVisibility {
  x: boolean;
  y: boolean;
}

export interface IFontInfo {
  fontSize?: number;
  fontFamily?: string;
}

const REGULAR_EXPRESSIONS = {
  placement: {
    auto: /\s?auto?\s?/i,
    primary: /^(top|bottom|left|right)$/,
    secondary: /^(top|bottom|left|right|center)$/,
    topBottom: /^(top|bottom)$/
  },
  overflow: /(auto|scroll)/
};

let SCROLLBAR_WIDTH: number | undefined;

/**
 * Gets the ownerDocument for an element, if null, than returns the document element.
 * @param {Element} element The element to get the ownerDocument for
 * @returns {Document}
 */
function _ownerDocument(element: Element): Document {
  return element.ownerDocument || document;
}

/**
 * Retrieves an element based on the provided root and selector.
 * @param {Element} root The root element to search within.
 * @param {string} selector The selector for the child element.
 * @param {boolean} [allowNull=false] Should the method allow the element to be not found? Default is false.
 * @returns {HTMLElement}
 */
export function getElement<T>(root: Element, selector: string, allowNull: boolean = false): T {
  const element = root.querySelector(selector);

  if (!element && !allowNull) {
    throw new Error(`Element not found with selector: ${selector}`);
  }

  return element as any;
}

/**
 * Checks if an element is a valid element.
 * @param {Element} element The node to test
 * @returns {boolean}
 */
export function isElement(element: Element): boolean {
  return element && element.nodeType === 1;
}

/**
 * Checks if an element is statically positioned.
 * @param {Element} element The node to test.
 * @returns {boolean}
 */
export function isPositionStatic(element: Element): boolean {
  return (window.getComputedStyle(element).position || 'static') === 'static';
}

/**
 * Parses a style string to a numeric value (removes 'px').
 * @param {string} value The style string to parse.
 * @returns {number}
 */
export function parseStyle(value: string): number {
  if (!value || !value.length) {
    return 0;
  }

  const parsedValue = parseFloat(value);
  return isFinite(parsedValue) ? parsedValue : 0;
}

/**
 * Gets the index of an element in the parent element children.
 * @param {Element} element The element to get the index on.
 * @returns {number}
 */
export function elementIndex(element: Element): number {
  if (!isElement(element)) {
    throw new Error('DOMUtils - elementIndex: invalid element argument');
  }

  if (!element.parentElement) {
    return -1;
  }

  return Array.from(element.parentElement.children).indexOf(element);
}

/**
 * Gets an array of parent elements up to the body element.
 * @param {Element} element The element to get the parents of.
 * @param {Element=} untilElement Optional element where traversal should stop.
 * @returns {Array}
 */
export function elementParents(element: Element, untilElement?: Element): Element[] {
  if (!isElement(element)) {
    throw new Error('DOMUtils - elementParents: invalid element argument');
  }

  const parentElements: Element[] = [];

  while (element.parentElement) {
    parentElements.push(element.parentElement);
    if (element.parentElement === untilElement || element.parentElement === _ownerDocument(element).body) {
      break;
    }

    // pierce shadow DOM
    if (element.parentElement && element.parentElement.parentNode && element.parentElement.parentNode.nodeType === 11) {
      element = (element.parentElement.parentNode as any).host;
    } else {
      element = element.parentElement;
    }
  }

  return parentElements;
}

/**
 * Gets the non-statically positioned parent of an element.
 * @param element The element to get the offset parent of.
 * @returns {Element}
 */
export function offsetParent(element: HTMLElement): HTMLElement {
  if (!isElement(element)) {
    throw new Error('DOMUtils - offsetParent: invalid element argument');
  }

  let offsetParentElem = element.offsetParent as HTMLElement;

  while (offsetParentElem && isPositionStatic(offsetParentElem)) {
    offsetParentElem = offsetParentElem.offsetParent as HTMLElement;
  }

  return offsetParentElem || _ownerDocument(element).documentElement;
}

/**
 * Gets the browser scrollbar width.
 * @returns {number}
 */
export function scrollbarWidth(): number {
  if (SCROLLBAR_WIDTH === undefined) {
    const elem = document.createElement('div');
    elem.style.position = 'absolute';
    elem.style.top = '-100px';
    elem.style.left = '-100px';
    elem.style.width = '50px';
    elem.style.height = '50px';
    elem.style.overflow = 'scroll';
    document.body.appendChild(elem);
    const width = elem.offsetWidth - elem.clientWidth;
    removeElement(elem);
    SCROLLBAR_WIDTH = isFinite(width) ? width : 0;
  }
  return SCROLLBAR_WIDTH;
}

/**
 * Checks if an element is scrollable.
 * @param {Element} element The element to test for scrollability
 * @returns {boolean}
 */
export function isScrollable(element: Element): boolean {
  const elemStyle = window.getComputedStyle(element);
  return REGULAR_EXPRESSIONS.overflow.test('' + elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX);
}

/**
 * Gets the scroll parent of an element.
 * @param {Element} element The element to get the scroll parent of.
 * @param {boolean} [includeSelf=false] Should the element be checked for scrollability.
 * @returns {Element}
 */
export function scrollParent(element: Element, includeSelf: boolean = false): Element {
  if (!isElement(element)) {
    throw new Error('DOMUtils - scrollParent: invalid element argument');
  }

  const docElem = _ownerDocument(element).documentElement;
  const elemStyle = window.getComputedStyle(element);

  if (includeSelf && REGULAR_EXPRESSIONS.overflow.test('' + elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX)) {
    return element;
  }

  let excludeStatic = elemStyle.position === 'absolute';
  let scrollParentElem = element.parentElement || docElem;

  if (scrollParentElem === docElem || elemStyle.position === 'fixed') {
    return scrollParentElem as HTMLElement;
  }

  while (scrollParentElem && scrollParentElem !== docElem) {
    const scrollParentStyle = window.getComputedStyle(scrollParentElem);
    if (excludeStatic && scrollParentStyle.position !== 'static') {
      excludeStatic = false;
    }

    if (!excludeStatic && REGULAR_EXPRESSIONS.overflow.test('' + scrollParentStyle.overflow + scrollParentStyle.overflowY + scrollParentStyle.overflowX)) {
      break;
    }
    scrollParentElem = (scrollParentElem as any).scrollParent as HTMLElement;
  }

  return (scrollParentElem as HTMLElement) || docElem;
}

/**
 * Checks if the elements scroll parent scrollbars are visible.
 * @param {Element} element The element to check the scroll parent of.
 * @returns {IScrollbarVisibility}
 */
export function isScrollbarVisible(element: Element): IScrollbarVisibility {
  if (!isElement(element)) {
    throw new Error('DOMUtils - isDocumentScrolled: invalid element argument');
  }

  const scrollParentElem = scrollParent(element);

  return {
    x: scrollParentElem.scrollWidth > scrollParentElem.clientWidth,
    y: scrollParentElem.scrollHeight > scrollParentElem.clientHeight
  };
}

/**
 * Gets the offset from the element to the parent element edges.
 * If no parentElement is supplied, the documentElement will be used.
 * @param {Element} element The element to compute the offset for.
 * @param {Element=} parentElement Optional parent element to measure from.
 * @returns {DOMRect}
 */
export function offset(element: Element, parentElement?: Element): Omit<DOMRect, 'x' | 'y' | 'toJSON'> {
  if (!isElement(element)) {
    throw new Error('DOMUtils - offset: invalid element argument');
  }

  const elemBCR = element.getBoundingClientRect();
  const win = _ownerDocument(element).defaultView as Window;
  const docElem = parentElement || (win.document.documentElement as HTMLElement);
  const offsetValues = { width: elemBCR.width, height: elemBCR.width, top: 0, left: 0, bottom: 0, right: 0 };

  if (!parentElement || docElem === win.document.documentElement || docElem === win.document.body) {
    offsetValues.top = win.scrollY + elemBCR.top;
    offsetValues.bottom = docElem.clientHeight - win.scrollY - elemBCR.bottom;
    offsetValues.left = win.scrollX + elemBCR.left;
    offsetValues.right = docElem.clientWidth - win.scrollX - elemBCR.right;
  } else {
    if (!isElement(parentElement)) {
      throw new Error('DOMUtils - offset: invalid parentElement argument');
    }

    const parentBCR = parentElement.getBoundingClientRect();
    offsetValues.top = elemBCR.top - parentBCR.top;
    offsetValues.bottom = parentBCR.bottom - elemBCR.bottom;
    offsetValues.left = elemBCR.left - parentBCR.left;
    offsetValues.right = parentBCR.right - elemBCR.right;
  }

  return {
    width: Math.round(elemBCR.width),
    height: Math.round(elemBCR.height),
    top: Math.round(offsetValues.top),
    bottom: Math.round(offsetValues.bottom),
    left: Math.round(offsetValues.left),
    right: Math.round(offsetValues.right)
  };
}

/**
 * Gets the offset from the element to the parent element viewable edges.
 * If no parentElement is supplied, the documentElement will be used.
 * @param {Element} element The element to measure
 * @param {Element=} parentElement The parent element to measure to.
 * @returns {DOMRect}
 */
export function viewportOffset(element: HTMLElement, parentElement?: Element): Omit<DOMRect, 'x' | 'y' | 'toJSON'> {
  if (!isElement(element)) {
    throw new Error('DOMUtils - offset: invalid element argument');
  }

  const win = _ownerDocument(element).defaultView as Window;
  parentElement = parentElement || (win.document.documentElement as HTMLElement);
  const parentElementOffset = offset(element, parentElement);
  const offsetValues = {
    top: parentElementOffset.top,
    bottom: 0,
    left: parentElementOffset.left,
    right: 0
  };

  if (parentElement === win.document.documentElement) {
    offsetValues.top -= win.scrollY;
    offsetValues.left -= win.scrollX;
  } else {
    const parentStyle = window.getComputedStyle(parentElement);
    offsetValues.top -= parseStyle('' + parentStyle.borderTopWidth);
    offsetValues.left -= parseStyle('' + parentStyle.borderLeftWidth);
  }

  offsetValues.bottom = parentElement.clientHeight - offsetValues.top - element.offsetHeight;
  offsetValues.right = parentElement.clientWidth - offsetValues.left - element.offsetWidth;

  return {
    width: parentElementOffset.width,
    height: parentElementOffset.height,
    top: Math.round(offsetValues.top),
    bottom: Math.round(offsetValues.bottom),
    left: Math.round(offsetValues.left),
    right: Math.round(offsetValues.right)
  };
}

/**
 * Checks if any part of an element is visible in the viewport.
 * @param {Element} element The element to check.
 * @returns {boolean}
 */
export function isElementInViewport(element: Element): boolean {
  if (!isElement(element)) {
    throw new Error('DOMUtils - isElementInViewport: invalid element argument');
  }

  const document = _ownerDocument(element);
  const scrollParentElem = scrollParent(element);
  const elemBCR = element.getBoundingClientRect();

  if (scrollParentElem !== document.documentElement && scrollParentElem !== document.body) {
    const scrollParentOffset = offset(element, scrollParentElem);

    if (
      scrollParentOffset.top + elemBCR.height < 0 ||
      scrollParentOffset.left + elemBCR.width < 0 ||
      scrollParentOffset.bottom + elemBCR.height - this.scrollbarWidth < 0 ||
      scrollParentOffset.right + elemBCR.width - this.scrollbarWidth < 0
    ) {
      return false;
    }
  }

  if (
    elemBCR.top + elemBCR.height < 0 ||
    elemBCR.left + elemBCR.width < 0 ||
    elemBCR.bottom + elemBCR.height > document.documentElement.clientHeight ||
    elemBCR.right + elemBCR.width > document.documentElement.clientWidth
  ) {
    return false;
  }

  return true;
}

/**
 * Adds an event listener to the document that will call the provided callback function
 * when an element and it's children no longer have focus.  The blur and touchstart events are used
 * to evaluate the active element to determine if the callback should be called.
 *
 * @param {Element} element The element to add the event listener to.
 * @param {Function} callback The function to call when the element and children don't have focus.
 * @param {boolean} [delay=false] Should a RAF cycle occur before the callback is called.
 * @returns {Function} The function to call to remove the document events.
 */
export function notChildEventListener(element: HTMLElement, callback: (element: HTMLElement) => void, delay?: boolean): () => void {
  const evtHandler: (event: Event) => void = (event: Event) => {
    const handle: () => void = () => {
      event.stopPropagation();

      if (event.cancelable) {
        event.preventDefault();
      }

      const activeElement = (event.type === 'touchstart' ? event.target : _ownerDocument(element).activeElement) as HTMLElement;
      if (!element.contains(activeElement)) {
        callback(activeElement);
      }
    };

    if (delay) {
      window.requestAnimationFrame(() => handle());
    } else {
      handle();
    }
  };

  const docElem = _ownerDocument(element);
  docElem.addEventListener('blur', evtHandler, true);
  docElem.addEventListener('touchstart', evtHandler, true);

  return () => {
    docElem.removeEventListener('blur', evtHandler, true);
    docElem.removeEventListener('touchstart', evtHandler, true);
  };
}

/**
 * Removes all children from a DOM node.
 * @param node The DOM node to remove children from.
 */
export function removeAllChildren(node: Element): void {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}

/**
 * Replaces one child node of the specified node with another.
 * @param newChild The new node to replace `oldChild`.
 * @param oldChild The existing node to be replaced.
 * @returns {Node} The replaced node. Same node as `oldChild`.
 */
export function replaceElement(newChild: Node, oldChild: Node): Node {
  return (oldChild.parentNode as Node).replaceChild(newChild, oldChild);
}

/**
 * Adds a class or array of classes to an element.
 *
 * @param {string | string[]} name The class(es) to add to the element
 * @param {Element} element The element to add class(es) to.
 */
export function addClass(name: string | string[], element: Element): void {
  if (isArray(name)) {
    (name as string[]).forEach(n => element.classList.add(n));
  } else {
    element.classList.add(name as string);
  }
}

/**
 * Removes a class or array of classes to an element.
 *
 * @param {string | string[]} name The class(es) to remove from the element
 * @param {Element} element The element to remove class(es) from.
 */
export function removeClass(name: string | string[], element: Element): void {
  if (isArray(name)) {
    (name as string[]).forEach(n => element.classList.remove(n));
  } else {
    element.classList.remove(name as string);
  }
}

/** Determines which type of animation event is supported. */
export function getAnimationEvent(): string | undefined {
  const el = document.createElement('fakeelement');

  const animations: { [key: string]: string } = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd'
  };

  for (const t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

/**
 * A helper method to trigger a keyframe animation via adding a class, and removing the class when the animation completes.
 * @param {HTMLElement} element The element to play the animation on.
 * @param {string} className The class to add that triggers the animation.
 */
export async function playKeyframeAnimation(element: HTMLElement, className: string, remove = true): Promise<void> {
  element.classList.add(className);

  return new Promise(resolve => {
    const animationEvent = getAnimationEvent() as string;
    const animationCompletedListener: () => void = () => {
      if (remove) {
        element.classList.remove(className);
      }
      element.removeEventListener(animationEvent, animationCompletedListener);
      resolve();
    };
    element.addEventListener(animationEvent, animationCompletedListener);
  });
}

/**
 * Removes an element from the DOM using the available remove method for that platform.
 * @param {HTMLElement} element The element to remove.
 */
export function removeElement(element: HTMLElement): void {
  if ((element as any).removeNode) {
    (element as any).removeNode(true);
  } else if (element.remove) {
    element.remove();
  } else {
    (element.parentNode as HTMLElement).removeChild(element);
  }
}

/**
 * Returns a width string that is safe for css based on the provided input.
 * @param {string | number} width
 * @returns {string | undefined} A width safe for using in CSS.
 */
export function safeCssWidth(width: string | number): string | undefined {
  if (typeof width === 'string') {
    if (width[width.length - 1] === '%') {
      return width;
    } else if (width.slice(-2) === 'px') {
      return width;
    } else if (Number(width) >= 0) {
      return `${width}px`;
    }
  } else if (typeof width === 'number') {
    if (width >= 0) {
      return `${width}px`;
    }
  }

  return undefined;
}

/**
 * Calculates the size of an element that is not attached to the DOM.
 * @param {HTMLElement} element The element to calc the size of.
 * @returns {width, height} The size of the element.
 */
export function calcSizeUnattached(element: HTMLElement): { width: number; height: number } {
  let container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '-99999px';
  container.style.left = '-99999px';
  container.style.visibility = 'hidden';
  container.appendChild(element.cloneNode(true));
  document.body.appendChild(container);
  const size = {
    width: container.scrollWidth,
    height: container.scrollHeight
  };
  removeElement(container);
  container = undefined as any;
  return size;
}

/**
 * Resolves a promise when the provided element has children.
 * @param {Element} element An element that does or will contain children.
 */
export function ensureChildren(element: Element): Promise<void> {
  if (element.children.length) {
    return Promise.resolve();
  }

  return new Promise<void>(resolve => {
    const observer = new MutationObserver(changes => {
      if (element.children.length) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(element, { childList: true });
  });
}

/**
 * Resolves a promise when the provided element has a child that matches a given selector.
 * @param {Element} element An element that does or will contain children.
 * @param {string} selector A CSS selector to use for finding an element.
 */
export function ensureChild(element: Element, selector: string): Promise<Element> {
  const initialElements = deepQuerySelectorAll(element, selector);
  if (initialElements.length) {
    return Promise.resolve(initialElements[0]);
  }

  return new Promise<Element>(resolve => {
    const observer = new MutationObserver(changes => {
      const hasAddedNodes = changes.reduce((prev, curr) => prev + curr.addedNodes.length, 0) > 0;
      if (hasAddedNodes) {
        const foundElements = deepQuerySelectorAll(element, selector);
        if (foundElements.length) {
          observer.disconnect();
          resolve(foundElements[0]);
        }
      }
    });
    observer.observe(element, { childList: true, subtree: true });
  });
}

/**
 * Resolves a promise when the provided host element has an `<input>` element child
 * @param {HTMLElement} host An element that does or will contain children.
 */
export function ensureInputElement(host: HTMLElement): Promise<Element> {
  return new Promise<Element>(resolve => {
    const element = host.querySelector('input');
    if (element) {
      resolve(element);
    }

    const observer = new MutationObserver(changes => {
      const hasAddedNodes = changes.reduce((prev, curr) => prev + curr.addedNodes.length, 0) > 0;
      if (hasAddedNodes) {
        const foundElement = host.querySelector('input');
        if (foundElement) {
          observer.disconnect();
          resolve(foundElement);
        }
      }
    });
    observer.observe(host, { childList: true, subtree: true });
  });
}

/**
 * Walks up the tree starting a specific node and stops when the provided matcher function returns true.
 * @param {Node} node The node to start searching from.
 * @returns {Node | null} The closest matching ancestor node, or null if not found.
 */
export function walkUpUntil(node: Node, matcher: (node: Node) => boolean): Node | null {
  let parent = node && node.parentNode;
  while (parent) {
    if (matcher(parent)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null;
}

/**
 * Calculates the width of a string given the provided font information.
 */
export function calculateFontWidth(value: string, info?: IFontInfo): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const fontSize = info ? info.fontSize : 16;
  const fontFamily = info ? info.fontFamily : 'Roboto';
  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(value).width;
}

/**
 * Generates a CSS text-shadow style value based on the number of iterations and color provided.
 * @param {number} iterations The number of iterations for how long the shadow should be.
 * @param {string} color The color of the text shadow. Can be any CSS-safe color format. Ex. hex, rgb, rgba, hsl... etc.
 */
export function generateTextShadow(iterations: number, color: string): string {
  const shadows: string[] = [];
  for (let i = 1; i <= iterations; i++) {
    shadows.push(`${i}px ${i}px ${color}`);
  }
  return shadows.join(', ');
}

/**
 * Checks if an element matches any of the provided selectors.
 * @param {Element} el The element to match.
 * @param {string[]} selectors The selectors to check the element against.
 */
export function matchesSelectors(el: Element | Node, selectors: string | string[]): boolean {
  if (el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  if (typeof selectors === 'string') {
    selectors = selectors.replace(/\s+/, '').split(',');
  }

  const matchesFn = Element.prototype.matches;
  return selectors.some(selector => matchesFn.call(el, selector));
}

/**
 * Walks the DOM tree starting at a root element and checks if any of its children
 * match the provided selectors. Similar to the native `querySelectorAll` except
 * that it will traverse the shadow DOM as well as slotted nodes.
 * @param {Element} rootElement The element to start querying from.
 * @param {string[]} selectors An array of CSS selectors.
 * @param {boolean} [checkRootElement] True if the provided root element is to be matched against the selectors.
 */
export function deepQuerySelectorAll(rootElement: Element, selectors: string | string[], checkRootElement: boolean = false): Element[] {
  let nodes: Element[] = [];

  if (!rootElement) {
    return nodes;
  }

  if (typeof selectors === 'string') {
    selectors = selectors.replace(/\s+/, '').split(',');
  }

  if (checkRootElement && matchesSelectors(rootElement, selectors) && nodes.indexOf(rootElement) === -1) {
    nodes.push(rootElement);
  }

  if (rootElement.tagName === 'SLOT') {
    const slotNodes = (rootElement as HTMLSlotElement).assignedNodes() as Element[];
    slotNodes.forEach(slottedNode => (nodes = nodes.concat(deepQuerySelectorAll(slottedNode, selectors, true))));
  } else {
    let node = rootElement.shadowRoot ? rootElement.shadowRoot.firstElementChild : rootElement.firstElementChild;
    while (node) {
      nodes = nodes.concat(deepQuerySelectorAll(node, selectors, true));
      node = node.nextElementSibling;
    }
  }

  return nodes;
}

/**
 * Gets the currently focused element within the document by also traversing shadow roots.
 * @param {Document} doc The document to get the active element from. Defaults to the current document.
 * @returns {Element}
 */
export function getActiveElement(doc = document): Element {
  const activeElement = doc.activeElement;

  if (!activeElement || activeElement === doc.body) {
    return activeElement as HTMLElement;
  }

  return getActiveShadowElement(activeElement) as Element;
}

/**
 * Gets the active element within the provided elements shadow root. If the element
 * does not have a shadow root, the provided element is returned.
 * @param {Element} element The active element.
 */
export function getActiveShadowElement(element: Element): Element {
  if (element.shadowRoot && element.shadowRoot.activeElement) {
    element = getActiveShadowElement(element.shadowRoot.activeElement);
  }
  return element;
}

/** Toggles a CSS class (or classes) on an element based on a boolean. */
export function toggleClass(el: HTMLElement, hasClass: boolean, className: string | string[]): void {
  if (hasClass) {
    addClass(className, el);
  } else {
    removeClass(className, el);
  }
}

/** Toggles a value-less attribute on an element. */
export function toggleAttribute(el: HTMLElement, hasAttribute: boolean, name: string, value = ''): void {
  if (hasAttribute) {
    el.setAttribute(name, value);
  } else {
    el.removeAttribute(name);
  }
}

/** Toggles part of an attribute on an element. */
export function toggleOnAttribute(el: HTMLElement, attribute: string, value: string, force?: boolean): void {
  const oldValue = el.getAttribute(attribute);
  if ((force === undefined || force === true) && (!oldValue || !oldValue.includes(value))) {
    appendToAttribute(el, attribute, value);
  } else if (!force) {
    removeFromAttribute(el, attribute, value);
  }
}

/** Appends a value to an attribute on an element, first setting it if it doesn't exist. */
export function appendToAttribute(el: HTMLElement, attribute: string, value: string): void {
  const oldValue = el.getAttribute(attribute);
  if (!oldValue || !oldValue.length) {
    el.setAttribute(attribute, value);
  } else {
    el.setAttribute(attribute, `${oldValue} ${value}`);
  }
}

/** Removes a value from an attribute on an element, removing the attribute if empty. */
export function removeFromAttribute(el: HTMLElement, attribute: string, value: string): void {
  if (!el.hasAttribute(attribute)) {
    return;
  }
  const oldValue = el.getAttribute(attribute);
  if (oldValue) {
    let newValue = oldValue?.replace(value, '');
    newValue = newValue.replace(/\s+/g, ' ').trim();
    if (newValue.length) {
      el.setAttribute(attribute, newValue);
    } else {
      el.removeAttribute(attribute);
    }
  }
}

/**
 * Attempts to scroll a target element into view within a scrollable parent element, unless already visible within the container.
 * @param scrollElement The scrollable parent element.
 * @param targetElement The element to scroll into view.
 * @param behavior The scroll behavior. Defaults to 'auto'.
 * @param block The block position to anchor the target element to within the scroll element.
 */
export function tryScrollIntoView(
  scrollElement: HTMLElement,
  targetElement: HTMLElement,
  behavior: 'auto' | 'smooth' = 'auto',
  block: 'nearest' | 'center' = 'nearest'
): void {
  if (!scrollElement) {
    return;
  }

  const canScroll = scrollElement.scrollHeight > scrollElement.clientHeight || scrollElement.scrollWidth > scrollElement.clientWidth;

  if (canScroll) {
    const offsetRect = offset(targetElement, scrollElement);
    const isClippedTop = offsetRect.top <= targetElement.clientHeight;
    const isClippedBottom = offsetRect.bottom <= targetElement.clientHeight;

    if (isClippedTop || isClippedBottom) {
      const top = calcBlockScroll(
        block,
        isClippedTop,
        targetElement.offsetTop,
        targetElement.clientHeight,
        scrollElement.offsetTop,
        scrollElement.offsetHeight
      );
      scrollElement.scrollTo({ top, behavior });
      return;
    }

    const isClippedLeft = offsetRect.left <= targetElement.clientWidth;
    const isClippedRight = offsetRect.right <= targetElement.clientWidth;

    if (isClippedLeft || isClippedRight) {
      const left = calcBlockScroll(
        block,
        isClippedLeft,
        targetElement.offsetLeft,
        targetElement.clientWidth,
        scrollElement.offsetLeft,
        scrollElement.offsetWidth
      );
      scrollElement.scrollTo({ left, behavior });
    }
  }
}

/** Calculates the block anchor position for a target element within a scrollable parent element. */
export function calcBlockScroll(
  block: 'nearest' | 'center',
  isClippedStart: boolean,
  targetOffset: number,
  targetSize: number,
  scrollOffset: number,
  scrollSize: number
): number {
  if (block === 'nearest') {
    if (isClippedStart) {
      return targetOffset - scrollOffset - targetSize;
    }
    return targetOffset - scrollSize + targetSize * 2;
  }
  return targetOffset - scrollOffset - scrollSize / 2 + targetSize / 2;
}

/**
 * Creates an element from an HTML string.
 */
export function elementFromHTML(html: string): Element | null {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstElementChild;
}

/**
 * Observes changes to the provided attributes on a target element and executes a provided callback when changed.
 * @param element The element to observe.
 * @param listener The callback to execute when an attribute changes on the element.
 * @param attributeFilter The attributes to observe.
 * @returns A `MutationObserver` instasnce.
 */
export function createElementAttributeObserver(
  element: HTMLElement,
  listener: (name: string, value: string | null) => void,
  attributeFilter: string[] | undefined
): MutationObserver {
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.attributeName) {
        listener(mutation.attributeName, element.getAttribute(mutation.attributeName));
      }
    }
  });
  observer.observe(element, { attributes: true, attributeFilter });
  return observer;
}
