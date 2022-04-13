import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}split-view-pane`;

const attributes = {
  DIRECTION: 'direction', // TODO: possibly rename to PLACEMENT or HANDLE?
  SIZE: 'size',
  MIN: 'min',
  MAX: 'max',
  OPEN: 'open',
  LABEL: 'label',
  DISABLED: 'disabled',
  ORIENTATION: 'orientation'
};

const classes = {
  ROOT: 'tyl-split-view-pane',
  GRABBED: 'tyl-split-view-pane--grabbed',
  HANDLE: 'tyl-split-view-pane__handle',
  ICON: 'tyl-split-view-pane__icon',
  CONTENT: 'tyl-split-view-pane__content',
  CLOSED: 'tyl-split-view-pane--closed',
  CLOSING: 'tyl-split-view-pane--closing',
  OPENING: 'tyl-split-view-pane--opening'
};

const ids = {
  ROOT: 'root',
  HANDLE: 'handle',
  ICON: 'icon',
  CONTENT: 'content'
};

const selectors = {
  ROOT: `#${ids.ROOT}`,
  HANDLE: `#${ids.HANDLE}`,
  ICON: `#${ids.ICON}`,
  CONTENT: `#${ids.CONTENT}`
};

const events = {
  DRAG_START: `${elementName}-drag-start`,
  DRAG_END: `${elementName}-drag-end`,
  RESIZE: `${elementName}-resize`,
  DID_OPEN: `${elementName}-did-open`,
  DID_CLOSE: `${elementName}-did-close`
};

export const SPLIT_VIEW_PANE_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  selectors,
  events
};

// 'start' panes have a handle on the right/bottom and collapse to the left/top
// 'end' panes have a handle on the left/top and collapse to the right/bottom
// 'none' panes don't a handle, are not resizable, and fill the remaining space
export type SplitViewPaneDirection = 'start' | 'end' | 'none';
