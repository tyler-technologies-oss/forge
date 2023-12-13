import { COMPONENT_NAME_PREFIX, Theme } from '../../constants';
import { supportsElementInternalsAria } from '../../core';
import { ARIAAttribute } from '../../core/utils/a11y-utils';

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

const observedAriaAttributes: ARIAAttribute[] = supportsElementInternalsAria() ? [] : ['role', 'aria-label'];

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
  observedAriaAttributes,
  attributes,
  classes,
  selectors,
  events
};

export type IButtonToggleGroupChangeEventData<T = unknown> = T;
export type ButtonToggleGroupTheme = Theme;
