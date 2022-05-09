import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}badge`;

const attributes = {
  DOT: 'dot',
  OPEN: 'open',
  THEME: 'theme',
  STRONG: 'strong'
};

const classes = {
  DOT: 'forge-badge--dot',
  OPEN: 'forge-badge--open'
};

const selectors = {
  ROOT: '.forge-badge'
};

export const BADGE_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};
