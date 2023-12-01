import { ICustomElementFoundation } from '@tylertech/forge-core';
import { Density, Theme } from '../constants';
import { IFieldAdapter } from './field-adapter';
import { FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldTheme, FieldVariant, FIELD_CONSTANTS } from './field-constants';

export interface IFieldFoundation extends ICustomElementFoundation {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  variant: FieldVariant;
  theme: Theme;
  density: Density;
  dense: boolean;
}

export class FieldFoundation implements IFieldFoundation {
  private _labelPosition: FieldLabelPosition = FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION;
  private _labelAlignment: FieldLabelAlignment = FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT;
  private _invalid = false;
  private _required = false;
  private _optional = false;
  private _disabled = false;
  private _variant: FieldVariant = FIELD_CONSTANTS.defaults.DEFAULT_VARIANT;
  private _theme: FieldTheme = FIELD_CONSTANTS.defaults.DEFAULT_THEME;
  private _density: FieldDensity = FIELD_CONSTANTS.defaults.DEFAULT_DENSITY;
  private _dense = false;

  constructor(private _adapter: IFieldAdapter) {}

  public get labelPosition(): FieldLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: FieldLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);
      this._adapter.setLabelPosition(this._labelPosition);
    }
  }

  public get labelAlignment(): FieldLabelAlignment {
    return this._labelAlignment;
  }
  public set labelAlignment(value: FieldLabelAlignment) {
    if (this._labelAlignment !== value) {
      this._labelAlignment = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT, this._labelAlignment);
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    if (this._invalid !== value) {
      this._invalid = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.INVALID, this._invalid);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  public get optional(): boolean {
    return this._optional;
  }
  public set optional(value: boolean) {
    if (this._optional !== value) {
      this._optional = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.OPTIONAL, this._optional);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get variant(): FieldVariant {
    return this._variant;
  }
  public set variant(value: FieldVariant) {
    if (this._variant !== value) {
      this._variant = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.VARIANT, this._variant);
    }
  }

  public get theme(): Theme {
    return this._theme;
  }
  public set theme(value: Theme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.THEME, this._theme);
    }
  }

  public get density(): Density {
    return this._density;
  }
  public set density(value: Density) {
    if (this._density !== value) {
      this._density = value;
      this._adapter.setHostAttribute(FIELD_CONSTANTS.attributes.DENSITY, this._density);

      if (this._density !== 'small') {
        this._dense = false;
        this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.DENSE, this._dense);
      }
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(FIELD_CONSTANTS.attributes.DENSE, this._dense);
    }
  }
}
