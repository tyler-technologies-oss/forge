import { COMPONENT_NAME_PREFIX, Theme } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}skip-link`;

const observedAttributes = {
  TARGET: 'target',
  THEME: 'theme',
  MUTED: 'muted',
  PERSISTENT: 'persistent',
  INLINE: 'inline',
  SKIP_URL_CHANGE: 'skip-url-change'
};

const attributes = {
  ...observedAttributes
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */ export const SKIP_LINK_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes
};

export type SkipLinkTheme = Theme | 'default';
