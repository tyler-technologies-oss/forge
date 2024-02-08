import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}banner`;

const observedAttributes = {
  DISMISSED: 'dismissed',
  PERSISTENT: 'persistent',
  CAN_DISMISS: 'can-dismiss',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  HAS_ICON: 'has-icon',
  HAS_BUTTON: 'has-button'
};

const selectors = {
  DISMISS_BUTTON: '[part=dismiss-button]',
  ICON_SLOT: 'slot[name=icon]',
  BUTTON_SLOT: 'slot[name=button]'
};

const defaults = {
  THEME: 'info' as BannerTheme
};

const events = {
  BEFORE_DISMISS: `${elementName}-before-dismiss`,
  DISMISSED: `${elementName}-dismissed`
};

export const BANNER_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  defaults,
  events
};

export type BannerTheme = Theme | 'danger' | 'info-secondary';
