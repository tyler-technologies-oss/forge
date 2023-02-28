const classes = {
  ROOT: 'forge-button',
  DISABLED: 'forge-button--disabled'
};

const selectors = {
  ROOT: `.${classes.ROOT}`
};

const observedAttributes = {
  TYPE: 'type',
  DISABLED: 'disabled',
  HREF: 'href'
};

const attributes = {
  ...observedAttributes
};

export const NEXT_BASE_BUTTON_CONSTANTS = {
  classes,
  selectors,
  observedAttributes,
  attributes
};

export type NextButtonType = 'button' | 'submit' | 'reset';
export type NextAnchorTarget = '_blank' | '_parent' | '_self' | '_top';
