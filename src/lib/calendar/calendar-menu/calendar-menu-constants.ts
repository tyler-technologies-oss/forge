import { COMPONENT_NAME_PREFIX } from '../../constants';
import { IOption } from '../../select';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}calendar-menu`;

const attributes = {
  ANIMATION_TYPE: 'animation-type',
  DATA_ANIMATION: 'data-animation',
  DATA_VALUE: 'data-value',
  POPUP_CONTEXT: 'forge-popup-context',
  PREVENT_FOCUS: 'prevent-focus'
};

const classes = {
  BACKDROP: 'forge-calendar-menu__backdrop',
  CLOSING: 'forge-calendar-menu--closing',
  GRID: 'forge-calendar-menu__grid',
  GRID_ITEM: 'forge-calendar-menu__item--grid',
  GRID_FOUR_COL: 'forge-calendar-menu__grid--four-col',
  GRID_THREE_COL: 'forge-calendar-menu__grid--three-col',
  ITEM: 'forge-calendar-menu__item',
  ITEM_FOCUSED: 'forge-calendar-menu__item--focused',
  ITEM_SELECTED: 'forge-calendar-menu__item--selected',
  LIST: 'forge-calendar-menu__list',
  LIST_ITEM: 'forge-calendar-menu__item--list',
  LIST_WRAPPER: 'forge-calendar-menu__list__wrapper',
  MDC_RIPPLE_UPGRADED_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  OPEN: 'forge-calendar-menu--open',
  REPLACING_VIEW: 'forge-calendar-menu--replacing-view',
  SLIDE_LEFT: 'forge-calendar-menu--slide-left',
  SLIDE_RIGHT: 'forge-calendar-menu--slide-right',
  VIEW: 'forge-calendar-menu__view'
};

const ids = {
  SCROLL_SPY_BOTTOM: 'scroll-spy-bottom',
  SCROLL_SPY_TOP: 'scroll-spy-top'
};

const parts = {
  ITEM: 'menu-item',
  ITEM_BUTTON: 'menu-item-button',
  ITEM_CONTENT: 'menu-item-content',
  MENU: 'menu'
};

const selectors = {
  CONTAINER: '.forge-calendar-menu',
  FOCUSED: `.${classes.ITEM_FOCUSED}`,
  GRID: `.${classes.GRID}`,
  ITEM: `.${classes.ITEM}`,
  LIST: `.${classes.LIST}`,
  LIST_WRAPPER: `.${classes.LIST_WRAPPER}`,
  SCROLL_SPY_BOTTOM: `#${ids.SCROLL_SPY_BOTTOM}`,
  SCROLL_SPY_TOP: `#${ids.SCROLL_SPY_TOP}`,
  SELECTED: `.${classes.ITEM_SELECTED}`,
  VIEW: `.${classes.VIEW}`
};

const events = {
  FOCUS_CHANGE: `${elementName}-focus-change`,
  SELECT: `${elementName}-select`
};

const numbers = {
  FOUR_COL: 4,
  LARGE_ITEM_SET: 13,
  LIST_SLICE_SIZE: 20,
  THREE_COL: 3
};

export const CALENDAR_MENU_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  parts,
  selectors,
  events,
  numbers
};

export interface ICalendarMenuOption extends Omit<IOption, 'value'> {
  selected?: boolean;
  value: number;
}

export type CalendarDirection = 'left' | 'right';
export type CalendarMenuAnimationType = 'scale' | 'fade' | 'none';
