import { getEventPath, ICustomElementCore, isDefined } from '@tylertech/forge-core';

import { CalendarDirection, CalendarMenuAnimationType, CALENDAR_MENU_CONSTANTS } from './calendar-menu-constants';
import { ICalendarMenuAdapter } from './calendar-menu-adapter';
import { ICalendarMenuOption } from './calendar-menu-constants';

export interface ICalendarMenuCore extends ICustomElementCore {
  animationType: CalendarMenuAnimationType;
  preventFocus: boolean;
  animateIn(options: ICalendarMenuOption[], direction: CalendarDirection, setFocus: boolean): void;
  close(): void;
  moveFocusBackward(): boolean;
  moveFocusDown(): void;
  moveFocusForward(): boolean;
  moveFocusUp(): void;
  openAsGrid(options: ICalendarMenuOption[], setFocus: boolean): void;
  openAsList(options: ICalendarMenuOption[], setFocus: boolean): void;
  selectFocusedItem(): void;
}

export class CalendarMenuCore implements ICalendarMenuCore {
  private _animationType: CalendarMenuAnimationType = 'scale';
  private _columnCount = 3;
  private _focusedIndex = 0;
  private _focusedIndexAfterAnimation: number | undefined;
  private _list = false; // This will be used to manage focus in a list view
  private _open = false;
  private _options: ICalendarMenuOption[] = [];
  private _preventFocus = false;
  private _sliceEnd = -1;
  private _sliceStart = -1;
  private _clickListener: (evt: Event) => void;
  private _intersectionObserverCallback: IntersectionObserverCallback;

  constructor(private _adapter: ICalendarMenuAdapter) {
    this._clickListener = evt => this._onClick(evt);
    this._intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => this._onIntersection(entries);
  }

  public initialize(): void {
    this._applyAnimationType();
    this._applyPreventFocus();
    this._adapter.setHostAttribute('exportparts', Object.values(CALENDAR_MENU_CONSTANTS.parts).join(', '));
    this._adapter.toggleHostAttribute('hidden', true);
    this._adapter.registerClickListener(this._clickListener);
  }

  public disconnect(): void {
    this._adapter.unregisterClickListener(this._clickListener);
    this._adapter.unregisterIntersectionObserver();
  }

  public openAsGrid(options: ICalendarMenuOption[], setFocus: boolean): void {
    this._list = false;
    this._options = options;
    this._focusedIndex = 0;
    this._setColumnCount();
    this._adapter.setOpenAsGrid(options, this._focusedIndex, setFocus, this._preventFocus, this._open);
    this._setGridListeners();
    this._open = true;
    this._emitFocusChangeEvent();
  }

  public openAsList(options: ICalendarMenuOption[], setFocus: boolean): void {
    this._list = true;
    this._options = options;
    const currentSlice = this._getOptionSliceIncludingSelected();
    this._focusedIndex = Math.max(options.findIndex(o => o.selected), this._sliceStart);
    this._adapter.setOpenAsList(currentSlice, this._focusedIndex - this._sliceStart, setFocus, this._preventFocus, this._open);
    this._setListListeners();
    this._open = true;
    this._emitFocusChangeEvent();
  }

  public close(): void {
    this._open = false;
    this._options = [];
    this._adapter.setClosed();
  }

  public animateIn(options: ICalendarMenuOption[], direction: CalendarDirection, setFocus: boolean): void {
    const callback: () => void = () => {
      this._setFocusFromStoredIndex(setFocus);
    };
    if (direction === 'left') {
      this._adapter.animateInFromLeft(options, callback);
    } else {
      this._adapter.animateInFromRight(options, callback);
    }
    this._options = options;
    this._setColumnCount();
  }

  public selectFocusedItem(): void {
    this._adapter.emitHostEvent(CALENDAR_MENU_CONSTANTS.events.SELECT, this._options[this._focusedIndex]?.value);
  }

  public moveFocusBackward(): boolean {
    if (this._list) {
      return true;
    }
    const index = this._focusedIndex - 1;
    const indexIsInView = index >= 0 && index % this._columnCount !== this._columnCount - 1;
    this._focusedIndexAfterAnimation = indexIsInView ? undefined : index + this._columnCount;
    return this._tryMoveFocus(index, indexIsInView);
  }

  public moveFocusDown(): void {
    if (this._list) {
      const index = Math.min(this._focusedIndex += 1, this._options.length - 1);
      this._tryMoveFocus(index, true);
    } else {
      const index = this._focusedIndex + this._columnCount;
      const indexIsInView = index < this._options.length;
      this._focusedIndexAfterAnimation = indexIsInView ? undefined : index % this._columnCount;
      this._tryMoveFocus(index, indexIsInView);
    }
  }

  public moveFocusForward(): boolean {
    if (this._list) {
      return true;
    }
    const index = this._focusedIndex + 1;
    const indexIsInView = index < this._options.length && index % this._columnCount !== 0;
    this._focusedIndexAfterAnimation = indexIsInView ? undefined : index - this._columnCount;
    return this._tryMoveFocus(index, indexIsInView);
  }

  public moveFocusUp(): void {
    if (this._list) {
      const index = Math.max(this._focusedIndex -= 1, 0);
      this._tryMoveFocus(index, true);
    } else {
      const index = this._focusedIndex - this._columnCount;
      const indexIsInView = index >= 0;
      this._focusedIndexAfterAnimation = indexIsInView ? undefined : this._options.length + index;
      this._tryMoveFocus(index, indexIsInView);
    }
  }

