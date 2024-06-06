import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { BaseComponent, IBaseComponent } from '../../core';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { IconComponent, IconRegistry } from '../../icon';
import { IconButtonComponent } from '../../icon-button';
import { StateLayerComponent } from '../../state-layer';
import { ChipAdapter } from './chip-adapter';
import { ChipTheme, ChipType, CHIP_CONSTANTS, IChipDeleteEventData, IChipSelectEventData } from './chip-constants';
import { ChipCore } from './chip-core';

import template from './chip.html';
import styles from './chip.scss';

export interface IChipComponent extends IBaseComponent {
  type: ChipType;
  value: unknown;
  selected: boolean;
  invalid: boolean;
  disabled: boolean;
  dense: boolean;
  theme: ChipTheme;
  href: string;
  target: string;
  download: string;
  rel: string;
  focusRemoveButton(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-chip': IChipComponent;
  }

  interface HTMLElementEventMap {
    'forge-chip-delete': CustomEvent<IChipDeleteEventData>;
    'forge-chip-select': CustomEvent<IChipSelectEventData>;
  }
}

/**
 * @tag forge-chip
 * 
 * @property {ChipType} type - The type of chip.
 * @property {unknown} value - The value of the chip.
 * @property {boolean} selected - Whether the chip is selected.
 * @property {boolean} invalid - Whether the chip is invalid.
 * @property {boolean} disabled - Whether the chip is disabled.
 * @property {boolean} dense - Whether the chip is dense.
 * @property {ChipTheme} theme - The theme of the chip.
 * @property {string} href - The href of the chip.
 * @property {string} target - The target of the chip.
 * @property {string} download - The download of the chip.
 * @property {string} rel - The rel of the chip.
 * 
 * @attribute {ChipType} type - The type of chip.
 * @attribute {unknown} value - The value of the chip.
 * @attribute {boolean} selected - Whether the chip is selected.
 * @attribute {boolean} invalid - Whether the chip is invalid.
 * @attribute {boolean} disabled - Whether the chip is disabled.
 * @attribute {boolean} dense - Whether the chip is dense.
 * @attribute {ChipTheme} theme - The theme of the chip.
 * @attribute {string} href - The href of the chip.
 * @attribute {string} target - The target of the chip.
 * @attribute {string} download - The download of the chip.
 * @attribute {string} rel - The rel of the chip.
 * 
 * @fires {IChipDeleteEventData} forge-chip-delete - Event fired when the chip is deleted.
 * @fires {IChipSelectEventData} forge-chip-select - Event fired when the chip is selected.
 * 
 * @cssproperty --forge-chip-background - The background color of the chip.
 * @cssproperty --forge-chip-color - The background color of the chip.
 * @cssproperty --forge-chip-shape - The shape of the chip.
 * @cssproperty --forge-chip-spacing - The spacing between chips.
 * @cssproperty --forge-chip-height - The height of the chip.
 * @cssproperty --forge-chip-padding-inline - The inline padding of the chip.
 * @cssproperty --forge-chip-padding-block - The block padding of the chip.
 * @cssproperty --forge-chip-cursor - The cursor style of the chip.
 * @cssproperty --forge-chip-icon-font-size - The font size of the chip icon.
 * @cssproperty --forge-chip-disabled-opacity - The opacity of the disabled chip.
 * @cssproperty --forge-chip-disabled-cursor - The cursor style of the disabled chip.
 * @cssproperty --forge-chip-dense-height - The height of the dense chip.
 * @cssproperty --forge-chip-dense-padding-inline - The inline padding of the dense chip.
 * @cssproperty --forge-chip-dense-spacing - The spacing between dense chips.
 * @cssproperty --forge-chip-dense-font-size - The font size of the dense chip.
 * @cssproperty --forge-chip-dense-font-weight - The font weight of the dense chip.
 * @cssproperty --forge-chip-dense-focus-indicator-offset - The offset of the focus indicator for dense chips.
 * @cssproperty --forge-chip-dense-icon-font-size - The font size of the icon in dense chips.
 * @cssproperty --forge-chip-remove-button-spacing - The spacing of the remove button in chips.
 * @cssproperty --forge-chip-remove-button-height-dense - The height of the remove button in dense chips.
 * @cssproperty --forge-chip-remove-button-icon-size-dense - The icon size of the remove button in dense chips.
 * @cssproperty --forge-chip-remove-button-spacing-dense - The spacing of the remove button in dense chips.
 * @cssproperty --forge-chip-selected-background - The background color of the selected chip.
 * @cssproperty --forge-chip-selected-color - The text color of the selected chip.
 * @cssproperty --forge-chip-invalid-color - The text color of the invalid chip.
 * @cssproperty --forge-chip-invalid-selected-background - The background color of the invalid selected chip.
 * @cssproperty --forge-chip-invalid-selected-color - The text color of the invalid selected chip.
 * @cssproperty --forge-chip-border-width - The width of the chip border.
 * @cssproperty --forge-chip-border-style - The style of the chip border.
 * @cssproperty --forge-chip-border-color - The color of the chip border.
 * @cssproperty --forge-chip-field-background - The background color of the chip field.
 * @cssproperty --forge-chip-field-color - The text color of the chip field.
 * @cssproperty --forge-chip-field-shape - The shape of the chip field.
 * @cssproperty --forge-chip-field-border-color - The color of the chip field border.
 * @cssproperty --forge-chip-field-cursor - The cursor style of the chip field.
 * @cssproperty --forge-chip-checkmark-size - The size of the checkmark in chips.
 * @cssproperty --forge-chip-checkmark-color - The color of the checkmark in chips.
 * @cssproperty --forge-chip-checkmark-spacing - The spacing of the checkmark in chips.
 * @cssproperty --forge-chip-avatar-size - The size of the avatar in chips.
 * @cssproperty --forge-chip-avatar-size-dense - The size of the avatar in dense chips.
 * @cssproperty --forge-chip-avatar-font-size - The font size of the avatar in chips.
 * @cssproperty --forge-chip-avatar-font-size-dense - The font size of the avatar in dense chips.
 * @cssproperty --forge-chip-avatar-spacing - The spacing of the avatar in chips.
 * @cssproperty --forge-chip-avatar-spacing-dense - The spacing of the avatar in dense chips.
 * @cssproperty --forge-chip-transition-duration - The duration of the chip transition.
 * @cssproperty --forge-chip-transition-easing - The easing function of the chip transition.
 * @cssproperty --forge-chip-checkmark-transition-delay - The delay of the checkmark transition in chips.
 * 
 * @csspart root - The component's root element.
 * @csspart trigger - The trigger element of the chip.
 * @csspart focus-indicator - The focus indicator of the chip.
 * @csspart state-layer - The state layer surface.
 * 
 * @slot - The content of the chip.
 * @slot start - The start content of the chip.
 * @slot end - The end content of the chip.
 */
