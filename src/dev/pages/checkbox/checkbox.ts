import '$src/shared';
import '@tylertech/forge/checkbox';
import './checkbox.scss';
import { ICheckboxComponent, ISwitchComponent } from '@tylertech/forge';

const checkboxesCheckedToggle = document.getElementById('opt-checked') as ISwitchComponent;
const checkboxesIndeterminateToggle = document.getElementById('opt-indeterminate') as ISwitchComponent;

checkboxesCheckedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const checkboxes = document.querySelectorAll('forge-checkbox') as NodeListOf<ICheckboxComponent>;
  checkboxes.forEach(checkbox => checkbox.checked = selected);
});

checkboxesIndeterminateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const checkboxes = document.querySelectorAll('forge-checkbox') as NodeListOf<ICheckboxComponent>;
  checkboxes.forEach(checkbox => checkbox.indeterminate = selected);
});

document.querySelectorAll('forge-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', evt => console.log(evt));
});

const preventCheckbox = document.getElementById('prevent-checkbox') as ICheckboxComponent;
preventCheckbox.addEventListener('change', (evt: Event) => {
  evt.preventDefault();
});
