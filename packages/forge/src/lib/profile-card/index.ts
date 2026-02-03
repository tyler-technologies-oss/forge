import { defineCustomElement } from '@tylertech/forge-core';

import { ProfileCardComponent } from './profile-card';

export * from './profile-card-adapter';
export * from './profile-card-constants';
export * from './profile-card-core';
export * from './profile-card';

export function defineProfileCardComponent(): void {
  defineCustomElement(ProfileCardComponent);
}
