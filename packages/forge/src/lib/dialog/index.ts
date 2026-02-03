import { defineCustomElement } from '@tylertech/forge-core';

import { DialogComponent } from './dialog';

export * from './dialog-adapter';
export * from './dialog-constants';
export * from './dialog-core';
export * from './dialog';

export function defineDialogComponent(): void {
  defineCustomElement(DialogComponent);
}
