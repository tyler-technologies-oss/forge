import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IBaseFieldAdapter } from './base-field-adapter';
import { BASE_FIELD_CONSTANTS, FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldShape, FieldSupportTextInset, FieldTheme, FieldVariant } from './base-field-constants';

export interface IBaseFieldFoundation extends ICustomElementFoundation {
  labelPosition: string;
  labelAlignment: string;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  permanentlyFloatLabel: boolean;
  variant: string;
  theme: string;
  shape: string;
  density: string;
  dense: boolean;
  popoverIcon: boolean;
  supportTextInset: string;
  click(): void;
  applyLabel(value: string | null): void;
  floatLabelWithoutAnimation(value: boolean): void;
}

export abstract class BaseFieldFoundation<T extends IBaseFieldAdapter> implements IBaseFieldFoundation {
  protected _labelPosition = BASE_FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION;
  protected _labelAlignment = BASE_FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT;
  protected _invalid = false;
  protected _required = false;
  protected _optional = false;
  protected _disabled = false;
  protected _variant = BASE_FIELD_CONSTANTS.defaults.DEFAULT_VARIANT;
  protected _theme = BASE_FIELD_CONSTANTS.defaults.DEFAULT_THEME;
  protected _shape = BASE_FIELD_CONSTANTS.defaults.DEFAULT_SHAPE;
  protected _density = BASE_FIELD_CONSTANTS.defaults.DEFAULT_DENSITY;
  protected _dense = false;
  protected _popoverIcon = false;
  protected _supportTextInset = BASE_FIELD_CONSTANTS.defaults.DEFAULT_SUPPORT_TEXT_INSET;
  protected _permanentlyFloatLabel = false;
  
  protected get _hasValue(): boolean {
    return this._adapter.hasValue;
  }
  protected get _hasPlaceholder(): boolean {
    return this._adapter.hasPlaceholder;
  }

  constructor(protected _adapter: T) {}

  public click(): void {
    this._adapter.click();
  }

  public applyLabel(value: string | null): void {
    this._adapter.applyLabel(value);
  }

  public floatLabelWithoutAnimation(value: boolean): void {
    this._adapter.floatLabelWithoutAnimation(this._hasValue || this._hasPlaceholder || value);
  }

  protected _tryFloatLabel(force?: boolean): void {
    if (this._permanentlyFloatLabel) {
      return;
    }
    if (this._labelPosition !== 'inset') {
      this._adapter.tryFloatLabel(false);
      return;
    }
    this._adapter.tryFloatLabel(force);
  }

  public get labelPosition(): FieldLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: FieldLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setFieldProperty('labelPosition', value);
      this._adapter.setHostAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_POSITION, value);
    }
  }

  public get labelAlignment(): FieldLabelAlignment {
    return this._labelAlignment;
  }
  public set labelAlignment(value: FieldLabelAlignment) {
    if (this._labelAlignment !== value) {
      this._labelAlignment = value;
      this._adapter.setFieldProperty('labelAlignment', value);
      this._adapter.setHostAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT, value);
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    if (this._invalid !== value) {
      this._invalid = value;
      this._adapter.setFieldProperty('invalid', value);
      this._adapter.toggleHostAttribute(BASE_FIELD_CONSTANTS.attributes.INVALID, value);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.setFieldProperty('required', value);
      this._adapter.toggleHostAttribute(BASE_FIELD_CONSTANTS.attributes.REQUIRED, value);
    }
  }

  public get optional(): boolean {
    return this._optional;
  }
  public set optional(value: boolean) {
    if (this._optional !== value) {
      this._optional = value;
      this._adapter.setFieldProperty('optional', value);
      this._adapter.toggleHostAttribute(BASE_FIELD_CONSTANTS.attributes.OPTIONAL, value);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setFieldProperty('disabled', value);
      this._adapter.toggleHostAttribute(BASE_FIELD_CONSTANTS.attributes.DISABLED, value);
    }
  }

  public get permanentlyFloatLabel(): boolean {
    return this._permanentlyFloatLabel;
  }
  public set permanentlyFloatLabel(value: boolean) {
    if (this._permanentlyFloatLabel !== value) {
      this._permanentlyFloatLabel = value;
      this._adapter.setFieldProperty('floatLabel', value || this._hasValue || this._hasPlaceholder);
      this._adapter.toggleHostAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL, value);
    }
  }

  public get variant(): FieldVariant {
    return this._variant;
  }
  public set variant(value: FieldVariant) {
    if (this._variant !== value) {
      this._variant = value;
      this._adapter.setFieldProperty('variant', value);
      this._adapter.setHostAttribute(BASE_FIELD_CONSTANTS.attributes.VARIANT, value);
    }
  }

  public get theme(): FieldTheme {
    return this._theme;
  }
  public set theme(value: FieldTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.setFieldProperty('theme', value);
      this._adapter.setHostAttribute(BASE_FIELD_CONSTANTS.attributes.THEME, value);
    }
  }

  public get shape(): FieldShape {
    return this._shape;
  }
  public set shape(value: FieldShape) {
    if (this._shape !== value) {
      this._shape = value;
      this._adapter.setFieldProperty('shape', value);
      this._adapter.setHostAttribute(BASE_FIELD_CONSTANTS.attributes.SHAPE, value);
    }
  }

  public get density(): FieldDensity {
    return this._density;
  }
  public set density(value: FieldDensity) {
    if (this._density !== value) {
      this._density = value;
      this._adapter.setFieldProperty('density', value);
      this._adapter.setHostAttribute(BASE_FIELD_CONSTANTS.attributes.DENSITY, value);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.setFieldProperty('dense', value);
      this._adapter.toggleHostAttribute(BASE_FIELD_CONSTANTS.attributes.DENSE, value);
    }
  }

  public get popoverIcon(): boolean {
    return this._popoverIcon;
  }
  public set popoverIcon(value: boolean) {
    if (this._popoverIcon !== value) {
      this._popoverIcon = value;
      this._adapter.setFieldProperty('popoverIcon', value);
      this._adapter.toggleHostAttribute(BASE_FIELD_CONSTANTS.attributes.POPOVER_ICON, value);
    }
  }

  public get supportTextInset(): FieldSupportTextInset {
    return this._supportTextInset;
  }
  public set supportTextInset(value: FieldSupportTextInset) {
    if (this._supportTextInset !== value) {
      this._supportTextInset = value;
      this._adapter.setFieldProperty('supportTextInset', value);
      this._adapter.setHostAttribute(BASE_FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET, value);
    }
  }
}
