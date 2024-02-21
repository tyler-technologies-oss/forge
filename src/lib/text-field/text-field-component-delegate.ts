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
  placeholder?: string;
  startElement?: HTMLElement;
  endElement?: HTMLElement;
  accessoryElement?: HTMLElement;
  supportTextStart?: string;
  supportTextEndElement?: string;
  // Deprecated properties
  leadingElement?: HTMLElement;
  trailingElement?: HTMLElement;
  helperText?: string;
}
export interface ITextFieldComponentDelegateConfig extends IBaseComponentDelegateConfig<ITextFieldComponent, ITextFieldComponentDelegateOptions> {}

export class TextFieldComponentDelegate extends FormFieldComponentDelegate<ITextFieldComponent, ITextFieldComponentDelegateOptions> {
  private _inputElement: HTMLInputElement;
  private _labelElement?: HTMLLabelElement;
  private _supportTextStartElement?: HTMLSpanElement;
  private _supportTextEndElement?: HTMLSpanElement;

  constructor(config?: ITextFieldComponentDelegateConfig) {
    super(config);
  }

  protected _build(): ITextFieldComponent {
    const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName);

    this._inputElement = this._buildInputElement(textField);

    if (this._config.options?.startElement) {
      this._config.options.startElement.slot = 'start';
      textField.append(this._config.options.startElement);
    }
    if (this._config.options?.leadingElement) {
      this._config.options.leadingElement.slot = 'start';
      textField.append(this._config.options.leadingElement);
    }
    if (this._config.options?.endElement) {
      this._config.options.endElement.slot = 'end';
      textField.append(this._config.options.endElement);
    }
    if (this._config.options?.trailingElement) {
      this._config.options.trailingElement.slot = 'end';
      textField.append(this._config.options.trailingElement);
    }
    if (this._config.options?.accessoryElement) {
      this._config.options.accessoryElement.slot = 'accessory';
      textField.append(this._config.options.accessoryElement);
    }

    textField.append(this._inputElement);
    return textField;
  }

  protected override _configure(): void {}

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
    return this._element.invalid;
  }
  public set invalid(value: boolean) {
    this._element.invalid = value;
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
      return;
    }
    this._labelElement?.remove();
    this._labelElement = undefined;
  }

  public setSupportTextStart(text: string | null): void {
    if (text) {
      if (!this._supportTextStartElement) {
        this._supportTextStartElement = document.createElement('span');
        this._supportTextStartElement.slot = 'support-text-start';
        this._element.append(this._supportTextStartElement);
      }
      this._supportTextStartElement.textContent = text;
      return;
    }
    this._supportTextStartElement?.remove();
    this._supportTextStartElement = undefined;
  }

  // Deprecated alias for `setSupportTextStart`
  public setHelperText(text: string | null): void {
    this.setSupportTextStart(text);
  }

  public setSupportTextEnd(text: string | null): void {
    if (text) {
      if (!this._supportTextEndElement) {
        this._supportTextEndElement = document.createElement('span');
        this._supportTextEndElement.slot = 'support-text-end';
        this._element.append(this._supportTextEndElement);
      }
      this._supportTextEndElement.textContent = text;
      return;
    }
    this._supportTextEndElement?.remove();
    this._supportTextEndElement = undefined;
  }

  public floatLabel(value: boolean): void {
    this._element.floatLabel = value;
  }

  private _createLabel(text: string): void {
    this._labelElement = document.createElement('label');
    this._labelElement.textContent = text;
    this._labelElement.slot = 'label';
    if (this._config.options?.id) {
      this._labelElement.htmlFor = this._config.options.id;
    }
    this._element.append(this._labelElement);
  }

  private _buildInputElement(textField: ITextFieldComponent): HTMLInputElement {
    const inputElement = document.createElement('input');
    inputElement.type = this._config.options?.type ?? 'text';

    if (this._config.options?.value !== undefined) {
      inputElement.value = this._config.options.value;
    }
    if (this._config.options?.id) {
      inputElement.id = this._config.options.id;
    }
    if (this._config.options?.placeholder !== undefined) {
      inputElement.placeholder = this._config.options.placeholder;
    }

    textField.append(inputElement);
    return inputElement;
  }
}
