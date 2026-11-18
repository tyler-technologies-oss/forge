import { COMPONENT_NAME_PREFIX, Theme } from '../constants.js';

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

/** @deprecated These themes are kept for compatibility. Use `default`, `info`, `success`, `warning`, or `error` instead. `info-primary` is the same as `info`, and `danger` is the same as `error`. */
type LegacyBadgeThemes = 'primary' | 'secondary' | 'tertiary' | 'info-primary' | 'info-secondary' | 'danger';

export type BadgeTheme = Exclude<Theme, LegacyBadgeThemes> | 'default' | 'critical' | LegacyBadgeThemes;

export type BadgeVariant = 'tonal' | 'outlined';

/** The accent hues available through the `color` attribute. */
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
