import { tylIconChevronRight, tylIconFavorite } from '@tylertech/tyler-icons/standard';
import { IButtonAreaComponent } from '@tylertech/forge/button-area';
import { IExpansionPanelComponent } from '@tylertech/forge/expansion-panel';
import { IconRegistry } from '@tylertech/forge/icon';
import { ISwitchComponent } from '@tylertech/forge/switch';
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
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  buttonArea.disabled = selected;
  expansionPanelButtonArea.disabled = selected;
});
