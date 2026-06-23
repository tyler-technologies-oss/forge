import {
  CUSTOM_ELEMENT_NAME_PROPERTY,
  CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY,
  coerceNumber,
  coerceBoolean,
  elementParents,
  attachShadowTemplate
} from '@tylertech/forge-core';
import { customElement, property } from 'lit/decorators.js';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { tylIconAdd, tylIconArrowDropDown, tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconLens } from '@tylertech/tyler-icons';

import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { CalendarAdapter } from './calendar-adapter.js';
import { CalendarCore } from './calendar-core.js';
import {
  CALENDAR_CONSTANTS,
  CalendarMode,
  DayOfWeek,
  ICalendarDateSelectEventData,
  CalendarDateBuilder,
  CalendarDayBuilder,
  CalendarDateSelectCallback,
  CalendarEventBuilder,
  ICalendarEvent,
  ICalendarFocusChangeEventData,
  ICalendarMonthChangeEventData,
  CalendarTooltipBuilder,
  CalendarView,
  CalendarDisabledDateBuilder
} from './calendar-constants.js';
import { DateRange } from './core/date-range.js';
import { ButtonComponent } from '../button/index.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { TooltipComponent } from '../tooltip/index.js';
import { ICalendarBase } from './core/calendar-base.js';
import { CalendarMenuAnimationType, CalendarMenuComponent } from './calendar-menu/index.js';
import { StateLayerComponent } from '../state-layer/index.js';
import { FocusIndicatorComponent } from '../focus-indicator/index.js';

import template from './calendar.html';
import styles from './calendar.scss';

