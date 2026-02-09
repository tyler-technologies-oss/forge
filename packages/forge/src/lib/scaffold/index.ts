import { defineCustomElement } from '@tylertech/forge-core';
import { ScaffoldComponent } from './scaffold.js';

export * from './scaffold-constants.js';
export * from './scaffold.js';

export function defineScaffoldComponent(): void {
  defineCustomElement(ScaffoldComponent);
}
