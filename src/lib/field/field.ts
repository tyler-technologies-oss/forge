import { coerceBoolean, ensureChildren, FoundationProperty } from '@tylertech/forge-core';

import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { FIELD_CONSTANTS, FieldDensityType, FieldFloatLabelType, FieldShapeType } from './field-constants';
import { FieldFoundation } from './field-foundation';

export interface IFieldComponent extends IBaseComponent {
  density: FieldDensityType;
  floatLabelType: FieldFloatLabelType;
  shape: FieldShapeType;
  invalid: boolean;
  required: boolean;
  addonEndAlwaysEnabled: boolean;
  floatLabel(value: boolean): void;
}

export abstract class FieldComponent<T extends FieldFoundation> extends BaseComponent implements IFieldComponent {
  public static get observedAttributes(): string[] {
    return [
      FIELD_CONSTANTS.attributes.DENSITY,
      FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE,
      FIELD_CONSTANTS.attributes.SHAPE,
      FIELD_CONSTANTS.attributes.INVALID,
      FIELD_CONSTANTS.attributes.REQUIRED,
      FIELD_CONSTANTS.attributes.ADDON_END_ALWAYS_ENABLED
    ];
  }

  protected _foundation: T;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    if (this.children.length) {
      this._initialize();
    } else {
      ensureChildren(this).then(() => this._initialize());
    }
  }

  private _initialize(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FIELD_CONSTANTS.attributes.DENSITY:
        this.density = newValue as FieldDensityType;
        break;
      case FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE:
        this.floatLabelType = newValue as FieldFloatLabelType;
        break;
      case FIELD_CONSTANTS.attributes.SHAPE:
        this.shape = newValue as FieldShapeType;
        break;
      case FIELD_CONSTANTS.attributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
      case FIELD_CONSTANTS.attributes.ADDON_END_ALWAYS_ENABLED:
        this.addonEndAlwaysEnabled = coerceBoolean(newValue);
        break;
    }
  }

  /** Controls the density type. */
  @FoundationProperty()
  public density: FieldDensityType;

  /** Whether the label should always float, never float or float as the user types. */
  @FoundationProperty()
  public floatLabelType: FieldFloatLabelType;

  /** The shape type to use. */
  @FoundationProperty()
  public shape: FieldShapeType;

  /** Gets/sets the invalid state. */
  @FoundationProperty()
  public invalid: boolean;

  /** Gets/sets the required state which controls the visibility of the asterisk in the label. */
  @FoundationProperty()
  public required: boolean;

  /** Gets/sets addonEndAlawysEnabled which controls whether the addon end slot should remain enabled when the control is otherwise disabled.. */
  @FoundationProperty()
  public addonEndAlwaysEnabled: boolean;

  /**
   * Controls whether the label should be floating or not.
   * @param {boolean} value
   */
  public floatLabel(value: boolean): void {
    this._foundation.floatLabel(value);
  }
}

