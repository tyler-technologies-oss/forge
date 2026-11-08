import { LitElement, html, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { type DropdownMenuSelectionMode } from './selection-manager.js';
import { type ForgeAiDropdownMenuComponent } from './ai-dropdown-menu.js';

import styles from './ai-dropdown-menu-item.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-dropdown-menu-item': ForgeAiDropdownMenuItemComponent;
  }
}

/**
 * @summary An item component for use within ai-dropdown-menu with submenu support.
 *
 * @description
 * This component represents an individual item within a dropdown menu and supports
 * advanced features including submenus, configurable selection states, and
 * accessibility-compliant interactions.
 *
 * ## Features
 * - **Selection States**: Supports none, single, and multi-selection modes
 * - **Submenu Support**: Can contain nested dropdown menus with configurable triggers
 * - **Accessibility**: Complete ARIA implementation with proper roles and states
 * - **Configurable Behavior**: Customizable submenu trigger timing and behavior
 * - **Rich Content**: Supports text, descriptions, icons, and custom content
 *
 * ## Submenu Configuration
 * The component supports three submenu trigger modes:
 * - **'hover'**: Opens on mouse hover (default)
 * - **'click'**: Opens on click/tap
 * - **'both'**: Opens on both hover and click
 *
 * @cssproperty --forge-ai-dropdown-menu-item-selection-icon-size - Size of selection and submenu icons.
 *
 * @slot - The default slot for item text content.
 * @slot description - The description slot for additional item details.
 * @slot start - The start icon slot.
 * @slot end - The end icon slot.
 * @slot submenu - The slot for nested dropdown menu components.
 *
 * @example
 * ```html
 * <!-- Basic menu item -->
 * <forge-ai-dropdown-menu-item value="basic">Basic Item</forge-ai-dropdown-menu-item>
 *
 * <!-- Menu item with description -->
 * <forge-ai-dropdown-menu-item value="detailed">
 *   Detailed Item
 *   <span slot="description">Additional information</span>
 * </forge-ai-dropdown-menu-item>
 *
 * <!-- Menu item with submenu -->
 * <forge-ai-dropdown-menu-item
 *   value="parent"
 *   submenu-trigger="hover"
 *   submenu-open-delay="200">
 *   Parent Item
 *   <forge-ai-dropdown-menu slot="submenu">
 *     <forge-ai-dropdown-menu-item value="child1">Child 1</forge-ai-dropdown-menu-item>
 *     <forge-ai-dropdown-menu-item value="child2">Child 2</forge-ai-dropdown-menu-item>
 *   </forge-ai-dropdown-menu>
 * </forge-ai-dropdown-menu-item>
 * ```
 */
