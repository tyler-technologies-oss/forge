import { defineCustomElement } from '@tylertech/forge-core';

import { DividerComponent } from './divider';

export * from './divider-constants';
export * from './divider';

export function defineDividerComponent(): void {
  defineCustomElement(DividerComponent);
}
