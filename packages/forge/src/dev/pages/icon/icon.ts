import '$src/shared';
import '@tylertech/forge/icon';
import { IconComponent, IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/icon/forge-icon.scss';
import { SelectComponent } from '@tylertech/forge/select/select/select';
import { tylIconActionLauncher, tylIconCode, tylIconFace, tylIconPalette } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconFace, tylIconCode, tylIconActionLauncher, tylIconPalette]);

const animationSelect = document.getElementById('opt-animation') as SelectComponent;
const animateOnceButton = document.getElementById('btn-animate-once') as HTMLButtonElement;

animationSelect.addEventListener('change', event => {
  const value = (event.target as SelectComponent).value;
  const icon = document.querySelectorAll('forge-icon') as NodeListOf<IconComponent>;
  icon.forEach(el => (el.animation = value));
});

animateOnceButton.addEventListener('click', () => {
  const icon = document.querySelectorAll('forge-icon') as NodeListOf<IconComponent>;
  icon.forEach(el => el.animateOnce('spin'));
});
