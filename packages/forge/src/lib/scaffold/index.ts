import { defineCustomElement } from '@tylertech/forge-core';
import { ScaffoldComponent } from './scaffold';

export * from './scaffold-constants';
export * from './scaffold';

export function defineScaffoldComponent(): void {
  defineCustomElement(ScaffoldComponent);
}
