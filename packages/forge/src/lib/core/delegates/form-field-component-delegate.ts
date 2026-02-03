import { BaseComponentDelegate, IBaseComponentDelegate, IBaseComponentDelegateOptions, IBaseComponentDelegateConfig } from './base-component-delegate';

export type FormFieldComponentDelegateProps<T> = Partial<T>;

export interface IFormFieldComponentDelegateOptions extends IBaseComponentDelegateOptions {}

export interface IFormFieldComponentDelegate<T extends HTMLElement> extends IBaseComponentDelegate<T> {
  value: unknown;
  disabled: boolean;
  onChange(cb: (value: unknown) => void): void;
  onFocus(cb: (evt: Event) => void): void;
  onBlur(cb: (evt: Event) => void): void;
}

export abstract class FormFieldComponentDelegate<T extends HTMLElement, K extends IFormFieldComponentDelegateOptions>
  extends BaseComponentDelegate<T, K>
  implements IFormFieldComponentDelegate<T>
{
  public abstract value: unknown;
  public abstract disabled: boolean;

  constructor(config?: IBaseComponentDelegateConfig<T, K>) {
    super(config);
  }

  public abstract onChange(listener: (value: unknown) => void): void;
  public abstract onFocus(cb: (evt: Event) => void): void;
  public abstract onBlur(cb: (evt: Event) => void): void;
}
