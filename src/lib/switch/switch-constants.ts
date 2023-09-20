import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}switch`;

const classes = {
  HIDDEN: 'hidden'
};

const selectors = {
  ROOT: '.forge-switch',
  CONTAINER: '.container',
  INPUT: '#input',
  LABEL: '#label',
  ICON_ON: '#icon-on',
  ICON_OFF: '#icon-off'
};

const attributes = {
  SELECTED: 'selected',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  DENSE: 'dense',
  ICON: 'icon',
  LABEL_POSITION: 'label-position'
};

const events = {
  SELECT: `${elementName}-select`
};

export const SWITCH_CONSTANTS = {
  classes,
  selectors,
  attributes,
  elementName,
  events
};

export type SwitchLabelPosition = 'start' | 'end';

export type SwitchIconVisibility = 'both' | 'none' | 'off' | 'on';
