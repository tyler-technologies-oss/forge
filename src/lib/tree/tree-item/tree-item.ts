import { consume } from '@lit/context';
import { tylIconCheckBox, tylIconCheckBoxOutlineBlank, tylIconIndeterminateCheckBox } from '@tylertech/tyler-icons/standard';
import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { setDefaultAria, toggleState } from '../../core/utils/a11y-utils';
import { IconRegistry } from '../../icon';
import { ITreeContext, TREE_CONTEXT } from '../tree';
import { getLevel, indeterminate } from '../tree-utils';

import '../../icon';
import '../../open-icon';

import styles from './tree-item.scss';

export type TreeItemCheckboxIcon = 'check_box_outline_blank' | 'check_box' | 'indeterminate_check_box';
export type TreeItemUpdateReason = 'added' | 'deselected' | 'opened' | 'removed' | 'selected';

/**
 * @tag forge-tree-item
 *
 * @dependency forge-icon
 * @dependency forge-open-icon
 *
 * @event {CustomEvent<unknown>} forge-tree-item-select - Dispatched when the user selects a tree item.
 * @event {CustomEvent<void>} forge-tree-item-open - Dispatched when the user opens a tree item.
 * @event {CustomEvent<void>} forge-tree-item-close - Dispatched when the user closes a tree item.
 */
@customElement('forge-tree-item')
export class TreeItemComponent extends LitElement {
  public static styles = unsafeCSS(styles);

  /**
   * The value of the tree item.
   * @default undefined
   * @attribute
   */
  @property() public value: unknown;

  /**
   * Whether the tree item is selected.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public selected = false;

  /**
   * Whether the tree item is expanded.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public open = false;

  /**
   * Whether the selected value is indeterminate. This is a symbol property to avoid being set from
   * outside the library.
   * @ignore
   * @default false
   */
  @property({ attribute: false }) public [indeterminate] = false;

  /**
   * The depth of the tree item within the tree's hierarchy.
   */
  public get level(): number {
    return this._level;
  }

  /**
   * Whether the tree item has no child items.
   */
  public get leaf(): boolean {
    return !this._children.length;
  }

  /**
   * Whether the selected value is indeterminate.
   */
  public get indeterminate(): boolean {
    return this[indeterminate];
  }

  @consume({ context: TREE_CONTEXT, subscribe: true }) private _context: ITreeContext;

  @state() private _level = 0;
  @state() private _leaf = true;
  @state() private _checkboxIcon: TreeItemCheckboxIcon = 'check_box_outline_blank';

  @queryAssignedNodes({ slot: 'children', flatten: true }) private _children: NodeListOf<HTMLElement>;

  private _internals: ElementInternals;

  // This is used to avoid dispatching an deselected update event when the tree item is first rendered.
  private _hasBeenSelected = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
    IconRegistry.define([tylIconCheckBox, tylIconCheckBoxOutlineBlank, tylIconIndeterminateCheckBox]);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, { role: 'treeitem' });
    this.tabIndex = -1;
    this._level = getLevel(this);
    this._slotInParent();
    this._checkIfLeaf();
    this._dispatchUpdate('added');
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._dispatchUpdate('removed');
  }

  public willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('open')) {
      this._setOpen();
    }
    if (changedProperties.has('selected')) {
      this._setSelected();
    }
    if (changedProperties.has(indeterminate)) {
      toggleState(this._internals, 'indeterminate', this.indeterminate);
    }
    if (changedProperties.has('selected') || changedProperties.has(indeterminate)) {
      this._checkboxIcon = this.indeterminate ? 'indeterminate_check_box' : this.selected ? 'check_box' : 'check_box_outline_blank';
    }
  }

  public render(): TemplateResult {
    return html`
      <div
        part="root"
        class=${classMap({ 'forge-tree-item': true, interactive: !this._leaf || this._context.mode !== 'list' })}
        style=${styleMap({ '--_tree-item-level': this.level })}>
        <div part="header" class="header">
          ${!this._leaf
            ? html`
                <span part="expand-icon" class="expand-icon">
                  <slot name="expand-icon">
                    <forge-open-icon orientation="horizontal" rotation="half" .open="${this.open}"></forge-open-icon>
                  </slot>
                </span>
              `
            : html`<span class="leaf-spacer"></span>`}
          ${this._context.mode === 'multiple'
            ? html`<forge-icon id="checkbox" class="checkbox" part="checkbox" .name="${this._checkboxIcon}"></forge-icon>`
            : nothing}
          <slot name="start"></slot>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <slot name="end"></slot>
          ${this._context.mode !== 'list' || !this._leaf ? html`<forge-state-layer></forge-state-layer>` : nothing}
          <forge-focus-indicator target=":host" focus-mode="focus" inward></forge-focus-indicator>
        </div>
        <div role="group" class="children" part="children">
          <slot name="children" @slotchange="${this._checkIfLeaf}"></slot>
        </div>
      </div>
    `;
  }

  private _slotInParent(): void {
    const parent = this.parentElement;
    if (parent?.tagName.toLowerCase() === 'forge-tree-item') {
      this.slot = 'children';
    }
  }

  private _checkIfLeaf(): void {
    this._leaf = this.leaf;
    this._setOpen();
    toggleState(this._internals, 'leaf', this._leaf);
  }

  private _setOpen(): void {
    setDefaultAria(this, this._internals, { ariaExpanded: this.leaf ? null : this.open ? 'true' : 'false' });
    toggleState(this._internals, 'open', !this.leaf && this.open);
    if (this.open) {
      this._dispatchUpdate('opened');
    }
  }

  private _setSelected(): void {
    if (!this._hasBeenSelected && this.selected) {
      this._hasBeenSelected = true;
    }
    setDefaultAria(this, this._internals, { ariaSelected: this.selected ? 'true' : 'false' });
    toggleState(this._internals, 'selected', this.selected);
    if (this._hasBeenSelected) {
      this._dispatchUpdate(this.selected ? 'selected' : 'deselected');
    }
  }

  private _dispatchUpdate(reason: TreeItemUpdateReason): void {
    this.dispatchEvent(new CustomEvent('forge-tree-item-update', { bubbles: true, detail: { reason } }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tree-item': TreeItemComponent;
  }
}
