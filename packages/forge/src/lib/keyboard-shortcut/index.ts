import { defineCustomElement } from '@tylertech/forge-core';

import { KeyboardShortcutComponent } from './keyboard-shortcut.js';

export * from './keyboard-shortcut-constants.js';
export * from './keyboard-shortcut-utils.js';
export * from './keyboard-shortcut.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/keyboard-shortcut'`). */
export function defineKeyboardShortcutComponent(): void {
  defineCustomElement(KeyboardShortcutComponent);
}
