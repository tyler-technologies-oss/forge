import { defineCustomElement } from '@tylertech/forge-core';

import { SplitViewComponent } from './split-view.js';

export * from './split-view-constants.js';
export * from './split-view.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/split-view'`). */
export function defineSplitViewComponent(): void {
  defineCustomElement(SplitViewComponent);
}
