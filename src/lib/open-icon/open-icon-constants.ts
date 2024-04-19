import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}open-icon`;

const observedAttributes = {
  OPEN: 'open',
  ORIENTATION: 'orientation'
};

const attributes = {
  ...observedAttributes
};

const defaults = {
  ORIENTATION: 'vertical' as OpenIconOrientation
};

export const OPEN_ICON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  defaults
};

export type OpenIconOrientation = 'vertical' | 'horizontal' | 'vertical-half' | 'horizontal-half';
