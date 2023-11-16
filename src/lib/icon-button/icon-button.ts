import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { IconComponent } from '../icon';
import { BaseButton, IBaseButton } from '../button/base/base-button';
import { BASE_BUTTON_CONSTANTS } from '../button/base/base-button-constants';
import { FocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';
import { IconButtonDensity, IconButtonShape, IconButtonTheme, IconButtonVariant, ICON_BUTTON_CONSTANTS } from './icon-button-constants';
import { IconButtonFoundation } from './icon-button-foundation';
import { IconButtonAdapter } from './icon-button-adapter';

import template from './icon-button.html';
import styles from './icon-button.scss';

export interface IIconButtonComponent extends IBaseButton {
  toggle: boolean;
  on: boolean;
  variant: IconButtonVariant;
  theme: IconButtonTheme;
  shape: IconButtonShape;
  density: IconButtonDensity;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon-button': IIconButtonComponent;
  }

  interface HTMLElementEventMap {
    'forge-icon-button-toggle': CustomEvent<boolean>;
  }
}

/**
 * @tag forge-icon-button
 * 
 * @summary Icons buttons are used to trigger an action or event.
 * 
 * @property {boolean} toggle - Whether or not the icon button can be toggled.
 * @property {boolean} on - Whether or not the button is on. Only applies when `toggle` is `true`.
 * @property {IconButtonVariant} variant - The variant of the button. Valid values are `text`, `outlined`, `filled`, and `raised`.
 * @property {IconButtonTheme} theme - The theme of the button. Valid values are `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`.
 * @property {string} shape - The shape of the button. Valid values are `circular` and `squared`.
 * @property {IconButtonDensity} density - The density of the button. Valid values are `small`, `medium`, and `large`.
 * @property {string} type - The type of button. Defaults to `button`. Valid values are `button`, `submit`, and `reset`.
 * @property {boolean} disabled - Whether or not the button is disabled.
 * @property {boolean} popoverIcon - Whether or not the button shows a built-in popover icon.
 * @property {string} name - The name of the button.
 * @property {string} value - The form value of the button.
 * @property {boolean} dense - Whether or not the button is dense.
 * @property {boolean} anchor - Whether or not the button is an `<a>` element.
 * @property {string} href - The href of the anchor.
 * @property {string} target - The target of the anchor.
 * @property {string} download - The download of the anchor.
 * @property {string} rel - The rel of the anchor.
 * @property {HTMLFormElement | null} form - The form reference of the button if within a `<form>` element.
 * 
 * @attribute {boolean} toggle - Whether or not the icon button can be toggled.
 * @attribute {boolean} on - Whether or not the button is on. Only applies when `toggle` is `true`.
 * @attribute {IconButtonVariant} variant - The variant of the button. Valid values are `text`, `outlined`, `filled`, and `raised`.
 * @attribute {IconButtonTheme} theme - The theme of the button. Valid values are `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`.
 * @attribute {string} shape - The shape of the button. Valid values are `circular` and `squared`.
 * @attribute {IconButtonDensity} density - The density of the button. Valid values are `small`, `medium`, and `large`.
 * @attribute {string} type - The type of button. Defaults to `button`. Valid values are `button`, `submit`, and `reset`.
 * @attribute {boolean} disabled - Whether or not the button is disabled.
 * @attribute {boolean} popover-icon - Whether or not the button shows a built-in popover icon.
 * @attribute {string} name - The name of the button.
 * @attribute {string} value - The form value of the button.
 * @attribute {boolean} dense - Whether or not the button is dense.
 * @attribute {boolean} anchor - Whether or not the button is an `<a>` element.
 * @attribute {string} href - The href of the anchor.
 * @attribute {string} target - The target of the anchor.
 * @attribute {string} download - The download of the anchor.
 * @attribute {string} rel - The rel of the anchor.
 * 
 * @event {Event} click - Fires when the button is clicked.
 * @event {Event} forge-icon-button-toggle - Fires when the icon button is toggled.
 * 
 * @cssproperty --forge-icon-button-display - The display property of the button.
 * @cssproperty --forge-icon-button-size - The height and min-width of the button.
 * @cssproperty --forge-icon-button-gap - The gap between the icon content.
 * @cssproperty --forge-icon-button-icon-color - The color of the icon.
 * @cssproperty --forge-icon-button-background-color - The background color of the button.
 * @cssproperty --forge-icon-button-icon-size - The size of the icon.
 * @cssproperty --forge-icon-button-cursor - The cursor of the button.
 * @cssproperty --forge-icon-button-padding - The inline padding of the button.
 * @cssproperty --forge-icon-button-border - The border of the button.
 * @cssproperty --forge-icon-button-shadow - The shadow of the button.
 * @cssproperty --forge-icon-button-transition-duration - The transition duration of the button.
 * @cssproperty --forge-icon-button-transition-timing - The transition timing of the button.
 * @cssproperty --forge-icon-button-shape - The shape of the button.
 * @cssproperty --forge-icon-button-shape-start-start - The start-start border-radius of the button.
 * @cssproperty --forge-icon-button-shape-start-end - The start-end border-radius of the button.
 * @cssproperty --forge-icon-button-shape-end-start - The end-start border-radius of the button.
 * @cssproperty --forge-icon-button-shape-end-end - The end-end border-radius of the button.
 * @cssproperty --forge-icon-button-shape-squared - The squared border-radius of the button.
 * @cssproperty --forge-icon-button-outlined-border-width - The border width when in the outlined variant.
 * @cssproperty --forge-icon-button-outlined-border-style - The border style when in the outlined variant.
 * @cssproperty --forge-icon-button-outlined-border-color - The border color when in the outlined variant.
 * @cssproperty --forge-icon-button-tonal-icon-color - The icon color when in the tonal variant.
 * @cssproperty --forge-icon-button-tonal-background-color - The background color when in the tonal variant.
 * @cssproperty --forge-icon-button-filled-icon-color - The icon color when in the filled variant.
 * @cssproperty --forge-icon-button-filled-background-color - The background color when in the filled variant.
 * @cssproperty --forge-icon-button-raised-shadow - The shadow when in the raised variant.
 * @cssproperty --forge-icon-button-raised-hover-shadow - The shadow when in the raised variant and hovered.
 * @cssproperty --forge-icon-button-raised-active-shadow - The shadow when in the raised variant and active.
 * @cssproperty --forge-icon-button-raised-disabled-shadow - The shadow when in the raised variant and disabled.
 * @cssproperty --forge-icon-button-density-small-size - The size of the button when in the small density.
 * @cssproperty --forge-icon-button-density-small-padding - The padding of the button when in the small density.
 * @cssproperty --forge-icon-button-density-small-icon-size - The size of the icon when in the small density.
 * @cssproperty --forge-icon-button-density-medium-size - The size of the button when in the medium density.
 * @cssproperty --forge-icon-button-density-medium-padding - The padding of the button when in the medium density.
 * @cssproperty --forge-icon-button-density-large-size - The size of the button when in the large density.
 * @cssproperty --forge-icon-button-toggle-on-icon-color - The color of the icon when in toggle mode and toggled on.
 * @cssproperty --forge-icon-button-outlined-toggle-on-background-color - The background color when in the outlined variant and toggled on.
 * @cssproperty --forge-icon-button-outlined-toggle-on-icon-color - The icon color when in the outlined variant and toggled on.
 * @cssproperty --forge-icon-button-tonal-toggle-background-color - The background color when in the tonal variant and toggled.
 * @cssproperty --forge-icon-button-tonal-toggle-on-background-color - The background color when in the tonal variant and toggled on.
 * @cssproperty --forge-icon-button-tonal-toggle-on-icon-color - The icon color when in the tonal variant and toggled on.
 * @cssproperty --forge-icon-button-filled-toggle-background-color - The background color when in the filled variant and toggled.
 * @cssproperty --forge-icon-button-filled-toggle-icon-color - The icon color when in the filled variant and toggled.
 * @cssproperty --forge-icon-button-filled-toggle-on-background-color - The background color when in the filled variant and toggled on.
 * @cssproperty --forge-icon-button-filled-toggle-on-icon-color - The icon color when in the filled variant and toggled on.
 * @cssproperty --forge-icon-button-disabled-cursor - The cursor when the button is disabled.
 * @cssproperty --forge-icon-button-disabled-opacity - The opacity when the button is disabled.
 * @cssproperty --forge-icon-button-popover-icon-padding - The padding of the popover icon.
 * @cssproperty --forge-icon-button-focus-indicator-color - The color of the focus indicator.
 * 
 * @csspart root - The root container element.
 * @csspart focus-indicator - The focus-indicator indicator element.
 * @csspart state-layer - The state-layer surface element.
 * 
 * @slot - This is a default/unnamed slot for the icon.
 * @slot on - The icon to show when in `toggle` mode when toggled "on".
 * @slot start - Elements to logically render before the icon.
 * @slot end - Elements to logically render after the icon.
 */
