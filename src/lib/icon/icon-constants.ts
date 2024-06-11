import { COMPONENT_NAME_PREFIX, CDN_BASE_URL, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}icon`;

const observedAttributes = {
  NAME: 'name',
  SRC: 'src',
  LAZY: 'lazy',
  EXTERNAL: 'external',
  EXTERNAL_TYPE: 'external-type',
  VIEWBOX: 'viewbox',
  THEME: 'theme'
};

const attributes = {
  ...observedAttributes
};

const numbers = {
  LAZY_ROOT_MARGIN: 50,
  DEFAULT_WIDTH: 24,
  DEFAULT_HEIGHT: 24
};

const strings = {
  DEFAULT_NETWORK_BASE_URL: `${CDN_BASE_URL}v1/icons/svg`
};

export const ICON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  numbers,
  strings
};

export const ICON_REGISTRY_KEY = 'forgeIcons';

export type IconUrlBuilder = (name: string, type: IconExternalType) => string;
export type IconExternalType = '' | 'custom' | 'standard' | 'extended';
export type IconTheme = Theme | 'text-medium' | 'text-low';
