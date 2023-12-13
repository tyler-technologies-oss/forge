import { defineCustomElement } from '@tylertech/forge-core';

import { IconButtonComponent } from './icon-button';

export * from './icon-button';
export * from './icon-button-adapter';
export * from './icon-button-component-delegate';
export * from './icon-button-constants';
export * from './icon-button-foundation';

export function defineIconButtonComponent(): void {
  defineCustomElement(IconButtonComponent);
}
