import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceNumber, coerceBoolean, elementParents } from '@tylertech/forge-core';
import { tylIconAdd, tylIconArrowDropDown, tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconLens } from '@tylertech/tyler-icons/standard';

import { CalendarAdapter } from './calendar-adapter';
import { CalendarFoundation } from './calendar-foundation';
import { CALENDAR_CONSTANTS, CalendarMode, DayOfWeek, ICalendarDateSelectEventData, CalendarDateBuilder, CalendarDayBuilder, CalendarDateSelectCallback, CalendarEventBuilder, ICalendarEvent, ICalendarFocusChangeEventData, ICalendarMonthChangeEventData, CalendarTooltipBuilder, CalendarView } from './calendar-constants';
import { DateRange } from './core/date-range';
import { ButtonComponent } from '../button';
import { IconButtonComponent } from '../icon-button';
import { IconComponent, IconRegistry } from '../icon';
import { TooltipComponent } from '../tooltip';
import { ICalendarBase } from './core/calendar-base';
import { CalendarMenuAnimationType, CalendarMenuComponent } from './calendar-menu';
import { StateLayerComponent } from '../state-layer';
import { FocusIndicatorComponent } from '../focus-indicator';

import template from './calendar.html';
import styles from './calendar.scss';

export interface ICalendarComponent extends ICalendarBase, ICustomElement {
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
  deselectDate(date: Date): void;
  toggleDate(date: Date, force?: boolean): void;
  goToDate(date: Date, setFocus?: boolean): void;
  setActiveDate(date: Date, setFocus?: boolean): boolean;
  handleKey(evt: KeyboardEvent): void;
  layout(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-calendar': ICalendarComponent;
  }

  interface HTMLElementEventMap {
    'forge-calendar-date-select': CustomEvent<ICalendarDateSelectEventData>;
    'forge-calendar-focus-change': CustomEvent<ICalendarFocusChangeEventData>;
    'forge-calendar-month-change': CustomEvent<ICalendarMonthChangeEventData>;
    'forge-calendar-view-change': CustomEvent<CalendarView>;
  }
}

