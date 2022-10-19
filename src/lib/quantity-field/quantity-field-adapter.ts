import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IQuantityFieldComponent } from './quantity-field';
import { getShadowElement, Platform } from '@tylertech/forge-core';
import { QUANTITY_FIELD_CONSTANTS } from './quantity-field-constants';
import { TextFieldComponent } from '../text-field';

export interface IQuantityFieldAdapter extends IBaseAdapter {
  addRootClass(name: string): void;
  removeRootClass(name: string): void;
  inputHasAttribute(name: string): boolean;
  addIncrementButtonSlotListener(listener: () => void): void;
  removeIncrementButtonSlotListener(listener: () => void): void;
  addDecrementButtonSlotListener(listener: (evt: Event) => void): void;
  removeDecrementButtonSlotListener(listener: (evt: Event) => void): void;
  addIncrementEventListener(event: string, callback: (event: Event) => void): void;
  addDecrementEventListener(event: string, callback: (event: Event) => void): void;
  removeIncrementEventListener(event: string, callback: (event: Event) => void): void;
  removeDecrementEventListener(event: string, callback: (event: Event) => void): void;
  addIncrementButtonAttribute(name: string, value?: string): void;
  removeIncrementButtonAttribute(name: string): void;
  addDecrementButtonAttribute(name: string, value?: string): void;
  removeDecrementButtonAttribute(name: string): void;
  addInputDisabledAttributeChangeListener(callback: () => void): void;
  addTextFieldAttribute(name: string, value?: string): void;
  removeTextFieldAttribute(name: string): void;
  removeInputDisabledAttributeChangeListener(): void;
  increment(): void;
  decrement(): void;
}

export class QuantityFieldAdapter extends BaseAdapter<IQuantityFieldComponent> implements IQuantityFieldAdapter {
  private _rootElement: HTMLElement;
  private _incrementButtonSlot: HTMLSlotElement;
  private _decrementButtonSlot: HTMLSlotElement;
  private _incrementButton: HTMLButtonElement;
  private _decrementButton: HTMLButtonElement;
  private _textField: TextFieldComponent;
  private _inputElement: HTMLInputElement | null;
  private _inputAttributeMutationObserver: MutationObserver | undefined;

  constructor(component: IQuantityFieldComponent) {
    super(component);
    this._rootElement = getShadowElement(component, QUANTITY_FIELD_CONSTANTS.selectors.ROOT);
    this._incrementButtonSlot = getShadowElement(this._component, QUANTITY_FIELD_CONSTANTS.selectors.INCREMENT_BUTTON_SLOT) as HTMLSlotElement;
    this._decrementButtonSlot = getShadowElement(this._component, QUANTITY_FIELD_CONSTANTS.selectors.DECREMENT_BUTTON_SLOT) as HTMLSlotElement;
  }

  public addRootClass(name: string): void {
    this._rootElement.classList.add(name);
  }

  public removeRootClass(name: string): void {
    this._rootElement.classList.remove(name);
  }

  public inputHasAttribute(name: string): boolean {
    if (!this.inputElement) {
      return false;
    }

    return this.inputElement.hasAttribute(name);
  }

  public addIncrementButtonSlotListener(listener: () => void): void {
    this._incrementButtonSlot.addEventListener('slotchange', listener);
  }

  public removeIncrementButtonSlotListener(listener: () => void): void {
    if (this._incrementButtonSlot) {
      this._incrementButtonSlot.removeEventListener('slotchange', listener);
    }
  }

  public addDecrementButtonSlotListener(listener: (evt: Event) => void): void {
    this._decrementButtonSlot.addEventListener('slotchange', listener);
  }

  public removeDecrementButtonSlotListener(listener: (evt: Event) => void): void {
    if (this._decrementButtonSlot) {
      this._decrementButtonSlot.removeEventListener('slotchange', listener);
    }
  }

  public addTextFieldAttribute(name: string, value = ''): void {
    if (this._textFieldComponent) {
      this._textFieldComponent.setAttribute(name, value);
    }
  }

  public removeTextFieldAttribute(name: string): void {
    if (this._textFieldComponent) {
      this._textFieldComponent.removeAttribute(name);
    }
  }

  public addIncrementEventListener(event: string, callback: (event: Event) => void): void {
    this._incrementButtonElement.addEventListener(event, callback);
  }

  public removeIncrementEventListener(event: string, callback: (event: Event) => void): void {
    if (this._incrementButtonElement) {
      this._incrementButtonElement.removeEventListener(event, callback);
    }
  }

  public addDecrementEventListener(event: string, callback: (event: Event) => void): void {
    this._decrementButtonElement.addEventListener(event, callback);
  }

  public removeDecrementEventListener(event: string, callback: (event: Event) => void): void {
    if (this._decrementButtonElement) {
      this._decrementButtonElement.removeEventListener(event, callback);
    }
  }

  public addIncrementButtonAttribute(name: string, value = ''): void {
    this._incrementButtonElement.setAttribute(name, value);
  }

  public removeIncrementButtonAttribute(name: string): void {
    this._incrementButtonElement.removeAttribute(name);
  }

