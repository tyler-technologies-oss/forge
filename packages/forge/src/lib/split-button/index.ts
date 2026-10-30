import { defineCustomElement } from '@tylertech/forge-core';

import { SplitButtonComponent } from './split-button.js';

export * from './split-button-constants.js';
export * from './split-button.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/split-button'`). */
export function defineSplitButtonComponent(): void {
  defineCustomElement(SplitButtonComponent);
}
