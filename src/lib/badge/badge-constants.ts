import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}badge`;

const attributes = {
  DOT: 'dot',
  HIDE: 'hide',
  THEME: 'theme',
  STRONG: 'strong'
};

const classes = {
  OPEN: 'open'
};

const selectors = {
  ROOT: '.forge-badge'
};

const defaults = {
  THEME: 'default' as BadgeTheme
};

export const BADGE_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  classes,
  defaults
};

export type BadgeTheme = Theme | 'default' | 'info-primary' | 'info-secondary' | 'danger';
