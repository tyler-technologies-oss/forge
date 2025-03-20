import { attachShadowTemplate, coerceBoolean, coreProperty, customElement } from '@tylertech/forge-core';
import { getFormState, getFormValue, inputType, setDefaultAria } from '../../constants';
import { BaseComponent } from '../../core/base/base-component';
import { IWithFormAssociation, WithFormAssociation } from '../../core/mixins/form/with-form-associated';
import { IWithFormValidity, WithFormValidity } from '../../core/mixins/form/with-form-validity';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { FormRestoreReason, FormRestoreState, FormValue } from '../../core/utils/form-utils';
import { ButtonToggleComponent } from '../button-toggle/button-toggle';
import { ButtonToggleGroupAdapter } from './button-toggle-group-adapter';
import { BUTTON_TOGGLE_GROUP_CONSTANTS, ButtonToggleGroupTheme, IButtonToggleGroupChangeEventData } from './button-toggle-group-constants';
import { ButtonToggleGroupCore } from './button-toggle-group-core';

import template from './button-toggle-group.html';
import styles from './button-toggle-group.scss';

export interface IButtonToggleGroupComponent extends IWithLabelAwareness, IWithFormAssociation, IWithFormValidity, IWithElementInternals, IWithDefaultAria {
  value: any;
  outlined: boolean;
  multiple: boolean;
  stretch: boolean;
  mandatory: boolean;
  vertical: boolean;
  disabled: boolean;
  readonly: boolean;
  dense: boolean;
  theme: ButtonToggleGroupTheme;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-toggle-group': IButtonToggleGroupComponent;
  }

  interface HTMLElementEventMap {
    'forge-button-toggle-group-change': CustomEvent<IButtonToggleGroupChangeEventData>;
  }
}

/**
 * @tag forge-button-toggle-group
 *
 * @description Button toggle groups allow users to select one or more options from a set of related options.
 *
 * @property {any} value - The value of the selected button toggle(s).
 * @property {boolean} [outlined=true] - Whether or not the group should be outlined.
 * @property {boolean} [multiple=false] - Whether or not the group should allow multiple selections.
 * @property {boolean} [stretch=false] - Whether or not the group should stretch to fill the available width.
 * @property {boolean} [mandatory=false] - Whether or not the group should require a selection once a button has been toggled on.
 * @property {boolean} [vertical=false] - Whether or not the group should be displayed vertically.
 * @property {boolean} [disabled=false] - Whether or not the group should be disabled.
 * @property {boolean} [readonly=false] - Whether or not the group should be readonly.
 * @property {boolean} [dense=false] - Whether or not the group should be dense.
 * @property {ButtonToggleGroupTheme} theme - The theme to use for the group.
 *
 * @attribute {any} value - The value of the selected button toggle(s).
 * @attribute {boolean} [outlined=false] - Whether or not the group should be outlined.
 * @attribute {boolean} [multiple=false] - Whether or not the group should allow multiple selections.
 * @attribute {boolean} [stretch=false] - Whether or not the group should stretch to fill the available width.
 * @attribute {boolean} [mandatory=false] - Whether or not the group should require a selection once a button has been toggled on.
 * @attribute {boolean} [vertical=false] - Whether or not the group should be displayed vertically.
 * @attribute {boolean} [disabled=false] - Whether or not the group should be disabled.
 * @attribute {boolean} [readonly=false] - Whether or not the group should be readonly.
 * @attribute {boolean} [dense=false] - Whether or not the group should be dense.
 * @attribute {ButtonToggleGroupTheme} theme - The theme to use for the group.
 *
 * @event {CustomEvent<IButtonToggleGroupChangeEventData>} forge-button-toggle-group-change - Dispatches when the value of the group changes.
 *
 * @cssproperty --forge-button-toggle-group-display - The `display` of the group container elements.
 * @cssproperty --forge-button-toggle-group-gap - The space between button toggle elements.
 * @cssproperty --forge-button-toggle-group-padding - The padding around the button toggle elements when outlined.
 * @cssproperty --forge-button-toggle-group-padding-block - The block padding around the button toggle elements when outlined.
 * @cssproperty --forge-button-toggle-group-padding-inline - The inline padding around the button toggle elements when outlined.
 * @cssproperty --forge-button-toggle-group-height - The height of the group element.
 * @cssproperty --forge-button-toggle-group-dense-height - The height of the group element when dense.
 * @cssproperty --forge-button-toggle-group-outline-width - The width of the outline around the group element.
 * @cssproperty --forge-button-toggle-group-outline-style - The style of the outline around the group element.
 * @cssproperty --forge-button-toggle-group-outline-color - The color of the outline around the group element.
 * @cssproperty --forge-button-toggle-group-outline-color-active - The color of the outline around the group element when hovered or focused.
 * @cssproperty --forge-button-toggle-group-shape - The shape radius of the group container element.
 * @cssproperty --forge-button-toggle-group-shape-start-start - The start-start shape radius.
 * @cssproperty --forge-button-toggle-group-shape-start-end - The start-end shape radius.
 * @cssproperty --forge-button-toggle-group-shape-end-start - The end-start shape radius.
 * @cssproperty --forge-button-toggle-group-shape-end-end - The end-end shape radius.
 * @cssproperty --forge-button-toggle-group-transition-duration - The transition duration for all animations on the group.
 * @cssproperty --forge-button-toggle-group-transition-timing - The transition timing for all animations on the group.
 *
 * @csspart root - The root container element for the group.
 *
 * @slot - The is a default/unnamed slot for child button toggle elements.
 */
