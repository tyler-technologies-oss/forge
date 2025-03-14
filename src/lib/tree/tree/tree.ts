import { createContext, provide } from '@lit/context';
import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { setDefaultAria, toggleState } from '../../core/utils/a11y-utils';
import { KeyActionController } from '../../core/utils/key-action';
import { TreeItemComponent, TreeItemUpdateReason } from '../tree-item';
import {
  closeDescendants,
  eventPathIncludesTreeItemExpandIcon,
  eventPathIncludesTreeItemHeader,
  getFirstChildItem,
  getLastChildItem,
  getNextItem,
  getParentItem,
  getPreviousItem,
  getSiblingItems,
  getTreeItemFromEvent,
  getTreeItemsInEventPath,
  getTreeItemTarget,
  isTreeItem,
  searchItems
} from '../tree-utils';
import { TreeSelectionController } from './tree-selection-controller';

import styles from './tree.scss';

export type TreeMode = 'single' | 'multiple' | 'multiple-discrete' | 'leaf' | 'list';

export interface ITreeContext {
  disabled: boolean;
  indentLines: boolean;
  mode: TreeMode;
}

export const TREE_CONTEXT = createContext<ITreeContext>('forge-tree');

/**
 * @tag forge-tree
 *
 * @summary Trees are interactive lists that allow users to navigate through hierarchical data.
 *
 * @dependency forge-tree-item
 *
 * @event {CustomEvent<void>} forge-tree-select-all - Dispatched when the user selects all items.
 *
 * @csspart root - The root tree element.
 *
 * @slot - The default slot for tree items.
 * @slot expand-icon - A custom expand icon to show when an item is closed.
 * @slot collapse-icon - A custom collapse icon to show when an item is open.
 */
@customElement('forge-tree')
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
  private _lastFocusedItem?: TreeItemComponent;

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

  public willUpdate(_changedProperties: PropertyValues<this>): void {
    if (_changedProperties.has('accordion')) {
      closeDescendants(this);
    }
    if (_changedProperties.has('disabled')) {
      this._setDisabled();
    }
    if (_changedProperties.has('disabled') || _changedProperties.has('indentLines') || _changedProperties.has('mode')) {
      this._updateContext();
    }
    if (_changedProperties.has('mode')) {
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
        <slot name="expand-icon"></slot>
        <slot name="collapse-icon"></slot>
      </div>
    `;
  }

  private _updateContext(): void {
    this._context = {
      disabled: this.disabled,
      indentLines: this.indentLines,
      mode: this.mode
    };
  }

  /**
   * Toggle either the selected or open state of a key item when its header is clicked.
   */
  private _handleClick(evt: PointerEvent): void {
    // Ensure an item's header was clicked
    if (!eventPathIncludesTreeItemHeader(evt)) {
      return;
    }

    // Get the item
    const item = getTreeItemTarget(evt);
    if (!item) {
      return;
    }

    // If the item is a leaf node toggle the selected state
    if (item.leaf) {
      // Do nothing if the mode is list
      if (this.mode === 'list') {
        return;
      }
      if (evt.shiftKey) {
        this._selectionController.extend(item);
      }
      this._selectionController.toggle(item);
      return;
    }

    // If in leaf or list mode a click anywhere toggles the open state
    if (this.mode === 'leaf' || this.mode === 'list') {
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
      if (this.mode === 'list') {
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
    } else {
      this._selectionController.toggle(target);
    }
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

  private _setDisabled(): void {
    setDefaultAria(this, this._internals, { ariaDisabled: this.disabled ? 'true' : 'false' });
    toggleState(this._internals, 'disabled', this.disabled);
  }

  private _setMode(): void {
    setDefaultAria(this, this._internals, { ariaMultiSelectable: this.mode === 'multiple' || this.mode === 'multiple-discrete' ? 'true' : 'false' });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tree': TreeComponent;
  }
}
