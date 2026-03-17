import { COMPONENT_NAME_PREFIX, Theme } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}linear-progress`;

const classes = {
  INDETERMINATE: 'forge-linear-progress--indeterminate'
};

const selectors = {
  ROOT: '.forge-linear-progress',
  TRACK: '.track',
  PROGRESS: '.primary-bar'
};

const observedAttributes = {
  DETERMINATE: 'determinate',
  PROGRESS: 'progress',
  BUFFER: 'buffer',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

export const LINEAR_PROGRESS_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  observedAttributes
};

export type LinearProgressTheme = Theme;
