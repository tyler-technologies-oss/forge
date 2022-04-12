import { defineCustomElement } from '@tylertech/forge-core';

import { FilePickerComponent } from './file-picker';

export * from './file-picker-adapter';
export * from './file-picker-constants';
export * from './file-picker-foundation';
export * from './file-picker';

export function defineFilePickerComponent(): void {
  defineCustomElement(FilePickerComponent);
}
