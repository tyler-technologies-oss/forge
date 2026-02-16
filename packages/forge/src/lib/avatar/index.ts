import { defineCustomElement } from '@tylertech/forge-core';
import { AvatarComponent } from './avatar.js';

export * from './avatar.js';
export * from './avatar-constants.js';

export function defineAvatarComponent(): void {
  defineCustomElement(AvatarComponent);
}
