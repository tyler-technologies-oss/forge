import { COMPONENT_NAME_PREFIX } from '../../constants';
import { OPEN_ICON_CONSTANTS } from '../../open-icon';
import { ITreeItemComponent, TREE_ITEM_CONSTANTS } from '../tree-item';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tree`;

const observedAttributes = {
  VALUE: 'value',
  MODE: 'mode',
  SELECTION_FOLLOWS_FOCUS: 'selection-follows-focus',
  ACCORDION: 'accordion',
  MULTIPLE: 'multiple',
  INDENT_LINES: 'indent-lines'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: `.${elementName}`,
  OPEN_ITEM: `${TREE_ITEM_CONSTANTS.elementName}[${TREE_ITEM_CONSTANTS.attributes.OPEN}]`,
  EXPAND_ICON: OPEN_ICON_CONSTANTS.elementName
};

const numbers = {
  SEARCH_TIMEOUT: 500
};

export const TREE_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  numbers
};

export type TreeMode = 'single' | 'multiple' | 'leaf';

export interface ITreeItemSnapshot {
  el: ITreeItemComponent;
  indeterminate: boolean;
  open: boolean;
  selected: boolean;
}
