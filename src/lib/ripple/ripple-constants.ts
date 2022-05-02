import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}ripple`;

const classes = {
  SURFACE: 'mdc-ripple-surface'
};

const attributes = {
  TARGET: 'target',
  UNBOUNDED: 'unbounded'
};

export const RIPPLE_CONSTANTS = {
  elementName,
  classes,
  attributes
};
