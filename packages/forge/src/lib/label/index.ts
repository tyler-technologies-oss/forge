import { defineCustomElement } from '@tylertech/forge-core';

import { LabelComponent } from './label.js';

export * from './label-adapter.js';
export * from './label-constants.js';
export * from './label-core.js';
export * from './label.js';
export * from './label-aware.js';

export function defineLabelComponent(): void {
  defineCustomElement(LabelComponent);
}
