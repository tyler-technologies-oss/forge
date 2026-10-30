import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, deepQuerySelectorAll, isDeepEqual, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { ListItemComponent } from '../list-item/list-item.js';
import { LIST_ITEM_CONSTANTS } from '../list-item/list-item-constants.js';
import { LIST_CONSTANTS } from './list-constants.js';

import styles from './list.scss';

export interface IListProperties<T = unknown> {
  dense: boolean;
  indented: boolean;
  selectedValue: T;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
  noninteractive: boolean;
  multicolumn: boolean;
}

type ListItemBooleanProperty = 'dense' | 'indented' | 'twoLine' | 'threeLine' | 'wrap' | 'noninteractive';

/** @deprecated - This will be removed in the future. Please switch to using ListComponent. */
export interface IListComponent<T = unknown> extends IListProperties<T>, BaseLitElement {}

/**
 * @tag forge-list
 *
 * @summary Lists are vertically oriented groups of related content that allow users to select or view one or more items from a set.
 *
 * @dependency forge-list-item
 *
 * @csspart root - The component's root container element.
 *
 * @slot - The default/unnamed slot for child list items.
 *
 * @cssproperty --forge-list-container-color - The background color of the list surface.
 * @cssproperty --forge-list-spacing - The spacing between the list items.
 * @cssproperty --forge-list-column-width - The minimum width of each column when the list is in multicolumn mode.
 * @cssproperty --forge-list-column-spacing - The spacing between columns when the list is in multicolumn mode.
 *
 * @cssclass forge-list - The list container element.
 * @cssclass forge-list--dense - Applies a dense style to the list items.
 * @cssclass forge-list--navlist - Applies a navigation style to the list items. Use this when placed in a drawer or other side-navigation.
 * @cssclass forge-list--two-line - Applies a two-line style to the list items.
 * @cssclass forge-list--three-line - Applies a three-line style to the list items.
 * @cssclass forge-list--indented - Indents the list items.
 * @cssclass forge-list--wrap - Wraps the text of the list items.
 * @cssclass forge-list--disabled - Applies a disabled style to the list items.
 * @cssclass forge-list--multicolumn - Applies a responsive multi-column grid layout to the list.
 */
export class ListComponent extends BaseLitElement implements IListComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LIST_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ListItemComponent];

  #internals: ElementInternals;

  /**
   * Whether the list has all dense items or not.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public dense = false;

  /**
   * Whether the list items within this list are indented.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public indented = false;

  /**
   * The selected list item value(s).
   * @attribute selected-value
   */
  @property({ attribute: 'selected-value' })
  public selectedValue: any;

  /**
   * Whether the list has all two-line items or not.
   * @default false
   * @attribute two-line
   */
  @property({ type: Boolean, attribute: 'two-line', reflect: true })
  public twoLine = false;

  /**
   * Whether the list has all three-line items or not.
   * @default false
   * @attribute three-line
   */
  @property({ type: Boolean, attribute: 'three-line', reflect: true })
  public threeLine = false;

  /**
   * Whether the list has all items that wrap their text or not.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public wrap = false;

  /**
   * Controls whether the list items will automatically attach themselves to interactive slotted elements or not.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public noninteractive = false;

  /**
   * Whether the list displays items in multiple columns using a responsive grid layout.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public multicolumn = false;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'list' }, { setAttribute: !this.hasAttribute('role') });

    if (this.hasUpdated && this.#hasSelectedValue) {
      this.#setSelectedListItems();
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    this.#syncListItemsProperty('dense', changedProperties);
    this.#syncListItemsProperty('indented', changedProperties);
    this.#syncListItemsProperty('twoLine', changedProperties);
    this.#syncListItemsProperty('threeLine', changedProperties);
    this.#syncListItemsProperty('wrap', changedProperties);
    this.#syncListItemsProperty('noninteractive', changedProperties);

    if (changedProperties.has('selectedValue')) {
      this.#setSelectedListItems();
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-list" part="root">
        <div id="inner" class=${classMap({ inner: true, [LIST_CONSTANTS.classes.MULTICOLUMN]: this.multicolumn })}>
          <slot></slot>
        </div>
      </div>
    `;
  }

  get #hasSelectedValue(): boolean {
    return this.selectedValue !== undefined && this.selectedValue !== null;
  }

  /** Select all list items that match values in the provided array of values. */
  #setSelectedListItems(): void {
    const listItems = this.#getOwnListItems();
    if (!listItems.length) {
      return;
    }
    const values = Array.isArray(this.selectedValue) ? this.selectedValue : [this.selectedValue];
    for (const item of listItems) {
      item.selected = values.some(val => isDeepEqual(val, item.value));
    }
  }

  #syncListItemsProperty(name: ListItemBooleanProperty, changedProperties: PropertyValues<this>): void {
    // Skip the initial default value so that list items keep any state that they were given directly
    const isInitialDefault = changedProperties.get(name) === undefined && !this[name];
    if (!changedProperties.has(name) || isInitialDefault) {
      return;
    }
    this.#getOwnListItems().forEach(listItem => (listItem[name] = this[name]));
  }

  #getOwnListItems(): ListItemComponent[] {
    // Find all deeply nested list items
    const allChildListItems = deepQuerySelectorAll(this, LIST_ITEM_CONSTANTS.elementName) as ListItemComponent[];

    // Get all list items that are scoped to this component only (not within sub-lists).
    const scopedListItems: ListItemComponent[] = [];
    const listener: EventListener = evt => {
      const composedPath = evt.composedPath();
      const composedBeforeUs = composedPath.slice(0, composedPath.indexOf(this));
      if (!composedBeforeUs.some((el: HTMLElement) => el.localName === LIST_CONSTANTS.elementName.toLowerCase())) {
        scopedListItems.push(evt.target as ListItemComponent);
      }
    };
    this.addEventListener(LIST_CONSTANTS.events.SCOPE_TEST, listener);
    allChildListItems.forEach(li => li.dispatchEvent(new CustomEvent(LIST_CONSTANTS.events.SCOPE_TEST, { bubbles: true, composed: true })));
    this.removeEventListener(LIST_CONSTANTS.events.SCOPE_TEST, listener);

    return scopedListItems;
  }
}

tryDefine(LIST_CONSTANTS.elementName, ListComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-list': IListComponent;
  }
}
