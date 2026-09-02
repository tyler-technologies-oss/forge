import { defineCustomElement } from '@tylertech/forge-core';
import { StructuredCardComponent } from './structured-card.js';

export * from './structured-card.js';
export * from './structured-card-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/structured-card'`). */
export function defineStructuredCardComponent(): void {
  defineCustomElement(StructuredCardComponent);
}
