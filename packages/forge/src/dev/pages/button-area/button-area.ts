import { tylIconChevronRight, tylIconFavorite, tylIconFavoriteBorder, tylIconInfo, tylIconOpenInNew } from '@tylertech/tyler-icons';
import { ButtonAreaComponent } from '@tylertech/forge/button-area';
import { IExpansionPanelComponent } from '@tylertech/forge/expansion-panel';
import { IconComponent, IconRegistry } from '@tylertech/forge/icon';
import { ISwitchComponent } from '@tylertech/forge/switch';
import '$src/shared';
import '@tylertech/forge/button-area';
import '@tylertech/forge/expansion-panel';
import './button-area.scss';

IconRegistry.define([
  tylIconChevronRight,
  tylIconFavorite,
  tylIconFavoriteBorder,
  tylIconInfo,
  tylIconOpenInNew
]);

const buttonArea = document.getElementById('button-area') as ButtonAreaComponent;
const buttonAreaButton = buttonArea?.querySelector('button');
buttonAreaButton?.addEventListener('click', () => alert('Click'));

const expansionPanel = document.getElementById('expansion-panel') as IExpansionPanelComponent;
const expansionPanelButtonArea = document.getElementById('expansion-panel-button-area') as ButtonAreaComponent;
const expansionPanelButton = document.getElementById('expansion-panel-button');
expansionPanel.addEventListener('forge-expansion-panel-toggle', (event: CustomEvent<boolean>) => {
  expansionPanelButton?.setAttribute('aria-expanded', event.detail.toString());
});

const targetButtonArea = document.getElementById('target-button-area') as ButtonAreaComponent;
targetButtonArea.addEventListener('click', () => alert('Click'));

const targetElementButtonArea = document.getElementById('target-element-button-area') as ButtonAreaComponent;
const targetElementButton = document.getElementById('target-element-button') as HTMLButtonElement;
targetElementButtonArea.targetElement = targetElementButton;
targetElementButtonArea.addEventListener('click', () => alert('Click'));

const toggleButtonArea = document.querySelector('#toggle-button-area') as ButtonAreaComponent;
const toggleButton = document.querySelector('#toggle-button') as HTMLButtonElement;
const toggleIcon = document.querySelector('#toggle-icon') as IconComponent;
toggleButtonArea.addEventListener('click', () => {
  const pressed = !(toggleButton.getAttribute('aria-pressed') === 'true');
  toggleButton.setAttribute('aria-pressed', pressed.toString());
  toggleIcon.name = pressed ? 'favorite' : 'favorite_border';
});

const currentContainer = document.getElementById('current-container') as HTMLDivElement;
const currentDetailContent = document.getElementById('current-detail-content') as HTMLDivElement;
const currentButtons = Array.from(currentContainer.querySelectorAll('button[slot=button]') as NodeListOf<HTMLButtonElement>);
currentContainer.addEventListener('click', (event) => {
  const targetButtonArea = event.composedPath().find(path => path instanceof HTMLElement && path.tagName.toLowerCase() === 'forge-button-area') as ButtonAreaComponent;
  if (!targetButtonArea) {
    return;
  }

  const activeCurrentButtons = currentButtons.filter(button => button.hasAttribute('aria-current'));
  activeCurrentButtons.forEach(button => button.removeAttribute('aria-current'));

  const currentButton = targetButtonArea.querySelector('button[slot=button]') as HTMLButtonElement;
  currentButton.setAttribute('aria-current', 'true');

  const textContent = currentButton.getAttribute('aria-labelledby') ? document.getElementById(currentButton.getAttribute('aria-labelledby')!)?.textContent : currentButton.textContent;
  if (currentDetailContent) {
    currentDetailContent.textContent = textContent ?? '';
  }
});

const disabledToggle = document.querySelector('#disabled-switch') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  buttonArea.disabled = selected;
  expansionPanelButtonArea.disabled = selected;
  targetButtonArea.disabled = selected;
  targetElementButtonArea.disabled = selected;
  toggleButtonArea.disabled = selected;
});
