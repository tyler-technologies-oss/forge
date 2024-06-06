import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarComponent } from './app-bar';

export * from './app-bar-adapter';
export * from './app-bar-constants';
export * from './app-bar-core';
export * from './app-bar';

export function defineAppBarComponent(): void {
  defineCustomElement(AppBarComponent);
}
