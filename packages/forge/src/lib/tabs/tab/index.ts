import { defineCustomElement } from '@tylertech/forge-core';

import { TabComponent } from './tab.js';

export * from './tab-adapter.js';
export * from './tab-constants.js';
export * from './tab-core.js';
export * from './tab.js';

export function defineTabComponent(): void {
  defineCustomElement(TabComponent);
}
