import '$src/shared';
import '@tylertech/forge/switch';
import { ISwitchComponent, IconRegistry } from '@tylertech/forge';
import { tylIconEmoticonHappy, tylIconEmoticonSad } from '@tylertech/tyler-icons/extended';
import './switch.scss';

IconRegistry.define([
  tylIconEmoticonHappy,
  tylIconEmoticonSad
]);

const preventSwitch = document.getElementById('prevent-switch') as ISwitchComponent;

preventSwitch.addEventListener('forge-switch-change', (evt: CustomEvent) => evt.preventDefault());

const testForm = document.getElementById('test-form') as HTMLFormElement;
testForm.addEventListener('submit', (evt: Event) => {
  evt.preventDefault();
  console.log('[submit] switch value:', new FormData(testForm).get('test-switch'));
});
