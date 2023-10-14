import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean, isDefined, isString, toggleAttribute } from '@tylertech/forge-core';
import { INPUT_ARIA_ATTRIBUTES, BaseFormComponent, IBaseFormComponent } from '../core';
import { FocusIndicatorComponent } from '../focus-indicator/focus-indicator';
import { StateLayerComponent } from '../state-layer/state-layer';
import { CheckboxAdapter } from './checkbox-adapter';
import { CHECKBOX_CONSTANTS, CheckboxLabelPosition, CheckboxState } from './checkbox-constants';
import { CheckboxFoundation } from './checkbox-foundation';

import template from './checkbox.html';
import styles from './checkbox.scss';

export const forwardedAttributes = [...INPUT_ARIA_ATTRIBUTES];

export interface ICheckboxComponent extends IBaseFormComponent {
  checked: boolean;
  defaultChecked: boolean;
  indeterminate: boolean;
  dense: boolean;
  labelPosition: CheckboxLabelPosition;
  toggle(force?: boolean): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-checkbox': ICheckboxComponent;
  }
}

/**
 * @tag forge-checkbox
 * 
 * @summary Checkboxes select single values for submission in a form.
 * 
 * @description
 * Use checkboxes to:
 * - Select one or multiple items from a list.
 * - Present a list containing sub-selections.
 * - Turn an option on or off in desktop environment.
 * 
 * @property {boolean} checked - Whether the checkbox is checked.
 * @property {boolean} defaultChecked - Whether the checkbox is checked by default.
 * @property {boolean} indeterminate - Toggles the indeterminate state. This does not affect whether the checkbox is checked or its form submission.
 * @property {string} value - The value of the checkbox when checked.
 * @property {boolean} disabled - Controls if the checkbix is disabled.
 * @property {boolean} required = Controls if the checkbox is required.
 * @property {boolean} readonly = Controls if the checkbox is readonly.
 * @property {boolean} dense - The density state.
 * @property {SwitchLabelPosition} labelPosition - Whether the label appears before or after the checkbox.
 * 
 * @attribute {string} checked - Controls whether the checkbox is checked.
 * @attribute {string} defaultChecked - Controls whether the checkbox is checked by default.
 * @attribute {string} indeterminate - Controls the indeterminate state.
 * @attribute {string} value - The value of the checkbox when checked.
 * @attribute {string} disabled - Controls if the switch is disabled.
 * @attribute {string} required - Controls if the switch is required.
 * @attribute {string} readonly - Controls if the switch is readonly.
 * @attribute {string} dense - Sets the density state.
 * @attribute {string} label-position - Sets whether the label appears before or after the switch.
 * 
 * @method {(force?: boolean) => void} toggle - Toggles whether the checkbox is is checked or forces a checked state.
 *  
 * @event change {CustomEvent} - Dispatches when the switch's value changes.
 * 
 * @cssproperty --forge-theme-tertiary - The primary color of the checkbox.
 * @cssproperty --forge-theme-on-tertiary - The color of the checkmark and indeterminate mark.
 * @cssproperty --forge-checkbox-primary-color - The primary color of the checkbox.
 * @cssproperty --forge-checkbox-size - The inline and block size of the checkbox.
 * @cssproperty --forge-checkbox-border-width - The width of the checkbox border.
 * @cssproperty --forge-checkbox-state-layer-size - The inline and block size of the state layer.
 * @cssproperty --forge-checkbox-state-layer-dense-size - The inline and block size of the state layer when dense.
 * @cssproperty --forge-checkbox-background-color - The color of the checkbox background when unchecked and not indeterminate.
 * @cssproperty --forge-checkbox-width - The inline size of the checkbox.
 * @cssproperty --forge-checkbox-height - The block size of the checkbox.
 * @cssproperty --forge-checkbox-unchecked-border-width - The width of the checkbox border when unchecked and not indeterminate.
 * @cssproperty --forge-checkbox-unchecked-border-color - The color of the checkbox border when unchecked and not indeterminate.
 * @cssproperty --forge-checkbox-shape - The shape of the checkbox.
 * @cssproperty --forge-checkbox-elevation - The shadow of the checkbox.
 * @cssproperty --forge-checkbox-gap - The space between the checkbox and label.
 * @cssproperty --forge-checkbox-justify - How the checkbox and label are distributed along their main axis.
 * @cssproperty --forge-checkbox-direction - Whether the checkbox and label are arranged along the inline or block axis.
 * @cssproperty --forge-checkbox-checked-background-color - The color of the checkbox background when checked or indeterminate.
 * @cssproperty --forge-checkbox-checked-border-width - The width of the checkbox border when checked or indeterminate.
 * @cssproperty --forge-checkbox-checked-border-color - The color of the checkbox border when checked or indeterminate.
 * @cssproperty --forge-checkbox-icon-color - The color of the checkmark and indeterminate mark.
 * @cssproperty --forge-checkbox-icon-checked-color - The color of the checkmark mark.
 * @cssproperty --forge-checkbox-icon-indeterminate-color - The color of the indeterminate mark.
 * @cssproperty --forge-checkbox-icon-stroke-width - The stroke width of the checkmark and indeterminate marks.
 * @cssproperty --forge-checkbox-state-layer-width - The inline size of the state layer.
 * @cssproperty --forge-checkbox-state-layer-width - The inline size of the state layer.
 * @cssproperty --forge-checkbox-state-layer-height - The block size of the state layer.
 * @cssproperty --forge-checkbox-state-layer-checked-color - The color of the state layer when checked.
 * @cssproperty --forge-checkbox-state-layer-unchecked-color - The color of the state layer when unchecked.
 * @cssproperty --forge-checkbox-state-layer-shape - The shape of the state layer.
 * @cssproperty --forge-checkbox-state-layer-dense-width - The inline size of the state layer when dense.
 * @cssproperty --forge-checkbox-state-layer-dense-height - The block size of the state layer when dense.
 * @cssproperty --forge-checkbox-disabled-opacity - The opacity when disabled.
 * @cssproperty --forge-checkbox-animation-duration - The duration of animations.
 * @cssproperty --forge-checkbox-background-animation-timing - The timing function of the background animations.
 * @cssproperty --forge-checkbox-icon-animation-timing - The timing function of the checked and indeterminate icons animations.
 * 
 * @csspart checkbox - Styles the checkbox container element.
 * @csspart input-container - Styles the wrapper element of the input and checkbox background.
 * @csspart input - Styles the input element.
 * @csspart background - Styles the checkbox background element.
 * @csspart checkmark - Styles the checkmark element.
 * @csspart checkmark-path - Styles the checkmark path.
 * @csspart mixedmark - Styles the indeterminate mark element.
 * @csspart mixedmark-path - Styles the indeterminate mark path.
 * @csspart label - Styles the label element.
 * @csspart state-layer - Styles the state layer element.
 * @csspart focus-indicator - Styles the focus indicator element.
 */
