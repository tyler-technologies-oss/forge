import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}theme-toggle`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const THEME_TOGGLE_CONSTANTS = {
  elementName
};

export type ThemeToggleTheme = 'light' | 'dark' | 'system';

export interface ThemeToggleUpdateEventData {
  theme: ThemeToggleTheme;
}
