import { COMPONENT_NAME_PREFIX } from '../constants';

export const elementName = `${COMPONENT_NAME_PREFIX}app-bar`;

const classes = {
  DENSE: 'forge-app-bar--dense',
  FIXED: 'forge-app-bar--fixed',
  RAISED: 'forge-app-bar--raised',
  ROW: 'forge-app-bar__row',
  TITLE_INTERACTABLE: 'forge-app-bar__title--interactable',
  NO_CENTER: 'forge-app-bar--no-center'
};

const selectors = {
  ROOT: '.forge-app-bar',
  TITLE: '.forge-app-bar__title',
  BOTTOM: '.forge-app-bar__bottom',
  BOTTOM_SLOT: 'slot[name=bottom]',
  CENTER_SLOT: 'slot[name=center]',
  CENTER_SECTION: '#center-section',
  FIXED: `.${classes.FIXED}`,
  RAISED: `.${classes.RAISED}`
};

const attributes = {
  TITLE_TEXT: 'title-text',
  FIXED: 'fixed',
  RAISED: 'raised',
  THEME: 'theme'
};

export const APP_BAR_CONSTANTS = {
  elementName,
  selectors,
  attributes,
  classes
};
