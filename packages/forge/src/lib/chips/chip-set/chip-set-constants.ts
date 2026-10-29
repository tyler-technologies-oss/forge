import { createContext } from '@lit/context';
import { COMPONENT_NAME_PREFIX } from '../../constants.js';
import type { ChipTheme, ChipType } from '../chip/chip-constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}chip-set`;

const observedAttributes = {
  VERTICAL: 'vertical',
  TYPE: 'type',
  DENSE: 'dense',
  DISABLED: 'disabled',
  INVALID: 'invalid',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: '.forge-chip-set'
};

export const CHIP_SET_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors
};

export const CHIP_SET_TYPE = createContext<ChipType>('chip-set-type');
export const CHIP_SET_DENSE = createContext<boolean>('chip-set-dense');
export const CHIP_SET_DISABLED = createContext<boolean>('chip-set-disabled');
export const CHIP_SET_INVALID = createContext<boolean>('chip-set-invalid');
export const CHIP_SET_THEME = createContext<ChipTheme>('chip-set-theme');
