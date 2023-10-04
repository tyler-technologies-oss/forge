import { addClass, getShadowElement, removeAllChildren, removeClass, toggleElementPlaceholder, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IIconButtonComponent } from '../icon-button';
import { ISelectComponent, ISelectOption } from '../select';
import { IPaginatorComponent } from './paginator';
import { PaginatorAlternativeAlignment, PAGINATOR_CONSTANTS } from './paginator-constants';

export interface IPaginatorAdapter extends IBaseAdapter {
  setLabel: (value: string) => void;
  setPageSizeOptions: (options: ISelectOption[]) => void;
  setPageSize: (value: number) => void;
  setRangeLabel: (value: string) => void;
  hasFirstPageButton(): boolean;
  showFirstPageButton(): void;
  hideFirstPageButton(): void;
  hasLastPageButton(): boolean;
  showLastPageButton(): void;
  hideLastPageButton(): void;
  attachPageSizeChangeListener: (listener: (evt: CustomEvent) => void) => void;
  attachFirstPageListener: (listener: (evt: Event) => void) => void;
  attachPreviousPageListener: (listener: (evt: Event) => void) => void;
  attachNextPageListener: (listener: (evt: Event) => void) => void;
  attachLastPageListener: (listener: (evt: Event) => void) => void;
  detachPageSizeChangeListener: (listener: (evt: CustomEvent) => void) => void;
  detachFirstPageListener: (listener: (evt: Event) => void) => void;
  detachPreviousPageListener: (listener: (evt: Event) => void) => void;
  detachNextPageListener: (listener: (evt: Event) => void) => void;
  detachLastPageListener: (listener: (evt: Event) => void) => void;
  disableFirstPageButton: () => void;
  enableFirstPageButton: () => void;
  disablePreviousPageButton: () => void;
  enablePreviousPageButton: () => void;
  disableNextPageButton: () => void;
  enableNextPageButton: () => void;
  disablePageSizeSelect(): void;
  enablePageSizeSelect(): void;
  setPageSizeVisibility(visible: boolean): void;
  disableLastPageButton: () => void;
  enableLastPageButton: () => void;
  setAlternative: (alternative: boolean) => void;
  setAlignment: (alignment: PaginatorAlternativeAlignment) => void;
}

/**
 * Provides facilities for interacting with the internal DOM of `PaginatorComponent`.
 */
export class PaginatorAdapter extends BaseAdapter<IPaginatorComponent> implements IPaginatorAdapter {
  private _labelElement: HTMLElement;
  private _root: HTMLElement;
  private _pageSizeSelect: ISelectComponent;
  private _rangeLabel: HTMLElement;
  private _rangeLabelAlternative: HTMLElement;
  private _firstPageButton: HTMLButtonElement;
  private _firstPageIconButton: IIconButtonComponent;
  private _firstPagePlaceholder: Comment;
  private _previousPageButton: HTMLButtonElement;
  private _nextPageButton: HTMLButtonElement;
  private _lastPageButton: HTMLButtonElement;
  private _lastPageIconButton: IIconButtonComponent;
  private _lastPagePlaceholder: Comment;

