import { defineCustomElement } from '@tylertech/forge-core';

import { ProfileCardComponent } from './profile-card.js';

export * from './profile-card-adapter.js';
export * from './profile-card-constants.js';
export * from './profile-card-core.js';
export * from './profile-card.js';

export function defineProfileCardComponent(): void {
  defineCustomElement(ProfileCardComponent);
}
