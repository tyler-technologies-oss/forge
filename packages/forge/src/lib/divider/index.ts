import { defineCustomElement } from '@tylertech/forge-core';

import { DividerComponent } from './divider.js';

export * from './divider-constants.js';
export * from './divider.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/divider'`). */
export function defineDividerComponent(): void {
  defineCustomElement(DividerComponent);
}
