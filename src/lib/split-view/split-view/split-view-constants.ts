import { COMPONENT_NAME_PREFIX } from '../../constants';
import { SPLIT_VIEW_PANE_CONSTANTS } from '../split-view-pane/split-view-pane-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}split-view`;

const attributes = {
  ORIENTATION: 'orientation',
  DISABLED: 'disabled'
};

const classes = {
  ROOT: 'tyl-split-view'
};

const ids = {
  ROOT: 'root'
};

const selectors = {
  ROOT: `#${ids.ROOT}`,
  PANE: SPLIT_VIEW_PANE_CONSTANTS.elementName
};

export const SPLIT_VIEW_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  selectors
};

export type SplitViewOrientation = 'horizontal' | 'vertical';
