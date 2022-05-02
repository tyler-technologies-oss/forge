import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IAvatarComponent } from './avatar';
import { AVATAR_CONSTANTS } from './avatar-constants';

export type AvatarComponentDelegateProps = Partial<IAvatarComponent>;
export interface IAvatarComponentDelegateOptions extends IBaseComponentDelegateOptions {}
export interface IAvatarComponentDelegateConfig extends IBaseComponentDelegateConfig<IAvatarComponent, IAvatarComponentDelegateOptions> {}

export class AvatarComponentDelegate extends BaseComponentDelegate<IAvatarComponent, IAvatarComponentDelegateOptions> {
  constructor(config?: IAvatarComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IAvatarComponent {
    return document.createElement(AVATAR_CONSTANTS.elementName);
  }
}
