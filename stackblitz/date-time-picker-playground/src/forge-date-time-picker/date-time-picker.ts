import { LitElement, html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef } from 'lit/directives/ref.js';
import {
  DATE_TIME_PICKER_CONSTANTS,
  type CalendarDisabledDateBuilder,
  type ChangeSource,
  type DateTimePickerValue,
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
  buildAnnouncement,
  buildSlotsFromRange,
  coerceValue,
  dateOnly,
  formatSlotLabel,
  isRange,
  mergeDateAndTime,
  parseTimeString,
  timeFromDate
} from './date-time-picker-utils.js';

import styles from './date-time-picker.css?inline';

/** Minimal stand-in for forge-calendar's event detail. */
interface ICalendarDateSelectEventData {
  date: Date | null;
  selected: boolean;
  type: 'date' | 'month' | 'year';
}

/** Loose stand-ins for the forge component types used only for typing. */
type ICalendarComponent = HTMLElement & { focus(): void };
type IPopoverComponent = HTMLElement & { open: boolean; anchorElement: HTMLElement | null };

/**
 * Mirror of `@tylertech/forge-core`'s `CUSTOM_ELEMENT_NAME_PROPERTY` (Symbol used by
 * the legacy decorator). Re-declared locally so the playground doesn't import the core
 * package's full surface.
 */
const CUSTOM_ELEMENT_NAME_PROPERTY = Symbol.for('CUSTOM_ELEMENT_NAME_PROPERTY');

/** Minimal `setDefaultAria` — sets ARIA via ElementInternals where supported, else attribute. */
function setDefaultAria(
  element: HTMLElement,
  internals: ElementInternals,
  props: { role?: string; ariaLabel?: string }
): void {
  const supports = 'role' in ElementInternals.prototype;
  for (const [key, value] of Object.entries(props)) {
    if (value == null) continue;
    if (supports) {
      (internals as unknown as Record<string, string>)[key] = value;
    }
    const attr = key === 'role' ? 'role' : 'aria-' + key.replace(/^aria/, '').toLowerCase();
    if (!element.hasAttribute(attr)) {
      element.setAttribute(attr, String(value));
    }
  }
}

// Base class for the playground. In the real library this is `BaseLitElement`.
const BaseLitElement = LitElement;
type BaseLitElement = LitElement;

export type { IDateTimePickerChangeEventData } from './date-time-picker-constants.js';

