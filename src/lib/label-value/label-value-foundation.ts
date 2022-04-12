import { ICustomElementFoundation, isDefined } from '@tylertech/forge-core';
import { FieldDensityType } from '../field/field-constants';

import { ILabelValueAdapter } from './label-value-adapter';
import { LABEL_VALUE_CONSTANTS, LabelValueAlignment } from './label-value-constants';

export interface ILabelValueFoundation extends ICustomElementFoundation {
  empty: boolean;
  ellipsis: boolean;
  density: FieldDensityType;
  align: LabelValueAlignment;
}

export class LabelValueFoundation implements ILabelValueFoundation {
  private _empty = false;
  private _ellipsis = false;
  private _density: FieldDensityType = 'default';
  private _align: LabelValueAlignment = 'left';

  constructor(private _adapter: ILabelValueAdapter) {}

  public initialize(): void {
    this._adapter.setEmpty(this._empty);
    this._adapter.setEllipsis(this._ellipsis);
    this._applyDensity();
    this._adapter.setAlignment(this._align);
  }

  private _applyDensity(): void {
    this._adapter.setRoomy(this._density === 'roomy');
    this._adapter.setDense(this._density === 'dense');
  }

  public get empty(): boolean {
    return this._empty;
  }
  public set empty(value: boolean) {
    if (this._empty !== value) {
      this._empty = value;
      this._adapter.setEmpty(this._empty);
      if (this._empty) {
        this._adapter.setHostAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY, '');
      } else {
        this._adapter.removeHostAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY);
      }
    }
  }

  public get ellipsis(): boolean {
    return this._ellipsis;
  }
  public set ellipsis(value: boolean) {
    if (this._ellipsis !== value) {
      this._ellipsis = value;
      this._adapter.setEllipsis(this._ellipsis);
      if (this._ellipsis) {
        this._adapter.setHostAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS, '');
      } else {
        this._adapter.removeHostAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS);
      }
    }
  }

  public get density(): FieldDensityType {
    return this._density;
  }
  public set density(value: FieldDensityType) {
    if (this._density !== value) {
      this._density = value;
      this._applyDensity();
      this._adapter.setHostAttribute(LABEL_VALUE_CONSTANTS.attributes.DENSITY, this._density.toString());
    }
  }

  public get align(): LabelValueAlignment {
    return this._align;
  }
  public set align(value: LabelValueAlignment) {
    if (this._align !== value) {
      this._align = value;
      this._adapter.setAlignment(this._align);
      if (this._align) {
        this._adapter.setHostAttribute(LABEL_VALUE_CONSTANTS.attributes.ALIGN, this._align);
      } else {
        this._adapter.removeHostAttribute(LABEL_VALUE_CONSTANTS.attributes.ALIGN);
      }
    }
  }
}
