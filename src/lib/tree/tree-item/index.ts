import { defineCustomElement } from '@tylertech/forge-core';

import { TreeItemComponent } from './tree-item';

export * from './tree-item-adapter';
export * from './tree-item-constants';
export * from './tree-item-core';
export * from './tree-item';

export function defineTreeItemComponent(): void {
  defineCustomElement(TreeItemComponent);
}
