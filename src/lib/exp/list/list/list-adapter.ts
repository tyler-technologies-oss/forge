import { isDeepEqual } from '@tylertech/forge-core';
import { BaseAdapter } from '../../../core/base/base-adapter';
import { IListComponentExp } from './list';
import { LIST_ITEM_CONSTANTS_EXP } from '../list-item/list-item-constants';
import { IListItemComponentExp } from '../list-item/list-item';
import { ListComponentExpItemRole, LIST_CONSTANTS_EXP } from './list-constants';

export interface IListAdapterExp extends BaseAdapter<IListComponentExp> {
  initialize(): void;
  focusNextListItem(): void;
  focusPreviousListItem(): void;
  focusFirstListItem(): void;
  focusLastListItem(): void;
  setSelectedListItems(values: unknown | unknown[]): void;
  updateListItems(cb: (li: IListItemComponentExp) => void): void;
  updateListItemRole(): void;
}

export class ListAdapterExp extends BaseAdapter<IListComponentExp> implements IListAdapterExp {
  constructor(component: IListComponentExp) {
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
      const focusedListItemIndex = listItems.findIndex(item => item.matches(':focus'));
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
      const focusedListItemIndex = listItems.findIndex(item => item.matches(':focus'));
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
    const listItems = this._getListItems();
    if (listItems.length) {
      const values = Array.isArray(value) ? value : [value];
      for (const item of listItems) {
        item.selected = values.some(val => isDeepEqual(val, item.value));
      }
    }
  }

  /** Calls the provided callback on all list items to apply an updated property to each list item. */
  public updateListItems(cb: (li: IListItemComponentExp) => void): void {
    this._getListItems().forEach(cb);
  }

  public updateListItemRole(): void {
    const role = ListComponentExpItemRole[this._component.getAttribute('role') as string] ?? 'listitem';
    this.updateListItems(li => li.role = role);
  }

  private _getListItems(): IListItemComponentExp[] {
    const listItems = Array.from(this._component.querySelectorAll(LIST_ITEM_CONSTANTS_EXP.elementName));
    return listItems.filter(item => item.closest(LIST_CONSTANTS_EXP.elementName) === this._component) as IListItemComponentExp[];
  }

  private _getFocusableListItems(): IListItemComponentExp[] {
    return this._getListItems().filter(li => !li.disabled && !li.static && !li.hidden);
  }
}
