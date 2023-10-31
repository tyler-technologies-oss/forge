import { COMPONENT_NAME_PREFIX } from '../constants';
import { INPUT_ARIA_ATTRIBUTES } from '../core';

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
  SLOTTED_INPUT: 'input[type=checkbox]'
};

const forwardedAttributes = [...INPUT_ARIA_ATTRIBUTES];

export const CHECKBOX_CONSTANTS = {
  elementName,
  selectors,
  attributes,
  forwardedAttributes
};

export type CheckboxState = 'checked' | 'unchecked' | 'checked-indeterminate' | 'unchecked-indeterminate';
export type CheckboxLabelPosition = 'start' | 'end';
