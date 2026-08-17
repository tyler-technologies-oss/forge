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
