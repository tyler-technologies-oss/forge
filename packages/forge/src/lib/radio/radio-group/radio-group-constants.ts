import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}radio-group`;

const observedAttributes = {
  DISABLED: 'disabled'
};

const attributes = {
  ...observedAttributes
};

export const RADIO_GROUP_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};