export interface IDateTimePickerComponent extends BaseLitElement {
  variant: 'static' | 'inline';
  timeMode: TimeMode;
  value: DateTimePickerValue;
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
 * @summary An inline composite that combines a calendar with a time-picking UI
 * (single time, time range, or preset time slots). Form-associated and WCAG 2.1 AA.
 *
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
 * @slot today-button-text - Forwarded to the embedded calendar.
 * @slot clear-button-text - Forwarded to the embedded calendar.
 *
 * @attribute {('single'|'range'|'slots')} [time-mode='single'] - Selection mode.
 * @attribute {('auto'|'horizontal'|'vertical')} [orientation='auto'] - Layout direction.
 * @attribute {boolean} [disabled=false] - Disables all interactive children.
 * @attribute {boolean} [readonly=false] - Allows display without editing.
 * @attribute {boolean} [required=false] - Marks the field as required for form validation.
 * @attribute {string} [name] - Form field name.
 * @attribute {string} [locale] - BCP 47 locale tag for date/time formatting.
 * @attribute {boolean} [use-24-hour-time=false] - 24h vs 12h for time inputs and slot labels.
 * @attribute {boolean} [allow-seconds=false] - Whether to expose seconds.
 * @attribute {Date|string} [min] - Earliest selectable date+time.
 * @attribute {Date|string} [max] - Latest selectable date+time.
 * @attribute {string} [min-time='09:00'] - Start time for slot generation.
 * @attribute {string} [max-time='17:00'] - End time for slot generation.
 * @attribute {number} [step=15] - Step in minutes (slot generation + time-picker step).
 * @attribute {number} [first-day-of-week] - Forwarded to calendar.
 * @attribute {boolean} [clear-button=false] - Show calendar clear button.
 * @attribute {boolean} [today-button=false] - Show calendar today button.
 * @attribute {boolean} [show-header=true] - Forwarded to calendar.
 * @attribute {boolean} [summary=false] - When enabled, shows a primary-colored side panel
 *  displaying the selected date (year, weekday, day, month).
 *
 * @cssproperty --forge-date-time-picker-summary-background - Summary panel background color.
 * @cssproperty --forge-date-time-picker-summary-color - Summary panel text color.
 * @cssproperty --forge-date-time-picker-summary-min-width - Summary panel min-width.
 * @cssproperty --forge-date-time-picker-summary-padding - Summary panel padding.
 * @cssproperty --forge-date-time-picker-summary-day-font-size - Summary panel main day-text font size.
 *
 * @csspart summary - The optional left-side summary panel (only present when `summary` is set).
 *
 * @cssproperty --forge-date-time-picker-background - Card background color.
 * @cssproperty --forge-date-time-picker-shape - Card border-radius.
 * @cssproperty --forge-date-time-picker-elevation - Card box-shadow.
 * @cssproperty --forge-date-time-picker-padding - Card padding.
 * @cssproperty --forge-date-time-picker-gap - Gap between header/body/footer.
 * @cssproperty --forge-date-time-picker-body-gap - Gap between calendar and time area.
 * @cssproperty --forge-date-time-picker-slot-list-gap - Gap between slot pills.
 * @cssproperty --forge-date-time-picker-slot-shape - Slot pill border-radius.
 * @cssproperty --forge-date-time-picker-slot-background - Slot pill background.
 * @cssproperty --forge-date-time-picker-slot-selected-background - Selected slot background.
 * @cssproperty --forge-date-time-picker-slot-selected-color - Selected slot text color.
 * @cssproperty --forge-date-time-picker-slot-list-max-height - Slot list max height before scrolling.
 * @cssproperty --forge-date-time-picker-slot-list-width - Slot list width (defaults to match the calendar).
 *
 * @csspart root - The card container.
 * @csspart header - Header slot wrapper.
 * @csspart body - Calendar + time wrapper.
 * @csspart calendar-section - Calendar wrapper.
 * @csspart calendar - The embedded `forge-calendar`.
 * @csspart time-section - Time UI wrapper.
 * @csspart time-label - Time label slot wrapper.
 * @csspart time-inputs - Time inputs wrapper (single/range modes).
 * @csspart time-input - Each embedded `forge-time-picker`.
 * @csspart slot-list - The `<ul>` listbox in slots mode.
 * @csspart slot - Each slot pill.
 * @csspart footer - Footer wrapper (hidden when all three footer sub-slots are empty).
 * @csspart footer-start - Inline-start zone of the footer.
 * @csspart footer-center - Center zone of the footer.
 * @csspart footer-end - Inline-end zone of the footer.
 * @csspart live-region - Visually-hidden live region used for a11y announcements.
 */
@customElement(DATE_TIME_PICKER_TAG_NAME)
export class DateTimePickerComponent extends BaseLitElement implements IDateTimePickerComponent {
  public static styles = unsafeCSS(styles);

  public static formAssociated = true;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DATE_TIME_PICKER_TAG_NAME;

  @property({ reflect: true }) public variant: 'static' | 'inline' = 'static';

  @property({ attribute: 'time-mode', reflect: true })
  public timeMode: TimeMode = 'single';

  @property({ attribute: false })
  public get value(): DateTimePickerValue {
    return this.#value;
  }
  public set value(input: DateTimePickerValue | string | undefined) {
    const next = coerceValue(input, this.timeMode, this.allowSeconds);
    if (this.#valuesEqual(next, this.#value)) {
      return;
    }
    this.#value = next;
    this.#syncFromValue(next);
    this.requestUpdate();
  }

