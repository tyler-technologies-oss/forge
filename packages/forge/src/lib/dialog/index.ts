import { defineCustomElement } from '@tylertech/forge-core';

import { DialogComponent } from './dialog.js';

export * from './dialog-adapter.js';
export * from './dialog-constants.js';
export * from './dialog-core.js';
export * from './dialog.js';

export function defineDialogComponent(): void {
  defineCustomElement(DialogComponent);
}
