import { COMPONENT_NAME_PREFIX } from '../../constants';
import { OPEN_ICON_CONSTANTS } from '../../open-icon';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tree-item`;

const observedAttributes = {
  VALUE: 'value',
  SELECTED: 'selected',
  OPEN: 'open',
  LEVEL: 'level'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  LEAF: 'leaf',
  INDETERMINATE: 'indeterminate'
};

const slots = {
  CHILDREN: 'children'
};

const selectors = {
  ROOT: `.${elementName}`,
  HEADER: '.header',
  OPEN_ICON: OPEN_ICON_CONSTANTS.elementName,
  CHILDREN_SLOT: `slot[name=${slots.CHILDREN}]`,
  CHECKBOX: '#checkbox'
};

const events = {
  OPEN: `${elementName}-open`,
  SELECT: `${elementName}-select`,
  UPDATE: `${elementName}-update`
};

const icons = {
  CHECK: 'check_box',
  INDETERMINATE: 'indeterminate_check_box',
  UNCHECK: 'check_box_outline_blank'
};

const cssCustomProperties = {
  LEVEL: '--_tree-item-level'
};

export const TREE_ITEM_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  slots,
  selectors,
  events,
  icons,
  cssCustomProperties
};

export const setIndeterminate = Symbol('setIndeterminate');
export const setOpen = Symbol('setOpen');
export const setSelected = Symbol('setSelected');

export type TreeItemUpdateReason = 'append' | 'open' | 'remove' | 'select';
