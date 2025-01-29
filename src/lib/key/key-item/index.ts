import { tryDefine } from '@tylertech/forge-core';
import { KeyItemComponent } from './key-item';

export * from './key-item';

export function defineKeyItemComponent(): void {
  tryDefine('forge-key-item', KeyItemComponent);
}
