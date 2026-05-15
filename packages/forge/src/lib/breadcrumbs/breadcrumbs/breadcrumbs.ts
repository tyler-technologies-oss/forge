import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver } from '@tylertech/forge-core';
import { tylIconDotsHorizontal, tylIconHome, tylIconSlashForward } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { IconRegistry } from '../../icon/index.js';
import { IconButtonComponent } from '../../icon-button/index.js';
import { IconComponent } from '../../icon/index.js';
import { MenuComponent } from '../../menu/index.js';
import { TooltipComponent } from '../../tooltip/index.js';

import '../../icon/icon.js';
import '../../icon-button/icon-button.js';
import '../../menu/menu.js';
import '../../tooltip/tooltip.js';
import '../breadcrumbs-item/breadcrumbs-item.js';

import { BreadcrumbsItemComponent } from '../breadcrumbs-item/breadcrumbs-item.js';
import type { IMenuOption } from '../../menu/menu-constants.js';

import styles from './breadcrumbs.scss';

export const BREADCRUMBS_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-breadcrumbs';

export interface ICrumbConfiguration {
  label: string;
  path?: string;
  icon?: string;
  secondary?: string;
  siblingRoutes?: ICrumbConfiguration[];
}

/**
 * @tag forge-breadcrumbs
 *
 * @summary A responsive breadcrumb navigation component that automatically collapses when space is limited.
 *
 * @description
 * The breadcrumb component displays a navigation path showing the user's location within a
 * hierarchical structure. It supports icons, secondary text, sibling route navigation, and
 * automatically collapses into a menu when the container width is insufficient.
 *
 * @csspart root - The root list element.
 *
 * @cssproperty --forge-breadcrumbs-gap - The gap between breadcrumb items.
 * @cssproperty --forge-breadcrumbs-separator-color - The color theme for separator icons.
 *
 * @dependency forge-tooltip
 *
 * @slot - Slot for declaratively provided forge-breadcrumbs-item elements.
 * @slot separator-icon - A custom separator icon to render between breadcrumb items.
 *
 * @property {string} [homeTooltip='Home'] - The tooltip text for the home button.
 * @attribute {string} [home-tooltip='Home'] - The tooltip text for the home button.
 *
 * @property {string} [expandLabel='Show all breadcrumbs'] - The aria-label for the collapsed breadcrumbs trigger button.
 * @attribute {string} [expand-label='Show all breadcrumbs'] - The aria-label for the collapsed breadcrumbs trigger button.
 *
 * @property {string} [siblingRoutesLabel='Sibling routes'] - The aria-label for the sibling routes trigger button within each crumb.
 * @attribute {string} [sibling-routes-label='Sibling routes'] - The aria-label for the sibling routes trigger button within each crumb.
 *
 * @fires {BreadcrumbsSelectEvent} forge-breadcrumbs-crumb-select - Dispatched when a crumb is clicked.
 * @fires {CustomEvent<void>} forge-breadcrumbs-home-click - Dispatched when the home button is clicked.
 */
@customElement(BREADCRUMBS_TAG_NAME)
export class BreadcrumbsComponent extends BaseLitElement {
  static {
    IconRegistry.define([tylIconSlashForward, tylIconDotsHorizontal, tylIconHome]);
  }

  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BREADCRUMBS_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [BreadcrumbsItemComponent, IconButtonComponent, IconComponent, MenuComponent, TooltipComponent];

  /**
   * The breadcrumb items to render.
   * @default []
   */
  @property({ attribute: false })
  public crumbs: ICrumbConfiguration[] = [];

  /**
   * Whether to show the home button at the start.
   * @attribute show-home
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-home' })
  public showHome = false;

  /**
   * The icon name for the separator between crumbs.
   * @attribute separator-icon-name
   * @default 'slash_forward'
   */
  @property({ attribute: 'separator-icon-name' })
  public separatorIconName = 'slash_forward';

  /**
   * The tooltip text for the home button.
   * @attribute home-tooltip
   * @default 'Home'
   */
  @property({ attribute: 'home-tooltip' })
  public homeTooltip = 'Home';

  /**
   * The aria-label for the collapsed breadcrumbs trigger button.
   * @attribute expand-label
   * @default 'Show all breadcrumbs'
   */
  @property({ attribute: 'expand-label' })
  public expandLabel = 'Show all breadcrumbs';

  /**
   * The aria-label for the sibling routes trigger button within each crumb.
   * @attribute sibling-routes-label
   * @default 'Sibling routes'
   */
  @property({ attribute: 'sibling-routes-label' })
  public siblingRoutesLabel = 'Sibling routes';

  #selectedIndex = -1;

  public get index(): number {
    return this.#selectedIndex;
  }

  @state()
  private _collapsed = false;

  @state()
  private _expandedContentWidth = 0;

  @query('.forge-breadcrumbs', true)
  private _listEl!: HTMLElement;

