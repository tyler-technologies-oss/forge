import '$src/shared';
import '@tylertech/forge/switch';
import { ISwitchComponent, IconRegistry } from '@tylertech/forge';
import { tylIconEmoticonHappy, tylIconEmoticonSad } from '@tylertech/tyler-icons/extended';
import './switch.scss';

IconRegistry.define([
  tylIconEmoticonHappy,
  tylIconEmoticonSad
]);

// const preventSwitch = document.getElementById('prevent-switch') as ISwitchComponent;

// preventSwitch.addEventListener('forge-switch-change', (evt: CustomEvent) => evt.preventDefault());
