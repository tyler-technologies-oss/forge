import { defineCustomElement } from '@tylertech/forge-core';
import { BreadcrumbComponent } from './breadcrumb.js';

export * from './breadcrumb.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/breadcrumb/breadcrumb'`). */
export function defineBreadcrumbComponent(): void {
  defineCustomElement(BreadcrumbComponent);
}
