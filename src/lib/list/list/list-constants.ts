import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}list`;

const attributes = {
  STATIC: 'static',
  DENSE: 'dense',
  PROPAGATE_CLICK: 'propagate-click',
  INDENTED: 'indented',
  SELECTED_VALUE: 'selected-value'
};

const events = {
  SCOPE_TEST: `${elementName}-item-scope-test`
} as const;

export const LIST_CONSTANTS = {
  elementName,
  attributes,
  events
};
