import { IButtonAreaComponent, IExpansionPanelComponent, ISwitchComponent, IconRegistry } from '@tylertech/forge';
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

const expansionPanel = document.getElementById('expansion-panel') as IExpansionPanelComponent;
const expansionPanelButtonArea = document.getElementById('expansion-panel-button-area') as IButtonAreaComponent;
const expansionPanelButton = document.getElementById('expansion-panel-button');
expansionPanel.addEventListener('forge-expansion-panel-toggle', (event: CustomEvent<boolean>) => {
  expansionPanelButton.setAttribute('aria-expanded', event.detail.toString());
});


const disabledToggle = document.querySelector('#disabled-switch') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonArea.disabled = selected;
  expansionPanelButtonArea.disabled = selected;
});
