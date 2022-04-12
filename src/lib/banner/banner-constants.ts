import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}banner`;

const classes = {
  BANNER: 'forge-banner',
  DISMISSED: 'forge-banner--dismissed'
};

const selectors = {
  BANNER: '.forge-banner',
  FORGE_DISMISS_BUTTON: 'forge-icon-button.forge-banner__container-dismiss',
  DISMISS_BUTTON: '.forge-banner__container-dismiss button',
  ICON: 'i',
  FORGE_BUTTON: 'forge-button'
};

const attributes = {
  SLOT: 'slot',
  DISMISSED: 'dismissed',
  CAN_DISMISS: 'can-dismiss',
  HIDDEN: 'hidden'
};

const slots = {
  ICON: 'icon',
  TEXT: 'text',
  BUTTON: 'button'
};

const events = {
  DISMISSED: `${elementName}-dismissed`,
  UNDISMISSED: `${elementName}-undismissed`
};

export const BANNER_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  slots,
  events
};
