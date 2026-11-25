import { createContext, provide } from '@lit/context';
import { tryDefine } from '@tylertech/forge-core';
import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DragController } from '../../core/controllers/drag-controller.js';
import { DropController, DropEventArgs } from '../../core/controllers/drop-controller.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { KeyActionController } from '../../core/utils/key-action.js';
import { TreeItemComponent, TreeItemUpdateReason } from '../tree-item/index.js';
import {
  closeDescendants,
  eventPathIncludesTreeItemDragHandle,
  eventPathIncludesTreeItemExpandIcon,
  eventPathIncludesTreeItemHeader,
  getChildItems,
  getFirstChildItem,
  getLastChildItem,
  getNextItem,
  getParentItem,
  getParentTree,
  getPreviousItem,
  getSiblingItems,
  getTreeItemFromEvent,
  getTreeItemHeader,
  getTreeItemsInEventPath,
  getTreeItemTarget,
  isTreeItem,
  searchItems
} from '../tree-utils.js';
import { TreeSelectionController } from './tree-selection-controller.js';

import styles from './tree.scss';

export type TreeMode = 'single' | 'multiple' | 'leaf' | 'off'; // | 'multiple-discrete'

export interface ITreeContext {
  collapseIcon?: HTMLElement;
  disabled: boolean;
  expandIcon?: HTMLElement;
  indentLines: boolean;
  mode: TreeMode;
  reorderable: boolean;
}

export interface ITreeItemReorderEventData {
  /** The item being moved. */
  item: TreeItemComponent;
  /** The tree or tree item the item will be a child of after the move. */
  parent: TreeComponent | TreeItemComponent;
  /** The tree or tree item the item is currently a child of. */
  previousParent: TreeComponent | TreeItemComponent;
  /** The index the item will occupy among the child items of `parent` after the move. */
  index: number;
  /** The index the item currently occupies among the child items of `previousParent`. */
  previousIndex: number;
}

interface ITreeDropLocation {
  parent: TreeComponent | TreeItemComponent;
  index: number;
  position: 'before' | 'after' | 'inside';
  target: TreeItemComponent;
}

const DROP_EDGE_RATIO = 0.25;

export const TREE_CONTEXT = createContext<ITreeContext>('forge-tree');

/**
 * @tag forge-tree
 *
 * @summary Trees are interactive lists that allow users to navigate through hierarchical data.
 *
 * @dependency forge-tree-item
 *
 * @event {CustomEvent<void>} forge-tree-select-all - Dispatched when the user selects all items.
 * @event {CustomEvent<ITreeItemReorderEventData>} forge-tree-item-reorder - Dispatched from an item when the user
 * moves it, either within its parent or into another parent, by dragging or with the keyboard. Cancelable. If the
 * event is not canceled, the tree moves the item in the DOM.
 *
 * @csspart root - The root tree element.
 *
 * @slot - The default slot for tree items.
 * @slot expand-icon - A custom expand icon to show when an item is closed.
 * @slot collapse-icon - A custom collapse icon to show when an item is open.
 */
export class TreeComponent extends LitElement {
  public static styles = unsafeCSS(styles);

  /**
   * Whether opening an item closes all other items.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public accordion = false;

  /**
   * Toggles the rendering of indent lines showing hierarchy.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, attribute: 'indent-lines' }) public indentLines = false;

  /**
   * How selecting tree items is handled.
   * @default 'single'
   * @attribute
   */
  @property({ type: String }) public mode: TreeMode = 'single';

  /**
   * Whether focusing an item also selects it. This takes no effect when in multiple mode.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, attribute: 'selection-follows-focus' }) public selectionFollowsFocus = false;

  /**
   * Whether selecting items is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public disabled = false;

  /**
   * Whether items can be moved within the tree, including into other parents, by dragging their
   * drag handle or by pressing Alt + Arrow Up or Alt + Arrow Down.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public reorderable = false;

  /**
   * The value of all selected items.
   * @default []
   * @attribute
   */
  @property({ type: Array })
  public get value(): unknown[] {
    return this._selectionController.value;
  }
  public set value(value: unknown[]) {
    this._selectionController.value = value;
  }

  @provide({ context: TREE_CONTEXT }) private _context: ITreeContext;

