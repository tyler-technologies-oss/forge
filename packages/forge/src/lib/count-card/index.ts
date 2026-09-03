import { defineCustomElement } from '@tylertech/forge-core';
import { CountCardComponent } from './count-card.js';

export * from './count-card.js';
export * from './count-card-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/count-card'`). */
export function defineCountCardComponent(): void {
  defineCustomElement(CountCardComponent);
}
