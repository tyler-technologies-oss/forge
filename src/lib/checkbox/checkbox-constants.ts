import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}checkbox`;

const observedAttributes = {
  CHECKED: 'checked',
  DEFAULT_CHECKED: 'default-checked',
  INDETERMINATE: 'indeterminate',
  VALUE: 'value',
  DENSE: 'dense',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  READONLY: 'readonly',
  LABEL_POSITION: 'label-position'

};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: '.forge-checkbox',
  LABEL: '#label',
  STATE_LAYER: 'forge-state-layer'
};

export const CHECKBOX_CONSTANTS = {
  elementName,
  selectors,
  observedAttributes,
  attributes
};

export type CheckboxState = 'checked' | 'unchecked' | 'checked-indeterminate' | 'unchecked-indeterminate';
export type CheckboxLabelPosition = 'start' | 'end';
