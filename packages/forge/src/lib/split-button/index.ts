import { defineCustomElement } from '@tylertech/forge-core';

import { SplitButtonComponent } from './split-button';

export * from './split-button-adapter';
export * from './split-button-constants';
export * from './split-button-core';
export * from './split-button';

export function defineSplitButtonComponent(): void {
  defineCustomElement(SplitButtonComponent);
}
