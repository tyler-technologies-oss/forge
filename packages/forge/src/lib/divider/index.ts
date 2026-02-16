import { defineCustomElement } from '@tylertech/forge-core';

import { DividerComponent } from './divider.js';

export * from './divider-constants.js';
export * from './divider.js';

export function defineDividerComponent(): void {
  defineCustomElement(DividerComponent);
}
