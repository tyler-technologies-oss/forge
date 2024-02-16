import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}list`;

const observedAttributes = {
  ROLE: 'role',
  STATIC: 'static',
  NON_INTERACTIVE: 'non-interactive',
  DISABLED: 'disabled',
  DENSE: 'dense',
  PROPAGATE_CLICK: 'propagate-click',
  SELECTED_VALUE: 'selected-value',
  INDENTED: 'indented',
  TWO_LINE: 'two-line',
  THREE_LINE: 'three-line',
  WRAP: 'wrap'
};

const attributes = {
  ...observedAttributes
};

const events = {
  SCOPE_TEST: `${elementName}-item-scope-test`
} as const;

export const LIST_CONSTANTS = {
  elementName,
  attributes,
  events
};

export const ListComponentItemRole = {
  list: 'listitem',
  listbox: 'option',
  menu: 'menuitem'
};
