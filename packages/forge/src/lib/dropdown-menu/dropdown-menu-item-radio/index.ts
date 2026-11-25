import { tryDefine } from '@tylertech/forge-core';
import { DROPDOWN_MENU_ITEM_RADIO_TAG_NAME } from '../dropdown-menu-constants.js';
import { DropdownMenuItemRadioComponent } from './dropdown-menu-item-radio.js';

export * from './dropdown-menu-item-radio.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/dropdown-menu/dropdown-menu-item-radio'`). */
export function defineDropdownMenuItemRadioComponent(): void {
  tryDefine(DROPDOWN_MENU_ITEM_RADIO_TAG_NAME, DropdownMenuItemRadioComponent);
}
