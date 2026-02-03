import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar-help-button`;

const attributes = {
  ICON: 'icon'
};

const defaults = {
  ICON: 'help'
};

const forwardedAttributes = ['aria-label', 'aria-labelledby'];

export const APP_BAR_HELP_BUTTON_CONSTANTS = {
  elementName,
  attributes,
  forwardedAttributes,
  defaults
};
