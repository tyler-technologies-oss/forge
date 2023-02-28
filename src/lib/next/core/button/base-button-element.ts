import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../../core';
import { NextButtonType, NEXT_BASE_BUTTON_CONSTANTS } from './base-button-constants';
import { INextBaseButtonFoundation } from './base-button-foundation';

export interface INextBaseButtonElement extends IBaseComponent {
  type: NextButtonType;
  disabled: boolean;
}

export abstract class NextBaseButtonElement extends BaseComponent implements INextBaseButtonElement {
  public static formAssociated = true;

  /** Controls the <button> type. */
  @FoundationProperty() public type: NextButtonType;

  /** Controls the disabled state. */
  @FoundationProperty() public disabled: boolean;

  /** Controls the disabled state. */
  @FoundationProperty() public href: string | undefined;

  protected abstract _foundation: INextBaseButtonFoundation;
  protected _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case NEXT_BASE_BUTTON_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case NEXT_BASE_BUTTON_CONSTANTS.attributes.HREF:
        this.href = newValue;
        break;
    }
  }
}

