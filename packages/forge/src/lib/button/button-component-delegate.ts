import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate.js';
import { ButtonType } from './base/base-button-constants.js';
import { BUTTON_CONSTANTS, ButtonVariant } from './button-constants.js';
import { ButtonComponent } from './button.js';

export type ButtonComponentDelegateProps = Partial<ButtonComponent>;
export interface IButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  variant?: ButtonVariant;
  type?: ButtonType;
  text?: string;
}
export interface IButtonComponentDelegateConfig extends IBaseComponentDelegateConfig<ButtonComponent, IButtonComponentDelegateOptions> {}

export class ButtonComponentDelegate extends BaseComponentDelegate<ButtonComponent, IButtonComponentDelegateOptions> {
  constructor(config?: IButtonComponentDelegateConfig) {
    super(config);
  }

  protected _build(): ButtonComponent {
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
