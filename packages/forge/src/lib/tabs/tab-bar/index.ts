import { defineCustomElement } from '@tylertech/forge-core';

import { TabBarComponent } from './tab-bar.js';

export * from './tab-bar-constants.js';
export * from './tab-bar.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/tab-bar'`). */
export function defineTabBarComponent(): void {
  defineCustomElement(TabBarComponent);
}
