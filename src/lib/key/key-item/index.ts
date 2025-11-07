import { defineCustomElement } from '@tylertech/forge-core';
import { KeyItemComponent } from './key-item';

export * from './key-item';

export function defineKeyItemComponent(): void {
  defineCustomElement(KeyItemComponent);
}
