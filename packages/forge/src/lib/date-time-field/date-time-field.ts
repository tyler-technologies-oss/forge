import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { IconRegistry } from '../icon/index.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import type {
  ChangeSource,
  DateTimePickerPublicValue,
  DateTimePickerValue,
  DateTimePickerValueMode,
  IDateTimePickerChangeEventData,
  IDateTimePickerRange,
  TimeMode
} from '../date-time-picker/date-time-picker-constants.js';
import type { IDateTimePickerComponent } from '../date-time-picker/date-time-picker.js';
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
  popoverPlacement: string;
  picker: string;
  pickerElement: IDateTimePickerComponent | null;
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
 * @summary A form-associated date/time input with masked entry. Links to a `forge-date-time-picker`
 * via the `picker` IDREF attribute or the `pickerElement` property. The field owns value, validation,
 * and form participation; the picker is a standalone value source.
 *
 * Quick keys (while a segment input is focused): `n` = now, `d` = today, `t` = current time.
 *
 * @fires {CustomEvent<IDateTimeFieldChangeEventData>} forge-date-time-field-change
 * @fires {CustomEvent} forge-date-time-field-open
 * @fires {CustomEvent} forge-date-time-field-close
 *
 * @slot label - Field label.
 * @slot support-text - Helper text aligned to the inline start.
 * @slot support-text-end - Helper text aligned to the inline end.
 *
 * @attribute {string} [picker] - ID of the linked `forge-date-time-picker` in the same root.
 * @attribute {('single'|'range'|'slots')} [time-mode='single']
 * @attribute {('temporal'|'iso'|'date')} [value-mode='temporal']
 * @attribute {string} [name]
 * @attribute {string} [label]
 * @attribute {string} [placeholder]
 * @attribute {boolean} [disabled=false]
 * @attribute {boolean} [readonly=false]
 * @attribute {boolean} [required=false]
 * @attribute {('both'|'date'|'time')} [required-parts='both']
 * @attribute {boolean} [open=false]
 * @attribute {boolean} [persistent=false]
 *
 * @csspart field - The embedded `forge-text-field`.
 * @csspart date-input - The masked date input.
 * @csspart time-input - The masked time input (single mode).
 * @csspart time-segment - Wrapper for the time input in the end slot.
 * @csspart toggle - The calendar toggle button (only rendered when a picker is linked).
 * @csspart error-text - The validation error message in the support-text slot.
 */
@customElement(DATE_TIME_FIELD_TAG_NAME)
export class DateTimeFieldComponent extends BaseLitElement implements IDateTimeFieldComponent {
  public static styles = unsafeCSS(styles);
  public static formAssociated = true;
  /** @deprecated */
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
  @property({ attribute: 'popover-placement' }) public popoverPlacement: string = DATE_TIME_FIELD_CONSTANTS.defaultValues.POPOVER_PLACEMENT;

  @property({ reflect: true })
  public get picker(): string {
    return this.#pickerIdRef;
  }
  public set picker(id: string) {
    this.#pickerIdRef = id;
    if (this.isConnected) {
      this.#resolvePickerLink();
    }
  }

