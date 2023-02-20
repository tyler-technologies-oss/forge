import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}next-button`;

const classes = {
  RAISED: 'forge-button--raised',
  FLAT: 'forge-button--unelevated',
  OUTLINED: 'forge-button--outlined',
  DENSE: 'forge-button--dense',
  DISABLED: 'forge-button--disabled'
};

const selectors = {
  ROOT: '.forge-button'
};

const observedAttributes = {
  TYPE: 'type',
  VARIANT: 'variant',
  DENSE: 'dense',
  DISABLED: 'disabled'
};

const attributes = {
  ...observedAttributes
};

export const NEXT_BUTTON_CONSTANTS = {
  elementName,
  classes,
  selectors,
  observedAttributes,
  attributes
};

export type NextButtonType = 'button' | 'submit' | 'reset';
export type NextButtonVariant = 'text' | 'raised' | 'flat' | 'outlined';
