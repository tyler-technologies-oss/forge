import { addClass } from '@tylertech/forge-core';
import { IconExternalType, ICON_CONSTANTS, IIconComponent } from '../icon';
import { ICON_CLASS_NAME } from '../constants';
import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IIconButtonComponent } from './icon-button';
import { ICON_BUTTON_CONSTANTS } from './icon-button-constants';
import { PopupPlacement } from '../popup';

export type IconButtonComponentDelegateProps = Partial<IIconButtonComponent>;
export interface IIconButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  iconName?: string;
  iconExternal?: boolean;
  iconExternalType?: IconExternalType;
  iconType?: 'font' | 'component';
  iconClass?: string | string[];
  tooltip?: string;
  tooltipPosition?: PopupPlacement;
}
export interface IIconButtonComponentDelegateConfig extends IBaseComponentDelegateConfig<IIconButtonComponent, IIconButtonComponentDelegateOptions> {}

export class IconButtonComponentDelegate extends BaseComponentDelegate<IIconButtonComponent, IIconButtonComponentDelegateOptions> {
  private _buttonElement: HTMLButtonElement;
  private _iconElement?: IIconComponent;

  constructor(config?: IIconButtonComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IIconButtonComponent {
    const component = document.createElement(ICON_BUTTON_CONSTANTS.elementName);
    this._buttonElement = document.createElement('button');
    this._buttonElement.type = 'button';
    component.appendChild(this._buttonElement);

    if (this._config.options?.tooltip) {
      const tooltip = document.createElement('forge-tooltip');
      tooltip.textContent = this._config.options.tooltip;
      
      if (this._config.options.tooltipPosition) {
        tooltip.position = this._config.options.tooltipPosition;
      }

      component.appendChild(tooltip);
    }

    return component;
  }

  public get iconElement(): IIconComponent | undefined {
    return this._iconElement;
  }

  public get disabled(): boolean {
    return !!this._buttonElement.disabled;
  }
  public set disabled(value: boolean) {
    this._buttonElement.disabled = value;
  }

  /** @deprecated Use buttonElement instead. */
  public get butttonElement(): HTMLButtonElement | undefined {
    return this._buttonElement;
  }

  public get buttonElement(): HTMLButtonElement | undefined {
    return this._buttonElement;
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
      case 'font':
        const classes = Array.isArray(this._config.options.iconClass) ? this._config.options.iconClass : [ICON_CLASS_NAME];
        addClass(classes, this._buttonElement);
        this._buttonElement.textContent = this._config.options.iconName;
        break;
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
        this._buttonElement.appendChild(this._iconElement);
        break;
    }
  }

  public onClick(listener: (evt: MouseEvent) => void): void {
    this._buttonElement.addEventListener('click', listener);
  }

  public onFocus(listener: (evt: Event) => void): void {
    this._buttonElement.addEventListener('focus', evt => listener(evt));
  }

  public onBlur(listener: (evt: Event) => void): void {
    this._buttonElement.addEventListener('blur', evt => listener(evt));
  }
}
