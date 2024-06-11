import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}card`;

const observedAttributes = {
  RAISED: 'raised'
};

const attributes = {
  ...observedAttributes
};

export const CARD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};
