import { getShadowElement, removeAllChildren, toggleElementPlaceholder } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IIconButtonComponent } from '../icon-button';
import { ISelectComponent, ISelectOption } from '../select';
import { IPaginatorComponent } from './paginator';
import { PAGINATOR_CONSTANTS } from './paginator-constants';

export type PaginatorFieldIdentifier = 'first' | 'last' | 'previous' | 'next' | 'page-size';

export interface IPaginatorAdapter extends IBaseAdapter {
  setLabel(value: string): void;
  setPageSizeOptions(options: ISelectOption[]): void;
  setPageSize(value: number): void;
  setRangeLabel(value: string): void;
  hasFirstPageButton(): boolean;
  showFirstPageButton(): void;
  hideFirstPageButton(): void;
  hasLastPageButton(): boolean;
  showLastPageButton(): void;
  hideLastPageButton(): void;
  attachPageSizeChangeListener(listener: (evt: CustomEvent) => void): void;
  detachPageSizeChangeListener(listener: (evt: CustomEvent) => void): void;
  attachFirstPageListener(listener: EventListener): void;
  attachPreviousPageListener(listener: EventListener): void;
  attachNextPageListener(listener: EventListener): void;
  attachLastPageListener(listener: EventListener): void;
  setFirstPageButtonEnabled(enabled: boolean): void;
  setPreviousPageButtonEnabled(enabled: boolean): void;
  setNextPageButtonEnabled(enabled: boolean): void;
  setLastPageButtonEnabled(enabled: boolean): void;
  setPageSizeSelectEnabled(enabled: boolean): void;
  setPageSizeVisibility(visible: boolean): void;
  setFocus(options?: FocusOptions): void;
  tryDisableFields(fieldsToDisable: PaginatorFieldIdentifier[]): void;
}

export class PaginatorAdapter extends BaseAdapter<IPaginatorComponent> implements IPaginatorAdapter {
  private _labelElement: HTMLSlotElement;
  private _pageSizeSelect: ISelectComponent;
  private _rangeLabel: HTMLSlotElement;
  private _rangeLabelAlternative: HTMLSlotElement;
  private _firstPageButton: IIconButtonComponent;
  private _firstPageContainer: HTMLElement;
  private _previousPageButton: IIconButtonComponent;
  private _previousPageContainer: HTMLElement;
  private _nextPageButton: IIconButtonComponent;
  private _nextPageContainer: HTMLElement;
  private _lastPageButton: IIconButtonComponent;
  private _lastPageContainer: HTMLElement;
  private _firstPagePlaceholder: Comment;
  private _lastPagePlaceholder: Comment;

