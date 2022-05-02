import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate';
import { IBadgeComponent } from './badge';
import { BADGE_CONSTANTS } from './badge-constants';

export type BadgeComponentDelegateProps = Partial<IBadgeComponent>;
export interface IBadgeComponentDelegateOptions extends IBaseComponentDelegateOptions {}
export interface IBadgeComponentDelegateConfig extends IBaseComponentDelegateConfig<IBadgeComponent, IBadgeComponentDelegateOptions> {}

export class BadgeComponentDelegate extends BaseComponentDelegate<IBadgeComponent, IBadgeComponentDelegateOptions> {
  constructor(config?: IBadgeComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IBadgeComponent {
    return document.createElement(BADGE_CONSTANTS.elementName);
  }
}
