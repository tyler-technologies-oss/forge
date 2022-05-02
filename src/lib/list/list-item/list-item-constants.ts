import { COMPONENT_NAME_PREFIX } from '../../constants';
import { IListItemComponent } from './list-item';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}list-item`;

const attributes = {
  STATIC: 'static',
  TWO_LINE: 'two-line',
  THREE_LINE: 'three-line',
  ACTIVE: 'active',
  SELECTED: 'selected',
  VALUE: 'value',
  HREF: 'href',
  TARGET: 'target',
  RIPPLE: 'ripple',
  DISABLED: 'disabled',
  DENSE: 'dense',
  PROPAGATE_CLICK: 'propagate-click',
  INDENTED: 'indented',
  WRAP: 'wrap',
  DRAWER_CONTEXT: 'forge-drawer-context',
  IGNORE: 'forge-ignore'
};

const classes = {
  LIST_ITEM: 'forge-list-item',
  STATIC: 'forge-list-item--static',
  TEXT: 'forge-list-item__text',
  TWO_LINE: 'forge-list-item--two-line',
  THREE_LINE: 'forge-list-item--three-line',
  ACTIVE: 'forge-list-item--active',
  ACTIVATED: 'forge-list-item--activated',
  SELECTED: 'forge-list-item--selected',
  DISABLED: 'forge-list-item--disabled',
  DENSE: 'forge-list-item--dense',
  INDENTED: 'forge-list-item--indented',
  WRAP: 'forge-list-item--wrap'
};

const selectors = {
  LIST_ITEM: `.${classes.LIST_ITEM}`,
  DEFAULT_SLOT: `.${classes.TEXT} > slot`,
  CHECKBOX_RADIO_SELECTOR: 'input[type=checkbox]:not(:disabled):not([forge-ignore]),input[type=radio]:not(:disabled):not([forge-ignore])'
};

const events = {
  SELECT: `${elementName}-select`
};

const roles = {
  LINK: 'link',
  LIST_ITEM: 'listitem'
};

export const LIST_ITEM_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  events,
  roles
};

export interface IListItemSelectEventData {
  value: any;
  listItem: IListItemComponent;
}