  constructor(component: IPaginatorComponent) {
    super(component);
    this._labelElement = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.LABEL);
    this._root = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.ROOT);
    this._pageSizeSelect = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.PAGE_SIZE_SELECT) as ISelectComponent;
    this._rangeLabel = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.RANGE_LABEL);
    this._rangeLabelAlternative = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.RANGE_LABEL_ALTERNATIVE);
    this._firstPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_BUTTON) as HTMLButtonElement;
    this._firstPageIconButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_ICON_BUTTON) as IIconButtonComponent;
    this._previousPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.PREVIOUS_PAGE_BUTTON) as HTMLButtonElement;
    this._nextPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.NEXT_PAGE_BUTTON) as HTMLButtonElement;
    this._lastPageButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_BUTTON) as HTMLButtonElement;
    this._lastPageIconButton = getShadowElement(component, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_ICON_BUTTON) as IIconButtonComponent;
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
    return !!getShadowElement(this._component, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_ICON_BUTTON);
  }

  public showFirstPageButton(): void {
    this._firstPagePlaceholder = toggleElementPlaceholder(
      this._component,
      true,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_ICON_BUTTON,
      this._firstPageIconButton,
      this._firstPagePlaceholder
    );
  }

  public hideFirstPageButton(): void {
    this._firstPagePlaceholder = toggleElementPlaceholder(
      this._component,
      false,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_ICON_BUTTON,
      this._firstPageIconButton,
      this._firstPagePlaceholder
    );
  }

  public hasLastPageButton(): boolean {
    return !!getShadowElement(this._component, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_ICON_BUTTON);
  }

  public showLastPageButton(): void {
    this._lastPagePlaceholder = toggleElementPlaceholder(
      this._component,
      true,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.LAST_PAGE_ICON_BUTTON,
      this._lastPageIconButton,
      this._lastPagePlaceholder
    );
  }

  public hideLastPageButton(): void {
    this._lastPagePlaceholder = toggleElementPlaceholder(
      this._component,
      false,
      PAGINATOR_CONSTANTS.elementName,
      PAGINATOR_CONSTANTS.selectors.LAST_PAGE_ICON_BUTTON,
      this._lastPageIconButton,
      this._lastPagePlaceholder
    );
  }

  public attachPageSizeChangeListener(listener: (evt: CustomEvent) => void): void {
    this._pageSizeSelect.addEventListener('change', listener);
  }

  public attachFirstPageListener(listener: (evt: Event) => void): void {
    this._firstPageButton.addEventListener('click', listener);
  }

  public attachPreviousPageListener(listener: (evt: Event) => void): void {
    this._previousPageButton.addEventListener('click', listener);
  }

  public attachNextPageListener(listener: (evt: Event) => void): void {
    this._nextPageButton.addEventListener('click', listener);
  }

  public attachLastPageListener(listener: (evt: Event) => void): void {
    this._lastPageButton.addEventListener('click', listener);
  }

  public detachPageSizeChangeListener(listener: (evt: CustomEvent) => void): void {
    this._pageSizeSelect.removeEventListener('change', listener);
  }

  public detachFirstPageListener(listener: (evt: Event) => void): void {
    this._firstPageButton.removeEventListener('click', listener);
  }

  public detachPreviousPageListener(listener: (evt: Event) => void): void {
    this._previousPageButton.removeEventListener('click', listener);
  }

  public detachNextPageListener(listener: (evt: Event) => void): void {
    this._nextPageButton.removeEventListener('click', listener);
  }

  public detachLastPageListener(listener: (evt: Event) => void): void {
    this._lastPageButton.removeEventListener('click', listener);
  }

  public disableFirstPageButton(): void {
    this._handleFocusMove('first');
    this._firstPageButton.setAttribute('disabled', 'disabled');
  }

  public enableFirstPageButton(): void {
    this._firstPageButton.removeAttribute('disabled');
  }

  public disablePreviousPageButton(): void {
    this._handleFocusMove('previous');
    this._previousPageButton.setAttribute('disabled', 'disabled');
  }

  public enablePreviousPageButton(): void {
    this._previousPageButton.removeAttribute('disabled');
  }

  public disableNextPageButton(): void {
    this._handleFocusMove('next');
    this._nextPageButton.setAttribute('disabled', 'disabled');
  }

  public enableNextPageButton(): void {
    this._nextPageButton.removeAttribute('disabled');
  }

  public disablePageSizeSelect(): void {
    this._handleFocusMove('page-size');
    this._pageSizeSelect.setAttribute('disabled', 'disabled');
  }

  public enablePageSizeSelect(): void {
    this._pageSizeSelect.removeAttribute('disabled');
  }

  public setPageSizeVisibility(visible: boolean): void {
    if (visible) {
      this._pageSizeSelect.style.removeProperty('display');
    } else {
      this._pageSizeSelect.style.display = 'none';
    }
  }

  public disableLastPageButton(): void {
    this._handleFocusMove('last');
    this._lastPageButton.setAttribute('disabled', 'disabled');
  }

  public enableLastPageButton(): void {
    this._lastPageButton.removeAttribute('disabled');
  }

  public setAlternative(alternative: boolean): void {
    toggleClass(this._root, alternative, PAGINATOR_CONSTANTS.classes.ALTERNATIVE);
  }

  public setAlignment(alignment: PaginatorAlternativeAlignment): void {
    removeClass([
      PAGINATOR_CONSTANTS.classes.ALIGNMENT_SPACE_BETWEEN,
      PAGINATOR_CONSTANTS.classes.ALIGNMENT_START,
      PAGINATOR_CONSTANTS.classes.ALIGNMENT_END
    ], this._root);

    switch (alignment) {
      case 'start':
        addClass(PAGINATOR_CONSTANTS.classes.ALIGNMENT_START, this._root);
        break;
      case 'end':
        addClass(PAGINATOR_CONSTANTS.classes.ALIGNMENT_END, this._root);
        break;
      case 'space-between':
      default:
        addClass(PAGINATOR_CONSTANTS.classes.ALIGNMENT_SPACE_BETWEEN, this._root);
        break;
    }
  }

  private _handleFocusMove(from: 'first' | 'last' | 'previous' | 'next' | 'page-size'): void {
    switch (from) {
      case 'first':
        this._tryFocus([
          this._nextPageButton,
          this._lastPageButton,
          this._previousPageButton,
          this._pageSizeSelect
        ]);
        break;
      case 'last':
        this._tryFocus([
          this._previousPageButton,
          this._firstPageButton,
          this._nextPageButton,
          this._pageSizeSelect
        ]);
        break;
      case 'previous':
        this._tryFocus([
          this._nextPageButton,
          this._lastPageButton,
          this._firstPageButton,
          this._pageSizeSelect
        ]);
        break;
      case 'next':
        this._tryFocus([
          this._previousPageButton,
          this._firstPageButton,
          this._lastPageButton,
          this._pageSizeSelect
        ]);
        break;
      case 'page-size':
        this._tryFocus([
          this._nextPageButton,
          this._lastPageButton,
          this._firstPageButton,
          this._previousPageButton
        ]);
        break;
    }
  }

  private _tryFocus(elements: Array<HTMLButtonElement | ISelectComponent>): void {
    for (const el of elements) {
      if (el && el.isConnected && !el.disabled) {
        el.focus();
        return;
      }
    }
  }
}
