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
  // createThemeSwitcherButton();
  preloadDarkStyle();
  const darkThemeButton = document.querySelector('#dark-theme-button');
  darkThemeButton.addEventListener('click', async () => {
    const isDark = await toggleDarkTheme();
    const forgeIcon = darkThemeButton.querySelector('forge-icon');
    forgeIcon.name = isDark ? 'wb_sunny' : 'brightness_3';
  });
}

async function preloadDarkStyle(): Promise<void> {
  const stylesMod = await import('@tylertech/forge/forge-dark.scss?inline') as ({ default: string } | undefined);
  darkStyles = stylesMod?.default;
}

// function createThemeSwitcherButton(): void {
//   const appBar = document.querySelector('forge-app-bar');
//   appBar.insertAdjacentHTML('beforeend', `
//     <forge-icon-button slot="end">
//       <button type="button" id="dark-theme-button">
//         <forge-icon name="brightness_3"></forge-icon>
//       </button>
//     </forge-icon-button>
//   `);
// }

function setDarkStyles(): void {
  const styleTag = document.createElement('style');
  styleTag.id = 'forge-dark-style';
  styleTag.setAttribute('type', 'text/css');
  styleTag.textContent = darkStyles;
  document.head.appendChild(styleTag);
}
