import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}stack`;

const classes = {
  DEFAULT: 'forge-stack',
  INLINE: 'forge-stack--inline',
  WRAP: 'forge-stack--inline--wrap'
};

const attributes = {
  INLINE: 'inline',
  WRAP: 'wrap',
  STRETCH: 'stretch',
  GAP: 'gap',
  ALIGN: 'align'
};

const selectors = {
  CONTAINER: '.forge-stack'
};

export enum StackAlignMode {
  Start = 'start',
  Center = 'center',
  End = 'end'
}

export const STACK_CONSTANTS = {
  elementName,
  classes,
  attributes,
  selectors
};
