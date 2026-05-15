import { defineCustomElement } from '@tylertech/forge-core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.js';
import { BreadcrumbsItemComponent } from './breadcrumbs-item/breadcrumbs-item.js';

export * from './breadcrumbs/breadcrumbs.js';
export * from './breadcrumbs-item/breadcrumbs-item.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/breadcrumbs'`). */
export function defineBreadcrumbsComponent(): void {
  defineCustomElement(BreadcrumbsComponent);
}

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/breadcrumbs'`). */
export function defineBreadcrumbsItemComponent(): void {
  defineCustomElement(BreadcrumbsItemComponent);
}
