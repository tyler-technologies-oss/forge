import './style.scss';
// import '@tylertech/forge/forge-core.scss';
// import '@tylertech/forge/forge.scss';
// import '@tylertech/forge/button/forge-button.scss';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

// import '@tylertech/forge/accordion';
// import '@tylertech/forge/scaffold';
// import '@tylertech/forge/app-bar';
// import '@tylertech/forge/app-bar';
// import '@tylertech/forge/drawer';
// import '@tylertech/forge/list';
// import '@tylertech/forge/card';
// import '@tylertech/forge/stepper';
import '@tylertech/forge';
// import 'src/component-list';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconBrightness3, tylIconClose, tylIconWbSunny } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconForgeLogo,
  tylIconClose,
  tylIconWbSunny,
  tylIconBrightness3
]);
