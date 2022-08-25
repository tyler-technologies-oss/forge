import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}virtual-scroll`;

const observedAttributes = {
  BUFFER: 'buffer'
};

export const VIRTUAL_SCROLL_CONSTANTS = {
  elementName,
  observedAttributes
};
