import '$src/shared';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/label';
import { toggleAttribute } from '@tylertech/forge-core';
import { IconRegistry } from '@tylertech/forge/icon';
import type { IIconButtonComponent } from '@tylertech/forge/icon-button';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { tylIconCheck, tylIconClose, tylIconFavorite, tylIconFileCopy, tylIconOpenInNew, tylIconSettings } from '@tylertech/tyler-icons/standard';
import './icon-button.scss';

IconRegistry.define([
  tylIconFavorite,
  tylIconCheck,
  tylIconClose,
  tylIconOpenInNew,
  tylIconSettings,
  tylIconFileCopy
]);

const allIconButtons = Array.from(document.querySelectorAll<IIconButtonComponent>('.content forge-icon-button'));
allIconButtons.forEach(btn => btn.addEventListener('click', evt => console.log('click', evt)));

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allIconButtons.forEach(btn => btn.disabled = selected);
});

const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allIconButtons.forEach(btn => btn.dense = selected);
});

const popoverIconToggle = document.querySelector('#opt-popover-icon') as ISwitchComponent;
popoverIconToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allIconButtons.forEach(btn => btn.popoverIcon = selected);
});

const densitySelect = document.querySelector('#opt-density') as ISelectComponent;
densitySelect.addEventListener('change', ({ detail }) => {
  allIconButtons.forEach(btn => btn.density = detail);
});

const shapeSelect = document.querySelector('#opt-shape') as ISelectComponent;
shapeSelect.addEventListener('change', ({ detail }) => {
  allIconButtons.forEach(btn => btn.shape = detail);
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  allIconButtons.forEach(btn => toggleAttribute(btn, !!detail, 'theme', detail));
});
