import { CUSTOM_ELEMENT_NAME_PROPERTY, LiveAnnouncer } from '@tylertech/forge-core';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { locateElementById, toggleState } from '../core/utils/utils.js';
import type { IPopoverToggleEventData } from '../popover/popover-constants.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { isSameDate } from '../core/utils/date-utils.js';
import { createFocusGroupRef, focusGroup } from '../core/utils/focus-group.js';
import { hideWhenEmpty } from '../core/utils/lit-utils.js';
import { CALENDAR_CONSTANTS, type ICalendarDateSelectEventData } from '../calendar/calendar-constants.js';
import type { ICalendarComponent } from '../calendar/calendar.js';
import { DateRange } from '../calendar/core/date-range.js';
import {
  DATE_TIME_PICKER_CONSTANTS,
  type CalendarDisabledDateBuilder,
  type ChangeSource,
  type DateMode,
  type DateRangePresetId,
  type DateTimePickerPublicValue,
  type DateTimePickerValue,
  type DateTimePickerValueMode,
  type DayOfWeek,
  type DisableSlotCallback,
  type IDateTimePickerChangeEventData,
  type IDateTimePickerRange,
  type ITimeSlot,
  type Orientation,
  type ResolvedOrientation,
  type TimeMode
} from './date-time-picker-constants.js';
import {
  applyFormValue,
  buildAnnouncement,
  buildSlotsFromRange,
  coerceValue,
  compareTimes,
  computePreset,
  dateOnly,
  formatDuration,
  formatSlotLabel,
  isRange,
  mergeDateAndTime,
  parseMaybeDate,
  parseTimeString,
  timeFromDate,
  toPublicValue,
  valuesEqual
} from './date-time-picker-utils.js';
import { ensureTemporal } from './temporal-loader.js';

import styles from './date-time-picker.scss';

const TIME_MODES: readonly TimeMode[] = ['single', 'range', 'slots'];

const CALENDAR_SECTION_HEIGHT_PROPERTY = '--_calendar-section-height';

const clickedButton = (event: Event): (HTMLElement & { value: string }) | null =>
  (event.target as HTMLElement).closest<HTMLElement & { value: string }>('forge-button');

const PRESET_DEFS: ReadonlyArray<{ id: DateRangePresetId; label: string }> = [
  { id: 'today', label: 'Today' },
  { id: 'this-week', label: 'This week' },
  { id: 'next-7-days', label: 'Next 7 days' },
  { id: 'this-month', label: 'This month' }
];

export interface IDateTimePickerComponent extends BaseLitElement {
  timeMode: TimeMode;
  dateMode: DateMode;
  valueMode: DateTimePickerValueMode;
  value: DateTimePickerPublicValue;
  name: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  orientation: Orientation;
  locale: string | undefined;
  use24HourTime: boolean;
  allowSeconds: boolean;
  min: Date | string | null;
  max: Date | string | null;
  minTime: string;
  maxTime: string;
  step: number;
  firstDayOfWeek: DayOfWeek | undefined;
  clearButton: boolean;
  todayButton: boolean;
  showHeader: boolean;
  showFooter: boolean;
  summary: boolean;
  singleLabel: string;
  fromLabel: string;
  toLabel: string;
  anchorElement: HTMLElement | null;
  isTimeSlotAvailable(date: Date): boolean;
  anchor: string;
  open: boolean;
  persistent: boolean;
  placement: string;
  presets: boolean;
  slots: ITimeSlot[] | undefined;
  disabledDates: Date[];
  disabledDaysOfWeek: DayOfWeek[];
  disableDayCallback: CalendarDisabledDateBuilder | undefined;
  disableSlotCallback: DisableSlotCallback | undefined;
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  readonly validity: ValidityState;
  readonly validationMessage: string;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-date-time-picker': IDateTimePickerComponent;
  }
}

export const DATE_TIME_PICKER_TAG_NAME: keyof HTMLElementTagNameMap = DATE_TIME_PICKER_CONSTANTS.elementName;

/**
 * @tag forge-date-time-picker
 *
 * @summary A composite calendar and time picker (single time, time range, or time slots). Renders inline,
 * or anchored in a `forge-popover` (a bottom sheet on small screens) when `anchor`/`anchorElement` is set. Form-associated.
 *
 * @fires {CustomEvent<void>} forge-date-time-picker-open - Fires when the overlay opens.
 * @fires {CustomEvent<void>} forge-date-time-picker-close - Fires when the overlay closes.
 * @fires {CustomEvent<IDateTimePickerChangeEventData>} forge-date-time-picker-change
 *  Fires whenever any part of the selection changes. `complete: true` only when all
 *  required parts (date + time, or date + from/to in range mode) are set.
 *
 * @slot header - Optional content above the calendar/time region.
 * @slot footer-start - Footer content aligned to the inline-start (left in LTR).
 * @slot footer-center - Footer content aligned to the inline center.
 * @slot footer-end - Footer content aligned to the inline-end (right in LTR). Common home of action buttons like "Continue".
 * @slot time-label - Optional caption rendered above the time UI.
 * @slot previous-month-button-text - Forwarded to the embedded calendar.
 * @slot next-month-button-text - Forwarded to the embedded calendar.
 * @slot today-button-text - Text for the Today button.
 * @slot clear-button-text - Text for the Clear button.
 *
 * @cssproperty --forge-date-time-picker-summary-background - Summary panel background color.
 * @cssproperty --forge-date-time-picker-summary-color - Summary panel text color.
 * @cssproperty --forge-date-time-picker-summary-width - Summary panel width.
 * @cssproperty --forge-date-time-picker-summary-padding - Summary panel padding.
 * @cssproperty --forge-date-time-picker-background - Background color.
 * @cssproperty --forge-date-time-picker-padding - Content padding.
 * @cssproperty --forge-date-time-picker-gap - Gap between header/body/footer.
 * @cssproperty --forge-date-time-picker-body-gap - Gap between calendar and time area.
 * @cssproperty --forge-date-time-picker-slot-list-gap - Gap between slot pills.
 * @cssproperty --forge-date-time-picker-slot-shape - Slot pill border-radius.
 * @cssproperty --forge-date-time-picker-slot-background - Slot pill background.
 * @cssproperty --forge-date-time-picker-slot-selected-background - Selected slot background.
 * @cssproperty --forge-date-time-picker-slot-selected-color - Selected slot text color.
 * @cssproperty --forge-date-time-picker-slot-list-max-height - Slot list max height before scrolling. Side-by-side layouts default to the calendar's height.
 * @cssproperty --forge-date-time-picker-slot-list-width - Slot list width. Defaults to the widest slot side-by-side, and to the calendar's width when stacked.
 *
 * @state horizontal - Applied when the calendar and time controls are laid out side by side.
 * @state vertical - Applied when the calendar and time controls are stacked.
 * @state time-single - Applied when `time-mode` is `single`.
 * @state time-range - Applied when `time-mode` is `range`.
 * @state time-slots - Applied when `time-mode` is `slots`.
 *
 * @csspart popover - The `forge-popover` hosting the card when anchored.
 * @csspart root - The root container.
 * @csspart header - Header slot wrapper.
 * @csspart body - Calendar + time wrapper.
 * @csspart calendar-section - Calendar wrapper.
 * @csspart calendar - The embedded `forge-calendar`.
 * @csspart time-section - Time UI wrapper.
 * @csspart time-label - Time label slot wrapper.
 * @csspart time-inputs - Time inputs wrapper (single/range modes).
 * @csspart time-input - Each embedded `forge-time-picker`.
 * @csspart slot-list - The `role="listbox"` container in slots mode.
 * @csspart slot - Each slot pill.
 * @csspart date-actions - Today/Clear button row below the calendar and time controls.
 * @csspart today-button - The Today button.
 * @csspart clear-button - The Clear button.
 * @csspart footer - Footer wrapper (hidden when all three footer sub-slots are empty).
 * @csspart footer-start - Inline-start zone of the footer.
 * @csspart footer-center - Center zone of the footer.
 * @csspart footer-end - Inline-end zone of the footer.
 * @csspart presets - The quick-range presets sidebar (only present when `presets` and `date-mode="range"`).
 * @csspart preset - Each individual preset button inside the presets sidebar.
 * @csspart duration - The muted duration summary text shown below the time inputs when a complete range is selected.
 * @csspart summary - The optional left-side summary panel (only present when `summary` is set).
 */
