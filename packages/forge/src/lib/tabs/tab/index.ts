import { defineCustomElement } from '@tylertech/forge-core';

import { TabComponent } from './tab';

export * from './tab-adapter';
export * from './tab-constants';
export * from './tab-core';
export * from './tab';

export function defineTabComponent(): void {
  defineCustomElement(TabComponent);
}
