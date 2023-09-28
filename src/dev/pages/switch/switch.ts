import '$src/shared';
import '@tylertech/forge/switch';
import { ISwitchComponent, IconRegistry } from '@tylertech/forge';
import { tylIconEmoticonHappy, tylIconEmoticonSad } from '@tylertech/tyler-icons/extended';
import './switch.scss';

IconRegistry.define([
  tylIconEmoticonHappy,
  tylIconEmoticonSad
]);

const formSwitch = document.getElementById('form-switch') as ISwitchComponent;
const formButton = document.getElementById('form-button');
const preventSwitch = document.getElementById('prevent-switch') as ISwitchComponent;

formButton.addEventListener('click', () => {
  console.log(formSwitch.internals);
});

preventSwitch.addEventListener('forge-switch-change', (evt: CustomEvent) => evt.preventDefault());

