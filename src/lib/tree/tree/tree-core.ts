import { ITreeItemComponent, setIndeterminate, setSelected, TREE_ITEM_CONSTANTS } from '../tree-item';
import {
  addToSnapshot,
  collapseItem,
  getChildItems,
  getFirstChildItem,
  getLastChildItem,
  getNextItem,
  getParentItem,
  getPreviousItem,
  getSiblingItems,
  isIndeterminate,
  isTreeItem,
  restoreSnapshot,
  searchItems
} from '../tree-utils';
import { ITreeComponent } from './tree';
import { ITreeAdapter } from './tree-adapter';
import { ITreeItemSnapshot, TREE_CONSTANTS, TreeMode } from './tree-constants';

export interface ITreeCore {
  value: unknown[];
  mode: TreeMode;
  selectionFollowsFocus: boolean;
  accordion: boolean;
  indentLines: boolean;
}

export class TreeCore implements ITreeCore {
  private _mode: TreeMode = 'single';
  private _selectionFollowsFocus = false;
  private _accordion = false;
  private _indentLines = false;
  private _selectedItems: ITreeItemComponent[] = [];
  private _lastFocusedItem?: ITreeItemComponent;
  private _searchString = '';
  private _searchTimeout?: number;
  private _clickListener = this._onClick.bind(this);
  private _keydownListener = this._onKeydown.bind(this);
  private _focusInListener = this._onFocusIn.bind(this);
  private _focusOutListener = this._onFocusOut.bind(this);
  private _openListener = this._onOpen.bind(this);
  private _updateListener = this._onUpdate.bind(this);

  constructor(private _adapter: ITreeAdapter) {
    this._adapter.addHostListener('click', this._clickListener);
    this._adapter.addHostListener('keydown', this._keydownListener);
    this._adapter.addHostListener('focusin', this._focusInListener);
    this._adapter.addHostListener('focusout', this._focusOutListener);
    this._adapter.addHostListener(TREE_ITEM_CONSTANTS.events.OPEN, this._openListener);
    this._adapter.addHostListener(TREE_ITEM_CONSTANTS.events.UPDATE, this._updateListener, { capture: true });
  }

  public initialize(): void {
    // Initialization logic here
  }

  public destroy(): void {
    // Cleanup logic here
  }

  //
  // Event handlers
  //

