import { listenThemeChange } from '$src/theme/dark-theme';

// Styles
import '$src/shared.scss';
import '@tylertech/forge/forge-core.scss';
import '@tylertech/forge/typography/forge-typography.scss';
import '@tylertech/forge/theme/forge-theme.scss';
import '@tylertech/forge/icon-button/forge-icon-button.scss';
import '@tylertech/forge/tooltip/forge-tooltip.scss';

// Components
import '@tylertech/forge/scaffold';
import '@tylertech/forge/app-bar';
import '@tylertech/forge/card';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/toast';
import '@tylertech/forge/list';
import '@tylertech/forge/drawer';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/switch';
import '@tylertech/forge/text-field';
import '@tylertech/forge/select';
import '@tylertech/forge/tooltip';

// Icons
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { tylIconBrightness3, tylIconWbSunny } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon';

IconRegistry.define([
  tylIconForgeLogo,
  tylIconWbSunny,
  tylIconBrightness3
]);

listenThemeChange();

await Promise.allSettled([
  window.customElements.whenDefined('forge-app-bar'),
  window.customElements.whenDefined('forge-scaffold'),
  window.customElements.whenDefined('forge-card')
]);

document.body.classList.add('ready');
