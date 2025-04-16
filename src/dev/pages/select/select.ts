import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/select';
import '@tylertech/forge/field/forge-field.scss';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconFood } from '@tylertech/tyler-icons';
import './select.scss';
import { IListDropdownOption } from '@tylertech/forge/list-dropdown';
import { ISelectComponent, SelectDensityType } from '@tylertech/forge/select';
import { FieldLabelPosition } from '@tylertech/forge/field';
import { ISwitchComponent } from '@tylertech/forge/switch';

IconRegistry.define(tylIconFood);

const select = document.querySelector('forge-select#select') as ISelectComponent;
const leadingEl = select.querySelector('[slot=leading]') as HTMLElement;
const addonEndEl = select.querySelector('[slot=addon-end]') as HTMLElement;
const helperTextEl = select.querySelector('[slot=helper-text]') as HTMLElement;

// Hide these elements by default
leadingEl.remove();
addonEndEl.remove();
helperTextEl.remove();

const optLabelPosition = document.querySelector('#opt-label-position') as ISelectComponent;
optLabelPosition.addEventListener('change', ({ detail }) => select.labelPosition = detail as FieldLabelPosition);

const optDensity = document.querySelector('#opt-density') as ISelectComponent;
optDensity.addEventListener('change', ({ detail }) => select.density = detail as SelectDensityType);

const optLabel = document.querySelector('#opt-label') as HTMLInputElement;
optLabel.addEventListener('input', () => select.label = optLabel.value);

const optPlaceholder = document.querySelector('#opt-placeholder') as HTMLInputElement;
optPlaceholder.addEventListener('input', () => select.placeholder = optPlaceholder.value);

const optShowLeading = document.querySelector('#opt-leading') as ISwitchComponent;
optShowLeading.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    select.appendChild(leadingEl);
  } else {
    leadingEl.remove();
  }
});

const optShowAddonEnd = document.querySelector('#opt-addon-end') as ISwitchComponent;
optShowAddonEnd.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    select.appendChild(addonEndEl);
  } else {
    addonEndEl.remove();
  }
});

const optShowHelperText = document.querySelector('#opt-helper-text') as ISwitchComponent;
optShowHelperText.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    select.appendChild(helperTextEl);
  } else {
    helperTextEl.remove();
  }
});

const optMultiple = document.querySelector('#opt-multiple') as ISwitchComponent;
optMultiple.addEventListener('forge-switch-change', ({ detail: selected }) => select.multiple = selected);

const optFloatLabel = document.querySelector('#opt-float') as ISwitchComponent;
optFloatLabel.addEventListener('forge-switch-change', ({ detail: selected }) => select.floatLabel = selected);

const optRequired = document.querySelector('#opt-required') as ISwitchComponent;
optRequired.addEventListener('forge-switch-change', ({ detail: selected }) => select.required = selected);

const optDisabled = document.querySelector('#opt-disabled') as ISwitchComponent;
optDisabled.addEventListener('forge-switch-change', ({ detail: selected }) => select.disabled = selected);

const optInvalid = document.querySelector('#opt-invalid') as ISwitchComponent;
optInvalid.addEventListener('forge-switch-change', ({ detail: selected }) => select.invalid = selected);

const optRounded = document.querySelector('#opt-rounded') as ISwitchComponent;
optRounded.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.shape = selected ? 'rounded' : 'default';
});

const optOptionBuilder = document.querySelector('#opt-option-builder') as ISwitchComponent;
optOptionBuilder.addEventListener('forge-switch-change', ({ detail: selected }) => {
  select.optionBuilder = selected ? optionBuilder : undefined;
});

const optSelectedTextBuilder = document.querySelector('#opt-selected-text-builder') as ISwitchComponent;
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
