import { PositionPlacement } from '../core/utils/position-utils';
import { IOverlayOffset, OverlayFlipState, OverlayPlacement, OverlayShiftState } from '../overlay/overlay-constants';
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
  popoverPlacement: OverlayPlacement;
  popoverOffset: IOverlayOffset;
  popoverFlip: OverlayFlipState;
  popoverShift: OverlayShiftState;
  popoverFallbackPlacements: PositionPlacement[] | null;
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
  protected _popoverPlacement: OverlayPlacement;
  protected _popoverOffset: IOverlayOffset;
  protected _popoverFlip: OverlayFlipState;
  protected _popoverShift: OverlayShiftState;
  protected _popoverFallbackPlacements: PositionPlacement[] | null;

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

  public get popoverPlacement(): OverlayPlacement {
    return this._popoverPlacement;
  }
  public set popoverPlacement(value: OverlayPlacement) {
    this._popoverPlacement = value;
  }

  public get popoverOffset(): IOverlayOffset {
    return this._popoverOffset;
  }
  public set popoverOffset(value: IOverlayOffset) {
    this._popoverOffset = value;
  }

  public get popoverFlip(): OverlayFlipState {
    return this._popoverFlip;
  }
  public set popoverFlip(value: OverlayFlipState) {
    this._popoverFlip = value;
  }

  public get popoverShift(): OverlayShiftState {
    return this._popoverShift;
  }
  public set popoverShift(value: OverlayShiftState) {
    this._popoverShift = value;
  }

  public get popoverFallbackPlacements(): PositionPlacement[] | null {
    return this._popoverFallbackPlacements;
  }
  public set popoverFallbackPlacements(value: PositionPlacement[] | null) {
    this._popoverFallbackPlacements = value;
  }

  protected _applySelection(): void {}
}
