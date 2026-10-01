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

export const STACK_GAP_SIZE_TOKENS = {
  xxxs: 'xxxsmall',
  xxs: 'xxsmall',
  xs: 'xsmall',
  s: 'small',
  m: 'medium',
  ml: 'medium-large',
  l: 'large',
  xl: 'xlarge',
  xxl: 'xxlarge',
  xxxl: 'xxxlarge'
} as const;

export type StackGapSize = keyof typeof STACK_GAP_SIZE_TOKENS;

export const isStackGapSize = (value: string): value is StackGapSize => Object.hasOwn(STACK_GAP_SIZE_TOKENS, value);

export type StackAlignment = 'start' | 'center' | 'end';
