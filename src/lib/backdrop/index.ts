import { tryDefine } from '@tylertech/forge-core';
import { BACKDROP_TAG_NAME, BackdropComponent } from './backdrop';

export * from './backdrop-constants';
export * from './backdrop';

export function defineBackdropComponent(): void {
  tryDefine(BACKDROP_TAG_NAME, BackdropComponent);
}
