import { defineCustomElement } from '@tylertech/forge-core';
import { IconComponent } from './icon';

export * from './icon-adapter';
export * from './icon-constants';
export * from './icon-foundation';
export * from './icon-registry';
export * from './icon-utils';
export * from './icon';
export * from './icon-component-delegate';

export function defineIconComponent(): void {
  defineCustomElement(IconComponent);
}
