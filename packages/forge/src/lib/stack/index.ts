import { defineCustomElement } from '@tylertech/forge-core';

import { StackComponent } from './stack.js';

export * from './stack-constants.js';
export * from './stack.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/stack'`). */
export function defineStackComponent(): void {
  defineCustomElement(StackComponent);
}
