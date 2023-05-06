import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}spinner`;

const attributes = {
  DISABLED: 'disabled'
};

const classes = {
  ROOT: 'forge-spinner',
  BUTTON: 'forge-spinner__button',
  INCREMENT: 'forge-spinner__button--increment',
  DECREMENT: 'forge-spinner__button--decrement',
  ACTIVE: 'forge-spinner--active',
  DISABLED: 'forge-spinner--disabled'
};

const ids = {
  ROOT: 'root',
  INCREMENT: 'increment',
  DECREMENT: 'decrement'
};

const selectors = {
  ROOT: `#${ids.ROOT}`,
  INCREMENT: `#${ids.INCREMENT}`,
  DECREMENT: `#${ids.DECREMENT}`
};

const events = {
  INCREMENT: `${elementName}-increment`,
  DECREMENT: `${elementName}-decrement`
};

const numbers = {
  REPEAT_DELAY_MILLISECONDS: 400,
  REPEAT_DEBOUNCE_MILLISECONDS: 50
};

export const SPINNER_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  selectors,
  events,
  numbers
};
