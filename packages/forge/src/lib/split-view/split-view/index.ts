import { defineCustomElement } from '@tylertech/forge-core';

import { SplitViewComponent } from './split-view.js';

export * from './split-view-adapter.js';
export * from './split-view-constants.js';
export * from './split-view-core.js';
export * from './split-view.js';

export function defineSplitViewComponent(): void {
  defineCustomElement(SplitViewComponent);
}
