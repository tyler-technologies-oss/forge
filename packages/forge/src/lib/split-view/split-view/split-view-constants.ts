import { COMPONENT_NAME_PREFIX } from '../../constants';
import { ISplitViewBase } from '../core';
import { SPLIT_VIEW_PANEL_CONSTANTS } from '../split-view-panel/split-view-panel-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}split-view`;

const attributes = {
  ORIENTATION: 'orientation',
  DISABLED: 'disabled',
  ALLOW_CLOSE: 'allow-close',
  AUTO_CLOSE: 'auto-close',
  AUTO_CLOSE_THRESHOLD: 'auto-close-threshold'
};

const classes = {
  ROOT: 'forge-split-view'
};

const ids = {
  ROOT: 'root'
};

const selectors = {
  ROOT: `#${ids.ROOT}`,
  PANEL: SPLIT_VIEW_PANEL_CONSTANTS.elementName
};

const numbers = {
  RESIZE_THROTTLE_THRESHOLD: 200
};

const customCssProperties = {
  ANIMATING_LAYER: '--forge-split-view-animating-layer'
};

export const SPLIT_VIEW_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  selectors,
  numbers,
  customCssProperties
};

export type SplitViewOrientation = 'horizontal' | 'vertical';

export interface ISplitViewUpdateConfig {
  accessibility?: boolean;
  cursor?: boolean;
  orientation?: SplitViewOrientation;
  properties?: Partial<ISplitViewBase>;
  size?: boolean;
}
