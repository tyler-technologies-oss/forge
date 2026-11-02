import { defineCustomElement } from '@tylertech/forge-core';

import { PageStateComponent } from './page-state.js';

export * from './page-state-constants.js';
export * from './page-state.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/page-state'`). */
export function definePageStateComponent(): void {
  defineCustomElement(PageStateComponent);
}
