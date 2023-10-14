import '$src/shared';
import '@tylertech/forge/checkbox';
import './checkbox.scss';
import { ICheckboxComponent, ISwitchComponent } from '@tylertech/forge';

const checkboxesCheckedToggle = document.getElementById('opt-checked') as ISwitchComponent;
const checkboxesIndeterminateToggle = document.getElementById('opt-indeterminate') as ISwitchComponent;
const exposeInputToggle = document.getElementById('opt-expose-input') as ISwitchComponent;

checkboxesCheckedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const checkboxes = document.querySelectorAll('forge-checkbox') as NodeListOf<ICheckboxComponent>;
  checkboxes.forEach(checkbox => checkbox.checked = selected);
});

checkboxesIndeterminateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const checkboxes = document.querySelectorAll('forge-checkbox') as NodeListOf<ICheckboxComponent>;
  checkboxes.forEach(checkbox => checkbox.indeterminate = selected);
});

exposeInputToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const checkbox = document.getElementById('exposed-input-checkbox') as ICheckboxComponent;
  if (selected) {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.slot = 'input';
    input.setAttribute('aria-labelledby', 'exposed-input-checkbox');
    checkbox.append(input);
  } else {
    checkbox.querySelector('input')?.remove();
  }
});

document.querySelectorAll('forge-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', evt => console.log(evt));
});
