import { defineCustomElement } from '@tylertech/forge-core';

import { BadgeComponent } from './badge';

export * from './badge-adapter';
export * from './badge-constants';
export * from './badge-foundation';
export * from './badge';

export function defineBadgeComponent(): void {
  defineCustomElement(BadgeComponent);
}
