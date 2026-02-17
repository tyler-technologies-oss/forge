import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}divider`;
const attributes = {
  VERTICAL: 'vertical'
};

export const DIVIDER_CONSTANTS = {
  elementName,
  attributes
};
