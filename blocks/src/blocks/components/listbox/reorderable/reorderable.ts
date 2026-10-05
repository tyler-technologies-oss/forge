import type { IListboxDropData, ListboxComponent } from '@tylertech/forge/listbox';

document.addEventListener('forge-listbox-drop', ((event: CustomEvent<IListboxDropData>) => {
  const listbox = event.target as ListboxComponent;
  const target = event.detail.group ?? listbox;
  const { option, index } = event.detail;
  const elementAtIndex = target.children[index];

  if (elementAtIndex === option) {
    return;
  }

  option.parentElement?.removeChild(option);
  target.insertBefore(option, elementAtIndex);
}) as EventListener);
