import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions, IBaseComponentDelegateConfig } from '../core/delegates';
import { FieldDensityType } from '../field/field-constants';
import { ITextFieldComponent, TEXT_FIELD_CONSTANTS } from '../text-field';
import { IDateRangePickerComponent } from './date-range-picker';
import { DATE_RANGE_PICKER_CONSTANTS, IDateRangePickerChangeEventData } from './date-range-picker-constants';

export type DateRangePickerComponentDelegateProps = Partial<IDateRangePickerComponent>;
export interface IDateRangePickerComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  useDropdownIcon?: boolean;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  label?: string;
  required?: boolean;
  density?: FieldDensityType;
}
export interface IDateRangePickerComponentDelegateConfig extends IBaseComponentDelegateConfig<IDateRangePickerComponent, IDateRangePickerComponentDelegateOptions> {}

export class DateRangeComponentDelegate extends FormFieldComponentDelegate<IDateRangePickerComponent, IDateRangePickerComponentDelegateOptions> {
  private _textField: ITextFieldComponent;
  private _fromInput: HTMLInputElement;
  private _toInput: HTMLInputElement;

  constructor(config?: IDateRangePickerComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IDateRangePickerComponent {
    const dateRangePicker = document.createElement(DATE_RANGE_PICKER_CONSTANTS.elementName) as IDateRangePickerComponent;
    this._attachTextField(dateRangePicker);
    return dateRangePicker;
  }

  public get fromInput(): HTMLInputElement {
    return this._textField.querySelector(`input[${TEXT_FIELD_CONSTANTS.attributes.MULTI_INPUT}-0]`) as HTMLInputElement;
  }

  public get toInput(): HTMLInputElement {
    return this._textField.querySelector(`input[${TEXT_FIELD_CONSTANTS.attributes.MULTI_INPUT}-1]`) as HTMLInputElement;
  }

  public get textField(): ITextFieldComponent {
    return this._textField;
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
    return this._textField.invalid || false;
  }
  public set invalid(value: boolean) {
    this._textField.invalid = value;
  }

  public onChange(listener: (value: IDateRangePickerChangeEventData) => void): void {
    this._element.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, (evt: CustomEvent<IDateRangePickerChangeEventData>) => listener(evt.detail));
  }

  public onFocus(listener: (evt: FocusEvent) => void): void {
    this._element.addEventListener('focusin', (evt: FocusEvent) => {
      const isFocusWithin = !this._element.contains(evt.relatedTarget as Node);
      if (isFocusWithin) {
        listener(evt);
      }
    });
  }

  public onBlur(listener: (evt: FocusEvent) => void): void {
    this._element.addEventListener('focusout', (evt: FocusEvent) => {
      const isFocusOutside = !this._element.contains(evt.relatedTarget as Node);
      if (isFocusOutside) {
        listener(evt);
      }
    });
  }

  private _attachTextField(dateRangePicker: IDateRangePickerComponent): void {
    this._textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName);

    if (this._config.options?.required) {
      this._textField.required = true;
    }
    if (this._config.options?.density) {
      this._textField.density = this._config.options.density;
    }

    this._fromInput = document.createElement('input');
    this._fromInput.type = 'text';
    this._fromInput.placeholder = this._config.options?.fromPlaceholder || 'From';
    this._textField.appendChild(this._fromInput);

    this._toInput = document.createElement('input');
    this._toInput.type = 'text';
    this._toInput.placeholder = this._config.options?.toPlaceholder || 'To';
    this._textField.appendChild(this._toInput);

    const label = document.createElement('label');
    label.textContent = this._config.options?.label || 'Choose date range';
    this._textField.appendChild(label);

    dateRangePicker.appendChild(this._textField);
  }
}