/**
 * The web component class behind the `<forge-calendar>` custom element.
 * 
 * @tag forge-calendar
 * 
 * @property {Date} activeDate - The currently active date in the calendar.
 * @property {boolean} [allowSingleDateRange=true] - Whether to allow a single date range to be selected.
 * @property {boolean} [clearButton=false] - Whether to show a button to clear the selected date(s).
 * @property {() => void | undefined} [clearCallback=undefined] - Callback function to call when the clear button is clicked.
 * @property {boolean} [constrainToEnabled=true] - Whether to constrain the selected date(s) to the enabled dates.
 * @property {CalendarDateBuilder | undefined} [dateBuilder=undefined] - Function to build the date content.
 * @property {CalendarDateSelectCallback | undefined} [dateSelectCallback=undefined] - Callback function to call when a date is selected.
 * @property {CalendarDayBuilder | undefined} [dayBuilder=undefined] - Function to build the day content.
 * @property {(date: Date) => boolean | undefined} [disabledDateBuilder=undefined] - Function to determine if a date is disabled.
 * @property {Date | Date[] | null | undefined} [disabledDates=[]] - Dates that are disabled from being selected.
 * @property {DayOfWeek | DayOfWeek[] | null | undefined} [disabledDaysOfWeek=[]] - Days of the week that are disabled from being selected.
 * @property {CalendarEventBuilder | undefined} [eventBuilder=undefined] - Function to build the event content.
 * @property {ICalendarEvent[] | null | undefined} [events=[]] - Events to display on the calendar.
 * @property {DayOfWeek | undefined} [firstDayOfWeek=undefined] - The first day of the week.
 * @property {boolean} [fixedHeight=false] - Whether to fix the height of the calendar.
 * @property {boolean} [listYears=true] - Whether to list the years in the year view.
 * @property {string | undefined} [locale=undefined] - The locale to use for formatting dates.
 * @property {Date | string | null | undefined} [max=undefined] - The maximum date that can be selected.
 * @property {CalendarMenuAnimationType} [menuAnimation='scale'] - The animation to use for the menu.
 * @property {Date | string | null | undefined} [min=undefined] - The minimum date that can be selected.
 * @property {CalendarMode} [mode='single'] - The mode of the calendar.
 * @property {number} [month=<today's month>] - The month to display.
 * @property {boolean} [preventFocus=false] - Whether to prevent the calendar from taking focus.
 * @property {boolean} [readonly=false] - Whether the calendar is readonly.
 * @property {boolean} [selectionFollowsMonth=false] - Whether the selection follows the month.
 * @property {boolean} [showHeader=true] - Whether to show the header.
 * @property {boolean} [showOtherMonths=false] - Whether to show days from other months.
 * @property {boolean} [showToday=true] - Whether to show the today button.
 * @property {boolean} [todayButton=false] - Whether to show a button to select today.
 * @property {() => void | undefined} [todayCallback=undefined] - Callback function to call when the today button is clicked.
 * @property {CalendarTooltipBuilder | undefined} [tooltipBuilder=undefined] - Function to build the tooltip content.
 * @property {Date | Date[] | DateRange | null | undefined} [value=[]] - The selected date(s).
 * @property {CalendarView} [view='date'] - The view of the calendar.
 * @property {DayOfWeek[] | null | undefined} [weekendDays=null] - The days of the week that are considered weekends.
 * @property {number} [year=<today's year>] - The year to display.
 * @property {string} [yearRange='-50:+50'] - The range of years to display.
 * 
 * @attribute {boolean} [allow-single-date-range] - Whether to allow a single date range to be selected.
 * @attribute {boolean} [clear-button] - Whether to show a button to clear the selected date(s).
 * @attribute {boolean} [constrain-to-enabled] - Whether to constrain the selected date(s) to the enabled dates.
 * @attribute {DayOfWeek} [first-day-of-week] - The first day of the week.
 * @attribute {boolean} [fixed-height] - Whether to fix the height of the calendar.
 * @attribute {boolean} [list-years] - Whether to list the years in the year view.
 * @attribute {string} [locale] - The locale to use for formatting dates.
 * @attribute {Date | string | null} [max] - The maximum date that can be selected.
 * @attribute {CalendarMenuAnimationType} [menu-animation] - The animation to use for the menu.
 * @attribute {Date | string | null} [min] - The minimum date that can be selected.
 * @attribute {CalendarMode} [mode] - The mode of the calendar.
 * @attribute {number} [month] - The month to display.
 * @attribute {boolean} [prevent-focus] - Whether to prevent the calendar from taking focus.
 * @attribute {boolean} [readonly] - Whether the calendar is readonly.
 * @attribute {boolean} [selection-follows-month] - Whether the selection follows the month.
 * @attribute {boolean} [show-header] - Whether to show the header.
 * @attribute {boolean} [show-other-months] - Whether to show days from other months.
 * @attribute {boolean} [show-today] - Whether to show the today button.
 * @attribute {boolean} [today-button] - Whether to show a button to select today.
 * @attribute {CalendarView} [view] - The view of the calendar.
 * @attribute {number} [year] - The year to display.
 * @attribute {string} [year-range] - The range of years to display.
 * 
 * @fires {CustomEvent<ICalendarDateSelectEventData>} forge-calendar-date-select - Event fired when a date is selected.
 * @fires {CustomEvent<ICalendarFocusChangeEventData>} forge-calendar-focus-change - Event fired when the focus changes.
 * @fires {CustomEvent<ICalendarMonthChangeEventData>} forge-calendar-month-change - Event fired when the month changes.
 * @fires {CustomEvent<CalendarView>} forge-calendar-view-change - Event fired when the view changes.
 * 
 * @method clear - Clears the selected date(s).
 * @method deselectDate - Deselects a date.
 * @method goToDate - Navigates to a specific date.
 * @method handleKey - Handles a keyboard event.
 * @method layout - Lays out the calendar.
 * @method selectDate - Selects a date.
 * @method setActiveDate - Sets the active date.
 * @method today - Sets the calendar to today.
 * @method toggleDate - Toggles a date.
 */
