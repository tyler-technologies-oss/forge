import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}fab`;

const selectors = {
  BUTTON: 'button',
  ICON: 'i,forge-icon,img,svg',
  LABEL: 'span'
};

const classes = {
  BUTTON: 'forge-fab',
  BUTTON_EXTENDED: 'forge-fab--extended',
  ICON: 'forge-fab__icon',
  LABEL: 'forge-fab__label',
  BUTTON_MINI: 'forge-fab--mini',
  EXITED: 'forge-fab--exited',
  RIPPLE: 'forge-fab__ripple'
};

const attributes = {
  EXTENDED: 'extended',
  MINI: 'mini',
  EXITED: 'exited'
};

export const FLOATING_ACTION_BUTTON_CONSTANTS = {
  elementName,
  selectors,
  classes,
  attributes
};
