import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}toolbar`;

const attributes = {
  INVERTED: 'inverted'
};

const classes = {
  INVERTED: 'forge-toolbar--inverted',
  TOOLBAR: 'forge-toolbar',
  SECTION: 'forge-toolbar__section',
  ALIGN_START: 'forge-toolbar__section--align-start',
  ALIGN_CENTER: 'forge-toolbar__section--align-center',
  ALIGN_END: 'forge-toolbar__section--align-end'
};

const selectors = {
  TOOLBAR: `.${classes.TOOLBAR}`,
  START_SLOT: `.${classes.SECTION}.${classes.ALIGN_START} > slot[name=start]`,
  CENTER_SLOT: `.${classes.SECTION}.${classes.ALIGN_CENTER} > slot[name=center]`,
  END_SLOT: `.${classes.SECTION}.${classes.ALIGN_END} > slot[name=end]`
};

export const TOOLBAR_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};
