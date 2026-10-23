import '$src/shared';
import '@tylertech/forge/forge-ai.scss';
import './ai.scss';
import '@tylertech/forge/autocomplete';
import '@tylertech/forge/button-toggle';
import '@tylertech/forge/date-picker';
import '@tylertech/forge/time-picker';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/radio';
import { IAutocompleteComponent } from '@tylertech/forge/autocomplete';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';
import { ITextFieldComponent } from '@tylertech/forge/text-field';

const ROBOTS = ['Bender', 'C-3PO', 'Data', 'HAL 9000', 'R2-D2', 'WALL-E'].map(label => ({ label, value: label }));

const allFields = document.querySelectorAll<ITextFieldComponent | ISelectComponent>('.ai-fields forge-text-field, .ai-fields forge-select');

const optAi = document.getElementById('opt-ai') as ISwitchComponent;
const optVariant = document.getElementById('opt-variant') as ISelectComponent;
const optShape = document.getElementById('opt-shape') as ISelectComponent;
const optDensity = document.getElementById('opt-density') as ISelectComponent;
const optInvalid = document.getElementById('opt-invalid') as ISwitchComponent;
const optDisabled = document.getElementById('opt-disabled') as ISwitchComponent;

document.querySelectorAll<IAutocompleteComponent>('forge-autocomplete').forEach(autocomplete => {
  autocomplete.filter = filter => ROBOTS.filter(({ label }) => label.toLowerCase().includes(String(filter ?? '').toLowerCase()));
});

optAi.addEventListener('forge-switch-change', () => {
  document.querySelectorAll('[data-ai]').forEach(element => element.classList.toggle('forge-ai', optAi.on));
});

optVariant.addEventListener('change', () => allFields.forEach(field => field.setAttribute('variant', optVariant.value)));
optShape.addEventListener('change', () => allFields.forEach(field => field.setAttribute('shape', optShape.value)));
optDensity.addEventListener('change', () => allFields.forEach(field => field.setAttribute('density', optDensity.value)));
optInvalid.addEventListener('forge-switch-change', () => allFields.forEach(field => (field.invalid = optInvalid.on)));
optDisabled.addEventListener('forge-switch-change', () => allFields.forEach(field => (field.disabled = optDisabled.on)));
