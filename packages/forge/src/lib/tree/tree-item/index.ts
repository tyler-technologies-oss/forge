import { tryDefine } from '@tylertech/forge-core';

import { TreeItemComponent } from './tree-item.js';

export * from './tree-item.js';

export function defineTreeItemComponent(): void {
  tryDefine('forge-tree-item', TreeItemComponent);
}
