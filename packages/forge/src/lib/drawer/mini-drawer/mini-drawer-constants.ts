import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}mini-drawer`;

const attributes = {
  HOVER: 'hover'
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const MINI_DRAWER_CONSTANTS = {
  elementName,
  attributes
};
