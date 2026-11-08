import { LitElement, html, unsafeCSS, type TemplateResult } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ForgeAiPopoverComponent, type PopoverPlacement } from '../core/popover/popover.js';
import { type ForgeAiDropdownMenuItemComponent } from './ai-dropdown-menu-item.js';
import { DropdownNavigationController } from './navigation-controller.js';
import { SelectionManager, type DropdownChangeEventDetail, type DropdownMenuSelectionMode } from './selection-manager.js';

import styles from './ai-dropdown-menu.scss?inline';

import '../core/popover/popover.js';
import './ai-dropdown-menu-item-group.js';
import './ai-dropdown-menu-item.js';
import './ai-dropdown-menu-separator.js';

/**
 * Custom events for the dropdown menu component
 */
export interface DropdownMenuEvents {
  'forge-ai-dropdown-menu-change': CustomEvent<DropdownChangeEventDetail>;
  'forge-ai-dropdown-menu-open': CustomEvent<{ timestamp: number }>;
  'forge-ai-dropdown-menu-close': CustomEvent<{ timestamp: number }>;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-dropdown-menu': ForgeAiDropdownMenuComponent;
  }

  interface HTMLElementEventMap extends DropdownMenuEvents {}
}

export type DropdownMenuVariant = 'button' | 'icon-button' | 'icon-button-squared';
export type DropdownMenuDensity = 'small' | 'medium' | 'large';

/**
 * @summary An AI dropdown menu component with advanced selection modes and submenu support.
 *
 * @description
 * A comprehensive dropdown menu component that provides flexible selection modes,
 * keyboard navigation, accessibility features, and nested submenu support.
 *
 * ## Features
 * - **Multiple Selection Modes**: 'none' (actions), 'single' (radio), 'multi' (checkbox)
 * - **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Space, Escape
 * - **Submenu Support**: Nested dropdowns with configurable trigger behavior
 * - **Accessibility**: Complete ARIA implementation with screen reader support
 * - **Type Safety**: Strongly typed events with mode-specific event details
 * - **Customizable**: CSS custom properties for theming and configuration
 *
 * ## Selection Modes
 * - **'none'**: Items act as actions only (menuitem role) - no persistent state
 * - **'single'**: Single selection with radio button behavior (menuitemradio role)
 * - **'multi'**: Multiple selection with checkbox behavior (menuitemcheckbox role)
 *
 * ## Events
 * - **forge-ai-dropdown-menu-change**: Fired when selection changes with type-safe details
 * - **forge-ai-dropdown-menu-open**: Fired when dropdown opens
 * - **forge-ai-dropdown-menu-close**: Fired when dropdown closes
 *
 * @cssproperty --forge-ai-dropdown-menu-min-width - Minimum width of the dropdown menu.
 * @cssproperty --forge-ai-dropdown-menu-max-width - Maximum width of the dropdown menu.
 * @cssproperty --forge-ai-dropdown-menu-max-height - Maximum height of the dropdown menu.
 * @cssproperty --forge-ai-dropdown-menu-padding - Padding inside the dropdown menu.
 *
 * @slot - The default slot for dropdown menu items, item groups, and separators.
 * @slot header - The header content displayed at the top of the dropdown menu.
 * @slot trigger-content - The content of the trigger button (text or icon) when no selection is made.
 * @slot selected-text - Custom content for the trigger button when selections are made (overrides default selection text).
 * @slot start - The start icon slot for additional trigger button content.
 * @slot end - The end icon slot for additional trigger button content.
 *
 * @example
 * ```html
 * <!-- Basic dropdown with single selection -->
 * <forge-ai-dropdown-menu selection-mode="single">
 *   <forge-ai-dropdown-menu-item value="option1">Option 1</forge-ai-dropdown-menu-item>
 *   <forge-ai-dropdown-menu-item value="option2">Option 2</forge-ai-dropdown-menu-item>
 * </forge-ai-dropdown-menu>
 *
 * <!-- Dropdown with submenu -->
 * <forge-ai-dropdown-menu>
 *   <forge-ai-dropdown-menu-item value="parent">
 *     Parent Item
 *     <forge-ai-dropdown-menu slot="submenu">
 *       <forge-ai-dropdown-menu-item value="child1">Child 1</forge-ai-dropdown-menu-item>
 *       <forge-ai-dropdown-menu-item value="child2">Child 2</forge-ai-dropdown-menu-item>
 *     </forge-ai-dropdown-menu>
 *   </forge-ai-dropdown-menu-item>
 * </forge-ai-dropdown-menu>
 * ```
 */
