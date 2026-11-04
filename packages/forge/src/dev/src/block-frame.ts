import '@tylertech/forge/forge-core.scss';
import '@tylertech/forge/forge.scss';
import './block-frame.css';
import darkStyles from '@tylertech/forge/forge-dark.scss?inline';
import { defineComponents, IconRegistry } from '@tylertech/forge';
import '@tylertech/forge/app-launcher';
import '@tylertech/forge/busy-indicator';
import '@tylertech/forge/confirmation-dialog';
import '@tylertech/forge/count-card';
import '@tylertech/forge/footer';
import '@tylertech/forge/multi-select-header';
import '@tylertech/forge/quantity-field';
import '@tylertech/forge/responsive-toolbar';
import '@tylertech/forge/structured-card';
import '@tylertech/forge/theme-toggle';
import '@tylertech/forge/user-profile';
import * as tylerIcons from '@tylertech/tyler-icons';
import { BLOCK_HEIGHT_MESSAGE, BLOCK_THEME_MESSAGE, type BlockFrameMessage, type BlockTheme } from './block-frame-messages';

const DARK_STYLE_ID = 'forge-dark-style';

defineComponents();
IconRegistry.define(Object.values(tylerIcons));

const applyTheme = (theme: BlockTheme): void => {
  const existing = document.getElementById(DARK_STYLE_ID);
  if (theme === 'light') {
    existing?.remove();
    return;
  }
  if (existing) {
    return;
  }
  const style = document.createElement('style');
  style.id = DARK_STYLE_ID;
  style.textContent = darkStyles;
  document.head.append(style);
};

const initialTheme = new URLSearchParams(location.search).get('theme');
applyTheme(initialTheme === 'dark' ? 'dark' : 'light');

window.addEventListener('message', ({ source, data }: MessageEvent<BlockFrameMessage>) => {
  if (source === window.parent && data?.type === BLOCK_THEME_MESSAGE) {
    applyTheme(data.theme);
  }
});

const reportHeight = (): void => {
  const message: BlockFrameMessage = { type: BLOCK_HEIGHT_MESSAGE, height: Math.ceil(document.documentElement.getBoundingClientRect().height) };
  window.parent.postMessage(message, location.origin);
};

new ResizeObserver(reportHeight).observe(document.documentElement);
window.addEventListener('load', reportHeight);
