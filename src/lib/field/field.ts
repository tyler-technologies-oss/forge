import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core';
import { FocusIndicatorComponent, FocusIndicatorFocusMode } from '../focus-indicator';
import { FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldShape, FieldSupportTextInset, FieldTheme, FieldVariant } from './base/base-field-constants';
import { FieldAdapter } from './field-adapter';
import { FIELD_CONSTANTS } from './field-constants';
import { FieldFoundation } from './field-foundation';

import template from './field.html';
import styles from './field.scss';

export interface IFieldComponent extends IBaseComponent {
  labelPosition: FieldLabelPosition;
  labelAlignment: FieldLabelAlignment;
  floatLabel: boolean;
  invalid: boolean;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  variant: FieldVariant;
  theme: FieldTheme;
  shape: FieldShape;
  density: FieldDensity;
  dense: boolean;
  popoverIcon: boolean;
  popoverExpanded: boolean;
  multiline: boolean;
  supportTextInset: FieldSupportTextInset;
  focusIndicatorTargetElement: HTMLElement;
  focusIndicatorAllowFocus: boolean;
  focusIndicatorFocusMode: FocusIndicatorFocusMode;
  floatLabelWithoutAnimation(value: boolean): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-field': IFieldComponent;
  }
}

/**
 * @tag forge-field
 * 
 * @summary The Forge Field component is a basic component that handles the layout and theming of
 * form elements that can include a label, various states, and a border around an input area.
 * 
 * @property {FieldLabelPosition} labelPosition - The position of the label relative to the input area.
 * @property {FieldLabelAlignment} labelAlignment - The alignment of the label relative to the input area.
 * @property {boolean} floatLabel - Whether an inset positioned label is floated to the top of the container.
 * @property {boolean} invalid - Whether the field is in an invalid state.
 * @property {boolean} required - Whether the field is required.
 * @property {boolean} optional - Whether the field is optional.
 * @property {boolean} disabled - Whether the field is disabled.
 * @property {FieldVariant} variant - The variant of the field.
 * @property {FieldTheme} theme - The theme of the field.
 * @property {FieldShape} shape - The border radius of the field's corners.
 * @property {FieldDensity} density - The density of the field.
 * @property {boolean} dense - Whether the field is at the "extra-small" density level.
 * @property {boolean} popoverIcon - Whether the field has a popover icon.
 * @property {boolean} popoverExpanded - Whether the field's popover icon is in the expanded orientation.
 * @property {boolean} multiline - Whether the field contains a multiline input.
 * @property {FieldSupportTextInset} supportTextInset - Whether the field's support text is inset from either side.
 * @property {HTMLElement | null} focusIndicatorTargetElement - The element to attach the focus indicator to.
 * @property {FocusIndicatorFocusMode} focusIndicatorFocusMode - The focus mode to use on the focus indicator.
 * @property {boolean} focusIndicatorAllowFocus - Whether the focus indicator should render when the target element matches `:focus` instead of `:focus-visible`.
 * 
 * @attribute {FieldLabelPosition} label-position - The position of the label relative to the input area.
 * @attribute {FieldLabelAlignment} label-alignment - The alignment of the label relative to the input area.
 * @attribute {boolean} float-label - Whether an inset positioned label is floated to the top of the container.
 * @attribute {boolean} invalid - Whether the field is in an invalid state.
 * @attribute {boolean} required - Whether the field is required.
 * @attribute {boolean} optional - Whether the field is optional.
 * @attribute {boolean} disabled - Whether the field is disabled.
 * @attribute {FieldVariant} variant - The variant of the field.
 * @attribute {FieldTheme} theme - The theme of the field.
 * @attribute {FieldShape} shape - The border radius of the field's corners.
 * @attribute {Density} density - The density of the field.
 * @attribute {boolean} dense - Whether the field is at the "extra-small" density level.
 * @attribute {boolean} popover-icon - Whether the field has a popover icon.
 * @attribute {boolean} popover-expanded - Whether the field's popover icon is in the expanded orientation.
 * @attribute {boolean} multiline - Whether the field contains a multiline input.
 * @attribute {FieldSupportTextInset} support-text-inset - Whether the field's support text is inset from either side.
 * @attribute {string} focus-indicator-target - The id of the element to attach the focus indicator to.
 * @attribute {FocusIndicatorFocusMode} focus-indicator-focus-mode - The focus mode to use on the focus indicator.
 * @attribute {boolean} focus-indicator-allow-focus - Whether the focus indicator should render when the target element matches `:focus` instead of `:focus-visible`.
 * 
 * @method {(value: boolean) => void} floatLabelWithoutAnimation - Sets the floating label without animating the transition.
 * 
 * @event {CustomEvent<null>} forge-field-popover-icon-click - Dispatches when the user clicks the popover icon.
 * 
 * @cssproperty --forge-field-text-color - The color of content slotted into the default slot.
 * @cssproperty --forge-field-label-margin-inline - The margin on the inline axis of an inline positioned label.
 * @cssproperty --forge-field-label-margin-block - The margin on the block axis of a block positioned label.
 * @cssproperty --forge-field-container-padding-inline - The padding at the start and end of the inline axis of the container.
 * @cssproperty --forge-field-container-padding-inline-start - The padding at the start of the inline axis of the container.
 * @cssproperty --forge-field-container-padding-inline-end - The padding at the end of the inline axis of the container.
 * @cssproperty --forge-field-container-gap - The spacing between elements within the container.
 * @cssproperty --forge-field-start-padding-inline-end - The padding after the start slot.
 * @cssproperty --forge-field-end-padding-inline-start - The padding before the end slot.
 * @cssproperty --forge-field-end-padding-inline-end - The padding after the end slot.
 * @cssproperty --forge-field-popover-icon-padding-inline-start - The padding before the popover icon.
 * @cssproperty --forge-field-popover-icon-padding-inline-end - The padding after the popover icon.
 * @cssproperty --forge-field-accessory-padding-inline - The padding before and after the accessory slot.
 * @cssproperty --forge-field-accessory-padding-inline-start - The padding before the accessory slot.
 * @cssproperty --forge-field-accessory-padding-inline-end - The padding after the accessory slot.
 * @cssproperty --forge-field-support-text-margin-block - The margin of the support text on the block axis.
 * @cssproperty --forge-field-support-text-gap - The spacing between the start and end support text.
 * @cssproperty --forge-field-support-text-padding-inline - The padding before and after the support text.
 * @cssproperty --forge-field-support-text-padding-inline-start - The padding before the support text.
 * @cssproperty --forge-field-support-text-padding-inline-end - The padding after the support text.
 * @cssproperty --forge-field-rounded-container-padding-inline - The padding at the start and end of the inline axis of a rounded container.
 * @cssproperty --forge-field-rounded-container-padding-inline-start - The padding at the start of the inline axis of a rounded container.
 * @cssproperty --forge-field-rounded-container-padding-inline-end - The padding at the end of the inline axis of a rounded container.
 * @cssproperty --forge-field-height - The height of the container.
 * @cssproperty --forge-field-height-extra-small - The height of the container at the "extra-small" density level.
 * @cssproperty --forge-field-height-small - The height of the container at the "small" density level.
 * @cssproperty --forge-field-height-medium - The height of the container at the "medium" density level.
 * @cssproperty --forge-field-height-large - The height of the container at the "large" density level.
 * @cssproperty --forge-field-height-extra-large - The height of the container at the "extra-large" density level.
 * @cssproperty --forge-field-inset-height-extra-small - The height of the container at the "extra-small" density level with an inset label.
 * @cssproperty --forge-field-inset-height-small - The height of the container at the "small" density level with an inset label.
 * @cssproperty --forge-field-inset-height-medium - The height of the container at the "medium" density level with an inset label.
 * @cssproperty --forge-field-inset-height-large - The height of the container at the "large" density level with an inset label.
 * @cssproperty --forge-field-inset-height-extra-large - The height of the container at the "extra-large" density level with an inset label.
 * @cssproperty --forge-field-shape - The border radius of the container.
 * @cssproperty --forge-field-border-style - The border style used in variants that include borders in variants that include borders.
 * @cssproperty --forge-field-border-width - The border width used in variants that include borders in variants that include borders.
 * @cssproperty --forge-field-border-color - The border color used with the default theme in variants that include borders.
 * @cssproperty --forge-field-tonal-inner-border-color - The border color used for the accessory border with the default theme in the tonal and raised variants.
 * @cssproperty --forge-field-inner-border-block-size - The block size of the inner border in the tonal and raised variants.
 * @cssproperty --forge-field-label-color - The color of the non-inset label with the default theme.
 * @cssproperty --forge-field-inset-label-color - The color of the inset label with the default theme.
 * @cssproperty --forge-field-hover-border-style - The border style used in the hover state in variants that include borders.
 * @cssproperty --forge-field-hover-border-width - The border width used in the hover state in variants that include borders.
 * @cssproperty --forge-field-hover-border-color - The border color used with the default theme in the hover state in variants that include borders.
 * @cssproperty --forge-field-invalid-color - The color used for the invalid state.
 * @cssproperty --forge-field-invalid-border-style - The border style used for the invalid state in variants that include borders.
 * @cssproperty --forge-field-invalid-border-width - The border width used for the invalid state in variants that include borders.
 * @cssproperty --forge-field-invalid-border-color - The border color used for the invalid state in variants that include borders.
 * @cssproperty --forge-field-invalid-border-color-hover - The border color used for the invalid state when hovering in variants that include borders.
 * @cssproperty --forge-field-invalid-surface-color - The background color used for the invalid state in the tonal, filled, and raised variants.
 * @cssproperty --forge-field-invalid-surface-color-hover - The background color used for the invalid state when hovering in the tonal, filled, and raised variants.
 * @cssproperty --forge-field-invalid-label-color - The color of the label in the invalid state.
 * @cssproperty --forge-field-invalid-on-surface-color - The color of elements on top of the invalid surface.
 * @cssproperty --forge-field-invalid-inset-label-on-surface-color - The color of the inset label on the invalid surface.
 * @cssproperty --forge-field-plain-container-padding-inline - The padding at the start and end of the inline axis of the container in the plain variant.
 * @cssproperty --forge-field-tonal-surface-color - The background color used with the default theme in the tonal variant.
 * @cssproperty --forge-field-tonal-on-surface-color - The text color color used with the default theme in the tonal variant.
 * @cssproperty --forge-field-tonal-hover-color - The background color used for the hover state with the default theme in the tonal variant.
 * @cssproperty --forge-field-filled-surface-color - The background color used with the default theme in the filled variant.
 * @cssproperty --forge-field-filled-on-surface-color - The text color used with the default theme in the filled variant.
 * @cssproperty --forge-field-raised-elevation - The box shadow of the container in the raised variant.
 * @cssproperty --forge-field-raised-active-elevation - The box shadow of the container in the raised variant when hovered or active.
 * @cssproperty --forge-field-raised-surface-color - The background color used with the default theme in the raised variant.
 * @cssproperty --forge-field-raised-on-surface-color - The text color used with the default theme in the raised variant.
 * @cssproperty --forge-field-required-content - The text content rendered before the label when required.
 * @cssproperty --forge-field-required-color - The color of the required content.
 * @cssproperty --forge-field-optional-content - The text content rendered after the label when optional.
 * @cssproperty --forge-field-optional-color - The color of the optional content.
 * @cssproperty --forge-field-popover-icon-transition-duration - The duration of the popover icon's animation.
 * @cssproperty --forge-field-popover-icon-transition-timing - The timing function of the popover icon's animation.
 * @cssproperty --forge-field-popover-icon-open-rotation - The rotation of the popover icon when open.
 * @cssproperty --forge-field-multiline-resize - Whether a multiline field can be resized and in which direction.
 * @cssproperty --forge-field-multiline-min-inline-size - The minimum inline size of a multiline field.
 * @cssproperty --forge-field-multiline-max-inline-size - The maximum inline size of a multiline field.
 * @cssproperty --forge-field-multiline-min-block-size - The minimum block size of a multiline field.
 * @cssproperty --forge-field-multiline-max-block-size - The maximum block size of a multiline field.
 * @cssproperty --forge-field-disabled-opacity - The opacity of the field when disabled.
 * @cssproperty --forge-field-disabled-background-color - The background color of the field when disabled.
 * @cssproperty --forge-field-disabled-border-color - The border color of the field when disabled.
 * @cssproperty --forge-field-container-animation-duration - The duration of the border and background animations.
 * @cssproperty --forge-field-container-animation-timing - The timing function of the border and background animations.
 * @cssproperty --forge-field-floating-animation-duration - The duration of the floating animation.
 * @cssproperty --forge-field-floating-animation-timing - The timing function of the floating animation.
 * 
 * @csspart root - The root container element.
 * @csspart label - The label element.
 * @csspart container - The container element surrounding the input.
 * @csspart input - The element containing te input slot.
 * @csspart start - The element containing the start slot.
 * @csspart end - The element containing the end slot.
 * @csspart popover-icon - The popover icon element.
 * @csspart accessory - The element containing the accessory slot.
 * @csspart support-text - The element containing the support text slot.
 * @csspart support-text-end - The element containing the support text end slot.
 * @csspart focus-indicator - The focus indicator element.
 * 
 * @slot - The default/unnamed slot for the field's input.
 * @slot label - Renders its content as a positioned label.
 * @slot start - Typically reserved for content/icons that render logically before the default slot content.
 * @slot end - Typically reserved content/icons that render logically after the default slot content.
 * @slot accessory - Used for content such as a button that is logically connected to the field but should appear distinct from the input.
 * @slot support-text - Used for content that provides additional information about the field. Aligns to the inline start of the field.
 * @slot support-text-end - Used for content that provides additional information about the field. Aligns to the inline end of the field.
 */