@customElement('forge-ai-dropdown-menu-item')
export class ForgeAiDropdownMenuItemComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * The value associated with this menu item.
   */
  @property()
  public value = '';

  /**
   * Whether this menu item is selected.
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Whether this menu item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The selection mode for this menu item.
   * This is typically set by the parent dropdown menu component.
   */
  @property({ attribute: 'selection-mode' })
  public selectionMode: DropdownMenuSelectionMode = 'none';

  /**
   * The trigger behavior for submenu opening.
   * - 'hover': Opens on mouse hover (default)
   * - 'click': Opens on click
   * - 'both': Opens on both hover and click
   */
  @property({ attribute: 'submenu-trigger' })
  public submenuTrigger: 'hover' | 'click' | 'both' = 'hover';

  /**
   * The delay in milliseconds before opening a submenu on hover.
   */
  @property({ attribute: 'submenu-open-delay', type: Number })
  public submenuOpenDelay = 150;

  /**
   * The delay in milliseconds before closing a submenu when mouse leaves.
   */
  @property({ attribute: 'submenu-close-delay', type: Number })
  public submenuCloseDelay = 300;

  @queryAssignedNodes({ slot: 'description', flatten: true })
  private _descriptionSlottedNodes!: Node[];

  @queryAssignedNodes({ flatten: true })
  private _defaultSlottedNodes!: Node[];

  @queryAssignedElements({ selector: 'forge-ai-dropdown-menu' })
  private _childSubmenu!: Element[];

  @state()
  private _submenuOpen = false;

  @state()
  private _hoverTimeout: number | null = null;

  @state()
  private _leaveTimeout: number | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('tabindex', '-1');
    this._updateRole();
    this._updateSubmenuAttributes();
    this.addEventListener('mouseenter', this._onMouseEnter);
    this.addEventListener('mouseleave', this._onMouseLeave);
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onItemClick);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._onMouseEnter);
    this.removeEventListener('mouseleave', this._onMouseLeave);
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onItemClick);
    this._clearAllTimeouts();
  }

  public override updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('selected')) {
      // Only set aria-selected for single selection mode (menuitemradio)
      if (this.selectionMode === 'single') {
        this.setAttribute('aria-selected', this.selected.toString());
      } else {
        this.removeAttribute('aria-selected');
      }

      if (this.selectionMode === 'multi') {
        this.setAttribute('aria-checked', this.selected.toString());
      }
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled.toString());
    }

    if (changedProperties.has('selectionMode')) {
      this._updateRole();
      this._updateSubmenuAttributes();
      if (this.selectionMode === 'single') {
        this.setAttribute('aria-selected', this.selected.toString());
        this.removeAttribute('aria-checked');
      } else if (this.selectionMode === 'multi') {
        this.setAttribute('aria-checked', this.selected.toString());
        this.removeAttribute('aria-selected');
      } else {
        // selectionMode === 'none' - remove both attributes
        this.removeAttribute('aria-selected');
        this.removeAttribute('aria-checked');
      }
    }

    if (changedProperties.has('_submenuOpen')) {
      this._updateSubmenuState();
    }
  }

  private _updateSubmenuAttributes(): void {
    if (this._hasSubmenu) {
      this.setAttribute('aria-haspopup', 'menu');
      this.setAttribute('aria-expanded', this._submenuOpen.toString());
    } else {
      this.removeAttribute('aria-haspopup');
      this.removeAttribute('aria-expanded');
    }
  }

  private _updateSubmenuState(): void {
    if (this._hasSubmenu && this._childSubmenu.length > 0) {
      const submenu = this._childSubmenu[0] as ForgeAiDropdownMenuComponent;
      submenu.open = this._submenuOpen;
    }
    // Update aria-expanded when submenu state changes
    if (this._hasSubmenu) {
      this.setAttribute('aria-expanded', this._submenuOpen.toString());
    }
  }

  private _onMouseEnter = (): void => {
    if (this._hasSubmenu && !this.disabled && (this.submenuTrigger === 'hover' || this.submenuTrigger === 'both')) {
      this._clearAllTimeouts();
      this._hoverTimeout = window.setTimeout(() => {
        this._submenuOpen = true;
      }, this.submenuOpenDelay);
    }
  };

  private _onMouseLeave = (): void => {
    if (this._hasSubmenu && (this.submenuTrigger === 'hover' || this.submenuTrigger === 'both')) {
      this._clearAllTimeouts();
      this._leaveTimeout = window.setTimeout(() => {
        this._submenuOpen = false;
      }, this.submenuCloseDelay);
    }
  };

  private _onItemClick = (event: Event): void => {
    if (this.disabled) {
      return;
    }

    // Handle submenu click trigger
    if (this._hasSubmenu && (this.submenuTrigger === 'click' || this.submenuTrigger === 'both')) {
      // Don't let this click bubble up to parent dropdown selection
      event.stopPropagation();
      this._clearAllTimeouts();
      this._submenuOpen = !this._submenuOpen;

      if (this._submenuOpen) {
        this._focusFirstSubmenuItem();
      }
    }
    // For non-submenu items, let the click bubble up normally to be handled by parent dropdown
  };

  private _onKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
        if (this._hasSubmenu) {
          event.preventDefault();
          event.stopPropagation();
          this._clearAllTimeouts(); // Prevent any pending close actions
          this._submenuOpen = true;
          // Focus first item in submenu
          this._focusFirstSubmenuItem();
        }
        break;

      case 'ArrowLeft':
        if (this._submenuOpen) {
          event.preventDefault();
          event.stopPropagation();
          this._clearAllTimeouts(); // Clear any pending timeouts
          this._submenuOpen = false;
          this.focus(); // Return focus to this item
        }
        break;

      case 'Escape':
        if (this._submenuOpen) {
          event.preventDefault();
          event.stopPropagation();
          this._clearAllTimeouts(); // Clear any pending timeouts
          this._submenuOpen = false;
          this.focus();
        }
        break;
    }
  };

  private _clearAllTimeouts(): void {
    if (this._hoverTimeout !== null) {
      window.clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
    if (this._leaveTimeout !== null) {
      window.clearTimeout(this._leaveTimeout);
      this._leaveTimeout = null;
    }
  }

  private _focusFirstSubmenuItem(): void {
    if (this._childSubmenu.length > 0) {
      const submenu = this._childSubmenu[0] as ForgeAiDropdownMenuComponent;
      // Wait for submenu to open before focusing
      requestAnimationFrame(() => {
        // Let the submenu handle its own focus management
        submenu.focusFirstItem?.();
      });
    }
  }

  private _updateRole(): void {
    switch (this.selectionMode) {
      case 'single':
        this.setAttribute('role', 'menuitemradio');
        break;
      case 'multi':
        this.setAttribute('role', 'menuitemcheckbox');
        break;
      case 'none':
      default:
        this.setAttribute('role', 'menuitem');
        break;
    }
  }

  private get _hasDescriptionContent(): boolean {
    return this._descriptionSlottedNodes.length > 0;
  }

  private get _shouldShowSelectionIcon(): boolean {
    return this.selectionMode !== 'none' && this.selected;
  }

  private get _shouldReserveSelectionSpace(): boolean {
    return this.selectionMode !== 'none';
  }

  private get _hasSubmenu(): boolean {
    return this._childSubmenu.length > 0;
  }

  /**
   * Gets the text content from the default slot (label text only).
   */
  public get labelText(): string {
    return this._defaultSlottedNodes
      .map(node => node.textContent?.trim() || '')
      .join(' ')
      .trim();
  }

  private get _selectionIcon(): TemplateResult {
    const iconPath =
      this.selectionMode === 'multi'
        ? 'M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z' // Check icon
        : 'M12 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4'; // Circle medium icon

    return html`
      <svg class="ai-dropdown-menu-item__selection-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="${iconPath}" />
      </svg>
    `;
  }

  private readonly _submenuArrowIcon = html`
    <svg class="ai-dropdown-menu-item__submenu-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  `;

  readonly #startIconSlot = html`<div class="ai-dropdown-menu-item__icon"><slot name="start"></slot></div>`;
  readonly #endIconSlot = html`<div class="ai-dropdown-menu-item__icon"><slot name="end"></slot></div>`;

  get #selectionIconSlot(): TemplateResult {
    return html`<div class="ai-dropdown-menu-item__selection-icon">${this._shouldShowSelectionIcon ? this._selectionIcon : ''}</div>`;
  }

  #handleSlotChange(_evt: Event): void {
    this.requestUpdate();
  }

  public override render(): TemplateResult {
    const classes = {
      'ai-dropdown-menu-item': true,
      'ai-dropdown-menu-item--with-selection': this._shouldReserveSelectionSpace,
      'ai-dropdown-menu-item--with-description': this._hasDescriptionContent,
      'ai-dropdown-menu-item--selected': this.selected,
      'ai-dropdown-menu-item--disabled': this.disabled,
      'ai-dropdown-menu-item--with-submenu': this._hasSubmenu
    };

    return html`
      <div class=${classMap(classes)}>
        ${when(this._shouldReserveSelectionSpace, () => this.#selectionIconSlot)} ${this.#startIconSlot}
        <div class="ai-dropdown-menu-item__content" @slotchange=${this.#handleSlotChange}>
          <span class="ai-dropdown-menu-item__text"><slot></slot></span>
          ${when(
            this._hasDescriptionContent,
            () => html`<span class="ai-dropdown-menu-item__description"><slot name="description"></slot></span>`,
            () => html`<slot name="description"></slot>`
          )}
        </div>
        ${this.#endIconSlot} ${when(this._hasSubmenu, () => html`<div class="ai-dropdown-menu-item__submenu-arrow-container">${this._submenuArrowIcon}</div>`)}
      </div>
      <div class="focus-indicator"></div>
      <slot name="submenu"></slot>
    `;
  }
}
