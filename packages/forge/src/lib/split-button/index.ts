import { defineCustomElement } from '@tylertech/forge-core';

import { SplitButtonComponent } from './split-button.js';

export * from './split-button-adapter.js';
export * from './split-button-constants.js';
export * from './split-button-core.js';
export * from './split-button.js';

export function defineSplitButtonComponent(): void {
  defineCustomElement(SplitButtonComponent);
}
