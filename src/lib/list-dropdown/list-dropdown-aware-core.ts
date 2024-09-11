import { ListDropdownHeaderBuilder, ListDropdownFooterBuilder } from './list-dropdown-constants';

export interface IListDropdownAwareCore {
  popupClasses: string | string[];
  popupHeaderBuilder: ListDropdownHeaderBuilder;
  popupFooterBuilder: ListDropdownHeaderBuilder;
  syncPopupWidth: boolean;
  optionLimit: number;
  observeScroll: boolean;
  observeScrollThreshold: number;
  constrainPopupWidth: boolean;
  wrapOptionText: boolean;
}

export abstract class ListDropdownAwareCore implements IListDropdownAwareCore {
  protected _popupClasses: string | string[] = [];
  protected _popupHeaderBuilder: ListDropdownHeaderBuilder;
  protected _popupFooterBuilder: ListDropdownFooterBuilder;
  protected _syncPopupWidth = false;
  protected _optionLimit = 0;
  protected _observeScroll = false;
  protected _observeScrollThreshold = 0;
  protected _constrainPopupWidth = true;
  protected _wrapOptionText = false;

  public get syncPopupWidth(): boolean {
    return this._syncPopupWidth;
  }
  public set syncPopupWidth(value: boolean) {
    this._syncPopupWidth = value;
  }

  public get popupClasses(): string | string[] {
    return this._popupClasses;
  }
  public set popupClasses(value: string | string[]) {
    if (typeof value === 'string') {
      value = [value];
    }
    if (Array.isArray(value)) {
      this._popupClasses = value;
    }
  }

  public get observeScroll(): boolean {
    return this._observeScroll;
  }
  public set observeScroll(value: boolean) {
    this._observeScroll = value;
  }

  public get observeScrollThreshold(): number {
    return this._observeScrollThreshold;
  }
  public set observeScrollThreshold(value: number) {
    this._observeScrollThreshold = value;
  }

  public get optionLimit(): number {
    return this._optionLimit;
  }
  public set optionLimit(value: number) {
    this._optionLimit = value;
  }

  public get popupHeaderBuilder(): ListDropdownHeaderBuilder {
    return this._popupHeaderBuilder;
  }
  public set popupHeaderBuilder(value: ListDropdownHeaderBuilder) {
    this._popupHeaderBuilder = value;
  }

  public get popupFooterBuilder(): ListDropdownFooterBuilder {
    return this._popupFooterBuilder;
  }
  public set popupFooterBuilder(value: ListDropdownFooterBuilder) {
    this._popupFooterBuilder = value;
  }

  public get constrainPopupWidth(): boolean {
    return this._constrainPopupWidth;
  }
  public set constrainPopupWidth(value: boolean) {
    this._constrainPopupWidth = value;
  }

  public get wrapOptionText(): boolean {
    return this._wrapOptionText;
  }
  public set wrapOptionText(value: boolean) {
    this._wrapOptionText = value;
  }

  protected _applySelection(): void {}
}
