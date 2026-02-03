import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}deprecated-icon-button`;

const observedAttributes = {
  DISABLED: 'disabled',
  TOGGLE: 'toggle',
  IS_ON: 'is-on',
  DENSITY_LEVEL: 'density-level'
};

const attributes = {
  ...observedAttributes,
  ON_ICON: 'forge-icon-button-on'
};

const selectors = {
  BUTTON: 'button,a',
  ICON_LIKE: 'button > i,span,svg,img,forge-icon'
};

const events = {
  TOGGLE: 'forge-icon-button-toggle'
};

export const DEPRECATED_ICON_BUTTON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events
};
