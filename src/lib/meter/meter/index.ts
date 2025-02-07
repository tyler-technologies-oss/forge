import { tryDefine } from '@tylertech/forge-core';
import { MeterComponent } from './meter';

export * from './meter';

export function defineMeterComponent(): void {
  tryDefine('forge-meter', MeterComponent);
}
