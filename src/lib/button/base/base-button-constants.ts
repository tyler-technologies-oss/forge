const observedAttributes = {
  TYPE: 'type',
  DISABLED: 'disabled',
  POPOVER_ICON: 'popover-icon',
  ANCHOR: 'anchor',
  HREF: 'href',
  TARGET: 'target',
  DOWNLOAD: 'download',
  REL: 'rel',
  DENSE: 'dense',
  TABINDEX: 'tabindex'
} as const;

const attributes = {
  ...observedAttributes
} as const;

const classes = {
  ROOT: 'forge-button',
  POPOVER_ICON: 'forge-button__popover-icon'
} as const;

const selectors = {
  ROOT:'[part=root]',
  END_SLOT: 'slot[name=end]'
} as const;

export const BASE_BUTTON_CONSTANTS = {
  observedAttributes,
  attributes,
  selectors,
  classes
} as const;

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonTarget = '_blank' | '_self' | '_parent' | '_top';
export type ButtonClickOptions = { animateStateLayer?: boolean };
