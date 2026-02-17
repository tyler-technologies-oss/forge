import { replaceElement, isArray, removeAllChildren, walkUpUntil } from '../utils/index.js';
import {
  CUSTOM_ELEMENT_CSS_PROPERTY,
  CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY,
  CUSTOM_ELEMENT_NAME_PROPERTY,
  CUSTOM_ELEMENT_STYLESHEETS_PROPERTY,
  CUSTOM_ELEMENT_TEMPLATE_PROPERTY,
  supportsConstructableStyleSheets
} from './constants.js';

/**
 * Recursively defines a component as a custom elements and all of its dependencies.
 * @param component The component to import.
 */
export function defineCustomElement(component: any): void {
  tryDefine(component[CUSTOM_ELEMENT_NAME_PROPERTY], component);
  if (isArray(component[CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY])) {
    defineCustomElements(component[CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY]);
  }
}

/**
 * Defines the specified custom element components.
 * @param {any[]} components The components to register.
 */
export function defineCustomElements(components: any[]): void {
  components.forEach(defineCustomElement);
}

/**
 * Attempts to define the provided custom element name/constructor if not already defined.
 * @param name The name of the custom element to define.
 * @param ctor The custom element constructor.
 */
export function tryDefine(name: string, ctor: CustomElementConstructor, options?: ElementDefinitionOptions | undefined): void {
  if (hasDefinedCustomElement(name)) {
    return;
  }
  window.customElements.define(name, ctor, options);
}

/**
 * Checks to see if the custom element is defined in the registry.
 * @param name The name of the custom element to query the registry with.
 */
export function hasDefinedCustomElement(name: string): boolean {
  return window?.customElements?.get(name) !== undefined;
}

/**
 * Useful when capturing the value of a unupgraded component during the `connectedCallback` upon upgrade.
 *
 * More information here:
 * https://developers.google.com/web/fundamentals/architecture/building-components/best-practices#lazy-properties
 *
 * @param property
 */
export function upgradeProperty<T extends HTMLElement>(instance: T, property: keyof T): void {
  if (Object.prototype.hasOwnProperty.call(instance, property)) {
    const value = instance[property];
    delete instance[property];
    instance[property] = value;
  }
}

/**
 * Traverses up the DOM tree starting from the provided component element to find the specified parent.
 * @param {HTMLElement} component The starting HTMLElement.
 * @param {string} parentTagName The parent tag name we are searching for.
 */
export function requireParent<T extends HTMLElement>(component: HTMLElement, parentTagName: string): T | null {
  let el = component;

  while (el.parentNode) {
    el = el.parentNode as T;

    if (!el.tagName) {
      break;
    }

    if (!el.tagName || el.tagName.toLowerCase() === parentTagName.toLowerCase()) {
      return el as T;
    }
  }

  return null;
}

/**
 * Creates a template element from a string.
 * @param template The template HTML string.
 */
export function parseTemplateString(template: string): HTMLTemplateElement {
  const templateDocument = new DOMParser().parseFromString(template, 'text/html');
  return templateDocument.querySelector('template') as HTMLTemplateElement;
}

/**
 * Attaches a template to the given web component instance light DOM.
 * @param {T} componentInstance A component instance.
 * @param {string} template The template HTML string.
 */
export function attachLightTemplate<T extends HTMLElement>(componentInstance: T, template: string): void {
  componentInstance.appendChild(parseTemplateString(template).content.cloneNode(true));
}

/**
 * Attaches a shadow root to the given web component instance.
 * @param {T} componentInstance A component instance.
 * @param {string} elementName The name of the element the shadow root is to be attached to.
 * @param {string | HTMLTemplateElement} template The shadow root template HTML string or element.
 * @param {string | string[]} styles The shadow root styles string to be encapsulated by this shadow root.
 * @param {boolean} [delegatesFocus=false] Should the component delegate focus.
 */
export function attachShadowTemplate<T extends HTMLElement>(
  componentInstance: T,
  template: string | HTMLTemplateElement,
  styles?: string | string[],
  delegatesFocus = false
): void {
  componentInstance.attachShadow({ mode: 'open', delegatesFocus });
  if (styles) {
    setShadowStyles(componentInstance, styles);
  }
  setShadowTemplate(componentInstance, template);
}

