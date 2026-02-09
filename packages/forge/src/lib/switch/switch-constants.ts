import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}switch`;

const observedAttributes = {
  CHECKED: 'checked',
  /** @deprecated use `CHECKED` instead. */
  ON: 'on',
  /** @deprecated use `CHECKED` instead. */
  SELECTED: 'selected',
  DEFAULT_CHECKED: 'default-checked',
  /** @deprecated use `DEFAULT_CHECKED` instead. */
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
