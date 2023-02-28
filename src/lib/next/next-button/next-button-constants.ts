import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}next-button`;

const classes = {
  RAISED: 'forge-button--raised',
  FLAT: 'forge-button--unelevated',
  OUTLINED: 'forge-button--outlined',
  DENSE: 'forge-button--dense'
};

const observedAttributes = {
  VARIANT: 'variant',
  DENSE: 'dense'
};

const attributes = {
  ...observedAttributes
};

export const NEXT_BUTTON_CONSTANTS = {
  elementName,
  classes,
  observedAttributes,
  attributes
};

export type NextButtonVariant = 'text' | 'raised' | 'flat' | 'outlined';
