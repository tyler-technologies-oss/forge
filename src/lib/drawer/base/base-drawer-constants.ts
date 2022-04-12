const attributes = {
  OPEN: 'open',
  DIRECTION: 'direction'
};

const classes = {
  DRAWER: 'forge-drawer',
  LEFT: 'forge-drawer--left',
  RIGHT: 'forge-drawer--right',
  CLOSING: 'forge-drawer--closing',
  CLOSED: 'forge-drawer--closed',
  NO_TRANSITION: 'forge-drawer--no-transition'
};

const selectors = {
  DRAWER: `.${classes.DRAWER}`
};

const events = {
  AFTER_OPEN: `forge-drawer-after-open`,
  AFTER_CLOSE: `forge-drawer-after-close`
};

export const BASE_DRAWER_CONSTANTS = {
  attributes,
  classes,
  selectors,
  events
};

export type DrawerDirection = 'left' | 'right';
