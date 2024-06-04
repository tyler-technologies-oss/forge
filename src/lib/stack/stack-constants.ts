import { COMPONENT_NAME_PREFIX } from '../constants';

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

const strings = {
  DEFAULT_GAP: '16'
};

export const STACK_CONSTANTS = {
  elementName,
  classes,
  observedAttributes,
  attributes,
  selectors,
  strings
};

export type StackAlignment = 'start' | 'center' | 'end';
