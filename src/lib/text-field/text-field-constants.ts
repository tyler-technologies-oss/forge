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
  DEFAULT_SLOT: 'slot:not([name])',
  LABEL_SLOT: 'slot[name=label]',
  CLEAR_BUTTON_SLOT: 'slot[name=clear-button]',
  FORGE_LABEL: LABEL_CONSTANTS.elementName,
  INPUT:
    ':where(input:not([type=button], [type=checkbox], [type=color], [type=hidden], [type=image], [type=radio], [type=range], [type=reset], [type=submit]), textarea)'
};

const observedInputAttributes = ['disabled', 'placeholder'] as const;

const tagNames = {
  TEXTAREA: 'TEXTAREA',
  LABEL: 'LABEL'
};

const events = {
  CLEAR: `${elementName}-clear`
};

export const TEXT_FIELD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  observedInputAttributes,
  tagNames,
  events
};

export type TextFieldObservedInputAttributes = (typeof observedInputAttributes)[number];
export type TextFieldInputAttributeObserver = (name: TextFieldObservedInputAttributes, value: string | null) => void;
export type TextFieldValueChangeListener = (value: string | null) => void;
