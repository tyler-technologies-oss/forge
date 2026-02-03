import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}option`;

const attributes = {
  DISABLED: 'disabled',
  DIVIDER: 'divider',
  LABEL: 'label',
  SECONDARY_LABEL: 'secondary-label',
  LEADING_ICON_CLASS: 'leading-icon-class',
  LEADING_ICON_TYPE: 'leading-icon-type',
  LEADING_ICON: 'leading-icon',
  OPTION_CLASS: 'option-class',
  TRAILING_ICON_CLASS: 'trailing-icon-class',
  TRAILING_ICON_TYPE: 'trailing-icon-type',
  TRAILING_ICON: 'trailing-icon',
  TOOLTIP: 'tooltip',
  VALUE: 'value'
};

const events = {
  VALUE_CHANGE: `${elementName}-value-change`
};

export const OPTION_CONSTANTS = {
  elementName,
  attributes,
  events
};
