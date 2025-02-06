import { tryDefine } from '@tylertech/forge-core';
import { AVATAR_TAG_NAME, AvatarComponent } from './avatar';

export * from './avatar';
export * from './avatar-constants';

export function defineAvatarComponent(): void {
  tryDefine(AVATAR_TAG_NAME, AvatarComponent);
}
