import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}icon-button`;

const attributes = {
  TOGGLE: 'toggle',
  IS_ON: 'is-on',
  ICON_ON: 'forge-icon-button-on',
  DENSE: 'dense',
  DENSITY_LEVEL: 'density-level'
};

const selectors = {
  BUTTON: 'button',
  ICON: 'i, span, svg, img, forge-icon'
};

const classes = {
  BUTTON: 'forge-icon-button',
  BUTTON_ON: 'forge-icon-button--on',
  BUTTON_DENSE: 'forge-icon-button--dense',
  ICON: 'forge-icon-button__icon',
  ICON_ON: 'forge-icon-button__icon--on',
  DENSITY: [
    'forge-icon-button--dense-1',
    'forge-icon-button--dense-2',
    'forge-icon-button--dense-3',
    'forge-icon-button--dense-4',
    'forge-icon-button--dense-5',
    'forge-icon-button--dense-6'
  ]
};

const events = {
  CHANGE: `${elementName}-change`
};

export const ICON_BUTTON_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  classes,
  events
};
