import '$src/shared';
import '@tylertech/forge/listbox';
import '@tylertech/forge/select';
import './listbox.scss';
import { IListboxDropData, ListboxComponent } from '@tylertech/forge/listbox';

document.addEventListener('forge-listbox-drop' as any, (event: CustomEvent<IListboxDropData>) => {
  console.log(event.detail);

  const targetListbox = event.target as ListboxComponent;
  const target = event.detail.group || targetListbox;
  const elementAtIndex = target.children[event.detail.index];
  const option = event.detail.option;

  if (elementAtIndex === option) {
    return;
  }

  option.parentElement?.removeChild(option);
  target.insertBefore(option, elementAtIndex);
});

const listboxForm = document.getElementById('listbox-form') as HTMLFormElement;
const listboxFormOutput = document.getElementById('listbox-form-output') as HTMLElement;
listboxForm.addEventListener('submit', (evt: Event) => {
  evt.preventDefault();
  const formData = new FormData(listboxForm);
  const entries = Array.from(formData.entries());
  console.log('[listbox form submit]', entries);
  listboxFormOutput.textContent = JSON.stringify(entries, null, 2);
});

const toggleFieldsetDisabled = document.getElementById('toggle-fieldset-disabled') as HTMLInputElement;
const listboxFieldset = document.getElementById('listbox-fieldset') as HTMLFieldSetElement;
toggleFieldsetDisabled.addEventListener('change', () => {
  listboxFieldset.disabled = toggleFieldsetDisabled.checked;
});
