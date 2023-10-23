import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/select';
import type { ISelectComponent, ISwitchComponent, SelectDensityType } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconFood } from '@tylertech/tyler-icons/extended';
import './select.scss';
import { IListDropdownOption } from '@tylertech/forge/list-dropdown';

IconRegistry.define([
  tylIconFood
]);

const select = document.querySelector('forge-select#select') as ISelectComponent;
const leadingEl = select.querySelector('[slot=leading]') as HTMLElement;
const addonEndEl = select.querySelector('[slot=addon-end]') as HTMLElement;
const helperTextEl = select.querySelector('[slot=helper-text]') as HTMLElement;

// Hide these elements by default
leadingEl.remove();
addonEndEl.remove();
helperTextEl.remove();

const optDensity = document.querySelector('#opt-density') as ISelectComponent;
const optLabel = document.querySelector('#opt-label') as HTMLInputElement;
const optPlaceholder = document.querySelector('#opt-placeholder') as HTMLInputElement;
const optShowLeading = document.querySelector('#opt-leading') as ISwitchComponent;
const optShowAddonEnd = document.querySelector('#opt-addon-end') as ISwitchComponent;
const optShowHelperText = document.querySelector('#opt-helper-text') as ISwitchComponent;
const optMultiple = document.querySelector('#opt-multiple') as ISwitchComponent;
const optFloatLabel = document.querySelector('#opt-float') as ISwitchComponent;
const optRequired = document.querySelector('#opt-required') as ISwitchComponent;
const optInvalid = document.querySelector('#opt-invalid') as ISwitchComponent;
const optDisabled = document.querySelector('#opt-disabled') as ISwitchComponent;
const optRounded = document.querySelector('#opt-rounded') as ISwitchComponent;
const optOptionBuilder = document.querySelector('#opt-option-builder') as ISwitchComponent;
const optSelectedTextBuilder = document.querySelector('#opt-selected-text-builder') as ISwitchComponent;

optDensity.addEventListener('change', ({ detail }) => {
  select.density = detail as SelectDensityType;
});
optLabel.addEventListener('input', () => {
  select.label = optLabel.value;
});
optPlaceholder.addEventListener('input', () => {
  select.placeholder = optPlaceholder.value;
});
optShowLeading.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    select.appendChild(leadingEl);
  } else {
    leadingEl.remove();
  }
});
optShowAddonEnd.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    select.appendChild(addonEndEl);
  } else {
    addonEndEl.remove();
  }
});
optShowHelperText.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    select.appendChild(helperTextEl);
  } else {
    helperTextEl.remove();
  }
});
optMultiple.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.multiple = selected;
});
optFloatLabel.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.floatLabelType = selected ? 'always' : 'auto';
});
optRequired.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.required = selected;
});
optDisabled.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.disabled = selected;
});
optInvalid.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.invalid = selected;
});
optRounded.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.shape = selected ? 'rounded' : 'default';
});
optOptionBuilder.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.optionBuilder = selected ? optionBuilder : undefined;
});
optSelectedTextBuilder.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.selectedTextBuilder = selected ? selectedTextBuilder : undefined;
});

function optionBuilder(option: IListDropdownOption, parentElement: HTMLElement): HTMLElement {
  const item = document.createElement('div');
  item.style.display = 'flex';
  item.style.alignItems = 'center';

  const avatar = document.createElement('forge-avatar');
  avatar.style.fontSize = '12px';
  avatar.style.setProperty('--forge-avatar-font-size', '12px');
  avatar.text = option.value;
  avatar.style.marginRight = '8px';
  item.appendChild(avatar);

  const label = document.createElement('div');
  label.style.flex = '1';
  label.textContent = option.label;
  item.appendChild(label);

  return item;
}

function selectedTextBuilder(opts: IListDropdownOption[]): string {
  return opts.map(({ label }) => label).join(', ');
}
