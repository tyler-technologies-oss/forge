import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}accordion`;

const attributes = {
  PANEL_SELECTOR: 'panel-selector'
};

export const ACCORDION_CONSTANTS = {
  elementName,
  attributes
};
