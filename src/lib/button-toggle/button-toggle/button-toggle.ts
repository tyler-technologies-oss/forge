import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { ExperimentalFocusOptions, observedDefaultAriaAttributes } from '../../constants';
import { IWithFocusable, WithFocusable } from '../../core/mixins/focus/with-focusable';
import { IWithElementInternals, WithElementInternals } from '../../core/mixins/internals/with-element-internals';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { StateLayerComponent } from '../../state-layer';
import { BaseComponent } from '../../core/base/base-component';
import { ButtonToggleAdapter } from './button-toggle-adapter';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from './button-toggle-constants';
import { ButtonToggleFoundation } from './button-toggle-foundation';
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

const BaseButtonToggleClass = WithDefaultAria(WithElementInternals(WithFocusable(BaseComponent)));

/**
 * @tag forge-button-toggle
 * 
 * @property {unknown} value - The value of the button toggle.
 * @property {boolean} selected - Whether or not the button is selected.
 * @property {boolean} disabled - Whether or not the button is disabled.
 * @property {boolean} readonly - Whether or not the button is readonly.
 * 
 * @attribute {unknown} value - The value of the button toggle.
 * @attribute {boolean} selected - Whether or not the button is selected.
 * @attribute {boolean} disabled - Whether or not the button is disabled.
 * @attribute {boolean} readonly - Whether or not the button is readonly.
 * 
 * @event {CustomEvent<IButtonToggleSelectEventData>} forge-button-toggle-select - Dispatches when the user toggles the button.
 * 
 * @cssproperty --forge-button-toggle-display - The `display` style for the button toggle container element.
 * @cssproperty --forge-button-toggle-min-width - The minimum width.
 * @cssproperty --forge-button-toggle-spacing - The spacing between the button toggle and its content.
 * @cssproperty --forge-button-toggle-padding-block - The padding on the block axis.
 * @cssproperty --forge-button-toggle-padding-inline - The padding on the inline axis.
 * @cssproperty --forge-button-toggle-icon-size - The font-size of start/end slotted content.
 * @cssproperty --forge-button-toggle-color - The color of the button toggle content.
 * @cssproperty --forge-button-toggle-background - The background of the button toggle.
 * @cssproperty --forge-button-toggle-hover-background - The background of the button toggle when hovered.
 * @cssproperty --forge-button-toggle-active-background - The background of the button toggle when active.
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
 * @cssproperty --forge-button-toggle-dense-height - The height of the button toggle when dense.
 * @cssproperty --forge-button-toggle-disabled-opacity - The opacity of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-disabled-cursor - The cursor of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-disabled-color - The color of the button toggle content when disabled.
 * @cssproperty --forge-button-toggle-disabled-background - The background of the button toggle when disabled.
 * @cssproperty --forge-button-toggle-transition-duration - The transition-duration of various properties.
 * @cssproperty --forge-button-toggle-transition-timing - The transition-timing of various properties.
 * @cssproperty --forge-button-toggle-focus-indicator-color - The color of the focus indicator.
 * 
 * @csspart root - The root container element.
 * @csspart focus-indicator - The focus indicator element.
 * @csspart state-layer - The state layer surface element.
 * 
 * @slot - The default/unnamed slot for the button toggle's content.
 * @slot start - Typically reserved for content/icons that render logically before the default slot content.
 * @slot end - Typically reserved content/icons that render logically after the default slot content.
 */
@CustomElement({
  name: BUTTON_TOGGLE_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent
  ]
})
export class ButtonToggleComponent<T = unknown> extends BaseButtonToggleClass implements IButtonToggleComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BUTTON_TOGGLE_CONSTANTS.observedAttributes),
      ...Object.values(BUTTON_TOGGLE_CONSTANTS.observedAriaAttributes)
    ];
  }

  public readonly [observedDefaultAriaAttributes] = BUTTON_TOGGLE_CONSTANTS.observedAriaAttributes;

  private _foundation: ButtonToggleFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ButtonToggleFoundation(new ButtonToggleAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
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

  @FoundationProperty()
  public declare value: T;

  @FoundationProperty()
  public declare selected: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare readonly: boolean;

  public override focus(options?: ExperimentalFocusOptions): void {
    this._foundation.focus(options);
  }

  public override click(): void {
    this._foundation.click();
  }
}
