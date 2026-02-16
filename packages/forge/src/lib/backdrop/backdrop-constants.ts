import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}backdrop`;

const observedAttributes = {
  VISIBLE: 'visible',
  FIXED: 'fixed'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  ENTERING: 'entering',
  EXITING: 'exiting'
};

const selectors = {
  ROOT: '.forge-backdrop'
};

export const BACKDROP_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors
};
