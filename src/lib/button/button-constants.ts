import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}button`;

const observedAttributes = {
  VARIANT: 'variant',
  PILL: 'pill',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

export const BUTTON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};

export type ButtonVariant = 'text' | 'raised' | 'outlined' | 'flat' | 'link';
export type ButtonTheme = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info';
