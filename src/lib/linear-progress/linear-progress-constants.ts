import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}linear-progress`;

const classes = {
  INDETERMINATE: 'forge-linear-progress--indeterminate'
};

const selectors = {
  ROOT: '.forge-linear-progress',
  PROGRESS: '.primary-bar',
  BUFFER: '.buffer-bar'
};

const attributes = {
  DETERMINATE: 'determinate',
  PROGRESS: 'progress',
  BUFFER: 'buffer',
  THEME: 'theme'
};

export const LINEAR_PROGRESS_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes
};

export type LinearProgressTheme = Theme;
