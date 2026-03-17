import { defineCustomElement } from '@tylertech/forge-core';

import { BannerComponent } from './banner.js';

export * from './banner-adapter.js';
export * from './banner-constants.js';
export * from './banner-core.js';
export * from './banner.js';

export function defineBannerComponent(): void {
  defineCustomElement(BannerComponent);
}
