import { tryDefine } from '@tylertech/forge-core';
import { MeterGroupComponent } from './meter-group';

export * from './meter-group';

export function defineMeterGroupComponent(): void {
  tryDefine('forge-meter-group', MeterGroupComponent);
}
