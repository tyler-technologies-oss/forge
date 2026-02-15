import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate.js';
import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core/delegates/form-field-component-delegate.js';
import { ISelectComponent } from './select/select.js';
import { SELECT_CONSTANTS } from './select/select-constants.js';

export type SelectComponentDelegateProps = Partial<ISelectComponent>;
export interface ISelectComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  helperText?: string;
}
export interface ISelectComponentDelegateConfig extends IBaseComponentDelegateConfig<ISelectComponent, ISelectComponentDelegateOptions> {}

export class SelectComponentDelegate extends FormFieldComponentDelegate<ISelectComponent, ISelectComponentDelegateOptions> {
  private _helperTextElement: HTMLSpanElement | undefined;

  constructor(config?: ISelectComponentDelegateConfig) {
    super(config);
  }

  protected _build(): ISelectComponent {
    return document.createElement(SELECT_CONSTANTS.elementName);
  }

  protected override _configure(): void {
    if (typeof this._config.options?.helperText === 'string') {
      this.setHelperText(this._config.options.helperText);
    }
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
    return this._element.invalid || false;
  }
  public set invalid(value: boolean) {
    this._element.invalid = value;
  }

  public onChange(listener: (value: string) => void): void {
    this._element.addEventListener('change', (evt: CustomEvent<string>) => listener(evt.detail));
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._element.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._element.addEventListener('blur', evt => listener(evt));
  }

  public setHelperText(text: string | null): void {
    if (text) {
      if (!this._helperTextElement) {
        this._helperTextElement = document.createElement('span');
        this._helperTextElement.slot = 'helper-text';
        this._element.appendChild(this._helperTextElement);
      }
      this._helperTextElement.textContent = text;
    } else if (this._helperTextElement && this._helperTextElement.isConnected) {
      this._element.removeChild(this._helperTextElement);
      this._helperTextElement = undefined;
    }
  }
}
