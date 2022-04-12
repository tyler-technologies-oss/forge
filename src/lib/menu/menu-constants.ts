import { COMPONENT_NAME_PREFIX } from '../constants';
import { IListDropdownOption, IListDropdownOptionGroup } from '../list-dropdown';

const elementName = `${COMPONENT_NAME_PREFIX}menu`;

const classes = {
  POPUP: 'forge-menu__popup',
  MENU: 'mdc-menu'
};

const selectors = {
  TOGGLE: `.${COMPONENT_NAME_PREFIX}menu__toggle, [${elementName}-toggle], button, [type=button]`,
  MENU_LIST: 'forge-list'
};

const attributes = {
  OPEN: 'open',
  PLACEMENT: 'placement',
  SELECTED_INDEX: 'selected-index',
  SELECTED_VALUE: 'selected-value',
  DENSE: 'dense',
  ICON_CLASS: 'icon-class',
  PERSIST_SELECTION: 'persist-selection',
  MODE: 'mode',
  SYNC_POPUP_WIDTH: 'sync-popup-width',
  POPUP_CLASSES: 'popup-classes',
  OPTION_LIMIT: 'option-limit',
  OBSERVE_SCROLL: 'observe-scroll',
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold'
};

const events = {
  SELECT: `${elementName}-select`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  ACTIVE_CHANGE: `${elementName}-active-change`
};

const numbers = {
  CHILD_MOUSE_LEAVE_TIMEOUT: 300,
  POPUP_MOUSE_LEAVE_TIMEOUT: 500
};

export const MENU_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events,
  numbers
};

export interface IMenuSelectEventData<T = any, K = any> {
  index: number;
  value?: T;
  parentValue?: K;
}

export interface IMenuActiveChangeEventData {
  id: string;
}

export interface IMenuOption<T = any> extends IListDropdownOption<T> {
  icon?: string;
  selected?: boolean;
}

export interface IMenuOptionGroup extends IListDropdownOptionGroup {}

export type MenuOptionBuilder = (option: IMenuOption, parentElement: HTMLElement) => HTMLElement | string | void;
export type MenuOptionFactory = (() => IMenuOption[]) | (() => Promise<IMenuOption[]>);
export type MenuMode = 'click' | 'cascade';
