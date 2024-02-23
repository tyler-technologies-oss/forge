import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}toolbar`;

const attributes = {
  INVERTED: 'inverted'
};

const classes = {
  TOOLBAR: 'forge-toolbar'
};

const selectors = {
  TOOLBAR: `.${classes.TOOLBAR}`
};

export const TOOLBAR_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};
