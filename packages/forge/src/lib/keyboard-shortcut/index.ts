import { defineCustomElement } from '@tylertech/forge-core';

import { KeyboardShortcutComponent } from './keyboard-shortcut';

export * from './keyboard-shortcut-adapter';
export * from './keyboard-shortcut-constants';
export * from './keyboard-shortcut-core';
export * from './keyboard-shortcut-utils';
export * from './keyboard-shortcut';

export function defineKeyboardShortcutComponent(): void {
  defineCustomElement(KeyboardShortcutComponent);
}
