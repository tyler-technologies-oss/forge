import { defineCustomElement } from '@tylertech/forge-core';

import { BannerComponent } from './banner.js';

export * from './banner-constants.js';
export * from './banner.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/banner'`). */
export function defineBannerComponent(): void {
  defineCustomElement(BannerComponent);
}
