import './style.scss';
import '@tylertech/forge/forge-core.scss';
import '@tylertech/forge/forge.scss';
import '@tylertech/forge/icon-button/forge-icon-button.scss';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

// import '@tylertech/forge/accordion';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/app-bar';
// import '@tylertech/forge/drawer';
// import '@tylertech/forge/list';
import '@tylertech/forge/card';
import '@tylertech/forge/text-field';
import '@tylertech/forge/icon-button';
// import '@tylertech/forge/stepper';
// import '@tylertech/forge';
// import 'src/component-list';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconBrightness3, tylIconClose, tylIconWbSunny } from '@tylertech/tyler-icons/standard';
import { toggleDarkTheme } from './dark-theme';

IconRegistry.define([
  tylIconForgeLogo,
  tylIconClose,
  tylIconWbSunny,
  tylIconBrightness3
]);

const darkThemeButton = document.querySelector('#dark-theme-button');
darkThemeButton.addEventListener('click', async evt => {
  const isDark = await toggleDarkTheme();
  const forgeIcon = darkThemeButton.querySelector('forge-icon');
  forgeIcon.name = isDark ? 'wb_sunny' : 'brightness_3';
});
