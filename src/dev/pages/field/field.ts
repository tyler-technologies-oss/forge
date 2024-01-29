import '$src/shared';
import { Density, IIconComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import '@tylertech/forge/field-next';
import { FieldLabelAlignment, FieldTheme, FieldVariant, IFieldComponent } from '@tylertech/forge/field-next';
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
const helperTextStartSwitch = document.getElementById('opt-helper-text-start') as ISwitchComponent;
const helperTextEndSwitch = document.getElementById('opt-helper-text-end') as ISwitchComponent;
const densitySelect = document.getElementById('opt-density') as ISelectComponent;
const variantSelect = document.getElementById('opt-variant') as ISelectComponent;
const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
const labelAlignmentSelect = document.getElementById('opt-label-alignment') as ISelectComponent;
const popoverSelect = document.getElementById('opt-popover') as ISelectComponent;

const fields = document.querySelectorAll('forge-field') as NodeListOf<IFieldComponent>;
const insetField = document.getElementById('inset-field') as IFieldComponent;

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

helperTextStartSwitch.addEventListener('forge-switch-change', () => {
  if (helperTextStartSwitch.on) {
    fields.forEach(field => {
      const text = document.createElement('span');
      text.slot = 'helper-text-start';
      text.textContent = 'Helper text';
      field.append(text);
    });
  } else {
    fields.forEach(field => {
      const text = field.querySelector('span[slot=helper-text-start]');
      text.remove();
    });
  }
});

helperTextEndSwitch.addEventListener('forge-switch-change', () => {
  if (helperTextEndSwitch.on) {
    fields.forEach(field => {
      const text = document.createElement('span');
      text.slot = 'helper-text-end';
      text.textContent = '7/100';
      field.append(text);
    });
  } else {
    fields.forEach(field => {
      const text = field.querySelector('span[slot=helper-text-end]');
      text.remove();
    });
  }
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

labelAlignmentSelect.addEventListener('change', () => {
  fields.forEach(field => field.labelAlignment = labelAlignmentSelect.value as FieldLabelAlignment);
});

popoverSelect.addEventListener('change', () => {
  fields.forEach(field => {
    field.popoverIcon = popoverSelect.value !== 'off';
    field.popoverExpanded = popoverSelect.value === 'expanded';
  });
});

insetField.addEventListener('input', (event: InputEvent) => insetField.floatLabel = !!(event.target as HTMLInputElement).value);
insetField.floatLabel = !!insetField.querySelector('input').value;

fields.forEach(field => {
  field.addEventListener('forge-field-popover-icon-click', () => console.log('popover icon clicked'));
});
