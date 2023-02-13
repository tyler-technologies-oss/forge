import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ChipComponent } from '../chip/chip';
import { ChipType } from '../chip/chip-constants';
import { ChipSetAdapter } from './chip-set-adapter';
import { CHIP_SET_CONSTANTS } from './chip-set-constants';
import { ChipSetFoundation } from './chip-set-foundation';

import template from './chip-set.html';
import styles from './chip-set.scss';

export interface IChipSetComponent extends IBaseComponent {
  vertical: boolean;
  type: ChipType;
  dense: boolean;
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-chip-set': IChipSetComponent;
  }
}

/**
 * The web component class behind the `<forge-chip-set>` custom element.
 * 
 * @tag forge-chip-set
 */
@CustomElement({
  name: CHIP_SET_CONSTANTS.elementName,
  dependencies: [ChipComponent]
})
export class ChipSetComponent extends BaseComponent implements IChipSetComponent {
  public static get observedAttributes(): string[] {
    return [
      CHIP_SET_CONSTANTS.attributes.VERTICAL,
      CHIP_SET_CONSTANTS.attributes.TYPE,
      CHIP_SET_CONSTANTS.attributes.DENSE,
      CHIP_SET_CONSTANTS.attributes.DISABLED
    ];
  }

  private _foundation: ChipSetFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ChipSetFoundation(new ChipSetAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHIP_SET_CONSTANTS.attributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case CHIP_SET_CONSTANTS.attributes.TYPE:
        this.type = newValue as ChipType;
        break;
      case CHIP_SET_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case CHIP_SET_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare vertical: boolean;

  @FoundationProperty()
  public declare type: ChipType;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare disabled: boolean;
}
