import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}mini-drawer`;

const attributes = {
  HOVER: 'hover'
};

export const MINI_DRAWER_CONSTANTS = {
  elementName,
  attributes
};
