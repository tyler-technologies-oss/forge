import { defineCustomElement } from '@tylertech/forge-core';

import { FilePickerComponent } from './file-picker.js';

export * from './file-picker-constants.js';
export * from './file-picker.js';
export * from './file-picker-component-delegate.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/file-picker'`). */
export function defineFilePickerComponent(): void {
  defineCustomElement(FilePickerComponent);
}
