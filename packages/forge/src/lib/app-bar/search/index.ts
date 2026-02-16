import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarSearchComponent } from './app-bar-search.js';

export * from './app-bar-search-adapter.js';
export * from './app-bar-search-constants.js';
export * from './app-bar-search-core.js';
export * from './app-bar-search.js';

export function defineAppBarSearchComponent(): void {
  defineCustomElement(AppBarSearchComponent);
}
