import { COMPONENT_NAME_PREFIX } from '../../../constants';
import { IListItemComponentExp } from './list-item';

const elementName = `${COMPONENT_NAME_PREFIX}list-item-exp`;

const observedAttributes = {
  HREF: 'href',
  TARGET: 'target',
  STATIC: 'static',
  NON_INTERACTIVE: 'non-interactive',
  DISABLED: 'disabled',
  SELECTED: 'selected',
  ACTIVE: 'active',
  VALUE: 'value',
  DENSE: 'dense',
  INDENTED: 'indented',
  TWO_LINE: 'two-line',
  THREE_LINE: 'three-line',
  WRAP: 'wrap'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  ROOT: 'forge-list-item'
};

const selectors = {
  ROOT: `.${classes.ROOT}`,
  CHECKBOX_RADIO_SELECTOR: 'input[type=checkbox]:not(:disabled):not([forge-ignore]),input[type=radio]:not(:disabled):not([forge-ignore])',
  IGNORE: '[forge-ignore],[data-forge-ignore]'
};

const events = {
  SELECT: `${elementName}-select`
};

export const LIST_ITEM_CONSTANTS_EXP = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  events
};

export interface IListItemExpSelectEventData<T = unknown> {
  value: T;
  listItem: IListItemComponentExp;
}
