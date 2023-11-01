const observedAttributes = {
  TYPE: 'type',
  DISABLED: 'disabled',
  HREF: 'href',
  TARGET: 'target',
  DOWNLOAD: 'download',
  REL: 'rel',
  DENSE: 'dense'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  ROOT: 'forge-button'
};

const selectors = {
  ROOT:'[part=root]'
};

export const BASE_BUTTON_CONSTANTS = {
  observedAttributes,
  attributes,
  selectors,
  classes
};

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonTarget = '_blank' | '_self' | '_parent' | '_top';
