import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate';
import { IconButtonComponentDelegate } from '../icon-button';
import { ITextFieldComponentDelegateConfig, TextFieldComponentDelegate } from '../text-field/text-field-component-delegate';
import { IQuantityFieldComponent } from './quantity-field';
import { QUANTITY_FIELD_CONSTANTS } from './quantity-field-constants';
import { tylIconRemoveCircleOutline, tylIconControlPoint } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '../icon';

export type QuantityFieldComponentDelegateProps = Partial<IQuantityFieldComponent>;
export interface IQuantityFieldComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  id?: string;
  label?: string;
  value?: string;
  step?: string;
  helperText?: string;
  textFieldDelegateConfig?: ITextFieldComponentDelegateConfig;
}
export interface IQuantityFieldComponentDelegateConfig extends IBaseComponentDelegateConfig<IQuantityFieldComponent, IQuantityFieldComponentDelegateOptions> {}

export class QuantityFieldComponentDelegate extends FormFieldComponentDelegate<IQuantityFieldComponent, IQuantityFieldComponentDelegateOptions> {
  private _textFieldDelegate: TextFieldComponentDelegate;
  private _labelElement: HTMLLabelElement | undefined;
  private _helperTextElement: HTMLSpanElement | undefined;

  constructor(config?: IQuantityFieldComponentDelegateConfig) {
    super(config);
    IconRegistry.define([tylIconRemoveCircleOutline, tylIconControlPoint]);
  }

  protected _build(): IQuantityFieldComponent {
    const quantityField = document.createElement(QUANTITY_FIELD_CONSTANTS.elementName);
    this._attachButton(quantityField, tylIconRemoveCircleOutline.name, 'decrement-button');
    this._attachTextField(quantityField);
    this._attachButton(quantityField, tylIconControlPoint.name,  'increment-button');
    return quantityField;
  }

  protected override _configure(): void {
    this.inputElement.value = this._config.options?.value ?? '0';
    this.inputElement.style.textAlign = 'center';
    this.inputElement.style.width = '64px';

    if (this._config.options?.helperText) {
      this.setHelperText(this._config.options.helperText);
    }
    if (typeof this._config.options?.label === 'string') {
      this._createLabel(this._config.options.label);
    }
    if (this._config.options?.step !== undefined) {
      this.inputElement.step = this._config.options.step;
    }
  }

  public get value(): string {
    return this._textFieldDelegate.inputElement.value;
  }
  public set value(value: string) {
    this._textFieldDelegate.inputElement.value = value;
  }

  public get disabled(): boolean {
    return this._textFieldDelegate.inputElement.disabled;
  }
  public set disabled(value: boolean) {
    this._textFieldDelegate.inputElement.disabled = value;
  }

  public get invalid(): boolean {
    return this._element.invalid || false;
  }
  public set invalid(value: boolean) {
    this._element.invalid = value;
  }

  public get inputElement(): HTMLInputElement {
    return this._textFieldDelegate.inputElement;
  }

  public get labelElement(): HTMLLabelElement | undefined {
    return this._labelElement;
  }

  public onChange(listener: (value: string) => void): void {
    this._textFieldDelegate.inputElement.addEventListener('input', evt => listener((evt.target as HTMLInputElement).value));
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._textFieldDelegate.inputElement.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._textFieldDelegate.inputElement.addEventListener('blur', evt => listener(evt));
  }

  private _attachTextField(quantityField: IQuantityFieldComponent): void {
    const textFieldConfig: ITextFieldComponentDelegateConfig = {
      props: { ...this._config.options?.textFieldDelegateConfig?.props },
      options: {
        ...this._config.options?.textFieldDelegateConfig?.options,
        id: this._config.options?.id,
        type: 'number'
      }
    };
    this._textFieldDelegate = new TextFieldComponentDelegate(textFieldConfig);
    quantityField.appendChild(this._textFieldDelegate.element);
  }

  public setLabel(text: string | null): void {
    if (text) {
      if (this._labelElement) {
        this._labelElement.textContent = text;
      } else {
        this._createLabel(text);
      }
    } else if (this._labelElement) {
      this._element.removeChild(this._labelElement);
      this._labelElement = undefined;
    }
  }

  public setHelperText(text: string | null): void {
    if (text) {
      if (!this._helperTextElement) {
        this._helperTextElement = document.createElement('span');
        this._helperTextElement.slot = 'helper-text';
        this._element.appendChild(this._helperTextElement);
      }
      this._helperTextElement.textContent = text;
    } else if (this._helperTextElement) {
      this._element.removeChild(this._helperTextElement);
      this._helperTextElement = undefined;
    }
  }

  private _createLabel(text: string): void {
    this._labelElement = document.createElement('label');
    this._labelElement.textContent = text;
    this._labelElement.slot = 'label';
    if (this._config.options?.id) {
      this._labelElement.setAttribute('for', this._config.options.id);
    }
    this._element.appendChild(this._labelElement);
  }

  private _attachButton(parent: HTMLElement, iconName: string, slot: string): IconButtonComponentDelegate {
    const iconButtonDelegate = new IconButtonComponentDelegate({
      options: {
        iconName,
        parent,
        attributes: { slot }
      }
    });
    return iconButtonDelegate;
  }
}
