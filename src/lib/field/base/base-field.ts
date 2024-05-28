import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent } from '../../core/base/base-component';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { IBaseFieldAdapter } from './base-field-adapter';
import { BASE_FIELD_CONSTANTS, FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldShape, FieldSupportTextInset, FieldTheme, FieldVariant } from './base-field-constants';
import { BaseFieldFoundation } from './base-field-foundation';

export interface IBaseField extends IWithLabelAwareness {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  floatLabel: boolean;
  variant: FieldVariant;
  theme: FieldTheme;
  shape: FieldShape;
  density: FieldDensity;
  dense: boolean;
  popoverIcon: boolean;
  popoverExpanded: boolean;
  supportTextInset: FieldSupportTextInset;
  floatLabelWithoutAnimation(value: boolean): void;
}

export abstract class BaseField<T extends BaseFieldFoundation<IBaseFieldAdapter>> extends WithLabelAwareness(BaseComponent) implements IBaseField {
  public static get observedAttributes(): string[] {
    return Object.values(BASE_FIELD_CONSTANTS.observedAttributes);
  }

  protected abstract _foundation: T;

  constructor() {
    super();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BASE_FIELD_CONSTANTS.observedAttributes.LABEL_POSITION:
        this.labelPosition = newValue as FieldLabelPosition;
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.LABEL_ALIGNMENT:
        this.labelAlignment = newValue as FieldLabelAlignment;
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.OPTIONAL:
        this.optional = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.FLOAT_LABEL:
        this.floatLabel = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.VARIANT:
        this.variant = newValue as FieldVariant;
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as FieldTheme;
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.SHAPE:
        this.shape = newValue as FieldShape;
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.DENSITY:
        this.density = newValue as FieldDensity;
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.DENSE:
        this.dense = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.POPOVER_ICON:
        this.popoverIcon = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.POPOVER_EXPANDED:
        this.popoverExpanded = coerceBoolean(newValue);
        return;
      case BASE_FIELD_CONSTANTS.observedAttributes.SUPPORT_TEXT_INSET:
        this.supportTextInset = newValue as FieldSupportTextInset;
        return;
    }
  }

  public labelClickedCallback(): void {
    this._foundation.click();
  }

  public labelChangedCallback(value: string | null): void {
    this._foundation.applyLabel(value);
  }

  @FoundationProperty()
  public declare labelPosition: FieldLabelPosition;

  @FoundationProperty()
  public declare labelAlignment: FieldLabelAlignment;

  @FoundationProperty()
  public declare invalid: boolean;

  @FoundationProperty()
  public declare required: boolean;

  @FoundationProperty()
  public declare optional: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty({ name: 'permanentlyFloatLabel' })
  public declare floatLabel: boolean;

  @FoundationProperty()
  public declare variant: FieldVariant;

  @FoundationProperty()
  public declare theme: FieldTheme;

  @FoundationProperty()
  public declare shape: FieldShape;

  @FoundationProperty()
  public declare density: FieldDensity;

  @FoundationProperty()
  public declare dense: boolean;

  @FoundationProperty()
  public declare popoverIcon: boolean;

  @FoundationProperty()
  public declare popoverExpanded: boolean;

  @FoundationProperty()
  public declare supportTextInset: FieldSupportTextInset;

  public floatLabelWithoutAnimation(value: boolean): void {
    this._foundation.floatLabelWithoutAnimation(value);
  }
}
