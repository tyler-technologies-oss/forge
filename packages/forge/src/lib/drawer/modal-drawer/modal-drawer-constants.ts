import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}modal-drawer`;

const classes = {
  DISPLAY_NONE: 'display-none',
  SCRIM_CLOSED: 'closed'
};

const events = {
  CLOSE: `${elementName}-close`
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const MODAL_DRAWER_CONSTANTS = {
  elementName,
  classes,
  events
};
