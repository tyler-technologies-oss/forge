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

const container = document.querySelector('.container');
const textFields = container.querySelectorAll('forge-text-field') as NodeListOf<ITextFieldComponent>;

// Options
const optLabel = document.getElementById('opt-label') as HTMLInputElement;
const optPlaceholder = document.getElementById('opt-placeholder') as HTMLInputElement;
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
  textFields.forEach(textField => {
    textField.querySelector('label').textContent = optLabel.value;
  });
});

optPlaceholder.addEventListener('input', () => {
  textFields.forEach(textField => {
    (textField.querySelector(':is(input, textarea)') as HTMLInputElement | HTMLTextAreaElement).placeholder = optPlaceholder.value;
  });
});

optRequired.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    textField.required = optRequired.on;
  });
});

optOptional.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    textField.optional = optOptional.on;
  });
});

optInvalid.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    textField.invalid = optInvalid.on;
  });
});

optDisabled.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    textField.disabled = optDisabled.on;
  });
});

optDense.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    textField.dense = optDense.on;
  });
});

optFloatLabel.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    textField.floatLabel = optFloatLabel.on;
  });
});

optShowClear.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    textField.showClear = optShowClear.on;
  });
});
  
optStart.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    if (optStart.on) {
      textField.append(createStartElement());
    } else {
      textField.querySelector('[slot=start]').remove();
    }
  });
});

optEnd.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    if (optEnd.on) {
      textField.append(createEndElement());
    } else {
      textField.querySelector('[slot=end]').remove();
    }
  });
});

optAccessory.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    if (optAccessory.on) {
      textField.append(createAccessoryElement());
    } else {
      textField.querySelector('[slot=accessory]').remove();
    }
  });
});

optSupportTextStart.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    if (optSupportTextStart.on) {
      textField.append(createSupportTextStartElement());
    } else {
      textField.querySelector('[slot=support-text-start]').remove();
    }
  });
});

optSupportTextEnd.addEventListener('forge-switch-change', () => {
  textFields.forEach(textField => {
    if (optSupportTextEnd.on) {
      textField.append(createSupportTextEndElement());
    } else {
      textField.querySelector('[slot=support-text-end]').remove();
    }
  });
});

optDensity.addEventListener('change', () => {
  textFields.forEach(textField => {
    textField.density = optDensity.value as FieldDensity;
  });
});

optVariant.addEventListener('change', () => {
  textFields.forEach(textField => {
    textField.variant = optVariant.value as FieldVariant;
  });
});

optTheme.addEventListener('change', () => {
  textFields.forEach(textField => {
    textField.theme = optTheme.value as FieldTheme;
  });
});

optShape.addEventListener('change', () => {
  textFields.forEach(textField => {
    textField.shape = optShape.value as FieldShape;
  });
});

optLabelPosition.addEventListener('change', () => {
  textFields.forEach(textField => {
    textField.labelPosition = optLabelPosition.value as FieldLabelPosition;
  });
});

optLabelAlignment.addEventListener('change', () => {
  textFields.forEach(textField => {
    textField.labelAlignment = optLabelAlignment.value as FieldLabelAlignment;
  });
});

optSupportTextInset.addEventListener('change', () => {
  textFields.forEach(textField => {
    textField.supportTextInset = optSupportTextInset.value as FieldSupportTextInset;
  });
});

textFields.forEach(textField => {
  textField.addEventListener('forge-text-field-clear', evt => {
    console.log(evt);
    if (optPreventClear.on) {
      evt.preventDefault();
    }
  });
});

function createStartElement(): HTMLElement {
  const icon = document.createElement('forge-icon');
  icon.name = 'person';
  icon.slot = 'start';
  return icon;
}

function createEndElement(): HTMLElement {
  const icon = document.createElement('forge-icon');
  icon.name = 'info_outline';
  icon.slot = 'end';
  return icon;
}

function createAccessoryElement(): HTMLElement {
  const button = document.createElement('forge-icon-button');
  const icon = document.createElement('forge-icon');
  button.density = 'medium';
  button.slot = 'accessory';
  icon.name = 'more_vert';
  return icon;
}

function createSupportTextStartElement(): HTMLElement {
  const supportText = document.createElement('span');
  supportText.slot = 'support-text-start';
  supportText.textContent = 'Support text start';
  return supportText;
}

function createSupportTextEndElement(): HTMLElement {
  const supportText = document.createElement('span');
  supportText.slot = 'support-text-end';
  supportText.textContent = '7/100';
  return supportText;
}
