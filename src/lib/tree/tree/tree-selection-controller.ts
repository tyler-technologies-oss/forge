import { ReactiveController } from 'lit';
import { TreeItemComponent } from '../tree-item';
import {
  getChildItems,
  getFirstChildItem,
  getNextItem,
  getParentItem,
  getPreviousItem,
  getTreeItemFromEvent,
  indeterminate,
  isIndeterminate
} from '../tree-utils';
import { TreeComponent } from './tree';

export interface ITreeItemSnapshot {
  el: TreeItemComponent;
  indeterminate: boolean;
  open: boolean;
  selected: boolean;
}

export class TreeSelectionController implements ReactiveController {
  /**
   * The tree component that the controller is attached to.
   */
  public host: TreeComponent;

  /**
   * An array containing all selected tree items.
   */
  public items: TreeItemComponent[] = [];

  /**
   * An array containing the values of all selected tree items.
   */
  public get value(): unknown[] {
    return this.items.filter(item => !item.indeterminate).map(item => item.value);
  }
  public set value(value: unknown[]) {
    this.items = [];
    const allItems = getChildItems(this.host, true);

    // If multiple selections are not allowed, select the first item with a matching value
    if (this.host.mode !== 'multiple') {
      const singleItem = allItems.find(item => item.value === value[0]);
      if (singleItem) {
        singleItem.selected = true;
        this.items.push(singleItem);
      }
      this._clearIndeterminate(allItems);
      return;
    }

    // Keep track of changes for more efficient updates to ancestor items
    const changedItems: TreeItemComponent[] = [];

    // Select the items with matching values
    allItems.forEach(item => {
      const willSelect = value.includes(item.value);
      if (willSelect === item.selected) {
        return;
      }
      item.selected = value.includes(item.value);
      if (item.selected) {
        this.items.push(item);
      }
      changedItems.push(item);
    });
    // Update all selected item descendants
    this.items.forEach(item => this._updateDescendentSelections(item));
    // Update all changed item ancestors
    changedItems.forEach(item => this._updateAncestorSelections(item));
  }

  private _selectListener: EventListener = () => {};

  constructor(host: TreeComponent) {
    this.host = host;
    host.addController(this);
  }

  public hostConnected(): void {
    this.host.addEventListener('forge-tree-item-select', this._selectListener);
  }

  public hostDisconnected(): void {
    this.host.removeEventListener('forge-tree-item-select', this._selectListener);
  }

  /**
   * Removes items that are not allowed for a given selection mode
   */
  public cleanup(): void {
    if (!this.items.length) {
      return;
    }

    let changedItems: TreeItemComponent[] = [];
    switch (this.host.mode) {
      case 'single':
        if (this.items.length === 1) {
          return;
        }
        const singleItem = this.items.splice(-1, 0);
        changedItems = [...this.items];
        this.items.forEach(item => (item.selected = false));
        this.items = singleItem;
        break;
      case 'leaf':
        const index = this.items.reverse().findIndex(item => item.leaf); // TODO: replace with findLastIndex()
        const leafItem = index > -1 ? this.items.splice(index, 1) : null;
        changedItems = [...this.items];
        this.items.forEach(item => (item.selected = false));
        if (leafItem) {
          this.items = leafItem;
        }
        break;
      case 'multiple':
        changedItems = this.items;
        changedItems.forEach(item => this._updateDescendentSelections(item));
        break;
      case 'list':
        changedItems = [...this.items];
        this.items.forEach(item => (item.selected = false));
        break;
    }

    // Update all changed item ancestors
    changedItems.forEach(item => this._updateAncestorSelections(item));
  }

