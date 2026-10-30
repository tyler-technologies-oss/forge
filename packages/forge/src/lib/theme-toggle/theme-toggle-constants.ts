import { COMPONENT_NAME_PREFIX } from '../constants.js';
import type { ThemeToggleTheme } from '../core/utils/theme-utils.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}theme-toggle`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const THEME_TOGGLE_CONSTANTS = {
  elementName
};

export type { ThemeToggleTheme };

export interface ThemeToggleUpdateEventData {
  /** The selected theme mode, as chosen by the user or set programmatically. */
  theme: ThemeToggleTheme;
  /** The actual light/dark theme applied, resolving `system` to the current OS color scheme preference. */
  resolvedTheme: 'light' | 'dark';
}
