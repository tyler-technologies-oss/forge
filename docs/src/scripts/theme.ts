type Theme = 'light' | 'dark';

const STORAGE_KEY = 'forge-docs-theme';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-forge-theme', theme);
  document.documentElement.classList.toggle('forge-dark', theme === 'dark');
}

export function initTheme() {
  const theme = getStoredTheme() ?? getSystemTheme();
  applyTheme(theme);

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-forge-theme') as Theme || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}

export function getCurrentTheme(): Theme {
  return (document.documentElement.getAttribute('data-forge-theme') as Theme) || 'light';
}
