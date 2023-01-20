let darkStyles: string | undefined;

export async function toggleDarkTheme(): Promise<boolean> {
  const styleTag = document.head.querySelector('#forge-dark-style');
  if (styleTag) {
    styleTag.remove();
    return false;
  }

  if (!darkStyles) {
    darkStyles = (await import('@tylertech/forge/forge-dark.scss?inline') as { default: string }).default;
  }

  setDarkStyles();
  return true;
}

function setDarkStyles(): void {
  const styleTag = document.createElement('style');
  styleTag.id = 'forge-dark-style';
  styleTag.setAttribute('type', 'text/css');
  styleTag.textContent = darkStyles;
  document.head.appendChild(styleTag);
}
