import { defineCustomElement } from '@tylertech/forge-core';

import { IconComponent } from './icon';
import { IconRegistry } from './icon-registry';
import { ICON_REGISTRY_KEY } from './icon-constants';

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

// Store a reference to the icon registry on `window`.
if (window && !window[ICON_REGISTRY_KEY]) {
  window[ICON_REGISTRY_KEY] = IconRegistry;
}