/**
 * Replaces the template of an existing shadow root with the provided template.
 * @param {T} componentInstance A component instance.
 * @param {string} elementName The name of the element the shadow root is to be attached to.
 * @param {string | HTMLTemplateElement} template The shadow root template HTML string or element.
 * @param {string | string[]} styles The shadow root styles string to be encapsulated by this shadow root.
 */
export function replaceShadowTemplate<T extends HTMLElement>(componentInstance: T, template: string | HTMLTemplateElement, styles?: string | string[]): void {
  if (!componentInstance.shadowRoot) {
    throw new Error('This element does not contain a shadow root. Did you mean to call `attachShadowTemplate`?');
  }

  if ((componentInstance.shadowRoot as ShadowRoot).children.length) {
    removeAllChildren(componentInstance.shadowRoot as any);
  }

  if (styles) {
    setShadowStyles(componentInstance, styles, { force: true });
  }

  setShadowTemplate(componentInstance, template, { force: true });
}

/**
 * Creates and prepares an HTML template element for rendering within a shadow root.
 * @param {string} elementName The name of the element the shadow root is to be attached to.
 * @param {string} template The shadow root template HTML string.
 * @param {string | string[]} styles The shadow root styles string to be encapsulated by this shadow root.
 */
export function prepareShadowTemplate(template: string, styles?: string | string[]): HTMLTemplateElement {
  const templateElement = parseTemplateString(template);

  // Deprecated in favor of `setShadowStyles()`, leaving for backwards compatibility
  // TODO: remove this in next major version, and remove `styles` argument above
  if (styles) {
    styles = styles instanceof Array ? styles : [styles];
    const styleElement = document.createElement('style');
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const nonce = (window as any)['forgeNonce'];
    if (nonce) {
      styleElement.setAttribute('nonce', nonce);
    }
    styleElement.textContent = styles.join(' ');
    templateElement.content.appendChild(styleElement);
  }

  return templateElement;
}

/**
 * Appends a template to the provided components shadow root.
 * @param {T} componentInstance A component instance.
 * @param {string | HTMLTemplateElement} template A template string or template element to be cloned.
 */
export function setShadowTemplate<T extends HTMLElement>(componentInstance: T, template: string | HTMLTemplateElement, { force } = { force: false }): void {
  const ctor = componentInstance.constructor;
  if (force || !ctor[CUSTOM_ELEMENT_TEMPLATE_PROPERTY]) {
    const templateElement = template instanceof HTMLTemplateElement ? template : parseTemplateString(template);
    ctor[CUSTOM_ELEMENT_TEMPLATE_PROPERTY] = templateElement;
  }
  const resolvedTemplate = ctor[CUSTOM_ELEMENT_TEMPLATE_PROPERTY] as HTMLTemplateElement;
  (componentInstance.shadowRoot as ShadowRoot).appendChild(resolvedTemplate.content.cloneNode(true));
}

/**
 * Applies styles to the shadow root of the provided element instance.
 * @param {T} componentInstance A component instance.
 * @param {string | string[]} styles The styles to be applied to the shadow root.
 * @param options Options for setting the styles.
 */
export function setShadowStyles<T extends HTMLElement>(componentInstance: T, styles: string | string[], { force } = { force: false }): void {
  const ctor = componentInstance.constructor;

  if (!componentInstance.shadowRoot || !styles) {
    if (supportsConstructableStyleSheets) {
      if (ctor[CUSTOM_ELEMENT_STYLESHEETS_PROPERTY]) {
        ctor[CUSTOM_ELEMENT_STYLESHEETS_PROPERTY] = [];
      }
      if (componentInstance.shadowRoot) {
        componentInstance.shadowRoot.adoptedStyleSheets = [];
      }
    }
    return;
  }

  styles = styles instanceof Array ? styles : [styles];

  if (supportsConstructableStyleSheets) {
    if (force || !ctor[CUSTOM_ELEMENT_STYLESHEETS_PROPERTY]) {
      const context = componentInstance.ownerDocument.defaultView ?? window;
      const sheet = new context.CSSStyleSheet();
      const cssText = styles.join(' ');
      sheet.replaceSync(cssText);
      ctor[CUSTOM_ELEMENT_CSS_PROPERTY] = cssText;
      ctor[CUSTOM_ELEMENT_STYLESHEETS_PROPERTY] = [sheet];
    }
    componentInstance.shadowRoot.adoptedStyleSheets = ctor[CUSTOM_ELEMENT_STYLESHEETS_PROPERTY];
  } else {
    const styleElement = document.createElement('style');
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const nonce = (window as any)['forgeNonce'];
    if (nonce) {
      styleElement.setAttribute('nonce', nonce);
    }
    styleElement.textContent = styles.join(' ');
    componentInstance.shadowRoot.appendChild(styleElement);
  }
}

