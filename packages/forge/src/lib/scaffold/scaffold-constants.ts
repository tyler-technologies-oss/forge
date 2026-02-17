import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}scaffold`;

const observedAttributes = {
  VIEWPORT: 'viewport'
};

const attributes = {
  ...observedAttributes
};

export const SCAFFOLD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};
