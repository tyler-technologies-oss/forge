import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}focus-indicator`;

const observedAttributes = {
  TARGET: 'target',
  ACTIVE: 'active',
  INWARD: 'inward',
  CIRCULAR: 'circular',
  ALLOW_FOCUS: 'allow-focus'
};

const attributes = {
  ...observedAttributes
};

export const FOCUS_INDICATOR_CONSTANTS = {
  elementName,
  attributes
};
