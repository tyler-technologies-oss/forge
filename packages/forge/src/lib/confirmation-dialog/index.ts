import { defineCustomElement } from '@tylertech/forge-core';
import { ConfirmationDialogComponent } from './confirmation-dialog.js';

export * from './confirmation-dialog.js';
export * from './confirmation-dialog-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/confirmation-dialog'`). */
export function defineConfirmationDialogComponent(): void {
  defineCustomElement(ConfirmationDialogComponent);
}
