import { findWhere, createPredicate } from './object-utils.js';

export class ItemManager<T> {
  private _items: T[] = [];

  constructor(private _key?: string[]) {}

  /**
   * Returns all items.
   */
  public getItems(): T[] {
    return [...this._items];
  }

  /**
   * Returns the number of items.
   */
  public count(): number {
    return this._items.length;
  }

  /**
   * Sets the item key.
   * @param key The item key(s).
   */
  public setKey(key: string[]): void {
    this._key = key;
  }

  /**
   * Addes the provided items.
   * @param data The item data.
   */
  public add(data: T | T[]): this {
    if (!(data instanceof Array)) {
      data = [data];
    }

    data.forEach(item => {
      if (!this.exists(item)) {
        this._items.push(item);
      }
    });

    return this;
  }

  /**
   * Removes an item from the selections.
   * @param data The data to be deselected.
   */
  public remove(data: T | T[]): this {
    if (!(data instanceof Array)) {
      data = [data];
    }

    for (let i = data.length - 1; i >= 0; i--) {
      if (this.exists(data[i])) {
        this._items.splice(this._items.indexOf(this._getItem(data[i]) as T), 1);
      }
    }

    return this;
  }

  /**
   * Removes all selected items.
   */
  public clear(): this {
    this._items = [];
    return this;
  }

  /**
   * Determines if the provided item exists in the selections or not.
   * @param data The data value.
   */
  public exists(data: T): boolean {
    return this._getItem(data) !== null;
  }

  /**
   * Gets the item from the items collection, or null if not found.
   * @param data The data value.
   */
  private _getItem(data: T): T | null {
    if (this._key) {
      return findWhere(this._items, createPredicate(this._key as string[], data)) || null;
    } else {
      return this._items.find(item => item === data) || null;
    }
  }
}
