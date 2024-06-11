import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}chip-set`;

const observedAttributes = {
  VERTICAL: 'vertical',
  TYPE: 'type',
  DENSE: 'dense',
  DISABLED: 'disabled',
  INVALID: 'invalid',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: '.forge-chip-set'
};

export const CHIP_SET_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors
};
