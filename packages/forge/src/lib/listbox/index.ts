import { defineCustomElement } from '@tylertech/forge-core';
import { ListboxComponent } from './listbox/index.js';

export * from './listbox/index.js';

export function defineListboxComponent(): void {
  defineCustomElement(ListboxComponent);
}
