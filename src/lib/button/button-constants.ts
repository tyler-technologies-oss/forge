import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button`;

const observedAttributes = {
  VARIANT: 'variant',
  PILL: 'pill',
  THEME: 'theme',
  FULL_WIDTH: 'full-width'
};

const attributes = {
  ...observedAttributes
};

export const BUTTON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};

export type ButtonVariant = 'text' | 'outlined' | 'tonal' | 'filled' | 'raised' | 'link';
export type ButtonTheme = Theme;
