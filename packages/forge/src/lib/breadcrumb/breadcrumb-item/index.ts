import { defineCustomElement } from '@tylertech/forge-core';
import { BreadcrumbItemComponent } from './breadcrumb-item.js';

export * from './breadcrumb-item.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/breadcrumb/breadcrumb-item'`). */
export function defineBreadcrumbItemComponent(): void {
  defineCustomElement(BreadcrumbItemComponent);
}
