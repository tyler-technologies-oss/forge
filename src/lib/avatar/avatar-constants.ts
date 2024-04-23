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

const selectors = {
  ROOT: '.forge-avatar',
  DEFAULT_SLOT: '.forge-avatar > slot:not([name])'
};

const strings = {
  BACKGROUND_VARNAME: '--forge-avatar-background'
};

export const AVATAR_CONSTANTS = {
  elementName,
  attributes,
  numbers,
  selectors,
  strings
};
