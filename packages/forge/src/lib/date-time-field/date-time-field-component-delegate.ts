import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate.js';
import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate.js';
import type { DateTimePickerPublicValue } from '../date-time-picker/date-time-picker-constants.js';
import { ITextFieldComponent, ITextFieldComponentDelegateConfig, TextFieldComponentDelegate } from '../text-field/index.js';
import { DATE_TIME_FIELD_CONSTANTS, type IDateTimeFieldChangeEventData } from './date-time-field-constants.js';
import type { IDateTimeFieldComponent } from './date-time-field.js';

export type DateTimeFieldComponentDelegateProps = Partial<IDateTimeFieldComponent>;
export interface IDateTimeFieldComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  textFieldDelegateConfig?: ITextFieldComponentDelegateConfig;
}
export interface IDateTimeFieldComponentDelegateConfig extends IBaseComponentDelegateConfig<IDateTimeFieldComponent, IDateTimeFieldComponentDelegateOptions> {}

export class DateTimeFieldComponentDelegate extends FormFieldComponentDelegate<IDateTimeFieldComponent, IDateTimeFieldComponentDelegateOptions> {
  private _textFieldDelegate: TextFieldComponentDelegate;

  constructor(config?: IDateTimeFieldComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IDateTimeFieldComponent {
    const field = document.createElement(DATE_TIME_FIELD_CONSTANTS.elementName);
    this._textFieldDelegate = new TextFieldComponentDelegate({
      props: { ...this._config.options?.textFieldDelegateConfig?.props },
      options: { ...this._config.options?.textFieldDelegateConfig?.options }
    });
    // Range modes take a second endpoint input.
    const { dateMode, timeMode } = this._config.props ?? {};
    if (timeMode !== 'slots' && (dateMode === 'range' || timeMode === 'range')) {
      const endInput = document.createElement('input');
      endInput.type = 'text';
      this._textFieldDelegate.inputElement.after(endInput);
    }
    field.appendChild(this._textFieldDelegate.element);
    return field;
  }

  public getInputElements(): HTMLInputElement[] {
    return Array.from(this._textFieldDelegate.element.querySelectorAll(':scope > input'));
  }

  public getTextFieldElement(): ITextFieldComponent {
    return this._textFieldDelegate.element;
  }

  public get value(): DateTimePickerPublicValue {
    return this._element.value;
  }
  public set value(value: DateTimePickerPublicValue) {
    this._element.value = value;
  }

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
  }

  public onChange(listener: (value: DateTimePickerPublicValue) => void, options?: AddEventListenerOptions): void {
    this._element.addEventListener(
      DATE_TIME_FIELD_CONSTANTS.events.CHANGE,
      (evt: Event) => listener((evt as CustomEvent<IDateTimeFieldChangeEventData>).detail.value),
      options
    );
  }

  public onFocus(listener: (evt: Event) => void, options?: AddEventListenerOptions): void {
    this._element.addEventListener('focusin', listener, options);
  }

  public onBlur(listener: (evt: Event) => void, options?: AddEventListenerOptions): void {
    this._element.addEventListener('focusout', listener, options);
  }
}
