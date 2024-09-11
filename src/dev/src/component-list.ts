import componentsJson from '$src/components.json';
import { IconRegistry } from '@tylertech/forge/icon';
import { ListComponent } from '@tylertech/forge/list';
import { tylIconChevronRight } from '@tylertech/tyler-icons/standard';
import './component-list.scss';

IconRegistry.define(tylIconChevronRight);

interface IComponentGroup {
  label: string;
  components: IComponentIdentifier[];
}

interface IComponentIdentifier {
  label: string;
  path: string;
  tags?: string[];
}

const componentGroups: IComponentGroup[] = createComponentGroups(componentsJson); // Group components alphabetically
const listElement = document.getElementById('component-list') as ListComponent;
const searchField = document.getElementById('search-field') as HTMLInputElement;
const searchFieldInput = searchField.querySelector('input');
const contentTitleElement = document.querySelector('#content-title');
const originalComponentCount = updateContentTitle(componentGroups);

const url = new URL(document.location.href);
const existingFilter = url.searchParams.get('q');

// Check if we have an existing filter set via URL
if (existingFilter) {
  // Execute filter using value from URL
  searchFieldInput.value = existingFilter;
  onSearch(existingFilter);
} else {
  // Render full list of components
  listElement.replaceChildren(...buildComponentsList(componentGroups));
}

// Filter listeners
searchFieldInput.addEventListener('input', ({ target }) => onSearch((target as HTMLInputElement).value));
searchField.addEventListener('forge-text-field-clear', () => {
  searchFieldInput.value = '';
  onSearch('');
});

/**
 * Groups components identifier entries alphabetically.
 */
function createComponentGroups(identifiers: IComponentIdentifier[]): IComponentGroup[] {
  return identifiers.reduce((groups, component) => {
    const firstChar = component.label.charAt(0).toLowerCase();
    const existingGroup = groups.find(g => g.label.charAt(0).toLowerCase() === firstChar);
    if (existingGroup) {
      existingGroup.components.push(component);
      return groups;
    }
    groups.push({ label: firstChar.toUpperCase(), components: [component] });
    return groups;
  }, [] as IComponentGroup[]);
}

/**
 * Filter the component groups by the provided filter text, and re-render the list.
 */
function onSearch(filter: string): void {
  filter = filter.trim().toLowerCase();
  let groups = window.structuredClone<IComponentGroup[]>(componentGroups);
  groups = groups.filter(group => {
    group.components = group.components.filter(({ label, tags }) => {
      return label.toLowerCase().includes(filter) ||
             tags?.some(tag => tag.toLowerCase().includes(filter));
    });
    return !!group.components.length;
  });
  const elements = buildComponentsList(groups);
  listElement.replaceChildren(...elements);
  updateContentTitle(groups, getComponentCount(groups) !== originalComponentCount);
  updateQueryString(filter);
}

function updateQueryString(filter: string): void {
  if (filter) {
    url.searchParams.set('q', filter);
  } else {
    url.searchParams.delete('q');
  }
  history.pushState(null, '', url);
}

/**
 * Updates the card header text with the component count.
 */
function updateContentTitle(groups: IComponentGroup[], filtered = false): number {
  const count = getComponentCount(groups);
  const titleText = `Components (${count}${filtered ? ` of ${originalComponentCount}` : ''})`;
  if (filtered) {
    contentTitleElement.innerHTML = `
      <div class="flex">
        ${titleText}
        <forge-badge>Filtered</forge-badge>
      </div>
    `;
  } else {
    contentTitleElement.textContent = titleText;
  }
  return count;
}

/**
 * Get a count of components across all groups.
 */
function getComponentCount(groups: IComponentGroup[]): number {
  return groups.reduce((count, { components }) => count += components.length, 0);
}

/**
 * Render the component groups.
 */
function buildComponentsList(groups: IComponentGroup[]): HTMLElement[] {
  if (!groups.length) {
    const emptyText = document.createElement('div');
    emptyText.classList.add('forge-typography--label1', 'empty-text');
    emptyText.textContent = 'No components found.';
    return [emptyText];
  }

  const elements = [];

  for (const { label: groupLabel, components } of groups) {
    const groupHeader = document.createElement('div');
    groupHeader.classList.add('forge-typography--subheading3', 'component-list-header');
    groupHeader.textContent = groupLabel;
    elements.push(groupHeader);

    for (const { label: componentLabel, path } of components) {
      const listItem = document.createElement('forge-list-item');
      listItem.textContent = componentLabel;

      const anchorEl = document.createElement('a');
      anchorEl.href = path;
      anchorEl.setAttribute('aria-label', `Navigate to ${componentLabel} demo page`);
      listItem.appendChild(anchorEl);

      const trailingIcon = document.createElement('forge-icon');
      trailingIcon.slot = 'trailing';
      trailingIcon.name = 'chevron_right';
      listItem.appendChild(trailingIcon);

      elements.push(listItem);
    }
  }

  return elements;
}