  @property({ reflect: true }) public name = '';
  @property({ type: Boolean, reflect: true }) public disabled = false;
  @property({ type: Boolean, reflect: true }) public readonly = false;
  @property({ type: Boolean, reflect: true }) public required = false;
  @property({ reflect: true }) public orientation: Orientation = 'auto';

  @property({ reflect: true }) public locale: string | undefined;

  @property({ type: Boolean, attribute: 'use-24-hour-time', reflect: true })
  public use24HourTime = false;

  @property({ type: Boolean, attribute: 'allow-seconds', reflect: true })
  public allowSeconds = false;

  @property({ attribute: 'min' }) public min: Date | string | null = null;
  @property({ attribute: 'max' }) public max: Date | string | null = null;
  @property({ attribute: 'min-time' }) public minTime = DATE_TIME_PICKER_CONSTANTS.defaultValues.MIN_TIME;
  @property({ attribute: 'max-time' }) public maxTime = DATE_TIME_PICKER_CONSTANTS.defaultValues.MAX_TIME;
  @property({ type: Number }) public step: number = DATE_TIME_PICKER_CONSTANTS.defaultValues.STEP;
  @property({ type: Number, attribute: 'first-day-of-week' })
  public firstDayOfWeek: DayOfWeek | undefined;

  @property({ type: Boolean, attribute: 'clear-button' }) public clearButton = false;
  @property({ type: Boolean, attribute: 'today-button' }) public todayButton = false;
  @property({ type: Boolean, attribute: 'show-header' }) public showHeader = true;
  @property({ type: Boolean, attribute: 'show-footer', reflect: true }) public showFooter = false;
  @property({ type: Boolean, reflect: true }) public summary = false;
  @property({ attribute: 'single-label' }) public singleLabel = 'Time';
  @property({ attribute: 'from-label' }) public fromLabel = 'Start time';
  @property({ attribute: 'to-label' }) public toLabel = 'End time';

  @property({ attribute: false }) public slots: ITimeSlot[] | undefined;
  @property({ attribute: false }) public disabledDates: Date[] = [];
  @property({ attribute: false }) public disabledDaysOfWeek: DayOfWeek[] = [];
  @property({ attribute: false }) public disableDayCallback: CalendarDisabledDateBuilder | undefined;
  @property({ attribute: false }) public disableSlotCallback: DisableSlotCallback | undefined;

  @state() private _headerEmpty = true;
  @state() private _footerStartEmpty = true;
  @state() private _footerCenterEmpty = true;
  @state() private _footerEndEmpty = true;
  @state() private _timeLabelEmpty = true;
  @state() private _focusedSlotIndex = -1;
  @state() private _popoverOpen = false;

  private readonly _popoverRef = createRef<IPopoverComponent>();
  private readonly _toggleRef = createRef<HTMLElement>();

  @query('[part="live-region"]') private _liveRegion!: HTMLDivElement;
  @queryAll('[part="slot"]') private _slotButtons!: NodeListOf<HTMLButtonElement>;

  #internals: ElementInternals;
  #value: DateTimePickerValue = null;
  #activeDate: Date | null = null;
  #activeTime: string | null = null;
  #activeFrom: string | null = null;
  #activeTo: string | null = null;
  #typeaheadBuffer = '';
  #typeaheadTimer: ReturnType<typeof setTimeout> | null = null;
  #slotListCache: ITimeSlot[] | null = null;
  #disabledSlotCache: boolean[] | null = null;
  #intlSlotLabelFmt: Intl.DateTimeFormat | null = null;
  #intlInlineFmt: Intl.DateTimeFormat | null = null;
  #intlInlineDateFmt: Intl.DateTimeFormat | null = null;
  #intlInlineTimeFmt: Intl.DateTimeFormat | null = null;
  #intlSummaryFmt: Intl.DateTimeFormat | null = null;

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
  }