  /**
   * Selects or deselects a tree item.
   * @param item The tree item to toggle.
   * @param force If true, the item will be selected. If false, the item will be deselected.
   */
  public toggle(item: TreeItemComponent, force?: boolean): void {
    // Save a snapshot of the current state in case the event is canceled
    let snapshot: ITreeItemSnapshot[] = [];
    this._addToSnapshot(item, snapshot);

    const selected = force ?? !item.selected;
    item.selected = selected;

    // Save the current selected items in case the event is canceled
    const oldSelectedItems = this.items.slice();

    // Update the selected items array and deselect items if necessary
    snapshot = this._updateSelectionsFromItem(item, snapshot);

    // Cascade the changes in multiple mode
    if (this.host.mode === 'multiple') {
      snapshot = this._updateDescendentSelections(item, snapshot);

      // Update the parent items
      snapshot = this._updateAncestorSelections(item, snapshot);
    }

    // Dispatch a select event from the item
    const event = new CustomEvent('forge-tree-item-select', { bubbles: true, composed: true, detail: item.value });
    item.dispatchEvent(event);

    // Revert if the event was canceled
    if (event.defaultPrevented) {
      this._restoreSnapshot(snapshot);
      this.items = oldSelectedItems;
    }
  }

  /**
   * Selects all tree items between the last selected item and the given item.
   * @param item The end item to extend the selection to.
   */
  public extend(item: TreeItemComponent): void {
    if (this.host.mode !== 'multiple') {
      return;
    }

    const lastSelectedItem = this.items[this.items.length - 1];
    if (!lastSelectedItem) {
      return;
    }

    const positionComparison = item.compareDocumentPosition(lastSelectedItem);
    // If the items are the same, do nothing
    if (positionComparison === 0) {
      return;
    }

    // eslint-disable-next-line no-bitwise
    const extendForward = positionComparison & Node.DOCUMENT_POSITION_FOLLOWING;
    const iteratorFn = extendForward ? getNextItem : getPreviousItem;

    // Select all items between the item and the last selected item
    let nextItem = iteratorFn(item);
    while (nextItem) {
      // Exit the loop after reaching the last selected item
      if (nextItem === lastSelectedItem) {
        break;
      }

      // Don't select open non-leaf items to avoid selecting entire branches twice
      if (nextItem.leaf || !nextItem.open) {
        this.toggle(nextItem, true);
      }
      nextItem = iteratorFn(nextItem);
    }
  }

  /**
   * Selects all tree items.
   */
  public selectAll(): void {
    this.items = [];
    const children = getChildItems(this.host, true);
    children.forEach(child => {
      child.selected = true;
      this.items.push(child);
    });
    children.reverse().forEach(child => {
      this._updateAncestorSelections(child);
    });
    this.host.dispatchEvent(new CustomEvent('forge-tree-select-all', { bubbles: true, composed: true }));
  }

