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
 * @dependency forge-circular-progress
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
   * Whether the tree item supports lazy loading.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public lazy = false;

  /**
   * Whether the tree item is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public disabled = false;

  /**
   * Whether opening the tree item is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, attribute: 'open-disabled' }) public openDisabled = false;

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
    return !this._children.length && !this.lazy;
  }

  /**
   * Whether the selected value is indeterminate.
   */
  public get indeterminate(): boolean {
    return this[indeterminate];
  }

  @state() @consume({ context: TREE_CONTEXT, subscribe: true }) private _context: ITreeContext;

  @state() private _level = 0;
  @state() private _leaf = true;
  @state() private _loading = false;
  @state() private _hasSlottedExpandIcon = false;
  @state() private _hasSlottedCollapseIcon = false;
  @state() private _checkboxIcon: TreeItemCheckboxIcon = 'check_box_outline_blank';

  @queryAssignedNodes({ slot: 'children', flatten: true }) private _children: NodeListOf<HTMLElement>;

  private _internals: ElementInternals;

  // This is used to avoid dispatching a deselected update event when the tree item is first rendered.
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
    this._detectChildren();
    this._dispatchUpdate('added');
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._dispatchUpdate('removed');
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    changedProperties.forEach((_, prop) => {
      switch (prop) {
        case 'selected':
          this._setSelected();
          this._checkboxIcon = this.indeterminate ? 'indeterminate_check_box' : this.selected ? 'check_box' : 'check_box_outline_blank';
          break;
        case indeterminate:
          toggleState(this._internals, 'indeterminate', this.indeterminate);
          this._checkboxIcon = this.indeterminate ? 'indeterminate_check_box' : this.selected ? 'check_box' : 'check_box_outline_blank';
          break;
        case 'open':
          this._setOpen();
          break;
        case 'lazy':
          this._loading = this.lazy;
          this._detectChildren();
          this._setOpen();
          break;
        case 'loading':
          this._setLoading();
          break;
        case 'disabled':
          this._setDisabled();
          break;
        case 'openDisabled':
          this._setOpenDisabled();
          break;
      }
    });

    // Keep track of changed properties within the tree's context object.
    const modeChanged = changedProperties.has('_context' as any) && changedProperties.get('_context' as any)?.mode !== this._context.mode;
    const rootDisabledChanged = changedProperties.has('_context' as any) && changedProperties.get('_context' as any)?.disabled !== this._context.disabled;
    const rootExpandIconChanged = changedProperties.has('_context' as any) && changedProperties.get('_context' as any)?.expandIcon !== this._context.expandIcon;
    const rootCollapseIconChanged =
      changedProperties.has('_context' as any) && changedProperties.get('_context' as any)?.collapseIcon !== this._context.collapseIcon;

    if (modeChanged) {
      this._setDisabled();
      this._setMode();
      this._setOpen();
    }
    if (rootExpandIconChanged) {
      this._setIconFromContext('expand');
    }
    if (rootCollapseIconChanged) {
      this._setIconFromContext('collapse');
    }
    if (rootDisabledChanged) {
      this._setDisabled();
    }
  }

  public render(): TemplateResult {
    // An item can individually disabled or inherit the disabled state from the tree.
    const disabled = this.disabled || this._context.disabled;

    // An item is interactive if a click anywhere in the header can select or open it. Interactive
    // items show a pointer cursor.
    const interactive =
      this._context.mode === 'off'
        ? !this._leaf && !this.openDisabled
        : this._context.mode === 'leaf'
          ? (this._leaf && !disabled) || (!this._leaf && !this.openDisabled)
          : !disabled;

    // The header state layer is removed when the item is not interactive.
    const hideHeaderStateLayer = !interactive;

    return html`
      <div
        part="root"
        class=${classMap({ 'forge-tree-item': true, interactive, disabled, 'open-disabled': this.openDisabled })}
        style=${styleMap({ '--_tree-item-level': this.level })}>
        <div part="header" class="header">
          ${!this._leaf ? this._expandIconTemplate() : html`<span class="leaf-spacer"></span>`}
          ${this._context.mode === 'multiple'
            ? html`<forge-icon id="checkbox" class="checkbox" part="checkbox" .name="${this._checkboxIcon}"></forge-icon>`
            : nothing}
          <div class="start">
            <slot name="start"></slot>
          </div>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <div class="end">
            <slot name="end"></slot>
          </div>
          ${hideHeaderStateLayer ? nothing : html`<forge-state-layer></forge-state-layer>`}
          <forge-focus-indicator target=":host" focus-mode="focus" inward></forge-focus-indicator>
        </div>
        <div role="group" class="children" part="children">
          <div class="children-header" part="children-header">
            <slot name="children-header"></slot>
          </div>
          <slot name="children" @slotchange="${this._detectChildren}"></slot>
          <div class="children-footer" part="children-footer">
            <slot name="children-footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  private _expandIconTemplate(): TemplateResult {
    // When an item is not interactive the expand icon may still be enabled and should show its
    // own state layer.
    const showStateLayer = this._context.mode !== 'leaf' && this._context.mode !== 'off' && (this.disabled || this._context.disabled) && !this.openDisabled;

    if (this._loading) {
      return html`
        <span part="expand-icon" class="expand-icon" aria-hidden="true">
          <forge-circular-progress class="loading" part="loading-indicator"></forge-circular-progress>
        </span>
      `;
    }

    // The default expand icon is shown when no custom expand or collapse icons are provided.
    const showDefaultIcon = !this._hasSlottedExpandIcon && !this._hasSlottedCollapseIcon;

    return html`
      <span
        part="expand-icon"
        class=${classMap({
          'expand-icon': true,
          'has-custom-expand-icon': this._hasSlottedExpandIcon,
          'has-custom-collapse-icon': this._hasSlottedCollapseIcon
        })}
        aria-hidden="true"
        @slotchange="${this._detectSlottedExpandOrCollapseIcon}">
        ${showDefaultIcon
          ? html`<forge-open-icon class="default-expand-icon" orientation="horizontal" rotation="half" .open="${this.open}"></forge-open-icon>`
          : nothing}
        <slot name="expand-icon">
          <slot name="context-expand-icon"></slot>
        </slot>
        <slot name="collapse-icon">
          <slot name="context-collapse-icon"></slot>
        </slot>
        ${showStateLayer ? html`<forge-state-layer></forge-state-layer>` : nothing}
      </span>
    `;
  }

  private _slotInParent(): void {
    const parent = this.parentElement;
    if (parent?.tagName.toLowerCase() === 'forge-tree-item') {
      this.slot = 'children';
    }
  }

  private _detectChildren(): void {
    this._leaf = this.leaf;
    this._setOpen();
    toggleState(this._internals, 'leaf', this._leaf);
  }

  private _detectSlottedExpandOrCollapseIcon(evt: Event): void {
    const slot = evt.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements();

    if (slot.name === 'expand-icon' || slot.name === 'context-expand-icon') {
      this._hasSlottedExpandIcon = !!assignedElements.length;
    } else if (slot.name === 'collapse-icon' || slot.name === 'context-collapse-icon') {
      this._hasSlottedCollapseIcon = !!assignedElements.length;
    }
  }

  private _setIconFromContext(icon: 'expand' | 'collapse'): void {
    // Remove any old icons in this slot
    const oldIcons = Array.from(this.children).filter(el => el.slot === `context-${icon}-icon`);
    oldIcons.forEach(i => i.remove());

    // Add the new icon if it exists
    const newIcon = this._context[`${icon}Icon`];
    if (newIcon) {
      this.append(newIcon.cloneNode(true));
    }
  }

  private _setDisabled(): void {
    const disabled = this.disabled || this._context.disabled;
    setDefaultAria(this, this._internals, { ariaDisabled: disabled ? 'true' : 'false' });
    toggleState(this._internals, 'disabled', disabled);
  }

  private _setLoading(): void {
    setDefaultAria(this, this._internals, { ariaBusy: this._loading ? 'true' : 'false' });
  }

  private _setMode(): void {
    setDefaultAria(this, this._internals, {
      ariaSelected: this._context.mode === 'off' ? null : this.selected ? 'true' : 'false'
    });
  }

  private _setOpen(): void {
    setDefaultAria(this, this._internals, {
      ariaExpanded: this.leaf || this.openDisabled ? null : this.open ? 'true' : 'false'
    });
    toggleState(this._internals, 'open', !this.leaf && this.open);
    if (this.open) {
      this._dispatchUpdate('opened');
    }
  }

  private _setOpenDisabled(): void {
    setDefaultAria(this, this._internals, { ariaExpanded: this.leaf || this.openDisabled ? null : this.open ? 'true' : 'false' });
  }

  private _setSelected(): void {
    if (!this._hasBeenSelected && this.selected) {
      this._hasBeenSelected = true;
    }
    setDefaultAria(this, this._internals, { ariaSelected: this._context.mode === 'off' ? null : this.selected ? 'true' : 'false' });
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
