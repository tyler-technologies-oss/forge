// Styles
import './button.scss';
import '@tylertech/forge/button/forge-button.scss';

// Components
import '@tylertech/forge/button';

// Icons
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconFavorite } from '@tylertech/tyler-icons/standard';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

import '$src/shared';
import type { ButtonComponent } from '@tylertech/forge/button';
import { isDefined } from '@tylertech/forge-core';

IconRegistry.define([tylIconForgeLogo, tylIconFavorite]);

function getButtonElements(): NodeListOf<ButtonComponent> {
  return document.querySelectorAll('.content forge-button');
}

const disabledCheckbox = document.querySelector('#disabled-checkbox');
disabledCheckbox.addEventListener('change', ({ target }) => {
  const buttons = getButtonElements();
  buttons.forEach(forgeButton => {
    const buttonEl = forgeButton.querySelector('button') as HTMLButtonElement;
    buttonEl.disabled = (target as HTMLInputElement).checked;
  });
});

const denseCheckbox = document.querySelector('#dense-checkbox');
denseCheckbox.addEventListener('change', ({ target }) => {
  const buttons = getButtonElements();
  buttons.forEach(forgeButton => {
    const isChecked = (target as HTMLInputElement).checked;
    forgeButton.type = isDefined(forgeButton.type) ? forgeButton.type.replace(/(?:-?dense)?$/, isChecked ? '-dense' : '') : isChecked ? 'dense' : '';
  });
});
