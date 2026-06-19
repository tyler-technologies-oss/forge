import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FocusIndicatorComponent } from '../focus-indicator/index.js';
import { IconComponent } from '../icon/index.js';
import { StateLayerComponent } from '../state-layer/index.js';
import { BaseButton, IBaseButton } from './base/base-button.js';
import { BUTTON_CONSTANTS, ButtonTheme, ButtonVariant } from './button-constants.js';
import { classMap } from 'lit/directives/class-map.js';
import { toggleState } from '../core/utils/utils.js';

import styles from './button.scss';

/** @deprecated - This will be removed in the future. Please switch to using ButtonComponent. */
export interface IButtonComponent extends IBaseButton {
  variant: ButtonVariant;
  pill: boolean;
  theme: ButtonTheme;
  fullWidth: boolean;
}

/**
 * @tag forge-button
 *
 * @summary Buttons are used when a user needs to take an action. They can be used to trigger an action, navigate to a new location, and can be styled with a variety of themes and variants.
 *
 * @dependency forge-icon
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @globalconfig variant
 * @globalconfig dense
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
 * @cssproperty --forge-button-transition-duration - The transition duration of the button.
 * @cssproperty --forge-button-transition-timing - The transition timing of the button.
 * @cssproperty --forge-button-text-padding-inline - The inline padding of the button when using the text variant.
 * @cssproperty --forge-button-filled-background - The background color of the filled button.
 * @cssproperty --forge-button-filled-disabled-background - The background color of the disabled filled button.
 * @cssproperty --forge-button-filled-color - The text color of the filled button.
 * @cssproperty --forge-button-filled-disabled-color - The text color of the disabled filled button.
 * @cssproperty --forge-button-raised-background - The background color of the raised button.
 * @cssproperty --forge-button-raised-disabled-background - The background color of the disabled raised button.
 * @cssproperty --forge-button-raised-color - The text color of the raised button.
 * @cssproperty --forge-button-raised-disabled-color - The text color of the disabled raised button.
 * @cssproperty --forge-button-raised-shadow - The shadow of the raised button.
 * @cssproperty --forge-button-raised-hover-shadow - The shadow of the raised button on hover.
 * @cssproperty --forge-button-raised-active-shadow - The shadow of the raised button on active state.
 * @cssproperty --forge-button-raised-disabled-shadow - The shadow of the disabled raised button.
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
 *
 * @cssclass forge-button - Base button class (required).
 * @cssclass forge-button--text - Text button variant.
 * @cssclass forge-button--outlined - Outlined button variant.
 * @cssclass forge-button--tonal - Tonal button variant.
 * @cssclass forge-button--filled - Filled button variant.
 * @cssclass forge-button--raised - Raised button variant.
 * @cssclass forge-button--link - Link button variant.
 * @cssclass forge-button--dense - Dense height.
 * @cssclass forge-button--pill - Pill shape.
 */
@customElement(BUTTON_CONSTANTS.elementName)
export class ButtonComponent extends BaseButton {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BUTTON_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, StateLayerComponent, IconComponent];

  /**
   * Gets/sets the button variant.
   * @default "text"
   * @attribute
   */
  @property({ reflect: true })
  public variant: ButtonVariant = 'text';

  /**
   * Gets/sets whether the button is pill-shaped.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public pill = false;

  /**
   * Gets/sets the button theme.
   * @default "primary"
   * @attribute
   */
  @property({ reflect: true })
  public theme: ButtonTheme = 'primary';

  /**
   * Gets/sets whether the button is full-width.
   * @default false
   * @attribute full-width
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  public fullWidth = false;

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // State layer toggling for link variant
    if (changedProperties.has('variant')) {
      if (this._stateLayerElement) {
        if (this.variant === 'link') {
          this._stateLayerElement.disabled = true;
        } else {
          this._stateLayerElement.disabled = false;
        }
      }
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (changedProperties.has('fullWidth')) {
      toggleState(this._internals, 'full-width', this.fullWidth);
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-button': true,
      'with-popover-icon': this.popoverIcon,
      dense: this.dense,
      pill: this.pill,
      [this.variant]: true,
      [this.theme]: true
    };
    return html`
      <div class=${classMap(classes)} part="root" id="root">
        <slot name="start"></slot>
        ${this._renderDefaultSlot()} ${this._renderEndSlotWithOptionalPopoverIcon()} ${this._renderInteractionLayer()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': ButtonComponent;
  }
}
