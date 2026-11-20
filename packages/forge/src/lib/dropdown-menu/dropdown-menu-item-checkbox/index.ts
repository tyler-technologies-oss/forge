import { tryDefine } from '@tylertech/forge-core';
import { DROPDOWN_MENU_ITEM_CHECKBOX_TAG_NAME } from '../dropdown-menu-constants.js';
import { DropdownMenuItemCheckboxComponent } from './dropdown-menu-item-checkbox.js';

export * from './dropdown-menu-item-checkbox.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/dropdown-menu/dropdown-menu-item-checkbox'`). */
export function defineDropdownMenuItemCheckboxComponent(): void {
  tryDefine(DROPDOWN_MENU_ITEM_CHECKBOX_TAG_NAME, DropdownMenuItemCheckboxComponent);
}
