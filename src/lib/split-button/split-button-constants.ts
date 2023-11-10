import { ButtonVariant } from '../button';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}split-button`;

const attributes = {
  VARIANT: 'variant',
  DISABLED: 'disabled',
  DENSE: 'dense',
  PILL: 'pill'
};

export const SPLIT_BUTTON_CONSTANTS = {
  elementName,
  attributes
};

export const DEFAULT_VARIANT = 'text';

export type SplitButtonVariant = Extract<ButtonVariant, 'flat' | 'raised' | 'outlined' | 'text'>;
