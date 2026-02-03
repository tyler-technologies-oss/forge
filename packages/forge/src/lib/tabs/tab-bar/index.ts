import { defineCustomElement } from '@tylertech/forge-core';

import { TabBarComponent } from './tab-bar';

export * from './tab-bar-adapter';
export * from './tab-bar-constants';
export * from './tab-bar-core';
export * from './tab-bar';

export function defineTabBarComponent(): void {
  defineCustomElement(TabBarComponent);
}
