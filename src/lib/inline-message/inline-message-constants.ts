import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}inline-message`;

const selectors = {
  ROOT: '.forge-inline-message'
};

export const INLINE_MESSAGE_CONSTANTS = {
  elementName,
  selectors
};
