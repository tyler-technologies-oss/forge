import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { tylIconArrowDropDown, tylIconCheckBoxOutlineBlank, tylIconCheckBox } from '@tylertech/tyler-icons/standard';
import { SelectAdapter } from './select-adapter';
import { SelectFoundation } from './select-foundation';
import { SELECT_CONSTANTS } from './select-constants';
import { OptionComponent } from '../option';
import { ListComponent, ListItemComponent } from '../../list';
import { OptionGroupComponent } from '../option-group';
import { IconComponent, IconRegistry } from '../../icon';
import { BaseSelectComponent, BASE_SELECT_CONSTANTS } from '../core';
import { CircularProgressComponent } from '../../circular-progress';
import { ScaffoldComponent } from '../../scaffold';
import { ToolbarComponent } from '../../toolbar';
import { IconButtonComponent } from '../../icon-button';
import { FieldDensityType, FieldFloatLabelType, FieldShapeType, FIELD_CONSTANTS } from '../../field/field-constants';
import { IBaseSelectComponent } from '../core/base-select';

import template from './select.html';
import styles from './select.scss';
import { PopoverComponent } from '../../popover';

export interface ISelectComponent extends IBaseSelectComponent {
  density: FieldDensityType;
  floatLabelType: FieldFloatLabelType;
  shape: FieldShapeType;
  invalid: boolean;
  required: boolean;
  label: string;
  disabled: boolean;
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
 */
@CustomElement({
  name: SELECT_CONSTANTS.elementName,
  dependencies: [
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
export class SelectComponent extends BaseSelectComponent<SelectFoundation> implements ISelectComponent {
  public static get observedAttributes(): string[] {
    return [
      FIELD_CONSTANTS.attributes.DENSITY,
      FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE,
      FIELD_CONSTANTS.attributes.SHAPE,
      FIELD_CONSTANTS.attributes.INVALID,
      FIELD_CONSTANTS.attributes.REQUIRED,
      SELECT_CONSTANTS.attributes.LABEL,
      SELECT_CONSTANTS.attributes.MULTIPLE,
      SELECT_CONSTANTS.attributes.VALUE,
      SELECT_CONSTANTS.attributes.DISABLED,
      SELECT_CONSTANTS.attributes.PLACEHOLDER,
      SELECT_CONSTANTS.attributes.OBSERVE_SCROLL,
      SELECT_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD,
      BASE_SELECT_CONSTANTS.attributes.POPUP_CLASSES,
      BASE_SELECT_CONSTANTS.attributes.OPTION_LIMIT,
      BASE_SELECT_CONSTANTS.attributes.SYNC_POPUP_WIDTH,
      BASE_SELECT_CONSTANTS.attributes.CONSTRAIN_POPUP_WIDTH,
      BASE_SELECT_CONSTANTS.attributes.WRAP_OPTION_TEXT
    ];
  }

  constructor() {
    super();
    IconRegistry.define([tylIconArrowDropDown, tylIconCheckBox, tylIconCheckBoxOutlineBlank]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new SelectFoundation(new SelectAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FIELD_CONSTANTS.attributes.DENSITY:
        this.density = newValue as FieldDensityType;
        return;
      case FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE:
        this.floatLabelType = newValue as FieldFloatLabelType;
        return;
      case FIELD_CONSTANTS.attributes.SHAPE:
        this.shape = newValue as FieldShapeType;
        break;
      case FIELD_CONSTANTS.attributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        return;
      case FIELD_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        return;
      case SELECT_CONSTANTS.attributes.LABEL:
        this.label = newValue;
        return;
      case SELECT_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        return;
      case SELECT_CONSTANTS.attributes.PLACEHOLDER:
        this.placeholder = newValue;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /** Gets/sets the label text. */
  @FoundationProperty()
  public declare label: string;

  /** Gets/sets the disabled state. */
  @FoundationProperty()
  public declare disabled: boolean;

  /** Gets/sets the invalid state. */
  @FoundationProperty()
  public declare invalid: boolean;

  /** Gets/sets the required state which controls the visibility of the asterisk in the label. */
  @FoundationProperty()
  public declare required: boolean;

  /** Controls the density type. */
  @FoundationProperty()
  public declare density: FieldDensityType;

  /** Whether the label should always float, never float or float as the user types. */
  @FoundationProperty()
  public declare floatLabelType: FieldFloatLabelType;

  /** The shape type to use. */
  @FoundationProperty()
  public declare shape: FieldShapeType;

  /** Gets/sets the placeholder text. */
  @FoundationProperty()
  public declare placeholder: string;
}
