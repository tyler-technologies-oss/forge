import '$src/shared';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/checkbox/forge-checkbox.scss';
import './checkbox.scss';
import { ICheckboxComponent } from '@tylertech/forge/checkbox';
import { ISwitchComponent } from '@tylertech/forge/switch';

const checkboxesCheckedToggle = document.getElementById('opt-checked') as ISwitchComponent;
const checkboxesIndeterminateToggle = document.getElementById('opt-indeterminate') as ISwitchComponent;

checkboxesCheckedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const checkboxes = document.querySelectorAll('forge-checkbox') as NodeListOf<ICheckboxComponent>;
  checkboxes.forEach(checkbox => (checkbox.checked = selected));

  const cssCheckbox = document.getElementById('css-checkbox') as HTMLInputElement;
  cssCheckbox.checked = selected;
});

checkboxesIndeterminateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const checkboxes = document.querySelectorAll('forge-checkbox') as NodeListOf<ICheckboxComponent>;
  checkboxes.forEach(checkbox => (checkbox.indeterminate = selected));

  const cssCheckbox = document.getElementById('css-checkbox') as HTMLInputElement;
  cssCheckbox.indeterminate = selected;
});

document.querySelectorAll('forge-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', evt => console.log(evt));
});

const preventCheckbox = document.getElementById('prevent-checkbox') as ICheckboxComponent;
preventCheckbox.addEventListener('change', (evt: Event) => {
  evt.preventDefault();
});
