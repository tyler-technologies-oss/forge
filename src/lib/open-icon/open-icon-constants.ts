import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}open-icon`;

const classes = {
  ICON: 'forge-open-icon',
  ICON_OPEN: 'forge-open-icon--open'
};

const attributes = {
  OPEN: 'open',
  ORIENTATION: 'orientation'
};

const strings = {
  ORIENTATION_VERTICAL: 'vertical',
  ORIENTATION_HORIZONTAL: 'horizontal'
};

export const OPEN_ICON_CONSTANTS = {
  elementName,
  classes,
  attributes,
  strings
};
