import { defineCustomElement } from '@tylertech/forge-core';

import { LabelComponent } from './label';

export * from './label-constants';
export * from './label';
export * from './label-component-delegate';

export function defineLabelComponent(): void {
  defineCustomElement(LabelComponent);
}
