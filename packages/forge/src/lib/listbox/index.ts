import { defineCustomElement } from '@tylertech/forge-core';
import { ListboxComponent } from './listbox.js';

export * from './listbox.js';

export function defineListboxComponent(): void {
  defineCustomElement(ListboxComponent);
}
