import { defineCustomElement } from '@tylertech/forge-core';

import { BottomSheetComponent } from './bottom-sheet';

export * from './bottom-sheet-adapter';
export * from './bottom-sheet-constants';
export * from './bottom-sheet-core';
export * from './bottom-sheet';

export function defineBottomSheetComponent(): void {
  defineCustomElement(BottomSheetComponent);
}
