import { coerceNumber, ICustomElementFoundation, isArray, isDefined } from '@tylertech/forge-core';
import { IPaginatorAdapter } from './paginator-adapter';
import { PaginatorAlternativeAlignment, PAGINATOR_CONSTANTS, IPaginatorChangeEvent } from './paginator-constants';
import { ISelectOption, ISelectComponent } from '../select';


export interface IPaginatorFoundation extends ICustomElementFoundation {
  pageIndex: number;
  pageSize: number;
  offset: number;
  total: number;
  pageSizeOptions: number[] | boolean;
  pageSizeLabel: string;
  initialize(): void;
}

/**
 * The foundation class behind the `<forge-paginator>` component.
 */
export class PaginatorFoundation {
  // Backing models
  private _pageIndex = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX;
  private _pageSize = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE;
  private _total = PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL;
  private _pageSizeOptions: ISelectOption[] = [];
  private _label = PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL;
  private _firstLast = false;
  private _first = false;
  private _disabled = false;
  private _alternative: boolean;
  private _alignment: PaginatorAlternativeAlignment = 'space-between';

  // Listeners
  private _firstPageListener: (evt: Event) => void;
  private _previousPageListener: (evt: Event) => void;
  private _nextPageListener: (evt: Event) => void;
  private _lastPageListener: (evt: Event) => void;
  private _pageSizeListener: (evt: Event) => void;

  // State variables
  private _rangeLabel: string;

  constructor(private _adapter: IPaginatorAdapter) {
    // Create listeners
    this._pageSizeListener = (evt: CustomEvent) => this._onPageSizeChanged(evt);
    this._firstPageListener = (evt: Event) => this._onFirstPage(evt);
    this._previousPageListener = (evt: Event) => this._onPreviousPage(evt);
    this._nextPageListener = (evt: Event) => this._onNextPage(evt);
    this._lastPageListener = (evt: Event) => this._onLastPage(evt);

    this._pageSizeOptions = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS.map(o => ({ label: o.toString(), value: o.toString() }));
  }

