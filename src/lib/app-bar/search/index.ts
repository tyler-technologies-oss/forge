import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarSearchComponent } from './app-bar-search';

export * from './app-bar-search-adapter';
export * from './app-bar-search-constants';
export * from './app-bar-search-core';
export * from './app-bar-search';

export function defineAppBarSearchComponent(): void {
  defineCustomElement(AppBarSearchComponent);
}
