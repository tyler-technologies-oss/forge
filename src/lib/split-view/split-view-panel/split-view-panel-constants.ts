import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}split-view-panel`;

const attributes = {
  POSITION: 'position',
  SIZE: 'size',
  MIN: 'min',
  MAX: 'max',
  OPEN: 'open',
  LABEL: 'label',
  DISABLED: 'disabled',
  AUTO_CLOSE: 'auto-close',
  DISABLE_CLOSE: 'disable-close',
  ORIENTATION: 'orientation'
};

const classes = {
  ROOT: 'forge-split-view-panel',
  GRABBED: 'forge-split-view-panel--grabbed',
  HANDLE: 'forge-split-view-panel__handle',
  ICON: 'forge-split-view-panel__icon',
  CONTENT: 'forge-split-view-panel__content',
  CLOSED: 'forge-split-view-panel--closed',
  CLOSING: 'forge-split-view-panel--closing',
  OPENING: 'forge-split-view-panel--opening',
  DISABLED: 'forge-split-view-panel--disabled'
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

export const SPLIT_VIEW_PANEL_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  selectors,
  events
};

// 'start' panels have a handle on the right/bottom and collapse to the left/top
// 'end' panels have a handle on the left/top and collapse to the right/bottom
// 'none' panels don't a handle, are not resizable, and fill the remaining space
export type SplitViewPanelPosition = 'start' | 'end' | 'none';

export enum SplitViewAnimatingLayer {
  Under = 1,
  Active = 2,
  Above = 3
}
