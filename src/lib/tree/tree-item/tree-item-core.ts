import { getChildItems } from '../tree-utils';
import { ITreeItemComponent } from './tree-item';
import { ITreeItemAdapter } from './tree-item-adapter';
import { TREE_ITEM_CONSTANTS, TreeItemUpdateReason } from './tree-item-constants';

export interface ITreeItemCore {
  selected: boolean;
  value: unknown;
  open: boolean;
  readonly leaf: boolean;
  readonly level: number;
  readonly indeterminate: boolean;
  setIndeterminate(value: boolean): void;
  setOpen(value: boolean): void;
  setSelected(value: boolean): void;
}

export class TreeItemCore implements ITreeItemCore {
  private _selected = false;
  private _value: unknown;
  private _open = false;
  private _indeterminate = false;
  private _level = 0;
  private _leaf = false;
  private _slotChangeListener = this._onSlotChange.bind(this);

  constructor(private _adapter: ITreeItemAdapter) {
    this._adapter.addSlotChangeListener(this._slotChangeListener);
  }

  public initialize(): void {
    this._level = this._adapter.getLevel();
    this._adapter.setLevel(this._level);
    this._adapter.placeInParent();
    this._adapter.trySyncOpenIcon();
    this._setSelectedState();
  }

  public destroy(): void {
    // Cleanup logic here
  }

  //
  // Event handlers
  //

  private _onSlotChange(): void {
    this._leaf = !this._adapter.hasChildren();
    this._adapter.setExpandable(this._leaf);
  }

  //
  // Private methods
  //

  /**
   * Dispatches an event that the parent tree component can listen for to sync state.
   */
  private _signalUpdate(reason: TreeItemUpdateReason): void {
    const event = new CustomEvent(TREE_ITEM_CONSTANTS.events.UPDATE, { bubbles: true, composed: true, detail: { reason } });
    this._adapter.dispatchHostEvent(event);
  }

  private _setSelectedState(): void {
    this._adapter.setCheckboxIcon(this._indeterminate ? 'indeterminate' : this._selected ? 'selected' : 'unselected');
  }

  //
  // Public properties
  //

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.updateAria();
      this._adapter.toggleHostAttribute(TREE_ITEM_CONSTANTS.attributes.SELECTED, this._selected);
      this._setSelectedState();
      this._signalUpdate('select');
    }
  }

  public get value(): unknown {
    return this._value;
  }
  public set value(value: unknown) {
    if (this._value !== value) {
      this._value = value;
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this._adapter.updateAria();
      this._adapter.trySyncOpenIcon();
      this._adapter.toggleHostAttribute(TREE_ITEM_CONSTANTS.attributes.OPEN, this._open);

      if (this._open) {
        const event = new CustomEvent(TREE_ITEM_CONSTANTS.events.OPEN, { bubbles: true, composed: true });
        this._adapter.dispatchHostEvent(event);
      }
    }
  }

  public get leaf(): boolean {
    return this._leaf;
  }

  public get level(): number {
    return this._level;
  }

  public get indeterminate(): boolean {
    return this._indeterminate;
  }

  /**
   * Sets whether the item is marked as indeterminate.
   */
  public setIndeterminate(value: boolean): void {
    this._indeterminate = value;
    this._adapter.toggleRootClass(TREE_ITEM_CONSTANTS.classes.INDETERMINATE, this._indeterminate);
    this._setSelectedState();
  }

  /**
   * Sets the open state without emitting an event. Use this for programmatic open to distinguish from user open.
   */
  public setOpen(value: boolean): void {
    this._open = value;
    this._adapter.updateAria();
    this._adapter.trySyncOpenIcon();
    this._adapter.toggleHostAttribute(TREE_ITEM_CONSTANTS.attributes.OPEN, this._open);
  }

  /**
   * Sets the selected state without emitting an event. Use this for programmatic selections to distinguish from user actions.
   */
  public setSelected(value: boolean): void {
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.updateAria();
      this._adapter.toggleHostAttribute(TREE_ITEM_CONSTANTS.attributes.SELECTED, this._selected);
      this._setSelectedState();
    }
  }
}
