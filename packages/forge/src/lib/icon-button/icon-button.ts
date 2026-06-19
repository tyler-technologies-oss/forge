import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { toggleState } from '../core/utils/utils.js';
import { FocusIndicatorComponent } from '../focus-indicator/index.js';
import { IconComponent } from '../icon/index.js';
import { StateLayerComponent } from '../state-layer/index.js';
import { BaseButton, IBaseButton } from '../button/base/base-button.js';
import { IconButtonDensity, IconButtonShape, IconButtonTheme, IconButtonVariant, ICON_BUTTON_CONSTANTS } from './icon-button-constants.js';

import styles from './icon-button.scss';
import { setDefaultAria } from '../core/utils/a11y-utils.js';

/** @deprecated - This will be removed in the future. Please switch to using IconButtonComponent. */
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

/**
 * @tag forge-icon-button
 *
 * @summary Icon buttons are buttons that contain **only** an icon, and are used to represent actions or commands. Always provide an accessible label when using icon buttons.
 *
 * @dependency forge-icon
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
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
 *
 * @state toggle - Applied when the button is in toggle mode.
 * @state pressed - Applied when the button is toggled on in toggle mode.
 */
@customElement(ICON_BUTTON_CONSTANTS.elementName)
export class IconButtonComponent extends BaseButton {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = ICON_BUTTON_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, StateLayerComponent, IconComponent];

  /**
   * Gets/sets whether the icon button can be toggled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public toggle = false;

  /**
   * Gets/sets whether the toggle button is pressed. Only applies when `toggle` is `true`.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public pressed = false;

  /**
   * Alias for `pressed` _(deprecated)_. Whether or not the toggle button is pressed. Only applies when `toggle` is `true`.
   * @default false
   * @deprecated Use `pressed` instead.
   * @attribute on
   */
  @property({ type: Boolean, reflect: true, attribute: 'on' })
  public set on(value: boolean) {
    this.pressed = value;
  }
  public get on(): boolean {
    return this.pressed;
  }

  /**
   * Gets/sets the variant of the button. Valid values are `text`, `outlined`, `filled`, and `raised`.
   * @default "icon"
   * @attribute
   */
  @property({ reflect: true })
  public variant: IconButtonVariant = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT;

  /**
   * Gets/sets the theme of the button. Valid values are `text`, `outlined`, `filled`, and `raised`.
   * @default "default"
   * @attribute
   */
  @property({ reflect: true })
  public theme: IconButtonTheme = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;

  /**
   * Gets/sets the shape of the button. Valid values are `circular` and `squared`.
   * @default "circular"
   * @attribute
   */
  @property({ reflect: true })
  public shape: IconButtonShape = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_SHAPE;

  /**
   * Gets/sets the density of the button. Valid values are `small`, `medium`, and `large`.
   * @default "large"
   * @attribute
   */
  @property({ reflect: true })
  public density: IconButtonDensity = ICON_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY;

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (changedProperties.has('toggle')) {
      toggleState(this._internals, 'toggle', this.toggle);
    }

    if (changedProperties.has('pressed')) {
      setDefaultAria(this, this._internals, { ariaPressed: this.pressed ? 'true' : 'false' });
      toggleState(this._internals, 'pressed', this.pressed);
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-icon-button': true,
      'with-popover-icon': this.popoverIcon,
      small: this.dense,
      [this.density]: !this.dense,
      [this.shape]: true,
      [this.variant]: true,
      [this.theme]: true
    };

    return html`
      <div class=${classMap(classes)} part="root" id="root">
        <slot name="start"></slot>
        ${this._renderDefaultSlot()}
        <slot name="on"></slot>
        ${this._renderEndSlotWithOptionalPopoverIcon()}
        <slot name="badge"></slot>
        ${this._renderInteractionLayer()}
      </div>
    `;
  }

  protected override async _onClick(evt: PointerEvent): Promise<void> {
    await super._onClick(evt);
    if (this.toggle) {
      this.#onToggle();
    }
  }

  #onToggle(): void {
    const originalPressed = this.pressed;
    const newPressed = !originalPressed;
    const toggleEvent = new CustomEvent<boolean>(ICON_BUTTON_CONSTANTS.events.TOGGLE, {
      detail: newPressed,
      bubbles: true,
      cancelable: true
    });
    const cancelled = !this.dispatchEvent(toggleEvent);

    if (cancelled) {
      return;
    }

    this.pressed = newPressed;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-icon-button': IconButtonComponent;
  }

  interface HTMLElementEventMap {
    'forge-icon-button-toggle': CustomEvent<boolean>;
  }
}
