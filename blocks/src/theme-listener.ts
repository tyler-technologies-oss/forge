/**
 * Theme listener for blocks rendered in iframes.
 *
 * Listens for postMessage events from the parent window to toggle between
 * light and dark themes. The parent docs site sends theme change messages
 * when the user toggles the theme.
 *
 * Message format expected from parent:
 *   { type: 'forge-theme-change', theme: 'light' | 'dark' }
 *
 * Theme is applied via the `data-forge-theme` attribute on the <html> element:
 *   - Light theme: attribute is removed (default)
 *   - Dark theme: attribute is set to 'dark'
 */

type Theme = 'light' | 'dark';

interface ThemeChangeMessage {
  type: 'forge-theme-change';
  theme: Theme;
}

function isThemeChangeMessage(data: unknown): data is ThemeChangeMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    (data as ThemeChangeMessage).type === 'forge-theme-change' &&
    'theme' in data &&
    ((data as ThemeChangeMessage).theme === 'light' || (data as ThemeChangeMessage).theme === 'dark')
  );
}

function applyTheme(theme: Theme): void {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.setAttribute('data-forge-theme', 'dark');
  } else {
    html.removeAttribute('data-forge-theme');
  }
}

function handleMessage(event: MessageEvent): void {
  // Only process messages that match our expected format
  if (isThemeChangeMessage(event.data)) {
    applyTheme(event.data.theme);
  }
}

// Listen for theme change messages from parent window
window.addEventListener('message', handleMessage);

// Check for initial theme preference from URL parameter (optional)
// This allows linking directly to a block with a specific theme
const urlParams = new URLSearchParams(window.location.search);
const initialTheme = urlParams.get('theme');
if (initialTheme === 'dark' || initialTheme === 'light') {
  applyTheme(initialTheme);
}
