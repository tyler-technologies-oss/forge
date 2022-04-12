import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}modal-drawer`;

const classes = {
  DISPLAY_NONE: 'forge-drawer--display-none',
  SCRIM_CLOSED: 'forge-drawer__scrim--closed'
};

const events = {
  CLOSE: `${elementName}-close`
};

export const MODAL_DRAWER_CONSTANTS = {
  elementName,
  classes,
  events
};
