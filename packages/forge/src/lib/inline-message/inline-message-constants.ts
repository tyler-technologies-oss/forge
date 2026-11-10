import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}inline-message`;

const attributes = {
  THEME: 'theme'
};

const defaults = {
  THEME: 'default' as InlineMessageTheme
};

export const INLINE_MESSAGE_CONSTANTS = {
  elementName,
  attributes,
  defaults
};

/** @deprecated These themes render as `default`, except `danger`, which renders as `error`. */
type LegacyInlineMessageThemes = 'primary' | 'secondary' | 'tertiary' | 'info-secondary' | 'danger';
export type InlineMessageTheme = 'default' | 'info' | 'success' | 'warning' | 'error' | 'critical' | LegacyInlineMessageThemes;
