import { COMPONENT_NAME_PREFIX } from '../../constants';
import { supportsElementInternalsAria } from '../../core';
import { ARIAAttribute } from '../../core/utils/a11y-utils';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button-toggle`;

const observedAttributes = {
  SELECTED: 'selected',
  VALUE: 'value',
  DISABLED: 'disabled',
  READONLY: 'readonly',
  TABINDEX: 'tabindex' // Need this to support the focusable mixin
};

const observedAriaAttributes: ARIAAttribute[] = supportsElementInternalsAria() ? [] : ['role', 'aria-pressed', 'aria-disabled'];

const attributes = {
  ...observedAttributes
};

const events = {
  SELECT: `${elementName}-select`
};

export const BUTTON_TOGGLE_CONSTANTS = {
  elementName,
  observedAttributes,
  observedAriaAttributes,
  attributes,
  events
};

export interface IButtonToggleSelectEventData<T = unknown> {
  value: T;
  selected: boolean;
}