  /**
   * Updates other selected items when an item is selected or deselected outside of the tree.
   * @param event The select event emitted from a tree item.
   */
  private _handleSelectEvent(evt: Event): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }
  }

  /**
   * Selects or deselects the given tree item and updates the list of selected items to reflect
   * the change.
   * @param item The item to select or deselect.
   */
  private _updateSelectionsFromItem(item: TreeItemComponent, changes: ITreeItemSnapshot[]): ITreeItemSnapshot[] {
    // Remove a deselected item from the array
    if (!item.selected) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      return changes;
    }

    // Deselect all other items if an item was selected and the mode is not multiple
    if (this.host.mode !== 'multiple') {
      this.items.forEach(selectedItem => {
        if (selectedItem !== item) {
          this._addToSnapshot(selectedItem, changes);
          selectedItem.selected = false;
        }
      });
      this.items = [item];
      return changes;
    }

    // In multiple mode just add the item to the array
    this.items.push(item);

    return changes;
  }

  /**
   * Sets the selected state of all children of the given item.
   * @param item The item that was selected or deselected.
   * @param changes The original state of all changed tree items.
   * @returns The updated snapshot of all changed tree items.
   */
  private _updateDescendentSelections(item: TreeItemComponent, changes: ITreeItemSnapshot[] = []): ITreeItemSnapshot[] {
    // Exit if the item has no children
    if (item.leaf) {
      return changes;
    }

    // Recursively get all children and set their selected states
    const children = getChildItems(item, true);
    children.forEach(child => {
      this._addToSnapshot(child, changes);
      child.selected = item.selected;
      const index = this.items.indexOf(child);
      if (item.selected && index === -1) {
        this.items.push(child);
      } else if (!item.selected && index !== -1) {
        this.items.splice(index, 1);
      }
    });

    // Find all items with children and set their indeterminate states
    const branches = children.filter(child => !child.leaf);
    branches.reverse().forEach(branch => {
      this._addToSnapshot(branch, changes, { indeterminate: true });
      branch[indeterminate] = isIndeterminate(branch);
    });
    this._addToSnapshot(item, changes, { indeterminate: true });
    item[indeterminate] = isIndeterminate(item);

    // Return the snapshot of the affected items
    return changes;
  }

  /**
   * Sets ancestor items of the given item to selected, deselected, or indeterminate based on the
   * state of the item.
   * @param item The item that was selected or deselected.
   * @param changes The original state of all changed tree items.
   * @return The updated snapshot of all changed tree items.
   */
  private _updateAncestorSelections(item: TreeItemComponent, changes: ITreeItemSnapshot[] = []): ITreeItemSnapshot[] {
    let parentItem = getParentItem(item);
    while (parentItem) {
      // Save a snapshot of the parent item's current state
      this._addToSnapshot(parentItem, changes);

      // Set the parent item's indeterminate state
      parentItem[indeterminate] = isIndeterminate(parentItem);

      // If the parent item is not indetermine, set the selected state from the first child
      if (!parentItem.indeterminate) {
        const firstChild = getFirstChildItem(parentItem);
        parentItem.selected = firstChild?.selected ?? false;

        // Add or remove the parent item from the selected items array
        const index = this.items.indexOf(parentItem);
        if (parentItem.selected && index === -1) {
          this.items.push(parentItem);
        } else if (!parentItem.selected && index !== -1) {
          this.items.splice(index, 1);
        }
      }

      // Go up the tree one level and repeat
      parentItem = getParentItem(parentItem);
    }

    return changes;
  }

  /**
   * Adds a tree item to a snapshot of all changed tree items.
   * @param item The tree item.
   * @param snapshot The snapshot of all changed tree items.
   * @param options Properties of the tree item to change if it already exists in the snapshot.
   */
  private _addToSnapshot(
    item: TreeItemComponent,
    snapshot: ITreeItemSnapshot[],
    options?: { indeterminate?: boolean; open?: boolean; selected?: boolean }
  ): void {
    const exisitingState = snapshot.find(state => state.el === item);
    if (exisitingState) {
      options = options ?? { indeterminate: true, open: true, selected: true };
      exisitingState.indeterminate = options.indeterminate ? item.indeterminate : exisitingState.indeterminate;
      exisitingState.open = options.open ? item.open : exisitingState.open;
      exisitingState.selected = options.selected ? item.selected : exisitingState.selected;
      return;
    }
    snapshot.push({
      el: item,
      indeterminate: item.indeterminate,
      open: item.open,
      selected: item.selected
    });
  }

  /**
   * Restores the state of all changed tree items from a snapshot.
   * @param snapshot An array containing the original state of all changed tree items.
   */
  private _restoreSnapshot(snapshot: ITreeItemSnapshot[]): void {
    snapshot.forEach(state => {
      state.el[indeterminate] = state.indeterminate;
      state.el.selected = state.selected;
      state.el.open = state.open;
    });
  }

  /**
   * Clears the indeterminate state of all tree items.
   * @param items An optional array of items to clear the indeterminate state of.
   */
  private _clearIndeterminate(items?: TreeItemComponent[]): void {
    (items ?? getChildItems(this.host)).forEach(item => {
      item[indeterminate] = false;
    });
  }
}
