import { toggleAttribute } from '@tylertech/forge-core';

// Attributes referencing element IDs can't be forwarded across shadow boundaries
export const ariaAttributes = [
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
 * Sets ARIA attributes on one or more target elements to match those set on a source element. The
 * source element is hidden from assistive technology to avoid duplicate semantics. ID dependent
 * attributes are ignored.
 * @param sourceEl The element to forward attributes from.
 * @param targetEl The default element to forward attributes to.
 * @param parts An object of attribute prefixes with associated elements. Attributes may target an
 * element by following the naming pattern `"part:aria-*"`.
 * @returns A `MutationObserver`.
 */
export function forwardAriaAttributes(sourceEl: HTMLElement, targetEl?: HTMLElement, parts?: Record<string, HTMLElement>): MutationObserver {
  // Set the source element's role to presentation to prevent duplicated ARIA attributes being
  // seen by assistive technology
  sourceEl.setAttribute('role', 'presentation');

  // Build the array of observed attributes
  const observedAttributes: string[] = [];
  if (targetEl) {
    observedAttributes.push(...ariaAttributes);
  }
  if (parts) {
    Object.keys(parts).forEach(part => {
      const partAttributes = ariaAttributes.map(attribute => `${part}:${attribute}`);
      observedAttributes.push(...partAttributes);
    });
  }

  // Sets an attribute on the targeted element
  const forwardAttribute = (name: string): void => {
    const nameParts = name.split(':');
    const partName = nameParts.length === 2 ? nameParts[0] : undefined;
    const ariaName = nameParts.length === 2 ? nameParts[1] : nameParts[0];

    const target = partName ? parts?.[partName] : targetEl;
    if (!target) {
      return;
    }

    const hasAttribute = sourceEl.hasAttribute(name);
    const value = sourceEl.getAttribute(name) ?? undefined;

    toggleAttribute(target, hasAttribute, ariaName, value);
  };

  // First, forward any attributes already set on the source element
  observedAttributes.forEach(attribute => {
    forwardAttribute(attribute);
  });

  // Forward new and changed attributes as needed
  const config: MutationObserverInit = { attributeFilter: observedAttributes };
  const callback: MutationCallback = mutationList => {
    mutationList.forEach(mutation => {
      forwardAttribute(mutation.attributeName as string);
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(sourceEl, config);
  return observer;
}
