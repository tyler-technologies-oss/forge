import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}circular-progress`;

const attributes = {
  DETERMINATE: 'determinate',
  PROGRESS: 'progress',
  THEME: 'theme',
  NO_TRACK: 'no-track',
  ARIA_LABEL: 'data-aria-label'
};

const classes = {
  INDETERMINATE: 'forge-circular-progress--indeterminate'
};

const selectors = {
  ROOT: '.forge-circular-progress',
  DETERMINATE_PROGRESS_CIRCLE: '.progress',
  TEMPLATES: 'svg, .spinner'
};

export const CIRCULAR_PROGRESS_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};

export type CircularProgressTheme = Theme;
