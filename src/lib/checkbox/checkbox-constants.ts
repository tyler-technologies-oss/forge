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
  LABEL_POSITION: 'end'
};

const selectors = {
  ROOT: '.forge-checkbox',
  INPUT: 'input',
  LABEL: 'label'
};

export const CHECKBOX_CONSTANTS = {
  elementName,
  selectors,
  attributes
};

export type CheckboxLabelPosition = 'start' | 'end';