@CustomElement({
  name: ICON_BUTTON_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent,
    IconComponent
  ]
})
export class IconButtonComponent extends BaseButton<IconButtonFoundation> implements IIconButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BASE_BUTTON_CONSTANTS.observedAttributes),
      ...Object.values(ICON_BUTTON_CONSTANTS.observedAttributes)
    ];
  }

  protected readonly _foundation: IconButtonFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new IconButtonFoundation(new IconButtonAdapter(this));
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ICON_BUTTON_CONSTANTS.attributes.TOGGLE:
        this.toggle = coerceBoolean(newValue);
        break;
      case ICON_BUTTON_CONSTANTS.attributes.ON:
        this.on = coerceBoolean(newValue);
        break;
      case ICON_BUTTON_CONSTANTS.attributes.VARIANT:
        this.variant = newValue as IconButtonVariant;
        break;
      case ICON_BUTTON_CONSTANTS.attributes.THEME:
        this.theme = newValue as IconButtonTheme;
        break;
      case ICON_BUTTON_CONSTANTS.attributes.SHAPE:
        this.shape = newValue as IconButtonShape;
        break;
      case ICON_BUTTON_CONSTANTS.attributes.DENSITY:
        this.density = newValue as IconButtonDensity;
        break;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @FoundationProperty()
  public declare toggle: boolean;

  @FoundationProperty()
  public declare on: boolean;

  @FoundationProperty()
  public declare theme: IconButtonTheme;

  @FoundationProperty()
  public declare variant: IconButtonVariant;

  @FoundationProperty()
  public declare shape: IconButtonShape;

  @FoundationProperty()
  public declare density: IconButtonDensity;
}
