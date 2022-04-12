import { BaseComponentDelegate, IBaseComponentDelegateOptions, IBaseComponentDelegateConfig } from '../core/delegates/base-component-delegate';
import { ICON_CONSTANTS } from './icon-constants';
import { IIconComponent } from './icon';

export interface IIconComponentDelegateOptions extends IBaseComponentDelegateOptions {}
export interface IIconComponentDelegateConfig extends IBaseComponentDelegateConfig<IIconComponent, IIconComponentDelegateOptions> {}

export class IconComponentDelegate extends BaseComponentDelegate<IIconComponent, IIconComponentDelegateOptions> {
  constructor(config?: IIconComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IIconComponent {
    return document.createElement(ICON_CONSTANTS.elementName);
  }
}
