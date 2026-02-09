import { defineCustomElement } from '@tylertech/forge-core';

import { ViewSwitcherComponent } from './view-switcher.js';

export * from './view-switcher-adapter.js';
export * from './view-switcher-constants.js';
export * from './view-switcher-core.js';
export * from './view-switcher.js';
export * from './view/index.js';

export function defineViewSwitcherComponent(): void {
  defineCustomElement(ViewSwitcherComponent);
}
