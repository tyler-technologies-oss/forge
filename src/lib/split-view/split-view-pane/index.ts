import { defineCustomElement } from '@tylertech/forge-core';

import { SplitViewPaneComponent } from './split-view-pane';

export * from './split-view-pane-adapter';
export * from './split-view-pane-constants';
export * from './split-view-pane-foundation';
export * from './split-view-pane';

export function defineSplitViewPaneComponent(): void {
  defineCustomElement(SplitViewPaneComponent);
}
