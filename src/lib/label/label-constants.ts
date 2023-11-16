import { CHECKBOX_CONSTANTS } from '../checkbox';
import { COMPONENT_NAME_PREFIX } from '../constants';
import { RADIO_CONSTANTS } from '../radio';
import { SWITCH_CONSTANTS } from '../switch';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}label`;

const attributes = {
  FOR: 'for',
  DYNAMIC: 'dynamic'
};

const selectors = {
  ROOT: '.forge-label',
  SLOT: 'slot'
};

const labelableChildSelectors = [
  CHECKBOX_CONSTANTS.elementName,
  RADIO_CONSTANTS.elementName,
  SWITCH_CONSTANTS.elementName
];

export const LABEL_CONSTANTS = {
  elementName,
  selectors,
  attributes,
  labelableChildSelectors
};
