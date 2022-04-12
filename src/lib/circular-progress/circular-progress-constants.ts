import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}circular-progress`;

const attributes = {
  OPEN: 'open',
  DETERMINATE: 'determinate',
  PROGRESS: 'progress',
  PROGRESSBAR_ARIA_LABEL: 'progressbar-aria-label'
};

const selectors = {
  ROOT: '.mdc-circular-progress'
};

export const CIRCULAR_PROGRESS_CONSTANTS = {
  elementName,
  attributes,
  selectors
};
