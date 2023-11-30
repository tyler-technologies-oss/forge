import { ICustomElementFoundation } from '@tylertech/forge-core';
import { Density, Theme } from '../constants';
import { IFieldAdapter } from './field-adapter';
import { FieldLabelAlignment, FieldLabelPosition } from './field-constants';

export interface IFieldFoundation extends ICustomElementFoundation {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  noBorder: boolean;
  theme: Theme;
  density: Density;
  dense: boolean;
}

export class FieldFoundation implements IFieldFoundation {
  // State
  private _labelPosition: FieldLabelPosition = 'block-start';
  private _labelAlignment: FieldLabelAlignment = 'centered';
  private _invalid = false;
  private _required = false;
  private _disabled = false;
  private _noBorder = false;
  private _theme: Theme = 'primary';
  private _density: Density = 'medium';
  private _dense = false;

  constructor(private _adapter: IFieldAdapter) {}

  public get labelPosition(): FieldLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: FieldLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
    }
  }

  public get labelAlignment(): FieldLabelAlignment {
    return this._labelAlignment;
  }
  public set labelAlignment(value: FieldLabelAlignment) {
    if (this._labelAlignment !== value) {
      this._labelAlignment = value;
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    if (this._invalid !== value) {
      this._invalid = value;
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
    }
  }

  public get noBorder(): boolean {
    return this._noBorder;
  }
  public set noBorder(value: boolean) {
    if (this._noBorder !== value) {
      this._noBorder = value;
    }
  }

  public get theme(): Theme {
    return this._theme;
  }
  public set theme(value: Theme) {
    if (this._theme !== value) {
      this._theme = value;
    }
  }

  public get density(): Density {
    return this._density;
  }
  public set density(value: Density) {
    if (this._density !== value) {
      this._density = value;
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
    }
  }
}
