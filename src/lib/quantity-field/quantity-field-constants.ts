import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}quantity-field`;

const attributes = {
  INVALID: 'invalid',
  REQUIRED: 'required',
  DISABLED: 'disabled'
};

const classes = {
  ROOT: 'forge-quantity-field',
  INVALID: 'forge-quantity-field--invalid',
  REQUIRED: 'forge-quantity-field--required'
};

const slots = {
  INCREMENT_BUTTON: 'increment-button',
  DECREMENT_BUTTON: 'decrement-button',
  LABEL: 'label',
  HELPER_TEXT: 'helper-text'
};

const selectors = {
  ROOT: `.${classes.ROOT}`,
  INCREMENT_BUTTON_SLOT: `slot[name=${slots.INCREMENT_BUTTON}]`,
  DECREMENT_BUTTON_SLOT: `slot[name=${slots.DECREMENT_BUTTON}]`,
  INCREMENT_BUTTON: `[slot=${slots.INCREMENT_BUTTON}] button, button[slot=${slots.INCREMENT_BUTTON}]`,
  DECREMENT_BUTTON: `[slot=${slots.DECREMENT_BUTTON}] button, button[slot=${slots.DECREMENT_BUTTON}]`,
  TEXT_FIELD: 'forge-text-field',
  INPUT: 'input[type=number]',
  LABEL: `[slot=${slots.LABEL}]`,
  HELPER_TEXT: `[slot=${slots.HELPER_TEXT}]`
};

export const QUANTITY_FIELD_CONSTANTS = {
  elementName,
  classes,
  slots,
  selectors,
  attributes
};
