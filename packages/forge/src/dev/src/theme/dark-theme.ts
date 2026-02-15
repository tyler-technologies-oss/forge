import { getCookie, setCookie } from '$src/utils/utils';

const THEME_COOKIE_NAME = 'forge-theme';
const THEME_IDENTIFIER_LIGHT = 'light';
const THEME_IDENTIFIER_DARK = 'dark';
let darkStyles: string | undefined;

export async function toggleDarkTheme(): Promise<boolean> {
  const styleTag = document.head.querySelector('#forge-dark-style');
  if (styleTag) {
    styleTag.remove();
    return false;
  }
  setDarkStyles();
  return true;
}

export async function listenThemeChange(): Promise<void> {
  const isDarkInitial = detectDarkTheme();
  if (isDarkInitial) {
    await preloadDarkStyle();
    setDarkStyles();
  } else {
    preloadDarkStyle();
  }

  const darkThemeButton = document.querySelector('#dark-theme-button');
  const forgeIcon = darkThemeButton.querySelector('forge-icon');

  forgeIcon.name = isDarkInitial ? 'wb_sunny' : 'brightness_3';

  darkThemeButton.addEventListener('click', async () => {
    const isDark = await toggleDarkTheme();
    forgeIcon.name = isDark ? 'wb_sunny' : 'brightness_3';
    setCookie(THEME_COOKIE_NAME, isDark ? THEME_IDENTIFIER_DARK : THEME_IDENTIFIER_LIGHT);
  });
}

async function preloadDarkStyle(): Promise<void> {
  const stylesMod = (await import('@tylertech/forge/forge-dark.scss?inline')) as { default: string } | undefined;
  darkStyles = stylesMod?.default;
}

function setDarkStyles(): void {
  const styleTag = document.createElement('style');
  styleTag.id = 'forge-dark-style';
  styleTag.setAttribute('type', 'text/css');
  styleTag.textContent = darkStyles;
  document.head.appendChild(styleTag);
}

function detectDarkTheme(): boolean {
  const cookieVal = getCookie(THEME_COOKIE_NAME);
  if (cookieVal) {
    return cookieVal === THEME_IDENTIFIER_DARK;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setCookie(THEME_COOKIE_NAME, prefersDark ? THEME_IDENTIFIER_DARK : THEME_IDENTIFIER_LIGHT);
  return prefersDark;
}
