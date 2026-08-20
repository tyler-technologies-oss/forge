import type { ITableComponent, IColumnConfiguration, IPaginatorComponent, IDrawerComponent, IChipSetComponent } from '@tylertech/forge';

interface IBlockEntry {
  id: string;
  name: string;
  type: 'component' | 'pattern' | 'template';
  description: string;
  tags: string[];
  file: string;
  category: string;
  componentsUsed: string[];
  hasScript: boolean;
  screenshot?: string;
}

interface IManifest {
  blocks: IBlockEntry[];
  categories: { name: string }[];
}

const TYPE_LABELS: Record<IBlockEntry['type'], string> = {
  template: 'Template',
  pattern: 'Pattern',
  component: 'Component'
};

const TYPE_BADGE_THEMES: Record<IBlockEntry['type'], string> = {
  template: 'info',
  pattern: 'secondary',
  component: 'tertiary'
};

const filters = {
  search: '',
  type: new Set<string>(),
  category: new Set<string>()
};

const DEFAULT_PAGE_SIZE = 25;

const STATE_PARAMS = {
  SEARCH: 'q',
  TYPE: 'type',
  CATEGORY: 'category',
  PAGE: 'page',
  SIZE: 'size'
} as const;

let allBlocks: IBlockEntry[] = [];
let filteredBlocks: IBlockEntry[] = [];

const table = document.getElementById('blocks-table') as ITableComponent;
const paginator = document.getElementById('blocks-paginator') as IPaginatorComponent;
const drawer = document.getElementById('filter-drawer') as IDrawerComponent;
const toggleFiltersBtn = document.getElementById('toggle-filters-btn') as HTMLButtonElement;
const closeFiltersBtn = document.getElementById('close-filters-btn') as HTMLButtonElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const clearFiltersBtn = document.getElementById('clear-filters-btn') as HTMLButtonElement;
const activeChipSet = document.getElementById('active-filter-chips') as IChipSetComponent;
const visibleCountEl = document.getElementById('visible-count') as HTMLSpanElement;
const totalCountEl = document.getElementById('total-count') as HTMLSpanElement;
const categoryList = document.getElementById('category-facet-list') as HTMLElement;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });
}

function buildColumns(): IColumnConfiguration[] {
  return [
    {
      property: 'name',
      header: 'Name',
      sortable: true,
      template: (_rowIndex, _cell, rowData: IBlockEntry) => {
        const href = escapeHtml('./' + rowData.file);
        return `<a class="forge-hyperlink" href="${href}">${escapeHtml(rowData.name)}</a>`;
      }
    },
    {
      property: 'type',
      header: 'Type',
      sortable: true,
      template: (_rowIndex, _cell, rowData: IBlockEntry) => {
        return `<forge-badge theme="${TYPE_BADGE_THEMES[rowData.type]}">${TYPE_LABELS[rowData.type]}</forge-badge>`;
      }
    },
    { property: 'category', header: 'Category', sortable: true },
    {
      property: 'componentsUsed',
      header: 'Components',
      template: (_rowIndex, _cell, rowData: IBlockEntry) => {
        const list = rowData.componentsUsed ?? [];
        if (!list.length) {
          return `<span class="text-body2 text-medium">—</span>`;
        }
        const preview = list.slice(0, 3).map(escapeHtml).join(', ');
        const suffix = list.length > 3 ? ` <span class="text-body2 text-medium">+${list.length - 3}</span>` : '';
        return preview + suffix;
      }
    }
  ];
}

function matchesFilters(block: IBlockEntry): boolean {
  if (filters.type.size && !filters.type.has(block.type)) {
    return false;
  }
  if (filters.category.size && !filters.category.has(block.category)) {
    return false;
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    // Include componentsUsed so searching e.g. "forge-table" surfaces every block that uses it, not just dedicated component demos.
    const haystack = [block.name, block.description, block.category, block.type, block.tags.join(' '), block.componentsUsed.join(' ')].join(' ').toLowerCase();
    if (!haystack.includes(q)) {
      return false;
    }
  }
  return true;
}

function updateTable(): void {
  filteredBlocks = allBlocks.filter(matchesFilters);
  filteredBlocks.sort((a, b) => a.name.localeCompare(b.name));

  paginator.total = filteredBlocks.length;
  const maxPageIndex = Math.max(0, Math.ceil(filteredBlocks.length / paginator.pageSize) - 1);
  if (paginator.pageIndex > maxPageIndex) {
    paginator.pageIndex = maxPageIndex;
  }
  const start = paginator.pageIndex * paginator.pageSize;
  const end = start + paginator.pageSize;
  table.data = filteredBlocks.slice(start, end);

  visibleCountEl.textContent = filteredBlocks.length.toString();
  totalCountEl.textContent = allBlocks.length.toString();

  renderActiveFilterChips();
  updateFacetCounts();
  writeStateToUrl();
}

// Keeps the current search/filter/pagination state in the URL (via replaceState, so it doesn't
// add history entries) so that navigating back from a block page restores it exactly.
function writeStateToUrl(): void {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set(STATE_PARAMS.SEARCH, filters.search);
  }
  filters.type.forEach(type => params.append(STATE_PARAMS.TYPE, type));
  filters.category.forEach(category => params.append(STATE_PARAMS.CATEGORY, category));
  if (paginator.pageIndex > 0) {
    params.set(STATE_PARAMS.PAGE, String(paginator.pageIndex + 1));
  }
  if (paginator.pageSize !== DEFAULT_PAGE_SIZE) {
    params.set(STATE_PARAMS.SIZE, String(paginator.pageSize));
  }

  const query = params.toString();
  const url = query ? `${location.pathname}?${query}` : location.pathname;
  history.replaceState(null, '', url);
}

