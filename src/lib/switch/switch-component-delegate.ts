import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core';
import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { ISwitchComponent } from './switch';
import { SWITCH_CONSTANTS } from './switch-constants';

export type SwitchComponentDelegateProps = Partial<ISwitchComponent>;
export interface ISwitchComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  id?: string;
  label?: string;
  selected?: boolean;
}
export interface ISwitchComponentDelegateConfig extends IBaseComponentDelegateConfig<ISwitchComponent, ISwitchComponentDelegateOptions> {}

export class SwitchComponentDelegate extends FormFieldComponentDelegate<ISwitchComponent, ISwitchComponentDelegateOptions> {
  private _labelElement?: HTMLSpanElement;

  constructor(config?: ISwitchComponentDelegateConfig) {
    super(config);
  }

  public get value(): boolean {
    return this._element.selected;
  }
  public set value(value: boolean) {
    this._element.selected = value;
  }

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
  }

  public get labelElement(): HTMLSpanElement | undefined {
    return this._labelElement;
  }

  public onChange(listener: (value: boolean) => void): void {
    this._element.addEventListener('forge-switch-select', ({ detail }: CustomEvent<boolean>) => listener(detail));
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._element.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._element.addEventListener('blur', evt => listener(evt));
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

  protected _build(): ISwitchComponent {
    return document.createElement(SWITCH_CONSTANTS.elementName);
  }

  protected override _configure(): void {
    if (typeof this._config.options?.label === 'string') {
      this._createLabel(this._config.options.label);
    }
    if (this._config.options?.selected !== undefined) {
      this._element.selected = this._config.options.selected;
    }
    if (this._config.options?.id) {
      this._element.id = this._config.options.id;
    }
  }

  private _createLabel(text: string): void {
    this._labelElement = document.createElement('span');
    this._labelElement.textContent = text;
    this._element.appendChild(this._labelElement);
  }
}
