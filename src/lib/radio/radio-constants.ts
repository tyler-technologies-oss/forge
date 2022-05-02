import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}radio`;

const classes = {
  RADIO: 'mdc-radio',
  RADIO_DENSE: 'forge-radio--dense',
  DISABLED: 'mdc-radio--disabled',
  WRAPPER_DISABLED: 'forge-radio-wrapper--disabled',
  CHECKED: 'forge-radio--checked',
  FOCUSED: 'forge-radio--focused',
  ENABLED: 'forge-radio--enabled'
};

const selectors = {
  WRAPPER: '.forge-radio-wrapper',
  RADIO: '.mdc-radio',
  RADIO_INPUT: 'input[type="radio"]',
  LABEL: 'label'
};

const attributes = {
  DENSE: 'dense',
  ROLE: 'role',
  RADIOGROUP_ROLE: 'radiogroup',
  SLOT: 'slot'
};

const inputProperties = ['checked', 'disabled'];

export const RADIO_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  inputProperties
};