  public override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('timeMode') && changed.get('timeMode') !== undefined) {
      const previousMode = changed.get('timeMode') as TimeMode | undefined;
      if (previousMode && previousMode !== this.timeMode) {
        this.#value = null;
        this.#activeDate = null;
        this.#activeTime = null;
        this.#activeFrom = null;
        this.#activeTo = null;
        queueMicrotask(() => this.#emitChange('mode-change'));
      }
    }
    if (changed.has('locale') || changed.has('use24HourTime') || changed.has('allowSeconds')) {
      this.#intlSlotLabelFmt = null;
      this.#intlInlineFmt = null;
      this.#intlInlineDateFmt = null;
      this.#intlInlineTimeFmt = null;
      this.#intlSummaryFmt = null;
    }
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
    if (changed.has('variant') && this.variant === 'static' && this._popoverRef.value) {
      this._popoverRef.value.open = false;
      this._popoverRef.value.anchorElement = null;
      this._popoverOpen = false;
    }
  }

  public override updated(_changed: PropertyValues<this>): void {
    this.#updateFormValueAndValidity();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.#typeaheadTimer != null) {
      clearTimeout(this.#typeaheadTimer);
      this.#typeaheadTimer = null;
    }
  }

  public override render(): TemplateResult {
    return this.variant === 'inline' ? this.#renderInline() : this.#renderCard();
  }

  #renderCard(): TemplateResult {
    const resolvedOrientation = this.#resolveOrientation();
    const content = html`${this.#renderHeader()} ${this.#renderBody(resolvedOrientation)} ${this.#renderFooter()}`;
    return html`
      <div part="root" class=${classMap({ 'forge-date-time-picker': true })} data-mode=${this.timeMode} data-orientation=${resolvedOrientation}>
        ${this.summary ? this.#renderSummary() : nothing} ${this.summary ? html`<div class="content">${content}</div>` : content}
        <div part="live-region" class="live-region" role="status" aria-live="polite" aria-atomic="true"></div>
      </div>
    `;
  }

  #renderInline(): TemplateResult {
    return html`
      <div part="inline-trigger" class="inline-trigger">
        <forge-text-field>
          <input
            type="text"
            readonly
            aria-label=${this.singleLabel || 'Date and time'}
            .value=${this.#formattedInlineValue()}
            @focus=${this.#openPopover}
            @click=${this.#openPopover} />
          <forge-icon-button
            slot="end"
            type="button"
            aria-label="Open date and time picker"
            aria-haspopup="dialog"
            ?disabled=${this.disabled}
            @click=${this.#togglePopover}
            ${ref(this._toggleRef)}>
            <forge-icon name="insert_invitation"></forge-icon>
          </forge-icon-button>
        </forge-text-field>
      </div>
      <forge-popover
        part="inline-popover"
        placement="bottom-start"
        persistent
        .open=${this._popoverOpen}
        @forge-popover-toggle=${this.#onPopoverToggle}
        ${ref(this._popoverRef)}>
        ${this._popoverOpen ? this.#renderCard() : nothing}
      </forge-popover>
    `;
  }

  #formattedInlineValue(): string {
    if (this.#value == null) {
      return '';
    }
    if (isRange(this.#value)) {
      const dateFmt = this.#getInlineDateFmt();
      const timeFmt = this.#getInlineTimeFmt();
      // formatRange produces locale-correct separator; pin date with single formatter for stable display
      return `${dateFmt.format(this.#value.from)} ${timeFmt.formatRange(this.#value.from, this.#value.to)}`;
    }
    return this.#getInlineFmt().format(this.#value);
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

  #getInlineFmt(): Intl.DateTimeFormat {
    if (!this.#intlInlineFmt) {
      this.#intlInlineFmt = new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...this.#buildTimeOptions()
      });
    }
    return this.#intlInlineFmt;
  }

  #getInlineDateFmt(): Intl.DateTimeFormat {
    if (!this.#intlInlineDateFmt) {
      this.#intlInlineDateFmt = new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
    return this.#intlInlineDateFmt;
  }

  #getInlineTimeFmt(): Intl.DateTimeFormat {
    if (!this.#intlInlineTimeFmt) {
      this.#intlInlineTimeFmt = new Intl.DateTimeFormat(this.locale, this.#buildTimeOptions());
    }
    return this.#intlInlineTimeFmt;
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

  #openPopover = (): void => this.#setPopoverOpen(true);

  #togglePopover = (event: Event): void => {
    event.stopPropagation();
    this.#setPopoverOpen(!this._popoverOpen);
  };

  #setPopoverOpen(open: boolean): void {
    if (this.disabled || this.readonly) {
      return;
    }
    this._popoverOpen = open;
    if (this._popoverRef.value) {
      this._popoverRef.value.anchorElement = this._toggleRef.value ?? null;
      this._popoverRef.value.open = open;
    }
  }

  #onPopoverToggle = (event: Event): void => {
    const detail = (event as CustomEvent<{ newState: 'open' | 'closed' }>).detail;
    this._popoverOpen = detail.newState === 'open';
  };

  #renderSummary(): TemplateResult {
    const date = this.#activeDate;
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

  #renderHeader(): TemplateResult {
    return html`
      <div part="header" class="header" data-empty=${String(this._headerEmpty)}>
        <slot name="header" @slotchange=${(e: Event) => this.#onSlotChange(e, '_headerEmpty')}></slot>
      </div>
    `;
  }

  #renderFooter(): TemplateResult | typeof nothing {
    if (!this.showFooter) {
      return nothing;
    }
    const allEmpty = this._footerStartEmpty && this._footerCenterEmpty && this._footerEndEmpty;
    return html`
      <div part="footer" class="footer" data-empty=${String(allEmpty)}>
        <div part="footer-start" class="footer-start" data-empty=${String(this._footerStartEmpty)}>
          <slot name="footer-start" @slotchange=${(e: Event) => this.#onSlotChange(e, '_footerStartEmpty')}></slot>
        </div>
        <div part="footer-center" class="footer-center" data-empty=${String(this._footerCenterEmpty)}>
          <slot name="footer-center" @slotchange=${(e: Event) => this.#onSlotChange(e, '_footerCenterEmpty')}></slot>
        </div>
        <div part="footer-end" class="footer-end" data-empty=${String(this._footerEndEmpty)}>
          <slot name="footer-end" @slotchange=${(e: Event) => this.#onSlotChange(e, '_footerEndEmpty')}></slot>
        </div>
      </div>
    `;
  }

  #renderBody(orientation: ResolvedOrientation): TemplateResult {
    return html` <div part="body" class="body" data-orientation=${orientation}>${this.#renderCalendarSection()} ${this.#renderTimeSection()}</div> `;
  }

  #renderCalendarSection(): TemplateResult {
    const calendarValue = this.#activeDate ?? undefined;
    return html`
      <div part="calendar-section" class="calendar-section">
        <forge-calendar
          part="calendar"
          mode="single"
          prevent-focus
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?clear-button=${this.clearButton}
          ?today-button=${this.todayButton}
          ?show-header=${this.showHeader}
          .value=${calendarValue as any}
          .min=${this.min as any}
          .max=${this.max as any}
          .disabledDates=${this.disabledDates}
          .disabledDaysOfWeek=${this.disabledDaysOfWeek}
          .disabledDateBuilder=${this.disableDayCallback}
          locale=${ifDefined(this.locale)}
          first-day-of-week=${ifDefined(this.firstDayOfWeek as number | undefined)}
          @forge-calendar-date-select=${this.#onCalendarSelect}>
          <slot name="previous-month-button-text" slot="previous-month-button-text"></slot>
          <slot name="next-month-button-text" slot="next-month-button-text"></slot>
          <slot name="today-button-text" slot="today-button-text"></slot>
          <slot name="clear-button-text" slot="clear-button-text"></slot>
        </forge-calendar>
      </div>
    `;
  }

  #renderTimeSection(): TemplateResult {
    return html` <div part="time-section" class="time-section" data-mode=${this.timeMode}>${this.#renderTimeLabel()} ${this.#renderTimeBody()}</div> `;
  }

  #renderTimeLabel(): TemplateResult {
    return html`
      <div part="time-label" class="time-label" data-empty=${String(this._timeLabelEmpty)}>
        <slot name="time-label" @slotchange=${(e: Event) => this.#onSlotChange(e, '_timeLabelEmpty')}></slot>
      </div>
    `;
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
    return html` <div part="time-inputs" class="time-inputs">${this.#renderTimePickerField(this.#activeTime, 'single', this.singleLabel)}</div> `;
  }

  #renderRangeTime(): TemplateResult {
    return html`
      <div part="time-inputs" class="range-inputs">
        ${this.#renderTimePickerField(this.#activeFrom, 'from', this.fromLabel)} ${this.#renderTimePickerField(this.#activeTo, 'to', this.toLabel)}
      </div>
    `;
  }

  #renderTimePickerField(value: string | null, which: 'single' | 'from' | 'to', label: string): TemplateResult {
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
        min=${ifDefined(this.minTime || undefined)}
        max=${ifDefined(this.maxTime || undefined)}
        .value=${value ?? ''}
        @forge-time-picker-change=${(e: Event) => this.#onTimePickerChange(e, which)}>
        <forge-text-field>
          ${label ? html`<label slot="label">${label}</label>` : nothing}
          <input type="text" aria-label=${label} />
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
    const tabIndex = this.#computeActiveTabSlotIndex(list, disabledMap);
    const labelFmt = this.#getSlotLabelFmt();
    return html`
      <ul part="slot-list" class="slot-list" role="listbox" aria-label="Available times" aria-orientation="vertical" @keydown=${this.#onSlotListKeydown}>
        <div class="slot-list-inner">${list.map((slot, index) => this.#renderSlot(slot, index, disabledMap[index], tabIndex, labelFmt))}</div>
      </ul>
    `;
  }

  #renderSlot(slot: ITimeSlot, index: number, slotIsDisabled: boolean, activeTabIndex: number, labelFmt: Intl.DateTimeFormat): TemplateResult {
    const selected = this.#activeTime === slot.value;
    const tabIndex = slotIsDisabled ? -1 : index === activeTabIndex ? 0 : -1;
    return html`
      <button
        type="button"
        part=${`slot${selected ? ' slot--selected' : ''}${slotIsDisabled ? ' slot--disabled' : ''}`}
        class=${classMap({
          slot: true,
          'slot--selected': selected,
          'slot--disabled': slotIsDisabled
        })}
        role="option"
        aria-selected=${String(selected)}
        aria-disabled=${String(slotIsDisabled)}
        tabindex=${tabIndex}
        data-value=${slot.value}
        data-index=${index}
        ?disabled=${slotIsDisabled || this.disabled || this.readonly}
        @click=${this.#onSlotClick}
        @focus=${this.#onSlotFocus}>
        ${slot.label ?? this.#formatSlotLabel(slot.value, labelFmt)}
      </button>
    `;
  }

  #onSlotClick = (event: Event): void => {
    const index = Number((event.currentTarget as HTMLElement).dataset.index);
    const list = this.#computedSlots();
    const slot = list[index];
    if (slot) {
      this.#onSlotSelect(slot);
    }
  };

  #onSlotFocus = (event: Event): void => {
    this._focusedSlotIndex = Number((event.currentTarget as HTMLElement).dataset.index);
  };

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
    if (!this.disableSlotCallback) {
      return false;
    }
    const date = this.#activeDate ?? new Date();
    return this.disableSlotCallback(date, slot);
  }

  #computeActiveTabSlotIndex(list: ITimeSlot[], disabledMap: boolean[]): number {
    if (this.#activeTime) {
      const selectedIndex = list.findIndex(s => s.value === this.#activeTime);
      if (selectedIndex >= 0 && !disabledMap[selectedIndex]) {
        return selectedIndex;
      }
    }
    if (this._focusedSlotIndex >= 0 && !disabledMap[this._focusedSlotIndex]) {
      return this._focusedSlotIndex;
    }
    return disabledMap.findIndex(d => !d);
  }

  #onCalendarSelect = (event: Event): void => {
    const { date, selected } = (event as CustomEvent<ICalendarDateSelectEventData>).detail;
    // `selected` reflects state BEFORE the click: true = toggle-off, false = newly select.
    this.#activeDate = !date || selected ? null : dateOnly(date);
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
    const enabledIndices = list.map((s, i) => (this.#isSlotDisabled(s) ? -1 : i)).filter(i => i !== -1);
    if (!enabledIndices.length) {
      return;
    }
    const current = this.#currentSlotIndex(enabledIndices);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.#focusSlotAt(enabledIndices[(current + 1) % enabledIndices.length]);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.#focusSlotAt(enabledIndices[(current - 1 + enabledIndices.length) % enabledIndices.length]);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      this.#focusSlotAt(enabledIndices[0]);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      this.#focusSlotAt(enabledIndices[enabledIndices.length - 1]);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement | null;
      if (target?.dataset?.value) {
        event.preventDefault();
        const slot = list.find(s => s.value === target.dataset.value);
        if (slot) {
          this.#onSlotSelect(slot);
        }
      }
      return;
    }
    if (event.key === 'Escape') {
      const calendar = this.shadowRoot?.querySelector<ICalendarComponent>('forge-calendar');
      calendar?.focus?.();
      return;
    }
    if (/^\d$/.test(event.key)) {
      this.#typeaheadAppend(event.key, list, enabledIndices);
    }
  };

  #currentSlotIndex(enabledIndices: number[]): number {
    if (this._focusedSlotIndex >= 0) {
      const found = enabledIndices.indexOf(this._focusedSlotIndex);
      if (found >= 0) {
        return found;
      }
    }
    if (this.#activeTime) {
      const list = this.#computedSlots();
      const selectedIndex = list.findIndex(s => s.value === this.#activeTime);
      const idx = enabledIndices.indexOf(selectedIndex);
      if (idx >= 0) {
        return idx;
      }
    }
    return 0;
  }

  #focusSlotAt(index: number): void {
    this._focusedSlotIndex = index;
    this.updateComplete.then(() => {
      const buttons = Array.from(this._slotButtons ?? []);
      buttons[index]?.focus();
    });
  }

  #typeaheadAppend(char: string, list: ITimeSlot[], enabledIndices: number[]): void {
    this.#typeaheadBuffer += char;
    if (this.#typeaheadTimer) {
      clearTimeout(this.#typeaheadTimer);
    }
    this.#typeaheadTimer = setTimeout(() => {
      this.#typeaheadBuffer = '';
    }, 1000);
    const buffer = this.#typeaheadBuffer;
    const match = enabledIndices.find(i => {
      const value = list[i].value;
      return value.replace(':', '').startsWith(buffer) || value.startsWith(buffer);
    });
    if (match != null) {
      this.#focusSlotAt(match);
    }
  }

  #onSlotChange(event: Event, flagKey: '_headerEmpty' | '_footerStartEmpty' | '_footerCenterEmpty' | '_footerEndEmpty' | '_timeLabelEmpty'): void {
    const target = event.target as HTMLSlotElement;
    const empty = target.assignedNodes({ flatten: true }).length === 0;
    if (this[flagKey] !== empty) {
      (this as any)[flagKey] = empty;
    }
  }

  #syncFromValue(value: DateTimePickerValue): void {
    if (value == null) {
      this.#activeDate = null;
      this.#activeTime = null;
      this.#activeFrom = null;
      this.#activeTo = null;
      return;
    }
    if (isRange(value)) {
      this.#activeDate = dateOnly(value.from);
      this.#activeFrom = timeFromDate(value.from, this.allowSeconds);
      this.#activeTo = timeFromDate(value.to, this.allowSeconds);
      return;
    }
    this.#activeDate = dateOnly(value);
    this.#activeTime = timeFromDate(value, this.allowSeconds);
  }

  #recomputeValue(): void {
    if (this.timeMode === 'range') {
      if (this.#activeDate && this.#activeFrom && this.#activeTo) {
        const from = mergeDateAndTime(this.#activeDate, this.#activeFrom);
        const to = mergeDateAndTime(this.#activeDate, this.#activeTo);
        if (from && to) {
          this.#value = { from, to };
          return;
        }
      }
      this.#value = null;
      return;
    }
    const merged = mergeDateAndTime(this.#activeDate, this.#activeTime);
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
    if (this.timeMode === 'range') {
      return isRange(this.#value);
    }
    return this.#value instanceof Date;
  }

  #mergedSingleDate(): Date | null {
    return this.#value instanceof Date ? this.#value : null;
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
      const d = new Date(input);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    return null;
  }

  #updateFormValueAndValidity(): void {
    this.#updateFormValue();
    this.#updateValidity();
  }

  #updateFormValue(): void {
    const v = this.#value;
    if (v == null) {
      this.#internals.setFormValue(null);
      return;
    }
    if (isRange(v)) {
      const fd = new FormData();
      const baseName = this.name || '';
      fd.append(`${baseName}.from`, v.from.toISOString());
      fd.append(`${baseName}.to`, v.to.toISOString());
      this.#internals.setFormValue(fd, fd);
      return;
    }
    const iso = v.toISOString();
    this.#internals.setFormValue(iso, iso);
  }

  #updateValidity(): void {
    if (!this.required && !this.#hasValueConstraintViolation()) {
      this.#internals.setValidity({});
      return;
    }

    const flags: ValidityStateFlags = {};
    let message = '';
    if (this.required && !this.#isComplete()) {
      flags.valueMissing = true;
      message = 'Please select a date and time.';
    }
    const single = this.#mergedSingleDate();
    if (single && this.#beforeMin(single, this.min)) {
      flags.rangeUnderflow = true;
      message ||= 'Selected time is before the earliest allowed.';
    }
    if (single && this.#afterMax(single, this.max)) {
      flags.rangeOverflow = true;
      message ||= 'Selected time is after the latest allowed.';
    }
    if (this.timeMode === 'range' && isRange(this.#value)) {
      if (this.#value.from.getTime() > this.#value.to.getTime()) {
        flags.customError = true;
        message ||= 'Start time must be before end time.';
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
      value: this.#value,
      date: this.#activeDate,
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
    queueMicrotask(() => this.#announce());
    const closesPopover = source === 'time' || source === 'time-to' || source === 'slot';
    if (this.variant === 'inline' && this._popoverOpen && detail.complete && closesPopover) {
      this.#closePopover();
    }
  }

  #closePopover(): void {
    this._popoverOpen = false;
    if (this._popoverRef.value) {
      this._popoverRef.value.open = false;
    }
  }

  #announce(): void {
    if (!this._liveRegion) {
      return;
    }
    if (!this.#isComplete() && this.#value !== null) {
      return;
    }
    const message = buildAnnouncement(this.#value, this.locale, this.use24HourTime, this.allowSeconds);
    this._liveRegion.textContent = message;
  }

  #valuesEqual(a: DateTimePickerValue, b: DateTimePickerValue): boolean {
    if (a == null && b == null) {
      return true;
    }
    if (a == null || b == null) {
      return false;
    }
    if (isRange(a) && isRange(b)) {
      return a.from.getTime() === b.from.getTime() && a.to.getTime() === b.to.getTime();
    }
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }
    return false;
  }
}
