import { defineCustomElement } from '@tylertech/forge-core';

import { LabelComponent } from './label';

export * from './label-adapter';
export * from './label-constants';
export * from './label-foundation';
export * from './label';
export * from './label-aware';

export function defineLabelComponent(): void {
  defineCustomElement(LabelComponent);
}
