import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { ExperimentalFocusOptions } from '../../constants';
import { IWithFocusable, WithFocusable } from '../../core/mixins/focus/with-focusable';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { StateLayerComponent } from '../../state-layer';
import { BaseComponent } from '../../core/base/base-component';
import { ButtonToggleAdapter } from './button-toggle-adapter';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from './button-toggle-constants';
import { ButtonToggleCore } from './button-toggle-core';
import { IWithDefaultAria, WithDefaultAria } from '../../core/mixins/internals/with-default-aria';

import template from './button-toggle.html';
import styles from './button-toggle.scss';

export interface IButtonToggleComponent<T = unknown> extends IWithElementInternals, IWithDefaultAria, IWithFocusable {
  value: T;
  selected: boolean;
  disabled: boolean;
  readonly: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-toggle': IButtonToggleComponent;
  }

  interface HTMLElementEventMap {
    'forge-button-toggle-select': CustomEvent<IButtonToggleSelectEventData>;
  }
}

/**
 * @tag forge-button-toggle
 * 
 * @property {unknown} value - The value of the button toggle.
 * @property {boolean} [selected=false] - Whether or not the button is selected.
 * @property {boolean} [disabled=false] - Whether or not the button is disabled.
 * @property {boolean} [readonly=false] - Whether or not the button is readonly.
 * 
 * @attribute {unknown} value - The value of the button toggle.
 * @attribute {boolean} [selected=false] - Whether or not the button is selected.
 * @attribute {boolean} [disabled=false] - Whether or not the button is disabled.
 * @attribute {boolean} [readonly=false] - Whether or not the button is readonly.
 * 
 * @event {CustomEvent<IButtonToggleSelectEventData>} forge-button-toggle-select - Dispatches when the user toggles the button.
 * 
 * @cssproperty --forge-button-toggle-display - The `display` style for the button toggle container element.
 * @cssproperty --forge-button-toggle-min-width - The minimum width.
 * @cssproperty --forge-button-toggle-spacing - The spacing between the button toggle and its content.
 * @cssproperty --forge-button-toggle-padding-block - The padding on the block axis.
 * @cssproperty --forge-button-toggle-padding-inline - The padding on the inline axis.
 * @cssproperty --forge-button-toggle-color - The color of the button toggle content.
 * @cssproperty --forge-button-toggle-background - The background of the button toggle.
 * @cssproperty --forge-button-toggle-cursor - The cursor of the button toggle.
 * @cssproperty --forge-button-toggle-border-width - The border-width of the button toggle.
 * @cssproperty --forge-button-toggle-border-style - The border-style of the button toggle.
 * @cssproperty --forge-button-toggle-border-color - The border-color of the button toggle.
 * @cssproperty --forge-button-toggle-shape - The shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-start-start - The start-start shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-start-end - The start-end shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-end-start - The end-start shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-shape-end-end - The end-end shape radius of the button toggle.
 * @cssproperty --forge-button-toggle-selected-background - The background of the button toggle when selected.
 * @cssproperty --forge-button-toggle-selected-color - The color of the button toggle content when selected.
 * @cssproperty --forge-button-toggle-selected-disabled-background - The background of the button toggle when selected and disabled.
 * @cssproperty --forge-button-toggle-disabled-opacity - The opacity of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-disabled-cursor - The cursor of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-disabled-color - The color of the button toggle content when disabled.
 * @cssproperty --forge-button-toggle-disabled-background - The background of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-transition-duration - The transition-duration of various properties.
 * @cssproperty --forge-button-toggle-transition-timing - The transition-timing of various properties.
 * 
 * @csspart root - The root container element.
 * @csspart focus-indicator - The focus indicator element.
 * @csspart state-layer - The state layer surface element.
 * 
 * @slot - The default/unnamed slot for the button toggle's content.
 * @slot start - Typically reserved for content/icons that render logically before the default slot content.
 * @slot end - Typically reserved content/icons that render logically after the default slot content.
 */
@customElement({
  name: BUTTON_TOGGLE_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent
  ]
})
export class ButtonToggleComponent<T = unknown> extends WithDefaultAria(WithElementInternals(WithFocusable(BaseComponent))) implements IButtonToggleComponent {
  public static get observedAttributes(): string[] {
    return Object.values(BUTTON_TOGGLE_CONSTANTS.observedAttributes);
  }

  private _core: ButtonToggleCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ButtonToggleCore(new ButtonToggleAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_TOGGLE_CONSTANTS.attributes.VALUE:
        this.value = newValue as T;
        return;
      case BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        return;
      case BUTTON_TOGGLE_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        return;
      case BUTTON_TOGGLE_CONSTANTS.attributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @coreProperty()
  public declare value: T;

  @coreProperty()
  public declare selected: boolean;

  @coreProperty()
  public declare disabled: boolean;

  @coreProperty()
  public declare readonly: boolean;

  public override focus(options?: ExperimentalFocusOptions): void {
    this._core.focus(options);
  }

  public override click(): void {
    this._core.click();
  }
}
