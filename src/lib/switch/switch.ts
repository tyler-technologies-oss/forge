import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean, isDefined, isString, toggleAttribute } from '@tylertech/forge-core';

import { BaseFormComponent, IBaseFormComponent } from '../core/base/base-component';
import { FocusIndicatorComponent } from '../focus-indicator/focus-indicator';
import { StateLayerComponent } from '../state-layer/state-layer';
import { SwitchAdapter } from './switch-adapter';
import { SWITCH_CONSTANTS, SwitchIconVisibility, SwitchLabelPosition } from './switch-constants';
import { SwitchFoundation } from './switch-foundation';

import template from './switch.html';
import styles from './switch.scss';

export interface ISwitchComponent extends IBaseFormComponent {
  on: boolean;
  /**
   * @deprecated use `on` instead
   */
  selected: boolean;
  dense: boolean;
  icon: SwitchIconVisibility;
  labelPosition: SwitchLabelPosition;
  toggle(force?: boolean): void;
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
 * @property {boolean} on - Whether the switch is on the on or off state.
 * @property {boolean} selected - Deprecated. Alias for `on`.
 * @property {boolean} disabled - Controls if the switch is disabled.
 * @property {boolean} required = Controls if the switch is required.
 * @property {boolean} dense - The density state.
 * @property {SwitchIconVisibility} icon - Controls the presence of the off and on icons.
 * @property {SwitchLabelPosition} labelPosition - Whether the label appears before or after the switch.
 * 
 * @attribute {string} on - Controls whether the switch is in the on or off state.
 * @attribute {string} selected - Alias for `on`.
 * @attribute {string} disabled - Controls if the switch is disabled.
 * @attribute {string} required - Controls if the switch is required.
 * @attribute {string} dense - Sets the density state.
 * @attribute {string} icon - Controls the presence of the off and on icons.
 * @attribute {string} label-position - Sets whether the label appears before or after the switch.
 * 
 * @method {(force?: boolean) => void} toggle - Toggles whether the switch is selected or forces a selected state.
 *  
 * @event {CustomEvent} forge-switch-change - Dispatches when the switch's value changes.
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
 * @cssproperty --forge-switch-icon-on-size - The size of the handle icon in the switch's on state.
 * @cssproperty --forge-switch-icon-off-size - The size of the handle icon in the switch's off state.
 * @cssproperty --forge-switch-icon-scale - The scale transformation applied to the handle icons.
 * @cssproperty --forge-switch-icon-active-scale - The scale transformation applied to the handle icons when the switch is active (pressed).
 * @cssproperty --forge-switch-icon-on-scale - The scale transformation applied to the handle icons in the switch's on state.
 * @cssproperty --forge-switch-icon-off-scale - The scale transformation applied to the handle icons in the switch's off state.
 * @cssproperty --forge-switch-icon-active-on-scale - The scale transformation applied to the handle icons when the switch is active (pressed) in its on state.
 * @cssproperty --forge-switch-icon-active-off-scale - The scale transformation applied to the handle icons when the switch is active (pressed) in its off state.
 * @cssproperty --forge-switch-gap - The space between the switch and label.
 * @cssproperty --forge-switch-justify - How the switch and label are distributed along their main axis.
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
 * @csspart input-container - Styles the wrapper element of the input, track and handle.
 * @csspart input - Styles the input element.
 * @csspart track - Styles the track element.
 * @csspart handle - Styles the handle element.
 * @csspart icon-on - Styles the on icon element.
 * @csspart icon-off - Styles the off icon element.
 * @csspart icon-on-path - Styles the default on icon path.
 * @csspart icon-off-path - Styles the default off icon path.
 * @csspart label - Styles the label element.
 * @csspart state-layer - Styles the state layer element.
 * @csspart focus-indicator - Styles the focus indicator element.
 */
@CustomElement({
  name: SWITCH_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent
  ]
})
export class SwitchComponent extends BaseFormComponent implements ISwitchComponent {
  public static get observedAttributes(): string[] {
    return [
      SWITCH_CONSTANTS.attributes.ON,
      SWITCH_CONSTANTS.attributes.SELECTED,
      SWITCH_CONSTANTS.attributes.DISABLED,
      SWITCH_CONSTANTS.attributes.REQUIRED,
      SWITCH_CONSTANTS.attributes.DENSE,
      SWITCH_CONSTANTS.attributes.ICON,
      SWITCH_CONSTANTS.attributes.LABEL_POSITION
    ];
  }

  public static formAssociated = true;

  public get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  public get labels(): NodeList {
    return this.internals.labels;
  }

  public get name(): string {
    return this.getAttribute('name') ?? '';
  }
  public set name(value: string) {
    toggleAttribute(this, !!value, 'name', value ?? '');
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

  // Needed for Safari, see https://bugs.webkit.org/show_bug.cgi?id=261432
  // Replace with this.internals.validity.customError when resolved.
  private _hasCustomValidityError = false;

  public readonly internals: ElementInternals;
  private readonly _foundation: SwitchFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles, true);
    this.internals = this.attachInternals();
    this._foundation = new SwitchFoundation(new SwitchAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SWITCH_CONSTANTS.attributes.ON:
        this.on = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case SWITCH_CONSTANTS.attributes.ICON:
        this.icon = newValue as SwitchIconVisibility;
        break;
      case SWITCH_CONSTANTS.attributes.LABEL_POSITION:
        this.labelPosition = newValue as SwitchLabelPosition;
        break;
    }
  }

  public setFormValue(value: string | File | FormData | null, state?: string | File | FormData | null | undefined): void {
    this.internals.setFormValue(value, state);
    if (isString(value)) {
      this.on = coerceBoolean(value);
    } else if (value?.[this.name]) {
      this.on = coerceBoolean(value[this.name]);
    } else {
      this.on = false;
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
    this.on = false;
  }

  public formStateRestoreCallback(state: string): void {
    this.on = coerceBoolean(state);
  }

  public formDisabledCallback(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @FoundationProperty()
  public declare on: boolean;

  @FoundationProperty({ name: 'on' })
  public declare selected: boolean;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare required: boolean;

  @FoundationProperty()
  public declare icon: SwitchIconVisibility;

  @FoundationProperty()
  public declare labelPosition: SwitchLabelPosition;

  /**
   * Toggles the switch on or off.
   * @param force Whether to set the switch on or off.
   */
  public toggle(force?: boolean): void {
    if (isDefined(force)) {
      this._foundation.on = force as boolean;
    } else {
      this._foundation.on = !this._foundation.on;
    }
  }
}
