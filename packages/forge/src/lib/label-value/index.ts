import { defineCustomElement } from '@tylertech/forge-core';
import { LabelValueComponent } from './label-value.js';

export * from './label-value-constants.js';
export * from './label-value.js';
export * from './label-value-component-delegate.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/label-value'`). */
export function defineLabelValueComponent(): void {
  defineCustomElement(LabelValueComponent);
}
