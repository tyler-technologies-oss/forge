/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/internal/aria/aria.ts)
 */

import { toggleAttribute } from '@tylertech/forge-core';
import { supportsElementInternalsAria } from './feature-detection';

/**
 * Reflective ARIA property name types.
 */
export type ARIAProperty = Exclude<keyof ARIAMixin, 'role'>;

/**
 * Reflective ARIA attributes.
 */
export type ARIAAttribute = `${ARIAPropertyToAttribute<ARIAProperty>}` | 'role';

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
 * An object mapping all ARIA attributes to their corresponding properties.
 * 
 * This is required because the property name cannot be reliably inferred from the attribute name.
 */
const ARIA_ATTRIBUTES_TO_PROPERTIES: Record<ARIAAttribute, ARIAProperty | 'role'> = {
  'aria-atomic': 'ariaAtomic',
  'aria-autocomplete': 'ariaAutoComplete',
  'aria-busy': 'ariaBusy',
  'aria-checked': 'ariaChecked',
  'aria-colcount': 'ariaColCount',
  'aria-colindex': 'ariaColIndex',
  'aria-colindextext': 'ariaColIndexText',
  'aria-colspan': 'ariaColSpan',
  'aria-current': 'ariaCurrent',
  'aria-disabled': 'ariaDisabled',
  'aria-expanded': 'ariaExpanded',
  'aria-haspopup': 'ariaHasPopup',
  'aria-hidden': 'ariaHidden',
  'aria-invalid': 'ariaInvalid',
  'aria-keyshortcuts': 'ariaKeyShortcuts',
  'aria-label': 'ariaLabel',
  'aria-level': 'ariaLevel',
  'aria-live': 'ariaLive',
  'aria-modal': 'ariaModal',
  'aria-multiline': 'ariaMultiLine',
  'aria-multiselectable': 'ariaMultiSelectable',
  'aria-orientation': 'ariaOrientation',
  'aria-placeholder': 'ariaPlaceholder',
  'aria-posinset': 'ariaPosInSet',
  'aria-pressed': 'ariaPressed',
  'aria-readonly': 'ariaReadOnly',
  'aria-required': 'ariaRequired',
  'aria-roledescription': 'ariaRoleDescription',
  'aria-rowcount': 'ariaRowCount',
  'aria-rowindex': 'ariaRowIndex',
  'aria-rowindextext': 'ariaRowIndexText',
  'aria-rowspan': 'ariaRowSpan',
  'aria-selected': 'ariaSelected',
  'aria-setsize': 'ariaSetSize',
  'aria-sort': 'ariaSort',
  'aria-valuemax': 'ariaValueMax',
  'aria-valuemin': 'ariaValueMin',
  'aria-valuenow': 'ariaValueNow',
  'aria-valuetext': 'ariaValueText',
  'role': 'role'
};

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
export type ARIAPropertyToAttribute<K extends string> = K extends `aria${infer Suffix}Element${infer OptS}`
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
 * Gets the ARIA property corresponding to a given ARIA attribute.
 * 
 * @param attribute An ARIA attribute name.
 * @returns An ARIA mixin property.
 */
export function ariaAttributeToProperty<K extends ARIAAttribute|'role'>(attribute: K): ARIAProperty {
  return ARIA_ATTRIBUTES_TO_PROPERTIES[attribute] as ARIAProperty;
}

export type DefaultAriaOptions = {
  setAttribute?: boolean;
};

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
 * @param properties - An object containing ARIA properties and their values to set as defaults.
 * @param options - A `DefaultAriaOptions` object.
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
  properties: Partial<ARIAMixinStrict>,
  { setAttribute: overwrite }: DefaultAriaOptions = { setAttribute: true }
): void {
  Object.entries(properties).forEach(([key, value]) => {
    if (supportsElementInternalsAria()) {
      internals[key as ARIAProperty] = value;
    }

    const attribute = ariaPropertyToAttribute(key as ARIAProperty);
    if (overwrite || !element.hasAttribute(attribute)) {
      toggleAttribute(element, value != null, attribute, value as string);
    }
  });
}
