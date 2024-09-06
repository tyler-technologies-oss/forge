import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { getFormState, getFormValue, inputType, setDefaultAria } from '../../constants';
import { BaseComponent } from '../../core/base/base-component';
import { IWithFocusable, WithFocusable } from '../../core/mixins/focus/with-focusable';
import { IWithFormAssociation, WithFormAssociation } from '../../core/mixins/form/with-form-associated';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { FormValue } from '../../core/utils/form-utils';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { StateLayerComponent } from '../../state-layer';
import { RadioGroupManager } from '../core/radio-group-manager';
import { RadioAdapter } from './radio-adapter';
import { RadioLabelPosition, RadioState, RADIO_CONSTANTS, tryCheck } from './radio-constants';
import { RadioCore } from './radio-core';

import template from './radio.html';
import styles from './radio.scss';

export interface IRadioComponent extends IWithFormAssociation, IWithFocusable, IWithLabelAwareness, IWithElementInternals, IWithDefaultAria {
  checked: boolean;
  defaultChecked: boolean;
  value: string;
  required: boolean;
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
 * @cssproperty --forge-radio-state-layer-unchecked - color - The color of the radio button's state layer when unchecked.
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
 * @csspart root - Styles the radio's root element.
 * @csspart background - Styles the border and background of the radio.
 * @csspart focus-indicator - Styles the focus indicator of the radio.
 * @csspart state-layer - Styles the state layer of the radio.
 *
 * @slot - This is a default/unnamed slot for the label text.
 *
 * @cssclass forge-radio - Apply to the root element _(required)_.
 * @cssclass forge-radio--dense - Makes the radio dense.
 */
@customElement({
  name: RADIO_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class RadioComponent
  extends WithFormAssociation(WithLabelAwareness(WithFocusable(WithDefaultAria(WithElementInternals(BaseComponent)))))
  implements IRadioComponent
{
  public static get observedAttributes(): string[] {
    return Object.values(RADIO_CONSTANTS.observedAttributes);
  }

  private _core: RadioCore;

  // Used to communicate with the form group after this radio instance has been disconnected
  private _rootNode?: ShadowRoot | Document;
  private _latestAssociatedForm?: HTMLFormElement;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this[inputType] = 'radio';
    this._core = new RadioCore(new RadioAdapter(this));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this[setDefaultAria]({
      role: 'radio',
      ariaChecked: this.checked ? 'true' : 'false',
      ariaDisabled: this.disabled ? 'true' : 'false'
    });
    RadioGroupManager.syncRadioFocusableState(this);
    this._core.initialize();
    this._rootNode = this.getRootNode() as ShadowRoot | Document;
  }

  public disconnectedCallback(): void {
    RadioGroupManager.syncRadioFocusableState(this, {
      ignoreSelf: true,
      rootNode: this._rootNode,
      form: this._latestAssociatedForm
    });
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case RADIO_CONSTANTS.attributes.CHECKED:
        this._core.checked = coerceBoolean(newValue);
        break;
      case RADIO_CONSTANTS.attributes.DEFAULT_CHECKED:
        this._core.defaultChecked = coerceBoolean(newValue);
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

  public formAssociatedCallback(form: HTMLFormElement | null): void {
    if (form) {
      this._latestAssociatedForm = form;
    }
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

  /**
   * Gets/sets whether the radio is checked.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare checked: boolean;

  /**
   * Gets/sets whether the radio is checked by default.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare defaultChecked: boolean;

  /**
   * Gets/sets the value of the radio when submitted as part of a form.
   * @default 'on'
   * @attribute
   */
  @coreProperty()
  public declare value: string;

  /**
   * Controls whether the radio is dense.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare dense: boolean;

  /**
   * Controls whether the radio is disabled.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare disabled: boolean;

  /**
   * Controls whether the radio is required.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare required: boolean;

  /**
   * Controls whether the radio is read-only.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare readonly: boolean;

  /**
   * Controls whether the label appears before or after the radio.
   * @default 'end'
   * @attribute
   */
  @coreProperty()
  public declare labelPosition: RadioLabelPosition;

  public [tryCheck](): boolean {
    return this._core.tryCheck();
  }
}
