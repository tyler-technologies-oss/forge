import { defineCustomElement } from '@tylertech/forge-core';
import { ToastComponent } from './toast.js';

export * from './toast-adapter.js';
export * from './toast-constants.js';
export * from './toast-core.js';
export * from './toast.js';

export function defineToastComponent(): void {
  defineCustomElement(ToastComponent);
}
