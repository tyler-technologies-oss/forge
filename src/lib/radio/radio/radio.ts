import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { getFormState, getFormValue, inputType, internals, setDefaultAria } from '../../constants';
import {
  BaseComponent,
  IBaseFocusableComponent,
  IBaseFormAssociatedComponent,
  IBaseLabelAwareComponent,
  WithElementInternals,
  WithFocusable,
  WithFormAssociation,
  WithLabelAwareness
} from '../../core/base';
import { FormValue, InputType } from '../../core/utils/form-utils';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { StateLayerComponent } from '../../state-layer';
import { RadioGroupManager } from '../core/radio-group-manager';
import { RadioAdapter } from './radio-adapter';
import { RADIO_CONSTANTS, RadioLabelPosition, RadioState, tryCheck } from './radio-constants';
import { RadioFoundation } from './radio-foundation';

import template from './radio.html';
import style from './radio.scss';

export interface IRadioComponent extends IBaseFormAssociatedComponent, IBaseFocusableComponent, IBaseLabelAwareComponent {
  checked: boolean;
  defaultChecked: boolean;
  required: boolean;
  dense: boolean;
  labelPosition: RadioLabelPosition;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-radio': IRadioComponent;
  }
}

const BaseRadioClass = WithFormAssociation(WithLabelAwareness(WithFocusable(WithElementInternals(BaseComponent, RADIO_CONSTANTS.observedAriaAttributes))));

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
export class RadioComponent extends BaseRadioClass implements IRadioComponent {
  public static get observedAttributes(): string[] {
    return [
      RADIO_CONSTANTS.attributes.CHECKED,
      RADIO_CONSTANTS.attributes.DEFAULT_CHECKED,
      RADIO_CONSTANTS.attributes.VALUE,
      RADIO_CONSTANTS.attributes.DENSE,
      RADIO_CONSTANTS.attributes.DISABLED,
      RADIO_CONSTANTS.attributes.REQUIRED,
      RADIO_CONSTANTS.attributes.READONLY,
      RADIO_CONSTANTS.attributes.LABEL_POSITION,
      RADIO_CONSTANTS.attributes.TABINDEX,
      ...RADIO_CONSTANTS.observedAriaAttributes
    ];
  }

  private _foundation: RadioFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, style);
    this[inputType] = 'radio';
    this._foundation = new RadioFoundation(new RadioAdapter(this));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this[setDefaultAria]({
      role: 'radio',
      ariaChecked: this.checked ? 'true' : 'false',
      ariaDisabled: this.disabled ? 'true' : 'false',
      ariaInvalid: this[internals].validity.valid ? 'false' : 'true',
      ariaReadOnly: this.readonly ? 'true' : 'false',
      ariaRequired: this.required ? 'true' : 'false'
    });
    this._foundation.initialize();
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
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
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  public override [getFormValue](): FormValue | null {
    return this.checked ? this.value : null;
  }

  public override [getFormState](): RadioState {
    return this.checked ? 'checked' : 'unchecked';
  }

  public formResetCallback(): void {
    RadioGroupManager.requestRadioGroupReset(this);
  }

  public formStateRestoreCallback(state: RadioState): void {
    this.checked = state === 'checked';
  }

  public formDisabledCallback(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public labelClickedCallback(): void {
    this.click();
  }

  public labelChangedCallback(value: string | null): void {
    this[setDefaultAria]({
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
