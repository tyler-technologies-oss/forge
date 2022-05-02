import { defineCustomElement } from '@tylertech/forge-core';

import { BadgeComponent } from './badge';

export * from './badge-adapter';
export * from './badge-constants';
export * from './badge-foundation';
export * from './badge';
export * from './badge-component-delegate';

export function defineBadgeComponent(): void {
  defineCustomElement(BadgeComponent);
}
