import { defineCustomElement } from '@tylertech/forge-core';

import { BottomSheetComponent } from './bottom-sheet.js';

export * from './bottom-sheet-adapter.js';
export * from './bottom-sheet-constants.js';
export * from './bottom-sheet-core.js';
export * from './bottom-sheet.js';

export function defineBottomSheetComponent(): void {
  defineCustomElement(BottomSheetComponent);
}
