import { defineCustomElement } from '@tylertech/forge-core';
import { UserProfileComponent } from './user-profile.js';

export * from './user-profile.js';
export * from './user-profile-constants.js';
export * from './profile-link/index.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/user-profile'`). */
export function defineUserProfileComponent(): void {
  defineCustomElement(UserProfileComponent);
}
