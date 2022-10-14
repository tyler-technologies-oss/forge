import * as Forge from '@tylertech/forge';
import { IconRegistry, ListComponent, COMPONENT_NAME_PREFIX } from '@tylertech/forge';
import { tylIconChevronRight } from '@tylertech/tyler-icons/standard';

IconRegistry.define(tylIconChevronRight);

// eslint-disable-next-line @typescript-eslint/dot-notation
const elementNames: string[] = Object.values(Forge).filter(obj => obj.hasOwnProperty('_customElementName')).map(cls => cls['_customElementName']);
const listElement = document.getElementById('component-list') as ListComponent;
const searchField = document.getElementById('search-field') as HTMLInputElement;
const clearButton = document.getElementById('clear-button') as HTMLButtonElement;

listElement.replaceChildren(...buildListItems(elementNames));
searchField.addEventListener('input', ({ target }) => onSearch((target as HTMLInputElement).value));
clearButton.addEventListener('click', () => {
  searchField.value = '';
  onSearch('');
});

function onSearch(filter: string): void {
  const names = elementNames.filter(name => name.toLowerCase().includes(filter.toLowerCase()));
  const elements = buildListItems(names);
  listElement.replaceChildren(...elements);
}

function buildListItems(names: string[]): HTMLElement[] {
  const elements = [];

  for (const name of names) {
    const componentName = name.replace(new RegExp(`^${COMPONENT_NAME_PREFIX}`), '');
    const listItem = document.createElement('forge-list-item');
    listItem.href = `/components/${componentName}/${componentName}.html`;
    listItem.textContent = `<${name}>`;

    const trailingIcon = document.createElement('forge-icon');
    trailingIcon.slot = 'trailing';
    trailingIcon.name = 'chevron_right';
    listItem.appendChild(trailingIcon);

    elements.push(listItem);
  }

  return elements;
}
