import { BUTTON_CONSTANTS } from '../button';
import { CHECKBOX_CONSTANTS } from '../checkbox';
import { COMPONENT_NAME_PREFIX } from '../constants';
import { ICON_BUTTON_CONSTANTS } from '../icon-button';
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
  BUTTON_CONSTANTS.elementName,
  CHECKBOX_CONSTANTS.elementName,
  ICON_BUTTON_CONSTANTS.elementName,
  RADIO_CONSTANTS.elementName,
  SWITCH_CONSTANTS.elementName
];

export const LABEL_CONSTANTS = {
  elementName,
  selectors,
  attributes,
  labelableChildSelectors
};
