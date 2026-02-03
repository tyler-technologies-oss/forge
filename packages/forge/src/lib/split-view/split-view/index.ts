import { defineCustomElement } from '@tylertech/forge-core';

import { SplitViewComponent } from './split-view';

export * from './split-view-adapter';
export * from './split-view-constants';
export * from './split-view-core';
export * from './split-view';

export function defineSplitViewComponent(): void {
  defineCustomElement(SplitViewComponent);
}
