import { defineCustomElement } from '@tylertech/forge-core';
import { ProfileLinkComponent } from './profile-link.js';

export * from './profile-link.js';
export * from './profile-link-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/user-profile/profile-link'`). */
export function defineProfileLinkComponent(): void {
  defineCustomElement(ProfileLinkComponent);
}
