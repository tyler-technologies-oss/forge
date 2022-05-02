import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}linear-progress`;

const selectors = {
  ROOT: '.mdc-linear-progress'
};

const attributes = {
  DETERMINATE: 'determinate',
  PROGRESS: 'progress',
  BUFFER: 'buffer',
  VISIBLE: 'visible',
  PROGRESSBAR_ARIA_LABEL: 'progressbar-aria-label'
};

export const LINEAR_PROGRESS_CONSTANTS = {
  elementName,
  selectors,
  attributes
};