@CustomElement({
  name: FIELD_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent]
})
export class FieldComponent extends BaseComponent implements IFieldComponent {
  public static get observedAttributes(): string[] {
    return Object.values(FIELD_CONSTANTS.observedAttributes);
  }

  private _foundation: FieldFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new FieldFoundation(new FieldAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FIELD_CONSTANTS.attributes.LABEL_POSITION:
        this.labelPosition = newValue as FieldLabelPosition;
        break;
      case FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT:
        this.labelAlignment = newValue as FieldLabelAlignment;
        break;
      case FIELD_CONSTANTS.attributes.FLOAT_LABEL:
        this.floatLabel = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.OPTIONAL:
        this.optional = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.VARIANT:
        this.variant = newValue as FieldVariant;
        break;
      case FIELD_CONSTANTS.attributes.THEME:
        this.theme = newValue as FieldTheme;
        break;
      case FIELD_CONSTANTS.attributes.SHAPE:
        this.shape = newValue as FieldShape;
        break;
      case FIELD_CONSTANTS.attributes.DENSITY:
        this.density = newValue as FieldDensity;
        break;
      case FIELD_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.POPOVER_ICON:
        this.popoverIcon = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.POPOVER_EXPANDED:
        this.popoverExpanded = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.MULTILINE:
        this.multiline = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET:
        this.supportTextInset = newValue as FieldSupportTextInset;
        break;
      case FIELD_CONSTANTS.attributes.FOCUS_INDICATOR_FOCUS_MODE:
        this.focusIndicatorFocusMode = newValue as FocusIndicatorFocusMode;
        break;
      case FIELD_CONSTANTS.attributes.FOCUS_INDICATOR_ALLOW_FOCUS:
        this.focusIndicatorAllowFocus = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare labelPosition: FieldLabelPosition;

  @FoundationProperty()
  public declare labelAlignment: FieldLabelAlignment;

  @FoundationProperty()
  public declare floatLabel: boolean;

  @FoundationProperty()
  public declare invalid: boolean;

  @FoundationProperty()
  public declare required: boolean;

  @FoundationProperty()
  public declare optional: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

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
  public declare multiline: boolean;

  @FoundationProperty()
  public declare supportTextInset: FieldSupportTextInset;

  @FoundationProperty()
  public declare focusIndicatorTargetElement: HTMLElement;

  @FoundationProperty()
  public declare focusIndicatorFocusMode: FocusIndicatorFocusMode;

  @FoundationProperty()
  public declare focusIndicatorAllowFocus: boolean;

  public floatLabelWithoutAnimation(value: boolean): void {
    this._foundation.floatLabelWithoutAnimation(value);
  }
}
