import { defineCustomElement } from '@tylertech/forge-core';
import { AvatarComponent } from './avatar';

export * from './avatar';
export * from './avatar-constants';

export function defineAvatarComponent(): void {
  defineCustomElement(AvatarComponent);
}
