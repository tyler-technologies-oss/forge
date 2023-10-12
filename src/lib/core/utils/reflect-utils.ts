import { isDefined } from '@tylertech/forge-core';

export type AttributeForwardingCallback = (name: string, value: string | null, part: string | null) => void;

export const ARIA_ATTRIBUTES = [
  'aria-atomic',
  'aria-autocomplete',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colspan',
  'aria-current',
  'aria-description',
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
export const ARIA_INPUT_ATTRIBUTES = [
  'aria-autocomplete',
  'aria-description',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label'
];
export const LIVE_REGION_ATTRIBUTES = [
  'aria-busy',
  'aria-live',
  'aria-atomic'
];

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
export function forwardAttributes(from: HTMLElement, attributes: string[], callback: AttributeForwardingCallback): MutationObserver {
  // Set the source element's role to presentation to prevent duplicated ARIA attributes being
  // seen by assistive technology
  if (attributes.some(attr => attr.toLowerCase().startsWith('aria'))) {
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
 * Clones input properties from one element to another.
 * @param from The source element to clone input properties from.
 * @param to The target element to clone input properties to.
 */
export function cloneInputProperties(from: HTMLInputElement, to: HTMLInputElement): void {
  const properties = [
    'value',
    'checked',
    'indeterminate',
    'disabled',
    'required',
    'readOnly'
  ];
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
