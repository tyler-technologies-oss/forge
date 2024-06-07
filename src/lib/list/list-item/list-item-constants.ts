import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}list-item`;

const observedAttributes = {
  SELECTED: 'selected',
  ACTIVE: 'active',
  VALUE: 'value',
  DENSE: 'dense',
  INDENTED: 'indented',
  TWO_LINE: 'two-line',
  THREE_LINE: 'three-line',
  WRAP: 'wrap',
  NONINTERACTIVE: 'noninteractive'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  ROOT: 'forge-list-item',
  DISABLED: 'disabled',
  INTERACTIVE: 'interactive',
  INTERNAL_ANCHOR: 'anchor'
};

const ids = {
  INTERNAL_ANCHOR: 'forge-list-item-anchor'
};

const selectors = {
  ROOT: `.${classes.ROOT}`,
  FORM_CONTROL_LIKE:
    ':is([forge-list-item-interactive],forge-radio,forge-checkbox,forge-switch,input[type=checkbox],input[type=radio]):is([slot=start],[slot=end],[slot=leading],[slot=trailing]):not([forge-ignore])',
  BUTTON_LIKE: ':is(button,[role=button][tabindex]:not([tabindex=-1]),[forge-list-item-interactive]):not([forge-ignore])',
  IGNORE: '[forge-ignore],[data-forge-ignore]',
  INTERNAL_ANCHOR: `#${ids.INTERNAL_ANCHOR}`,
  SLOTTED_START_END: ':is([slot=start],[slot=end],[slot=leading],[slot=trailing])'
};

const events = {
  SELECT: `${elementName}-select`
};

export const LIST_ITEM_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  ids,
  events
};

export interface IListItemSelectEventData<T = unknown> {
  value: T;
}
