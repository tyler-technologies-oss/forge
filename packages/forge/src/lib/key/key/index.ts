import { defineCustomElement } from '@tylertech/forge-core';
import { KeyComponent } from './key.js';

export * from './key.js';

export function defineKeyComponent(): void {
  defineCustomElement(KeyComponent);
}
