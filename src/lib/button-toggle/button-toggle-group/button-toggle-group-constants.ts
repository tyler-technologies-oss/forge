import { COMPONENT_NAME_PREFIX, Theme } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button-toggle-group`;

const observedAttributes = {
  VALUE: 'value',
  MULTIPLE: 'multiple',
  MANDATORY: 'mandatory',
  VERTICAL: 'vertical',
  STRETCH: 'stretch',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  READONLY: 'readonly',
  DENSE: 'dense',
  NO_OUTLINE: 'no-outline',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  VERTICAL: 'forge-button-toggle-group--vertical',
  STRETCH: 'forge-button-toggle-group--stretch'
};

const selectors = {
  ROOT: '.forge-button-toggle-group'
};

const events = {
  CHANGE: `${elementName}-change`
};

export const BUTTON_TOGGLE_GROUP_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  events
};

export type IButtonToggleGroupChangeEventData<T = unknown> = T;
export type ButtonToggleGroupTheme = Theme;
