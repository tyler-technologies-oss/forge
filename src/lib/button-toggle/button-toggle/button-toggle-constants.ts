import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button-toggle`;

const attributes = {
  VALUE: 'value',
  SELECTED: 'selected',
  DISABLED: 'disabled',
  DENSE: 'dense',
  BUTTON_ARIA_LABEL: 'button-aria-label',
  SELECTED_ADJACENT: 'selected-adjacent',
  SELECTED_ADJACENT_VERTICAL: 'selected-adjacent-vertical',
  STRETCH: 'stretch'
};

const classes = {
  SELECTED: 'forge-button-toggle__selected',
  DENSE: 'forge-button-toggle--dense'
};

const selectors = {
  BUTTON: '.forge-button-toggle',
  SELECTED: `.${classes.SELECTED}`
};

const events = {
  SELECT: `${elementName}-select`
};

export const BUTTON_TOGGLE_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  events
};

export interface IButtonToggleSelectEventData {
  value: string;
  selected: boolean;
}
