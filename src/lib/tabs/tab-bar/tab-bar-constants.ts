import { COMPONENT_NAME_PREFIX } from '../../constants';

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

const forwardedAttributes = ['aria-label'];

const selectors = {
  ROOT: '.forge-tab-bar',
  SCROLL_CONTAINER: '.scroll-container',
  DEFAULT_SLOT: 'slot:not([name])'
};

const classes = {
  SCROLL_BUTTON: 'scroll-button'
};

const events = {
  CHANGE: `${elementName}-change`
};

const numbers = {
  SCROLL_MARGIN: 48
};

export const TAB_BAR_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  forwardedAttributes,
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
