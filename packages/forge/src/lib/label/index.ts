import { defineCustomElement } from '@tylertech/forge-core';

import { LabelComponent } from './label.js';

export * from './label-constants.js';
export * from './label.js';
export * from './label-aware.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/label'`). */
export function defineLabelComponent(): void {
  defineCustomElement(LabelComponent);
}
