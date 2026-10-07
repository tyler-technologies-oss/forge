import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver, tryDefine } from '@tylertech/forge-core';
import { tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight } from '@tylertech/tyler-icons';
import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { IconButtonComponent } from '../../icon-button/icon-button.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { IconComponent } from '../../icon/icon.js';
import { TooltipComponent } from '../../tooltip/tooltip.js';

import styles from './breadcrumb.scss';

export const BREADCRUMB_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-breadcrumb';

type BreadcrumbScrollDirection = 'backward' | 'forward';

/**
 * @tag forge-breadcrumb
 *
 * @summary Breadcrumbs show the user's location within a hierarchy and provide links back to parent
 * pages.
 *
 * @dependency forge-icon-button
 * @dependency forge-icon
 * @dependency forge-tooltip
 *
 * @slot - The default slot for breadcrumb items and breadcrumb overflow menus.
 *
 * @cssproperty --forge-breadcrumb-separator-content - The character used to separate breadcrumb
 * items.
 * @cssproperty --forge-breadcrumb-separator-padding - The inline padding around the separator.
 * @cssproperty --forge-theme-primary - The color of breadcrumb items.
 * @cssproperty --forge-theme-text-high - The color of breadcrumb items without links.
 * @cssproperty --forge-theme-text-medium - The color of the separator.
 * @cssproperty --forge-theme-text-low - The color of icons in breadcrumb items.
 *
 * @csspart root - The root element.
 * @csspart list - The list element.
 */
export class BreadcrumbComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BREADCRUMB_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconButtonComponent, IconComponent, TooltipComponent];

  static {
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight]);
  }

  /**
   * Controls whether scroll buttons are displayed when the items overflow their container.
   * @default false
   * @attribute scroll-buttons
   */
  @property({ type: Boolean, attribute: 'scroll-buttons' })
  public scrollButtons = false;

  @state() private _scrollable = false;
  @state() private _scrolledToStart = true;
  @state() private _scrolledToEnd = true;

  @query('.list', true) private _list!: HTMLElement;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, {
      role: 'navigation'
    });
    ForgeResizeObserver.observe(this, this.#handleResize.bind(this));
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    ForgeResizeObserver.unobserve(this);
  }

  public updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('scrollButtons')) {
      this.#updateScrollState();
    }
  }

  /* @internal */
  public render(): TemplateResult {
    const showingScrollButtons = this.scrollButtons && this._scrollable;
    return html`
      <div part="root" class="forge-breadcrumb">
        ${showingScrollButtons ? this.#scrollButton('backward') : nothing}
        <ul part="list" class=${classMap({ list: true, scroll: this.scrollButtons })} role="list" @scroll=${this.#handleScroll}>
          <slot @slotchange=${this.#handleSlotChange}></slot>
        </ul>
        ${showingScrollButtons ? this.#scrollButton('forward') : nothing}
      </div>
    `;
  }

  async #handleSlotChange(): Promise<void> {
    this.#updateScrollState();
    if (this._scrollable) {
      await this.updateComplete;
      this.#scrollToEnd();
    }
  }

  async #handleResize(): Promise<void> {
    const wasScrollable = this._scrollable;
    this.#updateScrollState();
    if (!wasScrollable && this._scrollable) {
      await this.updateComplete;
      this.#scrollToEnd();
    }
  }

  #handleScroll(): void {
    this.#setScrolledToStartOrEnd();
  }

  #handleScrollButton(direction: BreadcrumbScrollDirection): void {
    const multiplier = direction === 'forward' ? 1 : -1;
    this._list.scrollBy({ behavior: 'smooth', left: this._list.offsetWidth * multiplier });
  }

  #updateScrollState(): void {
    this._scrollable = this.scrollButtons && this._list.scrollWidth > this._list.clientWidth;
    this.#setScrolledToStartOrEnd();
  }

  #setScrolledToStartOrEnd(): void {
    const { scrollLeft, scrollWidth, clientWidth } = this._list;
    this._scrolledToStart = scrollLeft === 0;
    this._scrolledToEnd = scrollLeft + clientWidth >= scrollWidth - 1;
  }

  /**
   * Scrolls to the last item so the current page is visible when the items overflow.
   */
  #scrollToEnd(): void {
    this._list.scrollTo({ behavior: 'instant', left: this._list.scrollWidth });
  }

  /**
   * Renders a scroll button for the given direction.
   * @param direction The scroll direction ('backward' or 'forward').
   * @returns A template for the scroll button.
   */
  #scrollButton(direction: BreadcrumbScrollDirection): TemplateResult {
    const isBackward = direction === 'backward';
    const isDisabled = isBackward ? this._scrolledToStart : this._scrolledToEnd;
    const classes = {
      'scroll-button': true,
      'scroll-button-previous': isBackward,
      'scroll-button-next': !isBackward,
      disabled: isDisabled
    };

    return html`
      <forge-icon-button
        class=${classMap(classes)}
        type="button"
        shape="squared"
        aria-disabled=${isDisabled ? 'true' : nothing}
        @click=${() => this.#handleScrollButton(direction)}>
        <forge-icon .name=${isBackward ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}></forge-icon>
      </forge-icon-button>
      <forge-tooltip type="label" placement="bottom">${isBackward ? 'Previous breadcrumbs' : 'Next breadcrumbs'}</forge-tooltip>
    `;
  }
}

tryDefine(BREADCRUMB_TAG_NAME, BreadcrumbComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-breadcrumb': BreadcrumbComponent;
  }
}
