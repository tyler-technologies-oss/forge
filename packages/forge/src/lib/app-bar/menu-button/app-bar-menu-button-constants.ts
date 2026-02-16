import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar-menu-button`;

const observedAttributes = {
  ICON: 'icon'
};

const attributes = {
  ...observedAttributes
};

const forwardedAttributes = ['aria-label', 'aria-labelledby'];

export const APP_BAR_MENU_BUTTON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  forwardedAttributes
};
