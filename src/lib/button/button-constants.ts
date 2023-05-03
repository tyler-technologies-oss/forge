import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button`;

export const ALLOWED_CHILDREN = ['button', 'a'];

const classes = {
  BUTTON: 'forge-button',
  LABEL: 'forge-button__label',
  ICON: 'forge-button__icon',
  BUTTON_RAISED: 'forge-button--raised',
  BUTTON_UNELEVATED: 'forge-button--unelevated',
  BUTTON_OUTLINED: 'forge-button--outlined',
  BUTTON_DENSE: 'forge-button--dense',
  RIPPLE: 'forge-button__ripple'
};

const selectors = {
  BUTTON: ALLOWED_CHILDREN.join(','),
  LABEL: `span:not(.${classes.RIPPLE})`,
  ICON: 'i,forge-icon,[data-forge-button-icon]',
  RIPPLE: `.${classes.RIPPLE}`
};

const attributes = {
  TYPE: 'type',
  DISABLED: 'disabled'
};

export const BUTTON_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes
};
