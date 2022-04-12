import { defineCustomElement } from '@tylertech/forge-core';

import { ViewSwitcherComponent } from './view-switcher';

export * from './view-switcher-adapter';
export * from './view-switcher-constants';
export * from './view-switcher-foundation';
export * from './view-switcher';
export * from './view';

export function defineViewSwitcherComponent(): void {
  defineCustomElement(ViewSwitcherComponent);
}
