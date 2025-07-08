import { attachShadowTemplate, customElement, coreProperty } from '@tylertech/forge-core';
import { ButtonTheme } from '../button';
import { BaseButton, IBaseButton } from '../button/base/base-button';
import { BASE_BUTTON_CONSTANTS } from '../button/base/base-button-constants';
import { FocusIndicatorComponent } from '../focus-indicator';
import { IconComponent } from '../icon/icon';
import { StateLayerComponent } from '../state-layer';
import { FloatingActionButtonAdapter } from './floating-action-button-adapter';
import { FloatingActionButtonDensity, FloatingActionButtonElevation, FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';
import { FloatingActionButtonCore } from './floating-action-button-core';

import template from './floating-action-button.html';
import styles from './floating-action-button.scss';

export interface IFloatingActionButtonComponent extends IBaseButton {
  theme: ButtonTheme;
  density: FloatingActionButtonDensity;
  elevation: FloatingActionButtonElevation;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-fab': IFloatingActionButtonComponent;
  }
}

/**
 * @tag forge-fab
 *
 * @summary Floating action buttons are used to represent the most important action on a page.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 * @dependency forge-icon
 *
 * @property {ButtonTheme} [theme="secondary"] - Sets the theme of the button.
 * @property {FloatingActionButtonDensity} [density="medium"] - Sets the density of the button.
 * @property {FloatingActionButtonElevation} [elevation="raised"] - Sets the elevation of the button.
 *
 * @attribute {string} [theme="secondary"] - Sets the theme of the button.
 * @attribute {string} [density="medium"] - Sets the density of the button.
 * @attribute {string} [elevation="raised"] - Sets the elevation of the button.
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
@customElement({
  name: FLOATING_ACTION_BUTTON_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent, IconComponent]
})
export class FloatingActionButtonComponent extends BaseButton<FloatingActionButtonCore> implements IFloatingActionButtonComponent {
  public static get observedAttributes(): string[] {
    return [...Object.values(BASE_BUTTON_CONSTANTS.observedAttributes), ...Object.values(FLOATING_ACTION_BUTTON_CONSTANTS.observedAttributes)];
  }

  protected readonly _core: FloatingActionButtonCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new FloatingActionButtonCore(new FloatingActionButtonAdapter(this));
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME:
        this.theme = newValue as ButtonTheme;
        return;
      case FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY:
        this.density = newValue as FloatingActionButtonDensity;
        return;
      case FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION:
        this.elevation = newValue as FloatingActionButtonElevation;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @coreProperty()
  declare public theme: ButtonTheme;

  @coreProperty()
  declare public density: FloatingActionButtonDensity;

  @coreProperty()
  declare public elevation: FloatingActionButtonElevation;
}
