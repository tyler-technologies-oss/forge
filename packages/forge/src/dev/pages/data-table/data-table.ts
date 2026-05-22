import '$src/shared';
import type { ColumnDef, DataTableElement, RowSelectionType } from '@tylertech/forge/data-table';
import '@tylertech/forge/data-table/features/filter';

import '@tylertech/forge/data-table/data-table.js';

interface RowData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  city: string;
  state: string;
}

const flatColumns: ColumnDef<RowData>[] = [
  { header: 'Id', property: 'id', filterType: 'number' },
  { header: 'First Name', property: 'firstName' },
  { header: 'Last Name', property: 'lastName' },
  { header: 'Email', property: 'email' },
  { header: 'Phone', property: 'phone' },
  { header: 'Department', property: 'department' },
  { header: 'Position', property: 'position' },
  { header: 'Salary', property: 'salary', filterType: 'number', transform: row => `$${row.salary.toLocaleString()}` },
  { header: 'City', property: 'city' },
  { header: 'State', property: 'state' }
];

const groupedColumns: ColumnDef<RowData>[] = [
  { header: 'Id', property: 'id', filterType: 'number' },
  {
    header: 'Personal Info',
    columns: [
      { header: 'First Name', property: 'firstName' },
      { header: 'Last Name', property: 'lastName' },
      { header: 'Email', property: 'email' },
      { header: 'Phone', property: 'phone' }
    ]
  },
  {
    header: 'Employment',
    columns: [
      { header: 'Department', property: 'department' },
      { header: 'Position', property: 'position' },
      { header: 'Salary', property: 'salary', filterType: 'number', transform: row => `$${row.salary.toLocaleString()}` }
    ]
  },
  {
    header: 'Location',
    columns: [
      { header: 'City', property: 'city' },
      { header: 'State', property: 'state' }
    ]
  }
];

const dataTable = document.querySelector('forge-data-table') as DataTableElement<RowData>;
dataTable.columns = flatColumns;
dataTable.reorderable = true;
dataTable.multiSort = false;
dataTable.data = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@company.com',
    phone: '(555) 123-4567',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 125000,
    city: 'San Francisco',
    state: 'CA'
  },
  {
    id: 2,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@company.com',
    phone: '(555) 234-5678',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 95000,
    city: 'New York',
    state: 'NY'
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@company.com',
    phone: '(555) 345-6789',
    department: 'Engineering',
    position: 'Tech Lead',
    salary: 145000,
    city: 'Austin',
    state: 'TX'
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob.williams@company.com',
    phone: '(555) 456-7890',
    department: 'Sales',
    position: 'Sales Representative',
    salary: 85000,
    city: 'Chicago',
    state: 'IL'
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Davis',
    email: 'charlie.davis@company.com',
    phone: '(555) 567-8901',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 75000,
    city: 'Seattle',
    state: 'WA'
  },
  {
    id: 6,
    firstName: 'Charlie',
    lastName: 'Miller',
    email: 'charlie.miller@company.com',
    phone: '(555) 678-9012',
    department: 'HR',
    position: 'HR Manager',
    salary: 90000,
    city: 'Boston',
    state: 'MA'
  },
  {
    id: 7,
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@company.com',
    phone: '(555) 789-0123',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 130000,
    city: 'Denver',
    state: 'CO'
  },
  {
    id: 8,
    firstName: 'David',
    lastName: 'Moore',
    email: 'david.moore@company.com',
    phone: '(555) 890-1234',
    department: 'Finance',
    position: 'Financial Analyst',
    salary: 80000,
    city: 'Atlanta',
    state: 'GA'
  }
];

dataTable.addEventListener('forge-data-table-sort', console.log);
dataTable.addEventListener('forge-data-table-filter', console.log);
dataTable.addEventListener('forge-data-table-column-order', console.log);
dataTable.addEventListener('forge-data-table-row-click', console.log);
dataTable.addEventListener('forge-data-table-column-visibility', console.log);

const groupedColumnsCheckbox = document.getElementById('grouped-columns') as HTMLInputElement;
groupedColumnsCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dataTable.columns = selected ? groupedColumns : flatColumns;
});

const resizableCheckbox = document.getElementById('resizable') as HTMLInputElement;
resizableCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.resizable = selected));

const reorderableCheckbox = document.getElementById('reorderable') as HTMLInputElement;
reorderableCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.reorderable = selected));

const hoverCheckbox = document.getElementById('hover') as HTMLInputElement;
hoverCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.hover = selected));

const stripedCheckbox = document.getElementById('striped') as HTMLInputElement;
stripedCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.striped = selected));

const compactCheckbox = document.getElementById('compact') as HTMLInputElement;
compactCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.compact = selected));

