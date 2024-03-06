import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}dialog`;

const observedAttributes = {
  OPEN: 'open',
  MODE: 'mode',
  TYPE: 'type',
  PERSISTENT: 'persistent',
  BACKDROP_CLOSE: 'backdrop-close',
  ESCAPE_CLOSE: 'escape-close'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  DIALOG: '.forge-dialog',
  SURFACE: '.surface'
};

const events = {
  BEFORE_CLOSE: `${elementName}-before-close`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  MOVE_START: `${elementName}-move-start`,
  MOVED: `${elementName}-move`,
  MOVE_END: `${elementName}-move-end`
};

const defaults = {
  MODE: 'modal' as DialogMode,
  TYPE: 'dialog' as DialogType
};

export const DIALOG_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events,
  defaults
};

export type DialogMode = 'modal' | 'nonmodal';
export type DialogType = 'dialog' | 'alertdialog';
