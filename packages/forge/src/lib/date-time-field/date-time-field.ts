import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { IconRegistry } from '../icon/index.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import type { IPopoverComponent } from '../popover/popover.js';
import type {
  ChangeSource,
  DateTimePickerPublicValue,
  DateTimePickerValue,
  DateTimePickerValueMode,
  IDateTimePickerChangeEventData,
  IDateTimePickerRange,
  TimeMode
} from '../date-time-picker/date-time-picker-constants.js';
import { coerceValue, isRange, parseTimeString, timeFromDate, toPublicValue } from '../date-time-picker/date-time-picker-utils.js';
import { ensureTemporal } from '../date-time-picker/temporal-loader.js';
import { DateInputMask } from '../core/mask/date-input-mask.js';
import { TimeInputMask } from '../core/mask/time-input-mask.js';
import { formatDateInput, formatTimeInput, parseDateInput, parseTypedValue } from './date-time-field-utils.js';
import { DATE_TIME_FIELD_CONSTANTS, type DateTimeFieldRequiredParts, type IDateTimeFieldChangeEventData } from './date-time-field-constants.js';

import styles from './date-time-field.scss';

export interface IDateTimeFieldComponent extends BaseLitElement {
  timeMode: TimeMode;
  valueMode: DateTimePickerValueMode;
  value: DateTimePickerPublicValue;
  name: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  requiredParts: DateTimeFieldRequiredParts;
  open: boolean;
  persistent: boolean;
  locale: string | undefined;
  use24HourTime: boolean;
  allowSeconds: boolean;
  min: Date | string | null;
  max: Date | string | null;
  minTime: string;
  maxTime: string;
  step: number;
  popoverPlacement: string;
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  readonly validity: ValidityState;
  readonly validationMessage: string;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-date-time-field': IDateTimeFieldComponent;
  }
}

export const DATE_TIME_FIELD_TAG_NAME: keyof HTMLElementTagNameMap = DATE_TIME_FIELD_CONSTANTS.elementName;

/**
 * @tag forge-date-time-field
 *
 * @summary A form-associated date/time input that displays the current selection and opens a
 * `forge-date-time-picker` in a popover for picking. Owns the public `value`, validation, and
 * form participation; the embedded picker is the picking surface.
 *
 * Quick keys (while a segment input is focused): `n` fills now (sets the time and fills the date if
 * empty), `d` sets the date segment to today, `t` sets the time segment to the current time.
 *
 * @fires {CustomEvent<IDateTimeFieldChangeEventData>} forge-date-time-field-change - Fires when the value changes.
 *
 * @slot label - Field label (forwarded to the embedded `forge-text-field`).
 * @slot support-text - Helper text aligned to the inline start.
 * @slot support-text-end - Helper text aligned to the inline end.
 *
 * @attribute {('single'|'range'|'slots')} [time-mode='single'] - Selection mode forwarded to the picker.
 * @attribute {('temporal'|'iso'|'date')} [value-mode='temporal'] - Shape of the public `value`.
 * @attribute {string} [name] - Form field name.
 * @attribute {string} [label] - Convenience label rendered into the field's label slot.
 * @attribute {string} [placeholder] - Placeholder shown when no value is selected.
 * @attribute {boolean} [disabled=false]
 * @attribute {boolean} [readonly=false]
 * @attribute {boolean} [required=false]
 * @attribute {('both'|'date'|'time')} [required-parts='both'] - When `required`, which segment(s) must be filled (per-segment validity).
 * @attribute {boolean} [open=false] - Controls the picker popover.
 * @attribute {boolean} [persistent=false] - Keeps the picker popover open on outside click / escape (disables light dismiss).
 *
 * @csspart field - The embedded `forge-text-field`.
 * @csspart input - The readonly display input (range/slots modes).
 * @csspart date-input - The masked date input (single mode).
 * @csspart time-input - The masked time input (single mode).
 * @csspart time-segment - Wrapper for the time input in the field's end slot.
 * @csspart toggle - The calendar toggle button.
 * @csspart error-text - The validation error message shown in the support-text slot when invalid.
 * @csspart popover - The popover hosting the picker.
 * @csspart picker - The embedded `forge-date-time-picker`.
 */
@customElement(DATE_TIME_FIELD_TAG_NAME)
export class DateTimeFieldComponent extends BaseLitElement implements IDateTimeFieldComponent {
  public static styles = unsafeCSS(styles);

