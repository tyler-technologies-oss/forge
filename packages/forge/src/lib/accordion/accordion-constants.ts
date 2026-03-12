import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}accordion`;

const attributes = {
  PANEL_SELECTOR: 'panel-selector'
};

const events = {
  TOGGLE: `${elementName}-toggle`
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const ACCORDION_CONSTANTS = {
  elementName,
  attributes,
  events
};
