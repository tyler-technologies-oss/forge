import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../../core/delegates/base-component-delegate';
import { IDeprecatedButtonComponent } from './deprecated-button';
import { DEPRECATED_BUTTON_CONSTANTS } from './deprecated-button-constants';

export type DeprecatedButtonComponentDelegateProps = Partial<IDeprecatedButtonComponent>;
export interface IDeprecatedButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  type?: 'button' | 'submit';
  text?: string;
}
export interface IDeprecatedButtonComponentDelegateConfig
  extends IBaseComponentDelegateConfig<IDeprecatedButtonComponent, IDeprecatedButtonComponentDelegateOptions> {}

export class DeprecatedButtonComponentDelegate extends BaseComponentDelegate<IDeprecatedButtonComponent, IDeprecatedButtonComponentDelegateOptions> {
  private _buttonElement?: HTMLButtonElement;

  constructor(config?: IDeprecatedButtonComponentDelegateConfig) {
    super(config);
  }

  public override destroy(): void {
    this._buttonElement = undefined;
  }

  public get buttonElement(): HTMLButtonElement | undefined {
    return this._buttonElement;
  }

  protected _build(): IDeprecatedButtonComponent {
    const component = document.createElement(DEPRECATED_BUTTON_CONSTANTS.elementName);

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