/**
 * Re-applies styles to the shadow root of the provided element instance. This function is
 * intended to be called after an element has been adopted by a new document to reconstruct the
 * adopted stylesheet instances within the context (view) of the new document.
 *
 * @param componentInstance The component instance to reapply styles to.
 */
export function readoptStyles<T extends HTMLElement>(componentInstance: T): void {
  if (
    !supportsConstructableStyleSheets ||
    !componentInstance.shadowRoot ||
    !componentInstance.constructor[CUSTOM_ELEMENT_CSS_PROPERTY] ||
    !componentInstance.ownerDocument.defaultView
  ) {
    return;
  }
  const sheet = new componentInstance.ownerDocument.defaultView.CSSStyleSheet();
  sheet.replaceSync(componentInstance.constructor[CUSTOM_ELEMENT_CSS_PROPERTY]);
  componentInstance.shadowRoot.adoptedStyleSheets = [sheet];
}

/**
 * Gets an HTML element using a query selector from the provided components` shadow root.
 * @param {HTMLElement} componentInstance The component instance that contains a shadow root.
 * @param {string} selector The selector to be passed to `querySelector`.
 */
export function getShadowElement<T extends HTMLElement>(componentInstance: T, selector: string): HTMLElement {
  return (componentInstance.shadowRoot as ShadowRoot).querySelector(selector) as HTMLElement;
}

/**
 * Gets an HTML element using a query selector from the provided components` light DOM.
 * @param {HTMLElement} componentInstance The component instance.
 * @param {string} selector The selector to be passed to `querySelector`.
 */
export function getLightElement<T extends HTMLElement>(componentInstance: T, selector: string): HTMLElement {
  return componentInstance.querySelector(selector) as HTMLElement;
}

/**
 * Creates and dispatches a cross-browser `CustomEvent` with the provided type and data.
 * @param {string} type
 * @param {any} data
 * @param {boolean=} bubble
 */
export function emitEvent<T extends HTMLElement>(component: T, type: string, data: any, bubble = true, cancelable = false): boolean {
  let evt;

  if (typeof CustomEvent === 'function') {
    evt = new CustomEvent(type, {
      detail: data,
      bubbles: bubble,
      cancelable
    } as any);
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, bubble, cancelable, data);
  }

  return component.dispatchEvent(evt);
}

/**
 * Replaces the provided element with a placeholder comment and vice versa.
 * Useful for hiding and showing elements while retaining their location in the DOM.
 * @param {boolean} isVisible Whether the element is visible or not.
 * @param {string} elementName The element tag name.
 * @param {string} selector The selector used to find the element
 * @param {Node} element The element
 * @param {Comment} placeholder The existing placeholder
 */
export function toggleElementPlaceholder(
  component: HTMLElement,
  isVisible: boolean,
  elementName: string,
  selector: string,
  element: Node,
  placeholder: Comment
): Comment {
  const exists = !!getShadowElement(component, selector);

  if (!placeholder) {
    placeholder = document.createComment(`(${elementName}) ${selector}`);
  }

  if (isVisible && !exists) {
    replaceElement(element, placeholder);
  } else if (!isVisible && exists) {
    replaceElement(placeholder, element);
  }

  return placeholder;
}

/**
 * Walks up the tree starting a specific node and stops when it finds a shadow root.
 * @param {Node} node The node to start searching from.
 * @returns {ShadowRoot | null} The closest shadow root ancestor, or null if not inside a shadow root.
 */
export function getClosestShadowRoot(node: Node): ShadowRoot | null {
  return walkUpUntil(node, current => current.toString() === '[object ShadowRoot]') as ShadowRoot;
}

/**
 * Finds the closest element up the tree from a starting element across shadow boundaries.
 * @param selector The CSS selector for the element to find.
 * @param startElement The element to start finding from.
 */
export function closestElement(selector: string, startElement: Element): Element | null {
  function __closestFrom(el: Element | Window | Document | null): Element | null {
    if (!el || el === document || el === window) {
      return null;
    }
    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot;
    }
    const found = (el as Element).closest(selector);
    return found || __closestFrom(((el as Element).getRootNode() as ShadowRoot).host);
  }
  return __closestFrom(startElement);
}
