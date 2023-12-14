import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}radio-group`;

const attributes = {
  DISABLED: 'disabled'
};

export const RADIO_GROUP_CONSTANTS = {
  elementName,
  attributes
};
