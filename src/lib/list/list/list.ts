import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ListAdapter } from './list-adapter';
import { ListFoundation } from './list-foundation';
import { LIST_CONSTANTS } from './list-constants';
import { ListItemComponent } from '../list-item';
import { setDefaultAria } from '../../constants';
import { WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { WithDefaultAria } from '../../core/mixins/internals/with-default-aria';

import template from './list.html';
import styles from './list.scss';

export interface IListProperties<T = unknown> {
  dense: boolean;
  indented: boolean;
  selectedValue: T;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
}

export interface IListComponent<T = unknown> extends IListProperties<T>, IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-list': IListComponent;
  }
}

/**
 * @tag forge-list
 * 
 * @summary Lists are vertical groupings of related content.
 * 
 * @csspart root - The component's root container element.
 * 
 * @slot - The default/unnamed slot for child list items.
 *
 * @cssproperty --forge-list-container-color - The background color of the list surface.
 * @cssproperty --forge-list-spacing - The spacing between the list items.
 * 
 * @property {boolean} dense - Whether the list has all dense items or not.
 * @property {boolean} indented - Whether the list items within this list are indented. Default is false.
 * @property {unknown | unknown[]} selectedValue - The selected list item value(s).
 * @property {boolean} twoLine - Whether the list has all two-line items or not.
 * @property {boolean} threeLine - Whether the list has all three-line items or not.
 * @property {boolean} wrap - Whether the list has all items that wrap their text or not.
 * 
 * @attribute {boolean} dense - Whether the list has all dense items or not.
 * @attribute {string} selected-value - The selected list item value(s).
 * @attribute {boolean} indented - Whether the list items within this list are indented. Default is false.
 * @attribute {boolean} two-line - Whether the list has all two-line items or not.
 * @attribute {boolean} three-line - Whether the list has all three-line items or not.
 * @attribute {boolean} wrap - Whether the list has all items that wrap their text or not.
 * @attribute {boolean} navlist - Controls whether the list is styled a navigation list or not.
 */
@CustomElement({
  name: LIST_CONSTANTS.elementName,
  dependencies: [
    ListItemComponent
  ]
})
export class ListComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements IListComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LIST_CONSTANTS.observedAttributes);
  }

  private _foundation: ListFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ListFoundation(new ListAdapter(this));
  }

  public connectedCallback(): void {
    this[setDefaultAria]({ role: 'list' }, { setAttribute: !this.hasAttribute('role') });
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LIST_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.INDENTED:
        this.indented = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.SELECTED_VALUE:
        this.selectedValue = newValue;
        break;
      case LIST_CONSTANTS.attributes.TWO_LINE:
        this.twoLine = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.THREE_LINE:
        this.threeLine = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.WRAP:
        this.wrap = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare indented: boolean;

  @FoundationProperty()
  public declare selectedValue: any;

  @FoundationProperty()
  public declare twoLine: boolean;

  @FoundationProperty()
  public declare threeLine: boolean;

  @FoundationProperty()
  public declare wrap: boolean;
}
