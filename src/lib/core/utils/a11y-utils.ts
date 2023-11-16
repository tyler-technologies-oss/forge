import { toggleAttribute } from '@tylertech/forge-core';

/**
 * Reflective ARIA property name types.
 */
export type ARIAProperty = Exclude<keyof ARIAMixin, 'role'>;

/**
 * Reflective ARIA properties.
 */
export const ARIA_PROPERTIES: ARIAProperty[] = [
  'ariaAtomic',
  'ariaAutoComplete',
  'ariaBusy',
  'ariaChecked',
  'ariaColCount',
  'ariaColIndex',
  'ariaColSpan',
  'ariaCurrent',
  'ariaDisabled',
  'ariaExpanded',
  'ariaHasPopup',
  'ariaHidden',
  'ariaInvalid',
  'ariaKeyShortcuts',
  'ariaLabel',
  'ariaLevel',
  'ariaLive',
  'ariaModal',
  'ariaMultiLine',
  'ariaMultiSelectable',
  'ariaOrientation',
  'ariaPlaceholder',
  'ariaPosInSet',
  'ariaPressed',
  'ariaReadOnly',
  'ariaRequired',
  'ariaRoleDescription',
  'ariaRowCount',
  'ariaRowIndex',
  'ariaRowSpan',
  'ariaSelected',
  'ariaSetSize',
  'ariaSort',
  'ariaValueMax',
  'ariaValueMin',
  'ariaValueNow',
  'ariaValueText'
];

/**
 * ARIA role values.
 */
export type ARIARole =
  'alert'|'alertdialog'|'button'|'checkbox'|'dialog'|'gridcell'|'link'|'log'|
  'marquee'|'menuitem'|'menuitemcheckbox'|'menuitemradio'|'option'|
  'progressbar'|'radio'|'scrollbar'|'searchbox'|'slider'|'spinbutton'|
  'status'|'switch'|'tab'|'tabpanel'|'textbox'|'timer'|'tooltip'|'treeitem'|
  'combobox'|'grid'|'listbox'|'menu'|'menubar'|'radiogroup'|'tablist'|'tree'|
  'treegrid'|'application'|'article'|'cell'|'columnheader'|'definition'|
  'directory'|'document'|'feed'|'figure'|'group'|'heading'|'img'|'list'|
  'listitem'|'math'|'none'|'note'|'presentation'|'region'|'row'|'rowgroup'|
  'rowheader'|'separator'|'table'|'term'|'text'|'toolbar'|'banner'|
  'complementary'|'contentinfo'|'form'|'main'|'navigation'|'region'|'search'|
  'doc-abstract'|'doc-acknowledgments'|'doc-afterword'|'doc-appendix'|
  'doc-backlink'|'doc-biblioentry'|'doc-bibliography'|'doc-biblioref'|
  'doc-chapter'|'doc-colophon'|'doc-conclusion'|'doc-cover'|'doc-credit'|
  'doc-credits'|'doc-dedication'|'doc-endnote'|'doc-endnotes'|'doc-epigraph'|
  'doc-epilogue'|'doc-errata'|'doc-example'|'doc-footnote'|'doc-foreword'|
  'doc-glossary'|'doc-glossref'|'doc-index'|'doc-introduction'|'doc-noteref'|
  'doc-notice'|'doc-pagebreak'|'doc-pagelist'|'doc-part'|'doc-preface'|
  'doc-prologue'|'doc-pullquote'|'doc-qna'|'doc-subtitle'|'doc-tip'|'doc-toc';

/**
 * Strictly typed ARIA properties.
 */
export interface ARIAMixinStrict extends ARIAMixin {
  ariaAtomic: 'true'|'false'|null;
  ariaAutoComplete: 'none'|'inline'|'list'|'both'|null;
  ariaBusy: 'true'|'false'|null;
  ariaChecked: 'true'|'false'|null;
  ariaColCount: `${number}`|null;
  ariaColIndex: `${number}`|null;
  ariaColSpan: `${number}`|null;
  ariaCurrent: 'page'|'step'|'location'|'date'|'time'|'true'|'false'|null;
  ariaDisabled: 'true'|'false'|null;
  ariaExpanded: 'true'|'false'|null;
  ariaHasPopup: 'false'|'true'|'menu'|'listbox'|'tree'|'grid'|'dialog'|null;
  ariaHidden: 'true'|'false'|null;
  ariaInvalid: 'true'|'false'|null;
  ariaKeyShortcuts: string|null;
  ariaLabel: string|null;
  ariaLevel: `${number}`|null;
  ariaLive: 'assertive'|'off'|'polite'|null;
  ariaModal: 'true'|'false'|null;
  ariaMultiLine: 'true'|'false'|null;
  ariaMultiSelectable: 'true'|'false'|null;
  ariaOrientation: 'horizontal'|'vertical'|'undefined'|null;
  ariaPlaceholder: string|null;
  ariaPosInSet: `${number}`|null;
  ariaPressed: 'true'|'false'|null;
  ariaReadOnly: 'true'|'false'|null;
  ariaRequired: 'true'|'false'|null;
  ariaRoleDescription: string|null;
  ariaRowCount: `${number}`|null;
  ariaRowIndex: `${number}`|null;
  ariaRowSpan: `${number}`|null;
  ariaSelected: 'true'|'false'|null;
  ariaSetSize: `${number}`|null;
  ariaSort: 'ascending'|'descending'|'none'|'other'|null;
  ariaValueMax: `${number}`|null;
  ariaValueMin: `${number}`|null;
  ariaValueNow: `${number}`|null;
  ariaValueText: string|null;
  role: ARIARole|null;
}

