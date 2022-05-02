import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}chip`;

const attributes = {
  TYPE: 'type',
  SELECTED: 'selected',
  VALUE: 'value',
  DISABLED: 'disabled',
  INVALID: 'invalid',
  DENSE: 'dense',
  EMULATE_FOCUS: 'emulate-focus'
};

const classes = {
  ACTION: 'forge-chip--action',
  CHOICE: 'forge-chip--choice',
  FILTER: 'forge-chip--filter',
  INPUT: 'forge-chip--input',
  FIELD: 'forge-chip--field',
  INVALID: 'forge-chip--invalid',
  SELECTED: 'forge-chip--selected',
  DELETE_BUTTON: 'forge-chip__delete-button',
  DELETE_BUTTON_TOUCH_TARGET: 'forge-chip__delete-button__touch-target',
  DENSE: 'forge-chip--dense',
  LEADING_HIDDEN: 'forge-chip__leading--hidden'
};

const selectors = {
  BUTTON: 'button.forge-chip'
};

const events = {
  DELETE: `${elementName}-delete`,
  SELECT: `${elementName}-select`
};

const defaults = {
  TYPE: 'action'
};

export const CHIP_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  events,
  defaults
};

export declare type ChipType =  'choice' | 'filter' | 'action' | 'input' | 'field';

export interface IChipSelectEventData<T = any> {
  value: T;
  selected: boolean;
}

export interface IChipDeleteEventData<T = any> {
  value: T;
}

export interface IChipState {
  type: ChipType;
  disabled: boolean;
  dense: boolean;
}
