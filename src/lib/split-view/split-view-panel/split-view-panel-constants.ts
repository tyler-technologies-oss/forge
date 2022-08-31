import { COMPONENT_NAME_PREFIX } from '../../constants';
import { SplitViewOrientation } from '../split-view/split-view-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}split-view-panel`;

const attributes = {
  POSITION: 'position',
  SIZE: 'size',
  MIN: 'min',
  MAX: 'max',
  OPEN: 'open',
  ACCESSIBLE_LABEL: 'accessible-label',
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
  RIPPLE: 'ripple',
  CONTENT: 'content'
};

const selectors = {
  ROOT: `#${ids.ROOT}`,
  HANDLE: `#${ids.HANDLE}`,
  ICON: `#${ids.ICON}`,
  RIPPLE: `#${ids.RIPPLE}`,
  CONTENT: `#${ids.CONTENT}`
};

const events = {
  RESIZE_START: `${elementName}-resize-start`,
  RESIZE_END: `${elementName}-resize-end`,
  RESIZE: `${elementName}-resize`,
  DID_OPEN: `${elementName}-did-open`,
  DID_CLOSE: `${elementName}-did-close`
};

const numbers = {
  RIPPLE_ACTIVATION_WAIT: 200
};

const customCssProperties = {
  SIZE: '--forge-split-view-panel-size',
  CURSOR: '--forge-split-view-panel-cursor'
};

export const SPLIT_VIEW_PANEL_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  selectors,
  events,
  numbers,
  customCssProperties
};

// 'start' panels have a handle on the right/bottom and collapse to the left/top
// 'end' panels have a handle on the left/top and collapse to the right/bottom
// 'default' panels don't have a handle, are not resizable, and fill the remaining space
export type SplitViewPanelPosition = 'start' | 'end' | 'default';

export enum SplitViewAnimatingLayer {
  Under = 1,
  Active = 2,
  Above = 3
}

export interface ISplitViewPanelCursorConfig {
  position: SplitViewPanelPosition;
  boundary: 'min' | 'max' | 'none';
}

export interface ISplitViewPanelState {
  orientation: SplitViewOrientation;
  position: SplitViewPanelPosition;
  arrowKeyHeld: boolean;
  startPoint?: number;
  startSize?: number;
  currentSize?: number;
  availableSpace?: number;
  siblingSize?: number;
  keyboardDelta: number;
  isAtMin: boolean;
  isAtMax: boolean;
  min: number;
  max?: number;
}
