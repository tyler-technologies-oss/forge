import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}linear-progress`;

const classes = {
  CLOSED: 'mdc-linear-progress--closed',
  CLOSED_ANIMATION_OFF: 'mdc-linear-progress--closed-animation-off',
  INDETERMINATE: 'mdc-linear-progress--indeterminate',
  REVERSED: 'mdc-linear-progress--reversed',
  ANIMATION_READY: 'mdc-linear-progress--animation-ready'
};

const selectors = {
  BUFFER_BAR_SELECTOR: '.mdc-linear-progress__buffer-bar',
  PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
  ROOT: '.mdc-linear-progress'
};

const attributes = {
  OPEN: 'open',
  DETERMINATE: 'determinate',
  PROGRESS: 'progress',
  BUFFER: 'buffer',
  ARIA_LABEL: 'aria-label',
  ARIA_HIDDEN: 'aria-hidden',
  ARIA_VALUEMAX: 'aria-valuemax',
  ARIA_VALUEMIN: 'aria-valuemin',
  ARIA_VALUENOW: 'aria-valuenow',
  PROGRESSBAR_ARIA_LABEL: 'progressbar-aria-label'
};

const styleProperties = {
  FLEX_BASIS: 'flex-basis'
};

const animationDimensionPercentages = {
  PRIMARY_HALF: .8367142,
  PRIMARY_FULL: 2.00611057,
  SECONDARY_QUARTER: .37651913,
  SECONDARY_HALF: .84386165,
  SECONDARY_FULL: 1.60277782
};

export const LINEAR_PROGRESS_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  styleProperties,
  animationDimensionPercentages
};

export interface IWithLinearProgressResizeObserver {
  ResizeObserver: ResizeObserver;
}
