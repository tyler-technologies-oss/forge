import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { tylIconChevronRight } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { IconRegistry } from '../../icon/index.js';
import type { PopoverComponent } from '../../popover/popover.js';
import { IPopoverToggleEventData } from '../../popover/popover-constants.js';
import { BaseDropdownMenuItem } from '../base/base-dropdown-menu-item.js';
import { DROPDOWN_MENU_ITEM_TAG_NAME, DROPDOWN_MENU_SUBMENU_CONTENT_SELECTOR } from '../dropdown-menu-constants.js';
import { closeChildSubmenus, focusChildItem, getChildItems } from '../dropdown-menu-utils.js';

import '../../icon/icon.js';
import '../../popover/popover.js';

import styles from './dropdown-menu-item.scss';

const SUBMENU_SLOT = 'submenu';
const SUBMENU_HOVER_DELAY = 150;
const SUBMENU_ALIGNMENT_OFFSET = -4;

/**
 * @tag forge-dropdown-menu-item
 *
 * @summary Dropdown menu items are the selectable actions within a `<forge-dropdown-menu>`. Nest items inside of
 * another item to create a submenu.
 *
 * @description
 * Dropdown menu items are styled to match `<forge-option>` and are themed with the same `--forge-option-*`
 * custom properties.
 *
 * Items, `<forge-dropdown-menu-group>`, and `<forge-divider>` elements that are direct children of an item are rendered in
 * that item's submenu. This includes `<forge-dropdown-menu-item-checkbox>` and `<forge-dropdown-menu-item-radio>` elements.
 *
 * Set the `href` property to render the item as a link. The host element receives the `none` role and the `root` part
 * becomes an anchor element with the `menuitem` role. Use `target`, `rel`, and `download` to
 * configure the link. Items that have a submenu ignore `href`.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-icon
 * @dependency forge-popover
 * @dependency forge-state-layer
 *
 * @event {CustomEvent<IDropdownMenuItemSelectEventData>} forge-dropdown-menu-item-select - Dispatched when the user
 * selects an item that does not have a submenu. Cancel the event to keep the menu open.
 *
 * @slot - The default slot for the item's label.
 * @slot start - Content placed at the start of the item.
 * @slot secondary - Content placed below the item's label.
 * @slot tertiary - Content placed below the item's secondary content.
 * @slot end - Content placed at the end of the item.
 * @slot submenu - Child items that make up the item's submenu. Child items are assigned to this slot automatically.
 *
 * @state disabled - Applied when the item is disabled.
 * @state open - Applied when the item's submenu is open.
 *
 * @csspart root - The root element of the item. This is an anchor element when the item has an `href`.
 * @csspart label - The element containing the label and supporting text.
 * @csspart submenu-icon - The icon shown when the item has a submenu.
 * @csspart submenu - The popover element containing the submenu.
 * @csspart focus-indicator - The focus indicator of the item.
 * @csspart state-layer - The state layer of the item.
 */
export class DropdownMenuItemComponent extends BaseDropdownMenuItem {
  public static override styles = [BaseDropdownMenuItem.styles, unsafeCSS(styles)];

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DROPDOWN_MENU_ITEM_TAG_NAME;

  static {
    IconRegistry.define([tylIconChevronRight]);
  }

  /**
   * The URL that the item links to. When set, the item is rendered as a link.
   *
   * Has no effect on items that have a submenu.
   * @default ''
   * @attribute
   */
  @property()
  public href = '';

  /**
   * Where to display the linked URL, such as `_blank`. Only applies when the item is a link.
   * @default ''
   * @attribute
   */
  @property()
  public target = '';

  /**
   * The relationship of the linked URL to the current document, such as `noopener`. Only applies when the item is a link.
   * @default ''
   * @attribute
   */
  @property()
  public rel = '';

  /**
   * Causes the linked URL to be downloaded instead of navigated to. The value suggests a file name, and an empty
   * string uses the default file name. Only applies when the item is a link.
   * @default null
   * @attribute
   */
  @property()
  public download: string | null = null;

  /**
   * Whether the item's submenu is open. Has no effect on items without a submenu.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Whether the item has a submenu.
   */
  public get hasSubmenu(): boolean {
    return this._hasSubmenu;
  }

  @state()
  private _hasSubmenu = false;

  @query('forge-popover')
  private _submenu?: PopoverComponent;

  @query('a')
  private _link?: HTMLAnchorElement;

  protected readonly _defaultRole = 'menuitem';