  private _internals: ElementInternals;
  private _keyActionController = new KeyActionController(this, {
    actions: [
      {
        key: [
          { key: 'ArrowUp', modifier: 'alt' },
          { key: 'ArrowDown', modifier: 'alt' }
        ],
        handler: this._handleReorderKey.bind(this),
        allowRepeat: true
      },
      { key: ['ArrowUp', 'ArrowDown'], handler: this._handleArrowUpOrDown.bind(this), allowRepeat: true },
      { key: 'ArrowLeft', handler: this._handleArrowLeft.bind(this), allowRepeat: true },
      { key: 'ArrowRight', handler: this._handleArrowRight.bind(this), allowRepeat: true },
      { key: 'Home', handler: this._handleHome.bind(this) },
      { key: 'End', handler: this._handleEnd.bind(this) },
      { key: '*', handler: this._handleAsterisk.bind(this) },
      {
        key: [
          { key: 'a', modifier: 'ctrl' },
          { key: 'a', modifier: 'meta' }
        ],
        handler: this._handleA.bind(this)
      },
      { key: ['Enter', ' '], handler: this._handleEnterOrSpace.bind(this) }
    ],
    searchHandler: this._search.bind(this)
  });
  private _selectionController = new TreeSelectionController(this);
  private _dragController = new DragController(this, {
    getSourceElement: () => this
  });
  private _dropController = new DropController(this, {
    childSelector: 'forge-tree-item',
    orientation: 'vertical',
    throttle: 0,
    getIndex: event => this._getInsertionIndex(event),
    onDragStart: args => this._handleDragStart(args),
    onDragEnter: () => this._showDropIndicator(),
    onDragOver: () => this._showDropIndicator(),
    onDragLeave: () => this._handleDragLeave(),
    onDragEnd: () => this._handleDragEnd(),
    onDrop: () => this._handleDrop()
  });
  private _draggedItem?: TreeItemComponent;
  private _dropLocation?: ITreeDropLocation | null;
  private _lastFocusedItem?: TreeItemComponent;
  private _expandIcon?: HTMLElement;
  private _collapseIcon?: HTMLElement;
  private _expandIconObserver?: MutationObserver;
  private _collapseIconObserver?: MutationObserver;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._updateContext();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = 0;
    setDefaultAria(this, this._internals, { role: 'tree' });

    // Listen for focus events on the host element
    this.addEventListener('focusin', this._handleFocusIn.bind(this));
    this.addEventListener('focusout', this._handleFocusOut.bind(this));

