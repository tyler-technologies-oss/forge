import { COMPONENT_NAME_PREFIX } from '../constants';
import { DialogMode, DIALOG_CONSTANTS } from '../dialog';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}bottom-sheet`;

const observedAttributes = {
  PERSISTENT: 'persistent',
  MODE: 'mode',
  OPEN: 'open',
  FULLSCREEN: 'fullscreen'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  DRAGGING: 'dragging',
  FULLSCREEN: 'fullscreen'
};

const selectors = {
  DIALOG: DIALOG_CONSTANTS.elementName,
  SURFACE: '.surface',
  CONTENT_BODY: '[forge-bottom-sheet-body]',
  INITIAL_FOCUS: `:is([autofocus], [${elementName}-focus])`
};

const events = {
  BEFORE_CLOSE: 'forge-bottom-sheet-before-close',
  CLOSE: 'forge-bottom-sheet-close',
  OPEN: 'forge-bottom-sheet-open',
  READY: 'forge-bottom-sheet-ready',
  DRAG_START: 'forge-bottom-sheet-drag-start',
  DRAGGED: 'forge-bottom-sheet-dragged',
  DRAG_END: 'forge-bottom-sheet-drag-end',
  DRAG_CANCEL: 'forge-bottom-sheet-drag-cancel',
  FULLSCREEN: 'forge-bottom-sheet-fullscreen'
};

const defaults = {
  mode: 'nonmodal' as BottomSheetMode
};

export const BOTTOM_SHEET_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  events,
  defaults
};

export interface IBottomSheetDragEventData {
  y: number;
}

export interface IBottomSheetDragStartEventData extends IBottomSheetDragEventData {}

export interface IBottomSheetDragContext {
  top: number;
  height: number;
}

export type BottomSheetMode = DialogMode;