  public static formAssociated = true;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DATE_TIME_FIELD_TAG_NAME;

  @property({ attribute: 'time-mode', reflect: true }) public timeMode: TimeMode = 'single';
  @property({ attribute: 'value-mode', reflect: true }) public valueMode: DateTimePickerValueMode = 'temporal';
  @property({ reflect: true }) public name = '';
  @property() public label = '';
  @property() public placeholder = '';
  @property({ type: Boolean, reflect: true }) public disabled = false;
  @property({ type: Boolean, reflect: true }) public readonly = false;
  @property({ type: Boolean, reflect: true }) public required = false;
  @property({ attribute: 'required-parts', reflect: true }) public requiredParts: DateTimeFieldRequiredParts = 'both';
  @property({ type: Boolean, reflect: true }) public open = false;
  @property({ type: Boolean, reflect: true }) public persistent = false;
  @property({ reflect: true }) public locale: string | undefined;
  @property({ type: Boolean, attribute: 'use-24-hour-time', reflect: true }) public use24HourTime = false;
  @property({ type: Boolean, attribute: 'allow-seconds', reflect: true }) public allowSeconds = false;
  @property({ attribute: 'min' }) public min: Date | string | null = null;
  @property({ attribute: 'max' }) public max: Date | string | null = null;
  @property({ attribute: 'min-time' }) public minTime = '';
  @property({ attribute: 'max-time' }) public maxTime = '';
  @property({ type: Number }) public step = 15;
  @property({ attribute: 'popover-placement' }) public popoverPlacement: string = DATE_TIME_FIELD_CONSTANTS.defaultValues.POPOVER_PLACEMENT;

  @property({ attribute: false })
  public get value(): DateTimePickerPublicValue {
    return toPublicValue(this.#value, this.valueMode, this.allowSeconds);
  }
  public set value(input: DateTimePickerPublicValue | string | undefined) {
    const next = coerceValue(input, this.timeMode, this.allowSeconds);
    if (this.#valuesEqual(next, this.#value)) {
      return;
    }
    this.#value = next;
    const present = next != null;
    this.#setSegmentPresence(present);
    this.#shouldClear = !present;
    this._invalid = false;
    this.requestUpdate();
  }

  @state() private _open = false;
  @state() private _invalid = false;

  @query('[part="date-input"]') private _dateInput?: HTMLInputElement;
  @query('[part="time-input"]') private _timeInput?: HTMLInputElement;
  @query('[part="from-input"]') private _fromInput?: HTMLInputElement;
  @query('[part="to-input"]') private _toInput?: HTMLInputElement;

  private readonly _popoverRef = createRef<IPopoverComponent>();
  private readonly _toggleRef = createRef<HTMLElement>();

  #internals: ElementInternals;
  #value: DateTimePickerValue = null;
  #hasDate = false;
  #hasTime = false;
  #hasFrom = false;
  #hasTo = false;
  #masks = new Map<HTMLInputElement, { mask: DateInputMask | TimeInputMask; kind: 'date' | 'time'; opts: string }>();
  #shouldClear = false;
  #masksInitialized = false;

  constructor() {
    super();
    IconRegistry.define(tylIconInsertInvitation);
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
    const valid = this.#internals.reportValidity();
    this._invalid = !valid;
    return valid;
  }

  public formResetCallback(): void {
    this.#value = null;
    this.#setSegmentPresence(false);
    this.#shouldClear = true;
    this._invalid = false;
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
    const fromVal = restoredState.get(`${this.name || ''}.from`);
    const toVal = restoredState.get(`${this.name || ''}.to`);
    if (typeof fromVal === 'string' && typeof toVal === 'string') {
      this.value = { from: new Date(fromVal), to: new Date(toVal) } as IDateTimePickerRange;
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'group' });
    this.addEventListener('invalid', this.#onInvalid);
    this.#updateFormValueAndValidity();
    if (this.valueMode === 'temporal') {
      void ensureTemporal().then(() => this.requestUpdate());
    }
  }

  #onInvalid = (): void => {
    this._invalid = true;
  };

