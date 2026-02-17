import { FormFieldComponentDelegate, IBaseComponentDelegateConfig, IFormFieldComponentDelegateOptions } from '../../core/index.js';
import { IRadioComponent } from './radio.js';
import { RadioLabelPosition, RADIO_CONSTANTS } from './radio-constants.js';

export type RadioComponentDelegateProps = Partial<IRadioComponent>;
export interface IRadioComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  id?: string;
  label?: string;
}
export interface IRadioComponentDelegateConfig extends IBaseComponentDelegateConfig<IRadioComponent, IRadioComponentDelegateOptions> {}

export class RadioComponentDelegate extends FormFieldComponentDelegate<IRadioComponent, IRadioComponentDelegateOptions> {
  constructor(config?: IRadioComponentDelegateConfig) {
    super(config);
  }

  public get value(): string {
    return this._element.value;
  }
  public set value(value: string) {
    this._element.value = value;
  }

  public get checked(): boolean {
    return this._element.checked;
  }
  public set checked(value: boolean) {
    this._element.checked = value;
  }

  public get defaultChecked(): boolean {
    return this._element.defaultChecked;
  }
  public set defaultChecked(value: boolean) {
    this._element.defaultChecked = value;
  }

  public get dense(): boolean {
    return this._element.dense;
  }
  public set dense(value: boolean) {
    this._element.dense = value;
  }

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
  }

  public get required(): boolean {
    return this._element.required;
  }
  public set required(value: boolean) {
    this._element.required = value;
  }

  public get readonly(): boolean {
    return this._element.readonly;
  }
  public set readonly(value: boolean) {
    this._element.readonly = value;
  }

  public get name(): string {
    return this._element.name;
  }
  public set name(value: string) {
    this._element.name = value;
  }

  public get labelPosition(): RadioLabelPosition {
    return this._element.labelPosition;
  }
  public set labelPosition(value: RadioLabelPosition) {
    this._element.labelPosition = value;
  }

  public onChange(listener: (evt: Event) => void): void {
    this._element.addEventListener('change', listener);
  }

  public onInput(listener: (evt: Event) => void): void {
    this._element.addEventListener('input', listener);
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._element.addEventListener('focus', listener);
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._element.addEventListener('blur', listener);
  }

  public setLabel(text: string | null): void {
    this._element.innerText = text ?? '';
  }

  protected _build(): IRadioComponent {
    return document.createElement(RADIO_CONSTANTS.elementName);
  }

  protected override _configure(): void {
    if (this._config.options?.id) {
      this._element.id = this._config.options.id;
    }
    if (this._config.options?.label) {
      this._element.innerText = this._config.options.label;
    }
  }
}
