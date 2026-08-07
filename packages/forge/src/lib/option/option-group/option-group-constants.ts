import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}option-group`;

const attributes = {
  LABEL: 'label'
};

export const OPTION_GROUP_CONSTANTS = {
  elementName,
  attributes
};
