import { PopupPlacement } from '../popup/popup-constants';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}toast`;

const customCssPositionProperties = {
  TOP_MARGIN_TOP: '--forge-toast-top-margin-top',
  BOTTOM_MARGIN_BOTTOM: '--forge-toast-bottom-margin-bottom',
  TOP_LEFT_MARGIN_TOP: '--forge-toast-top-left-margin-top',
  TOP_LEFT_MARGIN_LEFT: '--forge-toast-top-left-margin-left',
  TOP_RIGHT_MARGIN_TOP: '--forge-toast-top-right-margin-top',
  TOP_RIGHT_MARGIN_RIGHT: '--forge-toast-top-right-margin-right',
  BOTTOM_LEFT_MARGIN_BOTTOM: '--forge-toast-bottom-left-margin-bottom',
  BOTTOM_LEFT_MARGIN_LEFT: '--forge-toast-bottom-left-margin-left',
  BOTTOM_RIGHT_MARGIN_RIGHT: '--forge-toast-bottom-right-margin-right',
  BOTTOM_RIGHT_MARGIN_BOTTOM: '--forge-toast-bottom-right-margin-bottom'
};

const classes = {
  CONTAINER: 'forge-toast__container',
  MESSAGE: 'forge-toast__message',
  ACTION_BUTTON: 'forge-toast__action-button',
  CLOSE_BUTTON: 'forge-toast__close-button',
  TOP: 'forge-toast__container--top',
  TOP_LEFT: 'forge-toast__container--top-left',
  TOP_RIGHT: 'forge-toast__container--top-right',
  BOTTOM: 'forge-toast__container--bottom',
  BOTTOM_LEFT: 'forge-toast__container--bottom-left',
  BOTTOM_RIGHT: 'forge-toast__container--bottom-right',
  ACTIVE: 'forge-toast__container--active',
  CUSTOM: 'forge-toast__container--custom'
};

const selectors = {
  CONTAINER: `.${classes.CONTAINER}`,
  MESSAGE: `.${classes.MESSAGE}`,
  ACTION_BUTTON: `.${classes.ACTION_BUTTON}`,
  CLOSE_BUTTON: `.${classes.CLOSE_BUTTON}`
};

const attributes = {
  MESSAGE: 'message',
  ACTION_TEXT: 'action-text',
  DURATION: 'duration',
  PLACEMENT: 'placement',
  SHOW_CLOSE: 'show-close'
};

const events = {
  ACTION: `${elementName}-action`,
  CLOSE: `${elementName}-close`
};

const defaults = {
  PLACEMENT: 'bottom' as ToastPlacement,
  DURATION: 2750
};

export const TOAST_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  defaults,
  events,
  customCssPositionProperties
};

export type ToastBuilder = () => HTMLElement | string;
export type ToastPlacement = PopupPlacement;
