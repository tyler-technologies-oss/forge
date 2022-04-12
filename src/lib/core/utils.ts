import { addClass, removeClass, throttle, offset } from '@tylertech/forge-core';

/** Generates random characters. Defaults to a length of 5. */
export function randomChars(length = 5): string {
  return Math.random().toString(36).substr(2, length);
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
 * Creates an element from an HTML string.
 */
export function elementFromHTML(html: string): Element | null {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstElementChild;
}

export function createVisuallyHiddenElement(): HTMLElement {
  const div = document.createElement('div');
  div.setAttribute('data-forge-live-announcer', '');
  div.style.position = 'absolute';
  div.style.top = '0';
  div.style.height = '1px';
  div.style.width = '1px';
  div.style.padding = '1px';
  div.style.overflow = 'hidden';
  div.style.clip = 'rect(0px, 0px, 0px, 0px)';
  div.style.whiteSpace = 'nowrap';
  div.style.border = '0px';
  return div;
}

export function ensureInputElement(host: HTMLElement): Promise<Element>{
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
 * Observes changes to the provided attributes on a target element and executes a provided callback when changed.
 * @param element The element to observe.
 * @param listener The callback to execute when an attribute changes on the element.
 * @param attributeFilter The attributes to observe.
 * @returns A `MutationObserver` instasnce.
 */
export function createElementAttributeObserver(element: HTMLElement, listener: (name: string, value: string | null) => void, attributeFilter: string[] | undefined): MutationObserver {
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

export function coerceNumberArray(strOrNumOrArray: string | Array<string | number>): number[] {
  if (!strOrNumOrArray) {
    return [];
  }

  if (typeof strOrNumOrArray === 'string') {
    return strOrNumOrArray.replace(/ |\[|]|\"/g, '').split(',').map(n => Number(n));
  } else if (typeof strOrNumOrArray === 'number') {
    return [strOrNumOrArray];
  } else {
    return strOrNumOrArray.map(n => Number(n));
  }
}

/**
 * Compares two objects for deep equality.
 * @param a 
 * @param b 
 */
export function isDeepEqual(a: any, b: any): boolean {
  return a === b || (typeof a === 'object' && typeof b === 'object' && JSON.stringify(a) === JSON.stringify(b));
}

/** Determines if the provided string value can be parsed into a valid numeric value. */
export function isNumeric(str: string): boolean {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(str as any) && !isNaN(parseFloat(str));
}

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

/*
 * Watches for user events to detect if browser is idle.
 * 
 * @param callback The function to call when the browser becomes idle.
 * @param timespan The time to wait before the browser is considered idle.
 */
export function idleWatch(callback: () => void, timespan: number): void {
  const events = [
    'mousedown',
    'mousemove',
    'touchstart',
    'touchmove',
    'keydown',
    'wheel',
    'resize'
  ];

  events.forEach(e => {
    window.addEventListener(e, throttle((event: Event) => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(callback, timespan);
    }, 1000, true), true);
  });

  let timeoutId = window.setTimeout(callback, timespan);
}

/**
 * Attempts to scroll a target element into view within a scrollable parent element, unless already visible within the container.
 * @param scrollElement The scrollable parent element.
 * @param targetElement The element to scroll into view.
 * @param behavior The scroll behavior. Defaults to 'auto'.
 * @param block The block position to anchor the target element to within the scroll element.
 */
export function tryScrollIntoView(scrollElement: HTMLElement, targetElement: HTMLElement, behavior: 'auto' | 'smooth' = 'auto', block: 'nearest' | 'center' = 'nearest'): void {
  if (!scrollElement) {
    return;
  }

  const isScrollable = scrollElement.scrollHeight > scrollElement.clientHeight || scrollElement.scrollWidth > scrollElement.clientWidth;

  if (isScrollable) {
    const offsetRect = offset(targetElement, scrollElement);
    const isClippedTop = offsetRect.top <= targetElement.clientHeight;
    const isClippedBottom = offsetRect.bottom <= targetElement.clientHeight;

    if (isClippedTop || isClippedBottom) {
      const top = calcBlockScroll(block, isClippedTop, targetElement.offsetTop, targetElement.clientHeight, scrollElement.offsetTop, scrollElement.offsetHeight);
      scrollElement.scrollTo({ top, behavior });
      return;
    }
    
    const isClippedLeft = offsetRect.left <= targetElement.clientWidth;
    const isClippedRight = offsetRect.right <= targetElement.clientWidth;

    if (isClippedLeft || isClippedRight) {
      const left = calcBlockScroll(block, isClippedLeft, targetElement.offsetLeft, targetElement.clientWidth, scrollElement.offsetLeft, scrollElement.offsetWidth);
      scrollElement.scrollTo({ left, behavior });
    }
  }
}

/** Calculates the block anchor position for a target element within a scrollable parent element. */
export function calcBlockScroll(block: 'nearest' | 'center', isClippedStart: boolean, targetOffset: number, targetSize: number, scrollOffset: number, scrollSize: number): number {
  if (block === 'nearest') {
    if (isClippedStart) {
      return (targetOffset - scrollOffset) - targetSize;
    }
    return (targetOffset - scrollSize) + targetSize * 2;
  }
  return targetOffset - scrollOffset - scrollSize / 2 + targetSize / 2;
}
