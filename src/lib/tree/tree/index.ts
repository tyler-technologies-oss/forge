import { defineCustomElement } from '@tylertech/forge-core';

import { TreeComponent } from './tree';

export * from './tree-adapter';
export * from './tree-constants';
export * from './tree-core';
export * from './tree';

export function defineTreeComponent(): void {
  defineCustomElement(TreeComponent);
}
