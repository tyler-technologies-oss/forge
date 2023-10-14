import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}switch`;

const classes = {
  HIDDEN: 'hidden'
};

const attributes = {
  ON: 'on',
  SELECTED: 'selected',
  DEFAULT_ON: 'default-on',
  VALUE: 'value',
  DENSE: 'dense',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  READONLY: 'readonly',
  ICON: 'icon',
  LABEL_POSITION: 'label-position'
};

const selectors = {
  ROOT: '.forge-switch',
  INPUT: '#input',
  LABEL: '#label',
  ICON_ON: '#icon-on',
  ICON_OFF: '#icon-off',
  INPUT_SLOT: 'slot[name=input]',
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
  classes,
  selectors,
  attributes,
  elementName,
  events,
  state
};

export type SwitchLabelPosition = 'start' | 'end';
export type SwitchIconVisibility = 'both' | 'none' | 'off' | 'on';
