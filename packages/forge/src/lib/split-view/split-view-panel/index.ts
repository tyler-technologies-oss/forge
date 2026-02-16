import { defineCustomElement } from '@tylertech/forge-core';

import { SplitViewPanelComponent } from './split-view-panel.js';

export * from './split-view-panel-adapter.js';
export * from './split-view-panel-constants.js';
export * from './split-view-panel-core.js';
export * from './split-view-panel.js';
export * from './split-view-panel-utils.js';

export function defineSplitViewPanelComponent(): void {
  defineCustomElement(SplitViewPanelComponent);
}