  constructor(component: IPaginatorComponent) {
    super(component);
    this._labelElement = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.LABEL) as HTMLSlotElement;
    this._pageSizeSelect = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.PAGE_SIZE_SELECT) as ISelectComponent;
    this._rangeLabel = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.RANGE_LABEL) as HTMLSlotElement;
    this._rangeLabelAlternative = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.RANGE_LABEL_ALTERNATIVE) as HTMLSlotElement;
    this._firstPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_BUTTON) as IIconButtonComponent;
    this._firstPageContainer = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_CONTAINER) as HTMLElement;
    this._previousPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.PREVIOUS_PAGE_BUTTON) as IIconButtonComponent;
    this._previousPageContainer = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.PREVIOUS_PAGE_CONTAINER) as HTMLElement;
    this._nextPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.NEXT_PAGE_BUTTON) as IIconButtonComponent;
    this._nextPageContainer = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.NEXT_PAGE_CONTAINER) as HTMLElement;
    this._lastPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_BUTTON) as IIconButtonComponent;
    this._lastPageContainer = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_CONTAINER) as HTMLElement;
  }

  public setLabel(value: string): void {
    this._labelElement.textContent = value;
  }

  public setPageSizeOptions(options: ISelectOption[]): void {
    removeAllChildren(this._pageSizeSelect);
    this._pageSizeSelect.options = options;
  }

  public setPageSize(value: number): void {
    this._pageSizeSelect.value = value.toString();
  }

  public setRangeLabel(value: string): void {
    this._rangeLabel.innerText = value;
    this._rangeLabelAlternative.innerText = value;
  }

  public hasFirstPageButton(): boolean {
    return !!getShadowElement(this._component, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_BUTTON);
  }

  public showFirstPageButton(): void {
    this._firstPagePlaceholder = toggleElementPlaceholder(
      this._component,
      true,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_CONTAINER,
      this._firstPageContainer,
      this._firstPagePlaceholder
    );
  }

  public hideFirstPageButton(): void {
    this._firstPagePlaceholder = toggleElementPlaceholder(
      this._component,
      false,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_CONTAINER,
      this._firstPageContainer,
      this._firstPagePlaceholder
    );
  }

  public hasLastPageButton(): boolean {
    return !!getShadowElement(this._component, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_BUTTON);
  }

  public showLastPageButton(): void {
    this._lastPagePlaceholder = toggleElementPlaceholder(
      this._component,
      true,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.LAST_PAGE_CONTAINER,
      this._lastPageContainer,
      this._lastPagePlaceholder
    );
  }

  public hideLastPageButton(): void {
    this._lastPagePlaceholder = toggleElementPlaceholder(
      this._component,
      false,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.LAST_PAGE_CONTAINER,
      this._lastPageContainer,
      this._lastPagePlaceholder
    );
  }

  public attachPageSizeChangeListener(listener: (evt: CustomEvent) => void): void {
    this._pageSizeSelect.addEventListener('change', listener);
  }

  public detachPageSizeChangeListener(listener: (evt: CustomEvent) => void): void {
    this._pageSizeSelect.removeEventListener('change', listener);
  }

  public attachFirstPageListener(listener: EventListener): void {
    this._firstPageButton.addEventListener('click', listener);
  }

  public attachPreviousPageListener(listener: EventListener): void {
    this._previousPageButton.addEventListener('click', listener);
  }

  public attachNextPageListener(listener: EventListener): void {
    this._nextPageButton.addEventListener('click', listener);
  }

  public attachLastPageListener(listener: EventListener): void {
    this._lastPageButton.addEventListener('click', listener);
  }

  public setFirstPageButtonEnabled(enabled: boolean): void {
    this._firstPageButton.disabled = !enabled;
  }

  public setPreviousPageButtonEnabled(enabled: boolean): void {
    this._previousPageButton.disabled = !enabled;
  }

  public setNextPageButtonEnabled(enabled: boolean): void {
    this._nextPageButton.disabled = !enabled;
  }

  public setLastPageButtonEnabled(enabled: boolean): void {
    this._lastPageButton.disabled = !enabled;
  }

  public setPageSizeSelectEnabled(enabled: boolean): void {
    this._pageSizeSelect.disabled = !enabled;
  }

  public setPageSizeVisibility(visible: boolean): void {
    this._pageSizeSelect.hidden = !visible;
  }

  public setFocus(options?: FocusOptions): void {
    this._tryFocus([
      this._pageSizeSelect,
      this._firstPageButton,
      this._previousPageButton,
      this._nextPageButton,
      this._lastPageButton
    ], options);
  }

  public tryDisableFields(fieldsToDisable: PaginatorFieldIdentifier[]): void {
    const fieldDisablers = {
      'first': () => this.setFirstPageButtonEnabled(false),
      'last': () => this.setLastPageButtonEnabled(false),
      'previous': () => this.setPreviousPageButtonEnabled(false),
      'next': () => this.setNextPageButtonEnabled(false)
    };
    fieldsToDisable.forEach(field => fieldDisablers[field]?.());
  }

  private _tryFocus(elements: Array<IIconButtonComponent | ISelectComponent>, options?: FocusOptions): void {
    const preventScroll = typeof options?.preventScroll === 'boolean' ? options.preventScroll : true;
    for (const el of elements) {
      if (el && el.isConnected && !el.disabled && el.style.display !== 'none') {
        el.focus({ ...options, preventScroll });
        return;
      }
    }
  }
}
