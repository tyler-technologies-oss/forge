import { defineCustomElement } from '@tylertech/forge-core';

import { ProfileCardComponent } from './profile-card.js';

export * from './profile-card-constants.js';
export * from './profile-card.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/profile-card'`). */
export function defineProfileCardComponent(): void {
  defineCustomElement(ProfileCardComponent);
}
