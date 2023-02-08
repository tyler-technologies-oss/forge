import { CustomElement, attachShadowTemplate, requireParent, elementParents, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { ListItemAdapter } from './list-item-adapter';
import { ListItemFoundation } from './list-item-foundation';
import { IListItemSelectEventData, LIST_ITEM_CONSTANTS } from './list-item-constants';
import { LIST_CONSTANTS } from '../list/list-constants';
import { IListComponent } from '../list';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import defaultTemplate from './list-item.html';
import styles from './list-item.scss';

export interface IListItemComponent extends IBaseComponent {
  static: boolean;
  twoLine: boolean;
  threeLine: boolean;
  active: boolean;
  selected: boolean;
  value: any;
  href: string;
  target: string;
  ripple: boolean;
  disabled: boolean;
  dense: boolean;
  propagateClick: boolean;
  indented: boolean;
  wrap: boolean;
  focus(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-list-item': IListItemComponent;
  }

  interface HTMLElementEventMap {
    'forge-list-item-select': CustomEvent<IListItemSelectEventData>;
  }
}

/**
 * The custom element class behind the `<forge-list-item>` element.
 * 
 * @tag forge-list-item
 */
@CustomElement({
  name: LIST_ITEM_CONSTANTS.elementName
})
export class ListItemComponent extends BaseComponent implements IListItemComponent {
  public static get observedAttributes(): string[] {
    return [
      LIST_ITEM_CONSTANTS.attributes.STATIC,
      LIST_ITEM_CONSTANTS.attributes.TWO_LINE,
      LIST_ITEM_CONSTANTS.attributes.THREE_LINE,
      LIST_ITEM_CONSTANTS.attributes.ACTIVE,
      LIST_ITEM_CONSTANTS.attributes.SELECTED,
      LIST_ITEM_CONSTANTS.attributes.VALUE,
      LIST_ITEM_CONSTANTS.attributes.HREF,
      LIST_ITEM_CONSTANTS.attributes.TARGET,
      LIST_ITEM_CONSTANTS.attributes.RIPPLE,
      LIST_ITEM_CONSTANTS.attributes.DISABLED,
      LIST_ITEM_CONSTANTS.attributes.DENSE,
      LIST_ITEM_CONSTANTS.attributes.PROPAGATE_CLICK,
      LIST_ITEM_CONSTANTS.attributes.INDENTED,
      LIST_ITEM_CONSTANTS.attributes.WRAP
    ];
  }

  private _foundation: ListItemFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, defaultTemplate, styles);
    this._foundation = new ListItemFoundation(new ListItemAdapter(this));
  }

  public connectedCallback(): void {
    // To simulate the :host-context() selector for Firefox until they implement it, we need to determine if the
    // list item is within a drawer for auto-styling the list item when included within a drawer. Check to see if
    // any of the parents of this element are a drawer.
    if (!this.hasAttribute(LIST_ITEM_CONSTANTS.attributes.DRAWER_CONTEXT) && elementParents(this).some(el => ['forge-drawer', 'forge-modal-drawer', 'forge-mini-drawer'].includes(el.tagName.toLowerCase()))) {
      this.setAttribute(LIST_ITEM_CONSTANTS.attributes.DRAWER_CONTEXT, 'true');
    }

    const list = requireParent<IListComponent>(this, LIST_CONSTANTS.elementName);
    if (list) {
      this._inheritParentListProps(list);
    }

    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LIST_ITEM_CONSTANTS.attributes.STATIC:
        this.static = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.TWO_LINE:
        this.twoLine = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.THREE_LINE:
        this.threeLine = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.ACTIVE:
        this.active = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case LIST_ITEM_CONSTANTS.attributes.HREF:
        this.href = newValue;
        break;
      case LIST_ITEM_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
      case LIST_ITEM_CONSTANTS.attributes.RIPPLE:
        this.ripple = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.PROPAGATE_CLICK:
        this.propagateClick = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.INDENTED:
        this.indented = coerceBoolean(newValue);
        break;
      case LIST_ITEM_CONSTANTS.attributes.WRAP:
        this.wrap = coerceBoolean(newValue);
        break;
    }
  }

  private _inheritParentListProps(list: IListComponent): void {
    if (list.hasAttribute(LIST_CONSTANTS.attributes.STATIC)) {
      this.static = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.DENSE)) {
      this.dense = true;
    }
    if (list.getAttribute(LIST_CONSTANTS.attributes.PROPAGATE_CLICK) === 'false') {
      this.propagateClick = false;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.INDENTED)) {
      this.indented = true;
    }
  }

  /** Gets/sets whether the static state of this list item. */
  @FoundationProperty()
  public static: boolean;

  /** Gets/sets whether the list item displays two lines of text. */
  @FoundationProperty()
  public twoLine: boolean;

  /** Gets/sets whether the list item displays three lines of text. */
  @FoundationProperty()
  public threeLine: boolean;

  /** Gets/sets whether the list item is active or not. */
  @FoundationProperty()
  public active: boolean;

  /** Gets/sets whether the list item is selected or not. */
  @FoundationProperty()
  public selected: boolean;

  /** Gets/sets list item value. */
  @FoundationProperty()
  public value: any;

  /** Gets/sets the href link that this list item will send the browser to when clicked. */
  @FoundationProperty()
  public href: string;

  /** Gets/sets the href link target. Only pertains when `href` is also used. */
  @FoundationProperty()
  public target: string;

  /** Gets/sets whether the list item has a ripple or not. */
  @FoundationProperty()
  public ripple: boolean;

  /** Gets/sets whether the list item is disabled or not. */
  @FoundationProperty()
  public disabled: boolean;

  /** Gets/sets whether the list item is using dense styles or not. */
  @FoundationProperty()
  public dense: boolean;

  /** Gets/sets whether the list item allows mousedown events through to the underlying list item element. Default is true. */
  @FoundationProperty()
  public propagateClick: boolean;

  /** Gets/sets whether the list item is indented or not. Default is false. */
  @FoundationProperty()
  public indented: boolean;

  /** Gets/sets whether the list item content is wrapped or not. Default is true. */
  @FoundationProperty()
  public wrap: boolean;

  /** Sets focus to this list item. */
  public override focus(): void {
    this._foundation.setFocus();
  }
}
