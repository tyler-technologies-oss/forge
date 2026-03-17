import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar-notification-button`;

const attributes = {
  COUNT: 'count',
  DOT: 'dot',
  THEME: 'theme',
  SHOW_BADGE: 'show-badge',
  ICON: 'icon'
};

const forwardedAttributes = ['aria-label', 'aria-labelledby'];

export const APP_BAR_NOTIFICATION_BUTTON_CONSTANTS = {
  elementName,
  attributes,
  forwardedAttributes
};