  private _onClick(evt: PointerEvent): void {
    // Ensure a tree item's header was clicked
    const header = this._adapter.eventPathIncludesTreeItemHeader(evt);
    if (!header) {
      return;
    }

    // Get the target item
    const target = this._adapter.getTreeItemTarget(evt);
    if (!target) {
      return;
    }

    // If the target is a leaf item, toggle the selected state
    if (target.leaf) {
      if (evt.shiftKey) {
        this._extendSelection(target);
      }
      this._toggleSelection(target);
      return;
    }

    // If in leaf mode, a click anywhere on the item toggles the open state
    if (this._mode === 'leaf') {
      this._toggleItemOpen(target, evt.altKey);
      return;
    }

    // Otherwise only a click on the open icon toggles the open state
    const openIcon = this._adapter.eventPathIncludesOpenIcon(evt);
    if (openIcon) {
      this._toggleItemOpen(target, evt.altKey);
    } else {
      if (evt.shiftKey) {
        this._extendSelection(target);
      }
      this._toggleSelection(target);
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const target = this._adapter.getTreeItemTarget(evt);
    if (!target) {
      return;
    }

    switch (evt.key) {
      case 'ArrowDown':
        return this._handleArrowDown(evt, target);
      case 'ArrowUp':
        return this._handleArrowUp(evt, target);
      case 'ArrowRight':
        return this._handleArrowRight(evt, target);
      case 'ArrowLeft':
        return this._handleArrowLeft(evt, target);
      case 'Home':
        return this._handleHome(evt, target);
      case 'End':
        return this._handleEnd(evt, target);
      case '*':
        return this._handleAsterisk(evt, target);
      case 'a':
        // If the 'a' key isn't handled by the function, pass the event forward to use in a search
        if (this._handleA(evt)) {
          return;
        }
        break;
      case 'Enter':
        return this._handleEnter(evt, target);
    }

    // Search for items when a printable key is pressed
    if (evt.key.length === 1 && evt.key.match(/\S/)) {
      evt.preventDefault();
      this._search(evt);
    }
  }

  private _onFocusIn(evt: FocusEvent): void {
    // Focus either the last focused item or first item when the tree receives focus
    if (evt.target === this._adapter.hostElement) {
      const itemToFocus = this._lastFocusedItem ?? getFirstChildItem(this._adapter.hostElement as ITreeComponent);
      if (!itemToFocus) {
        return;
      }
      this._focusItem(itemToFocus);
    }

    // If a tree item was focused, set it as the last focused item and update tab indices
    const target = evt.target as HTMLElement;
    if (target && isTreeItem(target)) {
      if (this._lastFocusedItem) {
        this._lastFocusedItem.tabIndex = -1;
      }
      this._lastFocusedItem = target;
      this._lastFocusedItem.tabIndex = 0;
      this._adapter.setFocusable(false);
    }
  }

  private _onFocusOut(evt: FocusEvent): void {
    const relatedTarget = evt.relatedTarget as HTMLElement | null;
    if (!relatedTarget || !this._adapter.contains(relatedTarget)) {
      this._adapter.setFocusable(true);
    }
  }

  private _onOpen(evt: CustomEvent): void {
    if (!this._accordion) {
      return;
    }
    const items = this._adapter.getTreeItemsInPath(evt);
    this._adapter.collapseChildren(items);
  }

  private _onUpdate(evt: CustomEvent): void {
    evt.stopPropagation();
    this._manageSelections(evt.target as ITreeItemComponent);
  }

  //
  // Keyboard navigation
  //

  // Focus the next expanded item
  private _handleArrowDown(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    const nextItem = getNextItem(target);
    if (nextItem) {
      if (evt.shiftKey && this._mode === 'multiple') {
        this._toggleSelection(nextItem, true);
      }
      this._focusItem(nextItem);
    }
  }

  // Focus the previous expanded item
  private _handleArrowUp(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    const previousItem = getPreviousItem(target);
    if (previousItem) {
      if (evt.shiftKey && this._mode === 'multiple') {
        this._toggleSelection(previousItem, true);
      }
      this._focusItem(previousItem);
    }
  }

  // Focus the first child item or open the item if closed
  private _handleArrowRight(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    if (target.open) {
      const firstChild = getFirstChildItem(target);
      if (firstChild) {
        this._focusItem(firstChild);
      }
    }
    target.open = target.leaf ? false : true;
  }

  // Focus the parent item or close the item if open
  private _handleArrowLeft(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    if (!target.open) {
      const parent = getParentItem(target);
      if (parent) {
        this._focusItem(parent);
      }
    }
    target.open = false;
  }

  // Focus the first item
  private _handleHome(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    if (evt.repeat) {
      return;
    }

    // Select all previous items if the meta key is pressed
    if (evt.shiftKey && (evt.metaKey || evt.ctrlKey) && this._mode === 'multiple') {
      let previousItem = getPreviousItem(target);
      while (previousItem) {
        this._toggleSelection(previousItem, true);
        previousItem = getPreviousItem(previousItem);
      }
    }

    const firstItem = getFirstChildItem(this._adapter.hostElement as ITreeComponent);
    if (firstItem) {
      this._focusItem(firstItem);
    }
  }

  // Focus the last open item, checking recursively
  private _handleEnd(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    if (evt.repeat) {
      return;
    }

    // Select all subsequent items if the meta key is pressed
    if (evt.shiftKey && (evt.metaKey || evt.ctrlKey) && this._mode === 'multiple') {
      let nextItem = getNextItem(target);
      while (nextItem) {
        this._toggleSelection(nextItem, true);
        nextItem = getNextItem(nextItem);
      }
    }

    let lastItem = getLastChildItem(this._adapter.hostElement as ITreeComponent);
    while (lastItem && lastItem.open) {
      lastItem = getLastChildItem(lastItem);
    }
    if (lastItem) {
      this._focusItem(lastItem);
    }
  }

  // Select all items and return whether the event was handled
  private _handleA(evt: KeyboardEvent): boolean {
    if (this._mode === 'multiple' && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      if (evt.repeat) {
        return true;
      }
      this._selectedItems = [];
      const children = getChildItems(this._adapter.hostElement as ITreeComponent, true);
      children.forEach(child => {
        child[setSelected](true);
        this._selectedItems.push(child);
      });
      children.reverse().forEach(child => {
        this._setParentSelections(child);
      });
      return true;
    }
    return false;
  }

  // Expand all items at the same level
  private _handleAsterisk(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    if (evt.repeat) {
      return;
    }
    getSiblingItems(target, true).forEach(item => (item.open = true));
  }

  // Toggle the open or selected state
  private _handleEnter(evt: KeyboardEvent, target: ITreeItemComponent): void {
    evt.preventDefault();
    if (evt.repeat) {
      return;
    }
    if (target.leaf) {
      if (this._mode === 'multiple' || !this._selectionFollowsFocus) {
        if (evt.shiftKey) {
          this._extendSelection(target);
        }
        this._toggleSelection(target);
      }
    } else {
      this._toggleItemOpen(target, evt.altKey);
    }
  }

  //
  // Private methods
  //

  private _focusItem(item: ITreeItemComponent): void {
    item.focus();

    if (this._mode !== 'multiple' && this._selectionFollowsFocus) {
      this._toggleSelection(item, true);
    }
  }

  private _search(evt: KeyboardEvent): void {
    // Set the type-ahead timeout and full search string
    clearTimeout(this._searchTimeout);
    this._searchTimeout = window.setTimeout(() => (this._searchString = ''), TREE_CONSTANTS.numbers.SEARCH_TIMEOUT);
    this._searchString += evt.key;

    const result = searchItems(evt.target as ITreeItemComponent, this._searchString);
    if (result) {
      this._focusItem(result);
    }
  }

  private _toggleItemOpen(item: ITreeItemComponent, flatten = false): void {
    if (item.open) {
      collapseItem(item, flatten);
    } else {
      item.open = true;
    }
  }

  private _toggleSelection(item: ITreeItemComponent, force?: boolean): void {
    // Save a snapshot of the current state in case the event is canceled
    let snapshot: ITreeItemSnapshot[] = [];
    addToSnapshot(item, snapshot);

    // Use [setSelected] instead of directly setting the selected property to avoid triggering the update event
    const selected = force == null ? !item.selected : force;
    item[setSelected](selected);

    // Save the current selected items in case the event is canceled
    const oldSelectedItems = this._selectedItems.slice();

    // Update the selected items array and deselect items if necessary
    snapshot = this._manageSelections(item, snapshot);

    // Cascade the changes in multiple mode
    if (this._mode === 'multiple') {
      snapshot = this._setChildSelections(item.selected, item, snapshot);

      // Update the parent items
      snapshot = this._setParentSelections(item, snapshot);
    }

    // Emit the select event
    const event = new CustomEvent(TREE_ITEM_CONSTANTS.events.SELECT, { detail: item.value, bubbles: true, cancelable: true, composed: true });
    item.dispatchEvent(event);

    // Revert if the event was canceled
    if (event.defaultPrevented) {
      restoreSnapshot(snapshot);
      this._selectedItems = oldSelectedItems;
    }
  }

  private _manageSelections(item: ITreeItemComponent, changes: ITreeItemSnapshot[] = []): ITreeItemSnapshot[] {
    // Save a snapshot of the current state in case the event is canceled
    const snapshot = changes;

    // Remove a deselected item from the array
    if (!item.selected) {
      const index = this._selectedItems.indexOf(item);
      if (index !== -1) {
        this._selectedItems.splice(index, 1);
      }
      return snapshot;
    }

    // Deselect all other items if an item was selected and the mode is not multiple
    if (this._mode !== 'multiple') {
      this._selectedItems.forEach(selectedItem => {
        if (selectedItem !== item) {
          addToSnapshot(selectedItem, snapshot);
          selectedItem[setSelected](false);
        }
      });
      this._selectedItems = [item];
      return snapshot;
    }

    // In multiple mode just add the item to the array
    this._selectedItems.push(item);

    return snapshot;
  }

  private _setChildSelections(select: boolean, item: ITreeItemComponent, changes: ITreeItemSnapshot[] = []): ITreeItemSnapshot[] {
    // Save the current state of all affected items in case the selection is canceled
    const snapshot = changes;

    // Exit if the item has no children
    if (item.leaf) {
      return snapshot;
    }

    // Recursively get all children and set their selected states
    const children = getChildItems(item, true);
    children.forEach(child => {
      addToSnapshot(child, snapshot);
      child[setSelected](select);
      const index = this._selectedItems.indexOf(child);
      if (index !== -1) {
        if (select) {
          this._selectedItems.push(child);
        } else {
          this._selectedItems.splice(index, 1);
        }
      }
    });

    // Find all items with children and set their indeterminate states
    const branches = children.filter(child => !child.leaf);
    branches.reverse().forEach(branch => {
      addToSnapshot(branch, snapshot, { indeterminate: true });
      branch[setIndeterminate](isIndeterminate(branch));
    });
    addToSnapshot(item, snapshot, { indeterminate: true });
    item[setIndeterminate](isIndeterminate(item));

    // Return the snapshot of the affected items
    return snapshot;
  }

  private _setParentSelections(item: ITreeItemComponent, changes: ITreeItemSnapshot[] = []): ITreeItemSnapshot[] {
    const snapshot = changes;

    let parentItem = getParentItem(item);
    while (parentItem) {
      // Save a snapshot of the parent item's current state
      addToSnapshot(parentItem, snapshot);

      // Set the parent item's indeterminate state
      parentItem[setIndeterminate](isIndeterminate(parentItem));

      // If the parent item is not indetermine, set the selected state from the first child
      if (!parentItem.indeterminate) {
        const firstChild = getFirstChildItem(parentItem);
        parentItem[setSelected](firstChild?.selected ?? false);

        // Add or remove the parent item from the selected items array
        const index = this._selectedItems.indexOf(parentItem);
        if (parentItem.selected && index === -1) {
          this._selectedItems.push(parentItem);
        } else if (!parentItem.selected && index !== -1) {
          this._selectedItems.splice(index, 1);
        }
      }

      // Go up the tree one level and repeat
      parentItem = getParentItem(parentItem);
    }

    return snapshot;
  }

  private _extendSelection(item: ITreeItemComponent): void {
    if (this._mode !== 'multiple') {
      return;
    }

    const lastSelectedItem = this._selectedItems[this._selectedItems.length - 1];
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
        this._toggleSelection(nextItem, true);
      }
      nextItem = iteratorFn(nextItem);
    }
  }

  //
  // Public properties
  //

  public get value(): unknown[] {
    if (this._mode === 'single') {
      return this._selectedItems.map(item => item.value);
    }
    // Only return the values of leaf items in multiple or leaf mode
    return this._selectedItems.filter(item => item.leaf).map(item => item.value);
  }
  public set value(value: unknown[]) {
    this._selectedItems = [];

    const children = getChildItems(this._adapter.hostElement as ITreeComponent, true);
    children.forEach(child => {
      const selected = value.includes(child.value);
      child[setSelected](selected);
      if (selected) {
        this._selectedItems.push(child);
      }
    });
  }

  public get mode(): TreeMode {
    return this._mode;
  }
  public set mode(value: TreeMode) {
    if (this._mode !== value) {
      this._mode = value;
      this._adapter.setHostAttribute(TREE_CONSTANTS.attributes.MODE, this._mode);

      if (this._mode === 'single') {
        this._selectedItems.slice(0, -1).forEach(item => item[setSelected](false));
        this._selectedItems = this._selectedItems.slice(-1);
      } else if (this._mode === 'leaf') {
        this._selectedItems = this._selectedItems.filter(item => {
          item[setSelected](item.leaf);
          return item.leaf;
        });
      }
    }
  }

  public get selectionFollowsFocus(): boolean {
    return this._selectionFollowsFocus;
  }
  public set selectionFollowsFocus(value: boolean) {
    if (this._selectionFollowsFocus !== value) {
      this._selectionFollowsFocus = value;
      this._adapter.toggleHostAttribute(TREE_CONSTANTS.attributes.SELECTION_FOLLOWS_FOCUS, this._selectionFollowsFocus);
    }
  }

  public get accordion(): boolean {
    return this._accordion;
  }
  public set accordion(value: boolean) {
    if (this._accordion !== value) {
      this._accordion = value;
      this._adapter.toggleHostAttribute(TREE_CONSTANTS.attributes.ACCORDION, this._accordion);

      if (this._accordion) {
        this._adapter.collapseChildren();
      }
    }
  }

  public get indentLines(): boolean {
    return this._indentLines;
  }
  public set indentLines(value: boolean) {
    if (this._indentLines !== value) {
      this._indentLines = value;
      this._adapter.toggleHostAttribute(TREE_CONSTANTS.attributes.INDENT_LINES, this._indentLines);
    }
  }
}
