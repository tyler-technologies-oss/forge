import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}date-picker`;

const observedAttributes = {
  VALUE: 'value'
};

const selectors = {
  INPUT: 'input,input[forge-date-picker-input]'
};

const events = {
  CHANGE: `${elementName}-change`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  INPUT: `${elementName}-input`
};

export const DATE_PICKER_CONSTANTS = {
  elementName,
  selectors,
  events,
  observedAttributes
};