  /** The zero-based page index. Default is 0. */
  public set pageIndex(value: number) {
    if (this._pageIndex !== value) {
      if (isDefined(value)) {
        this._pageIndex = value;
        this._update();
        this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX, this._pageIndex.toString());
      } else {
        this._adapter.removeHostAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX);
      }
    }
  }
  public get pageIndex(): number {
    return this._pageIndex;
  }

  /** Number of items to display on a page. By default set to 25. */
  public set pageSize(value: number) {
    if (this._pageSize !== value) {
      this._pageSize = value;
      this._adapter.setPageSize(this._pageSize);
      this._update();
      this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE, this._pageSize.toString());
    }
  }
  public get pageSize(): number {
    return this._pageSize;
  }

  /** Sets page index by providing the number of items to skip. */
  public set offset(value: number) {
    if (value >= this._total) {
      if (this._total >= this._pageSize) {
        value = this._total - this._pageSize;
      } else {
        value = 0;
      }
    }
    const clampedValue = Math.min(Math.max(value, 0), this._total);
    this.pageIndex = Math.floor(clampedValue / this._pageSize);
  }
  public get offset(): number {
    return this._pageIndex * this._pageSize;
  }

  /** The total number of items to be paginated. Default is 0. */
  public set total(value: number) {
    if (this._total !== value) {
      this._total = value;
      this._update();
      this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL, this._total.toString());
    }
  }
  public get total(): number {
    return this._total;
  }

  /** The set of provided page size options to display to the user. */
  public set pageSizeOptions(options: number[] | boolean) {
    if (isArray(options)) {
      this._pageSizeOptions = (options as number[])
        .map(o => ({ label: o.toString(), value: o.toString() }))
        .sort((a, b) => coerceNumber(a.value) - coerceNumber(b.value));
      this._adapter.setPageSizeOptions(this._pageSizeOptions);
      this._adapter.attachPageSizeChangeListener(this._pageSizeListener);
      this._adapter.setPageSizeVisibility(true);
      if (isDefined(this._pageSize) && this._pageSizeOptions.length && !this._pageSizeOptions.find(o => coerceNumber(o.value) === this._pageSize)) {
        this.pageSize = coerceNumber(this._pageSizeOptions[0].value);
      }
    } else if (options.toString().toLowerCase() === 'false') {
      this._adapter.detachPageSizeChangeListener(this._pageSizeListener);
      this._adapter.setPageSizeVisibility(false);
    }
  }
  public get pageSizeOptions(): number[] | boolean {
    return this._pageSizeOptions.map(o => Number(o.value));
  }

  /** A label for the paginator. Default is "Rows per page:". */
  public set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._adapter.setLabel(this._label);
      this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.LABEL, isDefined(this._label) ? this._label.toString() : '');
    }
  }
  public get label(): string {
    return this._label;
  }

  /** Whether to show the first page and last page buttons. Default is false. */
  public set firstLast(value: boolean) {
    if (this._firstLast !== value) {
      this._firstLast = value;
      this._toggleFirstLastButtons();

      if (this._firstLast) {
        this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST);
      } else {
        this._adapter.removeHostAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST);
      }
    }
  }
  public get firstLast(): boolean {
    return this._firstLast;
  }

  /** Whether to show the first page button. Default is false. */
  public set first(value: boolean) {
    if (this._first !== value) {
      this._first = value;
      this._toggleFirstButton();

      if (this._first) {
        this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.FIRST);
      } else {
        this._adapter.removeHostAttribute(PAGINATOR_CONSTANTS.attributes.FIRST);
      }
    }
  }

  public get first(): boolean {
    return this._first;
  }

  /** Whether the paginator is disabled. Default is false. */
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._update();

      if (this._disabled) {
        this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED);
      } else {
        this._adapter.removeHostAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED);
      }
    }
  }
  public get disabled(): boolean {
    return this._disabled;
  }

  public get alternative(): boolean {
    return this._alternative;
  }
  public set alternative(value: boolean) {
    if (value !== this._alternative) {
      this._alternative = value;
      this._applyAlternative();
    }
  }

  public get alignment(): PaginatorAlternativeAlignment {
    return this._alignment;
  }
  public set alignment(value: PaginatorAlternativeAlignment) {
    if (value !== this._alignment) {
      this._alignment = value;
      this._applyAlternativeAlignment();
    }
  }

  private _applyAlternativeAlignment(): void {
    this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.ALIGNMENT, this._alignment);
    this._adapter.setAlignment(this._alignment);
  }

  private _applyAlternative(): void {
    this._adapter.toggleHostAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE, this._alternative);
    this._adapter.setAlternative(this._alternative);
    this._applyAlternativeAlignment();
  }

  /**
   * Intializes the internal state when the component loads.
   */
  public initialize(): void {
    this._update();
    this._adapter.setLabel(this._label);
    this._adapter.setPageSizeOptions(this._pageSizeOptions);
    this._adapter.setPageSize(this._pageSize);
    this._attachListeners();
    this._toggleFirstLastButtons();
  }

  public disconnect(): void {
    this._detachListeners();
  }

  private _attachListeners(): void {
    this._adapter.attachPageSizeChangeListener(this._pageSizeListener);
    this._adapter.attachFirstPageListener(this._firstPageListener);
    this._adapter.attachPreviousPageListener(this._previousPageListener);
    this._adapter.attachNextPageListener(this._nextPageListener);
    this._adapter.attachLastPageListener(this._lastPageListener);
  }

  private _detachListeners(): void {
    this._adapter.detachPageSizeChangeListener(this._pageSizeListener);
    this._adapter.detachFirstPageListener(this._firstPageListener);
    this._adapter.detachPreviousPageListener(this._previousPageListener);
    this._adapter.detachNextPageListener(this._nextPageListener);
    this._adapter.detachLastPageListener(this._lastPageListener);
  }

  /**
   * Handles clicking the first page button.
   * @param evt The click event.
   */
  private _onFirstPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasFirstPage()) {
      return;
    }

    const firstPage = 0;
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.FIRST_PAGE, { pageIndex: firstPage });
    if (canPage) {
      this.pageIndex = firstPage;
    }
  }

  /**
   * Handles clicking the previous page button.
   * @param evt The click event.
   */
  private _onPreviousPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasPreviousPage()) {
      return;
    }
    
    const prevPage = this._pageIndex - 1;
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.PREVIOUS_PAGE, { pageIndex: prevPage });
    if (canPage) {
      this.pageIndex = prevPage;
    }
  }

  /**
   * Handles clicking the next page button.
   * @param evt The click event.
   */
  private _onNextPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasNextPage()) {
      return;
    }

    const nextPage = this._pageIndex + 1;
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.NEXT_PAGE, { pageIndex: nextPage });
    if (canPage) {
      this.pageIndex = nextPage;
    }
  }

  /**
   * Handles clicking the last page button.
   * @param evt The click event.
   */
  private _onLastPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasLastPage()) {
      return;
    }

    const lastPage = this._getMaxPages();
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.LAST_PAGE, { pageIndex: lastPage });
    if (canPage) {
      this.pageIndex = lastPage;
    }
  }

  /**
   * Handles selecting a new item in the page size options.
   * @param evt The select custom event.
   */
  private _onPageSizeChanged(evt: CustomEvent): void {
    evt.stopPropagation();

    const pageSize = Number(evt.detail);
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.PAGE_SIZE, { pageIndex: 0, pageSize });
    if (canPage) {
      this.pageIndex = 0;
      this.pageSize = pageSize;
    } else {
      evt.preventDefault();
    }
  }

  private _emitChangeEvent(type: string, { pageSize = this._pageSize, pageIndex = this._pageIndex } = {}): boolean {
    const offset = pageIndex * pageSize;
    const detail: IPaginatorChangeEvent = { type, pageSize, pageIndex, offset };
    return this._adapter.emitHostEvent(PAGINATOR_CONSTANTS.events.CHANGE, detail, true, true);
  }

  /**
   * Returns the max number of pages based on our current parameters.
   */
  private _getMaxPages(): number {
    return Math.ceil(this._total / this._pageSize) - 1;
  }

  /**
   * Updates our internal state as well as updating the UI.
   */
  private _update(): void {
    // Create and update the range label
    if (this.pageSize > 1) {
      const startIndex = this._pageIndex * this._pageSize;
      const indexStart = Math.floor(startIndex / this._pageSize) || 0;
      const pageStart = (indexStart * this._pageSize) + 1;
      const pageEnd = startIndex < this._total ? Math.min(startIndex + this._pageSize, this._total) : startIndex + this._pageSize;

      this._rangeLabel = `${pageStart}-${pageEnd} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${this._total}`;
    } else {
      this._rangeLabel = `${this._pageIndex + 1} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${this._total}`;
    }

    this._adapter.setRangeLabel(this._rangeLabel);

    if (this.disabled) {
      this._adapter.disablePageSizeSelect();
      this._adapter.disableFirstPageButton();
      this._adapter.disablePreviousPageButton();
      this._adapter.disableNextPageButton();
      this._adapter.disableLastPageButton();
    } else {
      this._adapter.enablePageSizeSelect();
      // Check if first page button needs to be enabled/disabled
      if (this._hasFirstPage()) {
        this._adapter.enableFirstPageButton();
      } else {
        this._adapter.disableFirstPageButton();
      }

      // Check if previous page button needs to be enabled/disabled
      if (this._hasPreviousPage()) {
        this._adapter.enablePreviousPageButton();
      } else {
        this._adapter.disablePreviousPageButton();
      }

      // Check if next page button needs to be enabled/disabled
      if (this._hasNextPage()) {
        this._adapter.enableNextPageButton();
      } else {
        this._adapter.disableNextPageButton();
      }

      // Check if last page button needs to be enabled/disabled
      if (this._hasLastPage()) {
        this._adapter.enableLastPageButton();
      } else {
        this._adapter.disableLastPageButton();
      }
    }
  }

  /**
   * Toggle showing/hiding first and last buttons based on the show first/last buttons flag.
   */
  private _toggleFirstLastButtons(): void {
    this._toggleFirstButton();
    if (this._firstLast) {
      if (!this._adapter.hasLastPageButton()) {
        this._adapter.showLastPageButton();
      }
    } else {
      if (this._adapter.hasLastPageButton()) {
        this._adapter.hideLastPageButton();
      }
    }
  }

  /**
   * Toggle showing/hiding first button based on the show first or first/last buttons flags.
   */
  private _toggleFirstButton(): void {
    if (this._first || this._firstLast) {
      if (!this._adapter.hasFirstPageButton()) {
        this._adapter.showFirstPageButton();
      }
    } else {
      if (this._adapter.hasFirstPageButton()) {
        this._adapter.hideFirstPageButton();
      }
    }
  }

  /** Checks if a first page exists. */
  private _hasFirstPage(): boolean {
    // same as has previous page
    return this._hasPreviousPage();
  }

  /**
   * Checks if a previous page exists.
   */
  private _hasPreviousPage(): boolean {
    return this._pageIndex >= 1 && this._pageSize !== 0;
  }

  /** Checks if a next page exists */
  private _hasNextPage(): boolean {
    const maxPages = this._getMaxPages();
    return this._pageIndex < maxPages && this._pageSize !== 0;
  }

  /** Checks if a last page exists. */
  private _hasLastPage(): boolean {
    // same as has next page
    return this._hasNextPage();
  }
}