  public addDecrementButtonAttribute(name: string, value = ''): void {
    this._decrementButtonElement.setAttribute(name, value);
  }

  public removeDecrementButtonAttribute(name: string): void {
    this._decrementButtonElement.removeAttribute(name);
  }

  public increment(): void {
    const input = this.inputElement;
    if (!input) {
      return;
    }

    const curValue = +input.value;
    const precision = this._calcPrecision(this._inputStep);
    let newValue = parseFloat((curValue + this._inputStep).toFixed(precision));
    if (!!this._inputMax && this._inputMax < newValue) {
      newValue = this._inputMax;
    }

    this._setInputValue(newValue);
  }

  public decrement(): void {
    const input = this.inputElement;
    if (!input) {
      return;
    }

    const curValue = +input.value;
    const precision = this._calcPrecision(this._inputStep);
    let newValue = parseFloat((curValue - this._inputStep).toFixed(precision));
    if (!!this._inputMin && this._inputMin > newValue) {
      newValue = this._inputMin;
    }

    this._setInputValue(newValue);
  }

  public addInputDisabledAttributeChangeListener(callback: () => void): void {
    this._setupInputDisabledAttributeMutationObserver(callback);
  }

  public removeInputDisabledAttributeChangeListener(): void {
    this._cleanupInputDisabledAttributeMutationObserver();
  }

  private _setInputValue(value: string | number): void {
    if (!this.inputElement) {
      return;
    }

    this.inputElement.value = `${value}`;
    this.inputElement.dispatchEvent(new Event('input'));
    this.inputElement.dispatchEvent(new Event('change'));
  }

  private _isNullOrUndefinedOrEmpty(value: any): value is null | undefined {
    return value === null || value === undefined || value === '';
  }

  private _setupInputDisabledAttributeMutationObserver(callback: () => void): void {
    if (!this.inputElement) {
      return;
    }

    this._cleanupInputDisabledAttributeMutationObserver();
    const mutationCallback = (mutationRecords: MutationRecord[]): void => this._inputDisabledAttributeMutationCallback(mutationRecords, callback);
    this._inputAttributeMutationObserver = new MutationObserver(mutationCallback);
    const mutationOptions: MutationObserverInit = {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: [QUANTITY_FIELD_CONSTANTS.attributes.DISABLED]
    };
    this._inputAttributeMutationObserver.observe(this.inputElement, mutationOptions);
  }

  private _cleanupInputDisabledAttributeMutationObserver(): void {
    if (this._inputAttributeMutationObserver) {
      this._inputAttributeMutationObserver.disconnect();
      delete this._inputAttributeMutationObserver;
    }
  }

  private _inputDisabledAttributeMutationCallback(mutationRecords: MutationRecord[], callback: () => void): void {
    for (const mutationRecord of mutationRecords) {
      // Skip:
      //   - Non-attribute mutations.
      //   - Mutations without an attribute name.
      //   - Mutations without a matching attribute name.
      //   - Mutations that did not change the attribute value.
      if (mutationRecord.type !== 'attributes'
        || !mutationRecord.attributeName
        || mutationRecord.attributeName !== QUANTITY_FIELD_CONSTANTS.attributes.DISABLED
        || mutationRecord.target[mutationRecord.attributeName] === mutationRecord.oldValue) {
        continue;
      }

      callback();
    }
  }

  private get _incrementButtonElement(): HTMLButtonElement {
    if (!this._incrementButton) {
      this._incrementButton = this._component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.INCREMENT_BUTTON) as HTMLButtonElement;
    }
    return this._incrementButton;
  }

  private get _decrementButtonElement(): HTMLButtonElement {
    if (!this._decrementButton) {
      this._decrementButton = this._component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.DECREMENT_BUTTON) as HTMLButtonElement;
    }
    return this._decrementButton;
  }

  private get _textFieldComponent(): TextFieldComponent {
    if (!this._textField) {
      this._textField = this._component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.TEXT_FIELD) as TextFieldComponent;
    }
    return this._textField;
  }

  public get inputElement(): HTMLInputElement | null {
    if (!this._inputElement) {
      this._inputElement = this._component.querySelector<HTMLInputElement>(QUANTITY_FIELD_CONSTANTS.selectors.INPUT);
    }
    return this._inputElement;
  }

  private get _inputStep(): number {
    const input = this.inputElement;
    if (!input || this._isNullOrUndefinedOrEmpty(input.step)) {
      return 1;
    }

    return +input.step;
  }

  private get _inputMax(): number | null {
    const input = this.inputElement;
    if (!input || this._isNullOrUndefinedOrEmpty(input.max)) {
      return null;
    }

    return +input.max;
  }

  private get _inputMin(): number | null {
    const input = this.inputElement;
    if (!input || this._isNullOrUndefinedOrEmpty(input.min)) {
      return null;
    }

    return +input.min;
  }

  private _calcPrecision(value: number): number {
    const strVal = String(value);
    if (strVal.includes('.')) {
      return strVal.split('.')[1].length;
    }
    return 0;
  }
}
