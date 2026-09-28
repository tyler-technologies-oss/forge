import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { IconRegistry } from '../icon/index.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { createToggleElement } from '../date-picker/base/base-date-picker-utils.js';
import { FIELD_CONSTANTS } from '../field/field-constants.js';
import type { ITextFieldComponent } from '../text-field/text-field.js';
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
  mergeDateAndTime,
  parseMaybeDate,
  parseTimeString,
  toPublicValue,
  valuesEqual
} from '../date-time-picker/date-time-picker-utils.js';
import { ensureTemporal } from '../date-time-picker/temporal-loader.js';
import { DateInputMask } from '../core/mask/date-input-mask.js';
import { TimeInputMask } from '../core/mask/time-input-mask.js';
import { DateTimeInputMask } from '../core/mask/date-time-input-mask.js';
import {
  coerceDateInput,
  coerceTimeInput,
  endpointFormatHint,
  formatDateInput,
  formatTimeInput,
  parseDateInput,
  parseTypedValue,
  type DateTimeFieldEndpointKind
} from './date-time-field-utils.js';
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
  showDuration: boolean;
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

type EndpointMask = DateTimeInputMask | DateInputMask | TimeInputMask;

interface IEndpointMaskEntry {
  mask: EndpointMask;
  kind: DateTimeFieldEndpointKind;
  key: string;
  guide: boolean;
}

interface IEndpointText {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

const MANAGED_INPUT_ATTRIBUTES = [
  'placeholder',
  'size',
  'autocomplete',
  'inputmode',
  'spellcheck',
  'readonly',
  'role',
  'aria-label',
  'aria-describedby',
  'aria-required',
  'aria-haspopup',
  'aria-expanded',
  'aria-controls'
] as const;

let errorTextId = 0;

/**
 * @tag forge-date-time-field
 *
 * @summary A form-associated date/time input with masked entry. Wraps a consumer-provided
 * `forge-text-field` whose slotted `<input>` elements become the masked endpoints, and links to a
 * `forge-date-time-picker` via the `picker` IDREF attribute or the `pickerElement` property.
 *
 * Endpoint inputs by mode (one `<input>` per endpoint, in order):
 * - single date + single time or slots: one input, `MM/DD/YYYY hh:mm AM`
 * - single date + time range: start `MM/DD/YYYY hh:mm AM`, end `hh:mm AM`
 * - date range + single time: start `MM/DD/YYYY hh:mm AM`, end `MM/DD/YYYY` (shares the start time)
 * - date range + time range: start and end `MM/DD/YYYY hh:mm AM`
 *
 * Quick keys (while an input is focused): `n` = now, `t` = today
 *
 * On commit (blur / Enter / quick key) loosely-typed parts are coerced like the picker inputs:
 * two-digit years gain a century (`1/2/25` → `01/02/2025`), an hour-only time completes
 * (`5` → `05:00 AM`), and out-of-range parts are clamped (`02/30/2025` → `02/28/2025`).
 *
 * @fires {CustomEvent<IDateTimeFieldChangeEventData>} forge-date-time-field-change
 * @fires {CustomEvent} forge-date-time-field-open
 * @fires {CustomEvent} forge-date-time-field-close
 *
 * @slot - A `forge-text-field` containing the endpoint `<input>` element(s).
 *
 * @attribute {string} [picker] - ID of the linked `forge-date-time-picker` in the same root.
 * @attribute {('single'|'range')} [date-mode='single'] - Whether the field captures a single date or a start/end date range.
 * @attribute {('single'|'range'|'slots')} [time-mode='single'] - Whether the field captures a single time, a same-day start/end time range, or a fixed time slot (booking-style).
 * @attribute {('temporal'|'iso'|'date')} [value-mode='temporal'] - Shape of the public `value`: a `Temporal.PlainDateTime` (default), a local ISO `datetime-local` string, or a native `Date`.
 * @attribute {string} [name] - Form field name used when submitting the owning form.
 * @attribute {boolean} [disabled=false] - Disables the field, its text field, and its linked picker.
 * @attribute {boolean} [readonly=false] - Prevents editing while still allowing focus and form submission.
 * @attribute {boolean} [required=false] - Marks the required parts (see `required-parts`) as required for form validation.
 * @attribute {('both'|'date'|'time')} [required-parts='both'] - Which parts must be filled for the field to be valid when `required`.
 * @attribute {boolean} [open=false] - Reflects and controls whether the linked picker is open.
 * @attribute {boolean} [persistent=false] - Forwarded to the linked picker; keeps it open until explicitly dismissed instead of closing on outside interaction.
 * @attribute {string} [locale] - BCP 47 locale used for formatting the duration summary; defaults to the runtime locale.
 * @attribute {boolean} [use-24-hour-time=false] - Displays and parses time in 24-hour format instead of 12-hour with AM/PM.
 * @attribute {boolean} [allow-seconds=false] - Adds seconds to the time mask and value.
 * @attribute {boolean} [show-mask=true] - Shows the format guide while the field is focused or holds text. An input `placeholder` (with a non-inset label) hides the guide until the user types.
 * @attribute {boolean} [persist-mask=false] - Forces the guide to always show when `show-mask` is on, even if a `placeholder` is set.
 * @attribute {boolean} [show-duration=true] - Shows the range duration in the text field's `support-text-end` slot (unless the consumer provides one).
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
 */
@customElement(DATE_TIME_FIELD_TAG_NAME)
export class DateTimeFieldComponent extends BaseLitElement implements IDateTimeFieldComponent {
  static {
    IconRegistry.define(tylIconInsertInvitation);
  }

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
  /** Disables the field, its text field, and its linked picker. */
  @property({ type: Boolean, reflect: true }) public disabled = false;
  /** Prevents editing while still allowing focus and form submission. */
  @property({ type: Boolean, reflect: true }) public readonly = false;
  /** Marks the required parts (see `requiredParts`) as required for form validation. */
  @property({ type: Boolean, reflect: true }) public required = false;
  /** Which parts must be filled for the field to be valid when `required`. */
  @property({ attribute: 'required-parts', reflect: true }) public requiredParts: DateTimeFieldRequiredParts = 'both';
  /** Reflects and controls whether the linked picker is open. */
  @property({ type: Boolean, reflect: true }) public open = false;
  /** Forwarded to the linked picker; keeps it open until explicitly dismissed instead of closing on outside interaction. */
  @property({ type: Boolean, reflect: true }) public persistent = false;
  /** BCP 47 locale used for formatting the duration summary; defaults to the runtime locale. */
  @property({ reflect: true }) public locale: string | undefined;
  /** Displays and parses time in 24-hour format instead of 12-hour with AM/PM. */
  @property({ type: Boolean, attribute: 'use-24-hour-time', reflect: true }) public use24HourTime = false;
  /** Adds seconds to the time mask and value. */
  @property({ type: Boolean, attribute: 'allow-seconds', reflect: true }) public allowSeconds = false;
  /** Shows the format guide while the field is focused or holds text. An input `placeholder` (with a non-inset label) hides it until the user types. */
  @property({ type: Boolean, attribute: 'show-mask', reflect: true }) public showMask = true;
  /** Forces the guide to always show when `showMask` is on, even if a `placeholder` is set. */
  @property({ type: Boolean, attribute: 'persist-mask', reflect: true }) public persistMask = false;
  /** Shows the range duration in the text field's `support-text-end` slot unless the consumer provides one. */
  @property({ type: Boolean, attribute: 'show-duration', reflect: true }) public showDuration = true;
  /** Minimum selectable date/time; forwarded to the linked picker and used for validation. */
  @property({ attribute: 'min' }) public min: Date | string | null = null;
  /** Maximum selectable date/time; forwarded to the linked picker and used for validation. */
  @property({ attribute: 'max' }) public max: Date | string | null = null;
  /** Placement of the linked picker's popover relative to the field. */
  @property({ attribute: 'popover-placement' }) public popoverPlacement: string = DATE_TIME_FIELD_CONSTANTS.defaultValues.POPOVER_PLACEMENT;

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
    const next = this.#normalizeSharedTime(coerceValue(input, this.#isRangeValue() ? 'range' : 'single', this.allowSeconds));
    if (valuesEqual(next, this.#value)) {
      return;
    }
    this.#value = next;
    const present = next != null;
    this.#setSegmentPresence(present);
    this.#shouldClear = !present;
    this.#pickerPartial = false;
    this._invalid = false;
    this.#updateFormValueAndValidity();
    if (this.#pickerEl) {
      this.#pickerEl.value = this.value ?? null;
    }
    this.requestUpdate();
  }

