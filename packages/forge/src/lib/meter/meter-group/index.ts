import { defineCustomElement } from '@tylertech/forge-core';
import { MeterGroupComponent } from './meter-group.js';

export * from './meter-group.js';

export function defineMeterGroupComponent(): void {
  defineCustomElement(MeterGroupComponent);
}
