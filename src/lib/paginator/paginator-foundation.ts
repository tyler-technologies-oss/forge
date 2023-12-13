import { coerceNumber, ICustomElementFoundation, isArray, isDefined } from '@tylertech/forge-core';
import { IPaginatorAdapter } from './paginator-adapter';
import { PaginatorAlternativeAlignment, PAGINATOR_CONSTANTS, IPaginatorChangeEvent, PaginatorRangeLabelBuilder, IPaginatorRangeState } from './paginator-constants';
import { ISelectOption } from '../select';

export interface IPaginatorFoundation extends ICustomElementFoundation {
  pageIndex: number;
  pageSize: number;
  offset: number;
  total: number;
  pageSizeOptions: number[] | boolean;
  pageSizeLabel: string;
  rangeLabelCallback: PaginatorRangeLabelBuilder;
  focus(options?: FocusOptions): void;
}

export class PaginatorFoundation {
  private _pageIndex = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX;
  private _pageSize = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE;
  private _offset = 0;
  private _total = PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL;
  private _pageSizeOptions: ISelectOption[] = PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS.map(o => ({ label: `${o}`, value: `${o}` }));
  private _label = PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL;
  private _firstLast = false;
  private _first = false;
  private _disabled = false;
  private _alternative: boolean;
  private _alignment: PaginatorAlternativeAlignment = 'space-between';
  private _rangeLabelCallback: PaginatorRangeLabelBuilder;

  private _firstPageListener: (evt: Event) => void;
  private _previousPageListener: (evt: Event) => void;
  private _nextPageListener: (evt: Event) => void;
  private _lastPageListener: (evt: Event) => void;
  private _pageSizeListener: (evt: Event) => void;

  constructor(private _adapter: IPaginatorAdapter) {
    this._pageSizeListener = (evt: CustomEvent<number>) => this._onPageSizeChanged(evt);
    this._firstPageListener = (evt: Event) => this._onFirstPage(evt);
    this._previousPageListener = (evt: Event) => this._onPreviousPage(evt);
    this._nextPageListener = (evt: Event) => this._onNextPage(evt);
    this._lastPageListener = (evt: Event) => this._onLastPage(evt);
  }

  public initialize(): void {
    this._updateRangeLabel();
    this._adapter.setLabel(this._label);
    this._adapter.setPageSizeOptions(this._pageSizeOptions);
    this._adapter.setPageSize(this._pageSize);
    this._attachListeners();
    this._toggleFirstLastButtons();
    this._syncInteractionState();
  }

  public disconnect(): void {
    this._detachListeners();
  }

  public focus(options?: FocusOptions): void {
    this._adapter.handleFocusMove(null, options);
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

  private _onFirstPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasFirstPage()) {
      return;
    }

