import '$src/shared';
import '@tylertech/forge/listbox';
import '@tylertech/forge/select';
import './listbox.scss';
import { IListboxDropData, ListboxComponent } from '@tylertech/forge/listbox';
import type { SwitchComponent } from '@tylertech/forge/switch';

const multipleSwitch = document.getElementById('opt-multiple') as SwitchComponent;
const reorderableSwitch = document.getElementById('opt-reorderable') as SwitchComponent;
const denseSwitch = document.getElementById('opt-dense') as SwitchComponent;
const disabledSwitch = document.getElementById('opt-disabled') as SwitchComponent;
const readonlySwitch = document.getElementById('opt-readonly') as SwitchComponent;
const allowDeselectSwitch = document.getElementById('opt-allow-deselect') as SwitchComponent;
const listboxes = document.querySelectorAll('forge-listbox');

multipleSwitch.addEventListener('change', () => {
  const isMultiple = multipleSwitch.checked;
  listboxes.forEach(listbox => {
    listbox.multiple = isMultiple;
  });
});

reorderableSwitch.addEventListener('change', () => {
  const isReorderable = reorderableSwitch.checked;
  listboxes.forEach(listbox => {
    listbox.reorderable = isReorderable;
  });
});

denseSwitch.addEventListener('change', () => {
  const isDense = denseSwitch.checked;
  listboxes.forEach(listbox => {
    listbox.dense = isDense;
  });
});

disabledSwitch.addEventListener('change', () => {
  const isDisabled = disabledSwitch.checked;
  listboxes.forEach(listbox => {
    listbox.disabled = isDisabled;
  });
});

readonlySwitch.addEventListener('change', () => {
  const isReadonly = readonlySwitch.checked;
  listboxes.forEach(listbox => {
    listbox.readonly = isReadonly;
  });
});

allowDeselectSwitch.addEventListener('change', () => {
  const isAllowDeselect = allowDeselectSwitch.checked;
  listboxes.forEach(listbox => {
    listbox.allowDeselect = isAllowDeselect;
  });
});

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
