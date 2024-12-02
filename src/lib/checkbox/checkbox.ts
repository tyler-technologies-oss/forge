import { attachShadowTemplate, coerceBoolean, customElement, coreProperty, isDefined, isString } from '@tylertech/forge-core';
import { getFormState, getFormValue, getValidationMessage, inputType, internals, setDefaultAria, setValidity } from '../constants';
import { BaseComponent, FormValue } from '../core';
import { IWithFocusable, WithFocusable } from '../core/mixins/focus/with-focusable';
import { IWithFormAssociation, WithFormAssociation } from '../core/mixins/form/with-form-associated';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { IWithLabelAwareness, WithLabelAwareness } from '../core/mixins/label/with-label-aware';
import { FocusIndicatorComponent } from '../focus-indicator/focus-indicator';
import { StateLayerComponent } from '../state-layer/state-layer';
import { CheckboxAdapter } from './checkbox-adapter';
import { CheckboxLabelPosition, CheckboxState, CHECKBOX_CONSTANTS } from './checkbox-constants';
import { CheckboxCore } from './checkbox-core';

import template from './checkbox.html';
import styles from './checkbox.scss';

export interface ICheckboxComponent extends IWithFormAssociation, IWithFocusable, IWithLabelAwareness, IWithElementInternals, IWithDefaultAria {
  value: string;
  checked: boolean;
  defaultChecked: boolean;
  indeterminate: boolean;
  required: boolean;
  dense: boolean;
  labelPosition: CheckboxLabelPosition;
  toggle(force?: boolean): void;
  setFormValue(value: FormValue | null, state?: FormValue | null | undefined): void;
  [setValidity](): void;
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
 * @event {Event} change - Dispatches when the checkbox is checked or unchecked.
 *
 * @cssproperty --forge-checkbox-background - The color of the checkbox background when unchecked and not indeterminate.
 * @cssproperty --forge-checkbox-width - The inline size of the checkbox.
 * @cssproperty --forge-checkbox-height - The block size of the checkbox.
 * @cssproperty --forge-checkbox-unchecked-border-width - The width of the checkbox border when unchecked and not indeterminate.
 * @cssproperty --forge-checkbox-unchecked-border-color - The color of the checkbox border when unchecked and not indeterminate.
 * @cssproperty --forge-checkbox-shape - The shape of the checkbox.
 * @cssproperty --forge-checkbox-elevation - The shadow of the checkbox.
 * @cssproperty --forge-checkbox-gap - The space between the checkbox and label.
 * @cssproperty --forge-checkbox-justify - How the checkbox and label are distributed along their main axis.
 * @cssproperty --forge-checkbox-direction - Whether the checkbox and label are arranged along the inline or block axis.
 * @cssproperty --forge-checkbox-checked-background - The color of the checkbox background when checked or indeterminate.
 * @cssproperty --forge-checkbox-checked-border-width - The width of the checkbox border when checked or indeterminate.
 * @cssproperty --forge-checkbox-checked-border-color - The color of the checkbox border when checked or indeterminate.
 * @cssproperty --forge-checkbox-icon-checked-color - The color of the checkmark mark.
 * @cssproperty --forge-checkbox-icon-indeterminate-color - The color of the indeterminate mark.
 * @cssproperty --forge-checkbox-icon-stroke-width - The stroke width of the checkmark and indeterminate marks.
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
 * @csspart root - Styles the root element.
 * @csspart background - Styles the checkbox background element.
 * @csspart checkmark - Styles the checkmark element.
 * @csspart mixedmark - Styles the indeterminate mark element.
 * @csspart label - Styles the label element.
 * @csspart state-layer - Styles the state layer element.
 * @csspart focus-indicator - Styles the focus indicator element.
 *
 * @cssfilepath checkbox/forge-checkbox.css
 *
 * @cssclass forge-checkbox - Apply to the root element _(required)_.
 * @cssclass forge-checkbox--dense - Makes the checkbox dense.
 * @cssclass forge-checkbox__icon - Apply to a child of the root element to render the check and indeterminate icons _(required)_.
 *
 * @role checkbox
 * @focusable
 * @formassociated
 *
 * @aria aria-checked - Indicates whether the checkbox is checked.
 * @aria aria-disabled - Indicates whether the checkbox is disabled.
 * @aria aria-required - Indicates whether the checkbox is required.
 *
 * @keycontrol space - Toggles the checkbox checked or unchecked.
 */
@customElement({
  name: CHECKBOX_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class CheckboxComponent
  extends WithFormAssociation(WithLabelAwareness(WithFocusable(WithDefaultAria(WithElementInternals(BaseComponent)))))
  implements ICheckboxComponent
{
  public static get observedAttributes(): string[] {
    return Object.values(CHECKBOX_CONSTANTS.observedAttributes);
  }

  private readonly _core: CheckboxCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this[inputType] = 'checkbox';
    this._core = new CheckboxCore(new CheckboxAdapter(this));
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this[setDefaultAria]({
      role: 'checkbox',
      ariaChecked: this.checked ? 'true' : 'false',
      ariaDisabled: this.disabled ? 'true' : 'false',
      ariaRequired: this.required ? 'true' : 'false'
    });
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHECKBOX_CONSTANTS.observedAttributes.CHECKED:
        this.checked = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.DEFAULT_CHECKED:
        this.defaultChecked = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.INDETERMINATE:
        this.indeterminate = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.VALUE:
        this.value = newValue;
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        break;
      case CHECKBOX_CONSTANTS.observedAttributes.LABEL_POSITION:
        this.labelPosition = newValue as CheckboxLabelPosition;
        break;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  public override [getFormValue](): FormValue | null {
    return this.checked ? this.value : null;
  }

  public override [getFormState](): CheckboxState {
    if (this.checked) {
      return this.indeterminate ? 'checked-indeterminate' : 'checked';
    }
    return this.indeterminate ? 'unchecked-indeterminate' : 'unchecked';
  }

  public [setValidity](): void {
    this[internals].setValidity(
      { valueMissing: this.required && !this.checked },
      this[getValidationMessage]({
        checked: this.checked,
        required: this.required
      })
    );
  }

  public formResetCallback(): void {
    this.checked = this.defaultChecked;
  }

  public formStateRestoreCallback(state: CheckboxState): void {
    this.checked = state === 'checked' || state === 'checked-indeterminate';
    this.indeterminate = state === 'unchecked-indeterminate' || state === 'checked-indeterminate';
  }

  public labelClickedCallback(): void {
    this.click();
    // TODO: use `{ focusVisble: false }` when supported.
    this.focus();
  }

  public labelChangedCallback(value: string | null): void {
    this[setDefaultAria]({ ariaLabel: value });
  }

  /** @ignore */
  public setFormValue(value: FormValue | null, state?: FormValue | null | undefined): void {
    this[internals].setFormValue(value, state);

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

  /**
   * Gets/sets whether the checkbox is checked.
   * @default false
   * @attribute checked
   */
  @coreProperty()
  public declare checked: boolean;

  /**
   * Gets/sets whether the checkbox is checked by default.
   * @default false
   * @attribute default-checked
   */
  @coreProperty()
  public declare defaultChecked: boolean;

  /**
   * Gets/sets the indeterminate state.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare indeterminate: boolean;

  /**
   * Controls the value submitted with a form when checked.
   * @default 'on'
   * @attribute
   */
  @coreProperty()
  public declare value: string;

  /**
   * Controls whether the checkbox is dense.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare dense: boolean;

  /**
   * Controls whether the checkbox is disabled.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare disabled: boolean;

  /**
   * Controls whether the checkbox is required.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare required: boolean;

  /**
   * Controls whether the checkbox is readonly.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare readonly: boolean;

  /**
   * Controls whether the label appears before or after the checkbox.
   * @default 'end'
   * @attribute label-position
   */
  @coreProperty()
  public declare labelPosition: CheckboxLabelPosition;

  /**
   * Toggles the checkbox checked or unchecked.
   * @param force Whether to set the checkbox checked or unchecked.
   */
  public toggle(force?: boolean): void {
    if (isDefined(force)) {
      this._core.checked = force as boolean;
    } else {
      this._core.checked = !this._core.checked;
    }
  }
}
