import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean, toggleAttribute } from '@tylertech/forge-core';
import { BaseFormComponent, IBaseFormComponent } from '@tylertech/forge/core';
import { setDefaultAria } from '@tylertech/forge/core/utils/a11y-utils';
import { FocusIndicatorComponent } from '@tylertech/forge/focus-indicator';
import { ILabelAware } from '@tylertech/forge/label';
import { StateLayerComponent } from '@tylertech/forge/state-layer';
import { RadioAdapter } from './radio-adapter';
import { RADIO_CONSTANTS, RadioLabelPosition, tryCheck } from './radio-constants';
import { RadioFoundation } from './radio-foundation';

import template from './radio.html';
import style from './radio.scss';
import { RadioSelectionManager } from '../core/radio-selection-manager';

export interface IRadioComponent extends IBaseFormComponent, ILabelAware {
  checked: boolean;
  defaultChecked: boolean;
  dense: boolean;
  labelPosition: RadioLabelPosition;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-radio': IRadioComponent;
  }
}

/**
 * @tag forge-radio
 * 
 * @summary The Forge Radio component is used to create a form input where only one out of a set of
 * values should be selected.
 * 
 * @property {boolean} checked - Indicates whether the radio button is checked.
 * @property {boolean} defaultChecked - Indicates whether the radio button is checked by default.
 * @property {string} value - The value of the radio button when submitted.
 * @property {boolean} dense - Indicates whether the radio button should be displayed in a dense layout.
 * @property {boolean} disabled - Indicates whether the radio button is disabled.
 * @property {boolean} required - Indicates whether the radio button is required.
 * @property {boolean} readonly - Indicates whether the radio button is read-only.
 * @property {RadioLabelPosition} labelPosition - The position of the radio button's label.
 * 
 * @attribute {boolean} checked - Indicates whether the radio button is checked.
 * @attribute {boolean} default-checked - Indicates whether the radio button is checked by default.
 * @attribute {string} value - The value of the radio button when submitted.
 * @attribute {boolean} dense - Indicates whether the radio button should be displayed in a dense layout.
 * @attribute {boolean} disabled - Indicates whether the radio button is disabled.
 * @attribute {boolean} required - Indicates whether the radio button is required.
 * @attribute {boolean} readonly - Indicates whether the radio button is read-only.
 * @attribute {RadioLabelPosition} label-position - The position of the radio button's label.
 * 
 * @csspart radio - Styles the radio's root element.
 */
@CustomElement({
  name: RADIO_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent
  ]
})
export class RadioComponent extends BaseFormComponent implements IRadioComponent {
  public static get observedAttributes(): string[] {
    return [
      RADIO_CONSTANTS.attributes.CHECKED,
      RADIO_CONSTANTS.attributes.DEFAULT_CHECKED,
      RADIO_CONSTANTS.attributes.VALUE,
      RADIO_CONSTANTS.attributes.DENSE,
      RADIO_CONSTANTS.attributes.DISABLED,
      RADIO_CONSTANTS.attributes.REQUIRED,
      RADIO_CONSTANTS.attributes.READONLY,
      RADIO_CONSTANTS.attributes.LABEL_POSITION
    ];
  }

  public get name(): string {
    return this.getAttribute('name') ?? '';
  }
  public set name(value: string) {
    toggleAttribute(this, !!value, 'name', value);
  }

  public get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  public get labels(): NodeList {
    return this.internals.labels;
  }

  public get validity(): ValidityState {
    // TODO: sync validity with foundation
    return this.internals.validity;
  }

  public get validationMessage(): string {
    // TODO: sync validity with foundation
    return this.internals.validationMessage;
  }

  public get willValidate(): boolean {
    return this.internals.willValidate;
  }

  public readonly internals: ElementInternals;
  private _foundation: RadioFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, style);
    this.internals = this.attachInternals();
    this._foundation = new RadioFoundation(new RadioAdapter(this));
  }

  public connectedCallback(): void {
    this.tabIndex = 0;
    setDefaultAria(this, this.internals, {
      role: 'radio',
      ariaChecked: this.checked ? 'true' : 'false'
    });
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case RADIO_CONSTANTS.attributes.CHECKED:
        this._foundation.checked = coerceBoolean(newValue);
        break;
      case RADIO_CONSTANTS.attributes.DEFAULT_CHECKED:
        this._foundation.defaultChecked = coerceBoolean(newValue);
        break;
      case RADIO_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case RADIO_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case RADIO_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case RADIO_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case RADIO_CONSTANTS.attributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        break;
      case RADIO_CONSTANTS.attributes.LABEL_POSITION:
        this.labelPosition = newValue as RadioLabelPosition;
        break;
    }
  }

  public setFormValue(value: string | File | FormData | null, state?: string | File | FormData | null | undefined): void {
    this.internals.setFormValue(value, state);
  }

  public checkValidity(): boolean {
    // TODO: sync validity with foundation
    return this.internals.checkValidity();
  }

  public reportValidity(): boolean {
    // TODO: sync validity with foundation
    return this.internals.reportValidity();
  }

  public setCustomValidity(error: string): void {
    this._hasCustomValidityError = !!error;
    // TODO: set validity in foundation
  }

  public formResetCallback(): void {
    if (this.defaultChecked) {
      RadioSelectionManager.setSelectedRadioInGroup(this);
    } else {
      this.checked = false;
    }
  }

  public formStateRestoreCallback(state: string, reason: 'restore' | 'autocomplete'): void {
    // TODO: restore state
  }

  public formDisabledCallback(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public labelClickedCallback(): void {
    this.click();
  }

  public labelChangedCallback(value: string | null): void {
    setDefaultAria(this, this.internals, {
      ariaLabel: value ?? undefined
    });
  }

  @FoundationProperty()
  public declare checked: boolean;

  @FoundationProperty()
  public declare defaultChecked: boolean;

  @FoundationProperty()
  public declare value: string;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare required: boolean;

  @FoundationProperty()
  public declare readonly: boolean;

  @FoundationProperty()
  public declare labelPosition: RadioLabelPosition;

  public [tryCheck](): boolean {
    return this._foundation.tryCheck();
  }
}
