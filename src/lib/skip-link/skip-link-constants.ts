import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}skip-link`;

const observedAttributes = {
  TARGET: 'target',
  THEME: 'theme',
  MUTED: 'muted',
  PERSISTENT: 'persistent'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ANCHOR: 'a'
};

export const SKIP_LINK_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors
};

export type SkipLinkTheme = Theme | 'default';
