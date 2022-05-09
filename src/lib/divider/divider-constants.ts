import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}divider`;
const classes = {
  ROOT: '.forge-divider'
};

export const DIVIDER_CONSTANTS = {
  elementName,
  classes
};
