import { emitEvent, deepQuerySelectorAll, getActiveElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../list-item';
import { IListComponent } from './list';
import { LIST_CONSTANTS } from './list-constants';

export interface IListAdapter extends IBaseAdapter<IListComponent> {
  initializeAccessibility(): void;
  addListener(type: string, listener: (evt: Event) => void): void;
  removeListener(type: string, listener: (evt: Event) => void): void;
  focusNextListItem(): void;
  focusPreviousListItem(): void;
  focusFirstListItem(): void;
  focusLastListItem(): void;
  setSelectedListItems(values: any[]): void;
  updateListItems(cb: (li: IListItemComponent) => void): void;
}

/**
 * The DOM adapter for the `<forge-list>` component.
 */
export class ListAdapter extends BaseAdapter<IListComponent> implements IListAdapter {
  constructor(component: IListComponent) {
    super(component);
  }

  public initializeAccessibility(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'list');
    }
  }

  /**
   * Adds an event listener to the `<forge-list>` host element.
   * @param {string} type The event type.
   * @param {Function} listener The event callback.
   */
  public addListener(type: string, listener: (evt: Event) => void): void {
    this._component.addEventListener(type, listener);
  }

  /**
   * Removes an event listener to the `<forge-list>` host element.
   * @param {string} type The event type.
   * @param {Function} listener The event callback.
   */
  public removeListener(type: string, listener: (evt: Event) => void): void {
    this._component.removeEventListener(type, listener);
  }

  /**
   * Sets focus to the next item in the list.
   */
  public focusNextListItem(): void {
    const listItems = this._getOwnListItems();
    if (listItems.length > 0) {
      const focusedListItemIndex = listItems.findIndex(li => li.matches(':focus-within'));
      const nextIndex = focusedListItemIndex < listItems.length - 1 ? focusedListItemIndex + 1 : 0;
      if (nextIndex <= listItems.length - 1) {
        listItems[nextIndex].focus();
      }
    }
  }

  /**
   * Sets focus to the previous item in the list.
   */
  public focusPreviousListItem(): void {
    const listItems = this._getOwnListItems();
    if (listItems.length > 0) {
      const focusedListItemIndex = listItems.findIndex(li => li.matches(':focus-within'));
      const nextIndex = focusedListItemIndex > 0 ? focusedListItemIndex - 1 : listItems.length - 1;
      if (nextIndex >= 0) {
        listItems[nextIndex].focus();
      }
    }
  }

  /**
   * Sets focus to the first item in the list.
   */
  public focusFirstListItem(): void {
    const listItems = this._getOwnListItems();
    if (listItems.length > 0) {
      listItems[0].focus();
    }
  }

  /**
   * Sets focus to the last item in the list.
   */
  public focusLastListItem(): void {
    const listItems = this._getOwnListItems();
    if (listItems.length > 0) {
      listItems[listItems.length - 1].focus();
    }
  }

  public setSelectedListItems(values: any[]): void {
    const listItems = Array.from(this._component.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
    if (listItems && listItems.length) {
      for (const item of listItems) {
        item.selected = values.includes(item.value);
      }
    }
  }

  public updateListItems(cb: (li: IListItemComponent) => void): void {
    this._getOwnListItems().forEach(li => cb(li));
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
