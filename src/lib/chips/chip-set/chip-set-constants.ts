import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}chip-set`;

const attributes = {
  VERTICAL: 'vertical',
  TYPE: 'type',
  DENSE: 'dense',
  DISABLED: 'disabled'
};

const classes = {
  ROOT: 'forge-chip-set',
  VERTICAL: 'forge-chip-set--vertical'
};

const selectors = {
  ROOT: `.${classes.ROOT}`
};

export const CHIP_SET_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};
