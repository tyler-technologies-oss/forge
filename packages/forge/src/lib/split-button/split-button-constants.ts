import { ButtonTheme, ButtonVariant } from '../button/index.js';
import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}split-button`;

const attributes = {
  VARIANT: 'variant',
  THEME: 'theme',
  DISABLED: 'disabled',
  DENSE: 'dense',
  PILL: 'pill'
};

const defaults = {
  DEFAULT_VARIANT: 'text' as SplitButtonVariant,
  DEFAULT_THEME: 'primary' as ButtonTheme
};

export const SPLIT_BUTTON_CONSTANTS = {
  elementName,
  attributes,
  defaults
};

export type SplitButtonVariant = Extract<ButtonVariant, 'text' | 'outlined' | 'tonal' | 'filled' | 'raised'>;
