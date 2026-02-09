import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}select-dropdown`;

const observedAttributes = {
  TARGET: 'target',
  SELECTED_TEXT_TARGET: 'selected-text-target',
  SYNC_SELECTED_TEXT: 'sync-selected-text'
};

const attributes = {
  ...observedAttributes
};

const events = {
  SCROLLED_BOTTOM: `${elementName}-scrolled-bottom`
};

export const SELECT_DROPDOWN_CONSTANTS = {
  elementName,
  attributes,
  events
};
