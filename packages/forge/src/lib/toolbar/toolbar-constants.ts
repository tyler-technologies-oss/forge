import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}toolbar`;

const observedAttributes = {
  INVERTED: 'inverted'
};

const attributes = {
  ...observedAttributes
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const TOOLBAR_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};
