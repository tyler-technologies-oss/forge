import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate.js';
import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate.js';
import { ITextFieldComponent, ITextFieldComponentDelegateConfig, TextFieldComponentDelegate } from '../text-field/index.js';
import { IDatePickerComponent } from './date-picker.js';
import { DATE_PICKER_CONSTANTS } from './date-picker-constants.js';

export type DatePickerComponentDelegateProps = Partial<IDatePickerComponent>;
export interface IDatePickerComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  useDropdownIcon?: boolean;
  textFieldDelegateConfig?: ITextFieldComponentDelegateConfig;
}
export interface IDatePickerComponentDelegateConfig extends IBaseComponentDelegateConfig<IDatePickerComponent, IDatePickerComponentDelegateOptions> {}

export class DatePickerComponentDelegate extends FormFieldComponentDelegate<IDatePickerComponent, IDatePickerComponentDelegateOptions> {
  private _textFieldDelegate: TextFieldComponentDelegate;

  constructor(config?: IDatePickerComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IDatePickerComponent {
    const datePicker = document.createElement(DATE_PICKER_CONSTANTS.elementName);
    this._attachTextField(datePicker);
    return datePicker;
  }

  public getInputElement(): HTMLInputElement {
    return this._textFieldDelegate.inputElement;
  }

  public getTextFieldElement(): ITextFieldComponent {
    return this._textFieldDelegate.element;
  }

  public get value(): any {
    return this._element.value;
  }
  public set value(value: any) {
    this._element.value = value;
  }

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
  }

  public get invalid(): boolean {
    return this._textFieldDelegate.invalid || false;
  }
  public set invalid(value: boolean) {
    this._textFieldDelegate.invalid = value;
  }

  public onChange(listener: (value: string) => void): void {
    if (this._element.masked) {
      this._element.addEventListener(DATE_PICKER_CONSTANTS.events.INPUT, evt => listener((evt.target as HTMLInputElement).value));
    } else {
      this.getInputElement().addEventListener('input', evt => listener((evt.target as HTMLInputElement).value));
    }
  }

  public onInput(listener: (value: string) => void): void {
    if (this._element.masked) {
      this._element.addEventListener(DATE_PICKER_CONSTANTS.events.INPUT, (evt: CustomEvent) => listener(evt.detail));
    } else {
      this._textFieldDelegate.inputElement.addEventListener('input', evt => listener((evt.target as HTMLInputElement).value));
    }
  }

  public onFocus(listener: (evt: FocusEvent) => void): void {
    this._textFieldDelegate.inputElement.addEventListener('focus', (evt: FocusEvent) => listener(evt));
  }

  public onBlur(listener: (evt: FocusEvent) => void): void {
    this._textFieldDelegate.inputElement.addEventListener('blur', (evt: FocusEvent) => listener(evt));
  }

  private _attachTextField(datePicker: IDatePickerComponent): void {
    const textFieldConfig: ITextFieldComponentDelegateConfig = {
      props: { ...this._config.options?.textFieldDelegateConfig?.props },
      options: { ...this._config.options?.textFieldDelegateConfig?.options }
    };
    this._textFieldDelegate = new TextFieldComponentDelegate(textFieldConfig);
    datePicker.appendChild(this._textFieldDelegate.element);
  }
}
