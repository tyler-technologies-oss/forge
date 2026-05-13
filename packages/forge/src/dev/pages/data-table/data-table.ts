import '$src/shared';
import type { ColumnDef, DataTableElement, RowSelectionType } from '@tylertech/forge/data-table';
import '@tylertech/forge/data-table/features/filter';

import '@tylertech/forge/data-table/data-table.js';

interface RowData {
  id: number;
  name: string;
  age: number;
  birthday: Date;
}

const dataTable = document.querySelector('forge-data-table') as DataTableElement<RowData>;
dataTable.columns = [
  { header: 'Id', property: 'id', filterType: 'number' },
  { header: 'Name', property: 'name' },
  {
    header: 'Age',
    property: 'age',
    filterType: 'range',
    footer: ({ data }) => `Total age: ${data.reduce((acc, row) => acc + row.age, 0)}`
  },
  {
    header: 'Birthday',
    property: 'birthday',
    transform: row => row.birthday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
];
dataTable.data = [
  { id: 1, name: 'Alice', age: 25, birthday: new Date(1996, 1, 14) },
  { id: 2, name: 'Bob', age: 30, birthday: new Date(1991, 5, 7) },
  { id: 3, name: 'Charlie', age: 35, birthday: new Date(1986, 2, 1) },
  { id: 4, name: 'David', age: 40, birthday: new Date(1981, 9, 4) },
  { id: 5, name: 'Eve', age: 45, birthday: new Date(1976, 11, 17) }
];

dataTable.addEventListener('forge-data-table-sort', console.log);
dataTable.addEventListener('forge-data-table-filter', console.log);
dataTable.addEventListener('forge-data-table-column-order', console.log);
dataTable.addEventListener('forge-data-table-row-click', console.log);
dataTable.addEventListener('forge-data-table-column-visibility', console.log);

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
  const birthdayColumn = dataTable.columns.find(column => column.property === 'birthday') as ColumnDef;
  if (selected) {
    birthdayColumn.template = ({ cell }) => {
      const div = document.createElement('div');
      div.setAttribute('part', 'cell');
      div.textContent = `Custom: ${cell.getValue()}`;
      div.style.color = 'red';
      return div;
    };
    birthdayColumn.useTemplateSlot = true;
    birthdayColumn.stopRowClickPropagation = true;
  } else {
    delete birthdayColumn.template;
    delete birthdayColumn.useTemplateSlot;
    delete birthdayColumn.stopRowClickPropagation;
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

const filterableCheckbox = document.getElementById('filterable') as HTMLInputElement;
filterableCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.filterable = selected));

const manualFilterCheckbox = document.getElementById('manual-filter') as HTMLInputElement;
manualFilterCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.manualFilter = selected));

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
