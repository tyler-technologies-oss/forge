import { ICustomElementFoundation, isArray, isDefined, isValidDate } from '@tylertech/forge-core';

import { ICalendarDate, ICalendarDisabledDateParams, ICalendarFocusChangeEventData, ICalendarMenuMonthConfig, ICalendarMenuYearConfig, ICalendarNumberRange, CALENDAR_CONSTANTS, CalendarDisabledDateBuilder, CalendarEventBuilder, CalendarMode, CalendarMonthFocus, CalendarView, DayOfWeek, ICalendarDateSelectEventData, RangeSelectionState, CalendarDateBuilder, CalendarDayBuilder, CalendarDateSelectCallback, ICalendarEvent, CalendarTooltipBuilder, ICalendarDateConfig } from './calendar-constants';
import { isDisabled, isSelected, getAllYearOptions, getDateRangeFromDates, getDatesFromDateRange, getDatesInRange, getEventDescriptions, getEventsOnDate, getFirstDateOfWeek, getIndexOfDate, getLastDateOfWeek, getMinAndMaxDates, getMonthDates, getMonthOptions, getMultipleFromRange, getSortedDaysOfWeek, getYearOptions, isInMonth, isToday, parseYearRange, sortDates, coerceDateFromValue, shouldHandleEvent } from './calendar-utils';
import { getFirstDayOfWeekForLocale, getLocalizedMonth, getLocalizedYear, getWeekendDaysForLocale, isRtlLocale } from './calendar-locale-utils';
import { eventIncludesDate } from './calendar-dom-utils';
import { ICalendarAdapter } from './calendar-adapter';
import { DateRange } from './core/date-range';
import { ICalendarBase } from './core/calendar-base';
import { CalendarMenuAnimationType, ICalendarMenuOption } from './calendar-menu';
import { getLastDateOfMonth, getMonthLength, isSameDate } from '../core/utils/date-utils';

export interface ICalendarFoundation extends ICalendarBase, ICustomElementFoundation {
  mode: CalendarMode;
  view: CalendarView;
  preventFocus: boolean;
  selectionFollowsMonth: boolean;
  showHeader: boolean;
  menuAnimation: CalendarMenuAnimationType;
  clearButton: boolean;
  todayButton: boolean;
  clearCallback: (() => void) | undefined;
  todayCallback: (() => void) | undefined;
  tooltipBuilder: CalendarTooltipBuilder | undefined;
  clear(): void;
  today(): void;
  selectDate(date: Date, setFocus?: boolean): void;
  deselectDate(date: Date, setFocus?: boolean): void;
  toggleDate(date: Date, force?: boolean): void;
  goToDate(date: Date, setFocus?: boolean): void;
  setActiveDate(date: Date, setFocus?: boolean): boolean;
  handleExternalKeyEvent(evt: KeyboardEvent): void;
  layout(): void;
}

export class CalendarFoundation implements ICalendarFoundation {
  // Dates
  private _dates: Date[] = [];
  private _month: number = new Date().getMonth();
  private _year: number = new Date().getFullYear();
  private _focusedDate: Date;
  private _showToday = true;
  private _showOtherMonths = false;
  private _fixedHeight = false;
  private _events: ICalendarEvent[] = [];
  private _dateBuilder: CalendarDateBuilder | undefined;
  private _dayBuilder: CalendarDayBuilder | undefined;
  private _tooltipBuilder: CalendarTooltipBuilder | undefined;
  private _eventBuilder: CalendarEventBuilder | undefined;
  
  // Selection
  private _value: Date[] = [];
  private _mode: CalendarMode = 'single';
  private _readonly = false;
  private _selectionFollowsMonth = false;
  private _dateSelectCallback: CalendarDateSelectCallback | undefined;

  // Range
  private _rangeSelectionStore: DateRange | undefined; // Temporarily set when a date range is set as the value, to maintain to and from
  private _rangeSelectionState: RangeSelectionState = 'none';
  private _allowSingleDateRange = true;

  // Disabled dates
  private _min: Date | null = null;
  private _max: Date | null = null;
  private _minAttribute: string | null = null;
  private _maxAttribute: string | null = null;
  private _disabledDates: Date[] = [];
  private _disabledDaysOfWeek: DayOfWeek[] = [];
  private _constrainToEnabled = true;
  private _disabledDateBuilder: CalendarDisabledDateBuilder | undefined;

  // Header and footer
  private _showHeader = true;
  private _clearButton = false;
  private _todayButton = false;
  private _clearCallback: (() => void) | undefined;
  private _todayCallback: (() => void) | undefined;
  
  // Menu
  private _view: CalendarView = 'date';
  private _menuAnimation: CalendarMenuAnimationType = 'scale';
  private _menuYear: number | null = null;
  private _listYears = true;
  private _menuIncludedYear: number = new Date().getFullYear();
  private _menuYearsInView: ICalendarNumberRange | null = null;
  private _yearRange = `-${CALENDAR_CONSTANTS.numbers.DEFAULT_MIN_YEAR_OFFSET}:+${CALENDAR_CONSTANTS.numbers.DEFAULT_MAX_YEAR_OFFSET}`;
  private _minYear: number; // This and _maxYear will be set in the initializer
  private _maxYear: number;

  // Localization
  private _locale: string | undefined;
  private _firstDayOfWeek: DayOfWeek | undefined;
  private _weekendDays: DayOfWeek[] | null = null;
  private _localeFirstDayOfWeek: DayOfWeek = DayOfWeek.Sunday;
  private _localeWeekendDays: DayOfWeek[] = [];
  private _rtl = false;

  // Core
  private _preventFocus = false;
  private _isInitialized = false;
  
  // Listeners
  private _clearButtonListener: (evt: Event) => void;
  private _dateClickListener: (evt: Event) => void;
  private _hoverListener: (evt: Event) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _menuFocusChangeListener: (evt: CustomEvent<number>) => void;
  private _menuListener: (evt: CustomEvent<number>) => void;
  private _monthButtonListener: (evt: Event) => void;
  private _nextButtonListener: (evt: Event) => void;
  private _preventFocusListener: (evt: Event) => void;
  private _previousButtonListener: (evt: Event) => void;
  private _todayButtonListener: (evt: Event) => void;
  private _yearButtonListener: (evt: Event) => void;

  constructor(private _adapter: ICalendarAdapter) {
    this._clearButtonListener = () => this._onClearClicked();
    this._dateClickListener = evt => this._onDateClick(evt);
    this._keydownListener = evt => this._onKeydown(evt);
    this._hoverListener = evt => this._onHover(evt);
    this._menuFocusChangeListener = evt => this._onMenuFocusChange(evt);
    this._menuListener = evt => this._onMenuSelect(evt);
    this._monthButtonListener = () => this._onMonthButtonClicked();
    this._nextButtonListener = () => this._onNextButtonClicked();
    this._preventFocusListener = evt => evt.preventDefault();
    this._previousButtonListener = () => this._onPreviousButtonClicked();
    this._todayButtonListener = () => this._onTodayClicked();
    this._yearButtonListener = () => this._onYearButtonClicked();
  }

  public initialize(): void {
    this._adapter.registerMenuListener(this._menuListener);
    this._adapter.registerMenuFocusChangeEventListener(this._menuFocusChangeListener);
    this._adapter.registerKeydownListener(this._keydownListener);
    this._applyMin();
    this._applyMax();
    this._applyFixedHeight();
    this._applyReadOnly();
    this._applyShowToday();
    this._applyPreventFocus();
    this._applyShowHeader();
    this._applyMonth();
    this._applyYear();
    this._applyListYears();
    this._applyMenuAnimation();
    this._applyLocale();
    this._applyClearButton();
    this._applyTodayButton();
    this._applyFirstDayOfWeek();
    this._applyShowOtherMonths();
    this._createDateView();
    this._applyConstrainToEnabled();
    this._applyAllowSingleDateRange();
    this._applyMode();
    this._applyYearRange();
    this._applySelectionFollowsMonth();

    this._isInitialized = true;
  }

  public disconnect(): void {
    this._isInitialized = false;
  }

  private _onMonthButtonClicked(): void {
    this._toggleMonthMenu();
  }

  private _toggleMonthMenu(setFocus = false): void {
    if (this._view !== 'month') {
      this._openMonthMenu(setFocus);
    } else {
      this._closeMenu(false, setFocus);
    }
  }

  private _onYearButtonClicked(): void {
    this._toggleYearMenu();
  }

  private _toggleYearMenu(setFocus = false): void {
    if (this._view !== 'year') {
      this._openYearMenu(setFocus);
    } else {
      this._closeMenu(false, setFocus);
    }
  }

  private _onMenuFocusChange(evt: CustomEvent<number>): void {
    this._emitFocusChangeEvent(evt.detail);
  }

  private _onMenuSelect(evt: CustomEvent<number>): void {
    switch (this._view) {
      case 'month':
        this._onMonthSelected(evt.detail);
        break;
      case 'year':
        this._onYearSelected(evt.detail);
        break;
    }
  }

  private _onNextButtonClicked(): void {
    if (this._view === 'date') {
      this._goToNextMonth();
      this._setFocusInMonth(CalendarMonthFocus.First, false);
    } else if (this._view === 'month') {
      this._goToNextYear();
    } else {
      this._goToNextSetOfYears();
    }
  }

  private _onPreviousButtonClicked(): void {
    if (this._view === 'date') {
      this._goToPreviousMonth();
      this._setFocusInMonth(CalendarMonthFocus.Last, false);
    } else if (this._view === 'month') {
      this._goToPreviousYear();
    } else {
      this._goToPreviousSetOfYears();
    }
  }

