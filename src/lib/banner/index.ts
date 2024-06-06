import { defineCustomElement } from '@tylertech/forge-core';

import { BannerComponent } from './banner';

export * from './banner-adapter';
export * from './banner-constants';
export * from './banner-core';
export * from './banner';

export function defineBannerComponent(): void {
  defineCustomElement(BannerComponent);
}
