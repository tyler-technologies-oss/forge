import { defineCustomElement } from '@tylertech/forge-core';

import { KeyboardShortcutComponent } from './keyboard-shortcut.js';

export { KEYBOARD_SHORTCUT_CONSTANTS, textInputTypes } from './keyboard-shortcut-constants.js';
export type {
  IKeyboardShortcutOptions,
  IKeyboardShortcutRegistration,
  IKeyCombination,
  KeyboardShortcutActivateCallback,
  KeyboardShortcutAnchorAccessibility,
  KeyboardShortcutPlatform
} from './keyboard-shortcut-constants.js';
export { registerKeyboardShortcut } from './keyboard-shortcut-registry.js';
export {
  elementAcceptsTextInput,
  fixKey,
  formatKeyboardShortcutBinding,
  getModiferKeysString,
  matchKeyCombination,
  parseKeyCombinations
} from './keyboard-shortcut-utils.js';
export { KeyboardShortcutComponent } from './keyboard-shortcut.js';
export type { IKeyboardShortcutComponent } from './keyboard-shortcut.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/keyboard-shortcut'`). */
export function defineKeyboardShortcutComponent(): void {
  defineCustomElement(KeyboardShortcutComponent);
}
