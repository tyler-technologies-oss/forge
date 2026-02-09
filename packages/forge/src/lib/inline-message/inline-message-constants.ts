import { COMPONENT_NAME_PREFIX, Theme } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}inline-message`;

const attributes = {
  THEME: 'theme'
};

const defaults = {
  THEME: 'info'
};

export const INLINE_MESSAGE_CONSTANTS = {
  elementName,
  attributes,
  defaults
};

type LegacyInlineMessageThemes = 'info-secondary' | 'danger';
export type InlineMessageTheme = Theme | LegacyInlineMessageThemes;
