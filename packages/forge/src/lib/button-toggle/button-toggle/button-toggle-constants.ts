import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button-toggle`;

const observedAttributes = {
  SELECTED: 'selected',
  VALUE: 'value',
  DISABLED: 'disabled',
  READONLY: 'readonly',
  TABINDEX: 'tabindex' // Need this to support the focusable mixin
};

const attributes = {
  ...observedAttributes
};

const events = {
  SELECT: `${elementName}-select`
};

export const BUTTON_TOGGLE_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  events
};

export interface IButtonToggleSelectEventData<T = any> {
  value: T;
  selected: boolean;
}
