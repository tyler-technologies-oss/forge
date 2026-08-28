import {
  CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY,
  CUSTOM_ELEMENT_NAME_PROPERTY,
  coerceNumber,
  coerceNumberArray,
  isArray,
  LiveAnnouncer
} from '@tylertech/forge-core';
import { tylIconFirstPage, tylIconLastPage, tylIconKeyboardArrowRight, tylIconKeyboardArrowLeft } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { removeEmptyAttribute } from '../core/utils/lit-utils.js';
import { IconButtonComponent } from '../icon-button/icon-button.js';
import type { IIconButtonComponent } from '../icon-button/index.js';
import { SelectComponent } from '../select/select/index.js';
import type { ISelectComponent, ISelectOption } from '../select/index.js';
import { IconRegistry } from '../icon/icon-registry.js';
import { TooltipComponent } from '../tooltip/tooltip.js';
import { PAGINATOR_CONSTANTS, IPaginatorChangeEventData, IPaginatorRangeState, PaginatorRangeLabelBuilder } from './paginator-constants.js';

import styles from './paginator.scss';

/** @deprecated - This will be removed in the future. Please switch to using PaginatorComponent. */
export interface IPaginatorComponent extends BaseLitElement {
  pageIndex: number;
  pageSize: number;
  offset: number;
  total: number;
  pageSizeOptions: number[];
  label: string;
  firstLast: boolean;
  first: boolean;
  disabled: boolean;
  alternative: boolean;
  rangeLabelCallback: PaginatorRangeLabelBuilder;
  goToFirstPage(): void;
  goToPreviousPage(): void;
  goToNextPage(): void;
  goToLastPage(): void;
  canGoToFirstPage(): boolean;
  canGoToPreviousPage(): boolean;
  canGoToNextPage(): boolean;
  canGoToLastPage(): boolean;
}

/**
 * @tag forge-paginator
 *
 * @summary Paginators provide navigation controls for dividing content across multiple pages. Typically used alongside data tables or lists.
 *
 * @dependency forge-icon-button
 * @dependency forge-select
 * @dependency forge-tooltip
 *
 * @event {CustomEvent<IPaginatorChangeEventData>} forge-paginator-change - Dispatched when the paginator state changes. Cancelable.
 *
 * @csspart root - The root container element.
 * @csspart container - The label/page-size/range-label container.
 * @csspart label - The label container.
 * @csspart page-size-options - The page size `forge-select` element.
 * @csspart range-label - The range label container.
 * @csspart alternative-range-label - The alternative range label container.
 * @csspart actions - The actions container for the nav buttons.
 * @csspart first-page-button - The first page icon-button.
 * @csspart first-page-icon - The first page icon.
 * @csspart previous-page-button - The previous page icon-button.
 * @csspart previous-page-button-icon - The previous page icon.
 * @csspart next-page-button - The next page icon-button.
 * @csspart next-page-icon - The next page icon.
 * @csspart last-page-button - The last page icon-button.
 * @csspart last-page-icon - The last page icon.
 *
 * @slot label - Overrides the label text when in the default variant.
 * @slot range-label - Overrides the default range label with a custom label when in the default variant.
 * @slot alternative-range-label - Overrides the default range label with a custom label when in the `alternative` variant.
 * @slot first-page-tooltip - Overrides the default tooltip for the first page button.
 * @slot last-page-tooltip - Overrides the default tooltip for the last page button.
 * @slot previous-page-tooltip - Overrides the default tooltip for the previous page button.
 * @slot next-page-tooltip - Overrides the default tooltip for the next page button.
 */
