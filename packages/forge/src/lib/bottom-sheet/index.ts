import { defineCustomElement } from '@tylertech/forge-core';

import { BottomSheetComponent } from './bottom-sheet.js';

export * from './bottom-sheet-constants.js';
export * from './bottom-sheet.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/bottom-sheet'`). */
export function defineBottomSheetComponent(): void {
  defineCustomElement(BottomSheetComponent);
}
