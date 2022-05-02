import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button-toggle-group`;

const attributes = {
  VALUE: 'value',
  MULTIPLE: 'multiple',
  MANDATORY: 'mandatory',
  VERTICAL: 'vertical',
  STRETCH: 'stretch',
  DISABLED: 'disabled',
  DENSE: 'dense'
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
  attributes,
  classes,
  selectors,
  events
};

export type IButtonToggleGroupChangeEventData<T> = T;

export interface IButtonToggleOption {
  label?: string;
  icon?: string;
  value: any;
  leadingIcon?: string;
  trailingIcon?: string;
}
