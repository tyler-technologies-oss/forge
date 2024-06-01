import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}modal-drawer`;

const classes = {
  DISPLAY_NONE: 'display-none',
  SCRIM_CLOSED: 'closed'
};

const events = {
  CLOSE: `${elementName}-close`
};

export const MODAL_DRAWER_CONSTANTS = {
  elementName,
  classes,
  events
};
