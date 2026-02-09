import { defineCustomElement } from '@tylertech/forge-core';

import { FilePickerComponent } from './file-picker.js';

export * from './file-picker-adapter.js';
export * from './file-picker-constants.js';
export * from './file-picker-core.js';
export * from './file-picker.js';
export * from './file-picker-component-delegate.js';

export function defineFilePickerComponent(): void {
  defineCustomElement(FilePickerComponent);
}
