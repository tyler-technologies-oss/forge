import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}option-group`;

const attributes = {
  LABEL: 'label'
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const OPTION_GROUP_CONSTANTS = {
  elementName,
  attributes
};
