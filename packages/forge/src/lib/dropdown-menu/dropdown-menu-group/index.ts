import { tryDefine } from '@tylertech/forge-core';
import { DROPDOWN_MENU_GROUP_TAG_NAME } from '../dropdown-menu-constants.js';
import { DropdownMenuGroupComponent } from './dropdown-menu-group.js';

export * from './dropdown-menu-group.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/dropdown-menu/dropdown-menu-group'`). */
export function defineDropdownMenuGroupComponent(): void {
  tryDefine(DROPDOWN_MENU_GROUP_TAG_NAME, DropdownMenuGroupComponent);
}
