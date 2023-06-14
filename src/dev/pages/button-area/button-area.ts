import { IButtonAreaComponent, ISwitchComponent, IconRegistry } from '@tylertech/forge';
import { tylIconChevronRight, tylIconFavorite } from '@tylertech/tyler-icons/standard';

import '$src/shared';
import '@tylertech/forge/button-area';
import './button-area.scss';

IconRegistry.define([
  tylIconChevronRight,
  tylIconFavorite
]);

const buttonArea = document.getElementById('button-area') as IButtonAreaComponent;
buttonArea.addEventListener('click', () => alert('Click'));

const disabledToggle = document.querySelector('#disabled-switch') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonArea.disabled = selected;
});
