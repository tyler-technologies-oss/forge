import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}avatar`;

const attributes = {
  IMAGE_URL: 'image-url',
  TEXT: 'text',
  LETTER_COUNT: 'letter-count'
};

const numbers = {
  DEFAULT_LETTER_COUNT: 2
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const AVATAR_CONSTANTS = {
  elementName,
  attributes,
  numbers
};
