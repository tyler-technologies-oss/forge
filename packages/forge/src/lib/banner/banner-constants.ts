import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}banner`;

const observedAttributes = {
  DISMISSED: 'dismissed',
  PERSISTENT: 'persistent',
  CAN_DISMISS: 'can-dismiss',
  THEME: 'theme',
  VARIANT: 'variant'
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
  THEME: 'info' as BannerTheme,
  VARIANT: 'tonal' as BannerVariant
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

/** @deprecated These themes are kept for compatibility. Use `default`, `info`, `success`, `warning`, `error`, or `critical` instead. */
type LegacyBannerThemes = 'primary' | 'secondary' | 'tertiary' | 'info-secondary' | 'danger';
export type BannerTheme = 'default' | 'info' | 'success' | 'warning' | 'error' | 'critical' | LegacyBannerThemes;
export type BannerVariant = 'tonal' | 'outlined';
