import '$src/shared';
import { Density, ISelectComponent, ISwitchComponent, Theme } from '@tylertech/forge';
import '@tylertech/forge/field-next';
import { FieldLabelAlignment, FieldTheme, FieldVariant, IFieldComponent } from '@tylertech/forge/field-next';
import '@tylertech/forge/label';
import './field.scss';

const requiredSwitch = document.getElementById('opt-required') as ISwitchComponent;
const optionalSwitch = document.getElementById('opt-optional') as ISwitchComponent;
const invalidSwitch = document.getElementById('opt-invalid') as ISwitchComponent;
const disabledSwitch = document.getElementById('opt-disabled') as ISwitchComponent;
const denseSwitch = document.getElementById('opt-dense') as ISwitchComponent;
const densitySelect = document.getElementById('opt-density') as ISelectComponent;
const variantSelect = document.getElementById('opt-variant') as ISelectComponent;
const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
const labelAlignmentSelect = document.getElementById('opt-label-alignment') as ISelectComponent;

const fields = document.querySelectorAll('forge-field') as NodeListOf<IFieldComponent>;

console.log(fields);

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
