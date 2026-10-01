import { defineCustomElement } from '@tylertech/forge-core';

import { DialogComponent } from './dialog.js';

export * from './dialog-constants.js';
export * from './dialog.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/dialog'`). */
export function defineDialogComponent(): void {
  defineCustomElement(DialogComponent);
}
