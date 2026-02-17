import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}open-icon`;

const observedAttributes = {
  OPEN: 'open',
  ORIENTATION: 'orientation',
  ROTATION: 'rotation'
};

const attributes = {
  ...observedAttributes
};

const defaults = {
  ORIENTATION: 'vertical' as OpenIconOrientation,
  ROTATION: 'full' as OpenIconRotation
};

export const OPEN_ICON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  defaults
};

export type OpenIconOrientation = 'vertical' | 'horizontal' | 'vertical-half' | 'horizontal-half';
export type OpenIconRotation = 'full' | 'half';
