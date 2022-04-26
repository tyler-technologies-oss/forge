import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}circular-progress`;

const attributes = {
  OPEN: 'open',
  DETERMINATE: 'determinate',
  PROGRESS: 'progress',
  PROGRESSBAR_ARIA_LABEL: 'progressbar-aria-label',
  ARIA_LABEL: 'aria-label',
  ARIA_HIDDEN: 'aria-hidden',
  ARIA_VALUENOW: 'aria-valuenow',
  RADIUS: 'r',
  STROKE_DASHOFFSET: 'stroke-dashoffset'
};

const classes = {
  INDETERMINATE: 'mdc-circular-progress--indeterminate',
  CLOSED: 'mdc-circular-progress--closed'
};

const selectors = {
  DETERMINATE_CIRCLE: '.mdc-circular-progress__determinate-circle',
  ROOT: '.mdc-circular-progress'
};

export const CIRCULAR_PROGRESS_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};
