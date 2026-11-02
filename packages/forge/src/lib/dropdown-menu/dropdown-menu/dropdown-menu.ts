import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { provide } from '@lit/context';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { KeyActionController } from '../../core/utils/key-action.js';
import type { OverlayPlacement } from '../../overlay/overlay-constants.js';
import { IPopoverToggleEventData } from '../../popover/popover-constants.js';
import type { PopoverComponent } from '../../popover/popover.js';
import type { BaseDropdownMenuItem } from '../base/base-dropdown-menu-item.js';
import { DROPDOWN_MENU_DENSE, DROPDOWN_MENU_TAG_NAME, DropdownMenuItemFocusTarget, IDropdownMenuItemSelectEventData } from '../dropdown-menu-constants.js';
import {
  closeChildSubmenus,
  focusChildItem,
  getEnabledChildItems,
  getEnabledSiblingItems,
  getItemContainer,
  getParentItem,
  isDropdownMenuItem,
  isDropdownMenuSubmenuItem,
  searchItems
} from '../dropdown-menu-utils.js';

import '../../popover/popover.js';
import '../dropdown-menu-group/dropdown-menu-group.js';
import '../dropdown-menu-item/dropdown-menu-item.js';
import '../dropdown-menu-item-checkbox/dropdown-menu-item-checkbox.js';
import '../dropdown-menu-item-radio/dropdown-menu-item-radio.js';

import styles from './dropdown-menu.scss';

/**
 * @tag forge-dropdown-menu
 *
 * @summary Dropdown menus are popovers that present a list of actions when the user interacts with an external trigger element.
 *
 * @description
 * Unlike most popovers, a dropdown menu does not wrap its trigger. Connect it to a trigger element with either
 * the `trigger` attribute (the `id` of the element) or the `triggerElement` property (a reference to the element).
 *
 * Menus are populated with `<forge-dropdown-menu-item>` elements, which may be nested to create submenus. Use
 * `<forge-dropdown-menu-item-checkbox>` and `<forge-dropdown-menu-item-radio>` elements for items that can be checked, and
 * `<forge-dropdown-menu-group>` to label related items.
 *
 * @dependency forge-dropdown-menu-group
 * @dependency forge-dropdown-menu-item
 * @dependency forge-dropdown-menu-item-checkbox
 * @dependency forge-dropdown-menu-item-radio
 * @dependency forge-popover
 *
 * @event {ToggleEvent} beforetoggle - Dispatched before the menu is opened or closed by the user. Cancel the event to
 * prevent the menu from toggling.
 * @event {ToggleEvent} toggle - Dispatched after the menu is opened or closed by the user.
 * @event {CustomEvent<IDropdownMenuItemSelectEventData>} forge-dropdown-menu-item-select - Bubbles from a menu item when it
 * is selected. Cancel the event to keep the menu open.
 *
 * @cssproperty --forge-dropdown-menu-min-width - The minimum width of the menu.
 * @cssproperty --forge-dropdown-menu-max-width - The maximum width of the menu.
 * @cssproperty --forge-dropdown-menu-divider-margin - The block margin around slotted dividers.
 *
 * @csspart popover - The popover element.
 * @csspart menu - The element containing the menu items.
 *
 * @slot - The default slot for dropdown menu items, `<forge-dropdown-menu-group>`, and `<forge-divider>` elements.
 */
