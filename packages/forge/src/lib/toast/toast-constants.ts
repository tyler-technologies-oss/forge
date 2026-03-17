import { COMPONENT_NAME_PREFIX, Theme } from '../constants.js';
import { PositionPlacement } from '../core/utils/position-utils.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}toast`;

const observedAttributes = {
  OPEN: 'open',
  DURATION: 'duration',
  PLACEMENT: 'placement',
  ACTION_TEXT: 'action-text',
  DISMISSIBLE: 'dismissible',
  DISMISS_LABEL: 'dismiss-label',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

const events = {
  ACTION: `${elementName}-action`,
  CLOSE: `${elementName}-close`
};

const classes = {
  EXITING: 'exiting'
};

const selectors = {
  SURFACE: '.surface',
  ACTION_BUTTON: '.action-button',
  CLOSE_BUTTON: '.close-button'
};

const defaults = {
  PLACEMENT: 'bottom' as ToastPlacement,
  DURATION: 2750,
  THEME: 'default' as ToastTheme
};

export const TOAST_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  defaults,
  events
};

export type ToastPlacement = PositionPlacement;
export type ToastTheme = 'default' | Theme;
