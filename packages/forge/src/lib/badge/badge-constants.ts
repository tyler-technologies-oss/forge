import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}badge`;

const attributes = {
  DOT: 'dot',
  HIDE: 'hide',
  THEME: 'theme',
  STRONG: 'strong',
  VARIANT: 'variant',
  COLOR: 'color'
};

const classes = {
  OPEN: 'open'
};

const selectors = {
  ROOT: '.forge-badge'
};

const defaults = {
  THEME: 'default' as BadgeTheme,
  VARIANT: 'tonal' as BadgeVariant
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const BADGE_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  classes,
  defaults
};

/** @deprecated These themes render as `default`, except `info-primary`, which renders as `info`, and `danger`, which renders as `error`. */
type LegacyBadgeThemes = 'primary' | 'secondary' | 'tertiary' | 'info-primary' | 'info-secondary' | 'danger';
export type BadgeTheme = 'default' | 'info' | 'success' | 'warning' | 'error' | 'critical' | LegacyBadgeThemes;
export type BadgeVariant = 'tonal' | 'outlined';
/** The Radix accent hues available through the `color` attribute. */
export type BadgeColor =
  | 'gray'
  | 'gold'
  | 'bronze'
  | 'brown'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'lime'
  | 'mint'
  | 'sky';
