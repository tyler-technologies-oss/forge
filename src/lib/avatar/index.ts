import { defineCustomElement } from '@tylertech/forge-core';

import { AvatarComponent } from './avatar';

export * from './avatar-constants';
export * from './avatar';

export function defineAvatarComponent(): void {
  defineCustomElement(AvatarComponent);
}
