import { defineCustomElement } from '@tylertech/forge-core';

import { TabComponent } from './tab.js';

export * from './tab-constants.js';
export * from './tab.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/tab'`). */
export function defineTabComponent(): void {
  defineCustomElement(TabComponent);
}
