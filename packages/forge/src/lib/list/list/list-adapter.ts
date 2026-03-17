import { deepQuerySelectorAll, isDeepEqual, getShadowElement, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter } from '../../core/base/base-adapter.js';
import { IListComponent } from './list.js';
import { LIST_ITEM_CONSTANTS } from '../list-item/list-item-constants.js';
import { IListItemComponent } from '../list-item/list-item.js';
import { LIST_CONSTANTS } from './list-constants.js';

export interface IListAdapter extends BaseAdapter<IListComponent> {
  setSelectedListItems(values: unknown | unknown[]): void;
  setListItemsProperty<T extends keyof IListItemComponent>(property: T, value: IListItemComponent[T]): void;
  toggleInnerClass(className: string, force: boolean): void;
}

export class ListAdapter extends BaseAdapter<IListComponent> implements IListAdapter {
  private _innerElement: HTMLElement;

  constructor(component: IListComponent) {
    super(component);
    this._innerElement = getShadowElement(component, LIST_CONSTANTS.selectors.INNER);
  }

  /** Select all list items that match values in the provided array of values. */
  public setSelectedListItems(value: unknown | unknown[]): void {
    const listItems = this._getOwnListItems();
    if (listItems.length) {
      const values = Array.isArray(value) ? value : [value];
      for (const item of listItems) {
        item.selected = values.some(val => isDeepEqual(val, item.value));
      }
    }
  }

  public setListItemsProperty<T extends keyof IListItemComponent>(property: T, value: IListItemComponent[T]): void {
    this._getOwnListItems().forEach(listItem => (listItem[property] = value));
  }

  public toggleInnerClass(className: string, force: boolean): void {
    toggleClass(this._innerElement, force, className);
  }

  private _getOwnListItems(): IListItemComponent[] {
    // Find all deeply nested list items
    const allChildListItems = deepQuerySelectorAll(this._component, LIST_ITEM_CONSTANTS.elementName) as IListItemComponent[];

    // Get all list items that are scoped to this component only (not within sub-lists).
    const scopedListItems: IListItemComponent[] = [];
    const listener: EventListener = evt => {
      const composedPath = evt.composedPath();
      const composedBeforeUs = composedPath.slice(0, composedPath.indexOf(this._component));
      if (!composedBeforeUs.some((el: HTMLElement) => el.localName === LIST_CONSTANTS.elementName.toLowerCase())) {
        scopedListItems.push(evt.target as IListItemComponent);
      }
    };
    this._component.addEventListener(LIST_CONSTANTS.events.SCOPE_TEST, listener);
    allChildListItems.forEach(li => li.dispatchEvent(new CustomEvent(LIST_CONSTANTS.events.SCOPE_TEST, { bubbles: true, composed: true })));
    this._component.removeEventListener(LIST_CONSTANTS.events.SCOPE_TEST, listener);

    return scopedListItems;
  }
}
