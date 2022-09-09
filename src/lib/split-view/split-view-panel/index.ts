import { defineCustomElement } from '@tylertech/forge-core';

import { SplitViewPanelComponent } from './split-view-panel';

export * from './split-view-panel-adapter';
export * from './split-view-panel-constants';
export * from './split-view-panel-foundation';
export * from './split-view-panel';
export * from './split-view-panel-utils';

export function defineSplitViewPanelComponent(): void {
  defineCustomElement(SplitViewPanelComponent);
}
