import { defineCustomElement } from '@tylertech/forge-core';
import { ListboxComponent } from './listbox.js';

export * from './listbox.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/listbox'`). */
export function defineListboxComponent(): void {
  defineCustomElement(ListboxComponent);
}
