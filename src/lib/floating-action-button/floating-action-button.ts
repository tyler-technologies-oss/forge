import { attachShadowTemplate, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { ButtonTheme } from '../button';
import { BaseButton, IBaseButton } from '../button/base/base-button';
import { BASE_BUTTON_CONSTANTS } from '../button/base/base-button-constants';
import { FocusIndicatorComponent } from '../focus-indicator';
import { IconComponent } from '../icon/icon';
import { StateLayerComponent } from '../state-layer';
import { FloatingActionButtonAdapter } from './floating-action-button-adapter';
import { FloatingActionButtonDensity, FloatingActionButtonElevation, FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';
import { FloatingActionButtonFoundation } from './floating-action-button-foundation';

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
 * @property {ButtonTheme} theme - Sets the theme of the button.
 * @property {FloatingActionButtonDensity} density - Sets the density of the button.
 * @property {FloatingActionButtonElevation} elevation - Sets the elevation of the button.
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
 * @attribute {string} theme - Sets the theme of the button.
 * @attribute {string} density - Sets the density of the button.
 * @attribute {string} elevation - Sets the elevation of the button.
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
 * @fires click - Fires when the button is clicked.
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
 * @slot - This is a default/unnamed slot. Typically used for icon-only or label-only FABs. If the content forces the width to be large than the height, then the FAB will be in extended mode.
 * @slot start - An element to logically render at the start of the button content.
 * @slot label - Reserved specifically for label text. This forces the button into extended mode.
 * @slot end - An element to logically render at the end of the button content.
 */
@CustomElement({
  name: FLOATING_ACTION_BUTTON_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent,
    IconComponent
  ]
})
export class FloatingActionButtonComponent extends BaseButton<FloatingActionButtonFoundation> implements IFloatingActionButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BASE_BUTTON_CONSTANTS.observedAttributes),
      ...Object.values(FLOATING_ACTION_BUTTON_CONSTANTS.observedAttributes)
    ];
  }

  protected readonly _foundation: FloatingActionButtonFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new FloatingActionButtonFoundation(new FloatingActionButtonAdapter(this));
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
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

  @FoundationProperty()
  public declare theme: ButtonTheme;

  @FoundationProperty()
  public declare density: FloatingActionButtonDensity;

  @FoundationProperty()
  public declare elevation: FloatingActionButtonElevation;
}