@customElement(DATE_TIME_PICKER_TAG_NAME)
export class DateTimePickerComponent extends BaseLitElement implements IDateTimePickerComponent {
  public static styles = unsafeCSS(styles);

  public static formAssociated = true;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DATE_TIME_PICKER_TAG_NAME;

  /**
   * Selection mode.
   * @attribute time-mode
   * @default 'single'
   */
  @property({ attribute: 'time-mode' })
  public timeMode: TimeMode = 'single';

  /**
   * Calendar selection mode. Use `range` to enable multi-day date-range picking alongside the time UI.
   * @attribute date-mode
   * @default 'single'
   */
  @property({ attribute: 'date-mode' })
  public dateMode: DateMode = 'single';

  /**
   * Shape of the public value and change-event value.
   * @attribute value-mode
   * @default 'temporal'
   */
  @property({ attribute: 'value-mode' })
  public valueMode: DateTimePickerValueMode = 'temporal';

  @property({ attribute: false })
  public get value(): DateTimePickerPublicValue {
    return toPublicValue(this.#value, this.valueMode, this.allowSeconds);
  }
  public set value(input: DateTimePickerPublicValue | string | undefined) {
    const next = this.#normalizeRangeTime(coerceValue(input, this.#isRangeValue() ? 'range' : 'single', this.allowSeconds));
    if (valuesEqual(next, this.#value)) {
      return;
    }
    const previousFromDate = this.#activeFromDate;
    this.#value = next;
    this.#syncFromValue(next);
    this.#revealValueDate ||= !!this.#activeFromDate && !isSameDate(previousFromDate, this.#activeFromDate);
    this.requestUpdate();
  }

  /** A single shared time input can't represent an asymmetric range, so align `to` with `from`'s time. */
  #normalizeRangeTime(value: DateTimePickerValue): DateTimePickerValue {
    if (this.dateMode === 'range' && this.timeMode !== 'range' && isRange(value)) {
      const to = new Date(value.to);
      to.setHours(value.from.getHours(), value.from.getMinutes(), value.from.getSeconds(), value.from.getMilliseconds());
      return { from: value.from, to };
    }
    return value;
  }

  /**
   * Form field name.
   * @attribute name
   */
  @property({ reflect: true }) public name = '';

  /**
   * Disables all interactive children.
   * @attribute disabled
   * @default false
   */
  @property({ type: Boolean }) public disabled = false;

  /**
   * Allows display without editing.
   * @attribute readonly
   * @default false
   */
  @property({ type: Boolean }) public readonly = false;

  /**
   * Marks the field as required for form validation.
   * @attribute required
   * @default false
   */
  @property({ type: Boolean }) public required = false;

  /**
   * Layout direction.
   * @attribute orientation
   * @default 'auto'
   */
  @property() public orientation: Orientation = 'auto';

  /**
   * BCP 47 locale tag for date/time formatting.
   * @attribute locale
   */
  @property() public locale: string | undefined;

  /**
   * 24h vs 12h for time inputs and slot labels.
   * @attribute use-24-hour-time
   * @default false
   */
  @property({ type: Boolean, attribute: 'use-24-hour-time' })
  public use24HourTime = false;

  /**
   * Whether to expose seconds.
   * @attribute allow-seconds
   * @default false
   */
  @property({ type: Boolean, attribute: 'allow-seconds' })
  public allowSeconds = false;

  /**
   * Earliest selectable date+time.
   * @attribute min
   */
  @property({ attribute: 'min' }) public min: Date | string | null = null;

  /**
   * Latest selectable date+time.
   * @attribute max
   */
  @property({ attribute: 'max' }) public max: Date | string | null = null;

  /**
   * Start time for slot generation.
   * @attribute min-time
   * @default '09:00'
   */
  @property({ attribute: 'min-time' }) public minTime: string = DATE_TIME_PICKER_CONSTANTS.defaultValues.MIN_TIME;

  /**
   * End time for slot generation.
   * @attribute max-time
   * @default '17:00'
   */
  @property({ attribute: 'max-time' }) public maxTime: string = DATE_TIME_PICKER_CONSTANTS.defaultValues.MAX_TIME;

  /**
   * Step in minutes (slot generation + time-picker step).
   * @attribute step
   * @default 15
   */
  @property({ type: Number }) public step: number = DATE_TIME_PICKER_CONSTANTS.defaultValues.STEP;

  /**
   * Forwarded to calendar.
   * @attribute first-day-of-week
   */
  @property({ type: Number, attribute: 'first-day-of-week' })
  public firstDayOfWeek: DayOfWeek | undefined;

  /**
   * Show a Clear button below the calendar and time controls.
   * @attribute clear-button
   * @default false
   */
  @property({ type: Boolean, attribute: 'clear-button' }) public clearButton = false;

  /**
   * Show a Today button below the calendar and time controls.
   * @attribute today-button
   * @default false
   */
  @property({ type: Boolean, attribute: 'today-button' }) public todayButton = false;

  /**
   * Forwarded to calendar.
   * @attribute show-header
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-header' }) public showHeader = true;

  /**
   * Renders the footer region and its three sub-slots.
   * @attribute show-footer
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-footer' }) public showFooter = false;

  /**
   * When enabled, shows a primary-colored side panel displaying the selected date (year, weekday, day, month).
   * @attribute summary
   * @default false
   */
  @property({ type: Boolean }) public summary = false;

  /**
   * Label for the time input in `single` mode.
   * @attribute single-label
   * @default 'Time'
   */
  @property({ attribute: 'single-label' }) public singleLabel = 'Time';

  /**
   * Label for the start-time input in `range` mode.
   * @attribute from-label
   * @default 'Start time'
   */
  @property({ attribute: 'from-label' }) public fromLabel = 'Start time';

  /**
   * Label for the end-time input in `range` mode.
   * @attribute to-label
   * @default 'End time'
   */
  @property({ attribute: 'to-label' }) public toLabel = 'End time';

  /**
   * Explicit time slots for `time-mode="slots"`. When unset or empty, slots are generated from `min-time`, `max-time`, and `step`.
   */
  @property({ attribute: false }) public slots: ITimeSlot[] | undefined;

  /**
   * Dates that cannot be selected in the calendar.
   * @default []
   */
  @property({ attribute: false }) public disabledDates: Date[] = [];

  /**
   * Days of the week (0 = Sunday) that cannot be selected in the calendar.
   * @default []
   */
  @property({ attribute: false }) public disabledDaysOfWeek: DayOfWeek[] = [];

  /**
   * Called for each calendar day; return `true` to disable that day.
   */
  @property({ attribute: false }) public disableDayCallback: CalendarDisabledDateBuilder | undefined;

  /**
   * Called with the selected date and each slot; return `true` to mark that slot unavailable.
   */
  @property({ attribute: false }) public disableSlotCallback: DisableSlotCallback | undefined;

  /** Whether `date`'s time of day matches an available (non-disabled) slot on that date. */
  public isTimeSlotAvailable(date: Date): boolean {
    const target = parseTimeString(timeFromDate(date, true));
    const slot =
      target &&
      this.#computedSlots().find(candidate => {
        const time = parseTimeString(candidate.value);
        return !!time && compareTimes(time, target) === 0;
      });
    if (!slot || slot.disabled) {
      return false;
    }
    const day = dateOnly(date);
    return !day || !this.disableSlotCallback?.(day, slot);
  }

  /**
   * Element to anchor the picker to. When set, the picker renders in a `forge-popover` (a bottom sheet on
   * small screens) instead of inline. Pointer presses on the anchor (or its shadow host) don't light-dismiss.
   * Takes precedence over `anchor`.
   * @default null
   */
  @property({ attribute: false })
  public get anchorElement(): HTMLElement | null {
    return this.#anchorElement;
  }
  public set anchorElement(el: HTMLElement | null) {
    this.#anchorElement = el;
    this.requestUpdate();
  }

  /**
   * ID of the element to anchor the picker to, resolved within the picker's own root (document or shadow root).
   * Ignored when `anchorElement` is set.
   * @attribute anchor
   */
  @property() public anchor = '';

  /**
   * Whether the anchored picker is open. Has no effect when rendered inline.
   * @attribute open
   * @default false
   */
  @property({ type: Boolean }) public open = false;

  /**
   * Prevents light dismiss (outside clicks and Escape) of the anchored picker.
   * @attribute persistent
   * @default false
   */
  @property({ type: Boolean }) public persistent = false;

  /**
   * Popover placement relative to the anchor.
   * @attribute placement
   * @default 'bottom-start'
   */
  @property({ attribute: 'placement' }) public placement = 'bottom-start';

  /**
   * Renders a quick-range presets sidebar (Today, This week, Next 7 days, This month) beside the calendar
   * when `date-mode="range"` and `time-mode` is not `slots`.
   * @attribute presets
   * @default true
   */
  @property({ type: Boolean }) public presets = true;

  // Mirrors Forge's $phone breakpoint; anchored pickers open as a bottom sheet.
  @state() private _isPhone = false;

  // Lifts the calendar's prevent-focus once focus() hands keyboard focus to the grid.
  @state() private _calendarFocusable = false;
  @state() private _hasHeader = false;

  #internals: ElementInternals;
  #anchorElement: HTMLElement | null = null;
  #resolvedAnchor: HTMLElement | null = null;
  #value: DateTimePickerValue = null;
  #activeFromDate: Date | null = null;
  #revealValueDate = false;
  #clickedPresetId: DateRangePresetId | undefined;
  #activeToDate: Date | null = null;
  #activeTime: string | null = null;
  #activeFrom: string | null = null;
  #activeTo: string | null = null;
  #typeaheadBuffer = '';
  #typeaheadTimer: ReturnType<typeof setTimeout> | null = null;
  #slotListCache: ITimeSlot[] | null = null;
  #disabledSlotCache: boolean[] | null = null;
  #intlSlotLabelFmt: Intl.DateTimeFormat | null = null;
  #intlSummaryFmt: Intl.DateTimeFormat | null = null;
  #announcedValue = false;
  #phoneMql: MediaQueryList | null = null;
  #calendarSection: HTMLElement | null = null;
  #calendarSectionHost: HTMLElement | null = null;
  #dismissPointerPath: EventTarget[] = [];
  #trackingDismissPointer = false;
  #calendarResizeObserver: ResizeObserver | null = null;
  #slotFocusGroup = createFocusGroupRef({
    selector: '[part~="slot"]',
    orientation: 'vertical',
    wrap: true,
    getEntryElement: () =>
      this.shadowRoot?.querySelector<HTMLElement>('[part~="slot"].slot--selected') ??
      this.shadowRoot?.querySelector<HTMLElement>('[part~="slot"]:not(.slot--disabled)') ??
      this.shadowRoot?.querySelector<HTMLElement>('[part~="slot"]') ??
      null
  });
  #onPhoneChange = (e: MediaQueryListEvent | MediaQueryList): void => {
    this._isPhone = e.matches;
  };

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  public get labels(): NodeList {
    return this.#internals.labels;
  }

  public get validity(): ValidityState {
    return this.#internals.validity;
  }

  public get validationMessage(): string {
    return this.#internals.validationMessage;
  }

  public checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  public formResetCallback(): void {
    this.#value = null;
    this.#syncFromValue(null);
    this.#updateFormValueAndValidity();
    this.requestUpdate();
  }

  public formDisabledCallback(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public formStateRestoreCallback(restoredState: FormData | string | null): void {
    if (restoredState == null) {
      return;
    }
    if (typeof restoredState === 'string') {
      this.value = restoredState;
      return;
    }
    const fromKey = `${this.name || ''}.from`;
    const toKey = `${this.name || ''}.to`;
    const fromVal = restoredState.get(fromKey);
    const toVal = restoredState.get(toKey);
    if (typeof fromVal === 'string' && typeof toVal === 'string') {
      this.value = { from: new Date(fromVal), to: new Date(toVal) } as IDateTimePickerRange;
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'group' });
    if (!this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) {
      setDefaultAria(this, this.#internals, { ariaLabel: 'Date and time picker' });
    }
    this.#syncFromValue(this.#value);
    this.#updateFormValueAndValidity();
    this.#resolveAnchor();
    this.#warmTemporal();
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      this.#phoneMql = window.matchMedia('(max-width: 599px)');
      this.#phoneMql.addEventListener('change', this.#onPhoneChange);
      this.#onPhoneChange(this.#phoneMql);
    }
    if (this.hasUpdated) {
      this.#observeCalendarSection();
    }
  }

  /** Lazily loads the Temporal polyfill when `valueMode` needs it. */
  #warmTemporal(): void {
    if (this.valueMode !== 'temporal') {
      return;
    }
    void ensureTemporal().then(() => this.requestUpdate());
  }

  /** Moves focus to the calendar's selected date (or today), e.g. when a linked field opens the picker from the keyboard. */
  public override focus(options?: FocusOptions): void {
    if (this.isUpdatePending) {
      void this.updateComplete.then(() => this.#focusCalendar(options));
      return;
    }
    this.#focusCalendar(options);
  }

  #focusCalendar(options?: FocusOptions): void {
    const calendar = this.shadowRoot?.querySelector<ICalendarComponent>('forge-calendar');
    if (!calendar) {
      super.focus(options);
      return;
    }
    if (this.#isAnchored() && !this.open) {
      super.focus(options);
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this._calendarFocusable = true;
    calendar.preventFocus = false;
    calendar.goToDate(this.#activeFromDate ?? today, true);
  }

  public override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('anchor') || (this.anchor && !this.#resolvedAnchor?.isConnected)) {
      this.#resolveAnchor();
    }
    this.#handleOpenChange(changed);
    this.#handleTimeModeChange(changed);
    this.#handleLocaleOrFormatChange(changed);
    this.#handleSlotConfigChange(changed);
    this.#handleMinMaxChange(changed);
    this.#handleValueModeChange(changed);
  }

  #handleOpenChange(changed: PropertyValues<this>): void {
    if (changed.has('open')) {
      this._calendarFocusable = false;
    }
    if (changed.has('open') && changed.get('open') !== undefined) {
      const eventName = this.open ? DATE_TIME_PICKER_CONSTANTS.events.OPEN : DATE_TIME_PICKER_CONSTANTS.events.CLOSE;
      this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true }));
    }
  }

  #handleTimeModeChange(changed: PropertyValues<this>): void {
    if (!changed.get('timeMode')) {
      return;
    }
    this.#value = null;
    this.#syncFromValue(null);
    void this.updateComplete.then(() => this.#emitChange('mode-change'));
  }

  #handleLocaleOrFormatChange(changed: PropertyValues<this>): void {
    if (changed.has('locale') || changed.has('use24HourTime') || changed.has('allowSeconds')) {
      this.#intlSlotLabelFmt = null;
      this.#intlSummaryFmt = null;
    }
  }

  #handleSlotConfigChange(changed: PropertyValues<this>): void {
    if (
      changed.has('timeMode') ||
      changed.has('slots') ||
      changed.has('minTime') ||
      changed.has('maxTime') ||
      changed.has('step') ||
      changed.has('allowSeconds') ||
      changed.has('disableSlotCallback')
    ) {
      this.#slotListCache = null;
      this.#disabledSlotCache = null;
    }
  }

  #handleMinMaxChange(changed: PropertyValues<this>): void {
    if (changed.has('min') || changed.has('max')) {
      this.#disabledSlotCache = null;
    }
  }

  #handleValueModeChange(changed: PropertyValues<this>): void {
    if (changed.has('valueMode')) {
      this.#warmTemporal();
    }
  }

  public override updated(_changed: PropertyValues<this>): void {
    this.#updateFormValueAndValidity();
    this.#slotFocusGroup.update();
    this.#observeCalendarSection();
    toggleState(this.#internals, 'sheet', this._isPhone && this.#isAnchored());
    toggleState(this.#internals, 'summary', this.summary);
    toggleState(this.#internals, 'disabled', this.disabled);
    toggleState(this.#internals, 'readonly', this.readonly);
    const orientation = this.#resolveOrientation();
    toggleState(this.#internals, 'horizontal', orientation === 'horizontal');
    toggleState(this.#internals, 'vertical', orientation === 'vertical');
    TIME_MODES.forEach(mode => toggleState(this.#internals, `time-${mode}`, this.timeMode === mode));
    this.#trackDismissPointer(this.open && !!this.#effectiveAnchor());
    this.#revealCalendarValue();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#trackDismissPointer(false);
    if (this.#typeaheadTimer != null) {
      clearTimeout(this.#typeaheadTimer);
      this.#typeaheadTimer = null;
    }
    this.#phoneMql?.removeEventListener('change', this.#onPhoneChange);
    this.#phoneMql = null;
    this.#calendarResizeObserver?.disconnect();
    this.#calendarResizeObserver = null;
    this.#calendarSection = null;
    this.#calendarSectionHost = null;
  }

  #resolveAnchor(): void {
    this.#resolvedAnchor = this.anchor ? locateElementById(this, this.anchor) : null;
  }

  #effectiveAnchor(): HTMLElement | null {
    return this.#anchorElement ?? this.#resolvedAnchor;
  }

  // An unresolved `anchor` id still renders overlay mode so the card never flashes inline.
  #isAnchored(): boolean {
    return !!this.#effectiveAnchor() || !!this.anchor;
  }

  /** Tracks the calendar section's height so a side-by-side slot list can match it. */
  #observeCalendarSection(): void {
    const section = this.shadowRoot?.querySelector<HTMLElement>('.calendar-section') ?? null;
    if (section === this.#calendarSection) {
      return;
    }
    this.#calendarSectionHost?.style.removeProperty(CALENDAR_SECTION_HEIGHT_PROPERTY);
    this.#calendarResizeObserver?.disconnect();
    this.#calendarSection = section;
    this.#calendarSectionHost = section?.parentElement ?? null;
    if (!section || typeof ResizeObserver === 'undefined') {
      return;
    }
    this.#calendarResizeObserver ??= new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      this.#calendarSectionHost?.style.setProperty(CALENDAR_SECTION_HEIGHT_PROPERTY, `${height}px`);
    });
    this.#calendarResizeObserver.observe(section);
  }

  public override render(): TemplateResult {
    const anchor = this.#effectiveAnchor();
    const anchored = this.#isAnchored();
    if (anchored && this._isPhone) {
      // inline-modal, not modal: showModal() would make the body-level time dropdown inert.
      return html`
        <forge-bottom-sheet mode="inline-modal" fullscreen ?open=${this.open} ?persistent=${this.persistent} @forge-bottom-sheet-close=${this.#onLightDismiss}>
          ${this.#renderCard()}
        </forge-bottom-sheet>
      `;
    }
    if (anchored) {
      return html`
        <forge-popover
          part="popover"
          trigger-type="manual"
          anchor-accessibility="none"
          .placement=${this.placement}
          .persistent=${this.persistent}
          .anchorElement=${anchor}
          .open=${this.open}
          @forge-popover-beforetoggle=${this.#onPopoverBeforeToggle}
          @forge-popover-toggle=${this.#onPopoverToggle}>
          ${this.#renderCard()}
        </forge-popover>
      `;
    }
    return this.#renderCard();
  }

  // Presses inside the anchor's shadow host (e.g. a linked field's text field) aren't outside clicks.
  #onPopoverBeforeToggle = (event: CustomEvent<IPopoverToggleEventData>): void => {
    const host = this.#dismissExemptElement();
    if (event.detail.newState === 'closed' && host && this.#dismissPointerPath.includes(host)) {
      event.preventDefault();
    }
  };

  #dismissExemptElement(): HTMLElement | null {
    const anchor = this.#effectiveAnchor();
    if (!anchor) {
      return null;
    }
    const root = anchor.getRootNode();
    return root instanceof ShadowRoot ? (root.host as HTMLElement) : anchor;
  }

  #trackDismissPointer(track: boolean): void {
    if (track === this.#trackingDismissPointer) {
      return;
    }
    this.#trackingDismissPointer = track;
    const method = track ? 'addEventListener' : 'removeEventListener';
    document[method]('pointerdown', this.#onDismissPointerDown, { capture: true });
    document[method]('keydown', this.#onDismissKeyDown, { capture: true });
    if (!track) {
      this.#dismissPointerPath = [];
    }
  }

  #onDismissPointerDown = (event: PointerEvent): void => {
    this.#dismissPointerPath = event.composedPath();
  };

  #onDismissKeyDown = (): void => {
    this.#dismissPointerPath = [];
  };

  #onPopoverToggle = ({ detail }: CustomEvent<IPopoverToggleEventData>): void => {
    if (detail.newState === 'closed') {
      this.#onLightDismiss();
    }
  };

  #onLightDismiss = (): void => {
    this.open = false;
  };

  #renderCard(): TemplateResult {
    const resolvedOrientation = this.#resolveOrientation();
    const overlayMode = this.#isAnchored();
    const sheet = this._isPhone && overlayMode;
    const content = html`${this.#renderHeader()} ${this.#renderBody(resolvedOrientation)} ${this.#renderDateActions()} ${this.#renderFooter()}`;
    const classes = {
      'forge-date-time-picker': true,
      [this.timeMode]: true,
      [resolvedOrientation]: true,
      sheet,
      popover: !sheet,
      'has-header': this._hasHeader
    };
    return html`
      <div
        part="root"
        class=${classMap(classes)}
        role=${ifDefined(overlayMode ? 'dialog' : undefined)}
        aria-label=${ifDefined(overlayMode ? 'Date and time picker' : undefined)}>
        ${this.summary ? this.#renderSummary() : nothing} ${this.summary ? html`<div class="content">${content}</div>` : content}
      </div>
    `;
  }

  #buildTimeOptions(): Intl.DateTimeFormatOptions {
    const opts: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !this.use24HourTime,
      hourCycle: this.use24HourTime ? 'h23' : 'h12'
    };
    if (this.allowSeconds) {
      opts.second = '2-digit';
    }
    return opts;
  }

  #getSlotLabelFmt(): Intl.DateTimeFormat {
    if (!this.#intlSlotLabelFmt) {
      this.#intlSlotLabelFmt = new Intl.DateTimeFormat(this.locale, this.#buildTimeOptions());
    }
    return this.#intlSlotLabelFmt;
  }

  #getSummaryFmt(): Intl.DateTimeFormat {
    if (!this.#intlSummaryFmt) {
      this.#intlSummaryFmt = new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
    }
    return this.#intlSummaryFmt;
  }

  #renderSummary(): TemplateResult {
    const date = this.#activeFromDate;
    if (!date) {
      return html`
        <aside part="summary" class="summary" aria-hidden="true">
          <span class="summary-empty">Pick a date</span>
        </aside>
      `;
    }
    const parts = this.#getSummaryFmt().formatToParts(date);
    const find = (type: Intl.DateTimeFormatPartTypes): string => parts.find(p => p.type === type)?.value ?? '';
    return html`
      <aside part="summary" class="summary" aria-hidden="true">
        <span class="summary-year">${find('year')}</span>
        <span class="summary-day">${find('weekday')},<br />${find('day')}<br />${find('month')}</span>
      </aside>
    `;
  }

  #onHeaderSlotChange = ({ target }: Event): void => {
    this._hasHeader = (target as HTMLSlotElement).assignedNodes().length > 0;
  };

  #renderHeader(): TemplateResult {
    return html`<slot name="header" part="header" ${hideWhenEmpty()} @slotchange=${this.#onHeaderSlotChange}></slot>`;
  }

  #renderDateActions(): TemplateResult | typeof nothing {
    if (!this.todayButton && !this.clearButton) {
      return nothing;
    }
    const inert = this.disabled || this.readonly;
    return html`
      <div part="date-actions" class="date-actions">
        ${this.todayButton
          ? html`<forge-button
              part="today-button"
              aria-label=${ifDefined(this.#showsPresets() ? 'Go to today' : undefined)}
              ?disabled=${inert}
              @click=${this.#onTodayClick}>
              <slot name="today-button-text">${CALENDAR_CONSTANTS.strings.DEFAULT_TODAY_BUTTON_TEXT}</slot>
            </forge-button>`
          : nothing}
        ${this.clearButton
          ? html`<forge-button part="clear-button" class="clear-button" ?disabled=${inert} @click=${this.#onClearClick}>
              <slot name="clear-button-text">${CALENDAR_CONSTANTS.strings.DEFAULT_CLEAR_BUTTON_TEXT}</slot>
            </forge-button>`
          : nothing}
      </div>
    `;
  }

  #renderFooter(): TemplateResult | typeof nothing {
    if (!this.showFooter) {
      return nothing;
    }
    return html`<div part="footer" class="footer" ${hideWhenEmpty()}>${this.#renderFooterSlots()}</div>`;
  }

  #renderFooterSlots(): TemplateResult {
    return html`
      <slot name="footer-start" part="footer-start" class="footer-start" ${hideWhenEmpty()}></slot>
      <slot name="footer-center" part="footer-center" class="footer-center" ${hideWhenEmpty()}></slot>
      <slot name="footer-end" part="footer-end" class="footer-end" ${hideWhenEmpty()}></slot>
    `;
  }

  #renderDuration(): TemplateResult | typeof nothing {
    const activeValue = this.#value;
    if (!isRange(activeValue)) {
      return nothing;
    }
    const text = formatDuration(activeValue.from, activeValue.to, this.locale);
    if (!text) {
      return nothing;
    }
    return html`<span part="duration" class="duration">${text}</span>`;
  }

  #renderBody(orientation: ResolvedOrientation): TemplateResult {
    const showPresets = this.#showsPresets();
    const calendarAndTime = html`${this.#renderCalendarSection()} ${this.#renderTimeSection()}`;
    return html`
      <div part="body" class=${classMap({ body: true, [`body--${orientation}`]: true })}>
        ${showPresets
          ? html`
              ${this.#renderPresets()}
              <div class=${classMap({ 'body-main': true, [`body-main--${orientation}`]: true })}>${calendarAndTime}</div>
            `
          : calendarAndTime}
      </div>
    `;
  }

  #showsPresets(): boolean {
    return this.presets && this.dateMode === 'range' && this.timeMode !== 'slots';
  }

  #renderPresets(): TemplateResult {
    const selectedId = this.#selectedPresetId();
    const inert = this.disabled || this.readonly;
    return html`
      <div part="presets" class="presets" role="group" aria-label="Quick date ranges" @click=${this.#onPresetsClick}>
        ${PRESET_DEFS.map(p => {
          const selected = p.id === selectedId;
          return html`<forge-button
            type="button"
            part="preset"
            class=${classMap({ preset: true, 'preset--selected': selected })}
            variant=${selected ? 'filled' : 'text'}
            aria-pressed=${selected ? 'true' : 'false'}
            .value=${p.id}
            ?disabled=${inert}>
            ${p.label}
          </forge-button>`;
        })}
      </div>
    `;
  }

  #onPresetsClick = (event: Event): void => {
    const id = clickedButton(event)?.value as DateRangePresetId | undefined;
    if (id) {
      this.#onPresetSelect(id);
    }
  };

  // The preset matching the selected dates; the clicked preset wins ties.
  #selectedPresetId(): DateRangePresetId | undefined {
    const from = this.#activeFromDate?.getTime();
    const to = this.#activeToDate?.getTime();
    if (from == null || to == null) {
      return undefined;
    }
    const now = new Date();
    const matches = (id: DateRangePresetId): boolean => {
      const range = computePreset(id, now, this.firstDayOfWeek ?? 0);
      return dateOnly(range.from)?.getTime() === from && dateOnly(range.to)?.getTime() === to;
    };
    if (this.#clickedPresetId && matches(this.#clickedPresetId)) {
      return this.#clickedPresetId;
    }
    return PRESET_DEFS.find(({ id }) => matches(id))?.id;
  }

  #onPresetSelect(id: DateRangePresetId): void {
    if (this.disabled || this.readonly) {
      return;
    }
    this.#clickedPresetId = id;
    const { from, to } = computePreset(id, new Date(), this.firstDayOfWeek ?? 0);
    this.#activeFromDate = dateOnly(from);
    this.#activeToDate = dateOnly(to);
    this.#defaultMissingTimes();
    this.#recomputeValue();
    this.#revealValueDate = true;
    this.#emitChange('preset');
    this.requestUpdate();
  }

  // Lets a complete date range resolve before any time is chosen.
  #defaultMissingTimes(): void {
    const start = this.minTime || (this.allowSeconds ? '00:00:00' : '00:00');
    if (this.timeMode === 'range') {
      this.#activeFrom ??= start;
      this.#activeTo ??= this.maxTime || (this.allowSeconds ? '23:59:59' : '23:59');
    } else if (this.timeMode === 'single') {
      this.#activeTime ??= start;
    }
  }

  #revealCalendarValue(): void {
    if (!this.#revealValueDate || !this.#activeFromDate) {
      return;
    }
    this.#revealValueDate = false;
    this.shadowRoot?.querySelector<ICalendarComponent>('forge-calendar')?.goToDate(this.#activeFromDate);
  }

  #renderCalendarSection(): TemplateResult {
    const isDateRange = this.dateMode === 'range' && this.timeMode !== 'slots';
    const calendarValue = isDateRange
      ? new DateRange({ from: this.#activeFromDate ?? undefined, to: this.#activeToDate ?? undefined })
      : (this.#activeFromDate ?? undefined);
    return html`
      <div part="calendar-section" class="calendar-section">
        <forge-calendar
          part="calendar"
          mode=${isDateRange ? 'range' : 'single'}
          ?allow-single-date-range=${isDateRange}
          ?prevent-focus=${!this._calendarFocusable}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          .showHeader=${this.showHeader}
          .value=${calendarValue as any}
          .min=${this.min as any}
          .max=${this.max as any}
          .disabledDates=${this.disabledDates}
          .disabledDaysOfWeek=${this.disabledDaysOfWeek}
          .disabledDateBuilder=${this.disableDayCallback}
          locale=${ifDefined(this.locale)}
          first-day-of-week=${ifDefined(this.firstDayOfWeek as number | undefined)}
          @forge-calendar-date-select=${this.#onCalendarSelect}>
          <slot name="previous-month-button-text" slot="previous-month-button-text">${CALENDAR_CONSTANTS.strings.DEFAULT_PREVIOUS_MONTH_BUTTON_TEXT}</slot>
          <slot name="next-month-button-text" slot="next-month-button-text">${CALENDAR_CONSTANTS.strings.DEFAULT_NEXT_MONTH_BUTTON_TEXT}</slot>
        </forge-calendar>
      </div>
    `;
  }

  #renderTimeSection(): TemplateResult {
    return html`
      <div part="time-section" class=${classMap({ 'time-section': true, [`time-section--${this.timeMode}`]: true })}>
        ${this.#renderTimeLabel()} ${this.#renderTimeBody()} ${this.#isRangeValue() ? this.#renderDuration() : nothing}
      </div>
    `;
  }

  #renderTimeLabel(): TemplateResult {
    return html`<slot name="time-label" part="time-label"></slot>`;
  }

  #renderTimeBody(): TemplateResult {
    switch (this.timeMode) {
      case 'single':
        return this.#renderSingleTime();
      case 'range':
        return this.#renderRangeTime();
      case 'slots':
        return this.#renderSlotList();
      default:
        return html`${nothing}`;
    }
  }

  #renderSingleTime(): TemplateResult {
    return html`
      <div part="time-inputs" class="time-inputs">${this.#renderTimePickerField(this.#activeTime, 'single', this.singleLabel, this.#activeFromDate)}</div>
    `;
  }

  #renderRangeTime(): TemplateResult {
    const toDate = this.dateMode === 'range' ? this.#activeToDate : this.#activeFromDate;
    return html`
      <div part="time-inputs" class="range-inputs">
        ${this.#renderTimePickerField(this.#activeFrom, 'from', this.fromLabel, this.#activeFromDate)}
        ${this.#renderTimePickerField(this.#activeTo, 'to', this.toLabel, toDate)}
      </div>
    `;
  }

  #renderTimePickerField(value: string | null, which: 'single' | 'from' | 'to', label: string, endpointDate: Date | null): TemplateResult {
    const meridiem = this.#meridiemFor(value);
    return html`
      <forge-time-picker
        part="time-input"
        allow-dropdown
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?use-24-hour-time=${this.use24HourTime}
        ?allow-seconds=${this.allowSeconds}
        step=${this.step}
        min=${ifDefined(this.#effectiveMinTime(endpointDate))}
        max=${ifDefined(this.#effectiveMaxTime(endpointDate))}
        .value=${value ?? ''}
        @forge-time-picker-change=${(e: Event) => this.#onTimePickerChange(e, which)}>
        <forge-text-field>
          ${label ? html`<label slot="label">${label}</label>` : nothing}
          <input type="text" aria-label=${ifDefined(label ? undefined : 'Time')} />
          ${meridiem ? html`<span slot="end" class="meridiem-badge" aria-hidden="true">${meridiem}</span>` : nothing}
        </forge-text-field>
      </forge-time-picker>
    `;
  }

  #meridiemFor(value: string | null): 'AM' | 'PM' | null {
    if (this.use24HourTime) {
      return null;
    }
    const parsed = parseTimeString(value);
    return parsed ? (parsed.hours < 12 ? 'AM' : 'PM') : null;
  }

  #renderSlotList(): TemplateResult {
    const list = this.#computedSlots();
    const disabledMap = this.#computedDisabledSlots();
    const labelFmt = this.#getSlotLabelFmt();
    return html`
      <div
        part="slot-list"
        class="slot-list"
        role="listbox"
        aria-label="Available times"
        aria-orientation="vertical"
        @keydown=${this.#onSlotListKeydown}
        @click=${this.#onSlotListClick}
        ${focusGroup(this.#slotFocusGroup)}>
        <div class="slot-list-inner">${list.map((slot, index) => this.#renderSlot(slot, disabledMap[index], labelFmt))}</div>
      </div>
    `;
  }

  #renderSlot(slot: ITimeSlot, slotIsDisabled: boolean, labelFmt: Intl.DateTimeFormat): TemplateResult {
    const selected = this.#activeTime === slot.value;
    // Unavailable options stay focusable via aria-disabled, per the listbox pattern.
    return html`
      <forge-button
        type="button"
        variant="outlined"
        full-width
        part=${`slot${selected ? ' slot--selected' : ''}${slotIsDisabled ? ' slot--disabled' : ''}`}
        class=${classMap({
          slot: true,
          'slot--selected': selected,
          'slot--disabled': slotIsDisabled
        })}
        role="option"
        aria-selected=${String(selected)}
        aria-disabled=${String(slotIsDisabled)}
        tabindex="-1"
        .value=${slot.value}
        ?disabled=${this.disabled || this.readonly}>
        ${slot.label ?? this.#formatSlotLabel(slot.value, labelFmt)}
      </forge-button>
    `;
  }

  #formatSlotLabel(value: string, fmt: Intl.DateTimeFormat): string {
    return formatSlotLabel(value, this.locale, this.use24HourTime, this.allowSeconds, fmt);
  }

  #computedSlots(): ITimeSlot[] {
    if (this.#slotListCache) {
      return this.#slotListCache;
    }
    const list = this.slots && this.slots.length ? this.slots : buildSlotsFromRange(this.minTime, this.maxTime, this.step, this.allowSeconds);
    this.#slotListCache = list;
    return list;
  }

  #computedDisabledSlots(): boolean[] {
    if (this.#disabledSlotCache) {
      return this.#disabledSlotCache;
    }
    const list = this.#computedSlots();
    const map = list.map(slot => this.#isSlotDisabled(slot));
    this.#disabledSlotCache = map;
    return map;
  }

  #isSlotDisabled(slot: ITimeSlot): boolean {
    if (slot.disabled) {
      return true;
    }
    if (this.#isSlotOutOfRange(slot)) {
      return true;
    }
    if (!this.disableSlotCallback) {
      return false;
    }
    const date = this.#activeFromDate ?? new Date();
    return this.disableSlotCallback(date, slot);
  }

  /** True when the slot's time on the active date falls outside the `min`/`max` datetime bounds. */
  #isSlotOutOfRange(slot: ITimeSlot): boolean {
    if (!this.#activeFromDate) {
      return false;
    }
    const dt = mergeDateAndTime(this.#activeFromDate, slot.value);
    return !!dt && (this.#beforeMin(dt, this.min) || this.#afterMax(dt, this.max));
  }

  /** `min`'s time-of-day when the endpoint is on `min`'s day; `minTime`/`maxTime` only drive slots. */
  #effectiveMinTime(endpointDate: Date | null): string | undefined {
    const min = this.#asDate(this.min);
    if (!min || !endpointDate || !isSameDate(min, endpointDate)) {
      return undefined;
    }
    return timeFromDate(min, this.allowSeconds) ?? undefined;
  }

  /** `max`'s time-of-day when the endpoint is on `max`'s day. */
  #effectiveMaxTime(endpointDate: Date | null): string | undefined {
    const max = this.#asDate(this.max);
    if (!max || !endpointDate || !isSameDate(max, endpointDate)) {
      return undefined;
    }
    return timeFromDate(max, this.allowSeconds) ?? undefined;
  }

  #onTodayClick = (): void => {
    const calendar = this.shadowRoot?.querySelector<ICalendarComponent>('forge-calendar');
    calendar?.today();
    calendar?.focus?.();
  };

  #onClearClick = (): void => {
    if (!this.#hasSelection()) {
      return;
    }
    this.#syncFromValue(null);
    this.#disabledSlotCache = null;
    this.#recomputeValue();
    this.#emitChange('clear');
    this.requestUpdate();
  };

  #hasSelection(): boolean {
    return this.#value != null || [this.#activeFromDate, this.#activeToDate, this.#activeTime, this.#activeFrom, this.#activeTo].some(part => part != null);
  }

  #onCalendarSelect = (event: Event): void => {
    const detail = (event as CustomEvent<ICalendarDateSelectEventData>).detail;
    if (this.dateMode === 'range' && this.timeMode !== 'slots') {
      const { range, rangeSelectionState } = detail;
      if (range?.from && (rangeSelectionState === 'from' || !range.to)) {
        this.#activeFromDate = dateOnly(range.from);
        this.#activeToDate = null;
      } else if (range?.from && range.to && rangeSelectionState === 'to') {
        this.#activeFromDate = dateOnly(range.from);
        this.#activeToDate = dateOnly(range.to);
        this.#defaultMissingTimes();
      } else {
        this.#activeFromDate = null;
        this.#activeToDate = null;
      }
    } else {
      const { date, selected } = detail;
      this.#activeFromDate = !date || selected ? null : dateOnly(date);
    }
    this.#disabledSlotCache = null;
    this.#recomputeValue();
    this.#emitChange('date');
    this.requestUpdate();
  };

  #onTimePickerChange = (event: Event, which: 'single' | 'from' | 'to'): void => {
    const detail = (event as CustomEvent).detail as string | null | undefined;
    const next = detail ? String(detail) : null;
    if (which === 'single') {
      this.#activeTime = next;
      this.#recomputeValue();
      this.#emitChange('time');
    } else if (which === 'from') {
      this.#activeFrom = next;
      this.#recomputeValue();
      this.#emitChange('time-from');
    } else {
      this.#activeTo = next;
      this.#recomputeValue();
      this.#emitChange('time-to');
    }
    this.requestUpdate();
  };

  #onSlotListClick = (event: Event): void => {
    const value = clickedButton(event)?.value;
    const slot = value ? this.#computedSlots().find(candidate => candidate.value === value) : undefined;
    if (slot) {
      this.#onSlotSelect(slot);
    }
  };

  #onSlotSelect(slot: ITimeSlot): void {
    if (this.disabled || this.readonly || this.#isSlotDisabled(slot)) {
      return;
    }
    this.#activeTime = slot.value;
    this.#recomputeValue();
    this.#emitChange('slot');
    this.requestUpdate();
  }

  #onSlotListKeydown = (event: KeyboardEvent): void => {
    const list = this.#computedSlots();
    if (!list.length) {
      return;
    }
    if (this.#slotFocusGroup.fromEvent(event)) {
      return;
    }
    if (event.key === 'Escape') {
      const calendar = this.shadowRoot?.querySelector<ICalendarComponent>('forge-calendar');
      calendar?.focus?.();
      return;
    }
    if (/^\d$/.test(event.key)) {
      this.#typeaheadAppend(event.key, list);
    }
  };

  #typeaheadAppend(char: string, list: ITimeSlot[]): void {
    this.#typeaheadBuffer += char;
    if (this.#typeaheadTimer) {
      clearTimeout(this.#typeaheadTimer);
    }
    this.#typeaheadTimer = setTimeout(() => {
      this.#typeaheadBuffer = '';
    }, 1000);
    const buffer = this.#typeaheadBuffer;
    const match = list.findIndex(slot => slot.value.replace(':', '').startsWith(buffer) || slot.value.startsWith(buffer));
    if (match >= 0) {
      this.#slotFocusGroup.focusAt(match);
    }
  }

  #syncFromValue(value: DateTimePickerValue): void {
    if (value == null) {
      this.#activeFromDate = null;
      this.#activeToDate = null;
      this.#activeTime = null;
      this.#activeFrom = null;
      this.#activeTo = null;
      return;
    }
    if (isRange(value)) {
      this.#activeFromDate = dateOnly(value.from);
      this.#activeToDate = dateOnly(value.to);
      if (this.timeMode === 'range') {
        this.#activeFrom = timeFromDate(value.from, this.allowSeconds);
        this.#activeTo = timeFromDate(value.to, this.allowSeconds);
      } else {
        this.#activeTime = timeFromDate(value.from, this.allowSeconds);
      }
      return;
    }
    this.#activeFromDate = dateOnly(value);
    this.#activeTime = timeFromDate(value, this.allowSeconds);
  }

  #isRangeValue(): boolean {
    return this.dateMode === 'range' || this.timeMode === 'range';
  }

  #recomputeValue(): void {
    if (this.#isRangeValue()) {
      const toDate = this.dateMode === 'range' ? this.#activeToDate : this.#activeFromDate;
      const fromTime = this.timeMode === 'range' ? this.#activeFrom : this.#activeTime;
      const toTime = this.timeMode === 'range' ? this.#activeTo : this.#activeTime;
      const from = mergeDateAndTime(this.#activeFromDate, fromTime);
      const to = mergeDateAndTime(toDate, toTime);
      this.#value = from && to ? { from, to } : null;
      return;
    }
    const merged = mergeDateAndTime(this.#activeFromDate, this.#activeTime);
    this.#value = merged;
  }

  #resolveOrientation(): ResolvedOrientation {
    if (this.orientation === 'horizontal') {
      return 'horizontal';
    }
    if (this.orientation === 'vertical') {
      return 'vertical';
    }
    return this.timeMode === 'slots' ? 'horizontal' : 'vertical';
  }

  #isComplete(): boolean {
    if (this.#isRangeValue()) {
      return isRange(this.#value);
    }
    return this.#value instanceof Date;
  }

  #beforeMin(d: Date, bound: Date | string | null): boolean {
    const min = this.#asDate(bound);
    return !!min && d.getTime() < min.getTime();
  }

  #afterMax(d: Date, bound: Date | string | null): boolean {
    const max = this.#asDate(bound);
    return !!max && d.getTime() > max.getTime();
  }

  #asDate(input: Date | string | null | undefined): Date | null {
    if (input instanceof Date) {
      return input;
    }
    if (typeof input === 'string' && input) {
      return parseMaybeDate(input);
    }
    return null;
  }

  #updateFormValueAndValidity(): void {
    applyFormValue(this.#internals, this.name, this.#value);
    this.#updateValidity();
  }

  #updateValidity(): void {
    if (this.disabled || (!this.required && !this.#hasValueConstraintViolation())) {
      this.#internals.setValidity({});
      return;
    }

    const flags: ValidityStateFlags = {};
    let message = '';
    if (this.required && !this.#isComplete()) {
      flags.valueMissing = true;
      message = 'Please select a date and time.';
    }
    const single = this.#value instanceof Date ? this.#value : null;
    if (single && this.#beforeMin(single, this.min)) {
      flags.rangeUnderflow = true;
      message ||= 'Selected time is before the earliest allowed.';
    }
    if (single && this.#afterMax(single, this.max)) {
      flags.rangeOverflow = true;
      message ||= 'Selected time is after the latest allowed.';
    }
    if (this.#isRangeValue() && isRange(this.#value)) {
      if (this.#value.from.getTime() > this.#value.to.getTime()) {
        flags.customError = true;
        message ||= this.dateMode === 'range' ? 'Start date must be before end date.' : 'Start time must be before end time.';
      }
      if (this.#beforeMin(this.#value.from, this.min) || this.#beforeMin(this.#value.to, this.min)) {
        flags.rangeUnderflow = true;
        message ||= 'Selected range is before the earliest allowed.';
      }
      if (this.#afterMax(this.#value.from, this.max) || this.#afterMax(this.#value.to, this.max)) {
        flags.rangeOverflow = true;
        message ||= 'Selected range is after the latest allowed.';
      }
    }
    if (this.#isSelectionDisabled()) {
      flags.customError = true;
      message ||= 'Selected time is unavailable.';
    }
    if (Object.keys(flags).length === 0) {
      this.#internals.setValidity({});
      return;
    }
    this.#internals.setValidity(flags, message);
  }

  #hasValueConstraintViolation(): boolean {
    const v = this.#value;
    if (v == null) {
      return false;
    }
    if (isRange(v)) {
      if (v.from.getTime() > v.to.getTime()) {
        return true;
      }
      if (this.#beforeMin(v.from, this.min) || this.#beforeMin(v.to, this.min)) {
        return true;
      }
      if (this.#afterMax(v.from, this.max) || this.#afterMax(v.to, this.max)) {
        return true;
      }
      return false;
    }
    if (this.#beforeMin(v, this.min) || this.#afterMax(v, this.max)) {
      return true;
    }
    return this.#isSelectionDisabled();
  }

  #isSelectionDisabled(): boolean {
    if (this.timeMode !== 'slots' || !this.#activeTime) {
      return false;
    }
    const list = this.#computedSlots();
    const slot = list.find(s => s.value === this.#activeTime);
    if (!slot) {
      return false;
    }
    return this.#isSlotDisabled(slot);
  }

  #emitChange(source: ChangeSource): void {
    const detail: IDateTimePickerChangeEventData = {
      value: toPublicValue(this.#value, this.valueMode, this.allowSeconds),
      date: this.#activeFromDate,
      dateTo: this.dateMode === 'range' ? this.#activeToDate : null,
      time: this.timeMode === 'range' ? null : this.#activeTime,
      from: this.timeMode === 'range' ? this.#activeFrom : null,
      to: this.timeMode === 'range' ? this.#activeTo : null,
      source,
      complete: this.#isComplete()
    };
    this.dispatchEvent(
      new CustomEvent<IDateTimePickerChangeEventData>(DATE_TIME_PICKER_CONSTANTS.events.CHANGE, {
        detail,
        bubbles: true,
        composed: true
      })
    );
    void this.updateComplete.then(() => this.#announce());
  }

  #announce(): void {
    // A null value is only a clear if a value was announced before; incomplete selections stay silent.
    if (this.#value == null) {
      if (this.#announcedValue) {
        this.#announcedValue = false;
        LiveAnnouncer.instance.announce(buildAnnouncement(null, this.locale, this.use24HourTime, this.allowSeconds), 'polite');
      }
      return;
    }
    if (!this.#isComplete()) {
      return;
    }
    this.#announcedValue = true;
    LiveAnnouncer.instance.announce(buildAnnouncement(this.#value, this.locale, this.use24HourTime, this.allowSeconds), 'polite');
  }
}
