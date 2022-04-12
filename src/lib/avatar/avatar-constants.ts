import { COMPONENT_NAME_PREFIX } from '../constants';
import { COLOR_CONSTANTS } from '../theme';

const elementName = `${COMPONENT_NAME_PREFIX}avatar`;

const attributes = {
  IMAGE_URL: 'image-url',
  TEXT: 'text',
  LETTER_COUNT: 'letter-count',
  AUTO_COLOR: 'auto-color'
};

const numbers = {
  DEFAULT_LETTER_COUNT: 2
};

const selectors = {
  ROOT: '.forge-avatar',
  DEFAULT_SLOT: '.forge-avatar > slot:not([name])'
};

const strings = {
  DEFAULT_COLOR: COLOR_CONSTANTS.themeColors.tertiary,
  BACKGROUND_VARNAME: '--forge-avatar-theme-background'
};

export const AVATAR_CONSTANTS = {
  elementName,
  attributes,
  numbers,
  selectors,
  strings
};
