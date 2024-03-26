import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}button-area`;

const attributes = {
  DISABLED: 'disabled',
  IGNORE: 'data-forge-ignore',
  IGNORE_ALT: 'forge-ignore'
};

const ids = {
  ROOT: 'root',
  BUTTON_SLOT: 'button',
  CONTENT_SLOT: 'content'
};

const classes = {
  ROOT: `forge-button-area`
};

const selectors = {
  ROOT: `#${ids.ROOT}`,
  BUTTON_SLOT: `slot[name=button]`,
  CONTENT_SLOT: `#${ids.CONTENT_SLOT}`
};

export const BUTTON_AREA_CONSTANTS = {
  elementName,
  attributes,
  ids,
  classes,
  selectors
};
