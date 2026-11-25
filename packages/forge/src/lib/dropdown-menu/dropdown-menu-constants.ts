import { createContext } from '@lit/context';

export const DROPDOWN_MENU_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-dropdown-menu';
export const DROPDOWN_MENU_GROUP_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-dropdown-menu-group';
export const DROPDOWN_MENU_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-dropdown-menu-item';
export const DROPDOWN_MENU_ITEM_CHECKBOX_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-dropdown-menu-item-checkbox';
export const DROPDOWN_MENU_ITEM_RADIO_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-dropdown-menu-item-radio';

export const DROPDOWN_MENU_ITEM_TAG_NAMES: string[] = [DROPDOWN_MENU_ITEM_TAG_NAME, DROPDOWN_MENU_ITEM_CHECKBOX_TAG_NAME, DROPDOWN_MENU_ITEM_RADIO_TAG_NAME];
export const DROPDOWN_MENU_ITEM_SELECTOR = DROPDOWN_MENU_ITEM_TAG_NAMES.join(', ');
export const DROPDOWN_MENU_SUBMENU_CONTENT_SELECTOR = `${DROPDOWN_MENU_ITEM_SELECTOR}, ${DROPDOWN_MENU_GROUP_TAG_NAME}, forge-divider`;

export const DROPDOWN_MENU_DENSE = createContext<boolean>('forge-dropdown-menu-dense');

export const DROPDOWN_MENU_ITEM_SELECT_EVENT = 'forge-dropdown-menu-item-select';

export type DropdownMenuItemFocusTarget = 'first' | 'last';

export interface IDropdownMenuItemSelectEventData {
  value: unknown;
  /** The checked state of the item after it was selected. Only provided by checkbox and radio items. */
  checked?: boolean;
}