/** @deprecated - This will be removed in the future. Please switch to using CalendarComponent. */
export interface ICalendarComponent extends BaseLitElement, ICalendarBase {
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
 * @summary A flexible calendar component for date selection with support for single dates, ranges, multiple selections, and extensive customization options.
 *
 * @tag forge-calendar
 *
 * @cssproperty --forge-calendar-background - Background color of the calendar
 * @cssproperty --forge-calendar-date-color - Text color of date cells
 *
 * @csspart root - The root container element
 * @csspart view - The view container
 * @csspart date-view - The date grid view container
 * @csspart date-grid-container - The date grid wrapper
 * @csspart date-grid-row - A row in the date grid
 * @csspart calendar-menu - The month/year menu
 * @csspart header - The header section
 * @csspart footer - The footer section
 *
 * @slot today-button-text - Text to display in the today button
 * @slot clear-button-text - Text to display in the clear button
 * @slot next-month-button-text - Text to display in the next month button's tooltip
 * @slot previous-month-button-text - Text to display in the previous month button's tooltip
 * @slot next-year-button-text - Text to display in the next year button's tooltip
 * @slot previous-year-button-text - Text to display in the previous year button's tooltip
 * @slot next-years-button-text - Text to display in the next years button's tooltip
 * @slot previous-years-button-text - Text to display in the previous years button's tooltip
 *
 * @fires {CustomEvent<ICalendarDateSelectEventData>} forge-calendar-date-select - Event fired when a date is selected
 * @fires {CustomEvent<ICalendarFocusChangeEventData>} forge-calendar-focus-change - Event fired when the focus changes
 * @fires {CustomEvent<ICalendarMonthChangeEventData>} forge-calendar-month-change - Event fired when the month changes
 * @fires {CustomEvent<CalendarView>} forge-calendar-view-change - Event fired when the view changes
 *
 * @state view-date - Applied when the view is "date"
 * @state view-month - Applied when the view is "month"
 * @state view-year - Applied when the view is "year"
 * @state readonly - Applied when the calendar is readonly
 * @state fixed-height - Applied when fixed height is enabled
 * @state prevent-focus - Applied when focus prevention is enabled
 */
@customElement(CALENDAR_CONSTANTS.elementName)
export class CalendarComponent extends BaseLitElement implements ICalendarComponent {
  static {
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconArrowDropDown, tylIconLens, tylIconAdd]);
  }

  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = CALENDAR_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [
    ButtonComponent,
    CalendarMenuComponent,
    IconButtonComponent,
    IconComponent,
    TooltipComponent,
    StateLayerComponent,
    FocusIndicatorComponent
  ];

  // TODO Phase 2: Remove _core and _adapter, replace with controllers
  private _core: CalendarCore;

  #internals: ElementInternals;

  /**
   * Gets the currently active date in the calendar.
   * @readonly
   */
  public get activeDate(): Date {
    return this._core.activeDate;
  }

  /**
   * Gets/sets whether to allow a single date range to be selected.
   * @default true
   * @attribute allow-single-date-range
   */
  @property({ type: Boolean, attribute: 'allow-single-date-range', reflect: true })
  public get allowSingleDateRange(): boolean {
    return this._core.allowSingleDateRange;
  }
  public set allowSingleDateRange(value: boolean) {
    this._core.allowSingleDateRange = value;
  }

  /**
   * Gets/sets whether to show a button to clear the selected date(s).
   * @default false
   * @attribute clear-button
   */
  @property({ type: Boolean, attribute: 'clear-button', reflect: true })
  public get clearButton(): boolean {
    return this._core.clearButton;
  }
  public set clearButton(value: boolean) {
    this._core.clearButton = value;
  }

  /**
   * Callback function to call when the clear button is clicked.
   */
  @property({ attribute: false })
  public get clearCallback(): (() => void) | undefined {
    return this._core.clearCallback;
  }
  public set clearCallback(value: (() => void) | undefined) {
    this._core.clearCallback = value;
  }

  /**
   * Gets/sets whether to constrain the selected date(s) to the enabled dates.
   * @default true
   * @attribute constrain-to-enabled
   */
  @property({ type: Boolean, attribute: 'constrain-to-enabled', reflect: true })
  public get constrainToEnabled(): boolean {
    return this._core.constrainToEnabled;
  }
  public set constrainToEnabled(value: boolean) {
    this._core.constrainToEnabled = value;
  }

  /**
   * Function to build the date content.
   */
  @property({ attribute: false })
  public get dateBuilder(): CalendarDateBuilder | undefined {
    return this._core.dateBuilder;
  }
  public set dateBuilder(value: CalendarDateBuilder | undefined) {
    this._core.dateBuilder = value;
  }

  /**
   * Callback function to call when a date is selected.
   */
  @property({ attribute: false })
  public get dateSelectCallback(): CalendarDateSelectCallback | undefined {
    return this._core.dateSelectCallback;
  }
  public set dateSelectCallback(value: CalendarDateSelectCallback | undefined) {
    this._core.dateSelectCallback = value;
  }

  /**
   * Function to build the day content.
   */
  @property({ attribute: false })
  public get dayBuilder(): CalendarDayBuilder | undefined {
    return this._core.dayBuilder;
  }
  public set dayBuilder(value: CalendarDayBuilder | undefined) {
    this._core.dayBuilder = value;
  }

  /**
   * Function to determine if a date is disabled.
   */
  @property({ attribute: false })
  public get disabledDateBuilder(): CalendarDisabledDateBuilder | undefined {
    return this._core.disabledDateBuilder;
  }
  public set disabledDateBuilder(value: CalendarDisabledDateBuilder | undefined) {
    this._core.disabledDateBuilder = value;
  }

  /**
   * Dates that are disabled from being selected.
   */
  @property({ attribute: false })
  public get disabledDates(): Date | Date[] | null | undefined {
    return this._core.disabledDates;
  }
  public set disabledDates(value: Date | Date[] | null | undefined) {
    this._core.disabledDates = value;
  }

  /**
   * Days of the week that are disabled from being selected.
   */
  @property({ attribute: false })
  public get disabledDaysOfWeek(): DayOfWeek | DayOfWeek[] | null | undefined {
    return this._core.disabledDaysOfWeek;
  }
  public set disabledDaysOfWeek(value: DayOfWeek | DayOfWeek[] | null | undefined) {
    this._core.disabledDaysOfWeek = value;
  }

  /**
   * Function to build the event content.
   */
  @property({ attribute: false })
  public get eventBuilder(): CalendarEventBuilder | undefined {
    return this._core.eventBuilder;
  }
  public set eventBuilder(value: CalendarEventBuilder | undefined) {
    this._core.eventBuilder = value;
  }

  /**
   * Events to display on the calendar.
   */
  @property({ attribute: false })
  public get events(): ICalendarEvent[] | null | undefined {
    return this._core.events;
  }
  public set events(value: ICalendarEvent[] | null | undefined) {
    this._core.events = value;
  }

  /**
   * Gets/sets the first day of the week.
   * @attribute first-day-of-week
   */
  @property({ type: Number, attribute: 'first-day-of-week', reflect: true })
  public get firstDayOfWeek(): DayOfWeek | undefined {
    return this._core.firstDayOfWeek;
  }
  public set firstDayOfWeek(value: DayOfWeek | undefined) {
    this._core.firstDayOfWeek = value;
  }

  /**
   * Gets/sets whether to fix the height of the calendar.
   * @default false
   * @attribute fixed-height
   */
  @property({ type: Boolean, attribute: 'fixed-height', reflect: true })
  public get fixedHeight(): boolean {
    return this._core.fixedHeight;
  }
  public set fixedHeight(value: boolean) {
    this._core.fixedHeight = value;
    toggleState(this.#internals, 'fixed-height', value);
  }

  /**
   * Gets/sets whether to list the years in the year view.
   * @default true
   * @attribute list-years
   */
  @property({ type: Boolean, attribute: 'list-years', reflect: true })
  public get listYears(): boolean {
    return this._core.listYears;
  }
  public set listYears(value: boolean) {
    this._core.listYears = value;
  }

  /**
   * Gets/sets the locale to use for formatting dates.
   * @attribute locale
   */
  @property({ reflect: true })
  public get locale(): string | undefined {
    return this._core.locale;
  }
  public set locale(value: string | undefined) {
    this._core.locale = value;
  }

  /**
   * Gets/sets the maximum date that can be selected.
   * @attribute max
   */
  @property({ reflect: true })
  public get max(): Date | string | null | undefined {
    return this._core.max;
  }
  public set max(value: Date | string | null | undefined) {
    this._core.max = value;
  }

  /**
   * Gets/sets the animation to use for the menu.
   * @default "scale"
   * @attribute menu-animation
   */
  @property({ attribute: 'menu-animation', reflect: true })
  public get menuAnimation(): CalendarMenuAnimationType {
    return this._core.menuAnimation;
  }
  public set menuAnimation(value: CalendarMenuAnimationType) {
    this._core.menuAnimation = value;
  }

  /**
   * Gets/sets the minimum date that can be selected.
   * @attribute min
   */
  @property({ reflect: true })
  public get min(): Date | string | null | undefined {
    return this._core.min;
  }
  public set min(value: Date | string | null | undefined) {
    this._core.min = value;
  }

  /**
   * Gets/sets the mode of the calendar.
   * @default "single"
   * @attribute mode
   */
  @property({ reflect: true })
  public get mode(): CalendarMode {
    return this._core.mode;
  }
  public set mode(value: CalendarMode) {
    this._core.mode = value;
  }

  /**
   * Gets/sets the month to display.
   * @default <current month>
   * @attribute month
   */
  @property({ type: Number, reflect: true })
  public get month(): number {
    return this._core.month;
  }
  public set month(value: number) {
    this._core.month = value;
  }

  /**
   * Gets/sets whether to prevent the calendar from taking focus.
   * @default false
   * @attribute prevent-focus
   */
  @property({ type: Boolean, attribute: 'prevent-focus', reflect: true })
  public get preventFocus(): boolean {
    return this._core.preventFocus;
  }
  public set preventFocus(value: boolean) {
    this._core.preventFocus = value;
    toggleState(this.#internals, 'prevent-focus', value);
  }

  /**
   * Gets/sets whether the calendar is readonly.
   * @default false
   * @attribute readonly
   */
  @property({ type: Boolean, reflect: true })
  public get readonly(): boolean {
    return this._core.readonly;
  }
  public set readonly(value: boolean) {
    this._core.readonly = value;
    toggleState(this.#internals, 'readonly', value);
  }

  /**
   * Gets/sets whether the selection follows the month.
   * @default false
   * @attribute selection-follows-month
   */
  @property({ type: Boolean, attribute: 'selection-follows-month', reflect: true })
  public get selectionFollowsMonth(): boolean {
    return this._core.selectionFollowsMonth;
  }
  public set selectionFollowsMonth(value: boolean) {
    this._core.selectionFollowsMonth = value;
  }

  /**
   * Gets/sets whether to show the header.
   * @default true
   * @attribute show-header
   */
  @property({ type: Boolean, attribute: 'show-header', reflect: true })
  public get showHeader(): boolean {
    return this._core.showHeader;
  }
  public set showHeader(value: boolean) {
    this._core.showHeader = value;
  }

  /**
   * Gets/sets whether to show days from other months.
   * @default false
   * @attribute show-other-months
   */
  @property({ type: Boolean, attribute: 'show-other-months', reflect: true })
  public get showOtherMonths(): boolean {
    return this._core.showOtherMonths;
  }
  public set showOtherMonths(value: boolean) {
    this._core.showOtherMonths = value;
  }

  /**
   * Gets/sets whether to show the today indicator.
   * @default true
   * @attribute show-today
   */
  @property({ type: Boolean, attribute: 'show-today', reflect: true })
  public get showToday(): boolean {
    return this._core.showToday;
  }
  public set showToday(value: boolean) {
    this._core.showToday = value;
  }

  /**
   * Gets/sets whether to show a button to select today.
   * @default false
   * @attribute today-button
   */
  @property({ type: Boolean, attribute: 'today-button', reflect: true })
  public get todayButton(): boolean {
    return this._core.todayButton;
  }
  public set todayButton(value: boolean) {
    this._core.todayButton = value;
  }

  /**
   * Callback function to call when the today button is clicked.
   */
  @property({ attribute: false })
  public get todayCallback(): (() => void) | undefined {
    return this._core.todayCallback;
  }
  public set todayCallback(value: (() => void) | undefined) {
    this._core.todayCallback = value;
  }

  /**
   * Function to build the tooltip content.
   */
  @property({ attribute: false })
  public get tooltipBuilder(): CalendarTooltipBuilder | undefined {
    return this._core.tooltipBuilder;
  }
  public set tooltipBuilder(value: CalendarTooltipBuilder | undefined) {
    this._core.tooltipBuilder = value;
  }

  /**
   * Gets/sets the selected date(s).
   */
  @property({ attribute: false })
  public get value(): Date | Date[] | DateRange | null | undefined {
    return this._core.value;
  }
  public set value(value: Date | Date[] | DateRange | null | undefined) {
    this._core.value = value;
  }

  /**
   * Gets/sets the view of the calendar.
   * @default "date"
   * @attribute view
   */
  @property({ reflect: true })
  public get view(): CalendarView {
    return this._core.view;
  }
  public set view(value: CalendarView) {
    this._core.view = value;
  }

  /**
   * Gets/sets the days of the week that are considered weekends.
   */
  @property({ attribute: false })
  public get weekendDays(): DayOfWeek[] | null | undefined {
    return this._core.weekendDays;
  }
  public set weekendDays(value: DayOfWeek[] | null | undefined) {
    this._core.weekendDays = value;
  }

  /**
   * Gets/sets the year to display.
   * @default <current year>
   * @attribute year
   */
  @property({ type: Number, reflect: true })
  public get year(): number {
    return this._core.year;
  }
  public set year(value: number) {
    this._core.year = value;
  }

  /**
   * Gets/sets the range of years to display.
   * @default "-50:+50"
   * @attribute year-range
   */
  @property({ attribute: 'year-range', reflect: true })
  public get yearRange(): string {
    return this._core.yearRange;
  }
  public set yearRange(value: string) {
    this._core.yearRange = value;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // TODO Phase 2: Remove attachShadowTemplate, use Lit render() instead
    attachShadowTemplate(this, template, styles);

    // TODO Phase 2: Remove this, initialize controllers instead
    this._core = new CalendarCore(new CalendarAdapter(this));
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // Check for popover context (Firefox compatibility)
    if (!this.hasAttribute(CALENDAR_CONSTANTS.attributes.POPOVER_CONTEXT) && elementParents(this).some(el => el.tagName.toLowerCase() === 'forge-popover')) {
      this.setAttribute(CALENDAR_CONSTANTS.attributes.POPOVER_CONTEXT, 'true');
    }

    // TODO Phase 2: Remove this, use willUpdate instead
    this._core.initialize();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    // TODO Phase 2: Remove this, cleanup controllers instead
    this._core.destroy();
  }

  public override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    // Let Lit handle the attribute change first
    super.attributeChangedCallback(name, oldValue, newValue);

    // Handle attribute changes and coerce to proper types
    // This ensures attributes work correctly with Lit decorators
    if (newValue === null) {
      return;
    }

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

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    // Update custom states based on view changes
    if (changedProperties.has('view')) {
      const oldView = changedProperties.get('view') as CalendarView | undefined;
      if (oldView) {
        toggleState(this.#internals, `view-${oldView}`, false);
      }
      toggleState(this.#internals, `view-${this.view}`, true);
    }

    // Additional state updates are handled by setters above
    // TODO Phase 2: Move all property change logic here instead of setters
  }

  // TODO Phase 2: Replace with Lit template
  public override render(): TemplateResult {
    // For Phase 1, we'll render nothing as the template is still attached via shadow DOM in constructor
    // The legacy adapter will still manipulate the DOM
    return html``;
  }

  /**
   * Clears the selected date(s).
   */
  public clear(): void {
    this._core.clear();
  }

  /**
   * Deselects a date.
   */
  public deselectDate(date: Date): void {
    this._core.deselectDate(new Date(date));
  }

  /**
   * Navigates to a specific date.
   */
  public goToDate(date: Date, setFocus?: boolean): void {
    this._core.goToDate(new Date(date), setFocus);
  }

  /**
   * Handles a keyboard event.
   */
  public handleKey(evt: KeyboardEvent): void {
    this._core.handleExternalKeyEvent(evt);
  }

  /**
   * Lays out the calendar.
   */
  public layout(): void {
    this._core.layout();
  }

  /**
   * Selects a date.
   */
  public selectDate(date: Date, setFocus?: boolean): void {
    this._core.selectDate(new Date(date), setFocus);
  }

  /**
   * Sets the active date.
   */
  public setActiveDate(date: Date, setFocus?: boolean): boolean {
    return this._core.setActiveDate(new Date(date), setFocus);
  }

  /**
   * Sets the calendar to today.
   */
  public today(): void {
    this._core.today();
  }

  /**
   * Toggles a date selection.
   */
  public toggleDate(date: Date, force?: boolean): void {
    this._core.toggleDate(new Date(date), force);
  }
}