  private _onHover(evt: Event): void {
    if (this._mode === 'range') {
      const element = eventIncludesDate(evt, false);
      if (!element) {
        return;
      }
      const date = new Date(Date.parse(element.getAttribute(CALENDAR_CONSTANTS.attributes.DATA_DATE) as string));
      if (isInMonth(date, this._month, this._year)) {
        this._setRangePreview(date);
      }
    }
  }

  private _onDateClick(evt: Event): void {
    const element = eventIncludesDate(evt, false);
    if (!element) {
      return;
    }
    const dateString = element.getAttribute(CALENDAR_CONSTANTS.attributes.DATA_DATE);
    if (!dateString) {
      return;
    }
    const date = new Date(dateString);
    if (isInMonth(date, this._month, this._year)) {
      // Move the tab index to this date
      this._focusedDate = date;
      this._beforeDateSelected(date);
    }
    this._resumeTabindexOnDate(false);
  }

  private _onKeydown(evt: KeyboardEvent): void {
    switch(evt.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        this._handleArrowKey(evt);
        break;
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        this._handleNavigationKey(evt);
        break;
      case ' ':
      case 'Enter':
        this._handleEnterOrSpaceKey(evt);
        break;
      case 'm':
      case 'M':
        evt.preventDefault();
        this._toggleMonthMenu(true);
        break;
      case 'y':
      case 'Y':
        evt.preventDefault();
        this._toggleYearMenu(true);
        break;
      case 't':
      case 'T':
      case 'n':
      case 'N':
        evt.preventDefault();
        this.today();
        break;
      case 'Delete':
      case 'Backspace':
        evt.preventDefault();
        this._deselectAllDates();
        break;
      case 'Escape':
        if (this._view !== 'date') {
          evt.preventDefault();
          this._closeMenu(false, true);
        }
        break;
    }
  }

  /**
   * Runs locale specific logic to handle focus on an arrow key event.
   * @param evt A keyboard event containing an arrow key
   */
  private _handleArrowKey(evt: KeyboardEvent): void {
    if (!shouldHandleEvent(evt, this._view, this._preventFocus)) {
      return;
    }

    evt.preventDefault();
    let direction: 'next' | 'previous' | 'up' | 'down' | undefined;
    switch(evt.key) {
      case 'ArrowLeft':
        direction = this._rtl ? 'next' : 'previous';
        break;
      case 'ArrowRight':
        direction = this._rtl ? 'previous' : 'next';
        break;
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
    }

    switch(direction) {
      case 'previous':
        if (this._view === 'date') {
          this._moveFocusToPreviousDate(true);
        } else if (!this._adapter.moveMenuFocusBackward() && this._canGoBackward()) {
          if (this._view === 'month') {
            this._goToPreviousYear(true);
          } else {
            this._goToPreviousSetOfYears(true);
          }
        }
        break;
      case 'next':
        if (this._view === 'date') {
          this._moveFocusToNextDate(true);
        } else if (!this._adapter.moveMenuFocusForward() && this._canGoForward()) {
          if (this._view === 'month') {
            this._goToNextYear(true);
          } else {
            this._goToNextSetOfYears(true);
          }
        }
        break;
      case 'up':
        if (this._view === 'date') {
          this._moveFocusToPreviousWeek(true);
        } else {
          this._adapter.moveMenuFocusUp();
        }
        break;
      case 'down':
        if (this._view === 'date') {
          this._moveFocusToNextWeek(true);
        } else {
          this._adapter.moveMenuFocusDown();
        }
        break;
    }

    if (this._mode === 'range') {
      this._setRangePreview(this._focusedDate);
    }
  }

  /** Moves between months and years if allowed.
   * @param evt A keyboard evt containing the page up, page down, home, or end key
   */
  private _handleNavigationKey(evt: KeyboardEvent): void {
    evt.preventDefault();
    switch(evt.key) {
      case 'Home':
        if (this._view !== 'date') {
          break;
        }
        if (evt.shiftKey) {
          this._moveFocusToFirstOfMonth(true);
        } else {
          this._moveFocusToFirstOfWeek(true);
        }
        break;
      case 'End':
        if (this._view !== 'date') {
          break;
        }
        if (evt.shiftKey) {
          this._moveFocusToLastOfMonth(true);
        } else {
          this._moveFocusToLastOfWeek(true);
        }
        break;
      case 'PageUp':
        if (this._view === 'date') {
          if (evt.shiftKey) {

            this._moveFocusToPreviousYear(true);
          } else {
            this._moveFocusToPreviousMonth(true);
          }
        } else if (this._view === 'month' && !evt.shiftKey && this._canGoBackward()) {
          this._goToPreviousYear(true);
        } else if (this._view === 'year' && !evt.shiftKey && this._canGoBackward()) {
          this._goToPreviousSetOfYears(true);
        }
        break;
      case 'PageDown':
        if (this._view === 'date') {
          if (evt.shiftKey) {
            this._moveFocusToNextYear(true);
          } else {
            this._moveFocusToNextMonth(true);
          }
        } else if (this._view === 'month' && !evt.shiftKey && this._canGoForward()) {
          this._goToNextYear(true);
        } else if (this._view === 'year' && !evt.shiftKey && this._canGoForward()) {
          this._goToNextSetOfYears(true);
        }
        break;
    }
  }

  /**
   * Selects or deselects the focused date or menu option if allowed.
   * @param evt A keyboard event containing the enter or space key
   */
  private _handleEnterOrSpaceKey(evt: KeyboardEvent): void {
    if (!shouldHandleEvent(evt, this._view, this._preventFocus)) {
      return;
    }

    evt.preventDefault();
    switch(this._view) {
      case 'date':
        if (this._readonly) {
          break;
        }
        this._setSelectOnFocusedDate();
        break;
      case 'month':
      case 'year':
        this._adapter.selectFocusedMenuItem();
        break;
    }
  }

  private _onMonthSelected(month: number): void {
    const yearChanged = this._year !== this._menuYear;
    if (yearChanged && this._menuYear !== null) {
      this._year = this._menuYear;
      this._setYear();
    }
    this._month = month;
    this._setMonth(true);
    this._trySetValueMonthAndYear(this._month, this._year, 'month');
    this._closeMenu(true);
  }

  private _onYearSelected(year: number): void {
    this._year = year;
    this._setYear(true);
    this._trySetValueMonthAndYear(this._month, this._year, 'year');
    this._closeMenu(true);
  }

  private _onClearClicked(): void {
    this.clear();
  }

  private _onTodayClicked(): void {
    this.today();
  }

  /** Attempts to the month and year of the value in single mode, then emits a selection event  */
  private _trySetValueMonthAndYear(month: number, year: number, type: CalendarView = 'date'): void {
    if (!this.selectionFollowsMonth || this._mode !== 'single' || !this._value?.length) {
      return;
    }

    const newDate = new Date(this._value[0]);
    const lastDay = getMonthLength(month, year);
    newDate.setDate(Math.min(newDate.getDate(), lastDay));
    newDate.setFullYear(year);
    newDate.setMonth(month);

    if (isDisabled(newDate, this._getDisabledDateParams())) {
      return;
    }

    this._beforeDateSelected(newDate, type);
  }

  /** Sets initial date tabindex and focus to today or the first enabled date in view */
  private _setInitialDateFocus(setFocus = false): void {
    const today = new Date();
    if (isInMonth(today, this._month, this._year) && !isDisabled(today, this._getDisabledDateParams(false))) {
      this._setFocusedDate(today, setFocus);
      return;
    }
    const firstDay = new Date(this._year, this._month, 1);
    this._setFocusedDate(this._getNextEnabledDate(firstDay, 1, false, true, true), setFocus);
  }

  /** Attempts to move the tabindex to the most recently focused date, returning whether the date was found in view */
  private _resumeTabindexOnDate(setFocus: boolean): boolean {
    if (isInMonth(this._focusedDate, this._month, this._year)) {
      this._adapter.setActiveDate(this._focusedDate, setFocus, this._preventFocus);
      this._emitFocusChangeEvent(this._focusedDate);
      return true;
    }
    return false;
  }

  /** Moves the tabindex to the next date */
  private _moveFocusToNextDate(setFocus: boolean): void {
    this._setFocusedDate(this._getNextEnabledDate(this._focusedDate), setFocus);
  }

  /** Moves the tabindex to the previous date */
  private _moveFocusToPreviousDate(setFocus: boolean): void {
    this._setFocusedDate(this._getPreviousEnabledDate(this._focusedDate), setFocus);
  }

  /** Moves the tabindex to the next week */
  private _moveFocusToNextWeek(setFocus: boolean): void {
    this._setFocusedDate(this._getNextEnabledDate(this._focusedDate, 7, true), setFocus);
  }

  /** Moves the tabindex to the previous week */
  private _moveFocusToPreviousWeek(setFocus: boolean): void {
    this._setFocusedDate(this._getPreviousEnabledDate(this._focusedDate, 7, true), setFocus);
  }

  /** Moves the tabindex to the first selectable date of the week containing the current tabindex */
  private _moveFocusToFirstOfWeek(setFocus: boolean): void {
    this._setFocusedDate(this._getFirstEnabledDayOfWeek(this._focusedDate, true), setFocus);
  }

  /** Moves the tabindex to the last selectable date of the week containing the current tabindex */
  private _moveFocusToLastOfWeek(setFocus: boolean): void {
    this._setFocusedDate(this._getLastEnabledDayOfWeek(this._focusedDate, true), setFocus);
  }

  /** Moves the tabindex to the first date of the month */
  private _moveFocusToFirstOfMonth(setFocus: boolean): void {
    const firstOfMonth = new Date(this._year, this._month, 1);
    this._setFocusedDate(this._getNextEnabledDate(firstOfMonth, 1, false, true), setFocus);
  }

