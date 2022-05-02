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
  BACKDROP_CLOSE: 'backdrop-close',
  ESCAPE_CLOSE: 'escape-close',
  FULLSCREEN: 'fullscreen',
  POSITION_TYPE: 'position-type',
  POSITION_X: 'position-x',
  POSITION_Y: 'position-y',
  MOVEABLE: 'moveable',
  MOVE_TARGET: 'move-target',
  OPEN: 'forge-dialog-open',
  INITIAL_FOCUS: 'forge-dialog-focus',
  DFEAULT_MOVE_TARGET: 'forge-dialog-move-target'
};

const selectors = {
  CONTAINER: '.forge-dialog',
  SURFACE: '.forge-dialog__surface',
  BACKDROP: BACKDROP_CONSTANTS.elementName,
  INITIAL_FOCUS: `[${attributes.INITIAL_FOCUS}]`,
  DFEAULT_MOVE_TARGET: `[${attributes.DFEAULT_MOVE_TARGET}]`,
  CONTENT: '.forge-dialog__body'
};

const events = {
  BEFORE_CLOSE: `${elementName}-before-close`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  READY: `${elementName}-ready`,
  MOVE_START: `${elementName}-move-start`,
  MOVED: `${elementName}-move`,
  MOVE_END: `${elementName}-move-end`
};

const numbers = {
  ANIMATION_DURATION: 150,
  BACKDROP_MAX_OPACITY: 0.3
};

export const DIALOG_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events,
  numbers
};

export interface IDialogMoveEventData {
  x: number;
  y: number;
}

export interface IDialogMoveContext {
  top: number;
  left: number;
  height: number;
  width: number;
}

export interface IDialogMoveStartEventData extends IDialogMoveEventData {}

export type DialogPositionType = 'absolute' | 'relative';
export type DialogStateCallback = () => boolean | void | Promise<boolean | void>;