@CustomElement({
  name: CHECKBOX_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent
  ]
})
export class CheckboxComponent extends BaseFormComponent implements ICheckboxComponent {
  public static get observedAttributes(): string[] {
    return [
      CHECKBOX_CONSTANTS.attributes.CHECKED,
      CHECKBOX_CONSTANTS.attributes.DEFAULT_CHECKED,
      CHECKBOX_CONSTANTS.attributes.INDETERMINATE,
      CHECKBOX_CONSTANTS.attributes.VALUE,
      CHECKBOX_CONSTANTS.attributes.DENSE,
      CHECKBOX_CONSTANTS.attributes.DISABLED,
      CHECKBOX_CONSTANTS.attributes.REQUIRED,
      CHECKBOX_CONSTANTS.attributes.READONLY,
      CHECKBOX_CONSTANTS.attributes.LABEL_POSITION
    ];
  }

  public get name(): string {
    return this.getAttribute('name') ?? '';
  }
  public set name(value: string) {
    toggleAttribute(this, !!value, 'name', value ?? '');
  }

  public get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  public get labels(): NodeList {
    return this.internals.labels;
  }

  public get validity(): ValidityState {
    this._foundation.syncValidity(this._hasCustomValidityError);
    return this.internals.validity;
  }

  public get validationMessage(): string {
    this._foundation.syncValidity(this._hasCustomValidityError);
    return this.internals.validationMessage;
  }

  public get willValidate(): boolean {
    return this.internals.willValidate;
  }

  public readonly internals: ElementInternals;
  private _foundation: CheckboxFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles, true);
    this.internals = this.attachInternals();
    this._foundation = new CheckboxFoundation(new CheckboxAdapter(this));
  }

  public async connectedCallback(): Promise<void> {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHECKBOX_CONSTANTS.attributes.CHECKED:
        this.checked = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.attributes.DEFAULT_CHECKED:
        this.defaultChecked = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.attributes.INDETERMINATE:
        this.indeterminate = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case CHECKBOX_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.attributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.attributes.LABEL_POSITION:
        this.labelPosition = newValue as CheckboxLabelPosition;
        break;
    }
  }

  public setFormValue(value: string | File | FormData | null, state?: string | File | FormData | null | undefined): void {
    this.internals.setFormValue(value, state);

    if (state) {
      const stateValue = isString(state) ? state : state[this.name];
      this.checked = stateValue === 'checked' || stateValue === 'checked-indeterminate';
      this.indeterminate = stateValue === 'unchecked-indeterminate' || stateValue === 'checked-indeterminate';
      return;
    }
    
    if (isString(value)) {
      this.checked = !!value;
    } else if (value?.[this.name]) {
      this.checked = !!value[this.name];
    } else {
      this.checked = false;
    }
  }

  public checkValidity(): boolean {
    this._foundation.syncValidity(this._hasCustomValidityError);
    return this.internals.checkValidity();
  }

  public reportValidity(): boolean {
    this._foundation.syncValidity(this._hasCustomValidityError);
    return this.internals.reportValidity();
  }

  public setCustomValidity(error: string): void {
    this._hasCustomValidityError = !!error;
    this._foundation.setValidity({ customError: !!error }, error);
  }

  public formResetCallback(): void {
    this.checked = this.defaultChecked;
  }

  public formStateRestoreCallback(state: CheckboxState, reason: 'restore' | 'autocomplete'): void {
    this.checked = state === 'checked' || state === 'checked-indeterminate';
    this.indeterminate = state === 'unchecked-indeterminate' || state === 'checked-indeterminate';
  }

  public formDisabledCallback(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @FoundationProperty()
  public declare checked: boolean;

  @FoundationProperty()
  public declare defaultChecked: boolean;

  @FoundationProperty()
  public declare indeterminate: boolean;

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
  public declare labelPosition: CheckboxLabelPosition;
  
  /**
   * Toggles the checkbox checked or unchecked.
   * @param force Whether to set the checkbox checked or unchecked.
   */
  public toggle(force?: boolean): void {
    if (isDefined(force)) {
      this._foundation.checked = force as boolean;
    } else {
      this._foundation.checked = !this._foundation.checked;
    }
  }
}
