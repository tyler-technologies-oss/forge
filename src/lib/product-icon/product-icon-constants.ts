import { COMPONENT_NAME_PREFIX } from '../constants';
import { COLOR_CONSTANTS } from '../theme/color-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}product-icon`;

const classes = {
  PRODUCT_ICON_BACKGROUND: 'forge-product-icon__background',
  PRODUCT_ICON: 'forge-product-icon__icon',
  PRODUCT_TEXT: 'forge-product-icon__text'
};

const selectors = {
  PRODUCT_ICON_BACKGROUND: `.${classes.PRODUCT_ICON_BACKGROUND}`,
  PRODUCT_ICON: `.${classes.PRODUCT_ICON}`,
  PRODUCT_TEXT: `.${classes.PRODUCT_TEXT}`,
  SLOT: 'slot'
};

const attributes = {
  COLOR: 'color',
  SIZE: 'size',
  SHADOW: 'shadow',
  ITERATIONS: 'iterations'
};

const numbers = {
  DEFAULT_SIZE: 64,
  DEFAULT_ITERATIONS: 32,
  ACCESSIBILITY_COLOR_THRESHOLD: 300,
  ICON_FONT_SIZE_MODIFIER: 0.75,
  TEXT_FONT_SIZE_MODIFIER: 0.5
};

const strings = {
  DEFAULT_COLOR_VALUE: 'indigo-500',
  DEFAULT_COLOR_PALETTE: 'indigo',
  DEFAULT_COLOR_SHADE: 500,
  DEFAULT_BACKGROUND_COLOR: COLOR_CONSTANTS.indigoPalette[500]
};

export const PRODUCT_ICON_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  numbers,
  strings
};
