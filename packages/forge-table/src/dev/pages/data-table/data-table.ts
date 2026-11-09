import '$src/shared';
import '@tylertech/forge-table';
import '@tylertech/forge-table/data-table/features/filter';
import './data-table.scss';
import { CurrencyFormatter, DataSource, DateFormatter, NumberFormatter } from '@tylertech/forge-core';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { actionCell, linkCell } from '@tylertech/forge-table';
import type { ColumnDef, DataTableElement, RowSelectionType } from '@tylertech/forge-table';
import { IconRegistry } from '@tylertech/forge';
import { tylIconDelete, tylIconEdit } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconEdit, tylIconDelete]);

interface RowData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  performanceRating: number;
  bonusRate: number;
  startDate: Date;
  city: string;
  state: string;
}

const FETCH_DELAY_MS = 250;

const ratingFormatter = new NumberFormatter({ minimumFractionDigits: 1, maximumFractionDigits: 1 });
const bonusRateFormatter = new NumberFormatter({ percentage: true, minimumFractionDigits: 1, maximumFractionDigits: 1 });

const actionsColumn: ColumnDef<RowData> = {
  id: 'actions',
  header: 'Actions',
  resizable: false,
  stopRowClickPropagation: true,
  template: actionCell([
    { text: 'Edit', icon: 'edit', onClick: ({ original }) => console.log('edit', original) },
    { text: 'Delete', icon: 'delete', onClick: ({ original }) => console.log('delete', original) }
  ])
};

const flatColumns: ColumnDef<RowData>[] = [
  { header: 'Id', property: 'id', filterType: 'number' },
  { header: 'First Name', property: 'firstName' },
  { header: 'Last Name', property: 'lastName' },
  { header: 'Email', property: 'email', template: linkCell({ type: 'email' }) },
  { header: 'Phone', property: 'phone', template: linkCell({ type: 'phone' }) },
  { header: 'Department', property: 'department' },
  { header: 'Position', property: 'position' },
  { header: 'Salary', property: 'salary', filterType: 'number', format: new CurrencyFormatter(), align: 'end' },
  { header: 'Performance rating', property: 'performanceRating', filterType: 'number', format: ratingFormatter },
  { header: 'Bonus rate', property: 'bonusRate', filterType: 'number', format: bonusRateFormatter },
  { header: 'Start date', property: 'startDate', filterType: 'date', format: new DateFormatter() },
  { header: 'City', property: 'city' },
  { header: 'State', property: 'state' },
  actionsColumn
];

const groupedColumns: ColumnDef<RowData>[] = [
  { header: 'Id', property: 'id', filterType: 'number' },
  {
    header: 'Personal Info',
    columns: [
      { header: 'First Name', property: 'firstName' },
      { header: 'Last Name', property: 'lastName' },
      { header: 'Email', property: 'email', template: linkCell({ type: 'email' }) },
      { header: 'Phone', property: 'phone', template: linkCell({ type: 'phone' }) }
    ]
  },
  {
    header: 'Employment',
    columns: [
      { header: 'Department', property: 'department' },
      { header: 'Position', property: 'position' },
      { header: 'Salary', property: 'salary', filterType: 'number', format: new CurrencyFormatter() },
      { header: 'Performance rating', property: 'performanceRating', filterType: 'number', format: ratingFormatter },
      { header: 'Bonus rate', property: 'bonusRate', filterType: 'number', format: bonusRateFormatter },
      { header: 'Start date', property: 'startDate', filterType: 'date', format: new DateFormatter() }
    ]
  },
  {
    header: 'Location',
    columns: [
      { header: 'City', property: 'city' },
      { header: 'State', property: 'state' }
    ]
  },
  actionsColumn
];

const dataTable = document.querySelector('forge-data-table') as DataTableElement<RowData>;
dataTable.columns = flatColumns;
dataTable.reorderable = true;
dataTable.multiSort = false;
const employees: RowData[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@company.com',
    phone: '(555) 123-4567',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 125000,
    performanceRating: 4.5,
    bonusRate: 0.12,
    startDate: new Date(2019, 2, 18),
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
    performanceRating: 3.8,
    bonusRate: 0.08,
    startDate: new Date(2020, 6, 6),
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
    performanceRating: 4.9,
    bonusRate: 0.15,
    startDate: new Date(2017, 10, 2),
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
    performanceRating: 3.2,
    bonusRate: 0.05,
    startDate: new Date(2021, 0, 25),
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
    performanceRating: 3.6,
    bonusRate: 0.0425,
    startDate: new Date(2023, 8, 11),
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
    performanceRating: 4.1,
    bonusRate: 0.07,
    startDate: new Date(2018, 4, 14),
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
    performanceRating: 4.7,
    bonusRate: 0.135,
    startDate: new Date(2016, 11, 5),
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
    performanceRating: 3.9,
    bonusRate: 0.06,
    startDate: new Date(2022, 3, 29),
    city: 'Atlanta',
    state: 'GA'
  }
];

