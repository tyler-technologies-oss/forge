import { defineCustomElement } from '@tylertech/forge-core';

import { KeyComponent } from './key';

export * from './key-constants';
export * from './key';

export function defineKeyComponent(): void {
  defineCustomElement(KeyComponent);
}
