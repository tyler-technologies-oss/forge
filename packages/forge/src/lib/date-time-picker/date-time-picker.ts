import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import type { ICalendarDateSelectEventData } from '../calendar/calendar-constants.js';
import type { ICalendarComponent } from '../calendar/calendar.js';
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
  timeFromDate
} from './date-time-picker-utils.js';

import styles from './date-time-picker.scss';

export interface IDateTimePickerComponent extends BaseLitElement {
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
 * @slot footer - Optional summary + actions area below the calendar/time region.
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
 * @csspart separator - The dash between range time inputs.
 * @csspart footer - Footer slot wrapper.
 * @csspart live-region - Visually-hidden live region used for a11y announcements.
 */
@customElement(DATE_TIME_PICKER_TAG_NAME)
export class DateTimePickerComponent extends BaseLitElement implements IDateTimePickerComponent {
  public static styles = unsafeCSS(styles);

  public static formAssociated = true;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DATE_TIME_PICKER_TAG_NAME;

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
    this.#updateFormValueAndValidity();
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

  @property({ attribute: false }) public slots: ITimeSlot[] | undefined;
  @property({ attribute: false }) public disabledDates: Date[] = [];
  @property({ attribute: false }) public disabledDaysOfWeek: DayOfWeek[] = [];
  @property({ attribute: false }) public disableDayCallback: CalendarDisabledDateBuilder | undefined;
  @property({ attribute: false }) public disableSlotCallback: DisableSlotCallback | undefined;

  @state() private _headerEmpty = true;
  @state() private _footerEmpty = true;
  @state() private _timeLabelEmpty = true;
  @state() private _focusedSlotIndex = -1;

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
    this.#activeDate = null;
    this.#activeTime = null;
    this.#activeFrom = null;
    this.#activeTo = null;
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
    if (changed.has('allowSeconds') || changed.has('use24HourTime') || changed.has('locale')) {
      this.requestUpdate();
    }
  }

  public override updated(changed: PropertyValues<this>): void {
    if (changed.has('value') || changed.has('required') || changed.has('min') || changed.has('max') || changed.has('timeMode') || changed.has('name')) {
      this.#updateFormValueAndValidity();
    }
  }

  public override render(): TemplateResult {
    const resolvedOrientation = this.#resolveOrientation();
    return html`
      <div part="root" class=${classMap({ 'forge-date-time-picker': true })} data-mode=${this.timeMode} data-orientation=${resolvedOrientation}>
        ${this.#renderHeader()} ${this.#renderBody(resolvedOrientation)} ${this.#renderFooter()}
        <div part="live-region" class="live-region" role="status" aria-live="polite" aria-atomic="true"></div>
      </div>
    `;
  }

  #renderHeader(): TemplateResult {
    return html`
      <div part="header" class="header" data-empty=${String(this._headerEmpty)}>
        <slot name="header" @slotchange=${(e: Event) => this.#onSlotChange(e, '_headerEmpty')}></slot>
      </div>
    `;
  }

  #renderFooter(): TemplateResult {
    return html`
      <div part="footer" class="footer" data-empty=${String(this._footerEmpty)}>
        <slot name="footer" @slotchange=${(e: Event) => this.#onSlotChange(e, '_footerEmpty')}></slot>
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
    return html`
      <div part="time-inputs" class="time-inputs">
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
          .value=${this.#activeTime ?? ''}
          @forge-time-picker-change=${(e: Event) => this.#onTimePickerChange(e, 'single')}>
          <input type="text" aria-label="Time" />
        </forge-time-picker>
      </div>
    `;
  }

  #renderRangeTime(): TemplateResult {
    return html`
      <div part="time-inputs" class="range-inputs">
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
          .value=${this.#activeFrom ?? ''}
          @forge-time-picker-change=${(e: Event) => this.#onTimePickerChange(e, 'from')}>
          <input type="text" aria-label="Start time" />
        </forge-time-picker>
        <span part="separator" class="range-separator" aria-hidden="true">–</span>
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
          .value=${this.#activeTo ?? ''}
          @forge-time-picker-change=${(e: Event) => this.#onTimePickerChange(e, 'to')}>
          <input type="text" aria-label="End time" />
        </forge-time-picker>
      </div>
    `;
  }

  #renderSlotList(): TemplateResult {
    const list = this.#computedSlots();
    return html`
      <ul part="slot-list" class="slot-list" role="listbox" aria-label="Available times" aria-orientation="vertical" @keydown=${this.#onSlotListKeydown}>
        <div class="slot-list-inner">${list.map((slot, index) => this.#renderSlot(slot, index))}</div>
      </ul>
    `;
  }

  #renderSlot(slot: ITimeSlot, index: number): TemplateResult {
    const selected = this.#activeTime === slot.value;
    const slotIsDisabled = this.#isSlotDisabled(slot);
    const tabIndex = this.#computeSlotTabIndex(index, slotIsDisabled);
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
        @click=${() => this.#onSlotSelect(slot)}
        @focus=${() => (this._focusedSlotIndex = index)}>
        ${slot.label ?? formatSlotLabel(slot.value, this.locale, this.use24HourTime, this.allowSeconds)}
      </button>
    `;
  }

  #computedSlots(): ITimeSlot[] {
    if (this.slots && this.slots.length) {
      return this.slots;
    }
    return buildSlotsFromRange(this.minTime, this.maxTime, this.step, this.allowSeconds);
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

  #computeSlotTabIndex(index: number, isDisabled: boolean): number {
    if (isDisabled) {
      return -1;
    }
    const list = this.#computedSlots();
    const selectedIndex = list.findIndex(s => s.value === this.#activeTime);
    if (selectedIndex >= 0) {
      return index === selectedIndex ? 0 : -1;
    }
    if (this._focusedSlotIndex >= 0) {
      return index === this._focusedSlotIndex ? 0 : -1;
    }
    const firstEnabled = list.findIndex(s => !this.#isSlotDisabled(s));
    return index === firstEnabled ? 0 : -1;
  }

  #onCalendarSelect = (event: Event): void => {
    const e = event as CustomEvent<ICalendarDateSelectEventData>;
    const date = e.detail.date;
    if (!e.detail.selected || !date) {
      if (date == null && e.detail.selected === false && !this.#activeDate) {
        return;
      }
      this.#activeDate = null;
    } else {
      this.#activeDate = dateOnly(date);
    }
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

  #onSlotChange(event: Event, flagKey: '_headerEmpty' | '_footerEmpty' | '_timeLabelEmpty'): void {
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
