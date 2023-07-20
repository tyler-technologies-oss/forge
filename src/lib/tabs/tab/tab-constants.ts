import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab`;

const attributes = {
  DISABLED: 'disabled',
  SELECTED: 'selected',
  VERTICAL: 'vertical',
  STACKED: 'stacked',
  SECONDARY: 'secondary',
  INVERTED: 'inverted'
};

const selectors = {
  RIPPLE: '.ripple-surface',
  INDICATOR: '.indicator',
  FOCUS_INDICATOR: '.focus-indicator'
};

const classes = {
  SELECTED: 'selected'
};

const events = {
  SELECT: `${elementName}-select`
};

const strings = {
  EASING: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

const numbers = {
  ANIMATION_DURATION: 250
};

export const TAB_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  classes,
  events,
  strings,
  numbers
};

