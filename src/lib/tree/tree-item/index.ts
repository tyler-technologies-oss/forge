import { tryDefine } from '@tylertech/forge-core';

import { TreeItemComponent } from './tree-item';

export * from './tree-item';

export function defineTreeItemComponent(): void {
  tryDefine('forge-tree-item', TreeItemComponent);
}
