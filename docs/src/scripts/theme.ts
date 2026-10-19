export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'forge-docs-theme';
const THEME_ATTRIBUTE = 'data-forge-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

const getSystemTheme = (): Theme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

const getStoredTheme = (): Theme | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
};

const applyTheme = (theme: Theme, root: HTMLElement = document.documentElement): void => {
  root.setAttribute(THEME_ATTRIBUTE, theme);
};

export const getCurrentTheme = (): Theme => (document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'dark' ? 'dark' : 'light');

export const setTheme = (theme: Theme): void => {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
};

export const toggleTheme = (): void => {
  setTheme(getCurrentTheme() === 'light' ? 'dark' : 'light');
};

export const initTheme = (): void => {
  applyTheme(getStoredTheme() ?? getSystemTheme());

  window.matchMedia(DARK_QUERY).addEventListener('change', ({ matches }) => {
    if (!getStoredTheme()) {
      applyTheme(matches ? 'dark' : 'light');
    }
  });

  // ClientRouter replaces the <html> attributes with the incoming page's on SPA navigation,
  // so carry the active theme over before the new document is swapped in.
  document.addEventListener('astro:before-swap', ({ newDocument }) => {
    applyTheme(getCurrentTheme(), newDocument.documentElement);
  });
};
