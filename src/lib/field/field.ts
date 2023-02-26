import { FieldDensityType, FieldFloatLabelType, FieldShapeType, FIELD_CONSTANTS } from './field-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { FieldFoundation } from './field-foundation';
import { coerceBoolean, ensureChild, FoundationProperty } from '@tylertech/forge-core';
import { IFormAssociated } from '../core/form/form-associated';

export interface IFieldComponent extends IBaseComponent, IFormAssociated {
  density: FieldDensityType;
  floatLabelType: FieldFloatLabelType;
  shape: FieldShapeType;
  invalid: boolean;
  required: boolean;
  floatLabel(value: boolean): void;
}

export abstract class FieldComponent<T extends FieldFoundation> extends BaseComponent implements IFieldComponent, IFormAssociated {
  public static formAssociated = true;
  public static get observedAttributes(): string[] {
    return [
      FIELD_CONSTANTS.attributes.DENSITY,
      FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE,
      FIELD_CONSTANTS.attributes.SHAPE,
      FIELD_CONSTANTS.attributes.INVALID,
      FIELD_CONSTANTS.attributes.REQUIRED
    ];
  }

  protected _foundation: T;
  public readonly _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    if (this.querySelector(FIELD_CONSTANTS.selectors.INPUT)) {
      this._foundation.initialize();
    } else {
      ensureChild(this, FIELD_CONSTANTS.selectors.INPUT).then(() => this._foundation.initialize());
    }
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
    }
  }

  public formDisabledCallback(isDisabled: boolean): void {
    const input = this.querySelector(FIELD_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    if (input) {
      input.disabled = isDisabled;
    }
  }

  public checkValidity(): void {
    throw new Error('Method not implemented.');
  }

  public reportValidity(): void {
    throw new Error('Method not implemented.');
  }

  public get form(): HTMLElement | null {
    return this._internals.form;
  }

  public get name(): string | null {
    return this.getAttribute('name');
  }

  public get validity(): ValidityState {
    return this._internals.validity;
  }

  public get validationMessage(): string {
    return this._internals.validationMessage;
  }

  public get willValidate(): boolean {
    return this._internals.willValidate;
  }

  /** Controls the density type. */
  @FoundationProperty()
  public declare density: FieldDensityType;

  /** Whether the label should always float, never float or float as the user types. */
  @FoundationProperty()
  public declare floatLabelType: FieldFloatLabelType;

  /** The shape type to use. */
  @FoundationProperty()
  public declare shape: FieldShapeType;

  /** Gets/sets the invalid state. */
  @FoundationProperty()
  public declare invalid: boolean;

  /** Gets/sets the required state which controls the visibility of the asterisk in the label. */
  @FoundationProperty()
  public declare required: boolean;

  /**
   * Controls whether the label should be floating or not.
   * @param {boolean} value
   */
  public floatLabel(value: boolean): void {
    this._foundation.floatLabel(value);
  }
}

