import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}card`;

const attributes = {
  RAISED: 'raised'
};

const classes = {
  RAISED: 'forge-card--raised'
};

const selectors = {
  ROOT: '.forge-card'
};

export const CARD_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};
