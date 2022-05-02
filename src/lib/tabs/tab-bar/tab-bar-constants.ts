import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab-bar`;

const attributes = {
  ACTIVE_TAB: 'active-tab',
  LAYOUT_MODE: 'layout-mode',
  LAYOUT_ALIGN: 'layout-align',
  UNDERLINE: 'underline',
  AUTO_ACTIVATE: 'auto-activate',
  STACKED: 'stacked',
  SCROLL_BUTTONS: 'scroll-buttons',
  FORCE_SCROLL_BUTTONS: 'force-scroll-buttons'
};

const classes = {
  UNDERLINED: 'forge-tab-bar--underlined',
  ALIGN_CENTER: 'forge-tab-bar--align-center',
  ALIGN_END: 'forge-tab-bar--align-end',
  FIXED: 'forge-tab-bar--fixed',
  STACKED: 'forge-tab-bar--stacked'
};

const selectors = {
  ROOT: '.forge-tab-bar',
  TAB_SCROLLER: '.mdc-tab-scroller',
  TAB_SCROLLER_AREA: '.mdc-tab-scroller__scroll-area',
  TAB_SCROLLER_CONTENT: '.mdc-tab-scroller__scroll-content',
  PREV_BUTTON_CONTAINER: '.forge-tab-bar__scroll-prev-container',
  PREV_BUTTON: '#scroll-prev-btn',
  NEXT_BUTTON_CONTAINER: '.forge-tab-bar__scroll-next-container',
  NEXT_BUTTON: '#scroll-next-btn'
};

const events = {
  ACTIVATE: `${elementName}-activate`
};

const strings = {
  ARROW_LEFT_KEY: 'ArrowLeft',
  ARROW_RIGHT_KEY: 'ArrowRight',
  END_KEY: 'End',
  ENTER_KEY: 'Enter',
  HOME_KEY: 'Home',
  SPACE_KEY: 'Space'
};

const numbers = {
  ARROW_LEFT_KEYCODE: 37,
  ARROW_RIGHT_KEYCODE: 39,
  END_KEYCODE: 35,
  ENTER_KEYCODE: 13,
  EXTRA_SCROLL_AMOUNT: 20,
  HOME_KEYCODE: 36,
  SPACE_KEYCODE: 32
};

export const TAB_BAR_CONSTANTS = {
  attributes,
  elementName,
  classes,
  selectors,
  events,
  strings,
  numbers
};

export interface ITabBarActivateEventData {
  index: number;
}

export declare type TabBarLayoutMode = 'fixed' | 'clustered';
export declare type TabBarLayoutAlign = 'start' | 'center' | 'end';

export const ACCEPTABLE_KEYS = [
  strings.ARROW_LEFT_KEY,
  strings.ARROW_RIGHT_KEY,
  strings.END_KEY,
  strings.HOME_KEY,
  strings.ENTER_KEY,
  strings.SPACE_KEY
];

export const KEYCODE_MAP = {
  [numbers.ARROW_LEFT_KEYCODE]: strings.ARROW_LEFT_KEY,
  [numbers.ARROW_RIGHT_KEYCODE]: strings.ARROW_RIGHT_KEY,
  [numbers.END_KEYCODE]: strings.END_KEY,
  [numbers.HOME_KEYCODE]: strings.HOME_KEY,
  [numbers.ENTER_KEYCODE]: strings.ENTER_KEY,
  [numbers.SPACE_KEYCODE]: strings.SPACE_KEY
};
