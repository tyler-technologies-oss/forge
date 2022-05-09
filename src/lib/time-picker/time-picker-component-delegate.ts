import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate';
import { ITextFieldComponent, ITextFieldComponentDelegateConfig, TextFieldComponentDelegate } from '../text-field';
import { ITimePickerComponent } from './time-picker';
import { TIME_PICKER_CONSTANTS } from './time-picker-constants';

export type TimePickerComponentDelegateProps = Partial<ITimePickerComponent>;
export interface ITimePickerComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  textFieldDelegateConfig?: ITextFieldComponentDelegateConfig;
}
export interface ITimePickerComponentDelegateConfig extends IBaseComponentDelegateConfig<ITimePickerComponent, ITimePickerComponentDelegateOptions> {}

export class TimePickerComponentDelegate extends FormFieldComponentDelegate<ITimePickerComponent, ITimePickerComponentDelegateOptions> {
  private _textFieldDelegate: TextFieldComponentDelegate;

  constructor(config?: ITimePickerComponentDelegateConfig) {
    super(config);
  }

  protected _build(): ITimePickerComponent {
    const timePicker = document.createElement(TIME_PICKER_CONSTANTS.elementName);
    this._attachTextField(timePicker);
    return timePicker;
  }

  public get inputElement(): HTMLInputElement {
    return this._textFieldDelegate.inputElement;
  }

  public get textFieldElement(): ITextFieldComponent {
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
    this._element.addEventListener(TIME_PICKER_CONSTANTS.events.CHANGE, (evt: CustomEvent<string>) => listener(evt.detail ?? ''));
  }

  public onInput(listener: (value: string) => void): void {
    if (this._element.masked) {
      this._element.addEventListener(TIME_PICKER_CONSTANTS.events.INPUT, (evt: CustomEvent<string>) => listener(evt.detail ?? ''));
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

  private _attachTextField(component: ITimePickerComponent): void {
    const textFieldConfig: ITextFieldComponentDelegateConfig = {
      props: { ...this._config.options?.textFieldDelegateConfig?.props },
      options: { ...this._config.options?.textFieldDelegateConfig?.options }
    };
    this._textFieldDelegate = new TextFieldComponentDelegate(textFieldConfig);
    component.appendChild(this._textFieldDelegate.element);
  }
}
