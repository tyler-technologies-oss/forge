import { createContext } from '@lit/context';
import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab-bar`;

const observedAttributes = {
  DISABLED: 'disabled',
  ACTIVE_TAB: 'active-tab',
  ACTIVE_TAB_NAME: 'active-tab-name',
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
  TAB_MENU: 'forge-tab-menu',
  TAB_CLOSE: 'forge-tab-close'
};

const numbers = {
  SCROLL_MARGIN: 48,
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

export const TAB_BAR_DISABLED = createContext<boolean>('tab-bar-disabled');
export const TAB_BAR_VERTICAL = createContext<boolean>('tab-bar-vertical');
export const TAB_BAR_STACKED = createContext<boolean>('tab-bar-stacked');
export const TAB_BAR_SECONDARY = createContext<boolean>('tab-bar-secondary');
export const TAB_BAR_INVERTED = createContext<boolean>('tab-bar-inverted');
export const TAB_BAR_CLOSABLE = createContext<boolean>('tab-bar-closable');
