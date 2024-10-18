import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab`;

const observedAttributes = {
  DISABLED: 'disabled',
  SELECTED: 'selected',
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

const classes = {
  DISABLED: `${elementName}--disabled`
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
  observedAttributes,
  attributes,
  selectors,
  classes,
  events,
  strings,
  numbers
};
