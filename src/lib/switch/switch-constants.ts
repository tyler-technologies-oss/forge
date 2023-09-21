import { COMPONENT_NAME_PREFIX } from '../constants';
import { getObservedAriaAttributes } from '../core';

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
  ON: 'on',
  SELECTED: 'selected',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  DENSE: 'dense',
  ICON: 'icon',
  LABEL_POSITION: 'label-position'
};

const events = {
  CHANGE: `${elementName}-change`
};

const ariaAttributes = getObservedAriaAttributes({ unprefixed: true });

export const SWITCH_CONSTANTS = {
  classes,
  selectors,
  attributes,
  elementName,
  events,
  ariaAttributes
};

export type SwitchLabelPosition = 'start' | 'end';

export type SwitchIconVisibility = 'both' | 'none' | 'off' | 'on';
