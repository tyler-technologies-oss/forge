const DARK_STYLE_ID = 'forge-dark-style';

let darkStyles = '';

const loadDarkStyles = async (): Promise<void> => {
  const module = await import('@tylertech/forge/dist/forge-dark.css?inline');
  darkStyles = module.default;
};

const setDark = (isDark: boolean): void => {
  document.getElementById(DARK_STYLE_ID)?.remove();
  if (isDark) {
    const style = document.createElement('style');
    style.id = DARK_STYLE_ID;
    style.textContent = darkStyles;
    document.head.appendChild(style);
  }
  const icon = document.querySelector<HTMLElement & { name: string }>('#dark-theme-button forge-icon');
  if (icon) {
    icon.name = isDark ? 'wb_sunny' : 'brightness_3';
  }
};

export const listenThemeChange = async (): Promise<void> => {
  await loadDarkStyles();
  setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.getElementById('dark-theme-button')?.addEventListener('click', () => setDark(!document.getElementById(DARK_STYLE_ID)));
};
