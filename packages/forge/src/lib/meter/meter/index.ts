import { defineCustomElement } from '@tylertech/forge-core';
import { MeterComponent } from './meter.js';

export * from './meter.js';

export function defineMeterComponent(): void {
  defineCustomElement(MeterComponent);
}