  @state() private _open = false;
  @state() private _invalid = false;
  @state() private _pickerLinked = false;
  @state() private _focused = false;

  #internals: ElementInternals;
  #value: DateTimePickerValue = null;
  #pickerIdRef = '';
  #pickerEl: IDateTimePickerComponent | null = null;
  #pickerLinkRetryPending = false;
  #hasDate = false;
  #hasFromDate = false;
  #hasToDate = false;
  #hasTime = false;
  #hasFrom = false;
  #hasTo = false;
  #masks = new Map<HTMLInputElement, IEndpointMaskEntry>();
  #shouldClear = false;
  #pickerPartial = false;
  #authorNamedGroup = false;
  #groupNameResolved = false;
  #coercingSegments = false;
  #warnedSlotsRange = false;
  #warnedShortfall = '';

  #textField: ITextFieldComponent | null = null;
  #inputs: HTMLInputElement[] = [];
  #originalInputAttributes = new Map<HTMLInputElement, Map<string, string | null>>();
  #writtenInputAttributes = new Map<HTMLInputElement, Map<string, string | null>>();
  #forwardedTextFieldState: Partial<Record<'disabled' | 'required' | 'invalid', boolean>> = {};
  #toggleWasDisabled = false;
  #textFieldObserver: MutationObserver | null = null;
  #toggleEl: HTMLElement | null = null;
  #createdToggle = false;
  #separatorEl: HTMLElement | null = null;
  #errorTextEl: HTMLElement | null = null;
  #durationEl: HTMLElement | null = null;

  // A date range with a single time shares the start time, matching the picker's normalization.
  #normalizeSharedTime(value: DateTimePickerValue): DateTimePickerValue {
    if (this.dateMode !== 'range' || this.timeMode !== 'single' || !isRange(value)) {
      return value;
    }
    const to = new Date(value.to);
    to.setHours(value.from.getHours(), value.from.getMinutes(), value.from.getSeconds(), 0);
    return { from: value.from, to };
  }