  #internals: ElementInternals;
  #containerWidth = Infinity;
  #slottedItems: BreadcrumbsItemComponent[] = [];
  #separatorIconSource?: Element;
  #separatorIconObserver?: MutationObserver;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override firstUpdated(): void {
    setDefaultAria(this, this.#internals, { role: 'list', ariaLabel: 'Breadcrumbs' });
    this.#setupResizeObserver();
  }

  public override async updated(changedProperties: PropertyValues<this>): Promise<void> {
    if (changedProperties.has('crumbs') || changedProperties.has('showHome') || changedProperties.has('separatorIconName')) {
      this.#slottedItems.forEach(item => {
        item.hidden = false;
      });
      if (changedProperties.has('crumbs') && this.crumbs.length > 0) {
        this.#slottedItems = [];
      }
      this._collapsed = false;
      await this.updateComplete;
      if (this._listEl) {
        this._expandedContentWidth = this._listEl.scrollWidth;
        this.#checkCollapse();
      }
    }
    if ((changedProperties.has('separatorIconName') || changedProperties.has('siblingRoutesLabel')) && this.#slottedItems.length > 0) {
      this.#configureSlottedItems();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    ForgeResizeObserver.unobserve(this);
    this.#separatorIconObserver?.disconnect();
    this.#slottedItems.forEach(item => {
      item.hidden = false;
    });
  }

  public render(): TemplateResult {
    const hasConfig = this.crumbs.length > 0;
    return html`
      <div part="root" class="forge-breadcrumbs" @forge-breadcrumbs-crumb-select=${this.#handleCrumbSelect}>
        ${this.#renderHomeButton()}
        ${hasConfig
          ? this._collapsed
            ? this.#renderCollapsed()
            : this.#renderExpanded()
          : html`${this._collapsed && this.#slottedItems.length ? this.#renderCollapsedSlotHeader() : nothing}<slot
                @slotchange=${this.#handleSlotChange}></slot>`}
      </div>
      <div class="icons">
        <slot name="separator-icon" @slotchange=${this.#detectSlottedSeparatorIcon}></slot>
      </div>
    `;
  }

  #renderHomeButton(): TemplateResult | typeof nothing {
    if (!this.showHome) {
      return nothing;
    }
    return html`
      <div role="listitem" class="crumb-item">
        <forge-icon-button class="home-button" aria-label=${this.homeTooltip} @click=${this.#handleHomeClick}>
          <forge-icon name="home"></forge-icon>
        </forge-icon-button>
        <forge-tooltip>${this.homeTooltip}</forge-tooltip>
        ${this.#renderSeparator()}
      </div>
    `;
  }

  #renderSeparator(): TemplateResult | HTMLElement {
    if (this.#separatorIconSource) {
      return this.#cloneSeparatorIcon();
    }
    return html`<forge-icon class="separator" .name=${this.separatorIconName}></forge-icon>`;
  }

  #renderExpanded(): TemplateResult[] {
    return this.crumbs.map((crumb, index) => {
      const isLast = index === this.crumbs.length - 1;
      return html`
        <forge-breadcrumbs-item
          .crumb=${crumb}
          .index=${index}
          ?active=${isLast}
          .separator=${!isLast && !this.#separatorIconSource ? this.separatorIconName : ''}
          .separatorElement=${!isLast && this.#separatorIconSource ? this.#cloneSeparatorIcon() : undefined}
          .siblingRoutesLabel=${this.siblingRoutesLabel}>
        </forge-breadcrumbs-item>
      `;
    });
  }

  #renderCollapsed(): TemplateResult {
    const collapsedCrumbs = this.crumbs.slice(0, -1);
    const lastCrumb = this.crumbs.at(-1);

    const menuOptions: IMenuOption[] = collapsedCrumbs.map((c, i) => ({
      label: c.label,
      value: i,
      secondaryLabel: c.secondary,
      leadingIcon: c.icon,
      leadingIconType: 'component'
    }));

    return html`
      <div role="listitem" class="crumb-item">
        <forge-menu .options=${menuOptions} @forge-menu-select=${this.#handleCollapsedMenuSelect}>
          <forge-icon-button class="collapsed-trigger" aria-label=${this.expandLabel}>
            <forge-icon name="dots_horizontal"></forge-icon>
          </forge-icon-button>
        </forge-menu>
        ${this.#renderSeparator()}
      </div>
      ${lastCrumb
        ? html`
            <forge-breadcrumbs-item .crumb=${lastCrumb} .index=${this.crumbs.length - 1} active .siblingRoutesLabel=${this.siblingRoutesLabel}>
            </forge-breadcrumbs-item>
          `
        : nothing}
    `;
  }

  #setupResizeObserver(): void {
    if (!this._listEl) {
      return;
    }

    ForgeResizeObserver.observe(this, (entry: ResizeObserverEntry) => {
      this.#containerWidth = entry.contentRect.width;
      this.#checkCollapse();
    });
  }

  #checkCollapse(): void {
    if (this._expandedContentWidth > 0 && this._expandedContentWidth > this.#containerWidth) {
      if (!this._collapsed) {
        this._collapsed = true;
        if (this.#slottedItems.length > 0) {
          this.#updateSlottedItemVisibility();
        }
      }
    } else if (this._collapsed) {
      this._collapsed = false;
      if (this.#slottedItems.length > 0) {
        this.#updateSlottedItemVisibility();
      }
    }
  }

  async #handleSlotChange(evt: Event): Promise<void> {
    const slot = evt.target as HTMLSlotElement;
    const items = slot.assignedElements({ flatten: true }).filter(el => el instanceof BreadcrumbsItemComponent) as BreadcrumbsItemComponent[];
    this.#slottedItems.forEach(item => {
      item.hidden = false;
    });
    this.#slottedItems = items;
    if (items.length > 0) {
      this.#configureSlottedItems();
    }
    this._collapsed = false;
    await this.updateComplete;
    if (this._listEl) {
      this._expandedContentWidth = this._listEl.scrollWidth;
      this.#checkCollapse();
    }
  }

  #configureSlottedItems(): void {
    const items = this.#slottedItems;
    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      item.index = index;
      item.active = isLast;
      item.separator = !isLast && !this.#separatorIconSource ? this.separatorIconName : '';
      item.separatorElement = !isLast && this.#separatorIconSource ? this.#cloneSeparatorIcon() : undefined;
      item.siblingRoutesLabel = this.siblingRoutesLabel;
    });
  }

  #updateSlottedItemVisibility(): void {
    const items = this.#slottedItems;
    if (this._collapsed) {
      items.forEach((item, index) => {
        if (index < items.length - 1) {
          item.hidden = true;
        }
      });
    } else {
      items.forEach(item => {
        item.hidden = false;
      });
    }
  }

  #renderCollapsedSlotHeader(): TemplateResult {
    const collapsedItems = this.#slottedItems.slice(0, -1);
    const menuOptions: IMenuOption[] = collapsedItems.map((item, index) => ({
      label: item.crumb.label,
      value: index,
      secondaryLabel: item.crumb.secondary,
      leadingIcon: item.crumb.icon,
      leadingIconType: 'component'
    }));
    return html`
      <div role="listitem" class="crumb-item">
        <forge-menu .options=${menuOptions} @forge-menu-select=${this.#handleCollapsedSlotMenuSelect}>
          <forge-icon-button class="collapsed-trigger" aria-label=${this.expandLabel}>
            <forge-icon name="dots_horizontal"></forge-icon>
          </forge-icon-button>
        </forge-menu>
        ${this.#renderSeparator()}
      </div>
    `;
  }

  #handleCollapsedSlotMenuSelect(evt: CustomEvent): void {
    const index = evt.detail?.value;
    if (typeof index === 'number' && index >= 0 && index < this.#slottedItems.length) {
      this.#slottedItems[index].dispatchEvent(new Event('forge-breadcrumbs-crumb-select', { bubbles: true, composed: true }));
    }
  }

  #handleHomeClick(): void {
    this.dispatchEvent(new Event('forge-breadcrumbs-home-click', { bubbles: true, composed: true }));
  }

  #handleCrumbSelect(evt: Event): void {
    const target = evt.target;
    if (target instanceof BreadcrumbsItemComponent) {
      this.#selectedIndex = target.index;
    }
  }

  #handleCollapsedMenuSelect(evt: CustomEvent): void {
    const index = evt.detail?.value;
    if (typeof index === 'number' && index >= 0 && index < this.crumbs.length) {
      this.#selectedIndex = index;
      this.dispatchEvent(new Event('forge-breadcrumbs-crumb-select', { bubbles: true, composed: true }));
    }
  }

  #detectSlottedSeparatorIcon(evt: Event): void {
    const slot = evt.target as HTMLSlotElement;
    const assignedElement = slot.assignedElements()[0];

    if (!assignedElement) {
      this.#separatorIconSource = undefined;
      this.#separatorIconObserver?.disconnect();
      this.#separatorIconObserver = undefined;
    } else {
      this.#separatorIconObserver ??= new MutationObserver(() => {
        if (this.#slottedItems.length > 0) {
          this.#configureSlottedItems();
        }
        this.requestUpdate();
      });
      this.#separatorIconObserver.observe(assignedElement, { attributes: true, subtree: true, childList: true, characterData: true });
      this.#separatorIconSource = assignedElement;
    }

    if (this.#slottedItems.length > 0) {
      this.#configureSlottedItems();
    }
    this.requestUpdate();
  }

  #cloneSeparatorIcon(): HTMLElement {
    const clone = (this.#separatorIconSource as Element).cloneNode(true) as HTMLElement;
    [clone, ...clone.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));
    return clone;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-breadcrumbs': BreadcrumbsComponent;
  }

  interface HTMLElementEventMap {
    'forge-breadcrumbs-crumb-select': Event;
    'forge-breadcrumbs-home-click': Event;
  }
}
