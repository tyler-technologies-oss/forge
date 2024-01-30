import { COMPONENT_NAME_PREFIX } from '../constants';
import { BACKDROP_CONSTANTS } from '../backdrop';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}dialog`;

const classes = {
  ANIMATING: 'forge-dialog--animating',
  OPEN: 'forge-dialog--open',
  ACTION_BUTTON: 'forge-dialog__action__button',
  BUTTON_TEXT: 'forge-button__text',
  SCROLLABLE: 'forge-dialog--scrollable',
  FULLSCREEN: 'forge-dialog--fullscreen',
  MOVEABLE: 'forge-dialog--moveable'
};

const attributes = {
  OPEN: 'open',
  PERSISTENT: 'persistent',
  BACKDROP_CLOSE: 'backdrop-close',
  ESCAPE_CLOSE: 'escape-close'
};

const selectors = {
  DIALOG: '.forge-dialog'
};

const events = {
  BEFORE_CLOSE: `${elementName}-before-close`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  MOVE_START: `${elementName}-move-start`,
  MOVED: `${elementName}-move`,
  MOVE_END: `${elementName}-move-end`
};

export const DIALOG_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events
};
