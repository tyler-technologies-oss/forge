import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}checkbox`;

const attributes = {
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

const selectors = {
  ROOT: '.forge-checkbox',
  INPUT: 'input',
  LABEL: 'label',
  INPUT_SLOT: 'slot[name=input]',
  STATE_LAYER: 'forge-state-layer',
  FOCUS_INDICATOR: 'forge-focus-indicator'
};

export const CHECKBOX_CONSTANTS = {
  elementName,
  selectors,
  attributes
};

export type CheckboxState = 'checked' | 'unchecked' | 'checked-indeterminate' | 'unchecked-indeterminate';
export type CheckboxLabelPosition = 'start' | 'end';