@customElement(PAGINATOR_CONSTANTS.elementName)
export class PaginatorComponent extends BaseLitElement implements IPaginatorComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = PAGINATOR_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconButtonComponent, SelectComponent, TooltipComponent];

  static {
    IconRegistry.define([tylIconFirstPage, tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconLastPage]);
  }

  #pageIndex = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX;
  #pageSize = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE;
  #total = PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL;
  #offset = 0;
  #rangeLabelCallback: PaginatorRangeLabelBuilder;
  #rangeLabel = '';
  #initialized = false;

  /**
   * The zero-based page index.
   * @default 0
   * @attribute page-index
   */
  @property({ type: Number, reflect: true, attribute: 'page-index' })
  public set pageIndex(value: number) {
    const finite = Number.isFinite(value) ? value : PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX;
    if (this.#pageIndex === finite) {
      return;
    }
    this.#pageIndex = finite;
    this.#recomputeOffset();
    this.#updateRangeLabel();
  }
  public get pageIndex(): number {
    return this.#pageIndex;
  }

  /**
   * Number of items to display on a page.
   * @default 25
   * @attribute page-size
   */
  @property({ type: Number, reflect: true, attribute: 'page-size' })
  public set pageSize(value: number) {
    const finite = Number.isFinite(value) ? value : PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE;
    if (this.#pageSize === finite) {
      return;
    }
    this.#pageSize = finite;
    this.#recomputeOffset();
    this.#updateRangeLabel();
  }
  public get pageSize(): number {
    return this.#pageSize;
  }

  /**
   * Sets page index by providing the number of items to skip. The getter for this property returns the number of items to skip.
   * @default 0
   * @attribute offset
   */
  @property({ type: Number, reflect: true })
  public set offset(value: number) {
    if (this.#offset === value) {
      return;
    }
    this.#offset = value;
    this.#applyPageIndexFromOffset(value);
  }
  public get offset(): number {
    return this.#offset;
  }

  /**
   * The total number of items to be paginated.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true })
  public set total(value: number) {
    const finite = Number.isFinite(value) ? value : PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL;
    if (this.#total === finite) {
      return;
    }
    this.#total = finite;
    this.#updateRangeLabel();
    if (this.#offset > 0 && this.#total > 0) {
      this.#applyPageIndexFromOffset(this.#offset);
    }
  }
  public get total(): number {
    return this.#total;
  }

  /**
   * The set of provided page size options to display to the user.
   * @default [5, 15, 25, 50, 100]
   * @attribute page-size-options
   */
  @property({
    attribute: 'page-size-options',
    converter: { fromAttribute: (value: string | null): number[] => (value ? coerceNumberArray(value) : PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS) }
  })
  public pageSizeOptions: number[] = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS;

  /**
   * A label for the paginator.
   * @default "Rows per page:"
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public label = PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL;

  /**
   * Whether to show the first page and last page buttons.
   * @default false
   * @attribute first-last
   */
  @property({ type: Boolean, reflect: true, attribute: 'first-last' })
  public firstLast = false;

  /**
   * Whether to show the first page button.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public first = false;

  /**
   * Whether the paginator is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether to use the alternative range label slot.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public alternative = false;

  /**
   * A callback function to build the range label dynamically.
   */
  @property({ attribute: false })
  public set rangeLabelCallback(value: PaginatorRangeLabelBuilder) {
    this.#rangeLabelCallback = value;
    this.#updateRangeLabel();
  }
  public get rangeLabelCallback(): PaginatorRangeLabelBuilder {
    return this.#rangeLabelCallback;
  }

  @query('.first-page') private _firstPageButton?: IIconButtonComponent;
  @query('.previous-page', true) private _previousPageButton!: IIconButtonComponent;
  @query('.next-page', true) private _nextPageButton!: IIconButtonComponent;
  @query('.last-page') private _lastPageButton?: IIconButtonComponent;
  @query('.page-size-options', true) private _pageSizeSelect!: ISelectComponent;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#initialized = true;
  }

  public updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('pageSizeOptions')) {
      this.#syncPageSizeOptionsToSelect();
    }
  }

  /** Sets focus to the first focusable element within the paginator. */
  public override focus(options?: FocusOptions): void {
    this.#tryFocus([this._pageSizeSelect, this._firstPageButton, this._previousPageButton, this._nextPageButton, this._lastPageButton], options);
  }

  /** Navigates to the first page. */
  public goToFirstPage(): void {
    if (!this.canGoToFirstPage()) {
      return;
    }
    const firstPage = 0;
    if (this.#dispatchChangeEvent('first-page', { pageIndex: firstPage })) {
      this.pageIndex = firstPage;
    }
  }

  /** Navigates to the previous page. */
  public goToPreviousPage(): void {
    if (!this.canGoToPreviousPage()) {
      return;
    }
    const prevPage = this.pageIndex - 1;
    if (this.#dispatchChangeEvent('previous-page', { pageIndex: prevPage })) {
      this.pageIndex = prevPage;
    }
  }

  /** Navigates to the next page. */
  public goToNextPage(): void {
    if (!this.canGoToNextPage()) {
      return;
    }
    const nextPage = this.pageIndex + 1;
    if (this.#dispatchChangeEvent('next-page', { pageIndex: nextPage })) {
      this.pageIndex = nextPage;
    }
  }

  /** Navigates to the last page. */
  public goToLastPage(): void {
    if (!this.canGoToLastPage()) {
      return;
    }
    const lastPage = this.#getMaxPages();
    if (this.#dispatchChangeEvent('last-page', { pageIndex: lastPage })) {
      this.pageIndex = lastPage;
    }
  }

  /**
   * Checks if navigation to the first page is possible.
   * @returns True if can navigate to first page
   */
  public canGoToFirstPage(): boolean {
    return this.#hasPreviousPage();
  }

  /**
   * Checks if navigation to the previous page is possible.
   * @returns True if can navigate to previous page
   */
  public canGoToPreviousPage(): boolean {
    return this.#hasPreviousPage();
  }

  /**
   * Checks if navigation to the next page is possible.
   * @returns True if can navigate to next page
   */
  public canGoToNextPage(): boolean {
    return this.#hasNextPage();
  }

  /**
   * Checks if navigation to the last page is possible.
   * @returns True if can navigate to last page
   */
  public canGoToLastPage(): boolean {
    return this.#hasNextPage();
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-paginator" part="root" forge-popover-host>
        <div class="container" part="container">
          <div class="label" part="label" id="label">
            <slot name="label">${this.label}</slot>
          </div>

          <forge-select
            class="page-size-options"
            aria-labelledby="label"
            label-position="none"
            density="extra-small"
            part="page-size-options"
            ?hidden=${!this.pageSizeOptions.length}
            ?disabled=${this.disabled}
            .value=${String(this.pageSize)}
            @change=${this.#handlePageSizeChange}></forge-select>

          <div class="range-label" part="range-label">
            <slot name="range-label">${this.#rangeLabel}</slot>
          </div>
        </div>

        <div class="actions" part="actions">
          ${this.first || this.firstLast ? this.#renderFirstPageButton() : nothing}

          <div id="previous-page-container">
            <forge-icon-button
              class="previous-page"
              part="previous-page-button"
              ?disabled=${this.disabled || !this.canGoToPreviousPage()}
              @click=${this.#handlePreviousPage}>
              <forge-icon name="keyboard_arrow_left" part="previous-page-button-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip type="label" placement="top">
              <slot name="previous-page-tooltip">Go to the previous page</slot>
            </forge-tooltip>
          </div>

          <div class="alternative-range-label" part="alternative-range-label">
            <slot name="alternative-range-label">${this.#rangeLabel}</slot>
          </div>

          <div id="next-page-container">
            <forge-icon-button class="next-page" part="next-page-button" ?disabled=${this.disabled || !this.canGoToNextPage()} @click=${this.#handleNextPage}>
              <forge-icon name="keyboard_arrow_right" part="next-page-icon"></forge-icon>
            </forge-icon-button>
            <forge-tooltip type="label" placement="top">
              <slot name="next-page-tooltip">Go to the next page</slot>
            </forge-tooltip>
          </div>

          ${this.firstLast ? this.#renderLastPageButton() : nothing}
        </div>
      </div>
    `;
  }

  #renderFirstPageButton(): TemplateResult {
    return html`
      <div id="first-page-container">
        <forge-icon-button class="first-page" part="first-page-button" ?disabled=${this.disabled || !this.canGoToFirstPage()} @click=${this.#handleFirstPage}>
          <forge-icon name="first_page" part="first-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip type="label" placement="top">
          <slot name="first-page-tooltip">Go to the first page</slot>
        </forge-tooltip>
      </div>
    `;
  }

  #renderLastPageButton(): TemplateResult {
    return html`
      <div id="last-page-container">
        <forge-icon-button class="last-page" part="last-page-button" ?disabled=${this.disabled || !this.canGoToLastPage()} @click=${this.#handleLastPage}>
          <forge-icon name="last_page" part="last-page-icon"></forge-icon>
        </forge-icon-button>
        <forge-tooltip type="label" placement="top">
          <slot name="last-page-tooltip">Go to the last page</slot>
        </forge-tooltip>
      </div>
    `;
  }

  #handleFirstPage = (evt: Event): void => {
    evt.stopPropagation();
    this.goToFirstPage();
  };

  #handlePreviousPage = (evt: Event): void => {
    evt.stopPropagation();
    this.goToPreviousPage();
  };

  #handleNextPage = (evt: Event): void => {
    evt.stopPropagation();
    this.goToNextPage();
  };

  #handleLastPage = (evt: Event): void => {
    evt.stopPropagation();
    this.goToLastPage();
  };

  #handlePageSizeChange = (evt: CustomEvent): void => {
    evt.stopPropagation();
    const pageSize = Number(evt.detail);
    if (this.#dispatchChangeEvent('page-size', { pageIndex: 0, pageSize })) {
      this.pageIndex = 0;
      this.pageSize = pageSize;
    } else {
      evt.preventDefault();
    }
  };

  #dispatchChangeEvent(type: IPaginatorChangeEventData['type'], { pageSize = this.pageSize, pageIndex = this.pageIndex } = {}): boolean {
    const offset = pageIndex * pageSize;
    const detail: IPaginatorChangeEventData = { type, pageSize, pageIndex, offset };
    const event = new CustomEvent(PAGINATOR_CONSTANTS.events.CHANGE, { detail, bubbles: true, cancelable: true });
    this.dispatchEvent(event);
    return !event.defaultPrevented;
  }

  #getMaxPages(): number {
    return Math.ceil(this.total / this.pageSize) - 1;
  }

  #hasPreviousPage(): boolean {
    return this.pageIndex > 0 && this.pageSize > 0;
  }

  #hasNextPage(): boolean {
    return this.pageIndex < this.#getMaxPages() && this.pageSize > 0;
  }

  #recomputeOffset(): void {
    if (this.#total > 0) {
      this.#offset = this.#pageIndex * this.#pageSize;
    }
  }

  #applyPageIndexFromOffset(value: number): void {
    let clamped = value;
    if (clamped >= this.#total) {
      clamped = this.#total >= this.#pageSize ? this.#total - this.#pageSize : 0;
    }
    clamped = Math.min(Math.max(clamped, 0), this.#total);
    this.pageIndex = Math.floor(clamped / this.#pageSize);
  }

  #updateRangeLabel(): void {
    this.#rangeLabel = this.#computeRangeLabel();
    if (this.#initialized) {
      LiveAnnouncer.instance.announce(this.#rangeLabel, 'polite');
    }
  }

  #computeRangeLabel(): string {
    if (typeof this.#rangeLabelCallback === 'function') {
      const state: IPaginatorRangeState = {
        pageSize: this.#pageSize,
        pageIndex: this.#pageIndex,
        offset: this.#offset,
        pageStart: this.#pageIndex * this.#pageSize + 1,
        pageEnd: Math.min((this.#pageIndex + 1) * this.#pageSize, this.#total),
        total: this.#total
      };
      return this.#rangeLabelCallback.call(null, state);
    }

    if (this.#pageSize > 1) {
      const startIndex = this.#pageIndex * this.#pageSize;
      const pageStart = startIndex + 1;
      const pageEnd = startIndex < this.#total ? Math.min(startIndex + this.#pageSize, this.#total) : startIndex + this.#pageSize;
      return `${pageStart}-${pageEnd} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${this.#total}`;
    }
    return `${this.#pageIndex + 1} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${this.#total}`;
  }

  #syncPageSizeOptionsToSelect(): void {
    if (!isArray(this.pageSizeOptions) || !this.pageSizeOptions.length) {
      return;
    }
    const options: ISelectOption[] = this.pageSizeOptions
      .map(o => ({ label: `${o}`, value: `${o}` }))
      .sort((a, b) => coerceNumber(a.value) - coerceNumber(b.value));
    this._pageSizeSelect.options = options;
    if (!options.find(o => coerceNumber(o.value) === this.pageSize)) {
      this.pageSize = coerceNumber(options[0].value);
    }
  }

  #tryFocus(elements: Array<IIconButtonComponent | ISelectComponent | undefined>, options?: FocusOptions): void {
    const preventScroll = typeof options?.preventScroll === 'boolean' ? options.preventScroll : true;
    for (const el of elements) {
      if (el && el.isConnected && !el.disabled && el.style.display !== 'none') {
        el.focus({ ...options, preventScroll });
        return;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-paginator': IPaginatorComponent;
  }

  interface HTMLElementEventMap {
    'forge-paginator-change': CustomEvent<IPaginatorChangeEventData>;
  }
}