  /** Moves the tabindex to the last date of the month */
  private _moveFocusToLastOfMonth(setFocus: boolean): void {
    const lastOfMonth = new Date(this._year, this._month + 1, 0);
    this._setFocusedDate(this._getPreviousEnabledDate(lastOfMonth, 1, false, true), setFocus);
  }

  /** Moves the tabindex to the same day and week of the next month */
  private _moveFocusToNextMonth(setFocus: boolean): void {
    const index = getIndexOfDate(this._focusedDate, this._dates);
    const destinationMonth = (this._month + 1) % 12;
    const destinationYear = destinationMonth === 0 ? this._year + 1 : this._year;
    this._setFocusedDate(this._getDateAtIndexInMonth(index, destinationMonth, destinationYear), setFocus);
  }

  /** Moves the tabindex to the same day and week of the previous month */
  private _moveFocusToPreviousMonth(setFocus: boolean): void {
    const index = getIndexOfDate(this._focusedDate, this._dates);
    const destinationMonth = this._month === 0 ? 11 : this._month - 1;
    const destinationYear = destinationMonth === 11 ? this._year - 1 : this._year;
    this._setFocusedDate(this._getDateAtIndexInMonth(index, destinationMonth, destinationYear), setFocus);
  }

  /** Moves the tabindex to the same day, week, and month of the next year */
  private _moveFocusToNextYear(setFocus: boolean): void {
    const index = getIndexOfDate(this._focusedDate, this._dates);
    this._setFocusedDate(this._getDateAtIndexInMonth(index, this._month, this._year + 1), setFocus);
  }

  /** Moves the tabindex to the same day, week, and month of the previous year */
  private _moveFocusToPreviousYear(setFocus: boolean): void {
    const index = getIndexOfDate(this._focusedDate, this._dates);
    this._setFocusedDate(this._getDateAtIndexInMonth(index, this._month, this._year - 1), setFocus);
  }

  /** Sets the focusable date when a new month comes into view */
  private _setFocusInMonth(focus: CalendarMonthFocus, setFocus: boolean): void {
    switch (focus) {
      case CalendarMonthFocus.First:
        this._moveFocusToFirstOfMonth(setFocus);
        break;
      case CalendarMonthFocus.Last:
        this._moveFocusToLastOfMonth(setFocus);
        break;
      default:
        this._resumeTabindexOnDate(setFocus);
        break;
    }
  }

  /** Selects or deselects the focused date */
  private _setSelectOnFocusedDate(): void {
    if (isInMonth(this._focusedDate, this._month, this._year) && !isDisabled(this._focusedDate, this._getDisabledDateParams(false))) {
      this._beforeDateSelected(this._focusedDate);
    }
  }