@CustomElement({
  name: CALENDAR_CONSTANTS.elementName,
  dependencies: [
    ButtonComponent,
    CalendarMenuComponent,
    IconButtonComponent,
    IconComponent,
    TooltipComponent,
    StateLayerComponent,
    FocusIndicatorComponent
  ]
})
export class CalendarComponent extends HTMLElement implements ICalendarComponent {
  public static get observedAttributes(): string[] {
    return [
      CALENDAR_CONSTANTS.attributes.ALLOW_SINGLE_DATE_RANGE,
      CALENDAR_CONSTANTS.attributes.CLEAR_BUTTON,
      CALENDAR_CONSTANTS.attributes.CONSTRAIN_TO_ENABLED,
      CALENDAR_CONSTANTS.attributes.FIRST_DAY_OF_WEEK,
      CALENDAR_CONSTANTS.attributes.FIXED_HEIGHT,
      CALENDAR_CONSTANTS.attributes.LIST_YEARS,
      CALENDAR_CONSTANTS.attributes.LOCALE,
      CALENDAR_CONSTANTS.attributes.MAX,
      CALENDAR_CONSTANTS.attributes.MENU_ANIMATION,
      CALENDAR_CONSTANTS.attributes.MIN,
      CALENDAR_CONSTANTS.attributes.MODE,
      CALENDAR_CONSTANTS.attributes.MONTH,
      CALENDAR_CONSTANTS.attributes.PREVENT_FOCUS,
      CALENDAR_CONSTANTS.attributes.READONLY,
      CALENDAR_CONSTANTS.attributes.SELECTION_FOLLOWS_MONTH,
      CALENDAR_CONSTANTS.attributes.SHOW_HEADER,
      CALENDAR_CONSTANTS.attributes.SHOW_OTHER_MONTHS,
      CALENDAR_CONSTANTS.attributes.SHOW_TODAY,
      CALENDAR_CONSTANTS.attributes.TODAY_BUTTON,
      CALENDAR_CONSTANTS.attributes.VIEW,
      CALENDAR_CONSTANTS.attributes.YEAR,
      CALENDAR_CONSTANTS.attributes.YEAR_RANGE
    ];
  }

