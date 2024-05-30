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

/**
 * @property {FieldLabelPosition} [labelPosition="inset"] - The position of the label relative to the field.
 * @property {FieldLabelAlignment} [labelAlignment="start"] - The alignment of the label relative to the field.
 * @property {boolean} [invalid=false] - Whether the field is in an invalid state.
 * @property {boolean} [required=false] - Whether the field is required.
 * @property {boolean} [optional=false] - Whether the field is optional.
 * @property {boolean} [disabled=false] - Whether the field is disabled.
 * @property {boolean} [floatLabel=false] - Whether the label should float above the field. Only applies when the label is inset.
 * @property {FieldVariant} [variant="outlined"] - The variant of the field.
 * @property {FieldTheme} [theme="default"] - The theme of the field.
 * @property {FieldShape} [shape="default"] - The shape of the field.
 * @property {FieldDensity} [density="medium"] - The density of the field.
 * @property {boolean} [dense=false] - Whether the field is dense.
 * @property {boolean} [popoverIcon=false] - Whether the field has a popover icon.
 * @property {boolean} [popoverExpanded=false] - Whether the field's popover is expanded.
 * @property {FieldSupportTextInset} [supportTextInset="none"] - The inset of the support text.
 * 
 * @attribute {FieldLabelPosition} [label-position="inset"] - The position of the label relative to the field.
 * @attribute {FieldLabelAlignment} [label-alignment="start"] - The alignment of the label relative to the field.
 * @attribute {boolean} [invalid=false] - Whether the field is in an invalid state.
 * @attribute {boolean} [required=false] - Whether the field is required.
 * @attribute {boolean} [optional=false] - Whether the field is optional.
 * @attribute {boolean} [disabled=false] - Whether the field is disabled.
 * @attribute {boolean} [float-label=false] - Whether the label should float above the field. Only applies when the label is inset.
 * @attribute {FieldVariant} [variant="outlined"] - The variant of the field.
 * @attribute {FieldTheme} [theme="default"] - The theme of the field.
 * @attribute {FieldShape} [shape="default"] - The shape of the field.
 * @attribute {FieldDensity} [density="medium"] - The density of the field.
 * @attribute {boolean} [dense=false] - Whether the field is dense.
 * @attribute {boolean} [popover-icon=false] - Whether the field has a popover icon.
 * @attribute {boolean} [popover-expanded=false] - Whether the field's popover is expanded.
 * @attribute {FieldSupportTextInset} [support-text-inset="none"] - The inset of the support text.
 * 
 * @cssproperty --forge-field-height - The height of the field.
 * 
 * @csspart root - The root container element.
 * @csspart label - The label element.
 * @csspart container - The container element surrounding the field.
 * @csspart input - The element containing the input slot.
 * @csspart start - The element containing the start slot.
 * @csspart end - The element containing the end slot.
 * @csspart popover-icon - The popover icon element.
 * @csspart accessory - The element containing the accessory slot.
 * @csspart support-text - The support text element.
 * @csspart support-text-start - The element containing the support text start slot.
 * @csspart support-text-end - The element containing the support text end slot.
 * @csspart focus-indicator - The focus indicator element.
 */
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

  /** Floats the label immediately. Only applies when the label is inset. */
  public floatLabelWithoutAnimation(value: boolean): void {
    this._foundation.floatLabelWithoutAnimation(value);
  }
}
