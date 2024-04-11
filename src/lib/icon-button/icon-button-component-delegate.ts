import { addClass } from '@tylertech/forge-core';
import { IconExternalType, ICON_CONSTANTS, IIconComponent } from '../icon';
import { ICON_CLASS_NAME } from '../constants';
import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IIconButtonComponent } from './icon-button';
import { ICON_BUTTON_CONSTANTS } from './icon-button-constants';
import { TooltipPlacement } from '../tooltip/tooltip-constants';

export type IconButtonComponentDelegateProps = Partial<IIconButtonComponent>;
export interface IIconButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  iconName?: string;
  iconExternal?: boolean;
  iconExternalType?: IconExternalType;
  iconType?: 'font' | 'component';
  iconClass?: string | string[];
  tooltip?: string;
  tooltipPosition?: TooltipPlacement;
}
export interface IIconButtonComponentDelegateConfig extends IBaseComponentDelegateConfig<IIconButtonComponent, IIconButtonComponentDelegateOptions> {}

export class IconButtonComponentDelegate extends BaseComponentDelegate<IIconButtonComponent, IIconButtonComponentDelegateOptions> {
  private _iconElement?: IIconComponent;

  constructor(config?: IIconButtonComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IIconButtonComponent {
    const component = document.createElement(ICON_BUTTON_CONSTANTS.elementName);

    if (this._config.options?.tooltip) {
      const tooltip = document.createElement('forge-tooltip');
      tooltip.textContent = this._config.options.tooltip;
      
      if (this._config.options.tooltipPosition) {
        tooltip.placement = this._config.options.tooltipPosition;
      }

      component.appendChild(tooltip);
    }

    return component;
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
        addClass(classes, this._element);
        this._element.textContent = this._config.options.iconName;
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
        this._element.appendChild(this._iconElement);
        break;
    }
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
