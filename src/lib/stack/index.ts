import { defineCustomElement } from '@tylertech/forge-core';

import { StackComponent } from './stack';

export * from './stack-adapter';
export * from './stack-constants';
export * from './stack-foundation';
export * from './stack';

export function defineStackComponent(): void {
  defineCustomElement(StackComponent);
}
