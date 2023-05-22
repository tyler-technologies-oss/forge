import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IQuantityFieldAdapter } from './quantity-field-adapter';
import { QUANTITY_FIELD_CONSTANTS } from './quantity-field-constants';

export interface IQuantityFieldFoundation extends ICustomElementFoundation {
  required: boolean;
  invalid: boolean;
}

export class QuantityFieldFoundation implements IQuantityFieldFoundation {
  private _required: boolean;
  private _invalid: boolean;
  private _incrementButtonSlotChanged: () => void;
  private _decrementButtonSlotChanged: () => void;
  private _incrementValue: () => void;
  private _decrementValue: () => void;

  constructor(private _adapter: IQuantityFieldAdapter) {
    this._incrementValue = () => this._adapter.increment();
    this._decrementValue = () => this._adapter.decrement();
    this._incrementButtonSlotChanged = () => this._onIncrementButtonSlotChanged();
    this._decrementButtonSlotChanged = () => this._onDecrementButtonSlotChanged();

    this._adapter.addIncrementButtonSlotListener(this._incrementButtonSlotChanged);
    this._adapter.addDecrementButtonSlotListener(this._decrementButtonSlotChanged);
  }

  public connect(): void {
    this._adapter.addInputDisabledAttributeChangeListener(() => this._syncDisabledStateOfButtons());
    this._syncDisabledStateOfButtons();
    this._adapter.initializeButtons();
  }

  public disconnect(): void {
    this._removeIncrementEventListener();
    this._removeDecrementEventListener();
    this._removeIncrementButtonSlotListener();
    this._removeDecrementButtonSlotListener();
    this._adapter.removeInputDisabledAttributeChangeListener();
  }

  private _onIncrementButtonSlotChanged(): void {
    this._addIncrementEventListener();
  }

  private _onDecrementButtonSlotChanged(): void {
    this._addDecrementEventListener();
  }

  private _addIncrementEventListener(): void {
    this._adapter.addIncrementEventListener('click', this._incrementValue);
  }

  private _addDecrementEventListener(): void {
    this._adapter.addDecrementEventListener('click', this._decrementValue);
  }

  private _removeIncrementEventListener(): void {
    this._adapter.removeIncrementEventListener('click', this._incrementValue);
  }

  private _removeDecrementEventListener(): void {
    this._adapter.removeDecrementEventListener('click', this._decrementValue);
  }

  private _removeIncrementButtonSlotListener(): void {
    this._adapter.removeIncrementButtonSlotListener(this._incrementButtonSlotChanged);
  }

  private _removeDecrementButtonSlotListener(): void {
    this._adapter.removeDecrementButtonSlotListener(this._decrementButtonSlotChanged);
  }

  private _syncDisabledStateOfButtons(): void {
    const isDisabled = this._adapter.inputHasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
    if (isDisabled) {
      this._adapter.addDecrementButtonAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
      this._adapter.addIncrementButtonAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
    } else {
      this._adapter.removeIncrementButtonAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
      this._adapter.removeDecrementButtonAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required === value) {
      return;
    }

    this._required = value;

    if (this._required) {
      this._adapter.setHostAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED);
      this._adapter.addRootClass(QUANTITY_FIELD_CONSTANTS.classes.REQUIRED);
    } else {
      this._adapter.removeHostAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED);
      this._adapter.removeRootClass(QUANTITY_FIELD_CONSTANTS.classes.REQUIRED);
    }
  }

  public get invalid(): boolean {
    return this._invalid;
  }
  public set invalid(value: boolean) {
    if (this._invalid === value) {
      return;
    }

    this._invalid = value;

    if (this._invalid) {
      this._adapter.setHostAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID);
      this._adapter.addRootClass(QUANTITY_FIELD_CONSTANTS.classes.INVALID);
      this._adapter.addTextFieldAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID);
    } else {
      this._adapter.removeHostAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID);
      this._adapter.removeRootClass(QUANTITY_FIELD_CONSTANTS.classes.INVALID);
      this._adapter.removeTextFieldAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID);
    }
  }

}
