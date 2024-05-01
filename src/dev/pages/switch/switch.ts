import '$src/shared';
import '@tylertech/forge/switch';
import { tylIconEmoticonHappy, tylIconEmoticonSad } from '@tylertech/tyler-icons/extended';
import './switch.scss';
import { ISwitchComponent } from '@tylertech/forge/switch';
import { IconRegistry } from '@tylertech/forge/icon';

IconRegistry.define([
  tylIconEmoticonHappy,
  tylIconEmoticonSad
]);

const preventSwitch = document.getElementById('prevent-switch') as ISwitchComponent;

preventSwitch.addEventListener('forge-switch-change', (evt: CustomEvent) => evt.preventDefault());
