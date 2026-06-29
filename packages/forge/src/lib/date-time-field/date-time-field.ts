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
  DateTimePickerPublicValue,
  DateTimePickerValue,
  DateTimePickerValueMode,
  IDateTimePickerChangeEventData,
  IDateTimePickerRange,
  TimeMode
} from '../date-time-picker/date-time-picker-constants.js';
import type { IDateTimePickerComponent } from '../date-time-picker/date-time-picker.js';
import {
  coerceValue,
  formatDuration,
  isRange,
  parseMaybeDate,
  parseTimeString,
  timeFromDate,
  toPublicValue
} from '../date-time-picker/date-time-picker-utils.js';
import { ensureTemporal } from '../date-time-picker/temporal-loader.js';
import { DateInputMask } from '../core/mask/date-input-mask.js';
import { TimeInputMask } from '../core/mask/time-input-mask.js';
import { formatDateInput, formatTimeInput, parseDateInput, parseTypedValue } from './date-time-field-utils.js';
import {
  DATE_TIME_FIELD_CONSTANTS,
  type DateTimeFieldDateMode,
  type DateTimeFieldRequiredParts,
  type IDateTimeFieldChangeEventData
} from './date-time-field-constants.js';

import styles from './date-time-field.scss';

export interface IDateTimeFieldComponent extends BaseLitElement {
  dateMode: DateTimeFieldDateMode;
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
  formStateRestoreCallback(restoredState: FormData | string | null): void;
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

  @property({ attribute: 'date-mode', reflect: true }) public dateMode: DateTimeFieldDateMode = 'single';
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
    const next = coerceValue(input, this.#isRangeValue() ? 'range' : 'single', this.allowSeconds);
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
  // On phones the value can't fit a single line; show a tappable two-line display
  // (start over end) that opens the picker's bottom sheet. Mirrors Forge's $phone.
  @state() private _isPhone = false;

  @query('[part="date-input"]') private _dateInput?: HTMLInputElement;
  @query('[part="to-date-input"]') private _toDateInput?: HTMLInputElement;
  @query('[part="time-input"]') private _timeInput?: HTMLInputElement;
  @query('[part="from-input"]') private _fromInput?: HTMLInputElement;
  @query('[part="to-input"]') private _toInput?: HTMLInputElement;

  private readonly _toggleRef = createRef<HTMLElement>();

  #internals: ElementInternals;
  #value: DateTimePickerValue = null;
  #pickerIdRef = '';
  #pickerEl: IDateTimePickerComponent | null = null;
  #hasDate = false;
  #hasFromDate = false;
  #hasToDate = false;
  #hasTime = false;
  #hasFrom = false;
  #hasTo = false;
  #masks = new Map<HTMLInputElement, { mask: DateInputMask | TimeInputMask; kind: 'date' | 'time'; opts: string }>();
  #shouldClear = false;
  #masksInitialized = false;
  #authorNamedGroup = false;
  #presentationKey = '';
  #phoneMql: MediaQueryList | null = null;
  #onPhoneChange = (e: MediaQueryListEvent | MediaQueryList): void => {
    this._isPhone = e.matches;
  };

