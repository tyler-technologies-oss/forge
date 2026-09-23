export type ThemeToggleTheme = 'light' | 'dark' | 'system';

const LOCAL_STORAGE_KEY = '.forge-theme';
const THEME_ATTRIBUTE = 'data-forge-theme';
const VALID_THEMES: ThemeToggleTheme[] = ['light', 'dark', 'system'];

/**
 * Reads the persisted theme preference from local storage, defaulting to `system` when unset or invalid.
 * @returns The persisted theme preference.
 */
export function getStoredTheme(): ThemeToggleTheme {
  const storedTheme = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return VALID_THEMES.includes(storedTheme as ThemeToggleTheme) ? (storedTheme as ThemeToggleTheme) : 'system';
}

/**
 * Persists the given theme preference to local storage.
 * @param theme The theme preference to persist.
 */
export function setStoredTheme(theme: ThemeToggleTheme): void {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, theme);
}

/**
 * Detects the user's OS-level color scheme preference.
 * @returns `dark` or `light` depending on the current `prefers-color-scheme` media query.
 */
export function detectPrefersColorScheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Applies and persists the given theme by setting the `data-forge-theme` attribute on the document
 * element, resolving `system` to the current OS color scheme preference. This has no dependency on
 * any particular component being present or mounted in the DOM.
 * @param theme The theme to apply.
 */
export function applyTheme(theme: ThemeToggleTheme): void {
  const resolvedTheme = theme === 'system' ? detectPrefersColorScheme() : theme;
  document.documentElement.setAttribute(THEME_ATTRIBUTE, resolvedTheme);
  setStoredTheme(theme);
}
