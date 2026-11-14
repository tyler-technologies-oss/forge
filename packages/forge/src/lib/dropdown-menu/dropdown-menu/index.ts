import { tryDefine } from '@tylertech/forge-core';
import { DROPDOWN_MENU_TAG_NAME } from '../dropdown-menu-constants.js';
import { DropdownMenuComponent } from './dropdown-menu.js';

export * from './dropdown-menu.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/dropdown-menu/dropdown-menu'`). */
export function defineDropdownMenuComponent(): void {
  tryDefine(DROPDOWN_MENU_TAG_NAME, DropdownMenuComponent);
}
