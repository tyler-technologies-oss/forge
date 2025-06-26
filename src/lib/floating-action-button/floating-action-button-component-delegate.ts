import { addClass } from '@tylertech/forge-core';
import { ICON_CLASS_NAME, Theme } from '../constants';
import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IIconComponent } from '../icon/icon';
import { IconExternalType, ICON_CONSTANTS } from '../icon/icon-constants';
import { IFloatingActionButtonComponent } from './floating-action-button';
import { FloatingActionButtonDensity, FloatingActionButtonElevation, FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';

export type FloatingActionButtonComponentDelegateProps = Partial<IFloatingActionButtonComponent>;
export interface IFloatingActionButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  iconName?: string;
  iconExternal?: boolean;
  iconExternalType?: IconExternalType;
  iconType?: 'font' | 'component';
  iconClass?: string | string[];
  label?: string;
  theme?: Theme;
  density?: FloatingActionButtonDensity;
  elevation?: FloatingActionButtonElevation;
}
export interface IFloatingActionButtonComponentDelegateConfig
  extends IBaseComponentDelegateConfig<IFloatingActionButtonComponent, IFloatingActionButtonComponentDelegateOptions> {}

export class FloatingActionButtonComponentDelegate extends BaseComponentDelegate<
  IFloatingActionButtonComponent,
  IFloatingActionButtonComponentDelegateOptions
> {
  private _iconElement?: IIconComponent;

  constructor(config?: IFloatingActionButtonComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IFloatingActionButtonComponent {
    const component = document.createElement(FLOATING_ACTION_BUTTON_CONSTANTS.elementName);

    if (this._config.options?.theme) {
      component.theme = this._config.options.theme;
    }
    if (this._config.options?.density) {
      component.density = this._config.options.density;
    }
    if (this._config.options?.elevation) {
      component.elevation = this._config.options.elevation;
    }

    if (this._config.options?.label?.trim().length) {
      const span = document.createElement('span');
      span.slot = 'label';
      component.textContent = this._config.options.label;
      component.appendChild(span);
    }

    return component;
  }

  protected _configure(): void {
    this._configureIcon();
  }

  private _configureIcon(): void {
    if (!this._config.options?.iconName) {
      return;
    }

    const type = this._config.options?.iconType || 'component';

    switch (type) {
      case 'font': {
        const classes = Array.isArray(this._config.options.iconClass) ? this._config.options.iconClass : [ICON_CLASS_NAME];
        addClass(classes, this._element);
        this._element.textContent = this._config.options.iconName;
        break;
      }
      case 'component':
        this._iconElement = document.createElement(ICON_CONSTANTS.elementName);
        this._iconElement.name = this._config.options.iconName;
        if (this._config.options.iconExternal !== undefined) {
          this._iconElement.external = !!this._config.options.iconExternal;
        }
        if (this._config.options.iconExternalType) {
          this._iconElement.externalType = this._config.options.iconExternalType;
        }
        if (this._config.options.iconClass) {
          addClass(this._config.options.iconClass, this._iconElement);
        }
        this._element.appendChild(this._iconElement);
        break;
    }
  }

  public get iconElement(): IIconComponent | undefined {
    return this._iconElement;
  }

  public get disabled(): boolean {
    return !!this._element.disabled;
  }
  public set disabled(value: boolean) {
    this._element.disabled = value;
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
