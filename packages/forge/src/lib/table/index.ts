import { defineCustomElement } from '@tylertech/forge-core';

import { TableComponent } from './table.js';

export * from './table-adapter.js';
export * from './table-constants.js';
export * from './table-core.js';
export * from './table-row.js';
export * from './table.js';
export * from './types.js';

export function defineTableComponent(): void {
  defineCustomElement(TableComponent);
}
