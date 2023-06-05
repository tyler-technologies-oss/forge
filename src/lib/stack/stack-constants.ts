import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}stack`;

const classes = {
  DEFAULT: 'forge-stack'
};

const selectors = {
  ROOT: `.${classes.DEFAULT}`
};

const attributes = {
  INLINE: 'inline',
  WRAP: 'wrap',
  STRETCH: 'stretch',
  GAP: 'gap',
  ALIGNMENT: 'alignment'
};

const strings = {
  DEFAULT_GAP: '16'
};

export const STACK_CONSTANTS = {
  elementName,
  classes,
  attributes,
  selectors,
  strings
};

export type StackAlignment = 'start' | 'center' | 'end';

/** @deprecated Use `StackAlignment` instead. */
export enum StackAlignMode {
  Start = 'start',
  Center = 'center',
  End = 'end'
}
