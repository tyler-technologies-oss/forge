import { defineCustomElement } from '@tylertech/forge-core';
import { MultiSelectHeaderComponent } from './multi-select-header.js';

export * from './multi-select-header.js';
export * from './multi-select-header-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/multi-select-header'`). */
export function defineMultiSelectHeaderComponent(): void {
  defineCustomElement(MultiSelectHeaderComponent);
}
