import { COMPONENT_NAME_PREFIX } from '../constants';

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
  'forge-button',
  'forge-button-toggle-group',
  'forge-checkbox',
  'forge-icon-button',
  'forge-radio',
  'forge-select',
  'forge-switch'
];

export const LABEL_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events,
  labelableChildSelectors
};
