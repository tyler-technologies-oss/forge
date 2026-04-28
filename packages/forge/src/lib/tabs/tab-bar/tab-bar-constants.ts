import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab-bar`;

const observedAttributes = {
  DISABLED: 'disabled',
  ACTIVE_TAB: 'active-tab',
  VERTICAL: 'vertical',
  STACKED: 'stacked',
  CLUSTERED: 'clustered',
  SECONDARY: 'secondary',
  INVERTED: 'inverted',
  AUTO_ACTIVATE: 'auto-activate',
  SCROLL_BUTTONS: 'scroll-buttons'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: '.forge-tab-bar',
  SCROLL_CONTAINER: '.scroll-container',
  DEFAULT_SLOT: 'slot:not([name])'
};

const classes = {
  SCROLL_BUTTON: 'scroll-button'
};

const events = {
  CHANGE: `${elementName}-change`,
  TAB_REMOVE: 'forge-tab-remove'
};

const strings = {
  ICON_ARROW_LEFT: 'keyboard_arrow_left',
  ICON_ARROW_RIGHT: 'keyboard_arrow_right',
  ICON_ARROW_UP: 'keyboard_arrow_up',
  ICON_ARROW_DOWN: 'keyboard_arrow_down'
};

const numbers = {
  SCROLL_MARGIN: 48,
  SCROLL_MARGIN_MULTIPLIER: 2,
  SCROLL_TOLERANCE: 1,
  SCROLL_DIRECTION_FORWARD: 1,
  SCROLL_DIRECTION_BACKWARD: -1,
  OPACITY_HIDDEN: 0,
  OPACITY_VISIBLE: 1
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const TAB_BAR_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  events,
  selectors,
  classes,
  strings,
  numbers
};

export const NAVIGATION_KEYS = new Map([
  ['default', new Set(['Home', 'End'])],
  ['horizontal', new Set(['ArrowLeft', 'ArrowRight'])],
  ['vertical', new Set(['ArrowUp', 'ArrowDown'])]
]);

export interface ITabBarChangeEventData {
  index: number;
}

export type TabBarTheme = 'default' | 'app-bar';
