import { BACKDROP_CONSTANTS } from '../backdrop';
import { COMPONENT_NAME_PREFIX } from '../constants';
import { LINEAR_PROGRESS_CONSTANTS } from '../linear-progress';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}busy-indicator`;

const classes = {
  SURFACE_INVISIBLE: 'forge-busy-indicator__surface--invisible',
  SURFACE_FIXED: 'forge-busy-indicator__surface--fixed'
};

const selectors = {
  SURFACE: '.forge-busy-indicator__surface',
  SURFACE_INVISIBLE: `.${classes.SURFACE_INVISIBLE}`,
  TITLE: '.forge-busy-indicator__title',
  MESSAGE: '.forge-busy-indicator__message',
  CANCEL: '.forge-busy-indicator__cancel-button',
  SPINNER: '.forge-busy-indicator__spinner',
  PROGRESS_BAR_CONTAINER: '.forge-busy-indicator__progress-container',
  PROGRESS_BAR: `.forge-busy-indicator__progress-container ${LINEAR_PROGRESS_CONSTANTS.elementName}`,
  BACKDROP: BACKDROP_CONSTANTS.elementName
};

const events = {
  CANCEL: `${elementName}-cancel`
};

const strings = {
  CANCELLING: 'Cancelling...'
};

const attributes = {
  TITLE_TEXT: 'title-text',
  MESSAGE: 'message',
  CANCEL: 'cancel',
  SPINNER: 'spinner',
  PROGRESS_BAR: 'progress-bar',
  PROGRESS_BAR_DETERMINATE: 'progress-bar-determinate',
  PROGRESS: 'progress',
  BUFFER: 'buffer',
  WIDTH: 'width',
  DIRECTION: 'direction',
  MINIMUM_VISIBLE_LIFETIME: 'minimum-visible-lifetime',
  MANAGE_FOCUS: 'manage-focus',
  PARENT_OPEN: 'forge-busy-indicator-open',
  FIXED: 'fixed'
};

const numbers = {
  TRANSITION_LENGTH: 120
};

export const BUSY_INDICATOR_CONSTANTS = {
  elementName,
  selectors,
  events,
  strings,
  attributes,
  numbers,
  classes
};

export type BusyIndicatorLayoutDirection = 'row' | 'column' | undefined;