const borderedCheckbox = document.getElementById('bordered') as HTMLInputElement;
borderedCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.bordered = selected));

const allowRowClickCheckbox = document.getElementById('allow-row-click') as HTMLInputElement;
allowRowClickCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.allowRowClick = selected));

const customCellTemplateCheckbox = document.getElementById('custom-cell-template') as HTMLInputElement;
customCellTemplateCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const findColumn = (columns: ColumnDef<RowData>[]): ColumnDef<RowData> | undefined => {
    for (const column of columns) {
      if (column.property === 'email') {
        return column;
      }
      if (column.columns) {
        const found = findColumn(column.columns as ColumnDef<RowData>[]);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };

  const emailColumn = findColumn(dataTable.columns);
  if (!emailColumn) {
    return;
  }

  if (selected) {
    emailColumn.template = ({ cell }) => {
      const div = document.createElement('div');
      div.setAttribute('part', 'cell');
      div.textContent = `Custom: ${cell.getValue()}`;
      div.style.color = 'red';
      return div;
    };
    emailColumn.useTemplateSlot = true;
    emailColumn.stopRowClickPropagation = true;
  } else {
    delete emailColumn.template;
    delete emailColumn.useTemplateSlot;
    delete emailColumn.stopRowClickPropagation;
  }
  dataTable.columns = [...dataTable.columns];
});

const expandableCheckbox = document.getElementById('expandable') as HTMLInputElement;
expandableCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.expandable = selected));

const rowSelectionSelect = document.getElementById('row-select') as HTMLSelectElement;
rowSelectionSelect.addEventListener('change', () => (dataTable.rowSelection = rowSelectionSelect.value as RowSelectionType));

const sortableCheckbox = document.getElementById('sortable') as HTMLInputElement;
sortableCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.sortable = selected));

const manualSortCheckbox = document.getElementById('manual-sort') as HTMLInputElement;
manualSortCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.manualSort = selected));

const multiSortCheckbox = document.getElementById('multi-sort') as HTMLInputElement;
multiSortCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.multiSort = selected));

const multiSortKeySelect = document.getElementById('multi-sort-key') as HTMLSelectElement;
multiSortKeySelect.addEventListener('change', () => (dataTable.multiSortKey = multiSortKeySelect.value as 'shift' | 'ctrl' | 'meta' | 'alt'));

const maxMultiSortColCountSelect = document.getElementById('max-multi-sort-col-count') as HTMLSelectElement;
maxMultiSortColCountSelect.addEventListener('change', () => {
  dataTable.maxMultiSortColCount = maxMultiSortColCountSelect.value === 'unlimited' ? undefined : parseInt(maxMultiSortColCountSelect.value, 10);
});

const filterableCheckbox = document.getElementById('filterable') as HTMLInputElement;
filterableCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.filterable = selected));

const manualFilterCheckbox = document.getElementById('manual-filter') as HTMLInputElement;
manualFilterCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.manualFilter = selected));

const showFooterCheckbox = document.getElementById('show-footer') as HTMLInputElement;
showFooterCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const updateColumnFooters = (columns: ColumnDef<RowData>[]): void => {
    columns.forEach(column => {
      if (column.columns) {
        updateColumnFooters(column.columns);
      } else if (column.property === 'id') {
        if (selected) {
          column.footer = ({ data }) => `Count: ${data.length}`;
        } else {
          delete column.footer;
        }
      } else if (column.property === 'salary') {
        if (selected) {
          column.footer = ({ data }) => {
            const total = data.reduce((acc, row) => acc + row.salary, 0);
            const avg = total / data.length;
            return `Avg: $${Math.round(avg).toLocaleString()} | Total: $${total.toLocaleString()}`;
          };
        } else {
          delete column.footer;
        }
      }
    });
  };

  updateColumnFooters(dataTable.columns);
  dataTable.columns = [...dataTable.columns];
});

const hiddenColumnsSelect = document.getElementById('hidden-columns') as HTMLSelectElement;
hiddenColumnsSelect.innerHTML = dataTable.columns
  .map(({ header, id }) => `<option value="${id ?? header?.toString().toLowerCase()}">${header}</option>`)
  .join('');
hiddenColumnsSelect.addEventListener('change', () => {
  const hiddenColumns = new Set(
    Array.from(hiddenColumnsSelect.selectedOptions)
      .map(option => option.value)
      .filter(Boolean)
  );

  dataTable.columns.forEach(column => {
    const columnId = column.id ?? column.header?.toString().toLowerCase();
    if (!columnId) {
      return;
    }

    if (hiddenColumns.has(columnId)) {
      dataTable.hideColumn(columnId);
    } else {
      dataTable.showColumn(columnId);
    }
  });
});
