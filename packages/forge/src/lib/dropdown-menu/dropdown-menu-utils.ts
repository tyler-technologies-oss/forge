import { frame } from '../core/utils/utils.js';
import type { BaseDropdownMenuItem } from './base/base-dropdown-menu-item.js';
import {
  DROPDOWN_MENU_GROUP_TAG_NAME,
  DROPDOWN_MENU_ITEM_TAG_NAME,
  DROPDOWN_MENU_ITEM_TAG_NAMES,
  DROPDOWN_MENU_TAG_NAME,
  DropdownMenuItemFocusTarget
} from './dropdown-menu-constants.js';
import type { DropdownMenuGroupComponent } from './dropdown-menu-group/dropdown-menu-group.js';
import type { DropdownMenuItemComponent } from './dropdown-menu-item/dropdown-menu-item.js';
import type { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.js';

const FOCUS_ATTEMPTS = 3;

export const isDropdownMenuItem = (el: unknown): el is BaseDropdownMenuItem => el instanceof HTMLElement && DROPDOWN_MENU_ITEM_TAG_NAMES.includes(el.localName);

/** Whether the element is a `<forge-dropdown-menu-item>`, which is the only type of item that can contain a submenu. */
export const isDropdownMenuSubmenuItem = (el: unknown): el is DropdownMenuItemComponent =>
  el instanceof HTMLElement && el.localName === DROPDOWN_MENU_ITEM_TAG_NAME;

export const isDropdownMenu = (el: unknown): el is DropdownMenuComponent => el instanceof HTMLElement && el.localName === DROPDOWN_MENU_TAG_NAME;

export const isDropdownMenuGroup = (el: unknown): el is DropdownMenuGroupComponent =>
  el instanceof HTMLElement && el.localName === DROPDOWN_MENU_GROUP_TAG_NAME;

/** Gets the items that are direct children of the parent, including the items within any of its groups. */
export const getChildItems = (parent: Element): BaseDropdownMenuItem[] =>
  Array.from(parent.children).flatMap(child => (isDropdownMenuGroup(child) ? getChildItems(child) : isDropdownMenuItem(child) ? [child] : []));

/** Gets the closest ancestor of the item that is not a group, which is the menu or item that contains the item's siblings. */
export const getItemContainer = (item: Element): Element | null => {
  let container = item.parentElement;
  while (isDropdownMenuGroup(container)) {
    container = container.parentElement;
  }
  return container;
};

export const getEnabledChildItems = (parent: Element): BaseDropdownMenuItem[] => getChildItems(parent).filter(item => !item.disabled);

export const getEnabledSiblingItems = (item: Element): BaseDropdownMenuItem[] => {
  const container = getItemContainer(item);
  return container ? getEnabledChildItems(container) : [];
};

export const getParentItem = (item: Element): DropdownMenuItemComponent | null => {
  const container = getItemContainer(item);
  return isDropdownMenuSubmenuItem(container) ? container : null;
};

export const closeChildSubmenus = (parent: Element): void => {
  getChildItems(parent)
    .filter(isDropdownMenuSubmenuItem)
    .forEach(item => (item.open = false));
};

export const getRootMenu = (el: Element): DropdownMenuComponent | null => {
  const menu = el.closest(DROPDOWN_MENU_TAG_NAME);
  return isDropdownMenu(menu) ? menu : null;
};

/**
 * Finds the first enabled item whose text starts with the provided search string, starting after
 * the current item so that repeated presses of the same character cycle through matches.
 */
export const searchItems = (items: BaseDropdownMenuItem[], search: string, current?: BaseDropdownMenuItem): BaseDropdownMenuItem | undefined => {
  const normalized = search.toLowerCase();
  const startIndex = current ? items.indexOf(current) + 1 : 0;
  const ordered = [...items.slice(startIndex), ...items.slice(0, startIndex)];
  const repeatedChar = normalized.length > 1 && [...normalized].every(char => char === normalized[0]);
  const query = repeatedChar ? normalized[0] : normalized;
  return ordered.find(item => item.label.toLowerCase().startsWith(query));
};

const finishEnterAnimations = async (parent: Element): Promise<void> => {
  const surface = parent.shadowRoot?.querySelector('forge-popover')?.shadowRoot?.querySelector('[part="surface"]');
  await Promise.allSettled(surface?.getAnimations().map(animation => animation.finished) ?? []);
};

/**
 * Focuses the first or last enabled item within a menu or an item's submenu.
 *
 * Menus are rendered in the top layer after they open, so focusing is retried over a few frames
 * until the item can actually receive focus. Focus waits for the popover's enter animation to
 * finish because the focus indicator would otherwise track the item while it scales.
 */
export const focusChildItem = async (parent: Element, target: DropdownMenuItemFocusTarget = 'first'): Promise<void> => {
  for (let attempt = 0; attempt < FOCUS_ATTEMPTS; attempt++) {
    await frame();
    await finishEnterAnimations(parent);
    const items = getEnabledChildItems(parent);
    const item = target === 'first' ? items[0] : items[items.length - 1];
    item?.focus();
    if (item?.matches(':focus')) {
      return;
    }
  }
};
