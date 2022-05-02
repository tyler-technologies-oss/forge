import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IButtonComponent } from './button';
import { BUTTON_CONSTANTS } from './button-constants';

export type ButtonComponentDelegateProps = Partial<IButtonComponent>;
export interface IButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  type?: 'button' | 'submit';
  text?: string;
}
export interface IButtonComponentDelegateConfig extends IBaseComponentDelegateConfig<IButtonComponent, IButtonComponentDelegateOptions> {}

export class ButtonComponentDelegate extends BaseComponentDelegate<IButtonComponent, IButtonComponentDelegateOptions> {
  private _buttonElement?: HTMLButtonElement;

  constructor(config?: IButtonComponentDelegateConfig) {
    super(config);
  }

  public override destroy(): void {
    this._buttonElement = undefined;
  }

  public get buttonElement(): HTMLButtonElement | undefined {
    return this._buttonElement;
  }

  protected _build(): IButtonComponent {
    const component = document.createElement(BUTTON_CONSTANTS.elementName);

    this._buttonElement = document.createElement('button');
    this._buttonElement.type = this._config.options?.type || 'button';
    this._buttonElement.textContent = this._config.options?.text || '';
    component.appendChild(this._buttonElement);

    return component;
  }

  public onClick(listener: (evt: MouseEvent) => void): void {
    this._buttonElement?.addEventListener('click', listener);
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._buttonElement?.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._buttonElement?.addEventListener('blur', evt => listener(evt));
  }
}
