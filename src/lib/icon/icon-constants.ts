import { COMPONENT_NAME_PREFIX, CDN_BASE_URL } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}icon`;

const observedAttributes = {
  NAME: 'name',
  SRC: 'src',
  LAZY: 'lazy',
  EXTERNAL: 'external',
  EXTERNAL_TYPE: 'external-type',
  VIEWBOX: 'viewbox'
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
  attributes,
  numbers,
  strings
};

export const ICON_REGISTRY_KEY = 'forgeIcons';

export declare type IconUrlBuilder = (name: string, type: IconExternalType) => string;
export declare type IconExternalType = '' | 'custom' | 'standard' | 'extended';
