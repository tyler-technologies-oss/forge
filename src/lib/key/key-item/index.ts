import { tryDefine } from '@tylertech/forge-core';
import { KEY_ITEM_TAG_NAME, KeyItemComponent } from './key-item';

export * from './key-item';

export function defineKeyItemComponent(): void {
  tryDefine(KEY_ITEM_TAG_NAME, KeyItemComponent);
}
