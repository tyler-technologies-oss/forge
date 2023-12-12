import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button-toggle`;

const observedAttributes = {
  SELECTED: 'selected',
  VALUE: 'value',
  DISABLED: 'disabled',
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

export interface IButtonToggleSelectEventData<T = unknown> {
  value: T;
  selected: boolean;
}
