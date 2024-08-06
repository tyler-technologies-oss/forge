import { COMPONENT_NAME_PREFIX } from '../constants';
import { BASE_FILE_PICKER_CONSTANTS } from './base/base-file-picker-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}file-picker`;

const observedAttributes = {
  ...BASE_FILE_PICKER_CONSTANTS.observedAttributes,
  COMPACT: 'compact',
  BORDERLESS: 'borderless'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  HIGHLIGHT: 'highlight',
  DISABLED: 'disabled',
  COMPACT: 'compact',
  BORDERLESS: 'borderless'
};

const ids = {
  CONTAINER: 'container',
  BUTTON: 'button',
  INPUT: 'input'
};

const selectors = {
  CONTAINER: '#container',
  BUTTON: '#button',
  INPUT: '#input',
  BUTTON_SLOT: '#button-slot'
};

const events = {
  ...BASE_FILE_PICKER_CONSTANTS.events,
  ERROR: `${elementName}-error`,
  FILES_CHANGED: `${elementName}-change`
};

export const FILE_PICKER_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  ids,
  selectors,
  events
};
