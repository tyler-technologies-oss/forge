import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconCancel } from '@tylertech/tyler-icons/standard';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IconComponent, IconRegistry } from '../../icon';
import { ChipAdapter } from './chip-adapter';
import { ChipType, CHIP_CONSTANTS, IChipDeleteEventData, IChipSelectEventData } from './chip-constants';
import { ChipFoundation } from './chip-foundation';

import template from './chip.html';
import styles from './chip.scss';

export interface IChipComponent extends IBaseComponent {
  type: ChipType;
  selected: boolean;
  disabled: boolean;
  invalid: boolean;
  value: string;
  dense: boolean;
  emulateFocus: boolean;
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
 * The custom element class behind the `<forge-chip>` component.
 */
@CustomElement({
  name: CHIP_CONSTANTS.elementName,
  dependencies: [IconComponent]
})
export class ChipComponent extends BaseComponent implements IChipComponent {
  public static get observedAttributes(): string[] {
    return [
      CHIP_CONSTANTS.attributes.TYPE,
      CHIP_CONSTANTS.attributes.SELECTED,
      CHIP_CONSTANTS.attributes.DISABLED,
      CHIP_CONSTANTS.attributes.VALUE,
      CHIP_CONSTANTS.attributes.DENSE,
      CHIP_CONSTANTS.attributes.INVALID,
      CHIP_CONSTANTS.attributes.EMULATE_FOCUS
    ];
  }

  private _foundation: ChipFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconCancel);
    attachShadowTemplate(this, template, styles);
    this._foundation = new ChipFoundation(new ChipAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHIP_CONSTANTS.attributes.TYPE:
        this.type = newValue as ChipType;
        break;
      case CHIP_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case CHIP_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case CHIP_CONSTANTS.attributes.EMULATE_FOCUS:
        this.emulateFocus = coerceBoolean(newValue);
    }
  }

  /** Gets/sets the chip type. */
  @FoundationProperty()
  public type: ChipType;

  /** Gets/sets the selected state of the chip. */
  @FoundationProperty()
  public selected: boolean;

  /** Gets/sets the disabled state of the chip. */
  @FoundationProperty()
  public disabled: boolean;

  /** Gets/sets the invalid state of the chip. */
  @FoundationProperty()
  public invalid: boolean;

  /** Gets/sets the chip value. */
  @FoundationProperty()
  public value: string;

  /** Gets/sets the dense state of the chip. */
  @FoundationProperty()
  public dense: boolean;

  @FoundationProperty()
  public emulateFocus: boolean;

  public override focus(): void {
    this._foundation.setFocus();
  }
}