  public override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('open') && this.open !== this._open) {
      this.#setPopoverOpen(this.open);
    }
  }

  public override updated(changed: PropertyValues<this>): void {
    this.#updateFormValueAndValidity();
    // The set of masked inputs (and their imask options) only changes with these props; otherwise we
    // just reflect the current value into the existing masks rather than reconciling the whole Map.
    if (!this.#masksInitialized || changed.has('timeMode') || changed.has('use24HourTime') || changed.has('allowSeconds')) {
      this.#masksInitialized = true;
      this.#syncMasks();
    } else {
      this.#syncMaskDisplay();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#destroyMasks();
  }

  public override render(): TemplateResult {
    return html`
      <forge-text-field part="field" ?required=${this.required} ?invalid=${this._invalid}>
        ${this.label ? html`<label slot="label">${this.label}</label>` : nothing} ${this.#renderInputs()}
        <forge-icon-button
          slot="end"
          part="toggle"
          type="button"
          aria-label="Open date and time picker"
          aria-haspopup="dialog"
          ?disabled=${this.disabled}
          @click=${this.#togglePopover}
          ${ref(this._toggleRef)}>
          <forge-icon name="insert_invitation"></forge-icon>
        </forge-icon-button>
        ${this._invalid
          ? html`<span slot="support-text" part="error-text">${this.#internals.validationMessage}</span>`
          : html`<slot name="support-text" slot="support-text"></slot>`}
        <slot name="support-text-end" slot="support-text-end"></slot>
      </forge-text-field>
      <forge-popover
        part="popover"
        placement=${this.popoverPlacement}
        trigger-type="manual"
        ?persistent=${this.persistent}
        .open=${this._open}
        @forge-popover-toggle=${this.#onPopoverToggle}
        ${ref(this._popoverRef)}>
        ${this._open ? this.#renderPicker() : nothing}
      </forge-popover>
    `;
  }

  #renderInputs(): TemplateResult {
    switch (this.timeMode) {
      case 'range':
        return this.#renderRangeMasked();
      case 'slots':
        return this.#renderSlotsMasked();
      default:
        return this.#renderSingleMasked();
    }
  }

  #timePlaceholder(): string {
    return this.use24HourTime ? (this.allowSeconds ? 'hh:mm:ss' : 'hh:mm') : this.allowSeconds ? 'hh:mm:ss --' : 'hh:mm --';
  }

  #renderDateInput(): TemplateResult {
    const dateRequired = this.#dateRequired();
    return html`
      <input
        part="date-input"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        placeholder="mm/dd/yyyy"
        aria-label=${this.label || 'Date'}
        aria-required=${ifDefined(dateRequired ? 'true' : undefined)}
        aria-invalid=${ifDefined(this._invalid && dateRequired && !this.#hasDate ? 'true' : undefined)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @blur=${this.#onTypedInput}
        @keydown=${this.#onTypedKeydown} />
    `;
  }

  #renderTimeInput(part: 'time-input' | 'from-input' | 'to-input', label: string, hasSegment: boolean): TemplateResult {
    const timeRequired = this.#timeRequired();
    return html`
      <input
        part=${part}
        type="text"
        autocomplete="off"
        placeholder=${this.#timePlaceholder()}
        aria-label=${label}
        aria-required=${ifDefined(timeRequired ? 'true' : undefined)}
        aria-invalid=${ifDefined(this._invalid && timeRequired && !hasSegment ? 'true' : undefined)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @blur=${this.#onTypedInput}
        @keydown=${this.#onTypedKeydown} />
    `;
  }

  #renderSingleMasked(): TemplateResult {
    return html`
      ${this.#renderDateInput()}
      <span slot="end" part="time-segment" class="time-segment"> ${this.#renderTimeInput('time-input', 'Time', this.#hasTime)} </span>
    `;
  }

  #renderRangeMasked(): TemplateResult {
    return html`
      ${this.#renderDateInput()}
      <span slot="end" part="time-segment" class="time-segment">
        ${this.#renderTimeInput('from-input', 'Start time', this.#hasFrom)}
        <span class="range-separator" aria-hidden="true">–</span>
        ${this.#renderTimeInput('to-input', 'End time', this.#hasTo)}
      </span>
    `;
  }

  #renderSlotsMasked(): TemplateResult {
    // Slots are picked, not typed: the date is masked-typeable; the time mirrors the chosen slot.
    const slotTime = this.#value instanceof Date ? formatTimeInput(this.#value, this.use24HourTime, this.allowSeconds) : '';
    return html`
      ${this.#renderDateInput()}
      <span slot="end" part="time-segment" class="time-segment">
        <input
          part="slot-display"
          type="text"
          readonly
          aria-label="Time"
          placeholder=${this.#timePlaceholder()}
          .value=${slotTime}
          ?disabled=${this.disabled}
          @click=${this.#openPopover}
          @focus=${this.#openPopover} />
      </span>
    `;
  }

  #dateRequired(): boolean {
    return this.required && this.requiredParts !== 'time';
  }

  #timeRequired(): boolean {
    return this.required && this.requiredParts !== 'date';
  }

  #renderPicker(): TemplateResult {
    return html`
      <forge-date-time-picker
        part="picker"
        value-mode="date"
        time-mode=${this.timeMode}
        ?use-24-hour-time=${this.use24HourTime}
        ?allow-seconds=${this.allowSeconds}
        step=${this.step}
        min-time=${ifDefined(this.minTime || undefined)}
        max-time=${ifDefined(this.maxTime || undefined)}
        locale=${ifDefined(this.locale)}
        .min=${this.min}
        .max=${this.max}
        .value=${this.#value ?? null}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @forge-date-time-picker-change=${this.#onPickerChange}>
      </forge-date-time-picker>
    `;
  }

  #onPickerChange = (event: Event): void => {
    const detail = (event as CustomEvent<IDateTimePickerChangeEventData>).detail;
    this.#value = coerceValue(detail.value, this.timeMode, this.allowSeconds);
    this.#hasDate = detail.date != null;
    if (this.timeMode === 'range') {
      this.#hasFrom = detail.from != null;
      this.#hasTo = detail.to != null;
    } else {
      this.#hasTime = detail.time != null;
    }
    // Reflect the picked date immediately, even before the overall value is complete.
    this.#setMaskValue(this._dateInput, detail.date ? formatDateInput(detail.date) : '');
    this._invalid = false;
    this.#updateFormValueAndValidity();
    this.#emitChange();
    this.requestUpdate();
    if (detail.complete && this.#closesPopover(detail.source)) {
      this.#closePopover();
    }
  };

  #closesPopover(source: ChangeSource): boolean {
    return source === 'time' || source === 'time-to' || source === 'slot';
  }

  #onTypedKeydown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    if (this.#quickKeysEnabled() && (key === 'n' || key === 'd' || key === 't') && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      if (key === 'n') {
        this.#applyNow();
      } else if (key === 'd') {
        this.#applyToday();
      } else {
        this.#applyTime();
      }
      return;
    }
    if (event.key === 'Enter') {
      this.#onTypedInput();
    } else if (event.key === 'ArrowDown' && event.altKey) {
      event.preventDefault();
      this.#openPopover();
    }
  };

  #quickKeysEnabled(): boolean {
    return !this.disabled && !this.readonly;
  }

  #setMaskValue(el: HTMLInputElement | undefined, text: string): void {
    const mask = el && this.#masks.get(el)?.mask;
    if (mask) {
      mask.maskedValue = text;
    }
  }

  /** Quick key `n`: fill now — set the time (single mode) and fill the date only if it is empty. */
  #applyNow(): void {
    const now = new Date();
    if (parseDateInput(this.#maskValue(this._dateInput)) == null) {
      this.#setMaskValue(this._dateInput, formatDateInput(now));
    }
    if (this.timeMode === 'single') {
      this.#setMaskValue(this._timeInput, formatTimeInput(now, this.use24HourTime, this.allowSeconds));
    }
    this.#onTypedInput();
  }

  /** Quick key `d`: set the date segment to today, leaving any typed time in place. */
  #applyToday(): void {
    this.#setMaskValue(this._dateInput, formatDateInput(new Date()));
    this.#onTypedInput();
  }

  /** Quick key `t`: set the time segment to the current time, leaving the date untouched. */
  #applyTime(): void {
    const time = formatTimeInput(new Date(), this.use24HourTime, this.allowSeconds);
    if (this.timeMode === 'range') {
      const target = this.shadowRoot?.activeElement === this._toInput ? this._toInput : this._fromInput;
      this.#setMaskValue(target, time);
    } else {
      this.#setMaskValue(this._timeInput, time);
    }
    this.#onTypedInput();
  }

  #onTypedInput = (): void => {
    const dateStr = this.#maskValue(this._dateInput);
    this.#hasDate = parseDateInput(dateStr) != null;
    let next: DateTimePickerValue;

    if (this.timeMode === 'range') {
      const fromStr = this.#maskValue(this._fromInput);
      const toStr = this.#maskValue(this._toInput);
      this.#hasFrom = parseTimeString(fromStr) != null;
      this.#hasTo = parseTimeString(toStr) != null;
      const from = parseTypedValue(dateStr, fromStr, this.allowSeconds);
      const to = parseTypedValue(dateStr, toStr, this.allowSeconds);
      next = from && to ? { from, to } : null;
    } else if (this.timeMode === 'slots') {
      // Time is the chosen slot; typing only re-dates it, preserving the picked time-of-day.
      const existingTime = this.#value instanceof Date ? timeFromDate(this.#value, this.allowSeconds) : null;
      this.#hasTime = existingTime != null;
      next = existingTime ? parseTypedValue(dateStr, existingTime, this.allowSeconds) : null;
    } else {
      const timeStr = this.#maskValue(this._timeInput);
      this.#hasTime = parseTimeString(timeStr) != null;
      next = parseTypedValue(dateStr, timeStr, this.allowSeconds);
    }

    const changed = !this.#valuesEqual(next, this.#value);
    this.#value = next;
    this._invalid = false;
    this.#updateFormValueAndValidity();
    // Only re-render when the value actually changed. Rendering on every blur (e.g. tabbing from an
    // incomplete date to the time input) disrupts the masked input that just received focus.
    if (changed) {
      this.#emitChange();
      this.requestUpdate();
    }
  };

  #maskValue(el?: HTMLInputElement): string {
    return (el && this.#masks.get(el)?.mask.maskedValue) ?? el?.value ?? '';
  }

  /** The inputs that should carry an input mask in the current mode. */
  #maskedInputSpecs(): Array<{ el: HTMLInputElement; kind: 'date' | 'time' }> {
    const specs: Array<{ el: HTMLInputElement; kind: 'date' | 'time' }> = [];
    if (this._dateInput) {
      specs.push({ el: this._dateInput, kind: 'date' });
    }
    if (this.timeMode === 'single' && this._timeInput) {
      specs.push({ el: this._timeInput, kind: 'time' });
    }
    if (this.timeMode === 'range') {
      if (this._fromInput) {
        specs.push({ el: this._fromInput, kind: 'time' });
      }
      if (this._toInput) {
        specs.push({ el: this._toInput, kind: 'time' });
      }
    }
    return specs;
  }

  #syncMasks(): void {
    const wanted = this.#maskedInputSpecs();
    const timeOpts = `${this.use24HourTime}:${this.allowSeconds}`;
    for (const [el, entry] of this.#masks) {
      const keep = wanted.some(w => w.el === el && w.kind === entry.kind && (entry.kind === 'date' || entry.opts === timeOpts));
      if (!keep) {
        entry.mask.destroy();
        this.#masks.delete(el);
      }
    }
    for (const { el, kind } of wanted) {
      if (this.#masks.has(el)) {
        continue;
      }
      const mask = kind === 'date' ? new DateInputMask(el, {}) : new TimeInputMask(el, { use24HourTime: this.use24HourTime, showSeconds: this.allowSeconds });
      this.#masks.set(el, { mask, kind, opts: kind === 'time' ? timeOpts : '' });
    }
    this.#syncMaskDisplay();
  }

  /**
   * Reflects the current value into the masked inputs (normalizing formatting), skipping any input
   * the user is actively editing. Does NOT clear inputs on an incidental `null` (a segment typed
   * but the value not yet complete) — that would wipe in-progress entry; explicit clears set `#shouldClear`.
   */
  #syncMaskDisplay(): void {
    const active = this.shadowRoot?.activeElement;
    const set = (el: HTMLInputElement | undefined, text: string): void => {
      const mask = el && this.#masks.get(el)?.mask;
      if (mask && active !== el) {
        mask.maskedValue = text;
      }
    };

    if (this.#shouldClear) {
      // An explicit clear (programmatic value = null / form reset) overrides focus.
      this.#shouldClear = false;
      for (const { mask } of this.#masks.values()) {
        mask.maskedValue = '';
      }
      return;
    }

    const v = this.#value;
    if (this.timeMode === 'range') {
      if (isRange(v)) {
        set(this._dateInput, formatDateInput(v.from));
        set(this._fromInput, formatTimeInput(v.from, this.use24HourTime, this.allowSeconds));
        set(this._toInput, formatTimeInput(v.to, this.use24HourTime, this.allowSeconds));
      }
      return;
    }
    if (v instanceof Date) {
      set(this._dateInput, formatDateInput(v));
      set(this._timeInput, formatTimeInput(v, this.use24HourTime, this.allowSeconds));
    }
  }

  #destroyMasks(): void {
    for (const { mask } of this.#masks.values()) {
      mask.destroy();
    }
    this.#masks.clear();
  }

  #openPopover = (): void => this.#setPopoverOpen(true);

  #togglePopover = (event: Event): void => {
    event.stopPropagation();
    this.#setPopoverOpen(!this._open);
  };

  #setPopoverOpen(open: boolean): void {
    if (this.disabled || this.readonly) {
      return;
    }
    if (this._open === open) {
      return;
    }
    this._open = open;
    this.open = open;
    if (this._popoverRef.value) {
      this._popoverRef.value.anchorElement = this._toggleRef.value ?? null;
      this._popoverRef.value.open = open;
    }
    this.dispatchEvent(
      new CustomEvent(open ? DATE_TIME_FIELD_CONSTANTS.events.OPEN : DATE_TIME_FIELD_CONSTANTS.events.CLOSE, { bubbles: true, composed: true })
    );
  }

  #closePopover(): void {
    this._open = false;
    this.open = false;
    if (this._popoverRef.value) {
      this._popoverRef.value.open = false;
    }
  }

  #onPopoverToggle = (event: Event): void => {
    const detail = (event as CustomEvent<{ newState: 'open' | 'closed' }>).detail;
    this._open = detail.newState === 'open';
    this.open = this._open;
  };

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
    const flags: ValidityStateFlags = {};
    let message = '';
    let anchor: HTMLInputElement | undefined;

    if (this.required) {
      const missingDate = this.#dateRequired() && !this.#hasDate;
      const missingTime = this.#timeRequired() && (this.timeMode === 'range' ? !this.#hasFrom || !this.#hasTo : !this.#hasTime);
      if (missingDate || missingTime) {
        flags.valueMissing = true;
        message = missingDate && missingTime ? 'Please select a date and time.' : missingDate ? 'Date is required.' : 'Time is required.';
        anchor = missingDate ? this._dateInput : this.timeMode === 'range' ? (!this.#hasFrom ? this._fromInput : this._toInput) : this._timeInput;
      }
    }

    if (!flags.valueMissing && this.#value != null) {
      if (this.#violatesMin()) {
        flags.rangeUnderflow = true;
        message = 'Selected date and time is before the earliest allowed.';
      } else if (this.#violatesMax()) {
        flags.rangeOverflow = true;
        message = 'Selected date and time is after the latest allowed.';
      }
    }

    if (Object.keys(flags).length === 0) {
      this.#internals.setValidity({});
      return;
    }
    this.#internals.setValidity(flags, message, anchor ?? this.#anchorInput());
  }

  #violatesMin(): boolean {
    const min = this.#asDate(this.min);
    if (!min) {
      return false;
    }
    const v = this.#value;
    if (v instanceof Date) {
      return v.getTime() < min.getTime();
    }
    return isRange(v) && (v.from.getTime() < min.getTime() || v.to.getTime() < min.getTime());
  }

  #violatesMax(): boolean {
    const max = this.#asDate(this.max);
    if (!max) {
      return false;
    }
    const v = this.#value;
    if (v instanceof Date) {
      return v.getTime() > max.getTime();
    }
    return isRange(v) && (v.from.getTime() > max.getTime() || v.to.getTime() > max.getTime());
  }

  #asDate(input: Date | string | null): Date | null {
    if (input instanceof Date) {
      return Number.isNaN(input.getTime()) ? null : input;
    }
    if (typeof input === 'string' && input) {
      const d = new Date(input);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    return null;
  }

  #anchorInput(): HTMLInputElement | undefined {
    return this._dateInput ?? this._timeInput ?? this._fromInput ?? undefined;
  }

  #emitChange(): void {
    const detail: IDateTimeFieldChangeEventData = {
      value: toPublicValue(this.#value, this.valueMode, this.allowSeconds),
      complete: this.#value != null
    };
    this.dispatchEvent(new CustomEvent<IDateTimeFieldChangeEventData>(DATE_TIME_FIELD_CONSTANTS.events.CHANGE, { detail, bubbles: true, composed: true }));
  }

  #setSegmentPresence(present: boolean): void {
    this.#hasDate = present;
    this.#hasTime = present;
    this.#hasFrom = present;
    this.#hasTo = present;
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
