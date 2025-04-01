import { tryDefine } from '@tylertech/forge-core';
import { KEY_TAG_NAME, KeyComponent } from './key';

export * from './key';

export function defineKeyComponent(): void {
  tryDefine(KEY_TAG_NAME, KeyComponent);
}