  private _foundation: CalendarFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconArrowDropDown, tylIconLens, tylIconAdd]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new CalendarFoundation(new CalendarAdapter(this));
  }

  public connectedCallback(): void {
    // To simulate the :host-context() selector for Firefox until they implement it, we need to determine if the
    // calendar is within a popup for auto-styling the calendar when included within a popup. Check to see if
    // any of the parents of this element are a popup.
    if (!this.hasAttribute(CALENDAR_CONSTANTS.attributes.POPOVER_CONTEXT) && elementParents(this).some(el => el.tagName.toLowerCase() === 'forge-popover')) {
      this.setAttribute(CALENDAR_CONSTANTS.attributes.POPOVER_CONTEXT, 'true');
    }

    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CALENDAR_CONSTANTS.attributes.ALLOW_SINGLE_DATE_RANGE:
        this.allowSingleDateRange = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.CLEAR_BUTTON:
        this.clearButton = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.CONSTRAIN_TO_ENABLED:
        this.constrainToEnabled = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.FIRST_DAY_OF_WEEK:
        this.firstDayOfWeek = coerceNumber(newValue) as DayOfWeek;
        break;
      case CALENDAR_CONSTANTS.attributes.FIXED_HEIGHT:
        this.fixedHeight = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.LIST_YEARS:
        this.listYears = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.LOCALE:
        this.locale = newValue;
        break;
      case CALENDAR_CONSTANTS.attributes.MAX:
        this.max = newValue;
        break;
      case CALENDAR_CONSTANTS.attributes.MENU_ANIMATION:
        this.menuAnimation = newValue as CalendarMenuAnimationType;
        break;
      case CALENDAR_CONSTANTS.attributes.MIN:
        this.min = newValue;
        break;
      case CALENDAR_CONSTANTS.attributes.MODE:
        this.mode = newValue as CalendarMode;
        break;
      case CALENDAR_CONSTANTS.attributes.MONTH:
        this.month = coerceNumber(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.PREVENT_FOCUS:
        this.preventFocus = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.SELECTION_FOLLOWS_MONTH:
        this.selectionFollowsMonth = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.SHOW_HEADER:
        this.showHeader = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.SHOW_OTHER_MONTHS:
        this.showOtherMonths = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.SHOW_TODAY:
        this.showToday = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.TODAY_BUTTON:
        this.todayButton = coerceBoolean(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.VIEW:
        this.view = newValue as CalendarView;
        break;
      case CALENDAR_CONSTANTS.attributes.YEAR:
        this.year = coerceNumber(newValue);
        break;
      case CALENDAR_CONSTANTS.attributes.YEAR_RANGE:
        this.yearRange = newValue;
        break;
    }
  }

  /** @readonly */
  @FoundationProperty({set: false})
  public declare activeDate: Date;

  @FoundationProperty()
  public declare allowSingleDateRange: boolean;

  @FoundationProperty()
  public declare clearButton: boolean;

  @FoundationProperty()
  public declare clearCallback: (() => void) | undefined;

  @FoundationProperty()
  public declare constrainToEnabled: boolean;

  @FoundationProperty()
  public declare dateBuilder: CalendarDateBuilder | undefined;

  @FoundationProperty()
  public declare dateSelectCallback: CalendarDateSelectCallback | undefined;

  @FoundationProperty()
  public declare dayBuilder: CalendarDayBuilder | undefined;

  @FoundationProperty()
  public declare disabledDateBuilder: ((date: Date) => boolean) | undefined;

  @FoundationProperty()
  public declare disabledDates: Date | Date[] | null | undefined;

  @FoundationProperty()
  public declare disabledDaysOfWeek: DayOfWeek | DayOfWeek[] | null | undefined;

  @FoundationProperty()
  public declare eventBuilder: CalendarEventBuilder | undefined;

  @FoundationProperty()
  public declare events: ICalendarEvent[] | null | undefined;

  @FoundationProperty()
  public declare firstDayOfWeek: DayOfWeek | undefined;

  @FoundationProperty()
  public declare fixedHeight: boolean;

  @FoundationProperty()
  public declare listYears: boolean;

  @FoundationProperty()
  public declare locale: string | undefined;

  @FoundationProperty()
  public declare max: Date | string | null | undefined;

  @FoundationProperty()
  public declare menuAnimation: CalendarMenuAnimationType;

  @FoundationProperty()
  public declare min: Date | string | null | undefined;

  @FoundationProperty()
  public declare mode: CalendarMode;

  @FoundationProperty()
  public declare month: number;

  @FoundationProperty()
  public declare preventFocus: boolean;

  @FoundationProperty()
  public declare readonly: boolean;

  @FoundationProperty()
  public declare selectionFollowsMonth: boolean;

  @FoundationProperty()
  public declare showHeader: boolean;

  @FoundationProperty()
  public declare showOtherMonths: boolean;

  @FoundationProperty()
  public declare showToday: boolean;

  @FoundationProperty()
  public declare todayButton: boolean;

  @FoundationProperty()
  public declare todayCallback: (() => void) | undefined;

  @FoundationProperty()
  public declare tooltipBuilder: CalendarTooltipBuilder | undefined;

  @FoundationProperty()
  public declare value: Date | Date[] | DateRange | null | undefined;

  @FoundationProperty()
  public declare view: CalendarView;

  @FoundationProperty()
  public declare weekendDays: DayOfWeek[] | null | undefined;

  @FoundationProperty()
  public declare year: number;

  @FoundationProperty()
  public declare yearRange: string;

  public clear(): void {
    this._foundation.clear();
  }

  public deselectDate(date: Date): void {
    this._foundation.deselectDate(new Date(date));
  }

  public goToDate(date: Date, setFocus?: boolean): void {
    this._foundation.goToDate(new Date(date), setFocus);
  }

  public handleKey(evt: KeyboardEvent): void {
    this._foundation.handleExternalKeyEvent(evt);
  }

  public layout(): void {
    this._foundation.layout();
  }

  public selectDate(date: Date): void {
    this._foundation.selectDate(new Date(date));
  }

  public setActiveDate(date: Date, setFocus?: boolean): boolean {
    return this._foundation.setActiveDate(new Date(date), setFocus);
  }

  public today(): void {
    this._foundation.today();
  }

  public toggleDate(date: Date, force?: boolean): void {
    this._foundation.toggleDate(new Date(date), force);
  }
}
