import { defineCustomElement } from '@tylertech/forge-core';
import { ScaffoldComponent } from './scaffold.js';

export * from './scaffold-constants.js';
export * from './scaffold.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/scaffold'`). */
export function defineScaffoldComponent(): void {
  defineCustomElement(ScaffoldComponent);
}
