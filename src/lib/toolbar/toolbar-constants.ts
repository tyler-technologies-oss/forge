import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}toolbar`;

const attributes = {
  INVERTED: 'inverted'
};

const classes = {
  TOOLBAR: 'forge-toolbar'
};

const selectors = {
  TOOLBAR: `.${classes.TOOLBAR}`,
  BEFORE_START: `slot[name=before-start]`,
  START_SLOT: `slot[name=start]`,
  CENTER_SLOT: `slot[name=center]`,
  END_SLOT: `slot[name=end]`,
  AFTER_END: `slot[name=after-end]`
};

export const TOOLBAR_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};
