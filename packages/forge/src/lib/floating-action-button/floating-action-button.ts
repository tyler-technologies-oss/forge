import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseButton } from '../button/base/base-button.js';
import { ButtonTheme } from '../button/index.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { FocusIndicatorComponent } from '../focus-indicator/index.js';
import { IconComponent } from '../icon/icon.js';
import { StateLayerComponent } from '../state-layer/index.js';
import { FLOATING_ACTION_BUTTON_CONSTANTS, FloatingActionButtonDensity, FloatingActionButtonElevation } from './floating-action-button-constants.js';

import styles from './floating-action-button.scss';

/** @deprecated - This will be removed in the future. Please switch to using FloatingActionButtonComponent. */
export interface IFloatingActionButtonComponent extends BaseLitElement {
  theme: ButtonTheme;
  density: FloatingActionButtonDensity;
  elevation: FloatingActionButtonElevation;
  type: string;
  disabled: boolean;
  popoverIcon: boolean;
  name: string;
  value: string;
  dense: boolean;
}

/**
 * @tag forge-fab
 *
 * @summary Floating action buttons are used to represent the most important action on a page. They are typically used in mobile applications, and are positioned above other content in a way that draws attention to them.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 * @dependency forge-icon
 *
 * @fires {PointerEvent} click - Fires when the button is clicked.
 *
 * @cssproperty --forge-fab-background-display - The display property.
 * @cssproperty --forge-fab-gap - The gap between the icon and the label.
 * @cssproperty --forge-fab-background - The background color.
 * @cssproperty --forge-fab-color - The text color.
 * @cssproperty --forge-fab-size - The height and min-width of the button.
 * @cssproperty --forge-fab-padding - The inline padding of the button.
 * @cssproperty --forge-fab-shadow - The box shadow of the button.
 * @cssproperty --forge-fab-hover-shadow - The box shadow of the button when hovered.
 * @cssproperty --forge-fab-active-shadow - The box shadow of the button when active.
 * @cssproperty --forge-fab-lowered-shadow - The box shadow of the button when lowered.
 * @cssproperty --forge-fab-lowered-hover-shadow - The box shadow of the button when lowered and hovered.
 * @cssproperty --forge-fab-lowered-active-shadow - The box shadow of the button when lowered and active.
 * @cssproperty --forge-fab-transition-duration - The transition duration.
 * @cssproperty --forge-fab-transition-timing - The transition timing function.
 * @cssproperty --forge-fab-shape - The border radius of the button.
 * @cssproperty --forge-fab-shape-start-start - The start-start border radius.
 * @cssproperty --forge-fab-shape-start-end - The start-end border radius.
 * @cssproperty --forge-fab-shape-end-start - The end-start border radius.
 * @cssproperty --forge-fab-shape-end-end - The end-end border radius.
 * @cssproperty --forge-fab-extended-padding - The inline padding of the extended button.
 * @cssproperty --forge-fab-extended-min-width - The min-width of the extended button.
 * @cssproperty --forge-fab-density-small-size - The height and min-width of the small density button.
 * @cssproperty --forge-fab-density-medium-size - The height and min-width of the medium density (default) button.
 * @cssproperty --forge-fab-density-large-size - The height and min-width of the large density button.
 * @cssproperty --forge-fab-disabled-cursor - The cursor when disabled.
 * @cssproperty --forge-fab-disabled-background - The background color when disabled.
 * @cssproperty --forge-fab-disabled-color - The text color when disabled.
 * @cssproperty --forge-fab-disabled-opacity - The opacity when disabled.
 *
 * @csspart root - The root container element.
 * @csspart focus-indicator - The focus-indicator indicator element.
 * @csspart state-layer - The state-layer surface element.
 *
 * @cssclass forge-fab - Apply to the interactive button element.
 * @cssclass forge-fab--extended - Modifies the button to match the extended variant.
 * @cssclass forge-fab--small - Renders a more dense/small variant.
 * @cssclass forge-fab--large - Renders a larger variant.
 * @cssclass forge-fab--flat - Removes the raised shadow.
 *
 * @slot - This is a default/unnamed slot. Typically used for icon-only or label-only FABs. If the content forces the width to be large than the height, then the FAB will be in extended mode.
 * @slot start - An element to logically render at the start of the button content.
 * @slot label - Reserved specifically for label text. This forces the button into extended mode.
 * @slot end - An element to logically render at the end of the button content.
 */
@customElement(FLOATING_ACTION_BUTTON_CONSTANTS.elementName)
export class FloatingActionButtonComponent extends BaseButton implements IFloatingActionButtonComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = FLOATING_ACTION_BUTTON_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, StateLayerComponent, IconComponent];

  /**
   * Gets/sets the theme of the button.
   * @default 'secondary'
   * @attribute
   */
  @property({
    reflect: true
  })
  public theme: ButtonTheme = FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;

  /**
   * Gets/sets the density of the button.
   * @default 'medium'
   * @attribute
   */
  @property({ reflect: true })
  public density: FloatingActionButtonDensity = FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY;

  /**
   * Gets/sets the elevation of the button.
   * @default 'raised'
   * @attribute
   */
  @property({ reflect: true })
  public elevation: FloatingActionButtonElevation = FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_ELEVATION;

  @state()
  private _extended = false;

  @queryAssignedNodes({ slot: 'label', flatten: true }) private _labelSlotAssignedNodes!: Node[];

  public render(): TemplateResult {
    const classes = {
      'forge-fab': true,
      extended: this._extended,
      small: this.dense,
      [this.density]: !this.dense,
      [this.elevation]: true,
      [this.theme]: true
    };

    return html`
      <div class=${classMap(classes)} part="root" id="root">
        <slot name="start"></slot>
        ${this._renderDefaultSlot()}
        <slot name="label" @slotchange=${this.#handleLabelSlotChange}></slot>
        ${this._renderEndSlotWithOptionalPopoverIcon()} ${this._renderInteractionLayer()}
      </div>
    `;
  }

  #handleLabelSlotChange(): void {
    this._extended = this.popoverIcon || !!this._labelSlotAssignedNodes.length;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-fab': FloatingActionButtonComponent;
  }
}
