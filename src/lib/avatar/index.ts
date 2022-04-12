import { defineCustomElement } from '@tylertech/forge-core';

import { AvatarComponent } from './avatar';

export * from './avatar-adapter';
export * from './avatar-constants';
export * from './avatar-foundation';
export * from './avatar';

export function defineAvatarComponent(): void {
  defineCustomElement(AvatarComponent);
}
