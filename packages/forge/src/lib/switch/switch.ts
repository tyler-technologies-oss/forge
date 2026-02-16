import { attachShadowTemplate, coerceBoolean, customElement, coreProperty, isDefined, isString } from '@tylertech/forge-core';
import { getFormState, getFormValue, getValidationMessage, inputType, internals, setDefaultAria, setValidity } from '../constants.js';
import { BaseComponent, FormValue } from '../core/index.js';
import { IWithFocusable, WithFocusable } from '../core/mixins/focus/with-focusable.js';
import { IWithFormAssociation, WithFormAssociation } from '../core/mixins/form/with-form-associated.js';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria.js';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals.js';
import { IWithLabelAwareness, WithLabelAwareness } from '../core/mixins/label/with-label-aware.js';
import { FocusIndicatorComponent } from '../focus-indicator/focus-indicator.js';
import { StateLayerComponent } from '../state-layer/state-layer.js';
import { SwitchAdapter } from './switch-adapter.js';
import { SwitchIconVisibility, SwitchLabelPosition, SWITCH_CONSTANTS } from './switch-constants.js';
import { SwitchCore } from './switch-core.js';

import template from './switch.html';
import styles from './switch.scss';

export interface ISwitchComponent extends IWithFormAssociation, IWithFocusable, IWithLabelAwareness, IWithElementInternals, IWithDefaultAria {
  value: string;
  checked: boolean;
  /** @deprecated use `checked` instead */
  on: boolean;
  /** @deprecated use `checked` instead */
  selected: boolean;
  defaultChecked: boolean;
  /** @deprecated use `defaultChecked` instead */
  defaultOn: boolean;
  required: boolean;
  dense: boolean;
  icon: SwitchIconVisibility;
  labelPosition: SwitchLabelPosition;
  toggle(force?: boolean): void;
  setFormValue(value: FormValue | null, state?: FormValue | null | undefined): void;
  [setValidity](): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-switch': ISwitchComponent;
  }

  interface HTMLElementEventMap {
    'forge-switch-change': CustomEvent<boolean>;
  }
}

