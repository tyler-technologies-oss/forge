import { defineCustomElement } from '@tylertech/forge-core';
import { ContentScaffoldComponent } from './content-scaffold.js';

export * from './content-scaffold.js';
export * from './content-scaffold-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/content-scaffold'`). */
export function defineContentScaffoldComponent(): void {
  defineCustomElement(ContentScaffoldComponent);
}
