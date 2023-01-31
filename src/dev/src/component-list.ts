import { IconRegistry, ListComponent } from '@tylertech/forge';
import { tylIconChevronRight } from '@tylertech/tyler-icons/standard';
import componentsJson from '$src/components.json';

IconRegistry.define(tylIconChevronRight);

interface ComponentIdentifier {
  label: string;
  path: string;
  tags?: string[];
}

const components: ComponentIdentifier[] = componentsJson;
const listElement = document.getElementById('component-list') as ListComponent;
const searchField = document.getElementById('search-field') as HTMLInputElement;
const clearButton = document.getElementById('clear-button') as HTMLButtonElement;

listElement.replaceChildren(...buildListItems(components));
searchField.addEventListener('input', ({ target }) => onSearch((target as HTMLInputElement).value));
clearButton.addEventListener('click', () => {
  searchField.value = '';
  onSearch('');
});

function onSearch(filter: string): void {
  filter = filter.trim().toLowerCase();
  const names = components.filter(({ label, tags }) => {
    return label.toLowerCase().includes(filter) ||
           tags?.some(tag => tag.toLowerCase().includes(filter));
  });
  const elements = buildListItems(names);
  listElement.replaceChildren(...elements);
}

function buildListItems(entries: ComponentIdentifier[]): HTMLElement[] {
  const elements = [];

  for (const { label, path } of entries) {
    const anchor = document.createElement('a');
    anchor.classList.add('list-item-link');
    anchor.href = path;

    const listItem = document.createElement('forge-list-item');
    listItem.textContent = label;
    anchor.appendChild(listItem);

    const trailingIcon = document.createElement('forge-icon');
    trailingIcon.slot = 'trailing';
    trailingIcon.name = 'chevron_right';
    listItem.appendChild(trailingIcon);

    elements.push(anchor);
  }

  return elements;
}