/**
 * The ARIA attribute corresponding to a given ARIA property.
 */
type ARIAPropertyToAttribute<K extends string> = K extends `aria${infer Suffix}Element${infer OptS}`
  ? `aria-${Lowercase < Suffix >}`
  : K extends `aria${infer Suffix}` ? `aria-${Lowercase < Suffix >}` : K;

/**
 * Gets the ARIA attribute corresponding to a given ARIA property.
 * 
 * @param property An ARIA mixin property.
 * @returns An ARIA attribute name.
 */
export function ariaPropertyToAttribute<K extends ARIAProperty|'role'>(property: K): string {
  return property
    .replace('aria', 'aria-')
    // IDREF attributes also include an "Element" or "Elements" suffix
    .replace(/Elements?/g, '')
    .toLowerCase() as ARIAPropertyToAttribute<K>;
}

/**
 * Checks if the given ElementInternals object supports ARIA.
 * 
 * @param internals - The ElementInternals object to check.
 * @returns True if the ElementInternals object supports ARIA, false otherwise.
 */
export function supportsElementInternalsAria(internals: ElementInternals): boolean {
  return 'role' in internals;
}

// TODO: deprecate and remove `setupDefaultAria` and related functions when ARIA in
// ElementInternals is widely supported in all major browsers.

/**
 * Applies default ARIA to an element through ElementInternals if supported. Otherwise, ARIA
 * attributes are set directly on the element and stored in additional `data-default-*` attributes
 * for restoration in case attributes are overwritten during the element's lifecycle.
 * 
 * This fallback is needed for browsers that don't support ARIA in ElementInternals, such as most
 * recent versions of Firefox.
 * 
 * Because new attributes may be sprouted on the element, it is necessary to call this after the
 * element has been connected to the DOM.
 * 
 * @param element - The element to set up ARIA attributes for.
 * @param internals - The ElementInternals object to use for setting ARIA attributes if supported.
 * @param options - An object containing ARIA properties and their values to set as defaults.
 * @param overwrite - Whether to overwrite existing ARIA attributes on the element.
 * 
 * @example
 * class ButtonComponent extends BaseComponent {
 *  public readonly internals: ElementInternals;
 * 
 *  constructor() {
 *   super();
 *   this.internals = this.attachInternals();
 *  }
 * 
 *  public connectedCallback(): void {
 *    setDefaultAria(this, this.internals, {
 *     role: 'button'
 *    });
 *   }
 * }
 */
export function setDefaultAria(
  element: HTMLElement,
  internals: ElementInternals,
  options: Partial<ARIAMixinStrict>,
  overwrite = false
): void {
  if (supportsElementInternalsAria(internals)) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== null) {
        internals[key as ARIAProperty] = value;
      }
    });
    return;
  }

  Object.entries(options).forEach(([key, value]) => {
    if (value !== null) {
      const ariaAttribute = ariaPropertyToAttribute(key as ARIAProperty);
      if (overwrite || !element.hasAttribute(ariaAttribute)) {
        toggleAttribute(element, true, ariaPropertyToAttribute(key as ARIAProperty), value.toString());
      }
      storeDefaultAria(element, key as ARIAProperty, value);
    }
  });
}

/**
 * Sets a `*Default` property on an element to backup the default value of an ARIA attribute.
 * 
 * @param element The element to store the default ARIA value on.
 * @param property The ARIA mixin property.
 * @param value The default value to store.
 */
export function storeDefaultAria<T extends keyof ARIAMixinStrict>(element: HTMLElement, property: T, value: ARIAMixinStrict[T]): void {
  element[`${property.toString()}Default`] = value;
}

/**
 * Gets a default ARIA value from an element's `*Default` property.
 * 
 * @param element The element to retrieve the default ARIA value from.
 * @param property An ARIA mixin property.
 * @returns The value of the default ARIA attribute, or null if it does not exist.
 */
export function retrieveDefaultAria<T extends keyof ARIAMixinStrict>(element: HTMLElement, property: T): ARIAMixinStrict[T] | null {
  const value = element[`${property.toString()}Default`];
  return !!value ? value as ARIAMixinStrict[T] : null;
}

/**
 * Restores the given ARIA attribute of an element to its default value if it exists.
 * 
 * @param element The element to restore the ARIA attribute on.
 * @param property The ARIA mixin property.
 */
export function restoreDefaultAria<T extends keyof ARIAMixinStrict>(element: HTMLElement, property: T): void {
  const defaultValue = retrieveDefaultAria(element, property);
  if (defaultValue !== null) {
    toggleAttribute(element, true, ariaPropertyToAttribute(property), defaultValue.toString());
  }
}