export class DropdownMenuComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DROPDOWN_MENU_TAG_NAME;

  /**
   * The id of the element that opens the menu. Looked up within the same root as the menu.
   *
   * If `triggerElement` is set it takes precedence.
   * @default null
   * @attribute
   */
  @property()
  public trigger: string | null = null;

  /**
   * The element that opens the menu.
   *
   * Takes precedence over `trigger`.
   * @default null
   */
  @property({ attribute: false })
  public triggerElement: HTMLElement | null = null;

  /**
   * Whether the menu is open.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * The placement of the menu relative to its trigger.
   * @default 'bottom-start'
   * @attribute
   */
  @property()
  public placement: OverlayPlacement = 'bottom-start';

  /**
   * Whether the menu's items use a dense layout.
   * @default false
   * @attribute
   */
  @provide({ context: DROPDOWN_MENU_DENSE })
  @property({ type: Boolean })
  public dense = false;

  @query('forge-popover')
  private _popover!: PopoverComponent;

  @query('.menu')
  private _menu!: HTMLElement;

  #activeTrigger: HTMLElement | null = null;
  #addedHasPopup = false;
  #pendingFocus: DropdownMenuItemFocusTarget = 'first';

  private readonly _keyActionController = new KeyActionController(this, {
    actions: [
      { key: ['ArrowDown', 'ArrowUp'], handler: evt => this.#handleArrowUpOrDown(evt), allowRepeat: true },
      { key: 'ArrowRight', handler: evt => this.#handleArrowRight(evt), allowRepeat: true },
      { key: 'ArrowLeft', handler: evt => this.#handleArrowLeft(evt), allowRepeat: true },
      { key: 'Home', handler: evt => this.#handleHomeOrEnd(evt, 'first') },
      { key: 'End', handler: evt => this.#handleHomeOrEnd(evt, 'last') },
      { key: ['Enter', ' '], handler: evt => this.#handleEnterOrSpace(evt) },
      { key: 'Tab', handler: () => this.#handleTab(), allowDefault: true }
    ],
    searchHandler: (search, evt) => this.#handleSearch(search, evt)
  });

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasUpdated) {
      this.#applyTrigger();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#releaseTrigger();
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('trigger') || changedProperties.has('triggerElement')) {
      this.#applyTrigger();
    }

    if (changedProperties.has('open')) {
      this._popover.open = this.open;

      if (this.open) {
        this.#focusOnOpen();
      } else if (changedProperties.get('open')) {
        this.#closeSubmenus();
        this.#restoreFocus();
      }
    }
  }

  public render(): TemplateResult {
    return html`
      <forge-popover
        class="popover"
        part="popover"
        preset="list"
        .placement=${this.placement}
        @forge-popover-beforetoggle=${this.#handleBeforeToggle}
        @forge-popover-toggle=${this.#handleToggle}>
        <div class="menu" part="menu" role="menu"><slot></slot></div>
      </forge-popover>
    `;
  }

  #locateTrigger(): HTMLElement | null {
    if (this.triggerElement) {
      return this.triggerElement;
    }
    if (!this.trigger) {
      return null;
    }

    const root = this.getRootNode() as Document | ShadowRoot;
    return root.getElementById?.(this.trigger) ?? null;
  }

  #applyTrigger(): void {
    const trigger = this.#locateTrigger();

    if (!trigger && this.trigger && document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.#applyTrigger(), { once: true });
    }

    if (trigger === this.#activeTrigger) {
      return;
    }

    this.#releaseTrigger();
    this.#activeTrigger = trigger;

    if (trigger) {
      trigger.addEventListener('keydown', this.#handleTriggerKeydown);
      if (!trigger.hasAttribute('aria-haspopup')) {
        trigger.setAttribute('aria-haspopup', 'menu');
        this.#addedHasPopup = true;
      }
    }

    this._popover.anchorElement = trigger;
    this._menu.ariaLabelledByElements = trigger ? [trigger] : null;
  }

  #releaseTrigger(): void {
    const trigger = this.#activeTrigger;
    if (!trigger) {
      return;
    }

    trigger.removeEventListener('keydown', this.#handleTriggerKeydown);
    if (this.#addedHasPopup) {
      trigger.removeAttribute('aria-haspopup');
      this.#addedHasPopup = false;
    }
    this.#activeTrigger = null;
  }

  #focusOnOpen(): void {
    const target = this.#pendingFocus;
    this.#pendingFocus = 'first';
    focusChildItem(this, target);
  }

  #closeSubmenus(): void {
    closeChildSubmenus(this);
  }

  #restoreFocus(): void {
    if (this.matches(':focus-within')) {
      this.#activeTrigger?.focus();
    }
  }

  #getFocusedItem(evt: KeyboardEvent): BaseDropdownMenuItem | undefined {
    return evt.composedPath().find(isDropdownMenuItem);
  }

  #isRtl(): boolean {
    return getComputedStyle(this).direction === 'rtl';
  }

  #handleBeforeToggle = (evt: CustomEvent<IPopoverToggleEventData>): void => {
    const { newState, oldState } = evt.detail;
    const forwarded = new ToggleEvent('beforetoggle', { newState, oldState, cancelable: true });
    if (!this.dispatchEvent(forwarded)) {
      evt.preventDefault();
      return;
    }

    if (newState === 'closed' && this.matches(':focus-within')) {
      this.#activeTrigger?.focus();
    }
  };

  #handleToggle = (evt: CustomEvent<IPopoverToggleEventData>): void => {
    const { newState, oldState } = evt.detail;
    this.open = newState === 'open';
    this.dispatchEvent(new ToggleEvent('toggle', { newState, oldState }));
  };

  #handleTriggerKeydown = (evt: KeyboardEvent): void => {
    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') {
      return;
    }

    evt.preventDefault();
    const target = evt.key === 'ArrowDown' ? 'first' : 'last';
    if (this.open) {
      focusChildItem(this, target);
    } else {
      this.#pendingFocus = target;
      this.open = true;
    }
  };

  #handleArrowUpOrDown(evt: KeyboardEvent): void {
    const item = this.#getFocusedItem(evt);
    if (!item) {
      return;
    }

    const items = getEnabledSiblingItems(item);
    const index = items.indexOf(item);
    const offset = evt.key === 'ArrowDown' ? 1 : -1;
    items[(index + offset + items.length) % items.length]?.focus();
  }

  #handleArrowRight(evt: KeyboardEvent): void {
    this.#handleHorizontalArrow(evt, !this.#isRtl());
  }

  #handleArrowLeft(evt: KeyboardEvent): void {
    this.#handleHorizontalArrow(evt, this.#isRtl());
  }

  #handleHorizontalArrow(evt: KeyboardEvent, opensSubmenu: boolean): void {
    const item = this.#getFocusedItem(evt);
    if (!item) {
      return;
    }

    if (opensSubmenu) {
      if (isDropdownMenuSubmenuItem(item) && item.hasSubmenu && !item.disabled) {
        item.open = true;
        focusChildItem(item);
      }
      return;
    }

    const parent = getParentItem(item);
    if (parent) {
      parent.open = false;
      parent.focus();
    }
  }

  #handleHomeOrEnd(evt: KeyboardEvent, target: DropdownMenuItemFocusTarget): void {
    const item = this.#getFocusedItem(evt);
    if (!item) {
      return;
    }

    const items = getEnabledSiblingItems(item);
    (target === 'first' ? items[0] : items[items.length - 1])?.focus();
  }

  #handleEnterOrSpace(evt: KeyboardEvent): void {
    this.#getFocusedItem(evt)?.click();
  }

  #handleTab(): void {
    this.open = false;
    this.#activeTrigger?.focus();
  }

  #handleSearch(search: string, evt: KeyboardEvent): void {
    const item = this.#getFocusedItem(evt);
    const container = item && getItemContainer(item);
    if (!item || !container) {
      return;
    }

    searchItems(getEnabledChildItems(container), search, item)?.focus();
  }
}

tryDefine(DROPDOWN_MENU_TAG_NAME, DropdownMenuComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-dropdown-menu': DropdownMenuComponent;
  }

  interface HTMLElementEventMap {
    'forge-dropdown-menu-item-select': CustomEvent<IDropdownMenuItemSelectEventData>;
  }
}
