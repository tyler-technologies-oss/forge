import componentsJson from '$src/components.json';
import { IconRegistry } from '@tylertech/forge/icon';
import type { IButtonToggleGroupComponent } from '@tylertech/forge/button-toggle';
import { ListComponent } from '@tylertech/forge/list';
import { tylIconChevronRight } from '@tylertech/tyler-icons';
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

type ComponentView = 'grid' | 'list';

const VIEW_PARAM = 'view';
const VIEW_STORAGE_KEY = 'forge-dev-component-view';
const DEFAULT_VIEW: ComponentView = 'grid';

const componentGroups: IComponentGroup[] = createComponentGroups(componentsJson); // Group components alphabetically
const viewToggle = document.getElementById('view-toggle') as IButtonToggleGroupComponent;
const viewElements = Array.from(document.querySelectorAll<HTMLElement>('.component-view'));
const gridEmptyMessage = document.getElementById('component-grid-empty') as HTMLElement;
const tagsByPath = new Map((componentsJson as IComponentIdentifier[]).map(({ path, tags }) => [path, tags ?? []]));
const gridCells = Array.from(document.querySelectorAll<HTMLElement>('#component-grid > .cell')).map(cell => {
  const link = cell.querySelector<HTMLAnchorElement>('.cell__label');
  return {
    cell,
    label: link?.textContent?.trim().toLowerCase() ?? '',
    tags: tagsByPath.get(link?.getAttribute('href') ?? '') ?? []
  };
});
const listElement = document.getElementById('component-list') as ListComponent;
const searchField = document.getElementById('search-field') as HTMLInputElement;
const searchFieldInput = searchField.querySelector('input') as HTMLInputElement;
const filterBadge = document.getElementById('filter-badge') as HTMLElement;
const originalComponentCount = getComponentCount(componentGroups);

const url = new URL(document.location.href);
const existingFilter = url.searchParams.get('q');

setView(getInitialView());
viewToggle.addEventListener('forge-button-toggle-group-change', ({ detail }: CustomEvent<ComponentView>) => {
  if (detail) {
    setView(detail, { remember: true });
  }
});

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
    group.components = group.components.filter(
      ({ label, tags }) => label.toLowerCase().includes(filter) || tags?.some(tag => tag.toLowerCase().includes(filter))
    );
    return !!group.components.length;
  });
  const elements = buildComponentsList(groups);
  listElement.replaceChildren(...elements);
  filterGrid(filter);
  filterBadge.hidden = getComponentCount(groups) === originalComponentCount;
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
 * Get a count of components across all groups.
 */
function getComponentCount(groups: IComponentGroup[]): number {
  return groups.reduce((count, { components }) => (count += components.length), 0);
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

/**
 * Shows or hides the grid's demo cells to match the filter, by name or tag.
 */
function filterGrid(filter: string): void {
  gridCells.forEach(({ cell, label, tags }) => {
    cell.hidden = !!filter && !label.includes(filter) && !tags.some(tag => tag.toLowerCase().includes(filter));
  });
  gridEmptyMessage.hidden = gridCells.some(({ cell }) => !cell.hidden);
}

/**
 * Picks the view from the URL, then the last choice, then the default.
 */
function getInitialView(): ComponentView {
  const fromUrl = url.searchParams.get(VIEW_PARAM);
  if (isComponentView(fromUrl)) {
    return fromUrl;
  }
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
  } catch {
    stored = null;
  }
  return isComponentView(stored) ? stored : DEFAULT_VIEW;
}

function isComponentView(value: string | null): value is ComponentView {
  return value === 'grid' || value === 'list';
}

/**
 * Shows the chosen view and keeps the toggle, URL and stored choice in step.
 */
function setView(view: ComponentView, { remember = false } = {}): void {
  viewToggle.value = view;
  viewElements.forEach(element => (element.hidden = element.dataset.view !== view));

  if (view === DEFAULT_VIEW) {
    url.searchParams.delete(VIEW_PARAM);
  } else {
    url.searchParams.set(VIEW_PARAM, view);
  }
  history.replaceState(null, '', url);

  if (remember) {
    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch {
      // Storage can be unavailable, such as in a private window; the URL still records the view
    }
  }
}
