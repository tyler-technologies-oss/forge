import { defineCustomElement } from '@tylertech/forge-core';

import { PopupComponent } from './popup';

export * from './popup-adapter';
export * from './popup-constants';
export * from './popup-foundation';
export * from './popup';

export function definePopupComponent(): void {
  defineCustomElement(PopupComponent);
}
