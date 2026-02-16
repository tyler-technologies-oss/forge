import { defineCustomElement } from '@tylertech/forge-core';
import { LabelValueComponent } from './label-value.js';

export * from './label-value-constants.js';
export * from './label-value.js';
export * from './label-value-component-delegate.js';

export function defineLabelValueComponent(): void {
  defineCustomElement(LabelValueComponent);
}
