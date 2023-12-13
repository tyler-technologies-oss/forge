import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { ButtonType } from './base/base-button-constants';
import { IButtonComponent } from './button';
import { ButtonVariant, BUTTON_CONSTANTS } from './button-constants';

export type ButtonComponentDelegateProps = Partial<IButtonComponent>;
export interface IButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  variant?: ButtonVariant;
  type?: ButtonType;
  text?: string;
}
export interface IButtonComponentDelegateConfig extends IBaseComponentDelegateConfig<IButtonComponent, IButtonComponentDelegateOptions> {}

export class ButtonComponentDelegate extends BaseComponentDelegate<IButtonComponent, IButtonComponentDelegateOptions> {
  constructor(config?: IButtonComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IButtonComponent {
    const component = document.createElement(BUTTON_CONSTANTS.elementName);
    if (this._config.options?.variant) {
      component.variant = this._config.options.variant;
    }
    if (this._config.options?.type) {
      component.type = this._config.options.type;
    }
    if (this._config.options?.text) {
      component.textContent = this._config.options.text;
    }
    return component;
  }

  public onClick(listener: (evt: MouseEvent) => void): void {
    this._element.addEventListener('click', listener);
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._element.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._element.addEventListener('blur', evt => listener(evt));
  }
}
