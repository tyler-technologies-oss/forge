import '$src/shared';
import '@tylertech/forge/listbox';
import '@tylertech/forge/select';
import './listbox.scss';
import { IListboxDropData, ListboxComponent } from '@tylertech/forge/listbox';
import { OptionComponent } from '@tylertech/forge/option';

document.addEventListener('forge-listbox-drop' as any, (event: CustomEvent<IListboxDropData>) => {
  const targetListbox = event.target as ListboxComponent;
  const sourceListbox = document.getElementById(event.detail.source) as ListboxComponent;
  const elementAtIndex = targetListbox.children[event.detail.index];
  const option = sourceListbox.querySelector(`forge-option[value="${event.detail.value}"]`) as OptionComponent;

  sourceListbox.removeChild(option);
  targetListbox.insertBefore(option, elementAtIndex);
});
