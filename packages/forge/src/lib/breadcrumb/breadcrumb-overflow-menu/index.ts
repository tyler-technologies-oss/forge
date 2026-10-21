import { defineCustomElement } from '@tylertech/forge-core';
import { BreadcrumbOverflowMenuComponent } from './breadcrumb-overflow-menu.js';

export * from './breadcrumb-overflow-menu.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/breadcrumb/breadcrumb-overflow-menu'`). */
export function defineBreadcrumbOverflowMenuComponent(): void {
  defineCustomElement(BreadcrumbOverflowMenuComponent);
}
