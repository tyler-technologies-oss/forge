import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IFloatingActionButtonComponent } from './floating-action-button';
import { FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';

export type FloatingActionButtonComponentDelegateProps = Partial<IFloatingActionButtonComponent>;
export interface IFloatingActionButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  text?: string;
}
export interface IFloatingActionButtonComponentDelegateConfig extends IBaseComponentDelegateConfig<IFloatingActionButtonComponent, IFloatingActionButtonComponentDelegateOptions> {}

export class FloatingActionButtonComponentDelegate extends BaseComponentDelegate<IFloatingActionButtonComponent, IFloatingActionButtonComponentDelegateOptions> {
  private _buttonElement?: HTMLButtonElement;

  constructor(config?: IFloatingActionButtonComponentDelegateConfig) {
    super(config);
  }

  public override destroy(): void {
    this._buttonElement = undefined;
  }

  protected _build(): IFloatingActionButtonComponent {
    const component = document.createElement(FLOATING_ACTION_BUTTON_CONSTANTS.elementName);

    this._buttonElement = document.createElement('button');
    this._buttonElement.type = 'button';
    this._buttonElement.textContent = this._config.options?.text ?? '';
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
