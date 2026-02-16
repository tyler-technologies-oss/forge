import { defineCustomElement } from '@tylertech/forge-core';
import { BadgeComponent } from './badge.js';

export * from './badge-component-delegate.js';
export * from './badge-constants.js';
export * from './badge.js';

export function defineBadgeComponent(): void {
  defineCustomElement(BadgeComponent);
}
