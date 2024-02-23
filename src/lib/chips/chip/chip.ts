import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { BaseComponent, IBaseComponent } from '../../core';
import { FocusIndicatorComponent } from '../../focus-indicator';
import { IconComponent, IconRegistry } from '../../icon';
import { IconButtonComponent } from '../../icon-button';
import { StateLayerComponent } from '../../state-layer';
import { ChipAdapter } from './chip-adapter';
import { ChipTheme, ChipType, CHIP_CONSTANTS, IChipDeleteEventData, IChipSelectEventData } from './chip-constants';
import { ChipFoundation } from './chip-foundation';

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
 */
@CustomElement({
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

  protected _foundation: ChipFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconClose);
    attachShadowTemplate(this, template, styles);
    this._foundation = new ChipFoundation(new ChipAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
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
    this._foundation.focus(options);
  }

  public override click(): void {
    this._foundation.click();
  }

  @FoundationProperty()
  public declare type: ChipType;

  @FoundationProperty()
  public declare value: unknown;

  @FoundationProperty()
  public declare selected: boolean;

  @FoundationProperty()
  public declare invalid: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare theme: ChipTheme;

  @FoundationProperty()
  public declare href: string;

  @FoundationProperty()
  public declare target: string;

  @FoundationProperty()
  public declare download: string;

  @FoundationProperty()
  public declare rel: string;
}
