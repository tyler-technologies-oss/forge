import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}list`;

const attributes = {
  STATIC: 'static',
  DENSE: 'dense',
  PROPAGATE_CLICK: 'propagate-click',
  INDENTED: 'indented',
  SELECTED_VALUE: 'selected-value'
};

const selectors = {
  FOCUSABLE_LIST_ITEMS: '.forge-list-item:not(.forge-list-item--static):not(.forge-list-item--disabled)'
};

export const LIST_CONSTANTS = {
  elementName,
  attributes,
  selectors
};
