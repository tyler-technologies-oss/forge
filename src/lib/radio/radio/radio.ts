import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { getFormState, getFormValue, inputType, internals, setDefaultAria } from '../../constants';
import { BaseComponent } from '../../core/base/base-component';
import { IWithFocusable, WithFocusable } from '../../core/mixins/focus/with-focusable';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IWithFormAssociation, WithFormAssociation } from '../../core/mixins/form/with-form-associated';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { FormValue } from '../../core/utils/form-utils';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { StateLayerComponent } from '../../state-layer';
import { RadioGroupManager } from '../core/radio-group-manager';
import { RadioAdapter } from './radio-adapter';
import { RADIO_CONSTANTS, RadioLabelPosition, RadioState, tryCheck } from './radio-constants';
import { RadioFoundation } from './radio-foundation';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';

import template from './radio.html';
import styles from './radio.scss';

export interface IRadioComponent extends IWithFormAssociation, IWithFocusable, IWithLabelAwareness, IWithElementInternals, IWithDefaultAria {
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

const BaseRadioClass = WithFormAssociation(WithLabelAwareness(WithFocusable(WithDefaultAria(WithElementInternals(BaseComponent)))));

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
 * @cssproperty --forge-radio-primary-color - The primary color of the radio button when checked.
 * @cssproperty --forge-radio-inactive-color - The color of the radio button when unchecked.
 * @cssproperty --forge-radio-size - The size of the radio button in the inline and block directions.
 * @cssproperty --forge-radio-width - The width of the radio button.
 * @cssproperty --forge-radio-height - The height of the radio button.
 * @cssproperty --forge-radio-border-width - The width of the radio button's border.
 * @cssproperty --forge-radio-unchecked-border-color - The color of the radio button's border when unchecked.
 * @cssproperty --forge-radio-checked-border-color - The color of the radio button's border when checked.
 * @cssproperty --forge-radio-background - The background of the radio button.
 * @cssproperty --forge-radio-shape - The shape of the radio button.
 * @cssproperty --forge-radio-mark-size - The size of the radio button's mark in the inline and block directions.
 * @cssproperty --forge-radio-mark-width - The width of the radio button's mark.
 * @cssproperty --forge-radio-mark-height - The height of the radio button's mark.
 * @cssproperty --forge-radio-mark-unchecked-color - The color of the radio button's mark when unchecked.
 * @cssproperty --forge-radio-mark-checked-color - The color of the radio button's mark when checked.
 * @cssproperty --forge-radio-mark-unchecked-background - The background of the radio button's mark when unchecked.
 * @cssproperty --forge-radio-mark-checked-background - The background of the radio button's mark when checked.
 * @cssproperty --forge-radio-gap - The gap between the radio button and its label.
 * @cssproperty --forge-radio-justify - The alignment of the radio button and its label in the inline direction.
 * @cssproperty --forge-radio-direction - The direction of the radio button and its label.
 * @cssproperty --forge-radio-state-layer-size - The size of the radio button's state layer in the inline and block directions.
 * @cssproperty --forge-radio-state-layer-width - The width of the radio button's state layer.
 * @cssproperty --forge-radio-state-layer-height - The height of the radio button's state layer.
 * @cssproperty --forge-radio-state-layer-unchecked-color - The color of the radio button's state layer when unchecked.
 * @cssproperty --forge-radio-state-layer-checked-color - The color of the radio button's state layer when checked.
 * @cssproperty --forge-radio-state-layer-shape - The shape of the radio button's state layer.
 * @cssproperty --forge-radio-state-layer-dense-size - The size of the radio button's state layer when dense.
 * @cssproperty --forge-radio-state-layer-dense-width - The width of the radio button's state layer when dense.
 * @cssproperty --forge-radio-state-layer-dense-height - The height of the radio button's state layer when dense.
 * @cssproperty --forge-radio-disabled-opacity - The opacity of the radio button when disabled.
 * @cssproperty --forge-radio-animation-duration - The duration of the radio button's animations.
 * @cssproperty --forge-radio-animation-timing-function - The timing function of the radio button's animations.
 * @cssproperty --forge-radio-animation-delay - The delay of the radio button's animations.
 *  
 * @csspart radio - Styles the radio's root element.
 * @csspart background - Styles the border and background of the radio.
 * @csspart focus-indicator - Styles the focus indicator of the radio.
 * @csspart state-layer - Styles the state layer of the radio.
 * 
 * @slot - This is a default/unnamed slot for the label text.
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
      RADIO_CONSTANTS.attributes.TABINDEX
    ];
  }

  private _foundation: RadioFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
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

  public labelClickedCallback(): void {
    this.click();
  }

  public labelChangedCallback(value: string | null): void {
    this[setDefaultAria]({ ariaLabel: value });
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
