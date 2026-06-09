import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate.js';
import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate.js';
import type { DateTimePickerPublicValue } from '../date-time-picker/date-time-picker-constants.js';
import { DATE_TIME_FIELD_CONSTANTS, type IDateTimeFieldChangeEventData } from './date-time-field-constants.js';
import type { IDateTimeFieldComponent } from './date-time-field.js';

export type DateTimeFieldComponentDelegateProps = Partial<IDateTimeFieldComponent>;
export interface IDateTimeFieldComponentDelegateOptions extends IFormFieldComponentDelegateOptions {}
export interface IDateTimeFieldComponentDelegateConfig extends IBaseComponentDelegateConfig<IDateTimeFieldComponent, IDateTimeFieldComponentDelegateOptions> {}

export class DateTimeFieldComponentDelegate extends FormFieldComponentDelegate<IDateTimeFieldComponent, IDateTimeFieldComponentDelegateOptions> {
  constructor(config?: IDateTimeFieldComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IDateTimeFieldComponent {
    return document.createElement(DATE_TIME_FIELD_CONSTANTS.elementName);
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