  #isRangeValue(): boolean {
    return this.timeMode !== 'slots' && (this.dateMode === 'range' || this.timeMode === 'range');
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
    this.#pickerPartial = false;
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
    // Capture whether the author named the group before we sprout our own default name; only on the
    // first connect, since a reconnect would otherwise mistake our own name for the author's.
    if (!this.#groupNameResolved) {
      this.#groupNameResolved = true;
      this.#authorNamedGroup = this.hasAttribute('aria-label') || this.hasAttribute('aria-labelledby');
    }
    setDefaultAria(this, this.#internals, { role: 'group' });
    this.addEventListener('invalid', this.#onInvalid);
    this.addEventListener('focusin', this.#onFocusIn);
    this.addEventListener('focusout', this.#onFocusOut);
    this.#updateFormValueAndValidity();
    if (this.valueMode === 'temporal') {
      void ensureTemporal().then(() => this.requestUpdate());
    }
    void customElements.whenDefined('forge-text-field').then(() => this.#syncStructure());
    if (this.#pickerIdRef) {
      this.#resolvePickerLink();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focusin', this.#onFocusIn);
    this.removeEventListener('focusout', this.#onFocusOut);
    this.#detachPickerLink();
    this.#detachStructure();
  }

  public override render(): TemplateResult {
    return html`<slot @slotchange=${this.#onSlotChange}></slot>`;
  }

  #onInvalid = (): void => {
    this._invalid = true;
  };

  #onFocusIn = (): void => {
    if (this._focused) {
      return;
    }
    this._focused = true;
    // Reveal the guide immediately so it's present the moment the field gains focus.
    this.#applyMaskGuide();
  };

  // Focus moving between inputs keeps the field focused; only clear once focus has left the component.
  #onFocusOut = (): void => {
    requestAnimationFrame(() => {
      if (!this.matches(':focus-within') && this._focused) {
        this._focused = false;
        this.#applyMaskGuide();
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
        // Force-close directly: #setPickerOpen early-returns once the field is disabled.
        if (this.disabled && this._open) {
          this._open = false;
          this.open = false;
          this.#pickerEl.open = false;
        }
      }
      if (changed.has('readonly')) {
        this.#pickerEl.readonly = this.readonly;
      }
      if (changed.has('min')) {
        this.#pickerEl.min = this.min;
      }
      if (changed.has('max')) {
        this.#pickerEl.max = this.max;
      }
    }
  }

  public override updated(changed: PropertyValues<this>): void {
    this.#updateFormValueAndValidity();
    // A framework can swap the referenced picker out (new element, same id) without this field
    // disconnecting; re-resolve when the link went stale so the fresh picker gets anchored.
    if (this.#pickerIdRef && this.#pickerEl && !this.#pickerEl.isConnected) {
      this.#resolvePickerLink();
    }
    if (changed.has('dateMode') || changed.has('timeMode') || changed.has('use24HourTime') || changed.has('allowSeconds')) {
      this.#syncMasks();
    } else {
      this.#syncMaskDisplay();
    }
    this.#syncDecorations();
    this.#applyMaskGuide();
  }

  // ─── Structure (slotted text field + inputs) ─────────────────────────────

  #onSlotChange = (): void => {
    this.#syncStructure();
  };

  #syncStructure(): void {
    if (!this.isConnected) {
      return;
    }
    const textField = this.querySelector<ITextFieldComponent>(':scope > forge-text-field');
    if (textField !== this.#textField) {
      this.#detachStructure();
      this.#forwardedTextFieldState = {};
      this.#textField = textField;
      if (textField) {
        this.#textFieldObserver = new MutationObserver(() => this.#syncInputs());
        this.#textFieldObserver.observe(textField, { childList: true, subtree: true });
      }
    }
    this.#syncInputs();
    this.#updateGroupLabel();
    if (this.#pickerEl) {
      this.#pickerEl.anchorElement = this.#popoverTarget();
    }
  }

  #syncInputs(): void {
    const inputs = Array.from(this.#textField?.querySelectorAll<HTMLInputElement>(':scope > input') ?? []);
    const unchanged = inputs.length === this.#inputs.length && inputs.every((input, index) => input === this.#inputs[index]);
    if (!unchanged) {
      this.#inputs.filter(input => !inputs.includes(input)).forEach(input => this.#detachInput(input));
      inputs.filter(input => !this.#inputs.includes(input)).forEach(input => this.#attachInput(input));
      this.#inputs = inputs;
      this.#syncMasks();
      this.#updateFormValueAndValidity();
    }
    this.#updateGroupLabel();
    this.#syncDecorations();
  }

  #detachStructure(): void {
    this.#textFieldObserver?.disconnect();
    this.#textFieldObserver = null;
    this.#inputs.forEach(input => this.#detachInput(input));
    this.#inputs = [];
    this.#destroyMasks();
    this.#removeToggle();
    this.#removeOwned(this.#separatorEl);
    this.#separatorEl = null;
    this.#removeOwned(this.#errorTextEl);
    this.#errorTextEl = null;
    this.#removeOwned(this.#durationEl);
    this.#durationEl = null;
    this.#textField = null;
  }

  #attachInput(input: HTMLInputElement): void {
    const original = new Map<string, string | null>();
    MANAGED_INPUT_ATTRIBUTES.forEach(name => original.set(name, input.getAttribute(name)));
    this.#originalInputAttributes.set(input, original);
    this.#writtenInputAttributes.set(input, new Map());
    if (input.name) {
      console.warn('forge-date-time-field: remove the `name` from slotted inputs; the field submits its own value under its `name`.');
    }
    input.addEventListener('keydown', this.#onTypedKeydown);
    input.addEventListener('blur', this.#onInputBlur);
  }

  #detachInput(input: HTMLInputElement): void {
    input.removeEventListener('keydown', this.#onTypedKeydown);
    input.removeEventListener('blur', this.#onInputBlur);
    const entry = this.#masks.get(input);
    entry?.mask.destroy();
    this.#masks.delete(input);
    this.#restoreInputAttributes(input);
    this.#originalInputAttributes.delete(input);
    this.#writtenInputAttributes.delete(input);
  }

  // Put back the consumer's value for every attribute the field wrote on an input it no longer manages.
  #restoreInputAttributes(input: HTMLInputElement): void {
    this.#reconcileAuthoredAttributes(input);
    const original = this.#originalInputAttributes.get(input);
    const written = this.#writtenInputAttributes.get(input);
    written?.forEach((_, name) => {
      const value = original?.get(name) ?? null;
      if (value == null) {
        input.removeAttribute(name);
      } else {
        input.setAttribute(name, value);
      }
    });
    written?.clear();
  }

  // An attribute that no longer holds what the field last wrote was changed by the consumer, so it's
  // authored from now on and the field leaves it alone.
  #reconcileAuthoredAttributes(input: HTMLInputElement): void {
    const original = this.#originalInputAttributes.get(input);
    const written = this.#writtenInputAttributes.get(input);
    if (!original || !written) {
      return;
    }
    for (const [name, value] of written) {
      const current = input.getAttribute(name);
      if (current !== value) {
        original.set(name, name === 'aria-describedby' ? this.#withoutErrorId(current) : current);
        written.delete(name);
      }
    }
  }

  #isAuthoredAttribute(input: HTMLInputElement, name: string): boolean {
    const value = this.#originalInputAttributes.get(input)?.get(name);
    return value != null && (name !== 'placeholder' || value !== '');
  }

  #writeInputAttribute(input: HTMLInputElement, name: string, value: string | null): void {
    if (input.getAttribute(name) !== value) {
      if (value == null) {
        input.removeAttribute(name);
      } else {
        input.setAttribute(name, value);
      }
    }
    this.#writtenInputAttributes.get(input)?.set(name, value);
  }

  #withoutErrorId(value: string | null): string | null {
    const id = this.#errorTextEl?.id;
    if (!value || !id) {
      return value;
    }
    const rest = value
      .split(/\s+/)
      .filter(token => token && token !== id)
      .join(' ');
    return rest || null;
  }

