import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}radio`;

const attributes = {
  CHECKED: 'checked',
  DEFAULT_CHECKED: 'default-checked',
  VALUE: 'value',
  DENSE: 'dense',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  READONLY: 'readonly',
  LABEL_POSITION: 'label-position'
};

const selectors = {
  ROOT: '.forge-radio',
  INPUT: 'input',
  LABEL: '#label',
  STATE_LAYER: 'forge-state-layer'
};

const events = {
  CHANGE: 'change',
  INPUT: 'input'
};

export const RADIO_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  events
};

export const tryCheck = Symbol('tryCheck');

export type RadioLabelPosition = 'start' | 'end';
