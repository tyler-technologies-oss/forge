import { tryDefine } from '@tylertech/forge-core';
import { BADGE_TAG_NAME, BadgeComponent } from './badge';

export * from './badge-component-delegate';
export * from './badge-constants';
export * from './badge';

export function defineBadgeComponent(): void {
  tryDefine(BADGE_TAG_NAME, BadgeComponent);
}
