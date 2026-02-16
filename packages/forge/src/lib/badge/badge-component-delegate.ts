import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core/delegates/base-component-delegate.js';
import { IBadgeComponent } from './badge.js';

export type BadgeComponentDelegateProps = Partial<IBadgeComponent>;
export interface IBadgeComponentDelegateOptions extends IBaseComponentDelegateOptions {}
export interface IBadgeComponentDelegateConfig extends IBaseComponentDelegateConfig<IBadgeComponent, IBadgeComponentDelegateOptions> {}

export class BadgeComponentDelegate extends BaseComponentDelegate<IBadgeComponent, IBadgeComponentDelegateOptions> {
  constructor(config?: IBadgeComponentDelegateConfig) {
    super(config);
  }

  protected _build(): IBadgeComponent {
    return document.createElement('forge-badge');
  }
}
