import { customElement, attachShadowTemplate, coreProperty, coerceBoolean, toggleAttribute } from '@tylertech/forge-core';
import { tylIconArrowDropDown, tylIconCheckBoxOutlineBlank, tylIconCheckBox } from '@tylertech/tyler-icons/standard';
import { SelectAdapter } from './select-adapter';
import { SelectCore } from './select-core';
import { SELECT_CONSTANTS } from './select-constants';
import { OptionComponent } from '../option';
import { ListComponent, ListItemComponent } from '../../list';
import { OptionGroupComponent } from '../option-group';
import { IconComponent, IconRegistry } from '../../icon';
import { BaseSelectComponent, BASE_SELECT_CONSTANTS, IBaseSelectComponent } from '../core';
import { CircularProgressComponent } from '../../circular-progress';
import { ScaffoldComponent } from '../../scaffold';
import { ToolbarComponent } from '../../toolbar';
import { IconButtonComponent } from '../../icon-button';
import { PopoverComponent } from '../../popover';
import { BASE_FIELD_CONSTANTS, FieldComponent, FieldDensity, FieldLabelPosition, FIELD_CONSTANTS } from '../../field';
import { IWithBaseField, WithBaseField } from '../../field/base/with-base-field';

import template from './select.html';
import styles from './select.scss';

export interface ISelectComponent extends IWithBaseField, IBaseSelectComponent {
  label: string;
  placeholder: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-select': ISelectComponent;
  }

  interface HTMLElementEventMap {
    'forge-select-scrolled-bottom': CustomEvent<void>;
    'change': CustomEvent<any>;
  }
}

/**
 * @tag forge-select
 * 
 * @dependency forge-field
 * @dependency forge-option
 * @dependency forge-option-group
 * @dependency forge-popover
 * @dependency forge-list
 * @dependency forge-list-item
 * @dependency forge-circular-progress
 * @dependency forge-icon
 * @dependency forge-scaffold
 * @dependency forge-toolbar
 * @dependency forge-icon-button
 * 
 * @globalconfig labelPosition
 * 
 * @event {CustomEvent<void>} forge-select-scrolled-bottom - Dispatched when the dropdown list has scrolled to the bottom.
 * @event {CustomEvent<any>} change - Dispatched when the user selects a value.
 * 
 * @property {string} label - Controls the label text.
 * @property {string} placeholder - Controls the placeholder text.
 * @property {any} value - Gets/sets the value.
 * @property {number | number[]} selectedIndex - Gets/sets the selected index.
 * @property {ISelectOption[] | ISelectOptionGroup[]} options - Gets/sets the available options.
 * @property {boolean} multiple - Gets/sets the multiple select state.
 * @property {boolean} open - Gets/sets the open state.
 * @property {SelectOptionBuilder} optionBuilder - Gets/sets the option builder function.
 * @property {SelectSelectedTextBuilder} selectedTextBuilder - Gets/sets the selected text builder function.
 * @property {SelectBeforeValueChangeCallback<any>} beforeValueChange - Gets/sets the before value change callback.
 * 
 * @attribute {string} label - Controls the label text.
 * @attribute {string} placeholder - Controls the placeholder text.
 * @attribute {any} value - Gets/sets the value.
 * @attribute {number | number[]} selected-index - Gets/sets the selected index.
 * @attribute {boolean} multiple - Gets/sets the multiple select state.
 * @attribute {boolean} open - Gets/sets the open state.
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
 * @csspart text-container - The element container for the selected text.
 * @csspart text - The element containing the selected text.
 * @csspart container - The container element surrounding the input.
 * @csspart input - The element containing te input slot.
 * @csspart start - The element containing the start slot.
 * @csspart end - The element containing the end slot.
 * @csspart popover-icon - The popover icon element.
 * @csspart accessory - The element containing the accessory slot.
 * @csspart support-text - The support text element.
 * @csspart support-text - The element containing the support text slot.
 * @csspart support-text-end - The element containing the support text end slot.
 * @csspart focus-indicator - The focus indicator element.
 * 
 * @slot - The default/unnamed slot for the field's input.
 * @slot label - Renders its content as a positioned label.
 * @slot start - Typically reserved for content/icons that render logically before the default slot content.
 * @slot end - Typically reserved content/icons that render logically after the default slot content.
 * @slot clear-button - Content slotted here replaces the default clear button.
 * @slot clear-button-tooltip - Sets the text content of the clear button's tooltip and accessible label.
 * @slot accessory - Used for content such as a button that is logically connected to the field but should appear distinct from the input.
 * @slot support-text - Used for content that provides additional information about the field. Aligns to the inline start of the field.
 * @slot support-text-end - Used for content that provides additional information about the field. Aligns to the inline end of the field.
 */
@customElement({
  name: SELECT_CONSTANTS.elementName,
  dependencies: [
    FieldComponent,
    OptionComponent,
    OptionGroupComponent,
    PopoverComponent,
    ListComponent,
    ListItemComponent,
    CircularProgressComponent,
    IconComponent,
    ScaffoldComponent,
    ToolbarComponent,
    IconButtonComponent
  ]
})
export class SelectComponent extends WithBaseField(BaseSelectComponent<SelectCore>) implements ISelectComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BASE_FIELD_CONSTANTS.observedAttributes),
      ...Object.values(SELECT_CONSTANTS.observedAttributes),
      ...Object.values(BASE_SELECT_CONSTANTS.observedAttributes)
    ];
  }

  constructor() {
    super();
    IconRegistry.define([tylIconArrowDropDown, tylIconCheckBox, tylIconCheckBoxOutlineBlank]);
    attachShadowTemplate(this, template, styles);

    // Needed by WithBaseField mixin to proxy state to the field component
    const fieldEl = this.shadowRoot?.querySelector(FIELD_CONSTANTS.elementName) as FieldComponent;
    this.initializeFieldInstance(fieldEl);

    this._core = new SelectCore(new SelectAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SELECT_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        return;
      case SELECT_CONSTANTS.observedAttributes.LABEL:
        this.label = newValue;
        return;
      case SELECT_CONSTANTS.observedAttributes.PLACEHOLDER:
        this.placeholder = newValue;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @coreProperty()
  public declare label: string;

  @coreProperty()
  public declare placeholder: string;

  public override get floatLabel(): boolean {
    return super.floatLabel;
  }
  public override set floatLabel(value: boolean) {
    this._core.syncFloatingLabelState({ force: value });
  }

  public override get density(): FieldDensity {
    return super.density;
  }
  public override set density(value: FieldDensity) {
    super.density = value;
    this._core.syncFloatingLabelState();
  }

  public override get dense(): boolean {
    return super.dense;
  }
  public override set dense(value: boolean) {
    super.dense = value;
    this._core.syncFloatingLabelState();
  }

  public override get disabled(): boolean {
    return super.disabled;
  }
  public override set disabled(value: boolean) {
    super.disabled = value;
    this._core.setDisabled(value);
  }

  public override get labelPosition(): FieldLabelPosition {
    return super.labelPosition;
  }
  public override set labelPosition(value: FieldLabelPosition) {
    super.labelPosition = value;
    this._core.syncFloatingLabelState();
  }
}
