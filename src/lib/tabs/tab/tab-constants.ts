import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab`;

const attributes = {
  DISABLED: 'disabled',
  ACTIVE: 'active',
  STRETCH: 'stretch'
};

const selectors = {
  ROOT: '.forge-tab',
  RIPPLE: '.forge-tab__ripple',
  INDICATOR: '.mdc-tab-indicator',
  CONTENT: '.forge-tab__content',
  DEFAULT_SLOT: 'slot:not([name])'
};

const classes = {
  DISABLED: 'forge-tab--disabled',
  ACTIVE: 'forge-tab--active'
};

const events = {
  INTERACTED: `${elementName}-interacted`
};

export const TAB_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  classes,
  events
};

export interface ITabDimensions {
  rootLeft: number;
  rootRight: number;
  contentLeft: number;
  contentRight: number;
}
