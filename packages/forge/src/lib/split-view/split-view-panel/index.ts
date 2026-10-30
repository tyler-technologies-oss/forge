import { defineCustomElement } from '@tylertech/forge-core';

import { SplitViewPanelComponent } from './split-view-panel.js';

export * from './split-view-panel-constants.js';
export * from './split-view-panel.js';
export * from './split-view-panel-utils.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/split-view-panel'`). */
export function defineSplitViewPanelComponent(): void {
  defineCustomElement(SplitViewPanelComponent);
}
