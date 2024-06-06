import { defineCustomElement } from '@tylertech/forge-core';

import { TableComponent } from './table';

export * from './table-adapter';
export * from './table-constants';
export * from './table-core';
export * from './table-row';
export * from './table';
export * from './types';

export function defineTableComponent(): void {
  defineCustomElement(TableComponent);
}
