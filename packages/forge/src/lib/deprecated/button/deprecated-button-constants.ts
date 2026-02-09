import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}deprecated-button`;

const attributes = {
  TYPE: 'type',
  DISABLED: 'disabled',
  FULL_WIDTH: 'full-width'
};

const selectors = {
  BUTTON: 'button,a'
};

export const DEPRECATED_BUTTON_CONSTANTS = {
  elementName,
  attributes,
  selectors
};

export type DeprecatedButtonType = 'text' | 'raised' | 'unelevated' | 'outlined' | 'dense';
