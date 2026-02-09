import { defineCustomElement } from '@tylertech/forge-core';

import { StackComponent } from './stack.js';

export * from './stack-adapter.js';
export * from './stack-constants.js';
export * from './stack-core.js';
export * from './stack.js';

export function defineStackComponent(): void {
  defineCustomElement(StackComponent);
}
