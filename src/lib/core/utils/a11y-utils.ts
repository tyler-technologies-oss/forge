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
 * Gets an array of attribute names following prefixed by a part name and colon.
 * @param part The part name of a shadow element.
 * @param attributes An array of attribute names to prefix.
 * @returns An array of prefixed attribute name strings.
 */
export function getPartPrefixedAttributes(part: string, attributes: string[]): string[] {
  return attributes.map(attr => `${part}:${attr}`);
}

/**
 * Observes a configured array of attributes set on a source element and forwards them to callback
 * function.
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
