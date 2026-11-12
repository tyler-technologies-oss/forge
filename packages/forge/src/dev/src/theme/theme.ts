import { getCookie, setCookie } from '$src/utils/utils';

const THEME_COOKIE_NAME = 'forge-theme';
const THEME_IDENTIFIER_LIGHT = 'light';
const THEME_IDENTIFIER_DARK = 'dark';
const RADIX_COOKIE_NAME = 'forge-radix';
const RADIX_QUERY_PARAM = 'radix';
const DARK_QUERY_PARAM = 'dark';
const ENABLED_IDENTIFIER = 'true';
const STYLE_TAG_ID = 'forge-theme-style';
const RADIX_ON_COLOR = '#2e7d32';
const RADIX_OFF_COLOR = '#d32f2f';

interface IThemeStyles {
  dark?: string;
  radix?: string;
  radixDark?: string;
}

interface IThemeState {
  dark: boolean;
  radix: boolean;
}

const styles: IThemeStyles = {};
const state: IThemeState = { dark: false, radix: false };

export async function toggleDarkTheme(): Promise<boolean> {
  state.dark = !state.dark;
  await preloadStyles();
  applyThemeStyles();
  return state.dark;
}

export async function toggleRadixTheme(): Promise<boolean> {
  state.radix = !state.radix;
  await preloadStyles();
  applyThemeStyles();
  return state.radix;
}

export async function listenThemeChange(): Promise<void> {
  state.dark = detectDarkTheme();
  state.radix = detectRadixTheme();

  if (state.dark || state.radix) {
    await preloadStyles();
    applyThemeStyles();
  } else {
    preloadStyles();
  }

  const darkThemeButton = document.querySelector('#dark-theme-button');
  const forgeIcon = darkThemeButton?.querySelector('forge-icon') as (HTMLElement & { name: string }) | null;

  if (forgeIcon) {
    forgeIcon.name = state.dark ? 'wb_sunny' : 'brightness_3';
  }

  darkThemeButton?.addEventListener('click', async () => {
    const isDark = await toggleDarkTheme();
    if (forgeIcon) {
      forgeIcon.name = isDark ? 'wb_sunny' : 'brightness_3';
    }
    setCookie(THEME_COOKIE_NAME, isDark ? THEME_IDENTIFIER_DARK : THEME_IDENTIFIER_LIGHT);
  });

  const radixThemeButton = document.querySelector('#radix-theme-button') as (HTMLElement & { variant: string }) | null;
  syncRadixButton(radixThemeButton);

  radixThemeButton?.addEventListener('click', async () => {
    const isRadix = await toggleRadixTheme();
    syncRadixButton(radixThemeButton);
    setCookie(RADIX_COOKIE_NAME, isRadix ? ENABLED_IDENTIFIER : 'false');
  });
}

async function preloadStyles(): Promise<void> {
  const [dark, radix, radixDark] = (await Promise.all([
    import('@tylertech/forge/forge-dark.scss?inline'),
    import('@tylertech/forge/forge-radix.scss?inline'),
    import('@tylertech/forge/forge-radix-dark.scss?inline')
  ])) as Array<{ default: string } | undefined>;
  styles.dark = dark?.default;
  styles.radix = radix?.default;
  styles.radixDark = radixDark?.default;
}

function getActiveStyles(): string | undefined {
  if (state.radix) {
    return state.dark ? styles.radixDark : styles.radix;
  }
  return state.dark ? styles.dark : undefined;
}

function applyThemeStyles(): void {
  document.head.querySelector(`#${STYLE_TAG_ID}`)?.remove();

  const css = getActiveStyles();
  if (!css) {
    return;
  }

  const styleTag = document.createElement('style');
  styleTag.id = STYLE_TAG_ID;
  styleTag.setAttribute('type', 'text/css');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
}

function syncRadixButton(button: (HTMLElement & { variant: string }) | null): void {
  if (!button) {
    return;
  }
  button.setAttribute('aria-pressed', String(state.radix));
  const indicator = document.querySelector<HTMLElement>('#radix-theme-indicator');
  if (indicator) {
    indicator.style.background = state.radix ? RADIX_ON_COLOR : RADIX_OFF_COLOR;
  }
  const tooltip = document.querySelector('#radix-theme-tooltip');
  if (tooltip) {
    tooltip.textContent = state.radix ? 'Radix theme: on (click to turn off)' : 'Radix theme: off (click to turn on)';
  }
}

function detectDarkTheme(): boolean {
  const queryValue = new URLSearchParams(window.location.search).get(DARK_QUERY_PARAM);
  if (queryValue !== null) {
    return queryValue === '1' || queryValue === ENABLED_IDENTIFIER;
  }
  const cookieVal = getCookie(THEME_COOKIE_NAME);
  if (cookieVal) {
    return cookieVal === THEME_IDENTIFIER_DARK;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setCookie(THEME_COOKIE_NAME, prefersDark ? THEME_IDENTIFIER_DARK : THEME_IDENTIFIER_LIGHT);
  return prefersDark;
}

function detectRadixTheme(): boolean {
  const queryValue = new URLSearchParams(window.location.search).get(RADIX_QUERY_PARAM);
  if (queryValue !== null) {
    return queryValue === '1' || queryValue === ENABLED_IDENTIFIER;
  }
  return getCookie(RADIX_COOKIE_NAME) === ENABLED_IDENTIFIER;
}
