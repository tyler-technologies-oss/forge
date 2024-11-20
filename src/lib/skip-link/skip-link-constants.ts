import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

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

const selectors = {
  ANCHOR: 'a'
};

const defaultMainContentId = 'main-content';

export const SKIP_LINK_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  defaultMainContentId
};

export type SkipLinkTheme = Theme | 'default';
