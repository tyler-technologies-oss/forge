import { FormFieldComponentDelegate, IFormFieldComponentDelegateOptions } from '../core';
import { IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { ISwitchComponent } from './switch';
import { SWITCH_CONSTANTS, SwitchIconVisibility, SwitchLabelPosition } from './switch-constants';

export type SwitchComponentDelegateProps = Partial<ISwitchComponent>;
export interface ISwitchComponentDelegateOptions extends IFormFieldComponentDelegateOptions {
  id?: string;
  label?: string;
}
export interface ISwitchComponentDelegateConfig extends IBaseComponentDelegateConfig<ISwitchComponent, ISwitchComponentDelegateOptions> {}

export class SwitchComponentDelegate extends FormFieldComponentDelegate<ISwitchComponent, ISwitchComponentDelegateOptions> {
  constructor(config?: ISwitchComponentDelegateConfig) {
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

  /** @deprecated Use `checked` instead */
  public get on(): boolean {
    return this._element.on;
  }
  public set on(value: boolean) {
    this._element.on = value;
  }

  /** @deprecated Use `checked` instead */
  public get selected(): boolean {
    return this._element.selected;
  }
  public set selected(value: boolean) {
    this._element.selected = value;
  }

  public get defaultChecked(): boolean {
    return this._element.defaultChecked;
  }
  public set defaultChecked(value: boolean) {
    this._element.defaultChecked = value;
  }

  /** @deprecated Use `defaultChecked` instead */
  public get defaultOn(): boolean {
    return this._element.defaultOn;
  }
  public set defaultOn(value: boolean) {
    this._element.defaultOn = value;
  }

  public get icon(): SwitchIconVisibility {
    return this._element.icon;
  }
  public set icon(value: SwitchIconVisibility) {
    this._element.icon = value;
  }

  public get disabled(): boolean {
    return this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
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

  public get labelPosition(): SwitchLabelPosition {
    return this._element.labelPosition;
  }
  public set labelPosition(value: SwitchLabelPosition) {
    this._element.labelPosition = value;
  }

  public onChange(listener: (value: boolean) => void): void {
    this._element.addEventListener(SWITCH_CONSTANTS.events.CHANGE, ({ detail }: CustomEvent<boolean>) => listener(detail));
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

  protected _build(): ISwitchComponent {
    return document.createElement(SWITCH_CONSTANTS.elementName);
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
