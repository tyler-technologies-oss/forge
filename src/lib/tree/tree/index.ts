import { tryDefine } from '@tylertech/forge-core';

import { TreeComponent } from './tree';

export * from './tree';

export function defineTreeComponent(): void {
  tryDefine('forge-tree', TreeComponent);
}
