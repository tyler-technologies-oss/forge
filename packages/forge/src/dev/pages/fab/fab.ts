import '$src/shared';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconAdd, tylIconDelete, tylIconFavorite, tylIconOpenInNew } from '@tylertech/tyler-icons';
import '@tylertech/forge/floating-action-button';
import '@tylertech/forge/floating-action-button/forge-floating-action-button.scss';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { IFloatingActionButtonComponent } from '@tylertech/forge/floating-action-button';
import { toggleAttribute } from '@tylertech/forge-core';
import './fab.scss';

IconRegistry.define([tylIconFavorite, tylIconAdd, tylIconDelete, tylIconOpenInNew]);

const allFABs = Array.from(document.querySelectorAll<IFloatingActionButtonComponent>('.content forge-fab'));
allFABs.forEach(btn => btn.addEventListener('click', evt => console.log('click', evt)));

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allFABs.forEach(btn => (btn.disabled = selected));
});

const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allFABs.forEach(btn => (btn.dense = selected));
});

const densitySelect = document.querySelector('#opt-density') as ISelectComponent;
densitySelect.addEventListener('change', ({ detail }) => {
  allFABs.forEach(btn => (btn.density = detail));
});

const elevationSelect = document.querySelector('#opt-elevation') as ISelectComponent;
elevationSelect.addEventListener('change', ({ detail }) => {
  allFABs.forEach(btn => (btn.elevation = detail));
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  allFABs.forEach(btn => toggleAttribute(btn, !!detail, 'theme', detail));
});
