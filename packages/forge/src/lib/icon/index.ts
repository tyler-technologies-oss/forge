import { defineCustomElement } from '@tylertech/forge-core';
import { IconComponent } from './icon.js';

export * from './icon-constants.js';
export * from './icon-registry.js';
export * from './icon-utils.js';
export * from './icon.js';
export * from './icon-component-delegate.js';

export function defineIconComponent(): void {
  defineCustomElement(IconComponent);
}
