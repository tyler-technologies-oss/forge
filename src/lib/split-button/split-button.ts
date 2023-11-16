import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { ButtonComponent, ButtonTheme } from '../button';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SplitButtonAdapter } from './split-button-adapter';
import { SplitButtonVariant, SPLIT_BUTTON_CONSTANTS } from './split-button-constants';
import { SplitButtonFoundation } from './split-button-foundation';

import template from './split-button.html';
import styles from './split-button.scss';

export interface ISplitButtonComponent extends IBaseComponent {
  variant: SplitButtonVariant;
  theme: ButtonTheme;
  disabled: boolean;
  dense: boolean;
  pill: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-button': ISplitButtonComponent;
  }
}

/**
 * @tag forge-split-button
 * 
 * @summary Split buttons are used for splitting an action into two parts.
 * 
 * @property {SplitButtonVariant} variant - The variant of the buttons. Valid values are `text`, `outlined`, `tonal`, `filled`, and `raised`.
 * @property {ButtonTheme} theme - The theme of the buttons. Valid values are `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`.
 * @property {boolean} disabled - Whether or not the buttons are disabled.
 * @property {boolean} dense - Whether or not the buttons are dense.
 * @property {boolean} pill - Whether or not the buttons are pill-shaped.
 * 
 * @attribute {SplitButtonVariant} variant - The variant of the buttons. Valid values are `text`, `outlined`, `tonal`, `filled`, and `raised`.
 * @attribute {ButtonTheme} theme - The theme of the buttons. Valid values are `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`.
 * @attribute {boolean} disabled - Whether or not the buttons are disabled.
 * @attribute {boolean} dense - Whether or not the buttons are dense.
 * @attribute {boolean} pill - Whether or not the buttons are pill-shaped.
 * 
 * @cssproperty --forge-split-button-min-width - The minimum width of the slotted buttons.
 * @cssproperty --forge-split-button-gap - The gap between the slotted buttons.
 * @cssproperty --forge-split-button-focus-indicator-offset - The offset of the focus indicator around the buttons.
 * @cssproperty --forge-split-button-focus-indicator-divider-offset - The offset of the focus indicator divider when using outlined buttons.
 * 
 * @slot - This is a default/unnamed slot.
 */
@CustomElement({
  name: SPLIT_BUTTON_CONSTANTS.elementName,
  dependencies: [
    ButtonComponent
  ]
})
export class SplitButtonComponent extends BaseComponent implements ISplitButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      SPLIT_BUTTON_CONSTANTS.attributes.VARIANT,
      SPLIT_BUTTON_CONSTANTS.attributes.THEME,
      SPLIT_BUTTON_CONSTANTS.attributes.DISABLED,
      SPLIT_BUTTON_CONSTANTS.attributes.DENSE,
      SPLIT_BUTTON_CONSTANTS.attributes.PILL
    ];
  }

  private readonly _foundation: SplitButtonFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new SplitButtonFoundation(new SplitButtonAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SPLIT_BUTTON_CONSTANTS.attributes.VARIANT:
        this.variant = newValue as SplitButtonVariant;
        break;
      case SPLIT_BUTTON_CONSTANTS.attributes.THEME:
        this.theme = newValue as ButtonTheme;
        break;
      case SPLIT_BUTTON_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SPLIT_BUTTON_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case SPLIT_BUTTON_CONSTANTS.attributes.PILL:
        this.pill = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare variant: SplitButtonVariant;

  @FoundationProperty()
  public declare theme: ButtonTheme;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare pill: boolean;
}
