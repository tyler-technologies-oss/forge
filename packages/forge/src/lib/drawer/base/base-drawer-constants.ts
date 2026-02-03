const observedAttributes = {
  OPEN: 'open',
  DIRECTION: 'direction'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  DRAWER: 'forge-drawer',
  LEFT: 'left',
  RIGHT: 'right',
  CLOSING: 'closing',
  CLOSED: 'closed',
  NO_TRANSITION: 'no-transition'
};

const selectors = {
  DRAWER: `.${classes.DRAWER}`
};

const events = {
  AFTER_OPEN: `forge-drawer-after-open`,
  AFTER_CLOSE: `forge-drawer-after-close`
};

export const BASE_DRAWER_CONSTANTS = {
  observedAttributes,
  attributes,
  classes,
  selectors,
  events
};

export type DrawerDirection = 'left' | 'right';
