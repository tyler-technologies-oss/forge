import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate';
import { ITextFieldComponent } from './text-field';
import { TEXT_FIELD_CONSTANTS } from './text-field-constants';

export type TextFieldComponentDelegateProps = Partial<ITextFieldComponent>;
export interface ITextFieldComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  id?: string;
  label?: string;
  type?: string;
  value?: string;
  helperText?: string;
  placeholder?: string;
  leadingElement?: HTMLElement;
  trailingElement?: HTMLElement;
}
export interface ITextFieldComponentDelegateConfig extends IBaseComponentDelegateConfig<ITextFieldComponent, ITextFieldComponentDelegateOptions> {}

export class TextFieldComponentDelegate extends FormFieldComponentDelegate<ITextFieldComponent, ITextFieldComponentDelegateOptions> {
  private _inputElement: HTMLInputElement;
  private _labelElement: HTMLLabelElement | undefined;
  private _helperTextElement: HTMLSpanElement | undefined;

  constructor(config?: ITextFieldComponentDelegateConfig) {
    super(config);
  }

  protected _build(): ITextFieldComponent {
    const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName);

    this._inputElement = this._buildInputElement(textField);

    if (this._config.options?.leadingElement) {
      this._config.options.leadingElement.slot = 'leading';
      textField.appendChild(this._config.options.leadingElement);
    }
    if (this._config.options?.trailingElement) {
      this._config.options.trailingElement.slot = 'trailing';
      textField.appendChild(this._config.options.trailingElement);
    }

    textField.appendChild(this._inputElement);
    return textField;
  }

  protected override _configure(): void {
    if (this._config.options?.helperText) {
      this.setHelperText(this._config.options.helperText);
    }
    if (typeof this._config.options?.label === 'string') {
      this._createLabel(this._config.options.label);
    }
  }

  public get value(): string {
    return this._inputElement.value;
  }
  public set value(value: string) {
    this._inputElement.value = value;
  }

  public get disabled(): boolean {
    return this._inputElement.disabled;
  }
  public set disabled(value: boolean) {
    this._inputElement.disabled = value;
  }

  public get invalid(): boolean {
    return this._element.invalid || false;
  }
  public set invalid(value: boolean) {
    this._element.invalid = value;
  }

  public get inputElement(): HTMLInputElement {
    return this._inputElement;
  }

  public get labelElement(): HTMLLabelElement | undefined {
    return this._labelElement;
  }

  public onChange(listener: (value: string) => void): void {
    this._inputElement.addEventListener('input', evt => listener((evt.target as HTMLInputElement).value));
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

  public floatLabel(value: boolean): void {
    this._element.floatLabel(value);
  }

  private _createLabel(text: string): void {
    this._labelElement = document.createElement('label');
    this._labelElement.textContent = text;
    if (this._config.options?.id) {
      this._labelElement.setAttribute('for', this._config.options.id);
    }
    this._element.appendChild(this._labelElement);
  }

  private _buildInputElement(textField: ITextFieldComponent): HTMLInputElement {
    const inputElement = document.createElement('input');
    inputElement.type = this._config.options?.type || 'text';

    if (this._config.options?.value !== undefined) {
      inputElement.value = this._config.options.value;
    }
    if (this._config.options?.id) {
      inputElement.id = this._config.options.id;
    }
    if (typeof this._config.options?.placeholder === 'string') {
      inputElement.placeholder = this._config.options?.placeholder;
    }

    textField.appendChild(inputElement);
    return inputElement;
  }
}
