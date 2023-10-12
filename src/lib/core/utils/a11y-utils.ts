import { toggleAttribute } from '@tylertech/forge-core';

// Attributes referencing element IDs can't be forwarded across shadow boundaries
export const forwardingAriaAttributes = [
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

/**
 * Gets an array of ARIA attribute names to be observed by a component.
 * @param config An object indicating the part prefixes to append to the ARIA attribute names and
 * whether to include unprefied names.
 * @returns An array of observed ARIA attribute names.
 */
export function getObservedAriaAttributes(config: { unprefixed?: boolean; parts?: string[] }): string[] {
  const observedAttributes: string[] = [];
  if (config.unprefixed) {
    observedAttributes.push(...forwardingAriaAttributes);
  }
  if (config.parts) {
    config.parts.forEach(part => {
      const partAttributes = forwardingAriaAttributes.map(attribute => `${part}:${attribute}`);
      observedAttributes.push(...partAttributes);
    });
  }
  return observedAttributes;
}

/**
 * Sets ARIA attributes on one or more target elements to match those set on a source element. The
 * source element is hidden from assistive technology to avoid duplicate semantics. ID dependent
 * attributes are ignored.
 * @param config A configuration object setting the observed attributes, the element to forward
 * attributes from, an optional element to forward unprefixed attributes to and an optional object
 * containing elements to forward prefixed attributes to. Attributes may target an element by
 * following the naming pattern `"part:aria-*"`.
 * @returns A `MutationObserver`.
 */
export function forwardAriaAttributes(config: {
  observedAttributes: string[];
  sourceEl: HTMLElement;
  targetEl?: HTMLElement;
  parts?: Record<string, HTMLElement>;
}): MutationObserver {
  // Set the source element's role to presentation to prevent duplicated ARIA attributes being
  // seen by assistive technology
  config.sourceEl.setAttribute('role', 'presentation');

  // Sets an attribute on the targeted element
  const forwardAttribute = (name: string): void => {
    const nameParts = name.split(':');
    const partName = nameParts.length === 2 ? nameParts[0] : undefined;
    const ariaName = nameParts.length === 2 ? nameParts[1] : nameParts[0];

    const target = partName ? config.parts?.[partName] : config.targetEl;
    if (!target) {
      return;
    }

    const hasAttribute = config.sourceEl.hasAttribute(name);
    const value = config.sourceEl.getAttribute(name) ?? undefined;

    toggleAttribute(target, hasAttribute, ariaName, value);
  };

  // First, forward any attributes already set on the source element
  config.observedAttributes.forEach(attribute => {
    forwardAttribute(attribute);
  });

  // Forward new and changed attributes as needed
  const observerConfig: MutationObserverInit = { attributeFilter: config.observedAttributes };
  const callback: MutationCallback = mutationList => {
    mutationList.forEach(mutation => {
      forwardAttribute(mutation.attributeName as string);
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(config.sourceEl, observerConfig);
  return observer;
}
