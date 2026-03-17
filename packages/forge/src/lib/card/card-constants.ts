import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}card`;

const observedAttributes = {
  RAISED: 'raised'
};

const attributes = {
  ...observedAttributes
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const CARD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};
