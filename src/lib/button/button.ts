import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { IconComponent } from '../icon';
import { FocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';
import { BaseButton, IBaseButton } from './base/base-button';
import { ButtonAdapter } from './button-adapter';
import { ButtonTheme, ButtonVariant, BUTTON_CONSTANTS } from './button-constants';
import { ButtonCore } from './button-core';
import { BASE_BUTTON_CONSTANTS } from './base/base-button-constants';

import template from './button.html';
import styles from './button.scss';

export interface IButtonComponent extends IBaseButton {
  variant: ButtonVariant;
  pill: boolean;
  theme: ButtonTheme;
  fullWidth: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': IButtonComponent;
  }
}

/**
 * @tag forge-button
 *
 * @summary Buttons represent actions that a user can take.
 *
 * @description
 * Buttons are used when a user needs to take an action, such as submitting a form or opening a dialog.
 * Buttons can be used to trigger an action or to navigate to a new location. Buttons can be styled with
 * a variety of themes and variants.
 *
 * @dependency forge-icon
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @property {string} [type="button"] - The type of button. Valid values are `button`, `submit`, and `reset`.
 * @property {ButtonVariant} [variant="text"] - The variant of the button.
 * @property {boolean} [fullWidth=false] - Whether or not the button is full-width.
 * @property {boolean} [disabled=false] - Whether or not the button is disabled.
 * @property {boolean} [popoverIcon=false] - Whether or not the button shows a built-in popover icon.
 * @property {string} name - The name of the button.
 * @property {string} value - The form value of the button.
 * @property {boolean} [dense=false] - Whether or not the button is dense.
 * @property {HTMLFormElement | null} form - The form reference of the button if within a `<form>` element.
 * @property {boolean} [pill=false] - Whether or not the button is pill-shaped.
 * @property {ButtonTheme} [theme="primary"] - The theme of the button. Defaults to `primary`.
 *
 * @globalconfig variant
 * @globalconfig dense
 *
 * @attribute {string} [type="button"] - The type of button. Valid values are `button`, `submit`, and `reset`.
 * @attribute {ButtonVariant} [variant="text"] - The variant of the button.
 * @attribute {boolean} [full-width=false] - Whether or not the button is full-width.
 * @attribute {boolean} [disabled=false] - Whether or not the button is disabled.
 * @attribute {boolean} [popover-icon=false] - Whether or not the button shows a built-in popover icon.
 * @attribute {string} name - The name of the button.
 * @attribute {string} value - The form value of the button.
 * @attribute {boolean} [dense=false] - Whether or not the button is dense.
 * @attribute {boolean} [pill=false] - Whether or not the button is pill-shaped.
 * @attribute {ButtonTheme} [theme="primary"] - The theme of the button. Defaults to `primary`.
 *
 * @event {PointerEvent} click - Fires when the button is clicked.
 *
 * @cssproperty --forge-button-primary-color - The primary color of the button.
 * @cssproperty --forge-button-text-color - The text color of the button. Inherits from primary color.
 * @cssproperty --forge-button-disabled-color - The disabled color of the button.
 * @cssproperty --forge-button-padding - The padding of the button.
 * @cssproperty --forge-button-display - The display of the button.
 * @cssproperty --forge-button-justify - The flex justify of the button.
 * @cssproperty --forge-button-shape - The shape of the button.
 * @cssproperty --forge-button-height - The height of the button.
 * @cssproperty --forge-button-min-width - The min-width of the button.
 * @cssproperty --forge-button-spacing - The spacing of the button.
 * @cssproperty --forge-button-border-width - The border-width of the button.
 * @cssproperty --forge-button-border-style - The border style of the button.
 * @cssproperty --forge-button-border-color - The border color of the button.
 * @cssproperty --forge-button-shape-start-start-radius - The shape start start radius of the button.
 * @cssproperty --forge-button-shape-start-end-radius - The shape start end radius of the button.
 * @cssproperty --forge-button-shape-end-start-radius - The shape end start radius of the button.
 * @cssproperty --forge-button-shape-end-end-radius - The shape end end radius of the button.
 * @cssproperty --forge-button-padding-block - The padding block of the button.
 * @cssproperty --forge-button-padding-inline - The padding inline of the button.
 * @cssproperty --forge-button-background - The background color of the button.
 * @cssproperty --forge-button-hover-background - The background color of the button on hover.
 * @cssproperty --forge-button-active-background - The background color of the button on active state.
 * @cssproperty --forge-button-color - The text color of the button.
 * @cssproperty --forge-button-icon-size - The size of the icon in the button.
 * @cssproperty --forge-button-shadow - The shadow of the button.
 * @cssproperty --forge-button-hover-shadow - The shadow of the button on hover.
 * @cssproperty --forge-button-active-shadow - The shadow of the button on active state.
 * @cssproperty --forge-button-cursor - The cursor type of the button.
 * @cssproperty --forge-button-raised-background - The background color of the raised button.
 * @cssproperty --forge-button-raised-disabled-background - The background color of the disabled raised button.
 * @cssproperty --forge-button-raised-color - The text color of the raised button.
 * @cssproperty --forge-button-raised-disabled-color - The text color of the disabled raised button.
 * @cssproperty --forge-button-raised-shadow - The shadow of the raised button.
 * @cssproperty --forge-button-raised-hover-shadow - The shadow of the raised button on hover.
 * @cssproperty --forge-button-raised-active-shadow - The shadow of the raised button on active state.
 * @cssproperty --forge-button-raised-disabled-shadow - The shadow of the disabled raised button.
 * @cssproperty --forge-button-raised-transition-duration - The transition duration of the raised button.
 * @cssproperty --forge-button-raised-transition-timing - The transition timing of the raised button.
 * @cssproperty --forge-button-flat-background - The background color of the flat button.
 * @cssproperty --forge-button-flat-disabled-background - The background color of the disabled flat button.
 * @cssproperty --forge-button-flat-color - The text color of the flat button.
 * @cssproperty --forge-button-flat-disabled-color - The text color of the disabled flat button.
 * @cssproperty --forge-button-outlined-background - The background color of the outlined button.
 * @cssproperty --forge-button-outlined-color - The text color of the outlined button.
 * @cssproperty --forge-button-outlined-border-width - The border width of the outlined button.
 * @cssproperty --forge-button-outlined-border-style - The border style of the outlined button.
 * @cssproperty --forge-button-outlined-border-color - The border color of the outlined button.
 * @cssproperty --forge-button-link-color - The text color of the link button.
 * @cssproperty --forge-button-link-text-decoration - The text decoration of the link button.
 * @cssproperty --forge-button-link-height - The height of the link button.
 * @cssproperty --forge-button-link-padding - The padding of the link button.
 * @cssproperty --forge-button-link-line-height - The line height of the link button.
 * @cssproperty --forge-button-link-width - The width of the link button.
 * @cssproperty --forge-button-link-hover-text-decoration - The text decoration of the link button on hover.
 * @cssproperty --forge-button-link-active-opacity - The opacity of the link button on active state.
 * @cssproperty --forge-button-link-transition-duration - The transition duration of the link button.
 * @cssproperty --forge-button-link-transition-timing - The transition timing of the link button.
 * @cssproperty --forge-button-disabled-cursor - The cursor type of the disabled button.
 * @cssproperty --forge-button-disabled-text-color - The text color of the disabled button.
 * @cssproperty --forge-button-disabled-background - The background color of the disabled button.
 * @cssproperty --forge-button-disabled-border-color - The border color of the disabled button.
 * @cssproperty --forge-button-disabled-shadow - The shadow of the disabled button.
 * @cssproperty --forge-button-dense-height - The height of the dense button.
 * @cssproperty --forge-button-pill-shape - The shape of the pill button.
 * @cssproperty --forge-button-pill-padding-inline - The inline padding of the pill button.
 *
 * @csspart root - The root container element.
 * @csspart focus-indicator - The focus-indicator indicator element.
 * @csspart state-layer - The state-layer surface element.
 *
 * @slot - This is a default/unnamed slot for the label text.
 * @slot start - Elements to logically render before the label text.
 * @slot end - Elements to logically render after the label text.
 */
@customElement({
  name: BUTTON_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent, IconComponent]
})
export class ButtonComponent extends BaseButton<ButtonCore> implements IButtonComponent {
  public static get observedAttributes(): string[] {
    return [...Object.values(BASE_BUTTON_CONSTANTS.observedAttributes), ...Object.values(BUTTON_CONSTANTS.observedAttributes)];
  }

  protected readonly _core: ButtonCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ButtonCore(new ButtonAdapter(this));
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_CONSTANTS.observedAttributes.VARIANT:
        this.variant = newValue as ButtonVariant;
        return;
      case BUTTON_CONSTANTS.observedAttributes.PILL:
        this.pill = coerceBoolean(newValue);
        return;
      case BUTTON_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as ButtonTheme;
        return;
      case BUTTON_CONSTANTS.observedAttributes.FULL_WIDTH:
        this.fullWidth = coerceBoolean(newValue);
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @coreProperty()
  public declare variant: ButtonVariant;

  @coreProperty()
  public declare pill: boolean;

  @coreProperty()
  public declare theme: ButtonTheme;

  @coreProperty()
  public declare fullWidth: boolean;
}
