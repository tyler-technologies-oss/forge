import { defineCustomElement } from '@tylertech/forge-core';
import { ToastComponent } from './toast';

export * from './toast-adapter';
export * from './toast-constants';
export * from './toast-foundation';
export * from './toast';

export function defineToastComponent(): void {
  defineCustomElement(ToastComponent);
}
