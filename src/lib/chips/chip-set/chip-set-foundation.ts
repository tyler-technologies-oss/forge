import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IChipSetAdapter } from './chip-set-adapter';
import { CHIP_CONSTANTS, ChipType } from '../chip/chip-constants';
import { CHIP_SET_CONSTANTS } from './chip-set-constants';

export interface IChipSetFoundation extends ICustomElementFoundation {
  vertical: boolean;
  type: ChipType;
  dense: boolean;
  disabled: boolean;
}

export class ChipSetFoundation implements IChipSetFoundation {
  private _vertical = false;
  private _type: ChipType = CHIP_CONSTANTS.defaults.TYPE as ChipType;
  private _dense = false;
  private _disabled = false;

  constructor(private _adapter: IChipSetAdapter) {}

  public initialize(): void {
    this._applyVertical();
    this._applyType();
    this._applyDense();
    this._applyDisabled();
  }

  private _applyVertical(): void {
    this._adapter.setVertical(this._vertical);
    this._adapter.toggleHostAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL, this._vertical);
  }

  private _applyType(): void {
    this._adapter.setType(this._type);
    this._adapter.setHostAttribute(CHIP_SET_CONSTANTS.attributes.TYPE, this._type);
  }

  private _applyDense(): void {
    this._adapter.setDense(this._dense);
    this._adapter.toggleHostAttribute(CHIP_SET_CONSTANTS.attributes.DENSE, this._dense);
  }

  private _applyDisabled(): void {
    this._adapter.setDisabled(this._disabled);
    this._adapter.toggleHostAttribute(CHIP_SET_CONSTANTS.attributes.DISABLED, this._disabled);
  }
  
  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    if (this._vertical !== value) {
      this._vertical = value;
      this._applyVertical();
    }
  }

  public get type(): ChipType {
    return this._type;
  }
  public set type(value: ChipType) {
    if (this._type !== value) {
      this._type = value;
      this._applyType();
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._applyDense();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._applyDisabled();
    }
  }
}
