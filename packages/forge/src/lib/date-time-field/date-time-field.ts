import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { IconRegistry } from '../icon/index.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import type { FieldLabelAlignment, FieldLabelPosition, FieldVariant, FieldDensity, FieldShape, FieldTheme } from '../field/base/base-field-constants.js';
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
  applyFormValue,
  coerceValue,
  formatDuration,
  isRange,
  parseMaybeDate,
  parseTimeString,
  timeFromDate,
  toPublicValue,
  valuesEqual
} from '../date-time-picker/date-time-picker-utils.js';
import { ensureTemporal } from '../date-time-picker/temporal-loader.js';
import { DateInputMask } from '../core/mask/date-input-mask.js';
import { TimeInputMask } from '../core/mask/time-input-mask.js';
import { coerceDateInput, coerceTimeInput, formatDateInput, formatTimeInput, parseDateInput, parseTypedValue } from './date-time-field-utils.js';
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
  showMask: boolean;
  persistMask: boolean;
  min: Date | string | null;
  max: Date | string | null;
  popoverPlacement: string;
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  variant: FieldVariant;
  density: FieldDensity;
  shape: FieldShape;
  theme: FieldTheme;
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
 * Quick keys (while a segment input is focused): `n` = now, `t` = today
 *
 * On commit (blur / Enter / quick key) loosely-typed segments are coerced like the picker inputs:
 * two-digit years gain a century (`1/2/25` → `01/02/2025`), an hour-only time completes
 * (`5` → `05:00 AM`), and out-of-range parts are clamped (`02/30/2025` → `02/28/2025`). Coercion
 * never runs mid-edit, so a partial value is left untouched while typing.
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
 * @attribute {('single'|'range')} [date-mode='single'] - Whether the field captures a single date or a start/end date range.
 * @attribute {('single'|'range'|'slots')} [time-mode='single'] - Whether the field captures a single time, a same-day start/end time range, or a fixed time slot (booking-style).
 * @attribute {('temporal'|'iso'|'date')} [value-mode='temporal'] - Shape of the public `value`: a `Temporal.PlainDateTime` (default), a local ISO `datetime-local` string, or a native `Date`.
 * @attribute {string} [name] - Form field name used when submitting the owning form.
 * @attribute {string} [label] - Field label text; also settable via the `label` slot.
 * @attribute {string} [placeholder] - Text shown in the empty field when the label is not `inset` (an inset label rests as its own placeholder). The guide replaces it on focus. If unset, each segment shows its format hint instead.
 * @attribute {boolean} [disabled=false] - Disables the field and its linked picker.
 * @attribute {boolean} [readonly=false] - Prevents editing while still allowing focus and form submission.
 * @attribute {boolean} [required=false] - Marks the required parts (see `required-parts`) as required for form validation.
 * @attribute {('both'|'date'|'time')} [required-parts='both'] - Which segments must be filled for the field to be valid when `required`.
 * @attribute {boolean} [open=false] - Reflects and controls whether the linked picker is open.
 * @attribute {boolean} [persistent=false] - Forwarded to the linked picker; keeps it open until explicitly dismissed instead of closing on outside interaction.
 * @attribute {string} [locale] - BCP 47 locale used for formatting the duration summary; defaults to the runtime locale.
 * @attribute {boolean} [use-24-hour-time=false] - Displays and parses time in 24-hour format instead of 12-hour with AM/PM.
 * @attribute {boolean} [allow-seconds=false] - Adds a seconds segment to the time mask and value.
 * @attribute {boolean} [show-mask=true] - Keeps the format guide visible at all times. A `placeholder` (with a non-inset label) overrides it, hiding the guide until the user types.
 * @attribute {boolean} [persist-mask=false] - Forces the guide to always show when `show-mask` is on, even if a `placeholder` is set (the placeholder no longer overrides).
 * @attribute {Date|string} [min] - Minimum selectable date/time; forwarded to the linked picker and used for validation.
 * @attribute {Date|string} [max] - Maximum selectable date/time; forwarded to the linked picker and used for validation.
 * @attribute {string} [popover-placement] - Placement of the linked picker's popover relative to the field.
 *
 * @property {IDateTimePickerComponent | null} [pickerElement=null] - Direct element reference to the linked picker; an alternative to the `picker` IDREF attribute.
 * @property {DateTimePickerPublicValue} [value] - The current value, shaped by `value-mode`; `null` when empty.
 * @property {HTMLFormElement | null} form - The form this field participates in (read-only).
 * @property {NodeList} labels - The labels associated with this field (read-only).
 * @property {ValidityState} validity - The field's current validity state (read-only).
 * @property {string} validationMessage - The current validation message, if any (read-only).
 *
 * @csspart field - The embedded `forge-field`.
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

  /** Whether the field captures a single date or a start/end date range. */
  @property({ attribute: 'date-mode', reflect: true }) public dateMode: DateTimeFieldDateMode = 'single';
  /** Whether the field captures a single time, a same-day start/end time range, or a fixed time slot (booking-style). */
  @property({ attribute: 'time-mode', reflect: true }) public timeMode: TimeMode = 'single';
  /** Shape of the public `value`: a `Temporal.PlainDateTime` (default), a local ISO `datetime-local` string, or a native `Date`. */
  @property({ attribute: 'value-mode', reflect: true }) public valueMode: DateTimePickerValueMode = 'temporal';
  /** Form field name used when submitting the owning form. */
  @property({ reflect: true }) public name = '';
  /** Field label text; also settable via the `label` slot. */
  @property() public label = '';
  /** Text shown in the empty field for a non-inset label (an inset label rests as its own placeholder); the guide replaces it on focus. Falls back to per-segment format hints when unset. */
  @property() public placeholder = '';
  /** Disables the field and its linked picker. */
  @property({ type: Boolean, reflect: true }) public disabled = false;
  /** Prevents editing while still allowing focus and form submission. */
  @property({ type: Boolean, reflect: true }) public readonly = false;
  /** Marks the required parts (see `requiredParts`) as required for form validation. */
  @property({ type: Boolean, reflect: true }) public required = false;
  /** Which segments must be filled for the field to be valid when `required`. */
  @property({ attribute: 'required-parts', reflect: true }) public requiredParts: DateTimeFieldRequiredParts = 'both';
  /** Reflects and controls whether the linked picker is open. */
  @property({ type: Boolean, reflect: true }) public open = false;
  /** Forwarded to the linked picker; keeps it open until explicitly dismissed instead of closing on outside interaction. */
  @property({ type: Boolean, reflect: true }) public persistent = false;
  /** BCP 47 locale used for formatting the duration summary; defaults to the runtime locale. */
  @property({ reflect: true }) public locale: string | undefined;
  /** Displays and parses time in 24-hour format instead of 12-hour with AM/PM. */
  @property({ type: Boolean, attribute: 'use-24-hour-time', reflect: true }) public use24HourTime = false;
  /** Adds a seconds segment to the time mask and value. */
  @property({ type: Boolean, attribute: 'allow-seconds', reflect: true }) public allowSeconds = false;
  /**
   * Keeps the format guide (e.g. `__/__/____`) visible at all times. On by default. Setting a
   * `placeholder` (with a non-inset label) overrides it: the guide is then hidden while the field is
   * empty — the placeholder shows instead — and only appears once the user types.
   */
  @property({ type: Boolean, attribute: 'show-mask', reflect: true }) public showMask = true;
  /**
   * Forces the guide to always show when `showMask` is on, even if a `placeholder` is set — the
   * placeholder no longer overrides the guide. Has no effect when `showMask` is off.
   */
  @property({ type: Boolean, attribute: 'persist-mask', reflect: true }) public persistMask = false;
  /** Minimum selectable date/time; forwarded to the linked picker and used for validation. */
  @property({ attribute: 'min' }) public min: Date | string | null = null;
  /** Maximum selectable date/time; forwarded to the linked picker and used for validation. */
  @property({ attribute: 'max' }) public max: Date | string | null = null;
  /** Placement of the linked picker's popover relative to the field. */
  @property({ attribute: 'popover-placement' }) public popoverPlacement: string = DATE_TIME_FIELD_CONSTANTS.defaultValues.POPOVER_PLACEMENT;

  /** Position of the label relative to the input area; forwarded to the embedded field. */
  @property({ attribute: 'label-position', reflect: true }) public labelPosition: FieldLabelPosition = 'inset';
  /** Alignment of the label within its area; forwarded to the embedded field. */
  @property({ attribute: 'label-alignment', reflect: true }) public labelAlignment: FieldLabelAlignment = 'default';
  /** Visual variant of the embedded field (outlined, tonal, filled, …). */
  @property({ reflect: true }) public variant: FieldVariant = 'outlined';
  /** Density of the embedded field. */
  @property({ reflect: true }) public density: FieldDensity = 'default';
  /** Corner shape of the embedded field. */
  @property({ reflect: true }) public shape: FieldShape = 'default';
  /** Theme of the embedded field. */
  @property({ reflect: true }) public theme: FieldTheme = 'default';

  /** ID of the linked `forge-date-time-picker` in the same root. */
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

  /** Direct element reference to the linked picker; an alternative to the `picker` IDREF attribute. */
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

  /** The current value, shaped by `valueMode`; `null` when empty. */
  @property({ attribute: false })
  public get value(): DateTimePickerPublicValue {
    return toPublicValue(this.#value, this.valueMode, this.allowSeconds);
  }
  public set value(input: DateTimePickerPublicValue | string | undefined) {
    const next = coerceValue(input, this.#isRangeValue() ? 'range' : 'single', this.allowSeconds);
    if (valuesEqual(next, this.#value)) {
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
  // Drives the inset label float when show-mask is off: with no always-on guide the label rests as a
  // placeholder until the field is focused or holds text, mirroring a plain forge-text-field.
  @state() private _focused = false;

  @query('[part="date-input"]') private _dateInput?: HTMLInputElement;
  @query('[part="to-date-input"]') private _toDateInput?: HTMLInputElement;
  @query('[part="time-input"]') private _timeInput?: HTMLInputElement;
  @query('[part="from-input"]') private _fromInput?: HTMLInputElement;
  @query('[part="to-input"]') private _toInput?: HTMLInputElement;
  @query('forge-field') private _field?: HTMLElement & { floatLabel: boolean };

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
  #coercingSegments = false;

  #isRangeValue(): boolean {
    return this.dateMode === 'range' || this.timeMode === 'range';
  }

  constructor() {
    super();
    IconRegistry.define(tylIconInsertInvitation);
    this.#internals = this.attachInternals();
  }

  /** The form this field participates in (read-only). */
  public get form(): HTMLFormElement | null {
    return this.#internals.form;
  }
  /** The labels associated with this field (read-only). */
  public get labels(): NodeList {
    return this.#internals.labels;
  }
  /** The field's current validity state (read-only). */
  public get validity(): ValidityState {
    return this.#internals.validity;
  }
  /** The current validation message, if any (read-only). */
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
    this.addEventListener('focusin', this.#onFocusIn);
    this.addEventListener('focusout', this.#onFocusOut);
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
    this.removeEventListener('focusin', this.#onFocusIn);
    this.removeEventListener('focusout', this.#onFocusOut);
    this.#detachPickerLink();
    this.#destroyMasks();
  }

  #onInvalid = (): void => {
    this._invalid = true;
  };

  #onFocusIn = (): void => {
    if (this._focused) {
      return;
    }
    this._focused = true;
    // Reveal the guide (and float the inset label) immediately, not on the next render, so the
    // format guide is present the moment the field gains focus.
    this.#applyMaskGuide();
    this.#floatLabel();
  };

  // Focus moving between the field's own segments keeps it "focused"; only drop the flag once focus
  // has actually left the component (checked next tick, after focus has settled on its new target).
  #onFocusOut = (): void => {
    requestAnimationFrame(() => {
      if (!this.matches(':focus-within') && this._focused) {
        this._focused = false;
        this.#applyMaskGuide();
        this.#floatLabel();
      }
    });
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
    if (!this.#masksInitialized || changed.has('dateMode') || changed.has('timeMode') || changed.has('use24HourTime') || changed.has('allowSeconds')) {
      this.#masksInitialized = true;
      this.#syncMasks();
    } else {
      this.#syncMaskDisplay();
    }
    // Guide visibility and the inset-label float depend on focus/value/config, so re-evaluate both
    // on every update (cheap — no mask rebuild).
    this.#applyMaskGuide();
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

  // A set placeholder shows only for a non-inset label (an inset label already rests as its own
  // placeholder).
  #placeholderActive(): boolean {
    return !!this.placeholder && this.labelPosition !== 'inset';
  }

  // persist-mask keeps the guide pinned on even at rest (when show-mask is on), overriding how the
  // inset label / placeholder would otherwise reclaim the input while empty and unfocused.
  #guidePersists(): boolean {
    return this.showMask && this.persistMask;
  }

  // The guide is visible when show-mask is on AND the field is engaged (focused or holding text), or
  // whenever persist-mask pins it. At rest it hides so the inset label / placeholder shows through.
  #guideVisible(): boolean {
    return this.#guidePersists() || (this.showMask && (this._focused || this.#hasSegmentText()));
  }

  // Push each mask into (or out of) its always-on guide to match the current visibility, without
  // recreating the mask so caret and value are preserved.
  #applyMaskGuide(): void {
    const visible = this.#guideVisible();
    for (const { mask } of this.#masks.values()) {
      mask.setShowMaskFormat(visible);
    }
  }

  // Only an inset label overlaps the input area, so only it needs to float. It rests (acting as the
  // placeholder) until the field is focused, holds text, or the guide is pinned on — then it floats
  // up to clear the input. Non-inset labels sit in their own area and never float.
  #floatLabel(): void {
    if (this._field) {
      this._field.floatLabel = this.labelPosition === 'inset' && (this.#guidePersists() || this._focused || this.#hasSegmentText());
    }
  }

  // "Text" means a real value or user-typed characters — the always-on guide placeholder (only
  // `_`, separators, and spaces) does not count, so a shown guide doesn't keep itself pinned on.
  #hasSegmentText(): boolean {
    if (this.#value != null) {
      return true;
    }
    return this.#maskedInputSpecs().some(({ el }) => {
      const value = el.value ?? '';
      return value !== '' && !/^[_/:\s]*$/.test(value);
    });
  }

  public override render(): TemplateResult {
    return html`
      <forge-field
        part="field"
        multiline
        label-position=${this.labelPosition}
        label-alignment=${this.labelAlignment}
        variant=${this.variant}
        density=${this.density}
        shape=${this.shape}
        theme=${this.theme}
        ?required=${this.required}
        ?invalid=${this._invalid}
        @mousedown=${this.#onFieldPointerDown}>
        ${this.label ? html`<label slot="label">${this.label}</label>` : nothing} ${this.#renderInputs()}
        ${this._pickerLinked
          ? html`
              <!-- Matches forge-date-picker's toggle: never a separate tab stop, opened via ArrowDown from the input instead. -->
              <forge-icon-button
                slot="end"
                part="toggle"
                type="button"
                tabindex="-1"
                density="medium"
                aria-label="Open date and time picker"
                aria-haspopup="dialog"
                aria-expanded=${this._open ? 'true' : 'false'}
                ?disabled=${this.disabled}
                @click=${this.#togglePicker}>
                <forge-icon name="insert_invitation"></forge-icon>
              </forge-icon-button>
            `
          : nothing}
        ${this._invalid
          ? html`<span slot="support-text" part="error-text">${this.#internals.validationMessage}</span>`
          : html`<slot name="support-text" slot="support-text"></slot>`}
        ${this.#renderSupportTextEnd()}
      </forge-field>
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
      if (key === 't') {
        event.preventDefault();
        this.#applyToday(event.target as HTMLInputElement);
        return;
      }
    }
    if (event.key === 'Enter') {
      this.#onTypedInput();
    } else if (event.key === 'ArrowDown' && this._pickerLinked) {
      // Matches forge-date-picker / forge-select: plain ArrowDown opens the linked picker.
      // Unlinked (standalone) fields have nothing to open, so leave the key alone for them.
      event.preventDefault();
      this.#setPickerOpen(true);
    } else if ((event.key === 'Backspace' || event.key === 'ArrowLeft') && !this.#hasNavModifier(event)) {
      const target = event.target as HTMLInputElement;
      // Nothing left of the caret in a time segment — Backspace has nothing to delete and
      // ArrowLeft has nowhere further to go, so both step back into the paired date input.
      if (target.selectionStart === 0 && target.selectionEnd === 0) {
        const dateInput = this.#pairedDateInput(target);
        if (dateInput) {
          event.preventDefault();
          this.#focusAtEnd(dateInput);
        }
      }
    } else if (event.key === 'ArrowRight' && !this.#hasNavModifier(event)) {
      const target = event.target as HTMLInputElement;
      // At the end of a date segment with nowhere further to go — continue into its paired time.
      if (target.selectionStart === target.value.length && target.selectionEnd === target.value.length) {
        const timeInput = this.#pairedTimeInput(target);
        if (timeInput) {
          event.preventDefault();
          this.#focusAtStart(timeInput);
        }
      }
    }
  };

  #quickKeysEnabled(): boolean {
    return !this.disabled && !this.readonly;
  }

  // Cmd/Ctrl/Alt+Backspace and Cmd/Alt+Arrow are native word/line-jump shortcuts — don't
  // hijack them into segment navigation even when the caret happens to be at a boundary.
  #hasNavModifier(event: KeyboardEvent): boolean {
    return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey;
  }

  #focusAtStart(input: HTMLInputElement): void {
    input.focus();
    input.setSelectionRange(0, 0);
  }

  #focusAtEnd(input: HTMLInputElement): void {
    input.focus();
    const end = input.value.length;
    input.setSelectionRange(end, end);
  }

  // Which time input, if any, continues typing after this date input's endpoint.
  #pairedTimeInput(dateInput: HTMLInputElement): HTMLInputElement | undefined {
    if (dateInput === this._dateInput) {
      return this.timeMode === 'range' ? this._fromInput : this._timeInput;
    }
    if (dateInput === this._toDateInput) {
      return this.timeMode === 'range' ? this._toInput : undefined;
    }
    return undefined;
  }

  // Which date input, if any, precedes this time input's endpoint.
  #pairedDateInput(timeInput: HTMLInputElement): HTMLInputElement | undefined {
    if (timeInput === this._timeInput || timeInput === this._fromInput) {
      return this._dateInput;
    }
    if (timeInput === this._toInput) {
      return this._toDateInput;
    }
    return undefined;
  }

  // Masks fire onChange for programmatic sets too (e.g. the picker pushing a value into a
  // non-focused input via #syncMaskDisplay) — only react to changes on the focused input, i.e.
  // ones the user actually typed, so a picker-driven update doesn't re-derive/re-emit per segment.
  #onDateMaskChange(dateInput: HTMLInputElement): void {
    if (this.#coercingSegments || this.shadowRoot?.activeElement !== dateInput) {
      return;
    }
    this.#onTypedInput(false);
    // #onTypedInput only re-renders when a segment's complete/incomplete state flips, but the
    // empty/partial guide tone needs to react to every keystroke, complete or not.
    this.requestUpdate();
    const caretAtEnd = dateInput.selectionStart === dateInput.value.length && dateInput.selectionEnd === dateInput.value.length;
    if (caretAtEnd && parseDateInput(this.#maskValue(dateInput)) != null) {
      const timeInput = this.#pairedTimeInput(dateInput);
      if (timeInput) {
        this.#focusAtStart(timeInput);
      }
    }
  }

  #onTimeMaskChange(timeInput: HTMLInputElement): void {
    if (this.#coercingSegments || this.shadowRoot?.activeElement !== timeInput) {
      return;
    }
    this.#onTypedInput(false);
    this.requestUpdate();
  }

  // The masked inputs are fixed-width and left-aligned, so the field can be wider than
  // its input row (e.g. when the label or support text is longer). A native field has no
  // such gap because its single input fills the box — mirror that by focusing the input
  // nearest the click when the empty chrome on the input row is pressed.
  #onFieldPointerDown = (event: MouseEvent): void => {
    if (this.disabled || this.readonly) {
      return;
    }
    const target = event.target as HTMLElement | null;
    // Clicks on the inputs themselves and the toggle button are already handled natively.
    if (!target || target instanceof HTMLInputElement || target.closest('[part="toggle"]')) {
      return;
    }
    const inputs = Array.from(this.shadowRoot?.querySelectorAll<HTMLInputElement>('input[part]') ?? []).filter(input => !input.disabled);
    if (!inputs.length) {
      return;
    }
    const rects = inputs.map(input => input.getBoundingClientRect());
    // Only hijack clicks on the input row — not the label above or support text below it.
    const top = Math.min(...rects.map(r => r.top));
    const bottom = Math.max(...rects.map(r => r.bottom));
    if (event.clientY < top || event.clientY > bottom) {
      return;
    }
    event.preventDefault();
    const nearest = inputs.reduce(
      (best, input, index) => {
        const center = (rects[index].left + rects[index].right) / 2;
        const distance = Math.abs(center - event.clientX);
        return distance < best.distance ? { distance, input } : best;
      },
      { distance: Infinity, input: inputs[0] }
    );
    nearest.input.focus();
  };

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

  // `commitEmpty` guards against the live per-keystroke path (mask onChange, fired on every
  // accepted keystroke) downgrading an already-complete value to null mid-edit — e.g.
  // backspacing one year digit shouldn't emit change(null) and clear the linked picker's
  // selection before the user finishes correcting it. blur/Enter/quick-keys still commit a
  // clear-out immediately, matching the pre-live-update behavior.
  // Only the commit path (blur / Enter / quick keys) coerces — the live per-keystroke path leaves
  // partial input alone so padding a year to a full value doesn't fight the user mid-edit.
  #onTypedInput = (commitEmpty = true): void => {
    if (commitEmpty) {
      this.#coerceTypedSegments();
    }
    const prevDate = this.#hasDate;
    const prevFromDate = this.#hasFromDate;
    const prevToDate = this.#hasToDate;
    const prevTime = this.#hasTime;
    const prevFrom = this.#hasFrom;
    const prevTo = this.#hasTo;
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

    const changed = !valuesEqual(next, this.#value);
    if (next != null || commitEmpty) {
      this.#value = next;
      this._invalid = false;
      this.#updateFormValueAndValidity();
      if (changed) {
        if (this.#pickerEl && !this._open) {
          this.#pickerEl.value = this.value ?? null;
        }
        this.#emitChange();
      }
    }
    // Re-render when a segment fills/empties even if the overall value is still
    // incomplete (null), so the muted-guide class reflects the typed content.
    const presenceChanged =
      this.#hasDate !== prevDate ||
      this.#hasFromDate !== prevFromDate ||
      this.#hasToDate !== prevToDate ||
      this.#hasTime !== prevTime ||
      this.#hasFrom !== prevFrom ||
      this.#hasTo !== prevTo;
    if (changed || presenceChanged) {
      this.requestUpdate();
    }
  };

  // Normalizes each segment's loosely-typed text to its canonical display (e.g. `1/2/25` →
  // `01/02/2025`, `130` → `01:30 AM`) before it's parsed, matching the picker inputs. Writing
  // back to a mask fires its `accept` handler, so guard the re-entrant #onTypedInput(false).
  #coerceTypedSegments(): void {
    if (this.#coercingSegments) {
      return;
    }
    this.#coercingSegments = true;
    try {
      for (const { el, kind } of this.#maskedInputSpecs()) {
        const raw = this.#maskValue(el);
        const coerced = kind === 'date' ? coerceDateInput(raw) : coerceTimeInput(raw, this.use24HourTime, this.allowSeconds);
        if (coerced && coerced !== raw) {
          this.#setMaskValue(el, coerced);
        }
      }
    } finally {
      this.#coercingSegments = false;
    }
  }

  // ─── Masks ────────────────────────────────────────────────────────────────

  // All segments sit inside a single `data-forge-field-input` wrapper. forge-field treats that
  // wrapper as its input, so its inset and floating-label padding apply once — the wrapper owns the
  // endpoint layout and wrapping internally, which keeps the vertical rhythm even when it wraps.
  #renderInputs(): TemplateResult {
    return html`<div class="inputs" data-forge-field-input>${this.#renderSegments()}</div>`;
  }

  #renderSegments(): TemplateResult {
    if (this.timeMode === 'slots') {
      return this.#renderSlotsMasked();
    }
    const range = this.#isRangeValue();
    const dateRange = this.dateMode === 'range';
    const timeRange = this.timeMode === 'range';
    // Each endpoint (its date + time inputs) is a `.endpoint` group so it stays glued as a single
    // flex-wrap unit: on a narrow field the range wraps by endpoint (start over end) instead of
    // splitting a date from its time.
    const startEndpoint = html`
      <span class="endpoint">
        ${this.#renderDateInput('date-input', range ? 'Start date' : this.label || 'Date', dateRange ? this.#hasFromDate : this.#hasDate)}
        ${this.#renderTimeInput(timeRange ? 'from-input' : 'time-input', range ? 'Start time' : 'Time', timeRange ? this.#hasFrom : this.#hasTime)}
      </span>
    `;
    if (!range) {
      return startEndpoint;
    }
    // The separator lives inside the end group so `– end` wraps as one unit: a narrow field then
    // shows exactly two rows (start over end) rather than orphaning the separator on its own line.
    return html`
      ${startEndpoint}
      <span class="endpoint">
        ${this.#hidesRangeSeparator() ? nothing : html`<span class="range-separator" aria-hidden="true">–</span>`}
        ${dateRange ? this.#renderDateInput('to-date-input', 'End date', this.#hasToDate) : nothing}
        ${timeRange ? this.#renderTimeInput('to-input', 'End time', this.#hasTo) : nothing}
      </span>
    `;
  }

  #timePlaceholder(): string {
    return this.use24HourTime ? (this.allowSeconds ? 'hh:mm:ss' : 'hh:mm') : this.allowSeconds ? 'hh:mm:ss aa' : 'hh:mm aa';
  }

  // The native input placeholder shows through only while the guide is hidden and the segment is
  // empty (imask covers it otherwise). An inset label already rests as the placeholder, so suppress
  // it there; otherwise show the field-level `placeholder` in the first (date) segment, falling back
  // to per-segment format hints.
  #segmentPlaceholder(kind: 'date' | 'time', isFirst: boolean): string {
    if (this.labelPosition === 'inset') {
      return '';
    }
    if (this.placeholder) {
      return isFirst ? this.placeholder : '';
    }
    return kind === 'date' ? 'MM/DD/YYYY' : this.#timePlaceholder();
  }

  // True while the field-level placeholder is the visible hint (non-inset label, guide currently
  // hidden, no text). The first input then grows to fit it so a long placeholder isn't clipped.
  #showsFieldPlaceholder(): boolean {
    return this.#placeholderActive() && !this.#guideVisible() && !this.#hasSegmentText();
  }

  // The range "–" only makes sense between two visible segments. While the field rests showing a
  // placeholder (non-inset label) or letting an inset label sit in the input, the segments are
  // blank and the lone separator reads as clutter — hide it until a guide or typed text appears.
  // (The plain format-hint state — no placeholder, non-inset label — keeps it: both hints show.)
  #hidesRangeSeparator(): boolean {
    return (this.labelPosition === 'inset' || !!this.placeholder) && !this.#guideVisible() && !this.#hasSegmentText();
  }

  // Empty (untouched guide), partial (typed but not yet valid), or complete — each gets its own tone.
  #segmentClass(hasSegment: boolean, inputEl: HTMLInputElement | undefined): string {
    if (hasSegment) {
      return '';
    }
    // The always-on guide fills unfilled slots with `_` (date/time) and literal separators
    // (`/`, `:`, space) — anything else means the user has started typing this segment.
    // `mask.unmaskedValue` isn't usable here: imask includes the guide placeholders in it too.
    const value = inputEl?.value ?? '';
    const untouched = /^[_/:\s]*$/.test(value);
    return untouched ? 'guide-muted' : 'guide-partial';
  }

  #renderDateInput(part: 'date-input' | 'to-date-input', ariaLabel: string, hasSegment: boolean): TemplateResult {
    const dateRequired = this.required && this.requiredParts !== 'time';
    const inputEl = part === 'date-input' ? this._dateInput : this._toDateInput;
    const isFirst = part === 'date-input';
    const classes = `${this.#segmentClass(hasSegment, inputEl)}${isFirst && this.#showsFieldPlaceholder() ? ' field-placeholder' : ''}`;
    return html`
      <input
        part=${part}
        class=${classes}
        type="text"
        inputmode="numeric"
        autocomplete="off"
        placeholder=${this.#segmentPlaceholder('date', isFirst)}
        aria-label=${ariaLabel}
        aria-required=${ifDefined(dateRequired ? 'true' : undefined)}
        aria-invalid=${ifDefined(this._invalid && dateRequired && !hasSegment ? 'true' : undefined)}
        aria-haspopup=${ifDefined(this._pickerLinked ? 'dialog' : undefined)}
        aria-expanded=${ifDefined(this._pickerLinked ? (this._open ? 'true' : 'false') : undefined)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @blur=${() => this.#onTypedInput()}
        @keydown=${this.#onTypedKeydown} />
    `;
  }

  #renderDatePart(): TemplateResult {
    if (this.dateMode === 'range') {
      return html`
        <span part="date-segment" class="date-segment">
          ${this.#renderDateInput('date-input', 'Start date', this.#hasFromDate)}
          ${this.#hidesRangeSeparator() ? nothing : html`<span class="range-separator" data-forge-multi-input-separator aria-hidden="true">–</span>`}
          ${this.#renderDateInput('to-date-input', 'End date', this.#hasToDate)}
        </span>
      `;
    }
    return this.#renderDateInput('date-input', this.label || 'Date', this.#hasDate);
  }

  #renderTimeInput(part: 'time-input' | 'from-input' | 'to-input', label: string, hasSegment: boolean): TemplateResult {
    const timeRequired = this.required && this.requiredParts !== 'date';
    const inputEl = part === 'time-input' ? this._timeInput : part === 'from-input' ? this._fromInput : this._toInput;
    return html`
      <input
        part=${part}
        class=${this.#segmentClass(hasSegment, inputEl)}
        type="text"
        autocomplete="off"
        placeholder=${this.#segmentPlaceholder('time', false)}
        aria-label=${label}
        aria-required=${ifDefined(timeRequired ? 'true' : undefined)}
        aria-invalid=${ifDefined(this._invalid && timeRequired && !hasSegment ? 'true' : undefined)}
        aria-haspopup=${ifDefined(this._pickerLinked ? 'dialog' : undefined)}
        aria-expanded=${ifDefined(this._pickerLinked ? (this._open ? 'true' : 'false') : undefined)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @blur=${() => this.#onTypedInput()}
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
          aria-haspopup=${ifDefined(this._pickerLinked ? 'dialog' : undefined)}
          aria-expanded=${ifDefined(this._pickerLinked ? (this._open ? 'true' : 'false') : undefined)}
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
    // Only structural options (mode-driven) key the mask identity; guide visibility is toggled live
    // via #applyMaskGuide (on focus/value/config change) rather than by rebuilding the mask.
    const timeOpts = `${this.use24HourTime}:${this.allowSeconds}`;
    const optsFor = (kind: 'date' | 'time'): string => (kind === 'time' ? timeOpts : '');
    for (const [el, entry] of this.#masks) {
      const keep = wanted.some(w => w.el === el && w.kind === entry.kind && entry.opts === optsFor(w.kind));
      if (!keep) {
        entry.mask.destroy();
        this.#masks.delete(el);
      }
    }
    const guide = this.#guideVisible();
    for (const { el, kind } of wanted) {
      if (this.#masks.has(el)) {
        continue;
      }
      const mask =
        kind === 'date'
          ? new DateInputMask(el, { showMaskFormat: guide, onChange: () => this.#onDateMaskChange(el) })
          : new TimeInputMask(el, {
              use24HourTime: this.use24HourTime,
              showSeconds: this.allowSeconds,
              showMaskFormat: guide,
              onChange: () => this.#onTimeMaskChange(el)
            });
      this.#masks.set(el, { mask, kind, opts: optsFor(kind) });
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
      // This runs inside updated(), after render() already painted the guide-tone class
      // against the pre-clear input text — request another pass so it reflects the blank guide.
      this.requestUpdate();
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
    applyFormValue(this.#internals, this.name, this.#value);
    this.#updateValidity();
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
    // Content typed into the field that doesn't resolve to a complete value — a half-typed segment
    // (partial year, unparseable time) or one part of the pair left blank — is malformed input, not
    // an empty field. Mirror native <input type="datetime-local">: badInput regardless of `required`.
    // Required-but-blank is reported as valueMissing above and takes precedence.
    if (!flags.valueMissing && this.#value == null && this.#hasSegmentText()) {
      flags.badInput = true;
      message ||= 'Please enter a complete date and time.';
      anchor ??= this.#anchorInput();
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
}
