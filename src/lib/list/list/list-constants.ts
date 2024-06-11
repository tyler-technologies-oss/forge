import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}list`;

const observedAttributes = {
  DENSE: 'dense',
  SELECTED_VALUE: 'selected-value',
  INDENTED: 'indented',
  TWO_LINE: 'two-line',
  THREE_LINE: 'three-line',
  WRAP: 'wrap',
  NONINTERACTIVE: 'noninteractive'
};

const attributes = {
  ...observedAttributes
};

const events = {
  SCOPE_TEST: `${elementName}-item-scope-test`
} as const;

export const LIST_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  events
};
