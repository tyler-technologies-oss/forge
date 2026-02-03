import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}radio`;

const observedAttributes = {
  CHECKED: 'checked',
  DEFAULT_CHECKED: 'default-checked',
  VALUE: 'value',
  DENSE: 'dense',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  READONLY: 'readonly',
  LABEL_POSITION: 'label-position',
  TABINDEX: 'tabindex'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: '.forge-radio',
  LABEL: '#label',
  STATE_LAYER: 'forge-state-layer'
};

const events = {
  CHANGE: 'change',
  INPUT: 'input'
};

export const RADIO_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events
};

/**
 * This symbol is used to attempt to check a radio while navigating between its siblings in a
 * group. It differs from simply setting `checked` in that it causes the input/change events to
 * emit and returns `false` if either was prevented. The radio group manager can then prevent a
 * change in focus and selection state.
 */
export const tryCheck = Symbol('tryCheck');

export type RadioState = 'checked' | 'unchecked';
export type RadioLabelPosition = 'start' | 'end';
