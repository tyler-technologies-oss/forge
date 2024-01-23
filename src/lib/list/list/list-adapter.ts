import { deepQuerySelectorAll, isDeepEqual } from '@tylertech/forge-core';
import { BaseAdapter } from '../../core/base/base-adapter';
import { IListComponent } from './list';
import { LIST_ITEM_CONSTANTS } from '../list-item/list-item-constants';
import { IListItemComponent } from '../list-item/list-item';
import { ListComponentItemRole, LIST_CONSTANTS } from './list-constants';

export interface IListAdapter extends BaseAdapter<IListComponent> {
  initialize(): void;
  focusNextListItem(): void;
  focusPreviousListItem(): void;
  focusFirstListItem(): void;
  focusLastListItem(): void;
  setSelectedListItems(values: unknown | unknown[]): void;
  updateListItems(cb: (li: IListItemComponent) => void): void;
  updateListItemRole(): void;
}

export class ListAdapter extends BaseAdapter<IListComponent> implements IListAdapter {
  constructor(component: IListComponent) {
    super(component);
  }

  public initialize(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'list');
    }
  }

  /** Sets focus to the next item in the list. */
  public focusNextListItem(): void {
    const listItems = this._getFocusableListItems();
    if (listItems.length) {
      const focusedListItemIndex = listItems.findIndex(item => item.matches(':focus-within'));
      const nextIndex = focusedListItemIndex < listItems.length - 1 ? focusedListItemIndex + 1 : 0;
      if (nextIndex <= listItems.length - 1) {
        listItems[nextIndex].focus({ preventScroll: true});
      }
    }
  }

  /** Sets focus to the previous item in the list. */
  public focusPreviousListItem(): void {
    const listItems = this._getFocusableListItems();
    if (listItems.length) {
      const focusedListItemIndex = listItems.findIndex(item => item.matches(':focus-within'));
      const nextIndex = focusedListItemIndex > 0 ? focusedListItemIndex - 1 : listItems.length - 1;
      if (nextIndex >= 0) {
        listItems[nextIndex].focus({ preventScroll: true});
      }
    }
  }

  /** Sets focus to the first item in the list. */
  public focusFirstListItem(): void {
    const listItems = this._getFocusableListItems();
    if (listItems.length) {
      listItems[0].focus({ preventScroll: true});
    }
  }

  /** Sets focus to the last item in the list. */
  public focusLastListItem(): void {
    const listItems = this._getFocusableListItems();
    if (listItems.length) {
      listItems[listItems.length - 1].focus({ preventScroll: true});
    }
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

  /** Calls the provided callback on all list items to apply an updated property to each list item. */
  public updateListItems(cb: (li: IListItemComponent) => void): void {
    this._getOwnListItems().forEach(cb);
  }

  public updateListItemRole(): void {
    const role = ListComponentItemRole[this._component.getAttribute('role') as string] ?? 'listitem';
    this.updateListItems(li => li.role = role);
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

  private _getFocusableListItems(): IListItemComponent[] {
    return this._getOwnListItems().filter(li => !li.disabled && !li.nonInteractive && !li.hidden);
  }
}