function readStateFromUrl(): void {
  const params = new URLSearchParams(location.search);

  filters.search = params.get(STATE_PARAMS.SEARCH) ?? '';
  searchInput.value = filters.search;

  params.getAll(STATE_PARAMS.TYPE).forEach(type => filters.type.add(type));
  params.getAll(STATE_PARAMS.CATEGORY).forEach(category => filters.category.add(category));
  filters.type.forEach(type => syncFacetCheckbox('type', type, true));
  filters.category.forEach(category => syncFacetCheckbox('category', category, true));

  const page = params.get(STATE_PARAMS.PAGE);
  if (page) {
    const parsedPage = Number.parseInt(page, 10);
    if (Number.isFinite(parsedPage) && parsedPage >= 1) {
      paginator.pageIndex = parsedPage - 1;
    }
  }
  const size = params.get(STATE_PARAMS.SIZE);
  if (size) {
    const parsedSize = Number.parseInt(size, 10);
    if (Number.isFinite(parsedSize) && parsedSize > 0) {
      paginator.pageSize = parsedSize;
    }
  }
}

function renderActiveFilterChips(): void {
  const chips: Array<{ label: string; onRemove: () => void }> = [];

  if (filters.search) {
    chips.push({
      label: `“${filters.search}”`,
      onRemove: () => {
        filters.search = '';
        searchInput.value = '';
        updateTable();
      }
    });
  }

  filters.type.forEach(type => {
    chips.push({
      label: `Type: ${TYPE_LABELS[type as IBlockEntry['type']]}`,
      onRemove: () => {
        filters.type.delete(type);
        syncFacetCheckbox('type', type, false);
        updateTable();
      }
    });
  });

  filters.category.forEach(category => {
    chips.push({
      label: `Category: ${category}`,
      onRemove: () => {
        filters.category.delete(category);
        syncFacetCheckbox('category', category, false);
        updateTable();
      }
    });
  });

  activeChipSet.innerHTML = '';
  for (const chip of chips) {
    const el = document.createElement('forge-chip');
    el.setAttribute('type', 'field');
    el.setAttribute('dense', '');
    el.setAttribute('removable', '');
    el.textContent = chip.label;
    el.addEventListener('forge-chip-delete', chip.onRemove);
    activeChipSet.appendChild(el);
  }
}

function syncFacetCheckbox(filterKind: string, value: string, checked: boolean): void {
  const cb = document.querySelector<HTMLInputElement>(`forge-checkbox[data-filter="${filterKind}"][value="${CSS.escape(value)}"]`);
  if (cb) {
    (cb as unknown as { checked: boolean }).checked = checked;
  }
}

function updateFacetCounts(): void {
  const counters: Record<string, number> = {};
  for (const block of allBlocks) {
    counters[`type:${block.type}`] = (counters[`type:${block.type}`] ?? 0) + 1;
  }
  document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
    const key = el.dataset.count!;
    const count = counters[key] ?? 0;
    el.textContent = `(${count})`;
  });
}

function populateCategoryFacet(): void {
  const categories = [...new Set(allBlocks.map(b => b.category))].sort();
  categoryList.innerHTML = '';
  for (const category of categories) {
    const item = document.createElement('forge-list-item');
    item.innerHTML = `
      <forge-checkbox slot="start" dense data-filter="category" value="${escapeHtml(category)}"></forge-checkbox>
      ${escapeHtml(category)}
    `;
    categoryList.appendChild(item);
  }
}

function wireFilterCheckboxes(): void {
  document.querySelectorAll<HTMLElement>('forge-checkbox[data-filter]').forEach(cb => {
    cb.addEventListener('change', () => {
      const filterKind = cb.dataset.filter!;
      const value = cb.getAttribute('value') ?? '';
      const checked = (cb as unknown as { checked: boolean }).checked;
      if (filterKind === 'type') {
        if (checked) filters.type.add(value);
        else filters.type.delete(value);
      } else if (filterKind === 'category') {
        if (checked) filters.category.add(value);
        else filters.category.delete(value);
      }
      updateTable();
    });
  });
}

function clearAllFilters(): void {
  filters.search = '';
  filters.type.clear();
  filters.category.clear();
  searchInput.value = '';
  document.querySelectorAll<HTMLElement>('forge-checkbox[data-filter]').forEach(cb => {
    (cb as unknown as { checked: boolean }).checked = false;
  });
  updateTable();
}

async function init(): Promise<void> {
  table.columnConfigurations = buildColumns();

  const res = await fetch('./manifest.json');
  const manifest = (await res.json()) as IManifest;
  allBlocks = manifest.blocks;

  populateCategoryFacet();
  wireFilterCheckboxes();
  readStateFromUrl();
  updateTable();

  paginator.addEventListener('forge-paginator-change', updateTable);

  const applySearch = (): void => {
    filters.search = searchInput.value.trim();
    paginator.pageIndex = 0;
    updateTable();
  };

  searchInput.addEventListener('input', applySearch);

  // The forge-text-field `show-clear` button dispatches this event on the host
  // element when it resets the input's value.
  document.getElementById('search-field')?.addEventListener('forge-text-field-clear', () => {
    searchInput.value = '';
    applySearch();
  });

  toggleFiltersBtn.addEventListener('click', () => {
    drawer.open = !drawer.open;
  });
  closeFiltersBtn.addEventListener('click', () => {
    drawer.open = false;
  });
  clearFiltersBtn.addEventListener('click', clearAllFilters);
}

void init();

customElements.whenDefined('forge-app-layout').then(() => {
  document.body.classList.add('ready');
});
