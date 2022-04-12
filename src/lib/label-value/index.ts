import { defineCustomElement } from '@tylertech/forge-core';

import { LabelValueComponent } from './label-value';

export * from './label-value-adapter';
export * from './label-value-constants';
export * from './label-value-foundation';
export * from './label-value';

export function defineLabelValueComponent(): void {
  defineCustomElement(LabelValueComponent);
}
