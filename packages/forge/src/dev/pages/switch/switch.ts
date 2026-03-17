import '$src/shared';
import '@tylertech/forge/switch';
import { tylIconClose, tylIconCheck, tylIconEmoticonHappy, tylIconEmoticonSad } from '@tylertech/tyler-icons';
import '@tylertech/forge/switch/forge-switch.scss';
import './switch.scss';
import { ISwitchComponent } from '@tylertech/forge/switch';
import { IconRegistry } from '@tylertech/forge/icon';

IconRegistry.define([tylIconCheck, tylIconClose, tylIconEmoticonHappy, tylIconEmoticonSad]);

const preventSwitch = document.getElementById('prevent-switch') as ISwitchComponent;

preventSwitch.addEventListener('forge-switch-change', (evt: CustomEvent) => evt.preventDefault());
