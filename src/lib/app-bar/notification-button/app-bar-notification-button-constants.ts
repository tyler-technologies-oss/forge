import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar-notification-button`;

const attributes = {
  COUNT: 'count',
  DOT: 'dot',
  THEME: 'theme',
  SHOW_BADGE: 'show-badge',
  ICON: 'icon'
};

export const APP_BAR_NOTIFICATION_BUTTON_CONSTANTS = {
  elementName,
  attributes
};