  @property({ attribute: false })
  public get pickerElement(): IDateTimePickerComponent | null {
    return this.#pickerEl;
  }
  public set pickerElement(el: IDateTimePickerComponent | null) {
    this.#detachPickerLink();
    this.#pickerEl = el;
    this.#attachPickerLink();
    this.requestUpdate();
  }

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
    if (this.#pickerEl) {
      this.#pickerEl.value = this.value ?? null;
    }
    this.requestUpdate();
  }

  @state() private _open = false;
  @state() private _invalid = false;
  @state() private _pickerLinked = false;

  @query('[part="date-input"]') private _dateInput?: HTMLInputElement;
  @query('[part="time-input"]') private _timeInput?: HTMLInputElement;
  @query('[part="from-input"]') private _fromInput?: HTMLInputElement;
  @query('[part="to-input"]') private _toInput?: HTMLInputElement;

  private readonly _toggleRef = createRef<HTMLElement>();

  #internals: ElementInternals;
  #value: DateTimePickerValue = null;
  #pickerIdRef = '';
  #pickerEl: IDateTimePickerComponent | null = null;
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
    if (this.#pickerEl) {
      this.#pickerEl.value = null;
    }
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
    if (this.#pickerIdRef) {
      this.#resolvePickerLink();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#detachPickerLink();
    this.#destroyMasks();
  }

  #onInvalid = (): void => {
    this._invalid = true;
  };

  public override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('open') && this.open !== this._open) {
      this.#setPickerOpen(this.open);
    }
    if (this.#pickerEl) {
      if (changed.has('persistent')) {
        this.#pickerEl.persistent = this.persistent;
      }
      if (changed.has('popoverPlacement')) {
        this.#pickerEl.placement = this.popoverPlacement;
      }
    }
  }

  public override updated(changed: PropertyValues<this>): void {
    this.#updateFormValueAndValidity();
    if (!this.#masksInitialized || changed.has('timeMode') || changed.has('use24HourTime') || changed.has('allowSeconds')) {
      this.#masksInitialized = true;
      this.#syncMasks();
    } else {
      this.#syncMaskDisplay();
    }
  }

  public override render(): TemplateResult {
    return html`
      <forge-text-field part="field" ?required=${this.required} ?invalid=${this._invalid}>
        ${this.label ? html`<label slot="label">${this.label}</label>` : nothing} ${this.#renderInputs()}
        ${this._pickerLinked
          ? html`
              <forge-icon-button
                slot="end"
                part="toggle"
                type="button"
                aria-label="Open date and time picker"
                aria-haspopup="dialog"
                ?disabled=${this.disabled}
                @click=${this.#togglePicker}
                ${ref(this._toggleRef)}>
                <forge-icon name="insert_invitation"></forge-icon>
              </forge-icon-button>
            `
          : nothing}
        ${this._invalid
          ? html`<span slot="support-text" part="error-text">${this.#internals.validationMessage}</span>`
          : html`<slot name="support-text" slot="support-text"></slot>`}
        <slot name="support-text-end" slot="support-text-end"></slot>
      </forge-text-field>
    `;
  }

  // ─── Link resolution ─────────────────────────────────────────────────────

  #resolvePickerLink(): void {
    this.#detachPickerLink();
    if (!this.#pickerIdRef) {
      return;
    }
    const root = this.getRootNode() as Document | ShadowRoot;
    const el = root.getElementById?.(this.#pickerIdRef) as IDateTimePickerComponent | null;
    if (!el) {
      console.warn(`forge-date-time-field: picker "${this.#pickerIdRef}" not found in the same root`);
      return;
    }
    this.#pickerEl = el;
    this.#attachPickerLink();
    this.requestUpdate();
  }

  #attachPickerLink(): void {
    if (!this.#pickerEl) {
      return;
    }
    this.#pickerEl.addEventListener('forge-date-time-picker-change', this.#onPickerChange);
    this.#pickerEl.addEventListener('forge-date-time-picker-close', this.#onPickerClose);
    this._pickerLinked = true;
    // Set anchor so the picker activates its overlay mode, and compare config only once the picker
    // element has upgraded (otherwise its reactive properties are still undefined).
    this.updateComplete.then(() => {
      if (this.#pickerEl && this._toggleRef.value) {
        this.#pickerEl.anchorElement = this._toggleRef.value;
        this.#pickerEl.placement = this.popoverPlacement;
        this.#pickerEl.persistent = this.persistent;
        this.#pickerEl.value = this.value ?? null;
      }
      this.#warnMismatch();
    });
  }

  #detachPickerLink(): void {
    if (!this.#pickerEl) {
      return;
    }
    this.#pickerEl.removeEventListener('forge-date-time-picker-change', this.#onPickerChange);
    this.#pickerEl.removeEventListener('forge-date-time-picker-close', this.#onPickerClose);
    this.#pickerEl.anchorElement = null;
    this.#pickerEl = null;
    this._pickerLinked = false;
  }

  #warnMismatch(): void {
    if (!this.#pickerEl || !customElements.get(this.#pickerEl.localName)) {
      return;
    }
    if (this.timeMode !== this.#pickerEl.timeMode) {
      console.warn(`forge-date-time-field: time-mode mismatch — field="${this.timeMode}", picker="${this.#pickerEl.timeMode}"`);
    }
    if (this.use24HourTime !== this.#pickerEl.use24HourTime) {
      console.warn(`forge-date-time-field: use-24-hour-time mismatch — field=${this.use24HourTime}, picker=${this.#pickerEl.use24HourTime}`);
    }
    if (this.allowSeconds !== this.#pickerEl.allowSeconds) {
      console.warn(`forge-date-time-field: allow-seconds mismatch — field=${this.allowSeconds}, picker=${this.#pickerEl.allowSeconds}`);
    }
  }

  // ─── Picker event handlers ───────────────────────────────────────────────

  #onPickerChange = (event: Event): void => {
    if (this.disabled || this.readonly) {
      return;
    }
    const detail = (event as CustomEvent<IDateTimePickerChangeEventData>).detail;
    this.#value = coerceValue(detail.value, this.timeMode, this.allowSeconds);
    this.#hasDate = detail.date != null;
    if (this.timeMode === 'range') {
      this.#hasFrom = detail.from != null;
      this.#hasTo = detail.to != null;
    } else {
      this.#hasTime = detail.time != null;
    }
    this.#setMaskValue(this._dateInput, detail.date ? formatDateInput(detail.date) : '');
    this._invalid = false;
    this.#updateFormValueAndValidity();
    this.#emitChange();
    this.requestUpdate();
    if (detail.complete && this.#closesOnSource(detail.source)) {
      this.#setPickerOpen(false);
    }
  };

  #onPickerClose = (): void => {
    if (!this._open) {
      return;
    }
    this._open = false;
    this.open = false;
    this.dispatchEvent(new CustomEvent(DATE_TIME_FIELD_CONSTANTS.events.CLOSE, { bubbles: true, composed: true }));
  };

  #closesOnSource(source: ChangeSource): boolean {
    return source === 'time' || source === 'time-to' || source === 'slot';
  }

  // ─── Toggle / open ───────────────────────────────────────────────────────

  #togglePicker = (event: Event): void => {
    event.stopPropagation();
    this.#setPickerOpen(!this._open);
  };

  #setPickerOpen(open: boolean): void {
    if (this.disabled || this.readonly || !this.#pickerEl) {
      return;
    }
    if (this._open === open) {
      return;
    }
    this._open = open;
    this.open = open;
    this.#pickerEl.open = open;
    this.dispatchEvent(
      new CustomEvent(open ? DATE_TIME_FIELD_CONSTANTS.events.OPEN : DATE_TIME_FIELD_CONSTANTS.events.CLOSE, { bubbles: true, composed: true })
    );
  }

  // ─── Typed input ─────────────────────────────────────────────────────────

  #onTypedKeydown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    if (this.#quickKeysEnabled() && !event.ctrlKey && !event.metaKey && !event.altKey) {
      if (key === 'n') {
        event.preventDefault();
        this.#applyNow();
        return;
      }
      if (key === 'd') {
        event.preventDefault();
        this.#applyToday();
        return;
      }
      if (key === 't') {
        event.preventDefault();
        this.#applyCurrentTime(event.target as HTMLInputElement);
        return;
      }
    }
    if (event.key === 'Enter') {
      this.#onTypedInput();
    } else if (event.key === 'ArrowDown' && event.altKey) {
      event.preventDefault();
      this.#setPickerOpen(true);
    }
  };

  #quickKeysEnabled(): boolean {
    return !this.disabled && !this.readonly;
  }

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

  #applyToday(): void {
    this.#setMaskValue(this._dateInput, formatDateInput(new Date()));
    this.#onTypedInput();
  }

  #applyCurrentTime(target: HTMLInputElement): void {
    const now = new Date();
    const timeStr = formatTimeInput(now, this.use24HourTime, this.allowSeconds);
    if (this.timeMode === 'range') {
      if (target === this._fromInput) {
        this.#setMaskValue(this._fromInput, timeStr);
      } else if (target === this._toInput) {
        this.#setMaskValue(this._toInput, timeStr);
      }
    } else {
      this.#setMaskValue(this._timeInput, timeStr);
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
    if (changed) {
      if (this.#pickerEl) {
        this.#pickerEl.value = this.value ?? null;
      }
      this.#emitChange();
      this.requestUpdate();
    }
  };

  // ─── Masks ────────────────────────────────────────────────────────────────

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
    const dateRequired = this.required && this.requiredParts !== 'time';
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
    const timeRequired = this.required && this.requiredParts !== 'date';
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
          @click=${() => this.#setPickerOpen(true)}
          @focus=${() => this.#setPickerOpen(true)} />
      </span>
    `;
  }

  #setMaskValue(el: HTMLInputElement | undefined, text: string): void {
    const mask = el && this.#masks.get(el)?.mask;
    if (mask) {
      mask.maskedValue = text;
    }
  }

  #maskValue(el?: HTMLInputElement): string {
    return (el && this.#masks.get(el)?.mask.maskedValue) ?? el?.value ?? '';
  }

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

  #syncMaskDisplay(): void {
    const active = this.shadowRoot?.activeElement;
    const set = (el: HTMLInputElement | undefined, text: string): void => {
      const mask = el && this.#masks.get(el)?.mask;
      if (mask && active !== el) {
        mask.maskedValue = text;
      }
    };
    if (this.#shouldClear) {
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

  // ─── Form value + validity ────────────────────────────────────────────────

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
      const base = this.name || '';
      fd.append(`${base}.from`, v.from.toISOString());
      fd.append(`${base}.to`, v.to.toISOString());
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
      const missingDate = this.requiredParts !== 'time' && !this.#hasDate;
      const missingTime = this.requiredParts !== 'date' && (this.timeMode === 'range' ? !this.#hasFrom || !this.#hasTo : !this.#hasTime);
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
    this.#hasDate = this.#hasTime = this.#hasFrom = this.#hasTo = present;
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