/**
 * @tag forge-switch
 *
 * @summary Switches toggle the state of a single setting on or off.
 *
 * @description
 * Use switches to:
 * - Toggle a single item on or off, on mobile and tablet
 * - Immediately activate or deactivate something
 *
 * @event {Event} change - Dispatches when the switch's value changes.
 * @event {CustomEvent<boolean>} forge-switch-change - Dispatches when the switch's value changes.
 *
 * @cssproperty --forge-theme-primary - The primary color of the switch.
 * @cssproperty --forge-theme-on-primary - The color of elements placed on top of the primary color (the handle icons for example).
 * @cssproperty --forge-switch-handle-on-color - The color of the handle in the switch's on state.
 * @cssproperty --forge-switch-handle-off-color - The color of the handle in the switch's off state.
 * @cssproperty --forge-switch-handle-active-on-color - The color of the handle when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-handle-active-off-color - The color of the handle when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-handle-size - The inline and block size of the handle.
 * @cssproperty --forge-switch-handle-width - The inline size of the handle.
 * @cssproperty --forge-switch-handle-height - The block size of the handle.
 * @cssproperty --forge-switch-handle-scale - The scale transformation applied to the handle.
 * @cssproperty --forge-switch-handle-on-scale - The scale transformation applied to the handle in the switch's on state.
 * @cssproperty --forge-switch-handle-off-scale - The scale transformation applied to the handle in the switch's off state.
 * @cssproperty --forge-switch-handle-active-scale - The scale transformation applied to the handle when the switch is active (pressed).
 * @cssproperty --forge-switch-handle-active-on-scale - The scale transformation applied to the handle when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-handle-active-off-scale - The scale transformation applied to the handle when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-handle-shape - The shape of the handle.
 * @cssproperty --forge-switch-handle-elevation - The handle's shadow.
 * @cssproperty --forge-switch-handle-on-elevation - The handle's shadow in the switch's on state.
 * @cssproperty --forge-switch-handle-off-elevation - The handle's shadow in the switch's off state.
 * @cssproperty --forge-switch-handle-active-elevation - The handle's shadow when the switch is active (pressed).
 * @cssproperty --forge-switch-handle-active-on-elevation - The handle's shadow when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-handle-active-off-elevation - The handle's shadow when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-track-on-color - The color of the track in the switch's on state.
 * @cssproperty --forge-switch-track-off-color - The color fo the track in the switch's off state.
 * @cssproperty --forge-switch-track-active-on-color - The color of the track when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-track-active-off-color - The color fo the track when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-track-width - The inline size of the track.
 * @cssproperty --forge-switch-track-height - The block size of the track.
 * @cssproperty --forge-switch-track-shape - The shape of the track.
 * @cssproperty --forge-switch-track-border-width - The width of the track border.
 * @cssproperty --forge-switch-track-on-border-width - The width of the track border in the switch's on state.
 * @cssproperty --forge-switch-track-off-border-width - The width of the track border in the switch's off state.
 * @cssproperty --forge-switch-track-active-on-border-width - The width of the track border when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-track-active-off-border-width - The width of the track border when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-track-border-color - The color of the track border.
 * @cssproperty --forge-switch-track-on-border-color - The color of the track border in the switch's on state.
 * @cssproperty --forge-switch-track-off-border-color - The color of the track border in the switch's off state.
 * @cssproperty --forge-switch-track-active-on-border-color - The color of the track border when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-track-active-off-border-color - The color of the track border when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-icon-color - The color of the handle icons.
 * @cssproperty --forge-switch-icon-on-color - The color of the handle icon in the switch's on state.
 * @cssproperty --forge-switch-icon-off-color - The color of the handle icon in the switch's off state.
 * @cssproperty --forge-switch-icon-active-on-color - The color of the handle icon when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-icon-active-off-color - The color of the handle icon when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-icon-size - The size of the handle icon.
 * @cssproperty --forge-switch-icon-on-size - The size of the handle icon in the switch's on state.
 * @cssproperty --forge-switch-icon-off-size - The size of the handle icon in the switch's off state.
 * @cssproperty --forge-switch-icon-scale - The scale transformation applied to the handle icons.
 * @cssproperty --forge-switch-icon-on-scale - The scale transformation applied to the handle icons in the switch's on state.
 * @cssproperty --forge-switch-icon-off-scale - The scale transformation applied to the handle icons in the switch's off state.
 * @cssproperty --forge-switch-icon-active-on-scale - The scale transformation applied to the handle icons when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-icon-active-off-scale - The scale transformation applied to the handle icons when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-gap - The space between the switch and label.
 * @cssproperty --forge-switch-justify - How the switch and label are distributed along their main axis.
 * @cssproperty --forge-switch-align - How the switch and label are distributed along their cross axis.
 * @cssproperty --forge-switch-direction - Whether the switch and label are arranged along the inline or block axis.
 * @cssproperty --forge-switch-state-layer-size - The inline and block size of the handle's state layer.
 * @cssproperty --forge-switch-state-layer-width - The inline size of the handle's state layer.
 * @cssproperty --forge-switch-state-layer-height - The block size of the handle's state layer.
 * @cssproperty --forge-switch-state-layer-on-color - The color of the handle's state layer when the switch is in its on state.
 * @cssproperty --forge-switch-state-layer-off-color - The color of the handle's state layer when the switch is in its off state.
 * @cssproperty --forge-switch-state-layer-dense-size - The inline and block size of the handle's state layer when the dense switch is used.
 * @cssproperty --forge-switch-state-layer-dense-width - The inline size of the handle's state layer when the dense switch is used.
 * @cssproperty --forge-switch-state-layer-dense-height - The block size of the handle's state layer when the dense switch is used.
 * @cssproperty --forge-switch-disabled-opacity - The opacity of the switch when disabled.
 * @cssproperty --forge-switch-animation-duration - The duration of animations.
 * @cssproperty --forge-switch-animation-timing - The timing function used in most animations.
 * @cssproperty --forge-switch-active-animation-timing - The timing function used in active state animations.
 *
 * @csspart switch - Styles the switch container element.
 * @csspart track - Styles the track element.
 * @csspart handle - Styles the handle element.
 * @csspart icon-on - Styles the on icon element.
 * @csspart icon-off - Styles the off icon element.
 * @csspart label - Styles the label element.
 * @csspart state-layer - Styles the state layer root element.
 * @csspart focus-indicator - Styles the focus indicator root element.
 *
 * @cssclass forge-switch - Apply to the root element _(required)_.
 * @cssclass forge-switch--dense - Makes the switch dense.
 * @cssclass forge-switch__thumb - Apply to a child of the root element to render the thumb _(required)_.
 * @cssclass forge-switch__icon - Apply to one or more children of the thumb element to style them as icons.
 * @cssclass forge-switch__icon--on - Apply to the the icon representing the switch's "on" state. It will be hidden when the switch is off.
 * @cssclass forge-switch__icon--off - Apply to the the icon representing the switch's "off" state. It will be hidden when the switch is on.
 */