dataTable.dataSource = new DataSource<RowData>(async (skip, take) => {
  await new Promise(resolve => setTimeout(resolve, FETCH_DELAY_MS));
  return employees.slice(skip, skip + take);
});

dataTable.addEventListener('forge-data-table-sort', console.log);
dataTable.addEventListener('forge-data-table-filter', console.log);
dataTable.addEventListener('forge-data-table-column-order', console.log);
dataTable.addEventListener('forge-data-table-row-click', console.log);
dataTable.addEventListener('forge-data-table-column-visibility', console.log);

const groupedColumnsToggle = document.querySelector('#opt-grouped-columns') as ISwitchComponent;
groupedColumnsToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  dataTable.columns = selected ? groupedColumns : flatColumns;
});

const resizableToggle = document.querySelector('#opt-resizable') as ISwitchComponent;
resizableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.resizable = selected));

const reorderableToggle = document.querySelector('#opt-reorderable') as ISwitchComponent;
reorderableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.reorderable = selected));

const stripedToggle = document.querySelector('#opt-striped') as ISwitchComponent;
stripedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.striped = selected));

const hoverToggle = document.querySelector('#opt-hover') as ISwitchComponent;
hoverToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.hover = selected));

const compactToggle = document.querySelector('#opt-compact') as ISwitchComponent;
compactToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.compact = selected));

const borderedToggle = document.querySelector('#opt-bordered') as ISwitchComponent;
borderedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.bordered = selected));

const allowRowClickToggle = document.querySelector('#opt-allow-row-click') as ISwitchComponent;
allowRowClickToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.allowRowClick = selected));

const expandableToggle = document.querySelector('#opt-expandable') as ISwitchComponent;
expandableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.expandable = selected));

const customCellTemplateToggle = document.querySelector('#opt-custom-cell-template') as ISwitchComponent;
customCellTemplateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
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

const rowSelectionSelect = document.querySelector('#opt-row-selection') as ISelectComponent;
rowSelectionSelect.addEventListener('change', ({ detail }) => (dataTable.rowSelection = detail as RowSelectionType));

const sortableToggle = document.querySelector('#opt-sortable') as ISwitchComponent;
sortableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.sortable = selected));

const manualSortToggle = document.querySelector('#opt-manual-sort') as ISwitchComponent;
manualSortToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.manualSort = selected));

const multiSortToggle = document.querySelector('#opt-multi-sort') as ISwitchComponent;
multiSortToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.multiSort = selected));

const multiSortKeySelect = document.querySelector('#opt-multi-sort-key') as ISelectComponent;
multiSortKeySelect.addEventListener('change', ({ detail }) => (dataTable.multiSortKey = detail as 'shift' | 'ctrl' | 'meta' | 'alt'));

const maxMultiSortColCountSelect = document.querySelector('#opt-max-multi-sort-col-count') as ISelectComponent;
maxMultiSortColCountSelect.addEventListener('change', ({ detail }) => {
  dataTable.maxMultiSortColCount = detail === 'unlimited' ? undefined : parseInt(detail, 10);
});

const filterableToggle = document.querySelector('#opt-filterable') as ISwitchComponent;
filterableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.filterable = selected));

const manualFilterToggle = document.querySelector('#opt-manual-filter') as ISwitchComponent;
manualFilterToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (dataTable.manualFilter = selected));

const showFooterToggle = document.querySelector('#opt-show-footer') as ISwitchComponent;
showFooterToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
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

const hiddenColumnsSelect = document.querySelector('#opt-hidden-columns') as ISelectComponent;
hiddenColumnsSelect.addEventListener('change', ({ detail }) => {
  const hiddenColumns = new Set<string>(Array.isArray(detail) ? detail : []);
  flatColumns.forEach(({ property }) => {
    if (hiddenColumns.has(property as string)) {
      dataTable.hideColumn(property as string);
    } else {
      dataTable.showColumn(property as string);
    }
  });
});
