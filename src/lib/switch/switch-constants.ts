import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}switch`;

const observedAttributes = {
  ON: 'on',
  SELECTED: 'selected',
  DEFAULT_ON: 'default-on',
  VALUE: 'value',
  DENSE: 'dense',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  READONLY: 'readonly',
  ICON: 'icon',
  LABEL_POSITION: 'label-position',
  TABINDEX: 'tabindex'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  HIDDEN: 'hidden'
};

const selectors = {
  ROOT: '.forge-switch',
  LABEL: '#label',
  ICON_ON: '#icon-on',
  ICON_OFF: '#icon-off',
  STATE_LAYER: 'forge-state-layer'
};

const events = {
  CHANGE: `${elementName}-change`
};

const state = {
  ON: 'on',
  OFF: 'off'
};

export const SWITCH_CONSTANTS = {
  attributes,
  observedAttributes,
  classes,
  selectors,
  elementName,
  events,
  state
};

export type SwitchLabelPosition = 'start' | 'end';
export type SwitchIconVisibility = 'both' | 'none' | 'off' | 'on';
