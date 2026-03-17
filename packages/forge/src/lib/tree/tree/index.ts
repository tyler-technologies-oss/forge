import { tryDefine } from '@tylertech/forge-core';

import { TreeComponent } from './tree.js';

export * from './tree.js';

export function defineTreeComponent(): void {
  tryDefine('forge-tree', TreeComponent);
}
