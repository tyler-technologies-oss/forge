import { defineCustomElement } from '@tylertech/forge-core';

import { PageStateComponent } from './page-state.js';

export * from './page-state-constants.js';
export * from './page-state.js';

export function definePageStateComponent(): void {
  defineCustomElement(PageStateComponent);
}