  private _tryMoveFocus(index: number, indexIsInView: boolean): boolean {
    if (indexIsInView && !this._options[index]?.disabled) {
      this._focusedIndex = index;
      this._adapter.setFocusAtIndex(this._list ? this._focusedIndex - this._sliceStart : this._focusedIndex, true, this._preventFocus);
      this._emitFocusChangeEvent();
    }
    return indexIsInView;
  }

  private _setFocusFromStoredIndex(setFocus: boolean): void {
    if (this._focusedIndexAfterAnimation === undefined) {
      return;
    }
    if (this._options[this._focusedIndexAfterAnimation] && !this._options[this._focusedIndexAfterAnimation]?.disabled) {
      this._focusedIndex = this._focusedIndexAfterAnimation;
    } else if (this._options[0]?.disabled) {
      this._focusedIndex = this._options.findIndex(o => !o.disabled);
    } else {
      this._focusedIndex = this._options.length - this._options.slice().reverse().findIndex(o => !o.disabled) - 1;
    }
    this._focusedIndexAfterAnimation = undefined;
    this._adapter.setFocusAtIndex(this._focusedIndex, setFocus, this._preventFocus);
    this._emitFocusChangeEvent();
  }

  private _onClick(evt: Event): void {
    const element = getEventPath(evt).find(p => p.classList && p.classList.contains(CALENDAR_MENU_CONSTANTS.classes.ITEM));
    const value = element?.getAttribute(CALENDAR_MENU_CONSTANTS.attributes.DATA_VALUE);
    if (isDefined(value)) {
      this._adapter.emitHostEvent(CALENDAR_MENU_CONSTANTS.events.SELECT, +(value as string));
    }
  }

  private _onIntersection(entries: IntersectionObserverEntry[]): void {
    if (this._sliceStart > 0 && entries.some(e => e.target.id === CALENDAR_MENU_CONSTANTS.ids.SCROLL_SPY_TOP && e.isIntersecting)) {
      this._adapter.appendListItemsToStart(this._getPreviousOptionsSlice());
    }
    if (this._sliceEnd < this._options.length && entries.some(e => e.target.id === CALENDAR_MENU_CONSTANTS.ids.SCROLL_SPY_BOTTOM && e.isIntersecting)) {
      this._adapter.appendListItemsToEnd(this._getNextOptionsSlice());
    }
  }

  private _setColumnCount(): void {
    this._columnCount = this._options.length >= CALENDAR_MENU_CONSTANTS.numbers.LARGE_ITEM_SET ? CALENDAR_MENU_CONSTANTS.numbers.FOUR_COL : CALENDAR_MENU_CONSTANTS.numbers.THREE_COL;
  }

  private _emitFocusChangeEvent(): void {
    this._adapter.emitHostEvent(CALENDAR_MENU_CONSTANTS.events.FOCUS_CHANGE, this._options[this._focusedIndex]?.value);
  }

  private _setGridListeners(): void {
    this._adapter.unregisterIntersectionObserver();
  }

  private _setListListeners(): void {
    this._adapter.unregisterIntersectionObserver();
    this._adapter.registerIntersectionObserver(this._intersectionObserverCallback);
  }

  private _getOptionSliceIncludingSelected(): ICalendarMenuOption[] {
    if (this._options.length <= CALENDAR_MENU_CONSTANTS.numbers.LIST_SLICE_SIZE) {
      this._sliceStart = 0;
      this._sliceEnd = this._options.length;
      return this._options.slice();
    }

    const selectedIndex = Math.max(this._options.findIndex(o => o.selected), 0);
    let start = Math.max(Math.floor(selectedIndex - CALENDAR_MENU_CONSTANTS.numbers.LIST_SLICE_SIZE / 2), 0);
    let end = start + CALENDAR_MENU_CONSTANTS.numbers.LIST_SLICE_SIZE;
    if (end > this._options.length) {
      start = this._options.length - 1 - CALENDAR_MENU_CONSTANTS.numbers.LIST_SLICE_SIZE;
      end = this._options.length;
    }
    this._sliceStart = start;
    this._sliceEnd = end;
    return this._options.slice(this._sliceStart, this._sliceEnd);
  }

  private _getNextOptionsSlice(): ICalendarMenuOption[] {
    const newEnd = Math.min(this._sliceEnd + CALENDAR_MENU_CONSTANTS.numbers.LIST_SLICE_SIZE, this._options.length);
    const slice = this._options.slice(this._sliceEnd, newEnd);
    this._sliceEnd = newEnd;
    return slice;
  }

  private _getPreviousOptionsSlice(): ICalendarMenuOption[] {
    const newStart = Math.max(this._sliceStart - CALENDAR_MENU_CONSTANTS.numbers.LIST_SLICE_SIZE, 0);
    const slice = this._options.slice(newStart, this._sliceStart);
    this._sliceStart = newStart;
    return slice;
  }

  private _applyAnimationType(): void {
    this._adapter.setHostAttribute(CALENDAR_MENU_CONSTANTS.attributes.ANIMATION_TYPE, this._animationType);
    this._adapter.setAnimationType(this._animationType);
  }

  private _applyPreventFocus(): void {
    this._adapter.toggleHostAttribute(CALENDAR_MENU_CONSTANTS.attributes.PREVENT_FOCUS, this._preventFocus);
    this._adapter.setFocusAtIndex(this._focusedIndex, false, this._preventFocus);
  }

  public get animationType(): CalendarMenuAnimationType {
    return this._animationType;
  }
  public set animationType(value: CalendarMenuAnimationType) {
    if (this._animationType !== value) {
      this._animationType = value;
      this._applyAnimationType();
    }
  }

  public get preventFocus(): boolean {
    return this._preventFocus;
  }
  public set preventFocus(value: boolean) {
    if (this._preventFocus !== value) {
      this._preventFocus = value;
      this._applyPreventFocus();
    }
  }
}