    // Listen for item update events on the host element
    this.addEventListener('forge-tree-item-update', this._handleUpdate.bind(this));
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._expandIconObserver?.disconnect();
    this._collapseIconObserver?.disconnect();
  }

  public willUpdate(_changedProperties: PropertyValues<this>): void {
    if (_changedProperties.has('accordion')) {
      if (this.accordion) {
        closeDescendants(this);
      }
    }
    if (_changedProperties.has('disabled')) {
      this._setDisabled();
    }
    if (
      _changedProperties.has('disabled') ||
      _changedProperties.has('indentLines') ||
      _changedProperties.has('mode') ||
      _changedProperties.has('reorderable')
    ) {
      this._updateContext();
    }
    if (_changedProperties.has('reorderable')) {
      this._dragController.setEnabled(this.reorderable);
      this._dropController.setEnabled(this.reorderable);
    }
    if (_changedProperties.has('mode')) {
      this._setDisabled();
      this._setMode();
      this._selectionController.cleanup();
    }
  }

  public render(): TemplateResult {
    return html`
      <div
        part="root"
        class=${classMap({ 'forge-tree': true, 'indent-lines': this.indentLines, multiple: this.mode === 'multiple' })}
        @click=${this._handleClick}>
        <slot></slot>
        <div class="icons" @slotchange="${this._detectSlottedIcon}">
          <slot name="expand-icon"></slot>
          <slot name="collapse-icon"></slot>
        </div>
      </div>
    `;
  }

  private _updateContext(): void {
    this._context = {
      collapseIcon: this._collapseIcon,
      disabled: this.disabled,
      expandIcon: this._expandIcon,
      indentLines: this.indentLines,
      mode: this.mode,
      reorderable: this.reorderable
    };
  }

  /**
   * Toggle either the selected or open state of a key item when its header is clicked.
   */
  private _handleClick(evt: PointerEvent): void {
    // Ensure an item's header was clicked, ignoring clicks on its drag handle
    if (!eventPathIncludesTreeItemHeader(evt) || eventPathIncludesTreeItemDragHandle(evt)) {
      return;
    }

    // Get the item
    const item = getTreeItemTarget(evt);
    if (!item) {
      return;
    }

    // If the item is a leaf node toggle the selected state
    if (item.leaf) {
      // Do nothing if selection is off
      if (this.mode === 'off') {
        return;
      }
      if (evt.shiftKey) {
        this._selectionController.extend(item);
      }
      this._selectionController.toggle(item);
      return;
    }

    // If in leaf or off mode a click anywhere toggles the open state
    if (this.mode === 'leaf' || this.mode === 'off') {
      this._toggleOpen(item, evt.altKey && item.open);
      return;
    }

    // Otherwise only a click on the expand icon toggles the open state
    if (!item.openDisabled && eventPathIncludesTreeItemExpandIcon(evt)) {
      this._toggleOpen(item, evt.altKey && item.open);
      return;
    }

    if (evt.shiftKey) {
      this._selectionController.extend(item);
    }
    this._selectionController.toggle(item);
  }

  /**
   * Focuses the next or previous visible item.
   */
  private _handleArrowUpOrDown(evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }
    const destinationItem = evt.key === 'ArrowDown' ? getNextItem(target) : getPreviousItem(target);
    if (destinationItem) {
      if (evt.shiftKey && this.mode === 'multiple') {
        this._selectionController.toggle(destinationItem, true);
      }
      this._focusItem(destinationItem);
    }
  }

  /**
   * If the focused item is open, closes it. Otherwise, focuses the parent item.
   */
  private _handleArrowLeft(evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }
    if (!target.open) {
      const parent = getParentItem(target);
      if (parent) {
        this._focusItem(parent);
      }
    }
    this._toggleOpen(target, false, false);
  }

  /**
   * If the focused item is closed, opens it. Otherwise, focuses the first child item.
   */
  private _handleArrowRight(evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target || target.leaf) {
      return;
    }
    if (target.open) {
      const firstChild = getFirstChildItem(target);
      if (firstChild) {
        this._focusItem(firstChild);
      }
    }
    this._toggleOpen(target, false, true);
  }

  /**
   * Focuses the first visible item. If the mode is multiple and the meta key is pressed, selects
   * all previous items.
   */
  private _handleHome(evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }

    // Select all previous items if the shift and meta keys are pressed
    if (evt.shiftKey && (evt.metaKey || evt.ctrlKey) && this.mode === 'multiple') {
      // TODO: can this just use the selection controller's extend method?
      let previousItem = getPreviousItem(target);
      while (previousItem) {
        this._selectionController.toggle(previousItem, true);
        previousItem = getPreviousItem(previousItem);
      }
    }

    const firstItem = getFirstChildItem(this);
    if (firstItem) {
      this._focusItem(firstItem);
    }
  }

  /**
   * Focuses the last visible item. If the mode is multiple and the meta key is pressed, selects
   * all subsequent items.
   */
  private _handleEnd(evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }

    // Select all subsequent items if the shift and meta keys are pressed
    if (evt.shiftKey && (evt.metaKey || evt.ctrlKey) && this.mode === 'multiple') {
      // TODO: can this just use the selection controller's extend method?
      let nextItem = getNextItem(target);
      while (nextItem) {
        this._selectionController.toggle(nextItem, true);
        nextItem = getNextItem(nextItem);
      }
    }

    let lastItem = getLastChildItem(this);
    while (lastItem && lastItem.open) {
      lastItem = getLastChildItem(lastItem);
    }
    if (lastItem) {
      this._focusItem(lastItem);
    }
  }

  /**
   * Opens the focused item and all sibling items.
   */
  private _handleAsterisk(evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }
    getSiblingItems(target, true).forEach(item => this._toggleOpen(item, false, true));
  }

  /**
   * If the mode is multiple, selects all items.
   */
  private _handleA(): void {
    if (this.mode !== 'multiple') {
      return;
    }
    this._selectionController.selectAll();
  }

  /**
   * Toggles the open or selected state of the focused item.
   */
  private _handleEnterOrSpace(evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }
    if (target.leaf) {
      if (this.mode === 'off') {
        return;
      }
      if (evt.shiftKey) {
        this._selectionController.extend(target);
      }
      this._selectionController.toggle(target);
      return;
    }
    if (evt.key === 'Enter') {
      this._toggleOpen(target, evt.altKey && target.open);
    } else if (this.mode !== 'off') {
      this._selectionController.toggle(target);
    }
  }

  /**
   * Moves the focused item up or down in the visible order, moving into or out of an adjacent
   * parent when it reaches the end of its siblings.
   */
  private _handleReorderKey(evt: KeyboardEvent): boolean | void {
    // Fall through to the default arrow key handling when reordering is not enabled
    if (!this.reorderable) {
      return true;
    }

    const target = getTreeItemFromEvent(evt);
    if (!target || this.disabled || target.disabled) {
      return;
    }

    const location = evt.key === 'ArrowDown' ? this._getLocationBelow(target) : this._getLocationAbove(target);
    if (location) {
      this._moveItem(target, location.parent, location.index);
    }
  }

  private _getLocationAbove(item: TreeItemComponent): ITreeDropLocation | null {
    const siblings = getSiblingItems(item, true);
    const previous = siblings[siblings.indexOf(item) - 1];
    if (!previous) {
      const parent = getParentItem(item);
      return parent ? this._getLocationBefore(parent, item) : null;
    }

    // Enter the previous item as its last child when it is open
    const children = getChildItems(previous);
    if (previous.open && children.length) {
      return { parent: previous, index: children.length, position: 'after', target: children[children.length - 1] };
    }
    return this._getLocationBefore(previous, item);
  }

  private _getLocationBelow(item: TreeItemComponent): ITreeDropLocation | null {
    const siblings = getSiblingItems(item, true);
    const next = siblings[siblings.indexOf(item) + 1];
    if (!next) {
      const parent = getParentItem(item);
      return parent ? this._getLocationAfter(parent, item) : null;
    }

    // Enter the next item as its first child when it is open
    const children = getChildItems(next);
    if (next.open && children.length) {
      return { parent: next, index: 0, position: 'before', target: children[0] };
    }
    return this._getLocationAfter(next, item);
  }

  private _getLocationBefore(target: TreeItemComponent, exclude?: TreeItemComponent): ITreeDropLocation {
    const parent = getParentItem(target) ?? this;
    const index = getChildItems(parent)
      .filter(child => child !== exclude)
      .indexOf(target);
    return { parent, index, position: 'before', target };
  }

  private _getLocationAfter(target: TreeItemComponent, exclude?: TreeItemComponent): ITreeDropLocation {
    const location = this._getLocationBefore(target, exclude);
    return { ...location, index: location.index + 1, position: 'after' };
  }

  private _handleDragStart({ event, item, source }: DropEventArgs): boolean {
    // Only the drag handle of an enabled item that belongs to this tree starts a reorder
    const [origin] = event.composedPath();
    const isHandle = origin instanceof HTMLElement && origin.matches('.drag-handle');
    if (!this.reorderable || this.disabled || !isHandle || source !== this || !item || !isTreeItem(item) || item.disabled || getParentTree(item) !== this) {
      return false;
    }
    this._draggedItem = item;
    return true;
  }

  private _handleDragLeave(): void {
    this._dropLocation = undefined;
    this._clearDropIndicator();
  }

  private _handleDragEnd(): void {
    this._draggedItem = undefined;
    this._dropLocation = undefined;
    this._clearDropIndicator();
  }

  private _handleDrop(): void {
    const item = this._draggedItem;
    const location = this._dropLocation;
    this._clearDropIndicator();
    if (!item || !location) {
      return;
    }

    const moved = this._moveItem(item, location.parent, location.index);
    if (moved && location.position === 'inside' && isTreeItem(location.parent)) {
      location.parent.open = true;
    }
  }

  /**
   * Gets the drop location for the pointer position and stores it for the drag callbacks. Returns
   * the index within the location's parent, or -1 if the pointer is not over a valid location.
   */
  private _getInsertionIndex(event: DragEvent): number {
    this._dropLocation = this._getDropLocation(event);
    return this._dropLocation?.index ?? -1;
  }

  /**
   * Resolves the pointer position to a place in the tree. The top and bottom quarters of an item's
   * header insert before or after it, and the middle nests the dragged item inside of it.
   */
  private _getDropLocation(event: DragEvent): ITreeDropLocation | null {
    const dragged = this._draggedItem;
    if (!dragged) {
      return null;
    }

    const visibleItems = getChildItems(this, true)
      .map(item => ({ item, rect: getTreeItemHeader(item)?.getBoundingClientRect() }))
      .filter((entry): entry is { item: TreeItemComponent; rect: DOMRect } => !!entry.rect && entry.rect.height > 0);
    const hovered = visibleItems.find(entry => event.clientY <= entry.rect.bottom);

    // The pointer is below every item, so drop at the end of the tree
    if (!hovered) {
      const rootItems = getChildItems(this).filter(item => item !== dragged);
      const last = rootItems[rootItems.length - 1];
      return last ? { parent: this, index: rootItems.length, position: 'after', target: last } : null;
    }

    // An item can't be dropped on itself or inside of its own descendants
    const { item: target, rect } = hovered;
    if (dragged.contains(target)) {
      return null;
    }

    const canNest = !target.lazy && !target.disabled;
    const children = getChildItems(target).filter(child => child !== dragged);
    const ratio = (event.clientY - rect.top) / rect.height;
    if (ratio < DROP_EDGE_RATIO || (!canNest && ratio < 0.5)) {
      return this._getLocationBefore(target, dragged);
    }
    if (ratio <= 1 - DROP_EDGE_RATIO && canNest) {
      return { parent: target, index: children.length, position: 'inside', target };
    }

    // The space below an open item is the start of its children
    if (target.open && children.length) {
      return { parent: target, index: 0, position: 'before', target: children[0] };
    }
    return this._getLocationAfter(target, dragged);
  }

  private _isCurrentLocation(item: TreeItemComponent, location: ITreeDropLocation): boolean {
    const parent = getParentItem(item) ?? this;
    return location.parent === parent && location.index === getChildItems(parent).indexOf(item);
  }

  private _showDropIndicator(): void {
    this._clearDropIndicator();

    const item = this._draggedItem;
    const location = this._dropLocation;
    if (!item || !location || this._isCurrentLocation(item, location)) {
      return;
    }
    location.target.toggleAttribute(`data-drop-${location.position}`, true);
  }

  private _clearDropIndicator(): void {
    this.querySelectorAll('[data-drop-before], [data-drop-after], [data-drop-inside]').forEach(el => {
      el.removeAttribute('data-drop-before');
      el.removeAttribute('data-drop-after');
      el.removeAttribute('data-drop-inside');
    });
  }

  /**
   * Moves an item to an index among the child items of a parent, unless the reorder event is
   * canceled.
   * @param item The item to move.
   * @param parent The tree or tree item to move the item into.
   * @param index The index the item should occupy among the parent's child items after the move.
   * @returns Whether the item was moved.
   */
  private _moveItem(item: TreeItemComponent, parent: TreeComponent | TreeItemComponent, index: number): boolean {
    // An item can't be moved into itself or its own descendants
    if (item.contains(parent)) {
      return false;
    }

    const previousParent = getParentItem(item) ?? this;
    const previousIndex = getChildItems(previousParent).indexOf(item);
    const others = getChildItems(parent).filter(child => child !== item);
    const newIndex = Math.min(Math.max(index, 0), others.length);
    if (previousParent === parent && previousIndex === newIndex) {
      return false;
    }

    const event = new CustomEvent<ITreeItemReorderEventData>('forge-tree-item-reorder', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { item, parent, previousParent, index: newIndex, previousIndex }
    });
    if (!item.dispatchEvent(event)) {
      return false;
    }

    // Moving an element in the DOM blurs it, so restore focus afterward
    const hadFocus = item.matches(':focus-within');
    if (newIndex < others.length) {
      others[newIndex].before(item);
    } else if (others.length) {
      others[others.length - 1].after(item);
    } else {
      parent.append(item);
    }

    // The item's old parent lost a child, which can change its selected state
    if (previousParent !== parent && this.mode === 'multiple' && isTreeItem(previousParent)) {
      this._selectionController.updateFrom(previousParent);
    }
    if (hadFocus) {
      item.focus();
    }
    return true;
  }

  private _handleFocusIn(evt: FocusEvent): void {
    // Focus either the last focused item or first item when the tree receives focus
    if (evt.target === this) {
      const itemToFocus = this._lastFocusedItem ?? getFirstChildItem(this);
      if (!itemToFocus) {
        return;
      }
      this._focusItem(itemToFocus);
    }

    // If a tree item was focused, set it as the last focused item and add it to the tab order
    const target = evt.target as HTMLElement;
    if (target && isTreeItem(target)) {
      if (this._lastFocusedItem) {
        this._lastFocusedItem.tabIndex = -1;
      }
      target.tabIndex = 0;
      this._lastFocusedItem = target;

      // Remove this from the tab order while focus is inside
      this.tabIndex = -1;
    }
  }

  private _handleFocusOut(evt: FocusEvent): void {
    // If focus moved outside the tree, reset the tree's tab index
    const relatedTarget = evt.relatedTarget as HTMLElement | null;
    if (!relatedTarget || !this.contains(relatedTarget)) {
      this.tabIndex = 0;
    }
  }

  private _handleUpdate(evt: CustomEvent<{ reason: TreeItemUpdateReason }>): void {
    evt.stopPropagation();

    if (evt.detail.reason === 'opened') {
      // Do nothing if accordion isn't enabled
      if (!this.accordion) {
        return;
      }

      // Do nothing if the target is missing or closed
      const target = getTreeItemFromEvent(evt);
      if (!target || !target.open) {
        return;
      }

      // If accordion is enabled, close all the items outside the target's path
      const items = getTreeItemsInEventPath(evt);
      closeDescendants(this);
      items.forEach(item => (item.open = true));
    }
  }

  private _search(searchString: string, evt: KeyboardEvent): void {
    const target = getTreeItemFromEvent(evt);
    if (!target) {
      return;
    }
    const item = searchItems(target, searchString);
    if (item) {
      this._focusItem(item);
    }
  }

  private _toggleOpen(item: TreeItemComponent, flatten = false, force?: boolean): void {
    if (item.openDisabled) {
      return;
    }

    item.open = force ?? !item.open;
    if (!item.open && flatten) {
      closeDescendants(item);
    }

    // Dispatch an open event from the item
    const event = new CustomEvent(`forge-tree-item-${item.open ? 'open' : 'close'}`, { bubbles: true, composed: true });
    item.dispatchEvent(event);
    if (event.defaultPrevented) {
      return;
    }
  }

  private _focusItem(item: TreeItemComponent): void {
    item.focus();

    if (this.mode !== 'multiple' && this.selectionFollowsFocus) {
      this._selectionController.toggle(item, true);
    }
  }

  private _detectSlottedIcon(evt: Event): void {
    // Get the slot and clone the first assigned element
    const slot = evt.target as HTMLSlotElement;
    const assignedElement = slot.assignedElements()[0];

    // If the assigned element is removed, remove the icon and update the context
    if (!assignedElement) {
      if (slot.name === 'expand-icon') {
        this._expandIcon = undefined;
        this._expandIconObserver?.disconnect();
      } else if (slot.name === 'collapse-icon') {
        this._collapseIcon = undefined;
        this._collapseIconObserver?.disconnect();
      }
      this._updateContext();
      return;
    }

    if (slot.name === 'expand-icon') {
      this._observeIcon(assignedElement, 'expand');
    } else if (slot.name === 'collapse-icon') {
      this._observeIcon(assignedElement, 'collapse');
    }
  }

  private _observeIcon(assignedElement: Element, type: 'expand' | 'collapse'): void {
    const key: `_${typeof type}IconObserver` = `_${type}IconObserver`;
    this[key] ??= new MutationObserver(() => this._updateIcon(assignedElement, type));
    this[key].observe(assignedElement, { attributes: true, subtree: true, childList: true, characterData: true });
    this._updateIcon(assignedElement, type);
  }

  private _updateIcon(assignedElement: Element, type: 'expand' | 'collapse'): void {
    // Clone the element and remove any ids
    const clone = assignedElement?.cloneNode(true) as HTMLElement;
    [clone, ...clone.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));

    // Set the slot, save the clone to the appropriate property, and update the context
    clone.slot = `context-${type}-icon`;
    this[`_${type}Icon`] = clone;
    this._updateContext();
  }

  private _setDisabled(): void {
    setDefaultAria(this, this._internals, { ariaDisabled: this.disabled ? 'true' : 'false' });
    toggleState(this._internals, 'disabled', this.disabled);
  }

  private _setMode(): void {
    setDefaultAria(this, this._internals, {
      ariaMultiSelectable: this.mode === 'multiple' ? 'true' : 'false' // || this.mode === 'multiple-discrete'
    });
  }
}

tryDefine('forge-tree', TreeComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-tree': TreeComponent;
  }
  interface HTMLElementEventMap {
    'forge-tree-item-reorder': CustomEvent<ITreeItemReorderEventData>;
  }
}
