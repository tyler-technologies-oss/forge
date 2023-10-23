import '$src/shared';
import { IconRegistry, ISelectComponent, TextFieldDensityType } from '@tylertech/forge';
import type { ITextFieldComponent, ISwitchComponent } from '@tylertech/forge';
import { tylIconEvent, tylIconInfoOutline, tylIconMoreVert, tylIconPerson } from '@tylertech/tyler-icons/standard';
import './text-field.scss';

IconRegistry.define([
  tylIconEvent,
  tylIconMoreVert,
  tylIconPerson,
  tylIconInfoOutline
]);

const textField = document.querySelector('forge-text-field#text-field') as ITextFieldComponent;
const input = textField.querySelector('input');
const label = textField.querySelector('label');
const leadingEl = textField.querySelector('[slot=leading]') as HTMLElement;
const trailingEl = textField.querySelector('[slot=trailing]') as HTMLElement;
const addonEndEl = textField.querySelector('[slot=addon-end]') as HTMLElement;
const helperTextEl = textField.querySelector('[slot=helper-text]') as HTMLElement;

// Hide these elements by default
leadingEl.remove();
trailingEl.remove();
addonEndEl.remove();
helperTextEl.remove();

const optDensity = document.querySelector('#opt-density') as ISelectComponent;
const optLabel = document.querySelector('#opt-label') as HTMLInputElement;
const optPlaceholder = document.querySelector('#opt-placeholder') as HTMLInputElement;
const optShowLeading = document.querySelector('#opt-leading') as ISwitchComponent;
const optShowTrailing = document.querySelector('#opt-trailing') as ISwitchComponent;
const optShowAddonEnd = document.querySelector('#opt-addon-end') as ISwitchComponent;
const optShowHelperText = document.querySelector('#opt-helper-text') as ISwitchComponent;
const optFloatLabel = document.querySelector('#opt-float') as ISwitchComponent;
const optRequired = document.querySelector('#opt-required') as ISwitchComponent;
const optInvalid = document.querySelector('#opt-invalid') as ISwitchComponent;
const optDisabled = document.querySelector('#opt-disabled') as ISwitchComponent;
const optRounded = document.querySelector('#opt-rounded') as ISwitchComponent;
const optTextarea = document.querySelector('#opt-textarea') as ISwitchComponent;

let textarea: HTMLTextAreaElement | undefined;

optDensity.addEventListener('change', ({ detail }) => {
  textField.density = detail as TextFieldDensityType;
});
optLabel.addEventListener('input', () => {
  if (optLabel.value) {
    if (!label.isConnected) {
      textField.appendChild(label);
    }
    label.textContent = optLabel.value;
  } else {
    label.remove();
  }
});
optPlaceholder.addEventListener('input', () => {
  if (input.isConnected) {
    input.placeholder = optPlaceholder.value;
  } else if (textarea) {
    textarea.placeholder = optPlaceholder.value;
  }
});
optShowLeading.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    textField.appendChild(leadingEl);
  } else {
    leadingEl.remove();
  }
});
optShowTrailing.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    textField.appendChild(trailingEl);
  } else {
    trailingEl.remove();
  }
});
optShowAddonEnd.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    textField.appendChild(addonEndEl);
  } else {
    addonEndEl.remove();
  }
});
optShowHelperText.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    textField.appendChild(helperTextEl);
  } else {
    helperTextEl.remove();
  }
});
optFloatLabel.addEventListener('forge-switch-change', ({ detail: selected }) => {
  textField.floatLabelType = selected ? 'always' : 'auto';
});
optRequired.addEventListener('forge-switch-change', ({ detail: selected }) => {
  textField.required = selected;
});
optDisabled.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (input.isConnected) {
    input.disabled = selected;
  } else if (textarea) {
    textarea.disabled = selected;
  }
});
optInvalid.addEventListener('forge-switch-change', ({ detail: selected }) => {
  textField.invalid = selected;
});
optRounded.addEventListener('forge-switch-change', ({ detail: selected }) => {
  textField.shape = selected ? 'rounded' : 'default';
});
optTextarea.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const parent = textField.parentElement;
  textField.remove();

  if (selected) {
    input.remove();

    textarea = document.createElement('textarea');
    textarea.id = input.id;
    textField.appendChild(textarea);
  } else {
    textarea = textField.querySelector('textarea');
    textarea.remove();
    textField.appendChild(input);
  }

  parent.appendChild(textField);
});