  #hoverTimeout?: number;
  #childObserver = new MutationObserver(() => this.#syncSubmenu());

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('pointerenter', this.#handlePointerEnter);
    this.addEventListener('pointerleave', this.#handlePointerLeave);
    this.#childObserver.observe(this, { childList: true, subtree: true });
    this.#syncSubmenu();
    this.#syncLinkSemantics();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('pointerenter', this.#handlePointerEnter);
    this.removeEventListener('pointerleave', this.#handlePointerLeave);
    this.#childObserver.disconnect();
    window.clearTimeout(this.#hoverTimeout);
  }

  public override focus(options?: FocusOptions): void {
    if (this.#isLink && this._link) {
      this._link.focus(options);
      return;
    }
    super.focus(options);
  }

  public override click(): void {
    if (this.#isLink && !this.disabled && this._link) {
      this._link.click();
      return;
    }
    super.click();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('href') || changedProperties.has('disabled') || changedProperties.has('_hasSubmenu' as any)) {
      this.#syncLinkSemantics();
    }

    if (changedProperties.has('open') || changedProperties.has('_hasSubmenu' as any)) {
      setDefaultAria(this, this._internals, {
        ariaHasPopup: this._hasSubmenu ? 'menu' : null,
        ariaExpanded: this._hasSubmenu ? (this.open ? 'true' : 'false') : null
      });
      toggleState(this._internals, 'open', this._hasSubmenu && this.open);
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    const submenu = this._submenu;
    if (submenu) {
      submenu.anchorElement = this;
      if (this.open && !submenu.open) {
        submenu.placement = getComputedStyle(this).direction === 'rtl' ? 'left-start' : 'right-start';
      }
      submenu.open = this.open;
    }

    if (changedProperties.has('open') && !this.open) {
      closeChildSubmenus(this);
    }
  }

  protected override _getRootClasses(): ClassInfo {
    return { ...super._getRootClasses(), open: this._hasSubmenu && this.open };
  }

  protected override _renderRoot(content: TemplateResult): TemplateResult {
    if (!this.#isLink) {
      return super._renderRoot(content);
    }

    return html`
      <a
        class=${classMap(this._getRootClasses())}
        part="root"
        role="menuitem"
        tabindex="-1"
        href=${ifDefined(this.disabled ? undefined : this.href)}
        target=${ifDefined(this.target || undefined)}
        rel=${ifDefined(this.rel || undefined)}
        download=${ifDefined(this.download ?? undefined)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}>
        ${content}
      </a>
    `;
  }

  protected override _renderIndicator(): TemplateResult | typeof nothing {
    return this._hasSubmenu ? html`<forge-icon class="submenu-icon" part="submenu-icon" name="chevron_right"></forge-icon>` : nothing;
  }

  protected override _renderOverlay(): TemplateResult | typeof nothing {
    if (!this._hasSubmenu) {
      return nothing;
    }

    return html`
      <forge-popover
        class="submenu"
        part="submenu"
        preset="list"
        trigger-type="manual"
        anchor-accessibility="none"
        .offset=${{ crossAxis: SUBMENU_ALIGNMENT_OFFSET }}
        @forge-popover-toggle=${this.#handleSubmenuToggle}>
        <div class="menu" role="menu" aria-labelledby="label"><slot name=${SUBMENU_SLOT}></slot></div>
      </forge-popover>
    `;
  }

  protected override _activate(evt: MouseEvent): void {
    if (!this._hasSubmenu) {
      super._activate(evt);
      return;
    }

    this.open = true;
    if (evt.detail === 0) {
      focusChildItem(this);
    }
  }

  get #isLink(): boolean {
    return !!this.href && !this._hasSubmenu;
  }

  /** Links move the menuitem semantics and focus to the anchor, so the host is only a container. */
  #syncLinkSemantics(): void {
    const isLink = this.#isLink;
    setDefaultAria(this, this._internals, {
      role: isLink ? 'none' : this._defaultRole,
      ariaDisabled: !isLink && this.disabled ? 'true' : null
    });

    if (isLink) {
      this.removeAttribute('tabindex');
    } else {
      this.tabIndex = -1;
    }
  }

  #syncSubmenu(): void {
    const content = Array.from(this.children).filter(child => child.matches(DROPDOWN_MENU_SUBMENU_CONTENT_SELECTOR));
    content.forEach(child => {
      if (!child.slot) {
        child.slot = SUBMENU_SLOT;
      }
    });
    this._hasSubmenu = getChildItems(this).length > 0;
  }

  #handlePointerEnter = (evt: PointerEvent): void => {
    if (evt.pointerType === 'touch') {
      return;
    }

    if (this._hasSubmenu && !this.disabled && !this.open) {
      this.#hoverTimeout = window.setTimeout(() => (this.open = true), SUBMENU_HOVER_DELAY);
    }
  };

  #handlePointerLeave = (): void => {
    window.clearTimeout(this.#hoverTimeout);
  };

  #handleSubmenuToggle = (evt: CustomEvent<IPopoverToggleEventData>): void => {
    this.open = evt.detail.newState === 'open';
  };
}

tryDefine(DROPDOWN_MENU_ITEM_TAG_NAME, DropdownMenuItemComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-dropdown-menu-item': DropdownMenuItemComponent;
  }
}
