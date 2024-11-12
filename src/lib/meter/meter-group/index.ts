import { defineCustomElement } from '@tylertech/forge-core';

import { MeterGroupComponent } from './meter-group';

export * from './meter-group-constants';
export * from './meter-group';

export function defineMeterGroupComponent(): void {
  defineCustomElement(MeterGroupComponent);
}
