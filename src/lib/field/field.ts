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
