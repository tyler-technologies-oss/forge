import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName = `${COMPONENT_NAME_PREFIX}stack`;

const classes = {
  DEFAULT: 'forge-stack'
};

const selectors = {
  ROOT: `.${classes.DEFAULT}`
};

const observedAttributes = {
  INLINE: 'inline',
  WRAP: 'wrap',
  STRETCH: 'stretch',
  GAP: 'gap',
  ALIGNMENT: 'alignment',
  JUSTIFY: 'justify'
};

const attributes = {
  ...observedAttributes
};

const defaults = {
  GAP: '16',
  ALIGNMENT: 'start' as StackAlignment
};

const strings = {
  DEFAULT_GAP: defaults.GAP
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const STACK_CONSTANTS = {
  elementName,
  classes,
  observedAttributes,
  attributes,
  selectors,
  strings,
  defaults
};

export type StackAlignment = 'start' | 'center' | 'end';
