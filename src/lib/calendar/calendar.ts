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
 */
@CustomElement({
  name: CALENDAR_CONSTANTS.elementName,
  dependencies: [
    ButtonComponent,
    CalendarMenuComponent,
    IconButtonComponent,
    IconComponent,
    TooltipComponent
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
    if (!this.hasAttribute(CALENDAR_CONSTANTS.attributes.POPUP_CONTEXT) && elementParents(this).some(el => el.tagName.toLowerCase() === 'forge-popup')) {
      this.setAttribute(CALENDAR_CONSTANTS.attributes.POPUP_CONTEXT, 'true');
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
