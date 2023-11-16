import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty, toggleAttribute } from '@tylertech/forge-core';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';
import { IconComponent, IconRegistry } from '../icon';
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
    IconRegistry.define(tylIconArrowDropDown);
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
