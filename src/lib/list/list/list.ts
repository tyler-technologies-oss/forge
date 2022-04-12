import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ListItemComponent } from '../list-item';
import { ListAdapter } from './list-adapter';
import { LIST_CONSTANTS } from './list-constants';
import { ListFoundation } from './list-foundation';

import template from './list.html';
import styles from './list.scss';

export interface IListComponent extends IBaseComponent {
  static: boolean;
  dense: boolean;
  propagateClick: boolean;
  indented: boolean;
  selectedValue: any;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-list': IListComponent;
  }
}

/**
 * The custom element class behind the `<forge-list>` element.
 */
@CustomElement({
  name: LIST_CONSTANTS.elementName,
  dependencies: [ListItemComponent]
})
export class ListComponent extends BaseComponent implements IListComponent {
  public static get observedAttributes(): string[] {
    return [
      LIST_CONSTANTS.attributes.STATIC,
      LIST_CONSTANTS.attributes.DENSE,
      LIST_CONSTANTS.attributes.SELECTED_VALUE,
      LIST_CONSTANTS.attributes.PROPAGATE_CLICK,
      LIST_CONSTANTS.attributes.INDENTED
    ];
  }

  private _foundation: ListFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ListFoundation(new ListAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LIST_CONSTANTS.attributes.STATIC:
        this.static = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.PROPAGATE_CLICK:
        this.propagateClick = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.INDENTED:
        this.indented = coerceBoolean(newValue);
        break;
      case LIST_CONSTANTS.attributes.SELECTED_VALUE:
        this.selectedValue = newValue;
        break;
    }
  }

  /** Gets/sets whether the list has all static items or not. */
  @FoundationProperty()
  public static: boolean;

  /** Gets/sets whether the list has all dense items or not. */
  @FoundationProperty()
  public dense: boolean;

  /** Gets/sets whether the list items allow mousedown events through to their underlying list item elements. Default is true. */
  @FoundationProperty()
  public propagateClick: boolean;

  /** Gets/sets whether the list items within this list are indented. Default is false. */
  @FoundationProperty()
  public indented: boolean;

  /** Gets/sets the selected list item value(s) */
  @FoundationProperty()
  public selectedValue: any;
}
