import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, toggleAttribute } from '@tylertech/forge-core';
import { tylIconArrowDropDown, tylIconCheckBoxOutlineBlank, tylIconCheckBox } from '@tylertech/tyler-icons/standard';
import { SelectAdapter } from './select-adapter';
import { SelectFoundation } from './select-foundation';
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

const BaseClass = WithBaseField(BaseSelectComponent<SelectFoundation>);

/**
 * @tag forge-select
 * 
 * @property {string} label - The label text.
 * @property {string} placeholder - The placeholder text.
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
 * @property {FieldSupportTextInset} supportTextInset - Whether the field's support text is inset from either side.
 */
@CustomElement({
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
export class SelectComponent extends BaseClass implements ISelectComponent {
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

    this._foundation = new SelectFoundation(new SelectAdapter(this));
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

  @FoundationProperty()
  public declare label: string;

  @FoundationProperty()
  public declare placeholder: string;

  public override get floatLabel(): boolean {
    return super.floatLabel;
  }
  public override set floatLabel(value: boolean) {
    this._foundation.syncFloatingLabelState({ force: value });
  }

  public override get density(): FieldDensity {
    return super.density;
  }
  public override set density(value: FieldDensity) {
    super.density = value;
    this._foundation.syncFloatingLabelState();
  }

  public override get dense(): boolean {
    return super.dense;
  }
  public override set dense(value: boolean) {
    super.dense = value;
    this._foundation.syncFloatingLabelState();
  }

  public override get disabled(): boolean {
    return super.disabled;
  }
  public override set disabled(value: boolean) {
    super.disabled = value;
    this._foundation.setDisabled(value);
  }

  public override get labelPosition(): FieldLabelPosition {
    return super.labelPosition;
  }
  public override set labelPosition(value: FieldLabelPosition) {
    super.labelPosition = value;
    this._foundation.syncFloatingLabelState();
  }
}
