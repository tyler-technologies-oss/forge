import { tryDefine } from '@tylertech/forge-core';
import { DROPDOWN_MENU_ITEM_TAG_NAME } from '../dropdown-menu-constants.js';
import { DropdownMenuItemComponent } from './dropdown-menu-item.js';

export * from './dropdown-menu-item.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/dropdown-menu/dropdown-menu-item'`). */
export function defineDropdownMenuItemComponent(): void {
  tryDefine(DROPDOWN_MENU_ITEM_TAG_NAME, DropdownMenuItemComponent);
}
