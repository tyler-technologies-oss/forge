import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}footer`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const FOOTER_CONSTANTS = {
  elementName
};

export type FooterLayout = 'standard' | 'alternative' | 'auto';
