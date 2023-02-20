// Styles
import './button.scss';
import '@tylertech/forge/button/forge-button.scss';

// Components
import '@tylertech/forge/button';
import '@tylertech/forge/next/next-button';

// Icons
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconFavorite } from '@tylertech/tyler-icons/standard';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

import '$src/shared';
import type { ButtonComponent } from '@tylertech/forge/button';
import { isDefined } from '@tylertech/forge-core';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { NextButtonComponent } from '@tylertech/forge/next/next-button';

IconRegistry.define([tylIconForgeLogo, tylIconFavorite]);

function getButtonElements(): NodeListOf<ButtonComponent> {
  return document.querySelectorAll('.content forge-button');
}

function getNextButtonElements(): NodeListOf<NextButtonComponent> {
  return document.querySelectorAll('.content forge-next-button');
}

const disabledToggle = document.querySelector('#disabled-switch') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  const buttons = getButtonElements();
  buttons.forEach(forgeButton => {
    const buttonEl = forgeButton.querySelector('button') as HTMLButtonElement;
    buttonEl.disabled = selected;
  });

  getNextButtonElements().forEach(b => b.disabled = selected);
});

const denseToggle = document.querySelector('#dense-switch') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  const buttons = getButtonElements();
  buttons.forEach(forgeButton => {
    const isChecked = selected;
    forgeButton.type = isDefined(forgeButton.type) ? forgeButton.type.replace(/(?:-?dense)?$/, isChecked ? '-dense' : '') : isChecked ? 'dense' : '';
  });

  getNextButtonElements().forEach(b => b.dense = selected);
});
