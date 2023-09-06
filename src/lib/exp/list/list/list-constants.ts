import { COMPONENT_NAME_PREFIX } from '../../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}list-exp`;

const observedAttributes = {
  STATIC: 'static',
  NON_INTERACTIVE: 'non-interactive',
  DISABLED: 'disabled',
  DENSE: 'dense',
  SELECTED_VALUE: 'selected-value',
  INDENTED: 'indented',
  TWO_LINE: 'two-line',
  THREE_LINE: 'three-line',
  WRAP: 'wrap'
};

const attributes = {
  ...observedAttributes
};

export const LIST_CONSTANTS_EXP = {
  elementName,
  attributes
};
