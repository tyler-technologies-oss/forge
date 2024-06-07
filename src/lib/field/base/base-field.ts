import { coerceBoolean, coreProperty } from '@tylertech/forge-core';
import { BaseComponent } from '../../core/base/base-component';
import { IWithLabelAwareness, WithLabelAwareness } from '../../core/mixins/label/with-label-aware';
import { IBaseFieldAdapter } from './base-field-adapter';
import {
  BASE_FIELD_CONSTANTS,
  FieldDensity,
  FieldLabelAlignment,
  FieldLabelPosition,
  FieldShape,
  FieldSupportTextInset,
  FieldTheme,
  FieldVariant
} from './base-field-constants';
import { BaseFieldCore } from './base-field-core';

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
 * @property {FieldDensity} [density="default"] - The density of the field.
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
 * @attribute {FieldDensity} [density="default"] - The density of the field.
 * @attribute {boolean} [dense=false] - Whether the field is dense.
 * @attribute {boolean} [popover-icon=false] - Whether the field has a popover icon.
 * @attribute {boolean} [popover-expanded=false] - Whether the field's popover is expanded.
 * @attribute {FieldSupportTextInset} [support-text-inset="none"] - The inset of the support text.
 *
 * @event {CustomEvent<void>} forge-field-popover-icon-click - Dispatches when the user clicks the popover icon.
 *
 * @cssproperty --forge-field-background - The background of the field surface.
 * @cssproperty --forge-field-tonal-background - The background of the field surface in the tonal variant.
 * @cssproperty --forge-field-tonal-background-hover - The background of the field surface in the tonal variant on hover.
 * @cssproperty --forge-field-filled-background - The background of the field surface in the filled and raised variants.
 * @cssproperty --forge-field-outline-style - The style of the field outline.
 * @cssproperty --forge-field-outline-width - The width of the field outline.
 * @cssproperty --forge-field-shape - The border radius of the field's corners.
 * @cssproperty --forge-field-height - The height of the field in its default density.
 * @cssproperty --forge-field-inset-height - The height of the field in its default density when the label is inset.
 * @cssproperty --forge-field-padding-inline - The inline padding of the field.
 * @cssproperty --forge-field-padding-inline-start - The inline start padding of the field.
 * @cssproperty --forge-field-padding-inline-end - The inline end padding of the field.
 * @cssproperty --forge-field-inner-padding-inline - The padding between elements slotted into the field.
 * @cssproperty --forge-field-support-text-margin-block - The margin between the support text and the field.
 * @cssproperty --forge-field-support-text-gap - The minimum gap between the support text and the support text end.
 * @cssproperty --forge-field-support-text-padding-inline - The inline padding of the support text.
 * @cssproperty --forge-field-support-text-padding-inline-start - The inline start padding of the support text.
 * @cssproperty --forge-field-support-text-padding-inline-end - The inline end padding of the support text.
 * @cssproperty --forge-field-label-margin-inline - The margin between the label and the field when the label is in an inline position.
 * @cssproperty --forge-field-label-margin-block - The margin between the label and the field when the label is in the block start position.
 * @cssproperty --forge-field-required-padding - The padding between the required indicator and the label.
 * @cssproperty --forge-field-required-content - The content of the required indicator.
 * @cssproperty --forge-field-optional-padding - The padding between the optional indicator and the label.
 * @cssproperty --forge-field-optional-content - The content of the optional indicator.
 * @cssproperty --forge-field-multiline-resize - The direction the field can be resized when multiline.
 * @cssproperty --forge-field-multiline-min-inline-size - The minimum inline size the field can be resized to when multiline.
 * @cssproperty --forge-field-multiline-max-inline-size - The maximum inline size the field can be resized to when multiline.
 * @cssproperty --forge-field-multiline-min-block-size - The minimum block size the field can be resized to when multiline.
 * @cssproperty --forge-field-multiline-max-block-size - The maximum block size the field can be resized to when multiline.
 * @cssproperty --forge-field-popover-icon-transition-duration - The duration of the popover icon animation.
 * @cssproperty --forge-field-popover-icon-transition-timing - The timing function of the popover icon animation.
 * @cssproperty --forge-field-popover-icon-open-rotation - The rotation of the popover icon when open.
 * @cssproperty --forge-field-surface-animation-duration - The duration of background and outline animations.
 * @cssproperty --forge-field-surface-animation-timing - The timing function of background and outline animations.
 * @cssproperty --forge-field-surface-floating-animation-duration - The duration of the floating label animation.
 * @cssproperty --forge-field-surface-floating-animation-timing - The timing function of the floating label animation.
 * @cssproperty --forge-field-focus-indicator-width - The width of the focus indicator.
 * @cssproperty --forge-field-disabled-opacity - The opacity of the field when disabled.
 * @cssproperty --forge-field-disabled-background - The background of the field when disabled.
 *
 * @csspart root - The root container element.
 * @csspart label - The label element.
 * @csspart input - The element containing the input slot.
 * @csspart start - The element containing the start slot.
 * @csspart end - The element containing the end slot.
 * @csspart popover-icon - The popover icon element.
 * @csspart accessory - The element containing the accessory slot.
 * @csspart support-text - The support text element.
 * @csspart support-text-end - The element containing the support text end slot.
 * @csspart focus-indicator - The focus indicator element.
 *
 * @slot - The default/unnamed slot for the field's input.
 * @slot label - Renders its content as a positioned label.
 * @slot start - Typically reserved for content/icons that render logically before the default slot content.
 * @slot end - Typically reserved content/icons that render logically after the default slot content.
 * @slot accessory - Used for content such as a button that is logically connected to the field but should appear distinct from the input
 * @slot support-text - Used for content that provides additional information about the field. Aligns to the inline start of the field.
 * @slot support-text-end - Used for content that provides additional information about the field. Aligns to the inline end of the field.
 */
export abstract class BaseField<T extends BaseFieldCore<IBaseFieldAdapter>> extends WithLabelAwareness(BaseComponent) implements IBaseField {
  public static get observedAttributes(): string[] {
    return Object.values(BASE_FIELD_CONSTANTS.observedAttributes);
  }

  protected abstract _core: T;

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
    this._core.click();
  }

  public labelChangedCallback(value: string | null): void {
    this._core.applyLabel(value);
  }

  @coreProperty()
  public declare labelPosition: FieldLabelPosition;

  @coreProperty()
  public declare labelAlignment: FieldLabelAlignment;

  @coreProperty()
  public declare invalid: boolean;

  @coreProperty()
  public declare required: boolean;

  @coreProperty()
  public declare optional: boolean;

  @coreProperty()
  public declare disabled: boolean;

  @coreProperty({ name: 'permanentlyFloatLabel' })
  public declare floatLabel: boolean;

  @coreProperty()
  public declare variant: FieldVariant;

  @coreProperty()
  public declare theme: FieldTheme;

  @coreProperty()
  public declare shape: FieldShape;

  @coreProperty()
  public declare density: FieldDensity;

  @coreProperty()
  public declare dense: boolean;

  @coreProperty()
  public declare popoverIcon: boolean;

  @coreProperty()
  public declare popoverExpanded: boolean;

  @coreProperty()
  public declare supportTextInset: FieldSupportTextInset;

  /** Floats the label immediately. Only applies when the label is inset. */
  public floatLabelWithoutAnimation(value: boolean): void {
    this._core.floatLabelWithoutAnimation(value);
  }
}