@customElement({
  name: SWITCH_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class SwitchComponent
  extends WithFormAssociation(WithLabelAwareness(WithFocusable(WithDefaultAria(WithElementInternals(BaseComponent)))))
  implements ISwitchComponent
{
  public static get observedAttributes(): string[] {
    return Object.values(SWITCH_CONSTANTS.observedAttributes);
  }

  private readonly _core: SwitchCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this[inputType] = 'checkbox';
    this._core = new SwitchCore(new SwitchAdapter(this));
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this[setDefaultAria]({
      role: 'switch',
      ariaChecked: this.checked ? 'true' : 'false',
      ariaDisabled: this.disabled ? 'true' : 'false',
      ariaRequired: this.required ? 'true' : 'false'
    });
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SWITCH_CONSTANTS.observedAttributes.CHECKED:
      case SWITCH_CONSTANTS.observedAttributes.ON:
      case SWITCH_CONSTANTS.observedAttributes.SELECTED:
        this.checked = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.observedAttributes.DEFAULT_CHECKED:
      case SWITCH_CONSTANTS.observedAttributes.DEFAULT_ON:
        this.defaultChecked = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.observedAttributes.VALUE:
        this.value = newValue;
        break;
      case SWITCH_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.observedAttributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.observedAttributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.observedAttributes.ICON:
        this.icon = newValue as SwitchIconVisibility;
        break;
      case SWITCH_CONSTANTS.observedAttributes.LABEL_POSITION:
        this.labelPosition = newValue as SwitchLabelPosition;
        break;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  public override [getFormValue](): FormValue | null {
    return this.checked ? this.value : null;
  }

  public override [getFormState](): string {
    return this.checked ? SWITCH_CONSTANTS.state.ON : SWITCH_CONSTANTS.state.OFF;
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

  public formStateRestoreCallback(state: string): void {
    this.checked = state === SWITCH_CONSTANTS.state.ON;
  }

  public labelClickedCallback(): void {
    this.click();
    // TODO: use `{ focusVisible: false }` when supported.
    this.focus();
  }

  public labelChangedCallback(value: string | null): void {
    this[setDefaultAria]({ ariaLabel: value });
  }

  /** @ignore */
  public setFormValue(value: (FormValue & { [key: string]: any }) | null, state?: (FormValue & { [key: string]: any }) | null | undefined): void {
    this[internals].setFormValue(value, state);

    if (state) {
      const stateValue = isString(state) ? state : state[this.name];
      this.checked = stateValue === SWITCH_CONSTANTS.state.ON;
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
   * Gets/sets whether the switch is checked or not.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public checked: boolean;

  /**
   * Alias for `checked` _(deprecated)_. Gets/sets whether the switch is checked or not.
   * @deprecated use `checked` instead.
   * @default false
   * @attribute
   */
  @coreProperty({ name: 'checked' })
  declare public on: boolean;

  /**
   * Alias for `checked` _(deprecated)_.
   * @deprecated use `checked` instead
   * @default false
   * @attribute
   */
  @coreProperty({ name: 'checked' })
  declare public selected: boolean;

  /**
   * Gets/sets whether the switch is checked by default.
   * @default false
   * @attribute default-checked
   */
  @coreProperty()
  declare public defaultChecked: boolean;

  /**
   * Alias for `defaultChecked` _(deprecated)_. Gets/sets whether the switch is checked by default.
   * @default false
   * @attribute default-on
   */
  @coreProperty({ name: 'defaultChecked' })
  declare public defaultOn: boolean;

  /**
   * Gets/sets the value of the switch.
   * @default 'on'
   * @attribute
   */
  @coreProperty()
  declare public value: string;

  /**
   * Controls whether the switch is dense.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public dense: boolean;

  /**
   * Controls whether the switch is disabled.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public disabled: boolean;

  /**
   * Controls whether the switch is required.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public required: boolean;

  /**
   * Controls whether the switch is readonly.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public readonly: boolean;

  /**
   * Controls the presence of the off and on icons.
   * @default 'both'
   * @attribute
   */
  @coreProperty()
  declare public icon: SwitchIconVisibility;

  /**
   * Controls whether the label appears before or after the switch.
   * @default 'end'
   * @attribute label-position
   */
  @coreProperty()
  declare public labelPosition: SwitchLabelPosition;

  /**
   * Toggles the switch on or off.
   * @param force Whether to set the switch on or off.
   */
  public toggle(force?: boolean): void {
    if (isDefined(force)) {
      this._core.checked = force as boolean;
    } else {
      this._core.checked = !this._core.checked;
    }
  }
}
