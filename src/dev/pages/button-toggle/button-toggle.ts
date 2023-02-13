import '$src/shared';
import '@tylertech/forge/button-toggle';
import '@tylertech/forge/icon';
import { IconRegistry } from '@tylertech/forge/icon';
import type { IButtonToggleGroupComponent } from '@tylertech/forge/button-toggle';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { tylIconEmail, tylIconFavorite, tylIconPerson, tylIconPhone, tylIconStar } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconEmail,
  tylIconPhone,
  tylIconStar,
  tylIconFavorite,
  tylIconPerson
]);

const buttonToggleGroupStatic = document.querySelector('#button-toggle-group') as IButtonToggleGroupComponent;
const buttonToggleGroupDynamic = document.querySelector('#button-toggle-group-dynamic') as IButtonToggleGroupComponent;
buttonToggleGroupDynamic.options = [
  { label: 'Left', value: 'left', leadingIcon: 'star', leadingIconType: 'component' },
  { label: 'Middle', value: 'middle', leadingIcon: 'favorite', leadingIconType: 'component' },
  { label: 'Right', value: 'right', trailingIcon: 'person', trailingIconType: 'component' }
];

buttonToggleGroupStatic.addEventListener('forge-button-toggle-group-change', ({ detail }) => {
  console.log('[forge-button-toggle-group-change]', detail);
});
buttonToggleGroupStatic.addEventListener('forge-button-toggle-select', ({ detail }) => {
  console.log('[forge-button-toggle-select]', detail);
});

const multipleToggle = document.querySelector('#button-toggle-multiple') as ISwitchComponent;
multipleToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonToggleGroupStatic.multiple = selected;
  buttonToggleGroupDynamic.multiple = selected;
});

const mandatoryToggle = document.querySelector('#button-toggle-mandatory') as ISwitchComponent;
mandatoryToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonToggleGroupStatic.mandatory = selected;
  buttonToggleGroupDynamic.mandatory = selected;
});

const verticalToggle = document.querySelector('#button-toggle-vertical') as ISwitchComponent;
verticalToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonToggleGroupStatic.vertical = selected;
  buttonToggleGroupDynamic.vertical = selected;
});

const stretchToggle = document.querySelector('#button-toggle-stretch') as ISwitchComponent;
stretchToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonToggleGroupStatic.stretch = selected;
  buttonToggleGroupDynamic.stretch = selected;
});

const denseToggle = document.querySelector('#button-toggle-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonToggleGroupStatic.dense = selected;
  buttonToggleGroupDynamic.dense = selected;
});

const disabledToggle = document.querySelector('#button-toggle-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonToggleGroupStatic.disabled = selected;
  buttonToggleGroupDynamic.disabled = selected;
});
