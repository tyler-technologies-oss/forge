import { tryDefine } from '@tylertech/forge-core';
import { METER_GROUP_TAG_NAME, MeterGroupComponent } from './meter-group';

export * from './meter-group';

export function defineMeterGroupComponent(): void {
  tryDefine(METER_GROUP_TAG_NAME, MeterGroupComponent);
}