@customElement({
  name: BUTTON_TOGGLE_GROUP_CONSTANTS.elementName,
  dependencies: [ButtonToggleComponent]
})
export class ButtonToggleGroupComponent
  extends WithLabelAwareness(WithFormAssociation(WithFormValidity(WithDefaultAria(WithElementInternals(BaseComponent)))))
  implements IButtonToggleGroupComponent
{
  public static get observedAttributes(): string[] {
    return Object.values(BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes);
  }

  private _core: ButtonToggleGroupCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ButtonToggleGroupCore(new ButtonToggleGroupAdapter(this));
    this[inputType] = 'radio'; // Used for form validity message to match radio button
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this[setDefaultAria]({ role: 'group' }, { setAttribute: !this.hasAttribute('role') });
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.VALUE:
        this.value = newValue;
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.NO_OUTLINE:
        this.outlined = !coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.MULTIPLE:
        this.multiple = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.MANDATORY:
        this.mandatory = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.STRETCH:
        this.stretch = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as ButtonToggleGroupTheme;
        break;
    }
  }

  public override [getFormValue](): FormValue | null {
    const hasValue = Array.isArray(this.value) ? this.value.length > 0 : !!this.value;
    let data: FormData | null = null;
    if (hasValue) {
      const value = Array.isArray(this.value) ? this.value : [this.value];
      if (value.length) {
        data = new FormData();
        value.forEach(v => data?.append(this.name, v));
      }
    }
    return data;
  }

  public [getFormState](): FormValue | null {
    const state = new FormData();
    const value = Array.isArray(this.value) ? this.value : this.value != null ? [this.value] : [];

    state.append('multiple', String(this.multiple));
    value.forEach(v => state.append('value', v));

    return state;
  }

  public formStateRestoreCallback(state: FormRestoreState, reason: FormRestoreReason): void {
    if (reason === 'restore' && state instanceof FormData) {
      const multiple = state.get('multiple') === 'true';
      const value = state.getAll('value');

      if (multiple) {
        this.multiple = multiple;
        this.value = value;
        return;
      }

      this.value = value[0] ?? null;
    }
  }

  public formResetCallback(): void {
    this.value = this.getAttribute('value');
  }

  public labelChangedCallback(value: string | null): void {
    this[setDefaultAria]({ ariaLabel: value ?? undefined });
  }

  @coreProperty()
  declare public value: any;

  @coreProperty()
  declare public outlined: boolean;

  @coreProperty()
  declare public multiple: boolean;

  @coreProperty()
  declare public mandatory: boolean;

  @coreProperty()
  declare public vertical: boolean;

  @coreProperty()
  declare public stretch: boolean;

  @coreProperty()
  declare public dense: boolean;

  @coreProperty()
  declare public disabled: boolean;

  @coreProperty()
  declare public required: boolean;

  @coreProperty()
  declare public readonly: boolean;

  @coreProperty()
  declare public theme: ButtonToggleGroupTheme;
}
