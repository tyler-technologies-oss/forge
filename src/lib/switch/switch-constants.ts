import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}switch`;

const classes = {
  LABEL_START: 'forge-switch--label-position-start'
};

const selectors = {
  BUTTON: '.mdc-switch',
  CONTAINER: '.forge-switch__container'
};

const attributes = {
  DENSE: 'dense',
  DISABLED: 'disabled',
  SELECTED: 'selected',
  LABEL_POSITION: 'label-position',
  BUTTON_ARIA_LABEL: 'button-aria-label'
};

const events = {
  SELECT: `${elementName}-select`
};

export const SWITCH_CONSTANTS = {
  classes,
  selectors,
  attributes,
  elementName,
  events
};

export type SwitchLabelPosition = 'start' | 'end';
