import { BUTTON_CONSTANTS } from '../button/index.js';
import { BUTTON_TOGGLE_GROUP_CONSTANTS } from '../button-toggle/index.js';
import { CHECKBOX_CONSTANTS } from '../checkbox/index.js';
import { COMPONENT_NAME_PREFIX } from '../constants.js';
import { ICON_BUTTON_CONSTANTS } from '../icon-button/index.js';
import { RADIO_CONSTANTS } from '../radio/index.js';
import { SWITCH_CONSTANTS } from '../switch/index.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}label`;

const observedAttributes = {
  FOR: 'for',
  DYNAMIC: 'dynamic',
  NON_INTERACTIVE: 'non-interactive',
  LEGEND: 'legend'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  SLOT: 'slot'
};

const events = {
  CONNECTED: `${elementName}-connected`
};

const labelableChildSelectors: Array<keyof HTMLElementTagNameMap> = [
  BUTTON_CONSTANTS.elementName,
  BUTTON_TOGGLE_GROUP_CONSTANTS.elementName,
  CHECKBOX_CONSTANTS.elementName,
  ICON_BUTTON_CONSTANTS.elementName,
  RADIO_CONSTANTS.elementName,
  'forge-select',
  SWITCH_CONSTANTS.elementName
];

export const LABEL_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events,
  labelableChildSelectors
};
