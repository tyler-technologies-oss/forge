import { isDefined } from '@tylertech/forge-core';

/**
 * A callback function for handling forwarded attributes.
 */
export type AttributeForwardingCallback = (name: string, value: string | null, part: string | null) => void;

/**
 * ARIA attributes capable of being reflected to a shadow element.
 */
export const REFLECTIVE_ARIA_ATTRIBUTES = [
  'aria-atomic',
  'aria-autocomplete',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colspan',
  'aria-current',
  'aria-description',
  'aria-disabled',
  'aria-expanded',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-level',
  'aria-live',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-relevant',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext'
];
/**
 * ARIA attributes typically useful for input elements.
 */
export const INPUT_ARIA_ATTRIBUTES = ['aria-autocomplete', 'aria-description', 'aria-invalid', 'aria-keyshortcuts', 'aria-label'];
/**
 * Property names relevant to input elements.
 */
export const INPUT_PROPERTIES: (keyof HTMLInputElement)[] = ['checked', 'disabled', 'indeterminate', 'readOnly', 'required', 'value'];
/**
 * Attributes for buttons when used within a form.
 */
export const BUTTON_FORM_ATTRIBUTES = ['name', 'value', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'];

/**
 * Gets an array of attribute names prefixed by a part name and colon.
 * @param part The part name of a shadow element.
 * @param attributes An array of attribute names to prefix.
 * @returns An array of prefixed attribute name strings.
 */
export function getPartPrefixedAttributes(part: string, attributes: string[]): string[] {
  return attributes.map(attr => `${part}:${attr}`);
}

/**
 * Observes a configured array of attributes set on a source element and forwards them to a
 * callback function.
 * @param from The element to forward attributes from.
 * @param attributes Forwarded attributes.
 * @param callback A function to handle forwarded attributes.
 * @returns A `MutationObserver`.
 */
export function forwardAttributes(from: HTMLElement, attributes: string[], callback: AttributeForwardingCallback, genericize = true): MutationObserver {
  // Set the source element's role to presentation to prevent duplicated ARIA attributes being
  // seen by assistive technology
  if (genericize && attributes.some(attr => attr.toLowerCase().startsWith('aria-'))) {
    from.setAttribute('role', 'presentation');
  }

  // Parses an attribute and sends it to the provided callback
  const forwardAttribute = (name: string): void => {
    const nameParts = name.split(':');
    const partName = nameParts.length === 2 ? nameParts[0] : null;
    const attrName = nameParts.length === 2 ? nameParts[1] : nameParts[0];
    const value = from.getAttribute(name);

    callback.call({}, attrName, value, partName);
  };

  // First, forward any attributes already set on the source element
  attributes.forEach(attr => forwardAttribute(attr));

  // Forward new and changed attributes as needed
  const observerConfig: MutationObserverInit = { attributeFilter: attributes };
  const observerCallback: MutationCallback = mutationList => {
    mutationList.forEach(mutation => forwardAttribute(mutation.attributeName as string));
  };
  const observer = new MutationObserver(observerCallback);
  observer.observe(from, observerConfig);
  return observer;
}

/**
 * Clones attributes from one element to another.
 * @param from The source element to clone attributes from.
 * @param to The target element to clone attributes to.
 * @param attributes The list of attributes to clone.
 */
export function cloneAttributes(from: HTMLElement, to: HTMLElement, attributes: string[]): void {
  attributes.forEach(attr => {
    const value = from.getAttribute(attr);
    if (value !== null) {
      to.setAttribute(attr, value);
    }
  });
}

/**
 * Clones properties from one element to another.
 * @param from The source element to clone properties from.
 * @param to The target element to clone properties to.
 * @param attributes The list of properties to clone.
 */
export function cloneProperties<T, K extends keyof T>(from: T, to: T, properties: K[]): void {
  properties.forEach(prop => {
    const value = from[prop];
    if (isDefined(value)) {
      to[prop] = value;
    }
  });
}

/**
 * Clones the validation message of one input element to another.
 * @param from The source input element to clone the validation message from.
 * @param to The target input element to clone the validation message to.
 */
export function cloneValidationMessage(from: HTMLInputElement, to: HTMLInputElement): void {
  const message = from.validationMessage;
  if (message) {
    to.setCustomValidity(message);
  }
}

/**
 * A utility class for switching between elements.
 */
export class SlottedElementAdapter<T extends HTMLElement = HTMLElement> {
  private _el: T;
  private _attachCallback: (newEl: T, oldEl: T) => void;

  /**
   * Returns the element associated with this adapter.
   */
  public get el(): T {
    return this._el;
  }

  /**
   * Clones the specified attributes from one element to another.
   *
   * @param from - The element to clone attributes from.
   * @param to - The element to clone attributes to.
   * @param attributes - The names of the attributes to clone.
   */
  public static cloneAttributes(from: HTMLElement, to: HTMLElement, attributes: string[]): void {
    cloneAttributes(from, to, attributes);
  }

  /**
   * Clones the input specific properties from one element to another.
   *
   * @param from - The element to clone properties from.
   * @param to - The element to clone properties to.
   */
  public static cloneProperties(from: HTMLElement, to: HTMLElement, properties: (keyof HTMLElement)[]): void {
    cloneProperties(from, to, properties);
  }

  /**
   * Clones the validation message from one element to another.
   *
   * @param from - The element to clone the validation message from.
   * @param to - The element to clone the validation message to.
   */
  public static cloneValidationMessage(from: HTMLElement, to: HTMLElement): void {
    if (Object.hasOwnProperty.call(from, 'validationMessage') && Object.hasOwnProperty.call(to, 'validationMessage')) {
      cloneValidationMessage(from as HTMLInputElement, to as HTMLInputElement);
    } else {
      console.warn('cloneValidationMessage() requires both elements to be input elements.');
    }
  }

  /**
   * Initializes the adapter with an initial element and attach callback.
   *
   * @param el - The element to associate with the adapter.
   * @param attachCallback - The callback to invoke when attaching the element.
   */
  public initialize(el: T, attachCallback: (newEl: T, oldEl: T) => void): void {
    this._attachCallback = attachCallback;
    this._el = el;
  }

  /**
   * Replaces the attached element.
   *
   * @param el - The new element to attach.
   */
  public attachElement(el: T): void {
    this._attachCallback(el, this._el);
    this._el = el;
  }
}
