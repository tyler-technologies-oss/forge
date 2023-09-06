import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../../core/base/base-component';
import { ListAdapterExp } from './list-adapter';
import { ListFoundationExp } from './list-foundation';
import { LIST_CONSTANTS_EXP } from './list-constants';

import template from './list.html';
import styles from './list.scss';
import { ListItemComponentExp } from '../list-item';

export interface IListComponentExp extends IBaseComponent {
  /** @deprecated Use nonInteractive instead. */
  static: boolean;
  nonInteractive: boolean;
  disabled: boolean;
  dense: boolean;
  indented: boolean;
  selectedValue: any;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-list-exp': IListComponentExp;
  }
}

/**
 * @tag forge-list-exp
 * 
 * @summary Lists are vertical groupings of related content.
 * 
 * @csspart root - The component's root container element.
 * 
 * @slot - The default/unnamed slot for child list items.
 *
 * @cssproperty --forge-list-container-color - The background color of the list surface,
 * @cssproperty --forge-list-block-padding - The block padding of the list before and after the list items.
 * @cssproperty --forge-list-inline-padding - The inline padding of the list next to the list items.
 * 
 * @property {boolean} static - Whether the list has all static items or not.
 * @property {boolean} nonInteractive - Whether the list has all non-interactive items or not.
 * @property {boolean} disabled - Whether the list items are disabled or not.
 * @property {boolean} dense - Whether the list has all dense items or not.
 * @property {boolean} indented - Whether the list items within this list are indented. Default is false.
 * @property {unknown | unknown[]} selectedValue - The selected list item value(s).
 * @property {boolean} twoLine - Whether the list has all two-line items or not.
 * @property {boolean} threeLine - Whether the list has all three-line items or not.
 * @property {boolean} wrap - Whether the list has all items that wrap their text or not.
 * 
 * @attribute {boolean} static - Whether the list has all static items or not.
 * @attribute {boolean} non-interactive - Whether the list has all non-interactive items or not.
 * @attribute {boolean} disabled - Whether the list items are disabled or not.
 * @attribute {boolean} dense - Whether the list has all dense items or not.
 * @attribute {string} selected-value - The selected list item value(s).
 * @attribute {boolean} indented - Whether the list items within this list are indented. Default is false.
 * @attribute {boolean} two-line - Whether the list has all two-line items or not.
 * @attribute {boolean} three-line - Whether the list has all three-line items or not.
 * @attribute {boolean} wrap - Whether the list has all items that wrap their text or not.
 * @attribute {boolean} navlist - Controls whether the list is styled a navigation list or not.
 */
@CustomElement({
  name: LIST_CONSTANTS_EXP.elementName,
  dependencies: [
    ListItemComponentExp
  ]
})
export class ListComponentExp extends BaseComponent implements IListComponentExp {
  public static get observedAttributes(): string[] {
    return [
      LIST_CONSTANTS_EXP.attributes.STATIC,
      LIST_CONSTANTS_EXP.attributes.NON_INTERACTIVE,
      LIST_CONSTANTS_EXP.attributes.DISABLED,
      LIST_CONSTANTS_EXP.attributes.DENSE,
      LIST_CONSTANTS_EXP.attributes.SELECTED_VALUE,
      LIST_CONSTANTS_EXP.attributes.INDENTED,
      LIST_CONSTANTS_EXP.attributes.TWO_LINE,
      LIST_CONSTANTS_EXP.attributes.THREE_LINE,
      LIST_CONSTANTS_EXP.attributes.WRAP
    ];
  }

  private _foundation: ListFoundationExp;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ListFoundationExp(new ListAdapterExp(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LIST_CONSTANTS_EXP.attributes.STATIC:
      case LIST_CONSTANTS_EXP.attributes.NON_INTERACTIVE:
        this.nonInteractive = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS_EXP.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS_EXP.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS_EXP.attributes.INDENTED:
        this.indented = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS_EXP.attributes.SELECTED_VALUE:
        this.selectedValue = newValue;
        break;
      case LIST_CONSTANTS_EXP.attributes.TWO_LINE:
        this.twoLine = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS_EXP.attributes.THREE_LINE:
        this.threeLine = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS_EXP.attributes.WRAP:
        this.wrap = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare static: boolean;

  @FoundationProperty()
  public declare nonInteractive: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

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
