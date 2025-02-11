import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { IconComponent } from '../icon';
import { BaseButton, IBaseButton } from '../button/base/base-button';
import { BASE_BUTTON_CONSTANTS } from '../button/base/base-button-constants';
import { FocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';
import { IconButtonDensity, IconButtonShape, IconButtonTheme, IconButtonVariant, ICON_BUTTON_CONSTANTS } from './icon-button-constants';
import { IconButtonCore } from './icon-button-core';
import { IconButtonAdapter } from './icon-button-adapter';

import template from './icon-button.html';
import styles from './icon-button.scss';

export interface IIconButtonComponent extends IBaseButton {
  toggle: boolean;
  pressed: boolean;
  /** @deprecated use `pressed` instead. */
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
 * @globalconfig variant
 * @globalconfig shape
 * @globalconfig density
 *
 * @event {PointerEvent} click - Fires when the button is clicked.
 * @event {CustomEvent<boolean>} forge-icon-button-toggle - Fires when the icon button is toggled. Only applies in `toggle` mode.
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
 * @cssproperty --forge-icon-button-toggle-on-background-color - The background color of the when in toggle mode and toggled on.
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
 * @cssclass forge-icon-button - Apply to the interactive button element.
 * @cssclass forge-icon-button--outlined - The outlined variant.
 * @cssclass forge-icon-button--tonal - The tonal variant.
 * @cssclass forge-icon-button--filled - The filled variant.
 * @cssclass forge-icon-button--raised - The raised variant.
 * @cssclass forge-icon-button--small - The small density.
 * @cssclass forge-icon-button--medium - The medium density.
 * @cssclass forge-icon-button--squared - The squared shape.
 *
 * @slot - This is a default/unnamed slot for the icon.
 * @slot on - The icon to show when in `toggle` mode when toggled "on".
 * @slot start - Elements to logically render before the icon.
 * @slot end - Elements to logically render after the icon.
 * @slot badge - Absolutely positions the element in the top-end corner of the button (typically reserved for badge-like content).
 */
@customElement({
  name: ICON_BUTTON_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent, IconComponent]
})
export class IconButtonComponent extends BaseButton<IconButtonCore> implements IIconButtonComponent {
  public static get observedAttributes(): string[] {
    return [...Object.values(BASE_BUTTON_CONSTANTS.observedAttributes), ...Object.values(ICON_BUTTON_CONSTANTS.observedAttributes)];
  }

  protected readonly _core: IconButtonCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new IconButtonCore(new IconButtonAdapter(this));
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case ICON_BUTTON_CONSTANTS.attributes.TOGGLE:
        this.toggle = coerceBoolean(newValue);
        break;
      case ICON_BUTTON_CONSTANTS.attributes.PRESSED:
      case ICON_BUTTON_CONSTANTS.attributes.ON:
        this.pressed = coerceBoolean(newValue);
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

  /**
   * Whether or not the icon button can be toggled.
   * @default false
   */
  @coreProperty()
  public declare toggle: boolean;

  /**
   * Whether or not the toggle button is pressed. Only applies when `toggle` is `true`.
   * @default false
   */
  @coreProperty()
  public declare pressed: boolean;

  /**
   * Alias for `pressed` _(deprecated)_. Whether or not the toggle button is pressed. Only applies when `toggle` is `true`.
   * @default false
   * @deprecated Use `pressed` instead.
   */
  @coreProperty({ name: 'pressed' })
  public declare on: boolean;

  /**
   * The variant of the button. Valid values are `text`, `outlined`, `filled`, and `raised`.
   * @default "default"
   */
  @coreProperty()
  public declare theme: IconButtonTheme;

  /**
   * The variant of the button. Valid values are `text`, `outlined`, `filled`, and `raised`.
   * @default "icon"
   */
  @coreProperty()
  public declare variant: IconButtonVariant;

  /**
   * The shape of the button. Valid values are `circular` and `squared`.
   * @default "circular"
   */
  @coreProperty()
  public declare shape: IconButtonShape;

  /**
   * The density of the button. Valid values are `small`, `medium`, and `large`.
   * @default "large"
   */
  @coreProperty()
  public declare density: IconButtonDensity;
}
