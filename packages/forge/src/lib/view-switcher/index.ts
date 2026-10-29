import { defineCustomElement } from '@tylertech/forge-core';

import { ViewSwitcherComponent } from './view-switcher.js';

export * from './view-switcher-constants.js';
export * from './view-switcher.js';
export * from './view/index.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/view-switcher'`). */
export function defineViewSwitcherComponent(): void {
  defineCustomElement(ViewSwitcherComponent);
}
