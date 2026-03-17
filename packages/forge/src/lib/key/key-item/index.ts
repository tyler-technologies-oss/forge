import { defineCustomElement } from '@tylertech/forge-core';
import { KeyItemComponent } from './key-item.js';

export * from './key-item.js';

export function defineKeyItemComponent(): void {
  defineCustomElement(KeyItemComponent);
}