  #removeOwned(el: HTMLElement | null): void {
    el?.remove();
  }

  #endpointKinds(): DateTimeFieldEndpointKind[] {
    if (this.timeMode === 'slots') {
      if (this.dateMode === 'range' && !this.#warnedSlotsRange) {
        this.#warnedSlotsRange = true;
        console.warn('forge-date-time-field: time-mode="slots" captures a single date; date-mode="range" is ignored.');
      }
      return ['datetime'];
    }
    if (this.dateMode === 'range') {
      return ['datetime', this.timeMode === 'range' ? 'datetime' : 'date'];
    }
    return this.timeMode === 'range' ? ['datetime', 'time'] : ['datetime'];
  }

  #endpointInputs(): HTMLInputElement[] {
    return this.#inputs.slice(0, this.#endpointKinds().length);
  }

  #popoverTarget(): HTMLElement {
    return this.#textField?.popoverTargetElement ?? this.#textField ?? this;
  }

  // Keep the text field, inputs, and field-owned helpers (toggle, separator, error text, duration)
  // in sync with the field's configuration and state.
  #syncDecorations(): void {
    const textField = this.#textField;
    if (!textField) {
      return;
    }
    this.#forwardTextFieldState(textField, 'disabled', this.disabled);
    this.#forwardTextFieldState(textField, 'required', this.required);
    this.#forwardTextFieldState(textField, 'invalid', this._invalid);
    this.#syncErrorText();
    const kinds = this.#endpointKinds();
    const inputs = this.#endpointInputs();
    const shortfall = inputs.length < kinds.length ? `${kinds.length}:${inputs.length}` : '';
    if (shortfall && shortfall !== this.#warnedShortfall) {
      console.warn(`forge-date-time-field: expected ${kinds.length} <input> element(s) in the forge-text-field for the current mode, found ${inputs.length}.`);
    }
    this.#warnedShortfall = shortfall;
    inputs.forEach((input, index) => this.#applyInputAttributes(input, kinds[index], index, kinds.length));
    this.#inputs.slice(inputs.length).forEach(input => this.#restoreInputAttributes(input));
    this.#syncSeparator(kinds.length === 2 && inputs.length === 2);
    this.#syncToggle();
    this.#syncDuration();
  }

  // Forward only the field's own state changes, so a consumer's initial `invalid`/`required`/`disabled`
  // on the text field isn't reset on every sync.
  #forwardTextFieldState(textField: ITextFieldComponent, prop: 'disabled' | 'required' | 'invalid', value: boolean): void {
    const last = this.#forwardedTextFieldState[prop];
    if (last === undefined ? value : last !== value) {
      textField[prop] = value;
    }
    this.#forwardedTextFieldState[prop] = value;
  }

  #applyInputAttributes(input: HTMLInputElement, kind: DateTimeFieldEndpointKind, index: number, count: number): void {
    this.#reconcileAuthoredAttributes(input);
    const authored = (name: string): boolean => this.#isAuthoredAttribute(input, name);
    const write = (name: string, value: string | null): void => this.#writeInputAttribute(input, name, value);
    if (!authored('autocomplete')) {
      write('autocomplete', 'off');
    }
    if (!authored('spellcheck')) {
      write('spellcheck', 'false');
    }
    if (!authored('inputmode')) {
      write('inputmode', kind === 'date' || this.use24HourTime ? 'numeric' : null);
    }
    const hint = endpointFormatHint(kind, this.use24HourTime, this.allowSeconds);
    if (!authored('placeholder')) {
      write('placeholder', this.#textField?.labelPosition === 'inset' ? null : hint);
    }
    if (!authored('size')) {
      write('size', String(Math.max(hint.length, input.placeholder.length)));
    }
    if (!authored('aria-label') && !input.hasAttribute('aria-labelledby')) {
      write('aria-label', this.#endpointAriaLabel(kind, index, count) || null);
    }
    if (!authored('readonly')) {
      write('readonly', this.readonly ? '' : null);
    }
    const requiredHere = this.required && (kind === 'datetime' || (kind === 'date' ? this.requiredParts !== 'time' : this.requiredParts !== 'date'));
    write('aria-required', requiredHere ? 'true' : null);
    // Like forge-date-picker, a picker-linked input is a combobox, which is what permits aria-expanded.
    const linked = this._pickerLinked;
    if (!authored('role')) {
      write('role', linked ? 'combobox' : null);
    }
    write('aria-haspopup', linked ? 'dialog' : null);
    write('aria-expanded', linked ? String(this._open) : null);
    write('aria-controls', linked && this.#pickerEl?.id ? this.#pickerEl.id : null);
    const describedBy = [this.#originalInputAttributes.get(input)?.get('aria-describedby'), this.#errorTextEl?.id].filter(Boolean).join(' ');
    write('aria-describedby', describedBy || null);
  }

  // A single input is labelled by the text field's `<label>`; two inputs can't share it, so each gets
  // a start/end name (the group carries the field label).
  #endpointAriaLabel(kind: DateTimeFieldEndpointKind, index: number, count: number): string {
    if (count === 1) {
      return this.#labelText() ? '' : 'Date and time';
    }
    const noun = kind === 'datetime' ? 'date and time' : kind;
    return `${index === 0 ? 'Start' : 'End'} ${noun}`;
  }

  #labelText(): string {
    return this.#textField?.querySelector(':scope > label, :scope > [slot="label"]')?.textContent?.trim() ?? '';
  }

  #syncSeparator(needed: boolean): void {
    const textField = this.#textField;
    const [first] = this.#inputs;
    const authored = textField?.querySelector<HTMLElement>(`:scope > [${FIELD_CONSTANTS.attributes.MULTI_INPUT_SEPARATOR}]`);
    if (!needed || !textField || !first || (authored && authored !== this.#separatorEl)) {
      this.#removeOwned(this.#separatorEl);
      this.#separatorEl = null;
      return;
    }
    if (!this.#separatorEl) {
      const separator = document.createElement('span');
      separator.setAttribute(FIELD_CONSTANTS.attributes.MULTI_INPUT_SEPARATOR, '');
      separator.setAttribute('aria-hidden', 'true');
      separator.textContent = '–';
      this.#separatorEl = separator;
    }
    if (first.nextElementSibling !== this.#separatorEl) {
      first.after(this.#separatorEl);
    }
    this.#separatorEl.hidden = this.#hidesRangeSeparator();
  }

  #syncToggle(): void {
    const textField = this.#textField;
    if (!textField || !this._pickerLinked) {
      this.#removeToggle();
      return;
    }
    if (!this.#toggleEl) {
      const authored = textField.querySelector<HTMLElement>(':scope > forge-icon-button[slot="end"]');
      if (authored) {
        this.#toggleEl = authored;
        this.#createdToggle = false;
        this.#toggleWasDisabled = (authored as HTMLElement & { disabled: boolean }).disabled;
      } else {
        const toggle = createToggleElement('insert_invitation');
        toggle.setAttribute('aria-label', 'Toggle date and time picker');
        if (textField.density === 'extra-small') {
          toggle.density = 'small';
        }
        textField.append(toggle);
        this.#toggleEl = toggle;
        this.#createdToggle = true;
      }
      this.#toggleEl.addEventListener('click', this.#onToggleClick);
      this.#toggleEl.addEventListener('mousedown', this.#onToggleMouseDown);
    }
    this.#toggleEl.setAttribute('aria-haspopup', 'dialog');
    this.#toggleEl.setAttribute('aria-expanded', String(this._open));
    (this.#toggleEl as HTMLElement & { disabled: boolean }).disabled = this.disabled;
  }

  #removeToggle(): void {
    if (!this.#toggleEl) {
      return;
    }
    this.#toggleEl.removeEventListener('click', this.#onToggleClick);
    this.#toggleEl.removeEventListener('mousedown', this.#onToggleMouseDown);
    if (this.#createdToggle) {
      this.#toggleEl.remove();
    } else {
      this.#toggleEl.removeAttribute('aria-haspopup');
      this.#toggleEl.removeAttribute('aria-expanded');
      (this.#toggleEl as HTMLElement & { disabled: boolean }).disabled = this.#toggleWasDisabled;
    }
    this.#toggleEl = null;
    this.#createdToggle = false;
  }

  #hasAuthoredSlot(name: string, owned: HTMLElement | null): boolean {
    return Array.from(this.#textField?.querySelectorAll(`:scope > [slot="${name}"]`) ?? []).some(el => el !== owned);
  }

  #syncErrorText(): void {
    const message = this._invalid ? this.#internals.validationMessage : '';
    if (!message || this.#hasAuthoredSlot('support-text', this.#errorTextEl)) {
      this.#removeOwned(this.#errorTextEl);
      this.#errorTextEl = null;
      return;
    }
    this.#errorTextEl ??= Object.assign(document.createElement('span'), { slot: 'support-text', id: `forge-date-time-field-error-${++errorTextId}` });
    if (this.#errorTextEl.textContent !== message) {
      this.#errorTextEl.textContent = message;
    }
    if (!this.#errorTextEl.isConnected) {
      this.#textField?.append(this.#errorTextEl);
    }
  }

  #syncDuration(): void {
    const v = this.#value;
    const show = this.showDuration && this.#isRangeValue() && isRange(v) && !this._open && v.from.getTime() < v.to.getTime();
    if (!show || this.#hasAuthoredSlot('support-text-end', this.#durationEl)) {
      this.#removeOwned(this.#durationEl);
      this.#durationEl = null;
      return;
    }
    this.#durationEl ??= Object.assign(document.createElement('span'), { slot: 'support-text-end' });
    const duration = formatDuration(v.from, v.to, this.locale);
    if (this.#durationEl.textContent !== duration) {
      this.#durationEl.textContent = duration;
    }
    if (!this.#durationEl.isConnected) {
      this.#textField?.append(this.#durationEl);
    }
  }

  // Name the role=group host from the text field's label so screen readers hear the composite
  // control's purpose. Skips when the author supplied their own name.
  #updateGroupLabel(): void {
    if (this.#authorNamedGroup) {
      return;
    }
    setDefaultAria(this, this.#internals, { ariaLabel: this.#labelText() || 'Date and time' });
  }

  // ─── Mask guide ──────────────────────────────────────────────────────────

  // An authored placeholder shows only for a non-inset label (an inset label rests as its own placeholder).
  #placeholderActive(): boolean {
    const authored = this.#endpointInputs().some(input => this.#isAuthoredAttribute(input, 'placeholder'));
    return authored && this.#textField?.labelPosition !== 'inset';
  }

  #guidePersists(): boolean {
    return this.showMask && this.persistMask;
  }

  // The guide shows while engaged (focused or holding text), or always when persist-mask pins it.
  #guideVisible(): boolean {
    if (this.#guidePersists()) {
      return true;
    }
    if (!this.showMask) {
      return false;
    }
    if (this.#placeholderActive() && !this.#hasSegmentText()) {
      return false;
    }
    return this._focused || this.#hasSegmentText();
  }

  #applyMaskGuide(): void {
    // Only toggle on an actual change: re-applying mid-typing fights imask's deferred caret update.
    const visible = this.#guideVisible();
    for (const entry of this.#masks.values()) {
      if (entry.guide !== visible) {
        entry.guide = visible;
        entry.mask.setShowMaskFormat(visible);
      }
    }
  }

  // The range separator only makes sense between two visible segments; hide it while both rest empty.
  #hidesRangeSeparator(): boolean {
    return !this.#guideVisible() && !this.#hasSegmentText() && (this.#textField?.labelPosition === 'inset' || this.#placeholderActive());
  }

  // "Text" means a real value or user-typed characters; the guide alone (`_`, separators, spaces) doesn't count.
  #hasSegmentText(): boolean {
    if (this.#value != null) {
      return true;
    }
    return this.#endpointInputs().some(input => {
      const value = input.value ?? '';
      return value !== '' && !/^[_/:\s]*$/.test(value);
    });
  }

  // ─── Link resolution ─────────────────────────────────────────────────────

  #resolvePickerLink(): void {
    this.#detachPickerLink();
    if (!this.#pickerIdRef) {
      return;
    }
    const el = this.#findPicker();
    if (!el) {
      // The picker is often a later sibling that connects after this field; retry once the DOM settles.
      this.#schedulePickerLinkRetry();
      return;
    }
    this.#pickerEl = el;
    this.#attachPickerLink();
    this.requestUpdate();
  }

  #findPicker(): IDateTimePickerComponent | null {
    const root = this.getRootNode() as Document | ShadowRoot;
    return (root.getElementById?.(this.#pickerIdRef) as IDateTimePickerComponent | null) ?? null;
  }

  #schedulePickerLinkRetry(): void {
    if (this.#pickerLinkRetryPending) {
      return;
    }
    this.#pickerLinkRetryPending = true;
    requestAnimationFrame(() => {
      this.#pickerLinkRetryPending = false;
      if (!this.isConnected || this.#pickerEl || !this.#pickerIdRef) {
        return;
      }
      const el = this.#findPicker();
      if (el) {
        this.#pickerEl = el;
        this.#attachPickerLink();
        this.requestUpdate();
      } else {
        console.warn(`forge-date-time-field: picker "${this.#pickerIdRef}" not found in the same root`);
      }
    });
  }

  #attachPickerLink(): void {
    if (!this.#pickerEl) {
      return;
    }
    this.#pickerEl.addEventListener('forge-date-time-picker-change', this.#onPickerChange);
    this.#pickerEl.addEventListener('forge-date-time-picker-close', this.#onPickerClose);
    this._pickerLinked = true;
    // Start a freshly-linked pair closed so a reconnected picker can't strand a stale open popover.
    this._open = false;
    this.open = false;
    this.#pickerEl.open = false;
    void this.updateComplete.then(async () => {
      if (!this.#pickerEl) {
        return;
      }
      // Anchoring puts the picker in popover mode, aligned to the text field like other Forge pickers.
      this.#pickerEl.anchorElement = this.#popoverTarget();
      this.#pickerEl.placement = this.popoverPlacement;
      this.#pickerEl.persistent = this.persistent;
      this.#warnMismatch();
      // A forwarded time-mode change resets the picker's value asynchronously, so push ours after it settles.
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
    picker.min = this.min;
    picker.max = this.max;
  }

  #detachPickerLink(): void {
    if (!this.#pickerEl) {
      return;
    }
    this.#pickerEl.removeEventListener('forge-date-time-picker-change', this.#onPickerChange);
    this.#pickerEl.removeEventListener('forge-date-time-picker-close', this.#onPickerClose);
    // Dismiss before unlinking so a re-pointed or removed field never strands an open picker.
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
    // A mode-change is the picker resetting its own state after we forwarded config, not a user selection.
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
      if (detail.source === 'clear') {
        this.#shouldClear = true;
      }
    }
    this.#pickerPartial = this.#value == null && !this.#shouldClear;
    if (this.#pickerPartial) {
      this.#syncPartialDisplay(detail);
    } else {
      this.#syncMaskDisplay(true);
    }
    this._invalid = false;
    this.#updateFormValueAndValidity();
    this.#emitChange();
    this.requestUpdate();
    // Range modes stay open so both endpoints' times remain editable.
    if (detail.complete && detail.source !== 'initial' && !this.#isRangeValue()) {
      this.#setPickerOpen(false);
    }
  };

  #onPickerClose = (): void => {
    if (!this._open) {
      return;
    }
    this._open = false;
    this.open = false;
    this.#clearPickerPartial();
    this.dispatchEvent(new CustomEvent(DATE_TIME_FIELD_CONSTANTS.events.CLOSE, { bubbles: true, composed: true }));
  };

  #clearPickerPartial(): void {
    if (this.#pickerPartial) {
      this.#pickerPartial = false;
      this.#updateValidity();
    }
  }

  // ─── Toggle / open ───────────────────────────────────────────────────────

  #onToggleClick = (event: Event): void => {
    event.stopPropagation();
    this.#setPickerOpen(!this._open);
  };

  // Keep focus in the input when the toggle is pressed, like forge-date-picker.
  #onToggleMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
  };

  #setPickerOpen(open: boolean): void {
    if (this.disabled || this.readonly || !this.#pickerEl) {
      return;
    }
    if (this._open === open) {
      return;
    }
    const restoreFocus = !open && this.#pickerEl.matches(':focus-within');
    this._open = open;
    this.open = open;
    this.#pickerEl.open = open;
    if (restoreFocus) {
      this.#endpointInputs()[0]?.focus();
    }
    this.dispatchEvent(
      new CustomEvent(open ? DATE_TIME_FIELD_CONSTANTS.events.OPEN : DATE_TIME_FIELD_CONSTANTS.events.CLOSE, { bubbles: true, composed: true })
    );
  }

  // ─── Typed input ─────────────────────────────────────────────────────────

  #onInputBlur = (event: FocusEvent): void => {
    if (this.#masks.has(event.target as HTMLInputElement)) {
      this.#onTypedInput();
    }
  };

  #onTypedKeydown = (event: KeyboardEvent): void => {
    const target = event.target as HTMLInputElement;
    // An input the current mode doesn't use behaves like a plain input.
    if (!this.#masks.has(target)) {
      return;
    }
    const key = event.key.toLowerCase();
    if (this.#quickKeysEnabled() && !event.ctrlKey && !event.metaKey && !event.altKey) {
      if (key === 'n') {
        event.preventDefault();
        this.#applyNow(target);
        return;
      }
      if (key === 't') {
        event.preventDefault();
        this.#applyToday(target);
        return;
      }
    }
    if (event.key === 'Enter') {
      this.#onTypedInput();
    } else if (event.key === 'ArrowDown' && this._pickerLinked) {
      // Matches forge-date-picker / forge-select: plain ArrowDown opens the linked picker.
      event.preventDefault();
      this.#setPickerOpen(true);
    } else if ((event.key === 'Backspace' || event.key === 'ArrowLeft') && !this.#hasNavModifier(event)) {
      // Caret at the start of an input steps back to the end of the previous one.
      if (target.selectionStart === 0 && target.selectionEnd === 0) {
        const prev = this.#adjacentInput(target, -1);
        if (prev) {
          event.preventDefault();
          this.#focusAtEnd(prev);
        }
      }
    } else if (event.key === 'ArrowRight' && !this.#hasNavModifier(event)) {
      if (target.selectionStart === target.value.length && target.selectionEnd === target.value.length) {
        const next = this.#adjacentInput(target, 1);
        if (next) {
          event.preventDefault();
          this.#focusAtStart(next);
        }
      }
    }
  };

  #adjacentInput(current: HTMLInputElement, direction: -1 | 1): HTMLInputElement | undefined {
    const inputs = this.#endpointInputs().filter(input => !input.disabled);
    const index = inputs.indexOf(current);
    return index === -1 ? undefined : inputs[index + direction];
  }

  #quickKeysEnabled(): boolean {
    return !this.disabled && !this.readonly;
  }

  // Modified Backspace/Arrow keys are native word/line-jump shortcuts; don't hijack them.
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

  // Masks fire onChange for programmatic sets too; only react to input the user is typing.
  #onMaskChange(input: HTMLInputElement): void {
    if (this.#coercingSegments || !input.matches(':focus')) {
      return;
    }
    this.#onTypedInput(false);
    this.requestUpdate();
    const caretAtEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;
    if (caretAtEnd && this.#endpointComplete(input)) {
      const next = this.#adjacentInput(input, 1);
      if (next) {
        this.#focusAtStart(next);
      }
    }
  }

  #endpointComplete(input: HTMLInputElement): boolean {
    const entry = this.#masks.get(input);
    if (!entry) {
      return false;
    }
    const { date, time } = this.#partsOf(input);
    const dateOk = parseDateInput(date) != null;
    const timeOk = parseTimeString(time) != null;
    return entry.kind === 'datetime' ? dateOk && timeOk : entry.kind === 'date' ? dateOk : timeOk;
  }

  #applyNow(target: HTMLInputElement): void {
    const entry = this.#masks.get(target);
    if (!entry) {
      return;
    }
    const now = new Date();
    const time = formatTimeInput(now, this.use24HourTime, this.allowSeconds);
    if (entry.mask instanceof DateTimeInputMask) {
      if (parseDateInput(entry.mask.datePart) == null) {
        entry.mask.datePart = formatDateInput(now);
      }
      entry.mask.timePart = time;
    } else if (entry.kind === 'date') {
      entry.mask.maskedValue = formatDateInput(now);
    } else {
      entry.mask.maskedValue = time;
    }
    this.#onTypedInput();
  }

  #applyToday(target: HTMLInputElement): void {
    const entry = this.#masks.get(target);
    if (!entry || entry.kind === 'time') {
      return;
    }
    const today = formatDateInput(new Date());
    if (entry.mask instanceof DateTimeInputMask) {
      entry.mask.datePart = today;
    } else {
      entry.mask.maskedValue = today;
    }
    this.#onTypedInput();
  }

  #partsOf(input: HTMLInputElement | undefined): { date: string; time: string } {
    const entry = input && this.#masks.get(input);
    if (!entry) {
      return { date: '', time: '' };
    }
    if (entry.mask instanceof DateTimeInputMask) {
      return { date: entry.mask.datePart, time: entry.mask.timePart };
    }
    const text = entry.mask.maskedValue;
    return entry.kind === 'date' ? { date: text, time: '' } : { date: '', time: text };
  }

  // The start and end date/time strings, filling a single-part end endpoint from the start endpoint.
  #endpointText(): IEndpointText {
    const [first, second] = this.#endpointInputs();
    const kinds = this.#endpointKinds();
    const start = this.#partsOf(first);
    if (kinds.length === 1) {
      return { startDate: start.date, startTime: start.time, endDate: start.date, endTime: start.time };
    }
    const end = this.#partsOf(second);
    return {
      startDate: start.date,
      startTime: start.time,
      endDate: kinds[1] === 'time' ? start.date : end.date,
      endTime: kinds[1] === 'date' ? start.time : end.time
    };
  }

  // `commitEmpty` keeps the live per-keystroke path from downgrading a complete value to null
  // mid-edit; blur/Enter/quick keys still commit a clear-out. Only the commit path coerces.
  #onTypedInput = (commitEmpty = true): void => {
    this.#pickerPartial = false;
    if (commitEmpty) {
      this.#coerceTypedSegments();
    }
    const prev = [this.#hasDate, this.#hasFromDate, this.#hasToDate, this.#hasTime, this.#hasFrom, this.#hasTo];
    const { startDate, startTime, endDate, endTime } = this.#endpointText();
    this.#hasFromDate = parseDateInput(startDate) != null;
    this.#hasToDate = parseDateInput(endDate) != null;
    this.#hasDate = this.#hasFromDate;
    let next: DateTimePickerValue;
    if (this.#isRangeValue()) {
      if (this.timeMode === 'range') {
        this.#hasFrom = parseTimeString(startTime) != null;
        this.#hasTo = parseTimeString(endTime) != null;
      } else {
        this.#hasTime = parseTimeString(startTime) != null;
      }
      const from = parseTypedValue(startDate, startTime, this.allowSeconds);
      const to = parseTypedValue(endDate, endTime, this.allowSeconds);
      next = from && to ? { from, to } : null;
    } else {
      this.#hasTime = parseTimeString(startTime) != null;
      next = parseTypedValue(startDate, startTime, this.allowSeconds);
    }

    const changed = !valuesEqual(next, this.#value);
    if (next != null || commitEmpty) {
      this.#value = next;
      this._invalid = false;
      this.#updateFormValueAndValidity();
      if (changed) {
        if (this.#pickerEl) {
          this.#pickerEl.value = this.value ?? null;
        }
        this.#emitChange();
      }
    }
    const current = [this.#hasDate, this.#hasFromDate, this.#hasToDate, this.#hasTime, this.#hasFrom, this.#hasTo];
    if (changed || current.some((value, index) => value !== prev[index])) {
      this.requestUpdate();
    }
  };

  // Normalizes loosely-typed parts to their canonical display before parsing. Writing back to a
  // mask fires its accept handler, so guard the re-entrant #onTypedInput(false).
  #coerceTypedSegments(): void {
    if (this.#coercingSegments) {
      return;
    }
    this.#coercingSegments = true;
    try {
      for (const { mask, kind } of this.#masks.values()) {
        if (mask instanceof DateTimeInputMask) {
          const date = coerceDateInput(mask.datePart);
          if (date && date !== mask.datePart) {
            mask.datePart = date;
          }
          const time = coerceTimeInput(mask.timePart, this.use24HourTime, this.allowSeconds);
          if (time && time !== mask.timePart) {
            mask.timePart = time;
          }
          continue;
        }
        const raw = mask.maskedValue;
        const coerced = kind === 'date' ? coerceDateInput(raw) : coerceTimeInput(raw, this.use24HourTime, this.allowSeconds);
        if (coerced && coerced !== raw) {
          mask.maskedValue = coerced;
        }
      }
    } finally {
      this.#coercingSegments = false;
    }
  }

  // ─── Masks ────────────────────────────────────────────────────────────────

  #syncMasks(): void {
    const kinds = this.#endpointKinds();
    const inputs = this.#endpointInputs();
    const keyFor = (kind: DateTimeFieldEndpointKind): string => `${kind}:${this.use24HourTime}:${this.allowSeconds}`;
    for (const [input, entry] of this.#masks) {
      const index = inputs.indexOf(input);
      if (index === -1 || entry.key !== keyFor(kinds[index])) {
        entry.mask.destroy();
        this.#masks.delete(input);
      }
    }
    const guide = this.#guideVisible();
    inputs.forEach((input, index) => {
      if (this.#masks.has(input)) {
        return;
      }
      const kind = kinds[index];
      const onChange = (): void => this.#onMaskChange(input);
      const timeOptions = { use24HourTime: this.use24HourTime, showSeconds: this.allowSeconds, showMaskFormat: guide, onChange };
      const mask =
        kind === 'datetime'
          ? new DateTimeInputMask(input, timeOptions)
          : kind === 'date'
            ? new DateInputMask(input, { showMaskFormat: guide, onChange })
            : new TimeInputMask(input, timeOptions);
      this.#masks.set(input, { mask, kind, key: keyFor(kind), guide });
    });
    this.#syncMaskDisplay();
  }

  // `force` writes focused inputs too; picker selections happen while the input keeps focus.
  #syncMaskDisplay(force = false): void {
    const set = (input: HTMLInputElement | undefined, text: string): void => {
      const mask = input && this.#masks.get(input)?.mask;
      if (mask && (force || !input.matches(':focus'))) {
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
    const [first, second] = this.#endpointInputs();
    const kinds = this.#endpointKinds();
    const date = (d: Date): string => formatDateInput(d);
    const time = (d: Date): string => formatTimeInput(d, this.use24HourTime, this.allowSeconds);
    const v = this.#value;
    if (this.#isRangeValue() && isRange(v)) {
      set(first, `${date(v.from)} ${time(v.from)}`);
      if (kinds[1] === 'datetime') {
        set(second, `${date(v.to)} ${time(v.to)}`);
      } else if (kinds[1] === 'date') {
        set(second, date(v.to));
      } else if (kinds[1] === 'time') {
        set(second, time(v.to));
      }
      return;
    }
    if (v instanceof Date) {
      set(first, `${date(v)} ${time(v)}`);
    }
  }

  // Shows an incomplete picker selection (e.g. a range start before its end) in the inputs.
  #syncPartialDisplay({ date, dateTo, time, from, to }: IDateTimePickerChangeEventData): void {
    const [first, second] = this.#endpointInputs();
    const kinds = this.#endpointKinds();
    const dateText = (d: Date | null): string => (d ? formatDateInput(d) : '');
    const timeText = (t: string | null): string => {
      const merged = mergeDateAndTime(new Date(2000, 0, 1), t);
      return merged ? formatTimeInput(merged, this.use24HourTime, this.allowSeconds) : '';
    };
    const endDate = this.dateMode === 'range' ? dateTo : date;
    const write = (input: HTMLInputElement | undefined, kind: DateTimeFieldEndpointKind, d: string, t: string): void => {
      const mask = input && this.#masks.get(input)?.mask;
      if (!mask) {
        return;
      }
      if (mask instanceof DateTimeInputMask) {
        mask.maskedValue = d;
        mask.timePart = t;
      } else {
        mask.maskedValue = kind === 'date' ? d : t;
      }
    };
    const isTimeRange = this.timeMode === 'range';
    write(first, 'datetime', dateText(date), timeText(isTimeRange ? from : time));
    if (kinds[1]) {
      write(second, kinds[1], dateText(endDate), timeText(isTimeRange ? to : time));
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
    const [first, second] = this.#endpointInputs();
    const kinds = this.#endpointKinds();
    // Which input holds each part: a date-only or time-only end endpoint shares the other part with the start.
    const endDateInput = kinds[1] === 'time' ? first : (second ?? first);
    const endTimeInput = kinds[1] === 'date' ? first : (second ?? first);
    if (this.required) {
      const missingDate = this.requiredParts !== 'time' && (this.dateMode === 'range' ? !this.#hasFromDate || !this.#hasToDate : !this.#hasDate);
      // Time presence follows the time axis: from/to exist only in time-mode=range.
      const missingTime = this.requiredParts !== 'date' && (this.timeMode === 'range' ? !this.#hasFrom || !this.#hasTo : !this.#hasTime);
      if (missingDate || missingTime) {
        flags.valueMissing = true;
        message = missingDate && missingTime ? 'Please select a date and time.' : missingDate ? 'Date is required.' : 'Time is required.';
        anchor = missingDate ? (!this.#hasFromDate ? first : endDateInput) : this.timeMode === 'range' && this.#hasFrom ? endTimeInput : first;
      }
    }
    // Typed content that doesn't resolve to a complete value is malformed input, like native datetime-local.
    if (!flags.valueMissing && this.#value == null && !this.#pickerPartial && this.#hasSegmentText()) {
      flags.badInput = true;
      message ||= 'Please enter a complete date and time.';
      anchor ??= first;
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
      anchor ??= second ?? first;
    }
    if (!flags.valueMissing && this.#slotUnavailable()) {
      flags.customError = true;
      message ||= DATE_TIME_FIELD_CONSTANTS.MESSAGES.SLOT_UNAVAILABLE;
      anchor ??= first;
    }
    if (Object.keys(flags).length === 0) {
      this.#internals.setValidity({});
      return;
    }
    // setValidity throws for an anchor outside this element (e.g. an input a framework just swapped out).
    const connectedAnchor = [anchor, first].find(candidate => candidate && this.contains(candidate));
    this.#internals.setValidity(flags, message, connectedAnchor);
  }

  #slotUnavailable(): boolean {
    const picker = this.#pickerEl;
    return (
      this.timeMode === 'slots' &&
      this.#value instanceof Date &&
      !!picker &&
      typeof picker.isTimeSlotAvailable === 'function' &&
      !picker.isTimeSlotAvailable(this.#value)
    );
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
      // A date-only min/max string is local midnight, matching the local wall-clock values it's compared against.
      return parseMaybeDate(input);
    }
    return null;
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
    this.#hasFromDate = present;
    this.#hasToDate = present && this.dateMode === 'range';
  }
}
