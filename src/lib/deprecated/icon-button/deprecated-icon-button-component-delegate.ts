import { ICON_CLASS_NAME } from '../../constants';
import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../../core/delegates/base-component-delegate';
import { IIconComponent } from '../../icon/icon';
import { IconExternalType, ICON_CONSTANTS } from '../../icon/icon-constants';
import { TooltipPlacement } from '../../tooltip/tooltip-constants';
import { IDeprecatedIconButtonComponent } from './deprecated-icon-button';
import { DEPRECATED_ICON_BUTTON_CONSTANTS } from './deprecated-icon-button-constants';

export type DeprecatedIconButtonComponentDelegateProps = Partial<IDeprecatedIconButtonComponent>;
export interface IDeprecatedIconButtonComponentDelegateOptions extends IBaseComponentDelegateOptions {
  iconName?: string;
  iconExternal?: boolean;
  iconExternalType?: IconExternalType;
  iconType?: 'font' | 'component';
  iconClass?: string | string[];
  tooltip?: string;
  tooltipPosition?: TooltipPlacement;
}
export interface IDeprecatedIconButtonComponentDelegateConfig extends IBaseComponentDelegateConfig<IDeprecatedIconButtonComponent, IDeprecatedIconButtonComponentDelegateOptions> {}

export class DeprecatedIconButtonComponentDelegate extends BaseComponentDelegate<IDeprecatedIconButtonComponent, IDeprecatedIconButtonComponentDelegateOptions> {
  private _buttonElement?: HTMLButtonElement;
  private _iconElement?: IIconComponent;

  constructor(config?: IDeprecatedIconButtonComponentDelegateConfig) {
    super(config);
  }

  public override destroy(): void {
    this._buttonElement = undefined;
  }

  public get buttonElement(): HTMLButtonElement | undefined {
    return this._buttonElement;
  }

  protected _build(): IDeprecatedIconButtonComponent {
    const component = document.createElement(DEPRECATED_ICON_BUTTON_CONSTANTS.elementName);
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

  public onClick(listener: EventListener): void {
    this._buttonElement?.addEventListener('click', listener);
  }

  public onFocus(listener: EventListener): void {
    this._buttonElement?.addEventListener('focus', listener);
  }

  public onBlur(listener: EventListener): void {
    this._buttonElement?.addEventListener('blur', listener);
  }


  public get iconElement(): IIconComponent | undefined {
    return this._iconElement;
  }

  public get disabled(): boolean {
    return !!this._buttonElement?.disabled;
  }
  public set disabled(value: boolean) {
    if (this._buttonElement) {
      this._buttonElement.disabled = value;
    }
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
        this._buttonElement?.classList.add(...classes);
        if (this._buttonElement) {
          this._buttonElement.textContent = this._config.options.iconName;
        }
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
          this._iconElement.classList.add(...this._config.options.iconClass);
        }
        this._buttonElement?.appendChild(this._iconElement);
        break;
    }
  }
}
