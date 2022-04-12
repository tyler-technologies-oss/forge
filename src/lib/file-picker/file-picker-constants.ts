import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}file-picker`;

const attributes = {
  ACCEPT: 'accept',
  MAX_SIZE: 'max-size',
  CAPTURE: 'capture',
  MULTIPLE: 'multiple',
  DISABLED: 'disabled',
  COMPACT: 'compact',
  BORDERLESS: 'borderless'
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
  FILES_CHANGED: `${elementName}-change`
};

export const FILE_PICKER_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  selectors,
  events
};

export interface IFilePickerChangeEventData {
  legalFiles?: File[];
  illegalFiles?: File[];
}
