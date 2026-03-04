import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}divider`;
const attributes = {
  VERTICAL: 'vertical'
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const DIVIDER_CONSTANTS = {
  elementName,
  attributes
};
