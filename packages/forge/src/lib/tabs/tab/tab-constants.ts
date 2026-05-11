import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab`;

const observedAttributes = {
  DISABLED: 'disabled',
  ACTIVE: 'active',
  VERTICAL: 'vertical',
  STACKED: 'stacked',
  SECONDARY: 'secondary',
  INVERTED: 'inverted'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  INDICATOR: '.indicator'
};

const classes = {};

const events = {
  SELECT: `${elementName}-select`,
  REQUEST_SYNC: `${elementName}-request-sync`
};

const strings = {
  EASING: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

const numbers = {
  ANIMATION_DURATION: 250
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const TAB_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  classes,
  events,
  strings,
  numbers
};