  /** Emits a focus change event */
  private _emitFocusChangeEvent(value: Date | number): void {
    const eventData: Partial<ICalendarFocusChangeEventData> = {
      type: this._view,
      value
    };
    switch (this._view) {
      case 'date':
        eventData.selected = isSelected(value as Date, this._value);
        eventData.text = (value as Date).toLocaleDateString(this.locale, {month: 'long', day: '2-digit', year: 'numeric'});
        break;
      case 'month':
        eventData.selected = this._month === value;
        eventData.text = getLocalizedMonth(value as number, 'long');
        break;
      case 'year':
        eventData.selected = this._year === value;
        eventData.text = getLocalizedYear(value as number, 'numeric');
        break;
    }
    this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.FOCUS_CHANGE, eventData);
  }

  /**
   * Finds the previous enabled date.
   * @param start The date to search backward from
   * @param step A number of dates to skip at each step, defaults to 1
   * @param stepOnce Whether to use the step amount once and then continue sequentially, defaults to false
   * @param includeStart Whether to first check and potentially return the start date, defaults to false
   * @returns The previous enabled date or null if none found
   */
  private _getPreviousEnabledDate(start: Date, step = 1, stepOnce = false, includeStart = false, inMonth = false): Date | null {
    const disabledParams = this._getDisabledDateParams();
    const current = new Date(start);
    if (includeStart && !isDisabled(current, disabledParams)) {
      return current;
    }

    const month = start.getMonth();
    let outsideBounds = false;
    do {
      current.setDate(current.getDate() - step);
      if (stepOnce) {
        step = 1;
      }
      if ((inMonth && current.getMonth() !== month) || (this._min && current < this._min)) {
        outsideBounds = true;
      }
    } while (!outsideBounds && isDisabled(current, disabledParams));
    return outsideBounds ? null : current;
  }

  /**
   * Finds the previous enabled date.
   * @param start The date to search forward from
   * @param step A number of dates to skip at each step, defaults to 1
   * @param stepOnce Whether to use the step amount once and then continue sequentially, defaults to false
   * @param includeStart Whether to first check and potentially return the start date, defaults to false
   * @returns The next enabled date or null if none found
   */
  private _getNextEnabledDate(start: Date, step = 1, stepOnce = false, includeStart = false, inMonth = false): Date | null {
    const disabledParams = this._getDisabledDateParams();
    const current = new Date(start);
    if (includeStart && !isDisabled(current, disabledParams)) {
      return current;
    }

    const month = start.getMonth();
    let outsideBounds = false;
    do {
      current.setDate(current.getDate() + step);
      if (stepOnce) {
        step = 1;
      }
      if ((inMonth && current.getMonth() !== month) || (this._max && current > this._max)) {
        outsideBounds = true;
      }
    } while (!outsideBounds && isDisabled(current, disabledParams));
    return outsideBounds ? null : current;
  }

  /**
   * Finds the closest enabled date.
   * @param start The date to begin searching from
   * @param includeStart Whether to first check and potentially return the start date, defaults to false
   * @returns The closest enabled date or null if none found
   */
  private _getClosestEnabledDate(start: Date, inMonth = false, includeStart = false): Date | null {
    if (this._min && start < this._min) {
      return this._getFirstEnabledDate();
    } else if (this._max && start > this._max) {
      return this._getLastEnabledDate();
    }

    const disabledParams = this._getDisabledDateParams();
    if (includeStart && !isDisabled(start, disabledParams)) {
      return new Date(start);
    }
    const startDate = start.getDate();
    let current: Date;
    let overMax = false;
    let underMin = false;
    let index = 1;
    while (!overMax || !underMin) {
      if (!overMax) {
        current = new Date(start);
        current.setDate(startDate + index);
        overMax = !isInMonth(current, start.getMonth(), start.getFullYear());
        if (!overMax && !isDisabled(current, disabledParams)) {
          return current;
        } else if (this._max && current > this._max) {
          overMax = true;
        }
      }
      if (!underMin) {
        current = new Date(start);
        current.setDate(startDate - index);
        underMin = !isInMonth(current, start.getMonth(), start.getFullYear());
        if (!underMin && !isDisabled(current, disabledParams)) {
          return current;
        } else if (this._min && current < this._min) {
          underMin = true;
        }
      }
      index += 1;
    }
    return null;
  }

  /**
   * Finds the first enabled date of a week.
   * @param date A date that falls in the requested week
   * @returns The first enabled date of the week or null if none found
   */
  private _getFirstEnabledDayOfWeek(date: Date, inMonth = true): Date | null {
    const current = getFirstDateOfWeek(date);
    const disabledParams = this._getDisabledDateParams(inMonth ? current.getMonth() !== date.getMonth() || current.getFullYear() !== date.getFullYear() : undefined);
    let index = 0;
    while (index < 7 && isDisabled(current, disabledParams)) {
      current.setDate(current.getDate() + 1);
      disabledParams.otherMonth = inMonth ? current.getMonth() !== date.getMonth() || current.getFullYear() !== date.getFullYear() : undefined;
      index += 1;
    }
    return index < 7 ? current : null;
  }

  /**
   * Finds the last enabled date of a week.
   * @param date A date that falls in the requested week
   * @returns The last enabled date of the week or null if none found
   */
  private _getLastEnabledDayOfWeek(date: Date, inMonth = true): Date | null {
    const current = getLastDateOfWeek(date);
    const disabledParams = this._getDisabledDateParams(inMonth ? current.getMonth() !== date.getMonth() || current.getFullYear() !== date.getFullYear() : undefined);
    let index = 0;
    while (index < 7 && isDisabled(current, disabledParams)) {
      current.setDate(current.getDate() - 1);
      disabledParams.otherMonth = inMonth ? current.getMonth() !== date.getMonth() || current.getFullYear() !== date.getFullYear() : undefined;
      index += 1;
    }
    return index < 7 ? current : null;
  }

  /**
   * Finds an enabled date with the same index in another month, skipping forward or back one week if that date falls in an adjacent month.
   * @param index The index to look up
   * @param month The month to look up
   * @param year The year of the month
   * @returns An enabled date with the same index plus or minus a week, the nearest enabled date, or null if no enabled date was found
   */
  private _getDateAtIndexInMonth(index: number, month: number, year: number): Date | null {
    const monthDates = getMonthDates(month, year, this._firstDayOfWeek ?? this._localeFirstDayOfWeek);
    // If outside the min or max date pick the first or last enabled date
    if (this._min && monthDates[index] < this._min) {
      return this._getFirstEnabledDate();
    } else if (this._max && monthDates[index] > this._max) {
      return this._getLastEnabledDate();
    }

    // If the index is in another month go forward or back a week based on which half of the month the index is nearest
    if (isInMonth(monthDates[index], month, year)) {
      return this._getClosestEnabledDate(monthDates[index], true);
    }
    return index < 20 ? this._getNextEnabledDate(monthDates[index], 7, true) : this._getPreviousEnabledDate(monthDates[index], 7, true);
  }

  /**
   * Finds the first enabled date.
   * @returns This first enabled date or null if a min date isn't set
   */
  private _getFirstEnabledDate(): Date | null {
    if (!this._min) {
      return null;
    }
    return this._getNextEnabledDate(this._min, 1, false, true);
  }

  /**
   * Finds the last enabled date.
   * @returns This last enabled date or null if a max date isn't set
   */
  private _getLastEnabledDate(): Date | null {
    if (!this._max) {
      return null;
    }
    return this._getPreviousEnabledDate(this._max, 1, false, true);
  }

  /**
   * Moves the month in view to a date, sets focus on the date, and emits a focus change event.
   * @param date The date to focus or null if focus should not move
   * @param setFocus Whether to truly focus the date element versus just setting its tabindex
   * @returns Void
   */
  private _setFocusedDate(date: Date | null, setFocus: boolean): void {
    if (!date) {
      return;
    }
    const monthChanged = this._month !== date.getMonth();
    const yearChanged = this._year !== date.getFullYear();
    if (monthChanged || yearChanged) {
      if (monthChanged) {
        this._month = date.getMonth();
        this._setMonth();
      }
      if (yearChanged) {
        this._year = date.getFullYear();
        this._setYear();
      }
      this._resetDateGrid();
    }
    this._focusedDate = date;
    this._adapter.setActiveDate(this._focusedDate, setFocus, this._preventFocus);
    this._emitFocusChangeEvent(this._focusedDate);
  }

  /**
   * Gets disabled date params.
   * @param otherMonth Whether the date is outside the month in view - only set if needed
   * @returns An ICalendarDisabledDateParams object
   */
  private _getDisabledDateParams(otherMonth?: boolean): ICalendarDisabledDateParams {
    return {
      builder: this._disabledDateBuilder,
      disabledDates: this._disabledDates,
      disabledDaysOfWeek: this._disabledDaysOfWeek,
      maxDate: this._max,
      minDate: this._min,
      otherMonth
    };
  }

  /**
   * Builds dates for the period in view, sets them to the DOM, and enables focus on one of them.
   */
  private _createDateView(): void {
    this._resetDateGrid();
    if (!this._focusedDate || !this._resumeTabindexOnDate(false)) {
      this._setInitialDateFocus();
    }
  }

  /**
   * Initiates month navigation and opens the month menu on the year in view.
   */
  private _openMonthMenu(setFocus = false): void {
    this._view = 'month';
    if (this._menuYear === null) {
      this._menuYear = this._year;
    }
    if (this._showHeader) {
      this._setNavButtonLabels();
      this._adapter.setMonthButtonPressed(true);
      this._adapter.setYearButtonPressed(false);
    }
    this._adapter.openMenuAsGrid(this._getMonthsForMenu(), setFocus);
    this._adapter.setDateViewHidden(true);
    this._setNavigationButtonStates();
    this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.VIEW_CHANGE, this._view);
  }

  /**
   * Initiates year navigation and opens the year menu.
   */
  private _openYearMenu(setFocus = false): void {
    this._view = 'year';
    this._menuIncludedYear = this._menuYear ?? this._year;
    if (this._showHeader) {
      this._setNavButtonLabels();
      this._adapter.setMonthButtonPressed(false);
      this._adapter.setYearButtonPressed(true);
    }
    if (this._listYears) {
      this._adapter.openMenuAsList(this._getYearsForMenu(), setFocus);
    } else {
      this._adapter.openMenuAsGrid(this._getYearsForMenu(), setFocus);
    }
    this._adapter.setDateViewHidden(true);
    this._setNavigationButtonStates();
    this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.VIEW_CHANGE, this._view);
  }

  /**
   * Gets the months to display in the menu.
   * @returns An array of ICalendarMenuOptions containing months
   */
  private _getMonthsForMenu(): ICalendarMenuOption[] {
    const config: ICalendarMenuMonthConfig = {
      locale: this._locale,
      max: this._max,
      min: this._min,
      selectedMonth: this._year === this._menuYear ? this._month : -1,
      selectedYear: this._menuYear ?? this._year
    };
    return getMonthOptions(config);
  }

  /**
   * Gets the years to display in the menu, either a slice of visible years or all possible years.
   * @returns An array of ICalendarMenuOptions containing years
   */
  private _getYearsForMenu(): ICalendarMenuOption[] {
    const min = this._min ? this._min.getFullYear() : this._minYear;
    const max = this._max ? this._max.getFullYear() : this._maxYear;

    const config: ICalendarMenuYearConfig = {
      locale: this._locale,
      max,
      min,
      selectedYear: this._year,
      yearInView: this._menuIncludedYear
    };
    const options = this._listYears ? getAllYearOptions(config) : getYearOptions(config);
    this._menuYearsInView = { min: options[0].value, max: options[options.length - 1].value };
    return options;
  }

  /**
   * Closes the menu and reapplies labels and focus for the date view.
   * @param valueSelected Whether the user made a selection that requires the date view to be rebuilt
   */
  private _closeMenu(valueSelected?: boolean, setFocus = false): void {
    this._view = 'date';
    this._menuYear = null;
    this._adapter.closeMenu();
    this._adapter.setDateViewHidden(false);
    this._adapter.setYear(this._year, this._locale);
    if (valueSelected) {
      this._resetDateGrid();
    }
    if (this._showHeader) {
      this._setNavButtonLabels();
      this._setNavigationButtonStates();
      this._adapter.setMonthButtonPressed(false);
      this._adapter.setYearButtonPressed(false);
    }
    if (!this._resumeTabindexOnDate(setFocus)) {
      this._setInitialDateFocus(setFocus);
    }
    this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.VIEW_CHANGE, this._view);
  }

  /**
   * Sets the labels on the previous and next buttons appropriate for the view.
   */
  private _setNavButtonLabels(): void {
    switch(this._view) {
      case 'date':
        this._adapter.setPreviousButtonLabel('Previous month');
        this._adapter.setNextButtonLabel('Next month');
        break;
      case 'month':
        this._adapter.setPreviousButtonLabel('Previous year');
        this._adapter.setNextButtonLabel('Next year');
        break;
      case 'year':
        this._adapter.setPreviousButtonLabel('Previous years');
        this._adapter.setNextButtonLabel('Next years');
        break;
    }
  }

  /**
   * Rebuilds all dates and resets the date grid.
   * */
  private _resetDateGrid(): void {
    this._dates = getMonthDates(this._month, this._year, this._firstDayOfWeek ?? this._localeFirstDayOfWeek);

    const dateConfigs: ICalendarDateConfig[] = this._dates.map(d => this._getDateConfig(d));
    this._adapter.setDates(dateConfigs, { builder: this._dateBuilder, locale: this._locale, showOtherMonths: this._showOtherMonths});

    this._setNavigationButtonStates();
    this._applyWeekendDays();
    this._applyEvents();

    if (this._mode === 'range') {
      this._adapter.setRangeStart(this._value[0]);
      this._setRangePreview();
    }
  }

  /**
   * Creates a date config object from the given date.
   * @param date The date
   * @returns A date config
   */
  private _getDateConfig(date: Date): ICalendarDateConfig {
    const thisMonth = isInMonth(date, this._month, this._year);
    const config: ICalendarDateConfig = {
      date: new Date(date),
      selected: isSelected(date, this._value),
      today: isToday(date),
      thisMonth,
      disabled: isDisabled(date, this._getDisabledDateParams(!thisMonth))
    };
    return config;
  }

  /**
   * Creates a calendar date object from the given date.
   * @param date The date
   * @returns A calendar date object
   */
  private _getCalendarDate(date: Date): ICalendarDate {
    return {
      date: new Date(date),
      selected: isSelected(date, this._value),
      events: getEventsOnDate(date, this._events, this._eventBuilder)
    };
  }

  /**
   * Sets events to display on a date in the DOM, including overflow and tooltips.
   * @param date The date to set events on
   */
  private _setEventsOnDate(date: Date): void {
    if (!this._showOtherMonths && !isInMonth(date, this._month, this._year)) {
      this._adapter.setEventWrapperOnDate(date, false);
      return;
    }

    const events: ICalendarEvent[] = getEventsOnDate(date, this._events, this._eventBuilder);
    this._adapter.setEventWrapperOnDate(date, !!events.length);
    events.forEach((e, i) => {
      if (i > 2) {
        return;
      }
      this._adapter.setEvent(e, i === 2 && events.length > 3);
    });
    let description = events.length ? getEventDescriptions(events) : '';
    if (this._tooltipBuilder) {
      description = this._tooltipBuilder(this._getCalendarDate(date), description) ?? '';
    }
    this._adapter.setDateTooltip(date, description);
  }

  /**
   * Provides a hook to intercept date selection events.
   * @param date The date that was selected
   * */
  private _beforeDateSelected(date: Date, type: CalendarView = 'date'): void {
    if (this._dateSelectCallback) {
      Promise.resolve(this._dateSelectCallback(this._getCalendarDate(date))).then(res => {
        if (res) {
          this._onDateSelected(date, undefined, type);
        }
      });
    } else {
      this._onDateSelected(date, undefined, type);
    }
  }

  /**
   * Runs mode dependent logic to manage selected dates and emit selection events.
   * @param date The date that was selected
   * @param force Whether the date should be selected or deselected, regardless of its prior state (optional)
   * */
  private _onDateSelected(date: Date, force?: boolean, type: CalendarView = 'date'): void {
    if (this._mode === 'range' && this._emitRangeSelectionEvent(date)) {
      this._applyRangeSelection(date);
      this._rangeSelectionStore = undefined;
      return;
    }

    const selected = isSelected(date, this._value);
    const event: ICalendarDateSelectEventData = {
      date: new Date(date),
      selected,
      type
    };
    const isAllowed = this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.DATE_SELECT, event, true, true);

    if (!isAllowed) {
      return;
    }
    this._rangeSelectionStore = undefined;

    if (this._mode === 'single') {
      if ((selected && !force) || force === false) {
        this._deselectDate(date);
      } else if (force === undefined || force === true) {
        if (this._value.length) {
          this._deselectDate(this._value[0]);
        }
        this._selectDate(date);
      }
    } else {
      if ((selected && !force) || force === false) {
        this._deselectDate(date);
      } else if (force === undefined || force === true) {
        this._selectDate(date);
      }
    }

    sortDates(this._value);
  }

  /**
   * Emits a date select event with range data.
   * @param date The selected date.
   * @returns True if the event was not cancelled.
   */
  private _emitRangeSelectionEvent(date: Date): boolean {
    const event: ICalendarDateSelectEventData = {
      date: new Date(date),
      selected: isSelected(date, this._value),
      type: 'date'
    };

    // Build the event without affecting the calendar's state
    switch (this._rangeSelectionState) {
      case 'none':
      case 'to':
        event.range = getDateRangeFromDates([date]);
        event.rangeSelectionState = 'from';
        break;
      case 'from':
        if (isSameDate(date, this._value[0])) {
          if (this._allowSingleDateRange) {
            event.range = getDateRangeFromDates([this._value[0], date]);
            event.rangeSelectionState = 'to';
          } else {
            event.range = getDateRangeFromDates([]);
            event.rangeSelectionState = 'none';
          }
        } else if (date < this._value[0]) {
          event.range = getDateRangeFromDates([date]);
          event.rangeSelectionState = 'from';
        } else {
          event.range = getDateRangeFromDates([this._value[0], date]);
          event.rangeSelectionState = 'to';
        }
        break;
    }

    return this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.DATE_SELECT, event, true, true);
  }

  /**
   * Manages the current selection state and value from a selection when in range mode.
   * @param date The selected date
   * */
  private _applyRangeSelection(date: Date): void {
    switch (this._rangeSelectionState) {
      case 'none':
      case 'to':
        this._deselectAllDates();
        this._selectDate(date);
        this._adapter.setRange(null);
        this._adapter.setRangeStart(date);
        this._rangeSelectionState = 'from';
        break;
      case 'from':
        if (isSameDate(date, this._value[0])) {
          if (this._allowSingleDateRange) {
            this._value.push(date);
            this._rangeSelectionState = 'to';
          } else {
            this._deselectDate(date);
            this._rangeSelectionState = 'none';
          }
        } else if (date < this._value[0]) {
          this._deselectDate(this._value[0]);
          this._selectDate(date);
          this._adapter.setRangeStart(date);
        } else {
          this._selectDate(date);
          this._setRangePreview(date);
          this._rangeSelectionState = 'to';
        }
        break;
    }
  }

  /**
   * Sets the properties to display range selections.
   * @param toDate The date that the range preview should end on if an end date isn't already selected (optional)
   * */
  private _setRangePreview(toDate?: Date): void {
    switch (this._rangeSelectionState) {
      case 'from':
        if (!toDate) {
          return;
        }
        if (toDate < this._value[0]) {
          this._adapter.setRange(null);
        } else {
          this._adapter.setRange(getDatesInRange(this._dates, this._value[0], toDate));
          this._adapter.setRangeEnd(toDate);
        }
        break;
      case 'to':
        this._adapter.setRange(getDatesInRange(this._dates, this._value[0], this._value[1]));
        this._adapter.setRangeEnd(this._value[1]);
        break;
    }
  }

  /**
   * Removes the range preview.
   */
  private _clearRangePreview(): void {
    this._adapter.setRange(null);
    this._adapter.setRangeStart(null);
    this._adapter.setRangeEnd(null);
  }

  /**
   * Adds a date to the value array and sets it selected in the adapter.
   * @param date The date to select
   * */
  private _selectDate(date: Date): void {
    this._value.push(date);
    this._focusedDate = date;
    this._adapter.setDateSelected(date, true);
  }

  /**
   * Removes a date from the value array and sets it deselected in the adapter.
   * @param date The date to deselect
   * */
  private _deselectDate(date: Date): void {
    const index = this._value.findIndex(d => isSameDate(d, date));
    if (index > -1) {
      this._value.splice(index, 1);
    }
    this._adapter.setDateSelected(date, false);
  }

  /**
   * Clears the value array and sets all dates deselected in the adapter.
   * */
  private _deselectAllDates(): void {
    this._value.forEach(d => this._adapter.setDateSelected(d, false));
    this._clearRangePreview();
    this._value = [];
  }

  /**
   * Moves to and sets tabindex on the given date.
   * @param date The destination date
   * @param setFocus Whether focus should be set on the date
   * */
  private _goToDate(date: Date, setFocus: boolean): void {
    const year = date.getFullYear();
    const month = date.getMonth();
    this._focusedDate = date;
    if (this._year !== year || this._month !== month) {
      this._month = month;
      this._setMonth();
      this._year = year;
      this._setYear();
      if (this._view !== 'date') {
        this._closeMenu(false, setFocus);
      } else {
        this._resetDateGrid();
      }
    } else if (this._view !== 'date') {
      this._closeMenu(false, setFocus);
    }
    this._adapter.setActiveDate(date, setFocus, this._preventFocus);
    this._emitFocusChangeEvent(this._focusedDate);
  }

  /**
   * Moves forward one month and rebuilds the calendar dates to match.
   * */
  private _goToNextMonth(): void {
    if (this._month < 11) {
      this._month += 1;
    } else {
      this._month = 0;
      this._year += 1;
      this._setYear();
    }
    this._setMonth();
    this._resetDateGrid();
  }

  /**
   * Moves backward one month and rebuilds the calendar dates to match.
   * */
  private _goToPreviousMonth(): void {
    if (this._month > 0) {
      this._month -= 1;
    } else {
      this._month = 11;
      this._year -= 1;
      this._setYear();
    }
    this._setMonth();
    this._resetDateGrid();
  }

  /**
   * Moves forward one year.
   * */
  private _goToNextYear(setFocus = false): void {
    if (this._view === 'month') {
      if (this._menuYear) {
        this._menuYear += 1;
        this._setMenuYear();
      }
      this._adapter.animateIntoSelectionMenu(this._getMonthsForMenu(), this._rtl ? 'left' : 'right', setFocus);
    } else {
      this._year += 1;
      this._setYear();
      this._resetDateGrid();
    }
  }

  /**
   * Moves backward one year.
   * */
  private _goToPreviousYear(setFocus = false): void {
    if (this._view === 'month') {
      if (this._menuYear) {
        this._menuYear -= 1;
        this._setMenuYear();
      }
      this._adapter.animateIntoSelectionMenu(this._getMonthsForMenu(), this._rtl ? 'right' : 'left', setFocus);
    } else {
      this._year -= 1;
      this._setYear();
      this._resetDateGrid();
    }
  }
  
  /**
   * Moves to the next set of selectable years in grid view.
   * */
  private _goToNextSetOfYears(setFocus = false): void {
    this._menuIncludedYear += CALENDAR_CONSTANTS.numbers.YEARS_IN_VIEW;
    this._adapter.animateIntoSelectionMenu(this._getYearsForMenu(), this._rtl ? 'left' : 'right', setFocus);
    this._setNavigationButtonStates();
  }

  /**
   * Move to the previous set of selectable years in grid view.
   * */
  private _goToPreviousSetOfYears(setFocus = false): void {
    this._menuIncludedYear -= CALENDAR_CONSTANTS.numbers.YEARS_IN_VIEW;
    this._adapter.animateIntoSelectionMenu(this._getYearsForMenu(), this._rtl ? 'right' : 'left', setFocus);
    this._setNavigationButtonStates();
  }

  /**
   * Checks whether the minimum navigable date occurs before the current period.
   * @param forceConstrain Whether to ignore the ability to view dates before the min
   * @returns Whether periods before the one in view are navigable
   */
  private _canGoBackward(forceConstrain?: false): boolean {
    if (!forceConstrain && !this._constrainToEnabled) {
      return true;
    }
    switch (this._view) {
      case 'date':
        return !this._min || this._min < new Date(this._year, this._month, 1);
      case 'month':
        const minDateYear = this._min?.getFullYear();
        return this._menuYear !== null && (minDateYear === undefined || minDateYear < this._menuYear);
      case 'year':
        return !!this._menuYearsInView && this._minYear < this._menuYearsInView.min;
      default:
        return false;
    }
  }

  /**
   * Checks whether the maximum navigable date occurs after the current period.
   * @param forceConstrain Whether to ignore the ability to view dates after the max
   * @returns Whether periods after the one in view are navigable
   */
  private _canGoForward(forceConstrain?: false): boolean {
    if (!forceConstrain && !this._constrainToEnabled) {
      return true;
    }
    switch (this._view) {
      case 'date':
        return !this._max || this._max > getLastDateOfMonth(this._month, this._year);
      case 'month':
        const maxDateYear = this._max?.getFullYear();
        return this._menuYear !== null && (maxDateYear === undefined || maxDateYear > this._menuYear);
      case 'year':
        return !!this._menuYearsInView && this._maxYear > this._menuYearsInView.max;
      default:
        return false;
    }
  }

  /**
   * Enables or disabled navigation buttons based on whether they would lead outside the range of enabled dates.
   */
  private _setNavigationButtonStates(): void {
    if (!this._showHeader) {
      return;
    }

    if (!this._constrainToEnabled) {
      this._adapter.setPreviousButtonDisabled(false);
      this._adapter.setNextButtonDisabled(false);
      return;
    }

    this._adapter.setPreviousButtonDisabled(!this._canGoBackward());
    this._adapter.setNextButtonDisabled(!this._canGoForward());
  }

  /**
   * Sets the month text and attribute in the adapter.
   * @param userSelected Whether the month was explicitly selected by the user (optional)
   * */
  private _setMonth(userSelected?: boolean): void {
    this._adapter.setMonth(this._month, this._locale);
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.MONTH, this._month.toString());
    if (this._isInitialized) {
      this._setNavigationButtonStates();
      this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.MONTH_CHANGE, {month: this._month, userSelected: userSelected ?? false, year: this._year});
    }
  }

  /**
   * Sets the year text and attribute in the adapter.
   * @param userSelected Whether the year was explicilty selected by the user (optional)
   * */
  private _setYear(userSelected?: boolean): void {
    this._adapter.setYear(this._year, this._locale);
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.YEAR, this._year.toString());
    if (this._isInitialized) {
      this._setNavigationButtonStates();
      this._adapter.emitHostEvent(CALENDAR_CONSTANTS.events.MONTH_CHANGE, {month: this._month, userSelected: userSelected ?? false, year: this._year});
    }
  }

  /**
   * Sets the year currently visible in the menu.
   * */
  private _setMenuYear(): void {
    if (this._menuYear !== null) {
      this._setNavigationButtonStates();
      this._adapter.setYear(this._menuYear, this._locale);
    }
  }

  private _applyAllowSingleDateRange(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.ALLOW_SINGLE_DATE_RANGE, this._allowSingleDateRange);
    this._adapter.setContainerClass(CALENDAR_CONSTANTS.classes.ALLOW_SINGLE_DATE_RANGE, this._allowSingleDateRange);
  }

  private _applyClearButton(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.CLEAR_BUTTON, true, this._clearButton.toString());

    if (!this._clearButton) {
      this._adapter.unregisterClearButtonListener(this._clearButtonListener);
      this._adapter.removeClearButton();

      if (!this._todayButton) {
        this._adapter.removeFooter();
      }
    } else {
      this._adapter.setFooter();
      this._adapter.setClearButton();
      this._adapter.registerClearButtonListener(this._clearButtonListener);
    }
  }

  private _applyConstrainToEnabled(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.CONSTRAIN_TO_ENABLED, true, this._constrainToEnabled.toString());

    if (this._isInitialized) {
      this._setNavigationButtonStates();
    }
  }

  private _applyDateBuilder(): void {
    if (this._view === 'date') {
      this._resetDateGrid();
      this._resumeTabindexOnDate(false);
    }
  }

  private _applyDayBuilder(): void {
    this._adapter.setDays(getSortedDaysOfWeek(this._firstDayOfWeek ?? this._localeFirstDayOfWeek), { builder: this._dayBuilder, locale: this._locale });
  }

  private _applyDisabledDates(): void {
    switch (this._view) {
      case 'date':
        this._dates.forEach(d => {
          const inMonth = isInMonth(d, this._month, this._year);
          const disabledParams = this._getDisabledDateParams(!inMonth);
          this._adapter.setDateDisabled(d, isDisabled(d, disabledParams));
        });
        break;
      case 'month':
        this._openMonthMenu();
        break;
      case 'year':
        this._openYearMenu();
        break;
    }
    this._setNavigationButtonStates();
  }

  private _applyEvents(): void {
    if (this._view !== 'date') {
      return;
    }
    this._dates.forEach(d => {
      this._setEventsOnDate(d);
    });
  }

  private _applyFirstDayOfWeek(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.FIRST_DAY_OF_WEEK, isDefined(this._firstDayOfWeek), (this._firstDayOfWeek ?? 0).toString());
    this._adapter.setDays(getSortedDaysOfWeek(this._firstDayOfWeek ?? this._localeFirstDayOfWeek), { builder: this._dayBuilder, locale: this._locale });

    if (this._isInitialized && this._view === 'date') {
      this._resetDateGrid();
      this._resumeTabindexOnDate(false);
    }
  }

  private _applyFixedHeight(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.FIXED_HEIGHT, this._fixedHeight);
    this._adapter.setContainerClass(CALENDAR_CONSTANTS.classes.FIXED_HEIGHT, this._fixedHeight);
  }

  private _applyListYears(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.LIST_YEARS, this._listYears);

    if (this._isInitialized && this._view === 'year') {
      this._openYearMenu();
    }
  }

  private _applyLocale(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.LOCALE, !!this._locale, this._locale);
    this._adapter.toggleContainerAttribute(!!this._locale, 'lang', this._locale);
    this._localeFirstDayOfWeek = getFirstDayOfWeekForLocale(this._locale);
    this._localeWeekendDays = getWeekendDaysForLocale(this._locale);
    this._applyRtl();

    if (this._isInitialized) {
      this._adapter.setMonth(this._month, this._locale);
      this._adapter.setYear(this._year, this._locale);

      switch (this._view) {
        case 'date':
          this._adapter.setDays(getSortedDaysOfWeek(this._firstDayOfWeek ?? this._localeFirstDayOfWeek), { builder: this._dayBuilder, locale: this._locale });
          this._resetDateGrid();
          this._resumeTabindexOnDate(false);
          break;
        case 'month':
          this._openMonthMenu();
          break;
        case 'year':
          this._openYearMenu();
          break;
      }
    }
  }

  private _applyMenuAnimation(): void {
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.MENU_ANIMATION, this._menuAnimation);
    this._adapter.setMenuAnimation(this._menuAnimation);
  }

  private _applyMin(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.MIN, !!this._minAttribute, this._minAttribute as string);

    if (this._isInitialized) {
      this._applyDisabledDates();

      if (this._min && this._min > this._focusedDate) {
        const firstEnabledDate = this._getFirstEnabledDate();
        if (firstEnabledDate) {
          this._goToDate(firstEnabledDate, false);
        }
      }
    }
  }

  private _applyMax(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.MAX, !!this._maxAttribute, this._maxAttribute as string);

    if (this._isInitialized) {
      this._applyDisabledDates();

      if (this._max && this._max < this._focusedDate) {
        const lastEnabledDate = this._getLastEnabledDate();
        if (lastEnabledDate) {
          this._goToDate(lastEnabledDate, false);
        }
      }
    }
  }

  private _applyMode(oldMode?: CalendarMode): void {
    switch (this._mode) {
      case 'single':
        this._applySingleMode();
        break;
      case 'multiple':
        this._applyMultipleMode(oldMode === 'range');
        break;
      case 'range':
        this._applyRangeMode();
        break;
    }

    if (this._mode !== 'range') {
      this._rangeSelectionState = 'none';
      this._adapter.unregisterHoverListener(this._hoverListener);
      this._clearRangePreview();
    }
  }

  private _applySingleMode(): void {
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'single');
    this._adapter.setMultiple(false);

    if (this._value.length > 1) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = this._value.length - 2; i >= 0; i -= 1) {
        this._deselectDate(this._value[i]);
      }
    }
  }

  private _applyMultipleMode(fromRange = false): void {
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'multiple');
    this._adapter.setMultiple(true);

    if (fromRange) {
      const newDates = getMultipleFromRange(this._value, this._getDisabledDateParams());
      this._deselectAllDates();
      newDates.forEach(d => {
        this._selectDate(d);
      });
    }
  }

  private _applyRangeMode(): void {
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'range');
    this._adapter.setMultiple(false);

    const newValue = getMinAndMaxDates(this._value);
    this._deselectAllDates();
    newValue.forEach(d => {
      this._selectDate(d);
    });

    this._rangeSelectionState = this._value[0] ? this._value[1] ? 'to' : 'from' : 'none';
    this._adapter.registerHoverListener(this._hoverListener);
    this._adapter.setRange(getDatesInRange(this._dates, this._value[0], this._value[1]));
    this._adapter.setRangeStart(this._value[0] ?? null);
    this._adapter.setRangeEnd(this._value[1] ?? null);
  }

  private _applyMonth(): void {
    this._setMonth();
    if (this._isInitialized && this._view === 'date') {
      this._resetDateGrid();
      this._moveFocusToFirstOfMonth(false);
    }
  }

  private _applyPreventFocus(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.PREVENT_FOCUS, this._preventFocus);
    this._adapter.setContainerClass(CALENDAR_CONSTANTS.classes.PREVENT_FOCUS, this._preventFocus);
    this._adapter.setPreventFocusOnMenu(this._preventFocus);
    if (this._preventFocus) {
      this._adapter.registerPreventFocusListener(this._preventFocusListener);
    } else {
      this._adapter.unregisterPreventFocusListener(this._preventFocusListener);
    }
    if (this._isInitialized && this._view === 'date') {
      this._resumeTabindexOnDate(false);
    }
  }

  private _applyReadOnly(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.READONLY, this._readonly);
    this._adapter.toggleHostAttribute('aria-readonly', this._readonly, 'true');
    this._adapter.setContainerClass(CALENDAR_CONSTANTS.classes.READONLY, this._readonly);

    if (this._readonly) {
      this._adapter.unregisterDateClickListener(this._dateClickListener);
      this._adapter.unregisterHoverListener(this._hoverListener);
    } else {
      this._adapter.registerDateClickListener(this._dateClickListener);
      if (this._mode === 'range') {
        this._adapter.registerHoverListener(this._hoverListener);
      }
    }
  }

  private _applyRtl(): void {
    this._rtl = isRtlLocale(this._locale);
    this._adapter.setContainerClass(CALENDAR_CONSTANTS.classes.RTL, this._rtl);
    this._adapter.toggleContainerAttribute(this._rtl, 'dir', 'rtl');
  }

  private _applySelectionFollowsMonth(): void {
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.SELECTION_FOLLOWS_MONTH, this._selectionFollowsMonth.toString());
  }

  private _applyShowHeader(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.SHOW_HEADER, this._showHeader, this._showHeader.toString());

    if (this._showHeader) {
      this._adapter.setHeader();
      this._adapter.registerMonthButtonListener(this._monthButtonListener);
      this._adapter.registerNextButtonListener(this._nextButtonListener);
      this._adapter.registerPreviousButtonListener(this._previousButtonListener);
      this._adapter.registerYearButtonListener(this._yearButtonListener);
      this._setNavButtonLabels();
    } else {
      this._adapter.unregisterMonthButtonListener(this._monthButtonListener);
      this._adapter.unregisterNextButtonListener(this._nextButtonListener);
      this._adapter.unregisterPreviousButtonListener(this._previousButtonListener);
      this._adapter.unregisterYearButtonListener(this._yearButtonListener);
      this._adapter.removeHeader();
    }

    if (this._isInitialized) {
      this._adapter.setMonth(this._month, this._locale);
      this._adapter.setYear(this._year, this._locale);
      this._setNavigationButtonStates();
    }
  }

  private _applyShowOtherMonths(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.SHOW_OTHER_MONTHS, this._showOtherMonths);

    if (this._isInitialized && this._view === 'date') {
      let skipFinalWeek = false;
      this._dates.forEach((d, i) => {
        if (isInMonth(d, this._month, this._year)) {
          return;
        }
        if (i === CALENDAR_CONSTANTS.numbers.PENULTIMATE_WEEK_BEGIN_INDEX || i === CALENDAR_CONSTANTS.numbers.FINAL_WEEK_BEGIN_INDEX) {
          skipFinalWeek = true;
        }
        if (this._showOtherMonths && !skipFinalWeek) {
          this._adapter.replaceDate(this._getDateConfig(d), { builder: this._dateBuilder, locale: this._locale });
        } else {
          this._adapter.replaceDateWithSpacer(d);
        }
        this._setEventsOnDate(d);
        this._applyWeekendDays();
      });
    }
  }

  private _applyShowToday(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.SHOW_TODAY, this._showToday);
    this._adapter.setContainerClass(CALENDAR_CONSTANTS.classes.SHOW_TODAY, this._showToday);
  }

  private _applyTodayButton(): void {
    this._adapter.toggleHostAttribute(CALENDAR_CONSTANTS.attributes.TODAY_BUTTON, true, this._todayButton.toString());

    if (!this._todayButton) {
      this._adapter.unregisterTodayButtonListener(this._todayButtonListener);
      this._adapter.removeTodayButton();

      if (!this._clearButton) {
        this._adapter.removeFooter();
      }
    } else {
      this._adapter.setFooter();
      this._adapter.setTodayButton();
      this._adapter.registerTodayButtonListener(this._todayButtonListener);
    }
  }

  private _applyTooltipBuilder(): void {
    if (this._view === 'date') {
      this._dates.forEach(d => {
        if (!this._showOtherMonths && !isInMonth(d, this._month, this._year)) {
          return;
        }
        const events = getEventsOnDate(d, this._events, this._eventBuilder);
        let tooltipContent = getEventDescriptions(events);
        if (this._tooltipBuilder) {
          tooltipContent = this._tooltipBuilder(this._getCalendarDate(d), tooltipContent) ?? '';
        }
        this._adapter.setDateTooltip(d, tooltipContent);
      });
    }
  }

  private _applyWeekendDays(): void {
    const weekendDays = this._weekendDays ?? this._localeWeekendDays;
    if (this._view === 'date') {
      this._dates.forEach(d => {
        const day = d.getDay();
        this._adapter.setWeekend(d, (this._showOtherMonths || isInMonth(d, this._month, this._year)) && weekendDays.includes(day));
      });
    }
  }

  private _applyValue(newValue: Date[]): void {
    newValue = newValue.map(d => new Date(d));
    sortDates(newValue);
    this._deselectAllDates();
    newValue.forEach(d => this._selectDate(d));

    if (this._mode === 'range') {
      this._rangeSelectionState = this._value.length === 2 ? 'to' : this._value.length === 1 ? 'from' : 'none';
      this._clearRangePreview();
      this._adapter.setRangeStart(this._value[0]);
      this._setRangePreview();
    }
  }

  private _applyView(): void {
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.VIEW, this._view);

    switch (this._view) {
      case 'date':
        this._closeMenu();
        break;
      case 'month':
        this._openMonthMenu();
        break;
      case 'year':
        this._openYearMenu();
        break;
    }
  }

  private _applyYear(): void {
    this._setYear();
    if (this._isInitialized && this._view === 'date') {
      this._resetDateGrid();
      this._moveFocusToFirstOfMonth(false);
    }
  }

  private _applyYearRange(): void {
    this._adapter.setHostAttribute(CALENDAR_CONSTANTS.attributes.YEAR_RANGE, this._yearRange);
    const range = parseYearRange(this._yearRange);
    this._minYear = range.min;
    this._maxYear = range.max;
    if (this._view === 'year') {
      this._openYearMenu();
      this._setNavigationButtonStates();
    }
  }

  /** Get the currently focused date */
  public get activeDate(): Date {
    return new Date(this._focusedDate);
  }

  /** Get/set whether single date ranges are allowed */
  public get allowSingleDateRange(): boolean {
    return this._allowSingleDateRange;
  }
  public set allowSingleDateRange(value: boolean) {
    if (this._allowSingleDateRange !== value) {
      this._allowSingleDateRange = value;
      this._applyAllowSingleDateRange();
    }
  }

  /** Get/set whether to show the clear button */
  public get clearButton(): boolean {
    return this._clearButton;
  }
  public set clearButton(value: boolean) {
    if (this._clearButton !== value) {
      this._clearButton = value;

      if (this._isInitialized) {
        this._applyClearButton();
      }
    }
  }

  /* Get/set the clear button callback */
  public get clearCallback(): (() => void) | undefined {
    return this._clearCallback;
  }
  public set clearCallback(value: (() => void) | undefined) {
    this._clearCallback = value;
  }

  /** Get/set whether to constain navigation to enabled dates */
  public get constrainToEnabled(): boolean {
    return this._constrainToEnabled;
  }
  public set constrainToEnabled(value: boolean) {
    if (this._constrainToEnabled !== value) {
      this._constrainToEnabled = value;

      if (this._isInitialized) {
        this._applyConstrainToEnabled();
      }
    }
  }

  /** Get/set date builder */
  public get dateBuilder(): CalendarDateBuilder | undefined {
    return this._dateBuilder;
  }
  public set dateBuilder(value: CalendarDateBuilder | undefined) {
    this._dateBuilder = value;

    if (this._isInitialized) {
      this._applyDateBuilder();
    }
  }

  /** Get/set date select callback */
  public get dateSelectCallback(): CalendarDateSelectCallback | undefined {
    return this._dateSelectCallback;
  }
  public set dateSelectCallback(value: CalendarDateSelectCallback | undefined) {
    this._dateSelectCallback = value;
  }

  /** Get/set day builder */
  public get dayBuilder(): CalendarDayBuilder | undefined {
    return this.dayBuilder;
  }
  public set dayBuilder(value: CalendarDayBuilder | undefined) {
    this._dayBuilder = value;

    if (this._isInitialized) {
      this._applyDayBuilder();
    }
  }

  /** Get/set disabled date builder */
  public get disabledDateBuilder(): ((date: Date) => boolean) | undefined {
    return this._disabledDateBuilder;
  }
  public set disabledDateBuilder(value: ((date: Date) => boolean) | undefined) {
    this._disabledDateBuilder = value;

    if (this._isInitialized) {
      this._applyDisabledDates();
    }
  }

  /** Get/set disabled dates */
  public get disabledDates(): Date | Date[] | null {
    const dates = this._disabledDates.map(d => new Date(d));
    return dates.length ? dates : null;
  }
  public set disabledDates(value: Date | Date[] | null) {
    const dates = value ? isArray(value) ? value : [value] : [];
    this._disabledDates = (dates as Date[]).map(d => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date;
    });

    if (this._isInitialized) {
      this._applyDisabledDates();
    }
  }

  /** Get/set disabled days of week */
  public get disabledDaysOfWeek(): DayOfWeek | DayOfWeek[] | null {
    return this._disabledDaysOfWeek.length ? [...this._disabledDaysOfWeek] : null ;
  }
  public set disabledDaysOfWeek(value: DayOfWeek | DayOfWeek[] | null) {
    this._disabledDaysOfWeek = (isDefined(value) ? isArray(value) ? value : [value] : []) as DayOfWeek[];

    if (this._isInitialized) {
      this._applyDisabledDates();
    }
  }

  /** Get/set the event builder */
  public get eventBuilder(): CalendarEventBuilder | undefined {
    return this._eventBuilder;
  }
  public set eventBuilder(value: CalendarEventBuilder | undefined) {
    this._eventBuilder = value;

    if (this._isInitialized) {
      this._applyEvents();
    }
  }

  /** Get/set events */
  public get events(): ICalendarEvent[] | null {
    return this._events ? [...this._events] : null;
  }
  public set events(value: ICalendarEvent[] | null) {
    this._events = value?.length ? [...value] : [];

    if (this._isInitialized) {
      this._applyEvents();
    }
  }

  /** Get/set first day of week */
  public get firstDayOfWeek(): DayOfWeek | undefined {
    return this._firstDayOfWeek;
  }
  public set firstDayOfWeek(value: DayOfWeek | undefined) {
    if (this._firstDayOfWeek !== value) {
      this._firstDayOfWeek = isDefined(value) ? +(value as DayOfWeek) : value;

      if (this._isInitialized) {
        this._applyFirstDayOfWeek();
      }
    }
  }

  /** Get/set fixed height */
  public get fixedHeight(): boolean {
    return this._fixedHeight;
  }
  public set fixedHeight(value: boolean) {
    if (this._fixedHeight !== value) {
      this._fixedHeight = value;

      if (this._isInitialized) {
        this._applyFixedHeight();
      }
    }
  }

  /** Get/set list years */
  public get listYears(): boolean {
    return this._listYears;
  }
  public set listYears(value: boolean) {
    if (this._listYears !== value) {
      this._listYears = value;
      this._applyListYears();
    }
  }

  /** Get/set locale */
  public get locale(): string | undefined {
    return this._locale;
  }
  public set locale(value: string | undefined) {
    if (typeof value ==='string' && !value.length) {
      value = undefined;
    }

    if (this._locale !== value) {
      this._locale = value;

      if (this._isInitialized) {
        this._applyLocale();
      }
    }
  }

  /** Get/set max date */
  public get max(): Date | string | null {
    return this._max;
  }
  public set max(value: Date | string | null) {
    if (this._maxAttribute !== value) {
      this._maxAttribute = value?.toString() ?? null;
      this._max = coerceDateFromValue(value);
      this._applyMax();
    }
  }

  /** Get/set menu animation type */
  public get menuAnimation(): CalendarMenuAnimationType {
    return this._menuAnimation;
  }
  public set menuAnimation(value: CalendarMenuAnimationType) {
    if (this._menuAnimation !== value) {
      this._menuAnimation = value;

      if (this._isInitialized) {
        this._applyMenuAnimation();
      }
    }
  }

  /** Get/set min date */
  public get min(): Date | string | null {
    return this._min;
  }
  public set min(value: Date | string | null) {
    if (this._minAttribute !== value) {
      this._minAttribute = value?.toString() ?? null;
      this._min = coerceDateFromValue(value);
      this._applyMin();
    }
  }

  /** Get/set mode */
  public get mode(): CalendarMode {
    return this._mode;
  }
  public set mode(value: CalendarMode) {
    if (this._mode !== value) {
      const oldMode = this._mode;
      this._mode = value;
      
      if (this._isInitialized) {
        this._applyMode(oldMode);
      }
    }
  }

  /** Get/set month */
  public get month(): number {
    return this._month;
  }
  public set month(value: number) {
    if (this._month !== value) {
      const newValue = isNaN(+value) ? this._month : +value;
      if (this._month === newValue) {
        return;
      }

      this._month = +value;

      if (this._isInitialized) {
        this._applyMonth();
      }
    }
  }

  /** Get/set prevent focus */
  public get preventFocus(): boolean {
    return this._preventFocus;
  }
  public set preventFocus(value: boolean) {
    if (this._preventFocus !== value) {
      this._preventFocus = value;

      if (this._isInitialized) {
        this._applyPreventFocus();
      }
    }
  }

  /** Get/set readonly */
  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    if (this._readonly !== value) {
      this._readonly = value;

      if (this._isInitialized) {
        this._applyReadOnly();
      }
    }
  }

  /** Get/set selection follows month */
  public get selectionFollowsMonth(): boolean {
    return this._selectionFollowsMonth;
  }
  public set selectionFollowsMonth(value: boolean) {
    if (this._selectionFollowsMonth !== value) {
      this._selectionFollowsMonth = value;

      if (this._isInitialized) {
        this._applySelectionFollowsMonth();
      }
    }
  }

  /** Get/set show nav */
  public get showHeader(): boolean {
    return this._showHeader;
  }
  public set showHeader(value: boolean) {
    if (this._showHeader !== value) {
      this._showHeader = value;

      if (this._isInitialized) {
        this._applyShowHeader();
      }
    }
  }

  /** Get/set show other months */
  public get showOtherMonths(): boolean {
    return this._showOtherMonths;
  }
  public set showOtherMonths(value: boolean) {
    if (this._showOtherMonths !== value) {
      this._showOtherMonths = value;

      if (this._isInitialized) {
        this._applyShowOtherMonths();
      }
    }
  }

  /** Get/set show today */
  public get showToday(): boolean {
    return this._showToday;
  }
  public set showToday(value: boolean) {
    if (this._showToday !== value) {
      this._showToday = value;

      if (this._isInitialized) {
        this._applyShowToday();
      }
    }
  }

  /** Get/set whether to show the today button */
  public get todayButton(): boolean {
    return this._todayButton;
  }
  public set todayButton(value: boolean) {
    if (this._todayButton !== value) {
      this._todayButton = value;

      if (this._isInitialized) {
        this._applyTodayButton();
      }
    }
  }

  /* Get/set the today button callback */
  public get todayCallback(): (() => void) | undefined {
    return this._todayCallback;
  }
  public set todayCallback(value: (() => void) | undefined) {
    this._todayCallback = value;
  }

  /** Get/set the tooltip builder */
  public get tooltipBuilder(): CalendarTooltipBuilder | undefined {
    return this._tooltipBuilder;
  }
  public set tooltipBuilder(value: CalendarTooltipBuilder | undefined) {
    this._tooltipBuilder = value;

    if (this._isInitialized) {
      this._applyTooltipBuilder();
    }
  }

  /** Get/set value */
  public get value(): Date | Date[] | DateRange | null {
    if (this._mode === 'range') {
      return this._rangeSelectionStore ?? getDateRangeFromDates(this._value);
    }

    const dates = this._value.map(d => new Date(d));
    return this._mode === 'multiple' ? dates : dates.length ? dates[0] : null;
  }
  public set value(value: Date | Date[] | DateRange | null) {
    let dates: Date[] = [];

    this._rangeSelectionStore = undefined;

    if (!value || (Array.isArray(value) && !value.length)) {
      this._value = [];
    } else if (Array.isArray(value)) {
      switch (this._mode) {
        case 'single':
          dates = [value[0]];
          break;
        case 'multiple':
          dates = value;
          break;
        case 'range':
          const minAndMax = getMinAndMaxDates(value);
          dates.push(minAndMax[0]);
          if (minAndMax.length > 1) {
            dates.push(minAndMax[1]);
          }
          break;
      }
    } else if (isValidDate(new Date(value as any))) {
      dates = [value as Date];
    } else {
      this._rangeSelectionStore = new DateRange(value as DateRange);
      dates = getDatesFromDateRange(value as DateRange);
    }

    this._applyValue(dates);
  }

  /** Get/set view */
  public get view(): CalendarView {
    return this._view;
  }
  public set view(value: CalendarView) {
    if (this._view !== value) {
      this._view = value;
      this._applyView();
    }
  }

  /** Get/set weekend days */
  public get weekendDays(): DayOfWeek[] | null {
    return this._weekendDays ? [...this._weekendDays] : null;
  }
  public set weekendDays(value: DayOfWeek[] | null) {
    this._weekendDays = value?.map(v => +v) ?? null;

    if (this._isInitialized) {
      this._applyWeekendDays();
    }
  }

  /** Get/set year */
  public get year(): number {
    return this._year;
  }
  public set year(value: number) {
    if (this._year !== value) {
      const newValue = isNaN(+value) ? this._year : +value;
      if (this._year === newValue) {
        return;
      }

      this._year = newValue;
      
      if (this._isInitialized) {
        this._applyYear();
      }
    }
  }

  /** Get/set year range */
  public get yearRange(): string {
    return this._yearRange;
  }
  public set yearRange(value: string) {
    if (this._yearRange !== value) {
      this._yearRange = value;

      if (this._isInitialized) {
        this._applyYearRange();
      }
    }
  }

  /** Deselect all dates */
  public clear(): void {
    this._deselectAllDates();
    if (this._clearCallback) {
      this._clearCallback();
    }
  }

  /** Deselect a date */
  public deselectDate(date: Date, setFocus?: boolean): void {
    this._onDateSelected(date, false);
    if (setFocus) {
      this._focusedDate = date;
      this._resumeTabindexOnDate(true);
    }
  }

  /** Go to a date and optionally set focus on it */
  public goToDate(date: Date, setFocus?: boolean): void {
    this._goToDate(date, setFocus ?? false);
  }

  /** Handle an external keyboard event */
  public handleExternalKeyEvent(evt: KeyboardEvent): void {
    this._onKeydown(evt);
  }

  /** Reinitialize the calendar */
  public layout(): void {
    this._applyFirstDayOfWeek();
    this._createDateView();
    this._applyShowHeader();
    this._applyConstrainToEnabled();
  }

  /** Select a date */
  public selectDate(date: Date, setFocus?: boolean): void {
    this._onDateSelected(date, true);
    if (setFocus) {
      this._focusedDate = date;
      this._resumeTabindexOnDate(true);
    }
  }

  /** Sets the active date if in view */
  public setActiveDate(date: Date, setFocus?: boolean): boolean {
    if (this._dates.some(d => isSameDate(d, date) && (this._showOtherMonths || isInMonth(d, this._month, this._year)))) {
      this._goToDate(date, setFocus ?? false);
      return true;
    }
    return false;
  }

  /** Go to today */
  public today(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this._goToDate(today, true);
    if (this._todayCallback) {
      this._todayCallback();
    }
  }

  /** Toggles a date selected or unselected */
  public toggleDate(date: Date, force?: boolean): void {
    this._onDateSelected(date);
  }
}
