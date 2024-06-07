import { defineCustomElement } from '@tylertech/forge-core';

import { BadgeComponent } from './badge';

export * from './badge-component-delegate';
export * from './badge-constants';
export * from './badge';

export function defineBadgeComponent(): void {
  defineCustomElement(BadgeComponent);
}
