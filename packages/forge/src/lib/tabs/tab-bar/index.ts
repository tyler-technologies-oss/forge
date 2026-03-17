import { defineCustomElement } from '@tylertech/forge-core';

import { TabBarComponent } from './tab-bar.js';

export * from './tab-bar-adapter.js';
export * from './tab-bar-constants.js';
export * from './tab-bar-core.js';
export * from './tab-bar.js';

export function defineTabBarComponent(): void {
  defineCustomElement(TabBarComponent);
}
