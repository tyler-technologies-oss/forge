import { defineCustomElement } from '@tylertech/forge-core';
import { MeterComponent } from './meter';

export * from './meter-constants';
export * from './meter';

export function defineMeterComponent(): void {
  defineCustomElement(MeterComponent);
}
