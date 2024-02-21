import '$src/shared';
import { FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldShape, FieldSupportTextInset, FieldTheme, FieldVariant, IconRegistry, ISelectComponent, ISwitchComponent, ITextFieldComponent } from '@tylertech/forge';
import { tylIconEvent, tylIconInfoOutline, tylIconMoreVert, tylIconPerson } from '@tylertech/tyler-icons/standard';
import './text-field.scss';

IconRegistry.define([
  tylIconEvent,
  tylIconInfoOutline,
  tylIconMoreVert,
  tylIconPerson
]);

const textField = document.querySelector('forge-text-field') as ITextFieldComponent;
const input = textField.querySelector('input') as HTMLInputElement;
const textarea = textField.querySelector('textarea') as HTMLTextAreaElement;
const label = textField.querySelector('label') as HTMLLabelElement;
const startEl = textField.querySelector('[slot=start]') as HTMLElement;
const endEl = textField.querySelector('[slot=end]') as HTMLElement;
const accessoryEl = textField.querySelector('[slot=accessory]') as HTMLElement;
const supportTextStartEl = textField.querySelector('[slot=support-text-start]') as HTMLElement;
const supportTextEndEl = textField.querySelector('[slot=support-text-end]') as HTMLElement;

// Hide these elements by default
startEl.remove();
textarea.remove();
endEl.remove();
accessoryEl.remove();
supportTextStartEl.remove();
supportTextEndEl.remove();

// Options
const optLabel = document.getElementById('opt-label') as HTMLInputElement;
const optPlaceholder = document.getElementById('opt-placeholder') as HTMLInputElement;
const optTextarea = document.getElementById('opt-textarea') as ISwitchComponent;
const optRequired = document.getElementById('opt-required') as ISwitchComponent;
const optOptional = document.getElementById('opt-optional') as ISwitchComponent;
const optInvalid = document.getElementById('opt-invalid') as ISwitchComponent;
const optDisabled = document.getElementById('opt-disabled') as ISwitchComponent;
const optDense = document.getElementById('opt-dense') as ISwitchComponent;
const optFloatLabel = document.getElementById('opt-float-label') as ISwitchComponent;
const optShowClear = document.getElementById('opt-show-clear') as ISwitchComponent;
const optPreventClear = document.getElementById('opt-prevent-clear') as ISwitchComponent;
const optStart = document.getElementById('opt-start') as ISwitchComponent;
const optEnd = document.getElementById('opt-end') as ISwitchComponent;
const optAccessory = document.getElementById('opt-accessory') as ISwitchComponent;
const optSupportTextStart = document.getElementById('opt-support-text-start') as ISwitchComponent;
const optSupportTextEnd = document.getElementById('opt-support-text-end') as ISwitchComponent;
const optDensity = document.getElementById('opt-density') as ISelectComponent;
const optVariant = document.getElementById('opt-variant') as ISelectComponent;
const optTheme = document.getElementById('opt-theme') as ISelectComponent;
const optShape = document.getElementById('opt-shape') as ISelectComponent;
const optLabelPosition = document.getElementById('opt-label-position') as ISelectComponent;
const optLabelAlignment = document.getElementById('opt-label-alignment') as ISelectComponent;
const optSupportTextInset = document.getElementById('opt-support-text-inset') as ISwitchComponent;

optLabel.addEventListener('input', () => {
  label.textContent = optLabel.value;
});

optPlaceholder.addEventListener('input', () => {
  input.placeholder = optPlaceholder.value;
});

optTextarea.addEventListener('forge-switch-change', () => {
  if (optTextarea.on) {
    input.remove();
    textField.prepend(textarea);
  } else {
    textarea.remove();
    textField.prepend(input);
  }
});

optRequired.addEventListener('forge-switch-change', () => {
  textField.required = optRequired.on;
});

optOptional.addEventListener('forge-switch-change', () => {
  textField.optional = optOptional.on;
});

optInvalid.addEventListener('forge-switch-change', () => {
  textField.invalid = optInvalid.on;
});

optDisabled.addEventListener('forge-switch-change', () => {
  textField.disabled = optDisabled.on;
});

optDense.addEventListener('forge-switch-change', () => {
  textField.dense = optDense.on;
});

optFloatLabel.addEventListener('forge-switch-change', () => {
  textField.floatLabel = optFloatLabel.on;
});

optShowClear.addEventListener('forge-switch-change', () => {
  textField.showClear = optShowClear.on;
});
  
optStart.addEventListener('forge-switch-change', () => {
  if (optStart.on) {
    textField.prepend(startEl);
  } else {
    startEl.remove();
  }
});

optEnd.addEventListener('forge-switch-change', () => {
  if (optEnd.on) {
    textField.append(endEl);
  } else {
    endEl.remove();
  }
});

optAccessory.addEventListener('forge-switch-change', () => {
  if (optAccessory.on) {
    textField.append(accessoryEl);
  } else {
    accessoryEl.remove();
  }
});

optSupportTextStart.addEventListener('forge-switch-change', () => {
  if (optSupportTextStart.on) {
    textField.prepend(supportTextStartEl);
  } else {
    supportTextStartEl.remove();
  }
});

optSupportTextEnd.addEventListener('forge-switch-change', () => {
  if (optSupportTextEnd.on) {
    textField.append(supportTextEndEl);
  } else {
    supportTextEndEl.remove();
  }
});

optDensity.addEventListener('change', () => {
  textField.density = optDensity.value as FieldDensity;
});

optVariant.addEventListener('change', () => {
  textField.variant = optVariant.value as FieldVariant;
});

optTheme.addEventListener('change', () => {
  textField.theme = optTheme.value as FieldTheme;
});

optShape.addEventListener('change', () => {
  textField.shape = optShape.value as FieldShape;
});

optLabelPosition.addEventListener('change', () => {
  textField.labelPosition = optLabelPosition.value as FieldLabelPosition;
});

optLabelAlignment.addEventListener('change', () => {
  textField.labelAlignment = optLabelAlignment.value as FieldLabelAlignment;
});

optSupportTextInset.addEventListener('change', () => {
  textField.supportTextInset = optSupportTextInset.value as FieldSupportTextInset;
});

textField.addEventListener('forge-text-field-clear', evt => {
  console.log(evt);
  if (optPreventClear.on) {
    evt.preventDefault();
  }
});