@customElement({
  name: CHIP_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent,
    IconButtonComponent,
    IconComponent
  ]
})
export class ChipComponent extends BaseComponent implements IChipComponent {
  public static get observedAttributes(): string[] {
    return Object.values(CHIP_CONSTANTS.observedAttributes);
  }

  protected _core: ChipCore;

  constructor() {
    super();
    IconRegistry.define(tylIconClose);
    attachShadowTemplate(this, template, styles);
    this._core = new ChipCore(new ChipAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHIP_CONSTANTS.attributes.TYPE:
        this.type = newValue as ChipType;
        break;
      case CHIP_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case CHIP_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.THEME:
        this.theme = newValue as ChipTheme;
        break;
      case CHIP_CONSTANTS.attributes.HREF:
        this.href = newValue;
        break;
      case CHIP_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
      case CHIP_CONSTANTS.attributes.DOWNLOAD:
        this.download = newValue;
        break;
      case CHIP_CONSTANTS.attributes.REL:
        this.rel = newValue;
        break;
    }
  }

  public override focus(options?: FocusOptions): void {
    this._core.focus(options);
  }

  public focusRemoveButton(): void {
    this._core.focusRemoveButton();
  }

  public override click(): void {
    this._core.click();
  }

  @coreProperty()
  public declare type: ChipType;

  @coreProperty()
  public declare value: unknown;

  @coreProperty()
  public declare selected: boolean;

  @coreProperty()
  public declare invalid: boolean;

  @coreProperty()
  public declare disabled: boolean;

  @coreProperty()
  public declare dense: boolean;

  @coreProperty()
  public declare theme: ChipTheme;

  @coreProperty()
  public declare href: string;

  @coreProperty()
  public declare target: string;

  @coreProperty()
  public declare download: string;

  @coreProperty()
  public declare rel: string;
}