  #isRangeValue(): boolean {
    return this.dateMode === 'range' || this.timeMode === 'range';
  }

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
    // Capture whether the author named the group BEFORE we sprout our own default name, so a later
    // label change can refresh our default without clobbering an author-provided aria-label.
    this.#authorNamedGroup = this.hasAttribute('aria-label') || this.hasAttribute('aria-labelledby');
    setDefaultAria(this, this.#internals, { role: 'group' });
    this.#updateGroupLabel();
    this.addEventListener('invalid', this.#onInvalid);
    this.#updateFormValueAndValidity();
    if (this.valueMode === 'temporal') {
      void ensureTemporal().then(() => this.requestUpdate());
    }
    if (this.#pickerIdRef) {
      this.#resolvePickerLink();
    }
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      this.#phoneMql = window.matchMedia('(max-width: 599px)');
      this.#phoneMql.addEventListener('change', this.#onPhoneChange);
      this.#onPhoneChange(this.#phoneMql);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#detachPickerLink();
    this.#destroyMasks();
    this.#phoneMql?.removeEventListener('change', this.#onPhoneChange);
    this.#phoneMql = null;
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
      if (changed.has('disabled')) {
        this.#pickerEl.disabled = this.disabled;
        // Force-close directly: #setPickerOpen would early-return now that the field is disabled.
        if (this.disabled && this._open) {
          this._open = false;
          this.open = false;
          this.#pickerEl.open = false;
        }
      }
      if (changed.has('readonly')) {
        this.#pickerEl.readonly = this.readonly;
      }
    }
  }

  public override updated(changed: PropertyValues<this>): void {
    this.#updateFormValueAndValidity();
    if (changed.has('label')) {
      this.#updateGroupLabel();
    }
    // The mobile display renders no masked inputs, so re-sync (create/destroy)
    // when the presentation flips (phone vs desktop, linked vs not) as well as
    // on mode changes.
    const presentationKey = `${this._isPhone}:${this._pickerLinked}`;
    const presentationChanged = presentationKey !== this.#presentationKey;
    this.#presentationKey = presentationKey;
    if (
      !this.#masksInitialized ||
      presentationChanged ||
      changed.has('dateMode') ||
      changed.has('timeMode') ||
      changed.has('use24HourTime') ||
      changed.has('allowSeconds')
    ) {
      this.#masksInitialized = true;
      this.#syncMasks();
    } else {
      this.#syncMaskDisplay();
    }
    this.#floatLabel();
  }

  // Name the role=group host from the field's label so screen-reader users hear the composite
  // control's purpose, not just the per-input labels. Skips when the author supplied their own name.
  #updateGroupLabel(): void {
    if (this.#authorNamedGroup) {
      return;
    }
    setDefaultAria(this, this.#internals, { ariaLabel: this.label || 'Date and time' });
  }

  // The masked inputs always show a format guide, so the label should always
  // float above them rather than overlap. Force it past the text-field's own
  // value/placeholder heuristic, which can't see the slotted masked inputs.
  #floatLabel(): void {
    const field = this.shadowRoot?.querySelector('forge-text-field') as (HTMLElement & { floatLabel: boolean }) | null;
    if (field) {
      field.floatLabel = true;
    }
  }

  public override render(): TemplateResult {
    // On phones, a linked field becomes a tappable two-line value display that
    // opens the picker's bottom sheet; masked typing stays available on desktop
    // and on unlinked fields (which have no sheet to open).
    if (this._isPhone && this._pickerLinked) {
      return this.#renderMobile();
    }
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
                aria-expanded=${this._open ? 'true' : 'false'}
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
        ${this.#renderSupportTextEnd()}
      </forge-text-field>
    `;
  }

  #renderSupportTextEnd(): TemplateResult {
    const v = this.#value;
    const showDuration = this.#isRangeValue() && isRange(v) && !this._open && v.from.getTime() <= v.to.getTime();
    return html`
      <span slot="support-text-end">
        ${showDuration
          ? html`<span part="duration" class="duration" role="status" aria-live="polite">${formatDuration(v.from, v.to, this.locale)}</span>`
          : nothing}
        <slot name="support-text-end"></slot>
      </span>
    `;
  }

  // ─── Mobile display ──────────────────────────────────────────────────────

  #renderMobile(): TemplateResult {
    const v = this.#value;
    const lines = this.#displayLines();
    const showDuration = this.#isRangeValue() && isRange(v) && v.from.getTime() <= v.to.getTime();
    const valueLabel = lines.length ? lines.join(' to ') : 'no value selected';
    return html`
      <button
        type="button"
        part="mobile-display"
        class="mobile-display"
        aria-haspopup="dialog"
        aria-expanded=${this._open ? 'true' : 'false'}
        aria-label=${`${this.label || 'Date and time'}, ${valueLabel}`}
        ?disabled=${this.disabled}
        @click=${() => this.#setPickerOpen(true)}>
        <span class="md-text">
          ${this.label ? html`<span class="md-label">${this.label}</span>` : nothing}
          ${lines.length
            ? html`<span class="md-value">${lines.map(line => html`<span class="md-line">${line}</span>`)}</span>`
            : html`<span class="md-placeholder">${this.placeholder || 'Select date and time'}</span>`}
        </span>
        <span class="md-toggle" part="toggle" aria-hidden="true">
          <forge-icon name="insert_invitation"></forge-icon>
        </span>
      </button>
      <div class="md-support">
        <span class="md-support-start">
          ${this._invalid ? html`<span part="error-text">${this.#internals.validationMessage}</span>` : html`<slot name="support-text"></slot>`}
        </span>
        <span class="md-support-end">
          ${showDuration
            ? html`<span part="duration" class="duration" role="status" aria-live="polite">${formatDuration(v.from, v.to, this.locale)}</span>`
            : nothing}
          <slot name="support-text-end"></slot>
        </span>
      </div>
    `;
  }

  #displayLines(): string[] {
    const v = this.#value;
    if (v == null) {
      return [];
    }
    const fmt = (d: Date): string => `${formatDateInput(d)} ${formatTimeInput(d, this.use24HourTime, this.allowSeconds)}`;
    return isRange(v) ? [fmt(v.from), fmt(v.to)] : [fmt(v)];
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
    // element has upgraded (otherwise its reactive properties are still undefined). Anchor to the
    // field itself (not the trailing toggle) so the popover aligns to its leading edge — and so it
    // still anchors in the mobile display, which renders no toggle button.
    void this.updateComplete.then(async () => {
      if (!this.#pickerEl) {
        return;
      }
      this.#pickerEl.anchorElement = this;
      this.#pickerEl.placement = this.popoverPlacement;
      this.#pickerEl.persistent = this.persistent;
      this.#warnMismatch();
      // Keep value-shaping + interactive config in sync so a range value coerces correctly on the
      // picker (rather than collapsing to null) and a disabled field disables the picker. A forwarded
      // time-mode change resets the picker's value asynchronously, so push the field's value only
      // after that settles.
      this.#syncPickerConfig();
      await this.#pickerEl.updateComplete;
      if (this.#pickerEl) {
        this.#pickerEl.value = this.value ?? null;
      }
    });
  }

  #syncPickerConfig(): void {
    const picker = this.#pickerEl;
    if (!picker || !customElements.get(picker.localName)) {
      return;
    }
    if ('dateMode' in picker) {
      picker.dateMode = this.dateMode;
    }
    picker.timeMode = this.timeMode;
    picker.valueMode = this.valueMode;
    picker.use24HourTime = this.use24HourTime;
    picker.allowSeconds = this.allowSeconds;
    picker.disabled = this.disabled;
    picker.readonly = this.readonly;
  }

  #detachPickerLink(): void {
    if (!this.#pickerEl) {
      return;
    }
    this.#pickerEl.removeEventListener('forge-date-time-picker-change', this.#onPickerChange);
    this.#pickerEl.removeEventListener('forge-date-time-picker-close', this.#onPickerClose);
    // Dismiss the overlay before unlinking so a re-pointed or removed field never strands an open,
    // unanchored picker on the page.
    this.#pickerEl.open = false;
    this.#pickerEl.anchorElement = null;
    this.#pickerEl = null;
    this._pickerLinked = false;
    this._open = false;
    this.open = false;
  }

  #warnMismatch(): void {
    if (!this.#pickerEl || !customElements.get(this.#pickerEl.localName)) {
      return;
    }
    if ('dateMode' in this.#pickerEl && this.dateMode !== this.#pickerEl.dateMode) {
      console.warn(`forge-date-time-field: date-mode mismatch — field="${this.dateMode}", picker="${this.#pickerEl.dateMode}"`);
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
    // A mode-change is the picker resetting its own state after the field forwarded config — not a
    // user selection — so it must not overwrite the field's value.
    if (detail.source === 'mode-change') {
      return;
    }
    this.#value = coerceValue(detail.value, this.#isRangeValue() ? 'range' : 'single', this.allowSeconds);
    if (this.#value != null) {
      this.#setSegmentPresence(true);
    } else {
      this.#hasDate = detail.date != null;
      this.#hasFromDate = this.#hasDate;
      this.#hasToDate = this.dateMode === 'range' ? detail.dateTo != null : this.#hasDate;
      this.#hasTime = detail.time != null;
      this.#hasFrom = detail.from != null;
      this.#hasTo = detail.to != null;
    }
    this.#syncMaskDisplay();
    this._invalid = false;
    this.#updateFormValueAndValidity();
    this.#emitChange();
    this.requestUpdate();
    if (detail.complete && detail.source !== 'initial') {
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
        this.#applyNow(event.target as HTMLInputElement);
        return;
      }
      if (key === 'd') {
        event.preventDefault();
        this.#applyToday(event.target as HTMLInputElement);
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

  #applyNow(target: HTMLInputElement): void {
    const now = new Date();
    const focusedDateInput = this.dateMode === 'range' && target === this._toDateInput ? this._toDateInput : this._dateInput;
    if (parseDateInput(this.#maskValue(focusedDateInput)) == null) {
      this.#setMaskValue(focusedDateInput, formatDateInput(now));
    }
    if (this.timeMode === 'single') {
      this.#setMaskValue(this._timeInput, formatTimeInput(now, this.use24HourTime, this.allowSeconds));
    }
    this.#onTypedInput();
  }

  #applyToday(target: HTMLInputElement): void {
    const focusedDateInput = this.dateMode === 'range' && target === this._toDateInput ? this._toDateInput : this._dateInput;
    this.#setMaskValue(focusedDateInput, formatDateInput(new Date()));
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
    const prevPresence = this.#presenceSignature();
    const startDateStr = this.#maskValue(this._dateInput);
    const endDateStr = this.dateMode === 'range' ? this.#maskValue(this._toDateInput) : startDateStr;
    this.#hasFromDate = parseDateInput(startDateStr) != null;
    this.#hasToDate = parseDateInput(endDateStr) != null;
    this.#hasDate = this.#hasFromDate;
    let next: DateTimePickerValue;

    if (this.#isRangeValue()) {
      let startTimeStr: string;
      let endTimeStr: string;
      if (this.timeMode === 'range') {
        startTimeStr = this.#maskValue(this._fromInput);
        endTimeStr = this.#maskValue(this._toInput);
        this.#hasFrom = parseTimeString(startTimeStr) != null;
        this.#hasTo = parseTimeString(endTimeStr) != null;
      } else {
        startTimeStr = this.#maskValue(this._timeInput);
        endTimeStr = startTimeStr;
        this.#hasTime = parseTimeString(startTimeStr) != null;
      }
      const from = parseTypedValue(startDateStr, startTimeStr, this.allowSeconds);
      const to = parseTypedValue(endDateStr, endTimeStr, this.allowSeconds);
      next = from && to ? { from, to } : null;
    } else if (this.timeMode === 'slots') {
      const existingTime = this.#value instanceof Date ? timeFromDate(this.#value, this.allowSeconds) : null;
      this.#hasTime = existingTime != null;
      next = existingTime ? parseTypedValue(startDateStr, existingTime, this.allowSeconds) : null;
    } else {
      const timeStr = this.#maskValue(this._timeInput);
      this.#hasTime = parseTimeString(timeStr) != null;
      next = parseTypedValue(startDateStr, timeStr, this.allowSeconds);
    }

    const changed = !this.#valuesEqual(next, this.#value);
    this.#value = next;
    this._invalid = false;
    this.#updateFormValueAndValidity();
    if (changed) {
      if (this.#pickerEl && !this._open) {
        this.#pickerEl.value = this.value ?? null;
      }
      this.#emitChange();
    }
    // Re-render when a segment fills/empties even if the overall value is still
    // incomplete (null), so the muted-guide class reflects the typed content.
    if (changed || prevPresence !== this.#presenceSignature()) {
      this.requestUpdate();
    }
  };

  #presenceSignature(): string {
    return `${this.#hasDate}${this.#hasFromDate}${this.#hasToDate}${this.#hasTime}${this.#hasFrom}${this.#hasTo}`;
  }

  // ─── Masks ────────────────────────────────────────────────────────────────

  #renderInputs(): TemplateResult {
    if (this.timeMode === 'slots') {
      return this.#renderSlotsMasked();
    }
    const range = this.#isRangeValue();
    const dateRange = this.dateMode === 'range';
    const timeRange = this.timeMode === 'range';
    // Inputs must be top-level default-slot children so forge-text-field detects
    // them (assignedElements is not deep). Grouping is done with margins in SCSS.
    return html`
      ${this.#renderDateInput('date-input', range ? 'Start date' : this.label || 'Date', dateRange ? this.#hasFromDate : this.#hasDate)}
      ${this.#renderTimeInput(timeRange ? 'from-input' : 'time-input', range ? 'Start time' : 'Time', timeRange ? this.#hasFrom : this.#hasTime)}
      ${range ? html`<span class="range-separator" data-forge-multi-input-separator aria-hidden="true">–</span>` : nothing}
      ${range && dateRange ? this.#renderDateInput('to-date-input', 'End date', this.#hasToDate) : nothing}
      ${range && timeRange ? this.#renderTimeInput('to-input', 'End time', this.#hasTo) : nothing}
    `;
  }

  #timePlaceholder(): string {
    return this.use24HourTime ? (this.allowSeconds ? 'hh:mm:ss' : 'hh:mm') : this.allowSeconds ? 'hh:mm:ss aa' : 'hh:mm aa';
  }

  #renderDateInput(part: 'date-input' | 'to-date-input', ariaLabel: string, hasSegment: boolean): TemplateResult {
    const dateRequired = this.required && this.requiredParts !== 'time';
    return html`
      <input
        part=${part}
        class=${hasSegment ? '' : 'guide-muted'}
        type="text"
        inputmode="numeric"
        autocomplete="off"
        placeholder="MM/DD/YYYY"
        aria-label=${ariaLabel}
        aria-required=${ifDefined(dateRequired ? 'true' : undefined)}
        aria-invalid=${ifDefined(this._invalid && dateRequired && !hasSegment ? 'true' : undefined)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @blur=${this.#onTypedInput}
        @keydown=${this.#onTypedKeydown} />
    `;
  }

  #renderDatePart(): TemplateResult {
    if (this.dateMode === 'range') {
      return html`
        <span part="date-segment" class="date-segment">
          ${this.#renderDateInput('date-input', 'Start date', this.#hasFromDate)}
          <span class="range-separator" data-forge-multi-input-separator aria-hidden="true">–</span>
          ${this.#renderDateInput('to-date-input', 'End date', this.#hasToDate)}
        </span>
      `;
    }
    return this.#renderDateInput('date-input', this.label || 'Date', this.#hasDate);
  }

  #renderTimeInput(part: 'time-input' | 'from-input' | 'to-input', label: string, hasSegment: boolean): TemplateResult {
    const timeRequired = this.required && this.requiredParts !== 'date';
    return html`
      <input
        part=${part}
        class=${hasSegment ? '' : 'guide-muted'}
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

  #renderSlotsMasked(): TemplateResult {
    const slotTime = this.#value instanceof Date ? formatTimeInput(this.#value, this.use24HourTime, this.allowSeconds) : '';
    return html`
      ${this.#renderDatePart()}
      <span part="time-segment" class="time-segment">
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
    if (this.dateMode === 'range' && this._toDateInput) {
      specs.push({ el: this._toDateInput, kind: 'date' });
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
      // DateInputMask defaults to an always-on guide (lazy:false) and keeps its
      // auto-slash typing helper; TimeInputMask defaults to lazy, so opt it into
      // the always-on guide too for a consistent look across both segments.
      const mask =
        kind === 'date'
          ? new DateInputMask(el, {})
          : new TimeInputMask(el, { use24HourTime: this.use24HourTime, showSeconds: this.allowSeconds, showMaskFormat: true });
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
    if (this.#isRangeValue() && isRange(v)) {
      set(this._dateInput, formatDateInput(v.from));
      if (this.dateMode === 'range') {
        set(this._toDateInput, formatDateInput(v.to));
      }
      if (this.timeMode === 'range') {
        set(this._fromInput, formatTimeInput(v.from, this.use24HourTime, this.allowSeconds));
        set(this._toInput, formatTimeInput(v.to, this.use24HourTime, this.allowSeconds));
      } else {
        set(this._timeInput, formatTimeInput(v.from, this.use24HourTime, this.allowSeconds));
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
      const missingDate = this.requiredParts !== 'time' && (this.dateMode === 'range' ? !this.#hasFromDate || !this.#hasToDate : !this.#hasDate);
      // Time presence is governed by the TIME axis only: #hasFrom/#hasTo track the from/to time
      // inputs that exist solely in time-mode=range. In date-mode=range + single time the lone time
      // input feeds #hasTime, so gating on #isRangeValue() here would always read as missing.
      const missingTime = this.requiredParts !== 'date' && (this.timeMode === 'range' ? !this.#hasFrom || !this.#hasTo : !this.#hasTime);
      if (missingDate || missingTime) {
        flags.valueMissing = true;
        message = missingDate && missingTime ? 'Please select a date and time.' : missingDate ? 'Date is required.' : 'Time is required.';
        anchor = missingDate
          ? !this.#hasFromDate
            ? this._dateInput
            : this._toDateInput
          : this.timeMode === 'range'
            ? !this.#hasFrom
              ? this._fromInput
              : this._toInput
            : this._timeInput;
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
    if (!flags.valueMissing && this.#isRangeValue() && isRange(this.#value) && this.#value.from.getTime() > this.#value.to.getTime()) {
      flags.customError = true;
      message ||= DATE_TIME_FIELD_CONSTANTS.MESSAGES.END_BEFORE_START;
      anchor ??= this._toDateInput ?? this._toInput ?? this.#anchorInput();
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
      // Parse via the shared helper so a date-only `min`/`max` string is treated as local midnight,
      // matching the local wall-clock values it's compared against.
      return parseMaybeDate(input);
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
    if (present) {
      this.#hasFromDate = true;
      this.#hasToDate = this.dateMode === 'range';
    } else {
      this.#hasFromDate = false;
      this.#hasToDate = false;
    }
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
