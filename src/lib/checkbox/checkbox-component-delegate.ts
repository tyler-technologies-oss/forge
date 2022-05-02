import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core';
import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { ICheckboxComponent } from './checkbox';
import { CHECKBOX_CONSTANTS } from './checkbox-constants';

export type CheckboxComponentDelegateProps = Partial<ICheckboxComponent>;
export interface ICheckboxComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  id?: string;
  label?: string;
  checked?: boolean;
}
export interface ICheckboxComponentDelegateConfig extends IBaseComponentDelegateConfig<ICheckboxComponent, ICheckboxComponentDelegateOptions> {}

export class CheckboxComponentDelegate extends FormFieldComponentDelegate<ICheckboxComponent, ICheckboxComponentDelegateOptions> {
  private _inputElement: HTMLInputElement;
  private _labelElement?: HTMLLabelElement;

  constructor(config?: ICheckboxComponentDelegateConfig) {
    super(config);
  }

  public get value(): boolean {
    return this.checked;
  }
  public set value(value: boolean) {
    this.checked = value;
  }

  public get checked(): boolean {
    return this._inputElement.checked;
  }
  public set checked(value: boolean) {
    this._inputElement.checked = value;
  }

  public get disabled(): boolean {
    return this._inputElement.disabled;
  }
  public set disabled(value: boolean) {
    this._inputElement.disabled = value;
  }

  public get inputElement(): HTMLInputElement {
    return this._inputElement;
  }

  public get labelElement(): HTMLLabelElement | undefined {
    return this._labelElement;
  }

  public onChange(listener: (value: boolean) => void): void {
    this._inputElement.addEventListener('change', evt => listener((evt.target as HTMLInputElement).checked));
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._inputElement.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._inputElement.addEventListener('blur', evt => listener(evt));
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

  protected _build(): ICheckboxComponent {
    const checkbox = document.createElement(CHECKBOX_CONSTANTS.elementName);
    this._inputElement = this._buildInputElement();
    checkbox.appendChild(this._inputElement);
    return checkbox;
  }

  protected override _elementReady(): void {
    if (typeof this._config.options?.label === 'string') {
      this._createLabel(this._config.options.label);
    }
  }

  private _createLabel(text: string): void {
    this._labelElement = document.createElement('label');
    this._labelElement.textContent = text;
    if (this._config.options?.id) {
      this._labelElement.setAttribute('for', this._config.options.id);
    }
    this._element.appendChild(this._labelElement);
  }

  private _buildInputElement(): HTMLInputElement {
    const inputElement = document.createElement('input');
    inputElement.type = 'checkbox';

    if (this._config.options?.checked !== undefined) {
      inputElement.checked = this._config.options.checked;
    }
    if (this._config.options?.id) {
      inputElement.id = this._config.options.id;
    }

    return inputElement;
  }
}