    const firstPage = 0;
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.FIRST_PAGE, { pageIndex: firstPage });
    if (canPage) {
      this._applyPageIndex(firstPage);
    }
  }

  private _onPreviousPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasPreviousPage()) {
      return;
    }
    
    const prevPage = this._pageIndex - 1;
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.PREVIOUS_PAGE, { pageIndex: prevPage });
    if (canPage) {
      this._applyPageIndex(prevPage);
    }
  }

  private _onNextPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasNextPage()) {
      return;
    }

    const nextPage = this._pageIndex + 1;
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.NEXT_PAGE, { pageIndex: nextPage });
    if (canPage) {
      this._applyPageIndex(nextPage);
    }
  }

  private _onLastPage(evt: Event): void {
    evt.stopPropagation();

    if (!this._hasLastPage()) {
      return;
    }

    const lastPage = this._getMaxPages();
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.LAST_PAGE, { pageIndex: lastPage });
    if (canPage) {
      this._applyPageIndex(lastPage);
    }
  }

  private _onPageSizeChanged(evt: CustomEvent): void {
    evt.stopPropagation();

    const pageSize = Number(evt.detail);
    const canPage = this._emitChangeEvent(PAGINATOR_CONSTANTS.strings.PAGE_SIZE, { pageIndex: 0, pageSize });
    if (canPage) {
      this._applyPageIndex(0);
      this._applyPageSize(pageSize);
    } else {
      evt.preventDefault();
    }
  }

  private _emitChangeEvent(type: string, { pageSize = this._pageSize, pageIndex = this._pageIndex } = {}): boolean {
    const offset = pageIndex * pageSize;
    const detail: IPaginatorChangeEvent = { type, pageSize, pageIndex, offset };
    return this._adapter.emitHostEvent(PAGINATOR_CONSTANTS.events.CHANGE, detail, true, true);
  }

  private _getMaxPages(): number {
    return Math.ceil(this._total / this._pageSize) - 1;
  }

  private _updateRangeLabel(): void {
    let rangeLabel: string;

    if (typeof this._rangeLabelCallback === 'function') {
      const state: IPaginatorRangeState = {
        pageSize: this._pageSize,
        pageIndex: this._pageIndex,
        offset: this._offset,
        pageStart: (this._pageIndex * this._pageSize) + 1,
        pageEnd: Math.min((this._pageIndex + 1) * this._pageSize, this._total),
        total: this._total
      };
      rangeLabel = this._rangeLabelCallback.call(null, state);
    } else {
      if (this.pageSize > 1) {
        const startIndex = this._pageIndex * this._pageSize;
        const indexStart = Math.floor(startIndex / this._pageSize) || 0;
        const pageStart = (indexStart * this._pageSize) + 1;
        const pageEnd = startIndex < this._total ? Math.min(startIndex + this._pageSize, this._total) : startIndex + this._pageSize;
        rangeLabel = `${pageStart}-${pageEnd} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${this._total}`;
      } else {
        rangeLabel = `${this._pageIndex + 1} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${this._total}`;
      }
    }

    this._adapter.setRangeLabel(rangeLabel);
  }

  private _syncInteractionState(): void {
    this._adapter.enableFirstPageButton();
    this._adapter.enablePreviousPageButton();
    this._adapter.enableNextPageButton();
    this._adapter.enableLastPageButton();

    if (!this._hasFirstPage()) {
      if (this._adapter.hasFocus()) {
        this._adapter.handleFocusMove('first');
      }
      this._adapter.disableFirstPageButton();
    }

    if (!this._hasPreviousPage()) {
      if (this._adapter.hasFocus()) {
        this._adapter.handleFocusMove('previous');
      }
      this._adapter.disablePreviousPageButton();
    }

    if (!this._hasNextPage()) {
      if (this._adapter.hasFocus()) {
        this._adapter.handleFocusMove('next');
      }
      this._adapter.disableNextPageButton();
    }

    if (!this._hasLastPage()) {
      if (this._adapter.hasFocus()) {
        this._adapter.handleFocusMove('last');
      }
      this._adapter.disableLastPageButton();
    }
  }

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

  private _hasFirstPage(): boolean {
    return this._hasPreviousPage();
  }

  private _hasPreviousPage(): boolean {
    return this._pageIndex > 0 && this._pageSize > 0;
  }

  private _hasNextPage(): boolean {
    const maxPages = this._getMaxPages();
    return this._pageIndex < maxPages && this._pageSize > 0;
  }

  private _hasLastPage(): boolean {
    return this._hasNextPage();
  }

  private _computePageIndexFromOffset(value: number): void {
    if (value >= this._total) {
      if (this._total >= this._pageSize) {
        value = this._total - this._pageSize;
      } else {
        value = 0;
      }
    }
    const clampedValue = Math.min(Math.max(value, 0), this._total);
    const pageIndex = Math.floor(clampedValue / this._pageSize);
    this._applyPageIndex(pageIndex);
  }

  private _computeOffset(): void {
    if (this._total > 0) {
      this._offset = this._pageIndex * this._pageSize;
    }
  }

  private _applyPageIndex(value: number): void {
    this._pageIndex = value;
    this._computeOffset();
    this._updateRangeLabel();
    this._syncInteractionState();
    this._adapter.toggleHostAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX, this._pageIndex != null, this._pageIndex.toString());
  }

  private _applyPageSize(value: number): void {
    this._pageSize = value;
    this._adapter.setPageSize(this._pageSize);
    this._computeOffset();
    this._updateRangeLabel();
    this._syncInteractionState();
  }

  private _applyTotal(value: number): void {
    this._total = value;
    this._updateRangeLabel();

    if (this._offset > 0 && this._total > 0) {
      this._computePageIndexFromOffset(this._offset);
    }

    this._syncInteractionState();
  }

  private _applyAlternativeAlignment(): void {
    this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.ALIGNMENT, this._alignment);
    this._adapter.setAlignment(this._alignment);
  }

  private _applyDisabled(disabled: boolean): void {
    this._disabled = disabled;
    if (disabled) {
      this._adapter.disablePageSizeSelect();
      this._adapter.disableFirstPageButton();
      this._adapter.disablePreviousPageButton();
      this._adapter.disableNextPageButton();
      this._adapter.disableLastPageButton();
    } else {
      this._adapter.enablePageSizeSelect();
      this._syncInteractionState();
    }
  }

  public get pageIndex(): number {
    return this._pageIndex;
  }
  public set pageIndex(value: number) {
    if (this._pageIndex !== value) {
      if (isDefined(value)) {
        this._applyPageIndex(value);
      } else {
        this._adapter.removeHostAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX);
      }
    }
  }

  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(value: number) {
    if (this._pageSize !== value) {
      this._applyPageSize(value);
      this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_SIZE, `${this._pageSize}`);
    }
  }

  public get offset(): number {
    return this._offset;
  }
  public set offset(value: number) {
    if (this._offset !== value) {
      this._offset = value;
      this._computePageIndexFromOffset(value);
    }
  }

  public get total(): number {
    return this._total;
  }
  public set total(value: number) {
    if (this._total !== value) {
      this._applyTotal(value);
      this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.TOTAL, `${this._total}`);
    }
  }

  public get pageSizeOptions(): number[] | boolean {
    return this._pageSizeOptions.map(o => Number(o.value));
  }
  public set pageSizeOptions(options: number[] | boolean) {
    if (isArray(options)) {
      this._pageSizeOptions = (options as number[])
        .map(o => ({ label: o.toString(), value: o.toString() }))
        .sort((a, b) => coerceNumber(a.value) - coerceNumber(b.value));
      this._adapter.setPageSizeOptions(this._pageSizeOptions);
      this._adapter.attachPageSizeChangeListener(this._pageSizeListener);
      this._adapter.setPageSizeVisibility(true);
      if (isDefined(this._pageSize) && this._pageSizeOptions.length && !this._pageSizeOptions.find(o => coerceNumber(o.value) === this._pageSize)) {
        const pageSize = coerceNumber(this._pageSizeOptions[0].value);
        this._applyPageSize(pageSize);
      }
    } else if (options.toString().toLowerCase() === 'false') {
      this._adapter.detachPageSizeChangeListener(this._pageSizeListener);
      this._adapter.setPageSizeVisibility(false);
    }
  }

  public get label(): string {
    return this._label;
  }
  public set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._adapter.setLabel(this._label);
      this._adapter.setHostAttribute(PAGINATOR_CONSTANTS.attributes.LABEL, isDefined(this._label) ? this._label.toString() : '');
    }
  }

  public get firstLast(): boolean {
    return this._firstLast;
  }
  public set firstLast(value: boolean) {
    value = Boolean(value);
    if (this._firstLast !== value) {
      this._firstLast = value;
      this._toggleFirstLastButtons();
      this._adapter.toggleHostAttribute(PAGINATOR_CONSTANTS.attributes.FIRST_LAST, this._firstLast);
    }
  }

  public get first(): boolean {
    return this._first;
  }
  public set first(value: boolean) {
    value = Boolean(value);
    if (this._first !== value) {
      this._first = value;
      this._toggleFirstButton();
      this._adapter.toggleHostAttribute(PAGINATOR_CONSTANTS.attributes.FIRST, this._first);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = Boolean(value);
    if (this._disabled !== value) {
      this._applyDisabled(value);
      this._adapter.toggleHostAttribute(PAGINATOR_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get alternative(): boolean {
    return this._alternative;
  }
  public set alternative(value: boolean) {
    if (value !== this._alternative) {
      this._alternative = value;
      this._adapter.setAlternative(this._alternative);
      this._applyAlternativeAlignment();
      this._adapter.toggleHostAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE, this._alternative);
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

  public get rangeLabelCallback(): PaginatorRangeLabelBuilder {
    return this._rangeLabelCallback;
  }
  public set rangeLabelCallback(value: PaginatorRangeLabelBuilder) {
    this._rangeLabelCallback = value;
    this._updateRangeLabel();
  }
}
