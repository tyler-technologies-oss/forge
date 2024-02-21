import { COMPONENT_NAME_PREFIX } from '../constants';
import { LABEL_CONSTANTS } from '../label';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}text-field`;

const observedAttributes = {
  SHOW_CLEAR: 'show-clear'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  FIELD: '#field',
  CLEAR_BUTTON_SLOT: 'slot[name=clear-button]',
  LABEL: 'label',
  FORGE_LABEL: LABEL_CONSTANTS.elementName,
  INPUT: ':where(input:not([type=button], [type=checkbox], [type=color], [type=hidden], [type=image], [type=radio], [type=range], [type=reset], [type=submit]), textarea)'
};

const observedInputAttributes = ['disabled', 'placeholder'];

const tagNames = {
  TEXTAREA: 'TEXTAREA',
  LABEL: 'LABEL'
};

const events = {
  CLEAR: `${elementName}-clear`
};

export const TEXT_FIELD_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  observedInputAttributes,
  tagNames,
  events
};

export type TextFieldInputAttributeObserver = (name: keyof typeof observedInputAttributes, value: string | null) => void;
export type TextFieldValueChangeListener = (value: string | null) => void;
