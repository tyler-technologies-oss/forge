import type { IDrawerComponent, IMenuComponent, IMenuOption, IMenuSelectEventData, ITableComponent, IColumnConfiguration } from '@tylertech/forge';

interface IMachineAccount {
  name: string;
  description: string;
  members: number;
  role: string;
}

const table = document.getElementById('machine-accounts-table') as ITableComponent;
const drawer = document.getElementById('detail-sidesheet') as IDrawerComponent;
const closeBtn = document.getElementById('close-detail-btn');
const cancelBtn = document.getElementById('detail-cancel-btn');
const saveBtn = document.getElementById('detail-save-btn');

drawer.open = false;
requestAnimationFrame(() => {
  drawer.classList.remove('hidden');
});

const ACTIVE_ROW_BG = 'var(--forge-theme-primary-container-minimum)';
const rowElements = new Map<number, HTMLTableRowElement>();
let activeRowIndex: number | null = null;

const setActiveRow = (index: number): void => {
  if (activeRowIndex !== null) {
    const previous = rowElements.get(activeRowIndex);
    if (previous) {
      previous.style.backgroundColor = '';
    }
  }
  activeRowIndex = index;
  const current = rowElements.get(index);
  if (current) {
    current.style.backgroundColor = ACTIVE_ROW_BG;
  }
};

const columnConfigurations: IColumnConfiguration[] = [
  {
    property: 'name',
    header: 'Name',
    template: (_rowIndex, _div, rowData: IMachineAccount) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flex items-center gap-small';

      const icon = document.createElement('forge-icon');
      icon.setAttribute('name', 'robot');

      const link = document.createElement('a');
      link.href = '#';
      link.textContent = rowData.name;

      wrapper.appendChild(icon);
      wrapper.appendChild(link);
      return wrapper;
    }
  },
  { property: 'description', header: 'Description' },
  {
    property: 'members',
    header: 'Members',
    template: (_rowIndex, _div, rowData: IMachineAccount) => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = String(rowData.members);
      return link;
    }
  },
  {
    property: 'role',
    header: 'Role',
    template: (_rowIndex, _div, rowData: IMachineAccount) => {
      const roleOptions: IMenuOption[] = [
        { value: 'Owner', label: 'Owner' },
        { value: 'Editor', label: 'Editor' },
        { value: 'Viewer', label: 'Viewer' }
      ];

      const menu = document.createElement('forge-menu') as IMenuComponent;
      menu.options = roleOptions;
      menu.selectedValue = rowData.role as any;

      const button = document.createElement('forge-button');
      button.setAttribute('variant', 'text');

      const label = document.createTextNode(rowData.role);
      button.appendChild(label);

      const icon = document.createElement('forge-icon');
      icon.setAttribute('slot', 'end');
      icon.setAttribute('name', 'chevron_down');
      button.appendChild(icon);

      menu.addEventListener('forge-menu-select', (evt: Event) => {
        const { value } = (evt as CustomEvent<IMenuSelectEventData>).detail;
        if (typeof value === 'string') {
          rowData.role = value;
          label.nodeValue = value;
          menu.selectedValue = value;
        }
      });

      menu.appendChild(button);
      return menu;
    }
  },
  {
    header: 'Actions',
    template: rowIndex => {
      const button = document.createElement('forge-icon-button');
      button.setAttribute('density', 'medium');
      button.setAttribute('aria-label', 'View details');
      const icon = document.createElement('forge-icon');
      icon.setAttribute('name', 'chevron_right');
      button.appendChild(icon);
      button.addEventListener('click', () => {
        setActiveRow(rowIndex);
        drawer.open = true;
      });
      return button;
    }
  }
];

table.rowCreated = (rowElement, rowIndex) => {
  rowElements.set(rowIndex, rowElement);
};

const data: IMachineAccount[] = [
  { name: 'Machine account 1', description: 'This is a description', members: 3, role: 'Editor' },
  { name: 'Machine account 2', description: 'This is a description', members: 4, role: 'Editor' },
  { name: 'Machine account 3', description: 'This is a description', members: 1, role: 'Viewer' },
  { name: 'Machine account 4', description: 'This is a description', members: 5, role: 'Viewer' }
];

table.columnConfigurations = columnConfigurations;
table.data = data;

const closeDrawer = (): void => {
  drawer.open = false;
};

closeBtn?.addEventListener('click', closeDrawer);
cancelBtn?.addEventListener('click', closeDrawer);
saveBtn?.addEventListener('click', closeDrawer);
