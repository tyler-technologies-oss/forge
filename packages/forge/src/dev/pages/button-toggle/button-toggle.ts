import '$src/shared';
import '@tylertech/forge/button-toggle';
import '@tylertech/forge/icon';
import '@tylertech/forge/divider';
import '@tylertech/forge/stack';
import { IconRegistry } from '@tylertech/forge/icon';
import type {
  ButtonToggleGroupTheme,
  IButtonToggleGroupChangeEventData,
  IButtonToggleGroupComponent,
  IButtonToggleSelectEventData
} from '@tylertech/forge/button-toggle';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import {
  tylIconEmail,
  tylIconMail,
  tylIconFavorite,
  tylIconFormatAlignCenter,
  tylIconFormatAlignJustify,
  tylIconFormatAlignLeft,
  tylIconFormatAlignRight,
  tylIconFormatBold,
  tylIconFormatItalic,
  tylIconFormatStrikethrough,
  tylIconFormatUnderlined,
  tylIconPerson,
  tylIconPhone,
  tylIconStar
} from '@tylertech/tyler-icons';
import './button-toggle.scss';

IconRegistry.define([
  tylIconEmail,
  tylIconMail,
  tylIconPhone,
  tylIconStar,
  tylIconFavorite,
  tylIconPerson,
  tylIconFormatBold,
  tylIconFormatItalic,
  tylIconFormatUnderlined,
  tylIconFormatStrikethrough,
  tylIconFormatAlignLeft,
  tylIconFormatAlignCenter,
  tylIconFormatAlignRight,
  tylIconFormatAlignJustify
]);

function getButtonToggleGroups(): IButtonToggleGroupComponent[] {
  return Array.from(document.querySelectorAll<IButtonToggleGroupComponent>('forge-button-toggle-group'));
}

const buttonToggleDemoContainer = document.querySelector('.button-toggle-demo-container');
buttonToggleDemoContainer.addEventListener('forge-button-toggle-group-change', ({ detail }: CustomEvent<IButtonToggleGroupChangeEventData>) => {
  console.log('[forge-button-toggle-group-change]', detail);
});
buttonToggleDemoContainer.addEventListener('forge-button-toggle-select', ({ detail }: CustomEvent<IButtonToggleSelectEventData>) => {
  console.log('[forge-button-toggle-select]', detail);
});

const form = document.getElementById('button-toggle-form') as HTMLFormElement;
form.addEventListener('submit', (evt: Event) => {
  evt.preventDefault();
  const formData = new FormData(form);
  console.log('[form submit]', formData.getAll('my-button-toggle-group'));
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail: theme }: CustomEvent<ButtonToggleGroupTheme>) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.theme = theme));
});

const multipleToggle = document.querySelector('#button-toggle-multiple') as ISwitchComponent;
multipleToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.multiple = selected));
});

const mandatoryToggle = document.querySelector('#button-toggle-mandatory') as ISwitchComponent;
mandatoryToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.mandatory = selected));
});

const verticalToggle = document.querySelector('#button-toggle-vertical') as ISwitchComponent;
verticalToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.vertical = selected));
});

const stretchToggle = document.querySelector('#button-toggle-stretch') as ISwitchComponent;
stretchToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.stretch = selected));
});

const denseToggle = document.querySelector('#button-toggle-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.dense = selected));
});

const disabledToggle = document.querySelector('#button-toggle-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.disabled = selected));
});

const readonlyToggle = document.querySelector('#button-toggle-readonly') as ISwitchComponent;
readonlyToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  getButtonToggleGroups().forEach(buttonToggle => (buttonToggle.readonly = selected));
});