@customElement('forge-ai-dropdown-menu')
export class ForgeAiDropdownMenuComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * The variant of the dropdown menu trigger button.
   */
  @property()
  public variant: DropdownMenuVariant = 'button';

  /**
   * The density of the dropdown menu trigger button.
   */
  @property()
  public density: DropdownMenuDensity = 'medium';

  /**
   * Whether the dropdown is open.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Whether the dropdown menu is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The selection mode for the dropdown menu.
   * - 'none': No selection state, items act as actions only
   * - 'single': Single selection with radio button behavior
   * - 'multi': Multiple selection with checkbox behavior
   */
  @property({ attribute: 'selection-mode' })
  public selectionMode: DropdownMenuSelectionMode = 'none';

  /**
   * The currently selected value(s).
   * For single selection: string or null
   * For multi selection: string array
   * For none mode: null
   */
  @property()
  public value: string | string[] | null = null;

  /**
   * The placement of the popover relative to the trigger button.
   * Only applies to root-level menus; submenus always use 'right-start'.
   */
  @property({ attribute: 'popover-placement' })
  public popoverPlacement: PopoverPlacement = 'bottom-start';

  /**
   * Accessible label for the trigger button. Set this for icon-only triggers
   * that have no visible text so screen readers can announce the button.
   */
  @property({ attribute: 'trigger-label' })
  public triggerLabel?: string;

  @state()
  private _isSubmenu = false;

  private _navigationController!: DropdownNavigationController;
  private _selectionManager!: SelectionManager;

  @query('.forge-button,.forge-icon-button')
  private _triggerButton!: HTMLButtonElement;

  @query('forge-ai-popover')
  private _popover!: ForgeAiPopoverComponent;

  @queryAssignedElements({ flatten: true })
  private _slottedItems!: Element[];

  public override connectedCallback(): void {
    super.connectedCallback();
    this._detectSubmenuMode();
    this._initializeControllers();
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('focusout', this._onFocusOut);
  }

  private _detectSubmenuMode(): void {
    this._isSubmenu = this.parentElement?.tagName.toLowerCase() === 'forge-ai-dropdown-menu-item';
    if (this._isSubmenu) {
      this.setAttribute('data-submenu', 'true');
    }
  }

  private _initializeControllers(): void {
    // Initialize navigation controller
    this._navigationController = new DropdownNavigationController(
      this,
      () => this._getMenuItems(),
      (index: number) => this._selectItem(index),
      () => {
        this.open = false;
      },
      () => {
        this.open = true;
      },
      () => this._isSubmenu
    );

    // Initialize selection manager
    this._selectionManager = new SelectionManager(
      () => this._getMenuItems(),
      (detail: DropdownChangeEventDetail) => this._dispatchSelectionEvent(detail),
      { mode: this.selectionMode }
    );

    // Sync initial values
    this._selectionManager.value = this.value;
  }

  public override firstUpdated(): void {
    // Ensure initial selection state is applied to items
    this._updateItemSelectionState();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('focusout', this._onFocusOut);
  }

  public override updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('open')) {
      this._popover.open = this.open;
      if (this.open) {
        this.setAttribute('data-handles-escape', '');
        this._navigationController?.onOpen();
        this._dispatchOpenCloseEvent('open');
      } else if (changedProperties.get('open') === true) {
        // Was open, now closed
        this.removeAttribute('data-handles-escape');
        this._dispatchOpenCloseEvent('close');
      }
    }

    if (changedProperties.has('selectionMode')) {
      this._selectionManager?.updateConfig({ mode: this.selectionMode });
    }

    if (changedProperties.has('value')) {
      if (this._selectionManager) {
        this._selectionManager.value = this.value;
      }
    }
  }

  private _updateItemSelectionState(): void {
    // This method is now handled by the SelectionManager
    // Keep for backward compatibility but delegate to manager
    if (this._selectionManager) {
      this._selectionManager.value = this.value;
    }
  }

  private _handleTriggerClick(): void {
    if (this.disabled) {
      return;
    }
    this.open = !this.open;
  }

  private _onKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled || !this._navigationController) {
      return;
    }

    this._navigationController.handleKeyDown(event, this.open, this._triggerButton);
  };

  public focusFirstItem(): void {
    this._navigationController?.focusFirstItem();
  }

  private _getMenuItems(): ForgeAiDropdownMenuItemComponent[] {
    const items: ForgeAiDropdownMenuItemComponent[] = [];

    // Get direct items and items within groups
    this._slottedItems.forEach(element => {
      if (element.tagName.toLowerCase() === 'forge-ai-dropdown-menu-item') {
        items.push(element as ForgeAiDropdownMenuItemComponent);
      } else if (element.tagName.toLowerCase() === 'forge-ai-dropdown-menu-item-group') {
        // Find items within the group
        const groupItems = element.querySelectorAll('forge-ai-dropdown-menu-item');
        items.push(...(Array.from(groupItems) as ForgeAiDropdownMenuItemComponent[]));
      }
    });

    return items;
  }

  private _selectItem(index: number): void {
    const items = this._getMenuItems();
    const selectedItem = items[index];

    if (selectedItem && this._selectionManager) {
      const result = this._selectionManager.selectItem(selectedItem);

      if (result.shouldClose) {
        this.open = false;
        this._triggerButton.focus();
      }

      // Update component value to stay in sync
      this.value = this._selectionManager.value;
    }
  }

  private _dispatchSelectionEvent(detail: DropdownChangeEventDetail): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-dropdown-menu-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private _dispatchOpenCloseEvent(type: 'open' | 'close'): void {
    const eventName = type === 'open' ? 'forge-ai-dropdown-menu-open' : 'forge-ai-dropdown-menu-close';
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { timestamp: Date.now() },
        bubbles: true,
        composed: true
      })
    );
  }

  private _onPopoverToggle(event: CustomEvent): void {
    this.open = event.detail.open;
  }

  private _onItemClick(event: Event): void {
    // Find the closest menu item that was clicked
    const clickedElement = event.target as Element;
    const menuItem = clickedElement.closest('forge-ai-dropdown-menu-item') as ForgeAiDropdownMenuItemComponent;

    if (!menuItem) {
      return;
    }

    // Check if this menu item is a direct child of this dropdown menu
    // (not nested in a submenu that belongs to another dropdown)
    const items = this._getMenuItems();
    const index = items.findIndex(item => item === menuItem);

    // Only handle the click if this menu item is a direct child of this dropdown
    if (index >= 0) {
      // More robust check: verify this menu item is directly owned by this dropdown
      // by checking if there's any other dropdown menu between this item and this dropdown
      const itemParentDropdown = menuItem.closest('forge-ai-dropdown-menu');

      // Only handle the click if this dropdown is the immediate parent dropdown of the item
      if (itemParentDropdown === this) {
        // Additional check: if the item has an open submenu, don't select it
        // This prevents parent item selection when submenu is open
        const hasOpenSubmenu = menuItem.querySelector('forge-ai-dropdown-menu[data-submenu="true"]') as ForgeAiDropdownMenuComponent;
        const submenuIsOpen = hasOpenSubmenu && hasOpenSubmenu.open;

        if (!submenuIsOpen) {
          this._selectItem(index);
        }
      }
    }
  }

  private _onFocusOut(event: FocusEvent): void {
    if (!this.open) {
      return;
    }

    // Check if focus is moving to an element inside this component
    const relatedTarget = event.relatedTarget as Element | null;
    if (relatedTarget && this.contains(relatedTarget)) {
      return;
    }

    // Focus moved outside, close the dropdown
    this.open = false;
  }

  private _onDefaultSlotChange(): void {
    if (this._selectionManager) {
      this._selectionManager.value = this.value;
      this.requestUpdate();
    }
  }

  private get _dropdownRole(): 'menu' | 'listbox' {
    switch (this.selectionMode) {
      case 'single':
      case 'multi':
        return 'listbox';
      case 'none':
      default:
        return 'menu';
    }
  }

  private get _ariaHasPopup(): 'menu' | 'listbox' {
    return this.selectionMode === 'none' ? 'menu' : 'listbox';
  }

  private get _ariaMultiSelectable(): 'true' | undefined {
    return this.selectionMode === 'multi' ? 'true' : undefined;
  }

  private get _popoverPlacement(): PopoverPlacement {
    return this._isSubmenu ? 'right-start' : this.popoverPlacement;
  }

  private get _popoverAnchor(): Element | null {
    return this._isSubmenu ? this.parentElement : this._triggerButton;
  }

  private get _selectedText(): string {
    return this._selectionManager?.getSelectedText() || '';
  }

  private get _shouldShowSelectedText(): boolean {
    return this._selectionManager?.shouldShowSelectedText() || false;
  }

  // Using readonly for static template structure with dynamic content via property binding
  readonly #triggerTextSlot = html`<slot name="trigger-content">Choose...</slot>`;

  get #triggerText(): TemplateResult {
    if (this._shouldShowSelectedText) {
      return html`<slot name="selected-text">${this._selectedText}</slot>`;
    }
    return this.#triggerTextSlot;
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (slotName === 'header' || slotName === 'selected-text') {
      this.requestUpdate();
    }
  }

  // Static template parts that don't change based on state
  readonly #dropdownContentTemplate = html`
    <slot name="header"></slot>
    <slot @slotchange=${this._onDefaultSlotChange}></slot>
  `;

  get #triggerButton(): TemplateResult {
    const isButton = this.variant === 'button';
    const isIconButton = this.variant === 'icon-button' || this.variant === 'icon-button-squared';
    const isIconButtonSquared = this.variant === 'icon-button-squared';
    const densityClass = this.density !== 'large' ? `${isButton ? 'forge-button' : 'forge-icon-button'}--${this.density}` : '';

    return html`
      <button
        id="dropdown-trigger"
        class=${classMap({
          'forge-button': isButton,
          'forge-icon-button': isIconButton,
          'forge-icon-button--squared': isIconButtonSquared,
          [densityClass]: !!densityClass
        })}
        type="button"
        aria-label=${ifDefined(this.triggerLabel)}
        aria-expanded=${this.open}
        aria-haspopup=${this._ariaHasPopup}
        aria-controls="dropdown-content"
        ?disabled=${this.disabled}
        @click=${this._handleTriggerClick}>
        <slot name="start"></slot>
        ${this.#triggerText}
        <slot name="end"></slot>
      </button>
    `;
  }

  get #popoverTemplate(): TemplateResult {
    return html`
      <forge-ai-popover .anchor=${this._popoverAnchor} placement=${this._popoverPlacement} .flip=${true} @forge-ai-popover-toggle=${this._onPopoverToggle}>
        <div
          id="dropdown-content"
          role=${this._dropdownRole}
          aria-labelledby="dropdown-trigger"
          aria-multiselectable=${ifDefined(this._ariaMultiSelectable)}
          aria-orientation="vertical"
          @click=${this._onItemClick}
          tabindex="0"
          class="ai-dropdown-menu__dropdown"
          @slotchange=${this.#handleSlotChange}>
          ${this.#dropdownContentTemplate}
        </div>
      </forge-ai-popover>
    `;
  }

  public override render(): TemplateResult {
    return html` ${this._isSubmenu ? '' : this.#triggerButton} ${this.#popoverTemplate} `;
  }
}
