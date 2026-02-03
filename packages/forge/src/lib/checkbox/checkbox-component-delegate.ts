import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core';
import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { ICheckboxComponent } from './checkbox';
import { CHECKBOX_CONSTANTS, CheckboxLabelPosition } from './checkbox-constants';

export type CheckboxComponentDelegateProps = Partial<ICheckboxComponent>;
export interface ICheckboxComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  id?: string;
  label?: string;
}
export interface ICheckboxComponentDelegateConfig extends IBaseComponentDelegateConfig<ICheckboxComponent, ICheckboxComponentDelegateOptions> {}

export class CheckboxComponentDelegate extends FormFieldComponentDelegate<ICheckboxComponent, ICheckboxComponentDelegateOptions> {
  constructor(config?: ICheckboxComponentDelegateConfig) {
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

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
  }

  public get indeterminate(): boolean {
    return this._element.indeterminate;
  }
  public set indeterminate(value: boolean) {
    this._element.indeterminate = value;
  }

  public get dense(): boolean {
    return this._element.dense;
  }
  public set dense(value: boolean) {
    this._element.dense = value;
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

  public get labelPosition(): CheckboxLabelPosition {
    return this._element.labelPosition;
  }
  public set labelPosition(value: CheckboxLabelPosition) {
    this._element.labelPosition = value;
  }

  public onChange(listener: (value: boolean) => void): void {
    this._element.addEventListener('change', evt => listener((evt.target as ICheckboxComponent).checked));
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._element.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._element.addEventListener('blur', evt => listener(evt));
  }

  public setLabel(text: string | null): void {
    this._element.innerText = text ?? '';
  }

  public toggle(force?: boolean): void {
    this._element.toggle(force);
  }

  protected _build(): ICheckboxComponent {
    return document.createElement(CHECKBOX_CONSTANTS.elementName);
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
