import '$src/shared';
import { Density, IIconComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import '@tylertech/forge/field';
import { FieldLabelAlignment, FieldShape, FieldSupportTextInset, FieldTheme, FieldVariant, IFieldComponent } from '@tylertech/forge/field';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/label';
import { tylIconFavorite } from '@tylertech/tyler-icons/standard';
import './field.scss';

IconRegistry.define([
  tylIconFavorite
]);

const requiredSwitch = document.getElementById('opt-required') as ISwitchComponent;
const optionalSwitch = document.getElementById('opt-optional') as ISwitchComponent;
const invalidSwitch = document.getElementById('opt-invalid') as ISwitchComponent;
const disabledSwitch = document.getElementById('opt-disabled') as ISwitchComponent;
const denseSwitch = document.getElementById('opt-dense') as ISwitchComponent;
const startSwitch = document.getElementById('opt-start') as ISwitchComponent;
const endSwitch = document.getElementById('opt-end') as ISwitchComponent;
const accessorySwitch = document.getElementById('opt-accessory') as ISwitchComponent;
const supportTextSwitch = document.getElementById('opt-support-text') as ISwitchComponent;
const supportTextEndSwitch = document.getElementById('opt-support-text-end') as ISwitchComponent;
const longLabelSwitch = document.getElementById('opt-long-label') as ISwitchComponent;
const densitySelect = document.getElementById('opt-density') as ISelectComponent;
const variantSelect = document.getElementById('opt-variant') as ISelectComponent;
const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
const shapeSelect = document.getElementById('opt-shape') as ISelectComponent;
const labelAlignmentSelect = document.getElementById('opt-label-alignment') as ISelectComponent;
const supportTextInsetSelect = document.getElementById('opt-support-text-inset') as ISelectComponent;
const popoverSelect = document.getElementById('opt-popover') as ISelectComponent;

const fields = document.querySelectorAll('forge-field') as NodeListOf<IFieldComponent>;
const insetFields = document.querySelectorAll('forge-field:where([label-position=inset],:not([label-position])):not([float-label])') as NodeListOf<IFieldComponent>;
const insetMultilineField = document.getElementById('inset-multiline-field') as IFieldComponent;
const labels = document.querySelectorAll('label') as NodeListOf<HTMLLabelElement>;

requiredSwitch.addEventListener('forge-switch-change', () => {
  fields.forEach(field => field.required = requiredSwitch.on);
});

optionalSwitch.addEventListener('forge-switch-change', () => {
  fields.forEach(field => field.optional = optionalSwitch.on);
});

invalidSwitch.addEventListener('forge-switch-change', () => {
  fields.forEach(field => field.invalid = invalidSwitch.on);
});

disabledSwitch.addEventListener('forge-switch-change', () => {
  fields.forEach(field => field.disabled = disabledSwitch.on);
});

denseSwitch.addEventListener('forge-switch-change', () => {
  fields.forEach(field => field.dense = denseSwitch.on);
});

startSwitch.addEventListener('forge-switch-change', () => {
  if (startSwitch.on) {
    fields.forEach(field => {
      const icon = document.createElement('forge-icon') as IIconComponent;
      icon.name = 'favorite';
      icon.slot = 'start';
      field.append(icon);
    });
  } else {
    fields.forEach(field => {
      const icon = field.querySelector('forge-icon[slot=start]');
      icon.remove();
    });
  }
});

endSwitch.addEventListener('forge-switch-change', () => {
  if (endSwitch.on) {
    fields.forEach(field => {
      const icon = document.createElement('forge-icon') as IIconComponent;
      icon.name = 'favorite';
      icon.slot = 'end';
      field.append(icon);
    });
  } else {
    fields.forEach(field => {
      const icon = field.querySelector('forge-icon[slot=end]');
      icon.remove();
    });
  }
});

accessorySwitch.addEventListener('forge-switch-change', () => {
  if (accessorySwitch.on) {
    fields.forEach(field => {
      const icon = document.createElement('forge-icon') as IIconComponent;
      icon.name = 'favorite';
      icon.slot = 'accessory';
      field.append(icon);
    });
  } else {
    fields.forEach(field => {
      const icon = field.querySelector('forge-icon[slot=accessory]');
      icon.remove();
    });
  }
});

supportTextSwitch.addEventListener('forge-switch-change', () => {
  if (supportTextSwitch.on) {
    fields.forEach(field => {
      const text = document.createElement('span');
      text.slot = 'support-text';
      text.textContent = 'Support text';
      field.append(text);
    });
  } else {
    fields.forEach(field => {
      const text = field.querySelector('span[slot=support-text]');
      text.remove();
    });
  }
});

supportTextEndSwitch.addEventListener('forge-switch-change', () => {
  if (supportTextEndSwitch.on) {
    fields.forEach(field => {
      const text = document.createElement('span');
      text.slot = 'support-text-end';
      text.textContent = '7/100';
      field.append(text);
    });
  } else {
    fields.forEach(field => {
      const text = field.querySelector('span[slot=support-text-end]');
      text.remove();
    });
  }
});

longLabelSwitch.addEventListener('forge-switch-change', () => {
  labels.forEach(label => label.textContent = longLabelSwitch.on ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' : 'Label');
});

densitySelect.addEventListener('change', () => {
  fields.forEach(field => field.density = densitySelect.value as Density);
});

variantSelect.addEventListener('change', () => {
  fields.forEach(field => field.variant = variantSelect.value as FieldVariant);
});

themeSelect.addEventListener('change', () => {
  fields.forEach(field => field.theme = themeSelect.value as FieldTheme);
});

shapeSelect.addEventListener('change', () => {
  fields.forEach(field => field.shape = shapeSelect.value as FieldShape);
});

labelAlignmentSelect.addEventListener('change', () => {
  fields.forEach(field => field.labelAlignment = labelAlignmentSelect.value as FieldLabelAlignment);
});

supportTextInsetSelect.addEventListener('change', () => {
  fields.forEach(field => field.supportTextInset = supportTextInsetSelect.value as FieldSupportTextInset);
});

popoverSelect.addEventListener('change', () => {
  fields.forEach(field => {
    field.popoverIcon = popoverSelect.value !== 'off';
    field.popoverExpanded = popoverSelect.value === 'expanded';
  });
});

insetFields.forEach(field => {
  field.addEventListener('input', (event: InputEvent) => field.floatLabel = !!(event.target as HTMLInputElement | HTMLTextAreaElement).value);
  field.floatLabel = !!(field.querySelector(':where(input, textarea)') as HTMLInputElement | HTMLTextAreaElement).value;
});

insetMultilineField.addEventListener('input', (event: InputEvent) => insetMultilineField.floatLabel = !!(event.target as HTMLTextAreaElement).value);
insetMultilineField.floatLabel = !!insetMultilineField.querySelector('textarea').value;

fields.forEach(field => {
  field.addEventListener('forge-field-popover-icon-click', () => console.log('popover icon clicked'));
});
