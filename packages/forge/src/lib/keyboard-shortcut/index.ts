import { defineCustomElement } from '@tylertech/forge-core';

import { KeyboardShortcutComponent } from './keyboard-shortcut.js';

export * from './keyboard-shortcut-adapter.js';
export * from './keyboard-shortcut-constants.js';
export * from './keyboard-shortcut-core.js';
export * from './keyboard-shortcut-utils.js';
export * from './keyboard-shortcut.js';

export function defineKeyboardShortcutComponent(): void {
  defineCustomElement(KeyboardShortcutComponent);
}
