import { BACKDROP_CONSTANTS } from '../backdrop';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}bottom-sheet`;

const classes = {
  DRAGGING: 'forge-bottom-sheet--dragging',
  FULLSCREEN: 'forge-bottom-sheet--fullscreen',
  OPEN: 'forge-bottom-sheet--open',
  SCROLLABLE: 'forge-bottom-sheet--scrollable'
};

const attributes = {
  BACKDROP_CLOSE: 'backdrop-close',
  ESCAPE_CLOSE: 'escape-close',
  FULLSCREEN: 'fullscreen',
  INITIAL_FOCUS: `${elementName}-focus`,
  OPEN: `${elementName}-open`,
  SHOW_BACKDROP: 'show-backdrop'
};

const selectors = {
  BACKDROP: BACKDROP_CONSTANTS.elementName,
  CONTAINER: '.forge-bottom-sheet',
  CONTENT_BODY: '[forge-bottom-sheet-body]',
  INITIAL_FOCUS: `[${attributes.INITIAL_FOCUS}]`,
  HOST: `[${elementName}-host]`
};

const events = {
  BEFORE_CLOSE: `forge-bottom-sheet-before-close`,
  CLOSE: `forge-bottom-sheet-close`,
  OPEN: `forge-bottom-sheet-open`,
  READY: `forge-bottom-sheet-ready`,
  DRAG_START: `forge-bottom-sheet-drag-start`,
  DRAGGED: `forge-bottom-sheet-dragged`,
  DRAG_END: `forge-bottom-sheet-drag-end`,
  DRAG_CANCEL: `forge-bottom-sheet-drag-cancel`,
  FULLSCREEN: `forge-bottom-sheet-fullscreen`
};

export const BOTTOM_SHEET_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events
};

export interface IBottomSheetDragEventData {
  y: number;
}

export interface IBottomSheetDragStartEventData extends IBottomSheetDragEventData {}

export interface IBottomSheetDragContext {
  top: number;
  height: number;
}
