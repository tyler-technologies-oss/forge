import '$src/shared';
import '@tylertech/forge/table';
import '@tylertech/forge/table/forge-table.scss';
import './table.scss';
import { TextFieldComponentDelegate } from '@tylertech/forge/text-field';
import { PositionPlacement } from '@tylertech/forge-core';
import { tylIconChevronRight, tylIconDelete, tylIconEdit, tylIconMoreVert } from '@tylertech/tyler-icons/standard';
import { ITableComponent, IColumnConfiguration, SortDirection, ISortedColumn, CellAlign, ITableTemplateBuilderResult, ITableSortMultipleEventData } from '@tylertech/forge/table';
import { ButtonComponentDelegate } from '@tylertech/forge/button';
import { IconRegistry } from '@tylertech/forge/icon';
import { SelectComponentDelegate, ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

IconRegistry.define([
  tylIconMoreVert,
  tylIconChevronRight,
  tylIconDelete,
  tylIconEdit
]);

const table = document.getElementById('demo-table') as ITableComponent;
const tableScrollContainer = document.querySelector('#table-scroll-container') as HTMLElement;

interface IData {
  id: number;
  name: string;
  age: number;
  position: string;
}

const data: IData[] = [
  { id: 1, name: 'Tom Brady', age: 1, position: 'QB' },
  { id: 3, name: 'Rob Gronkowski', age: 1, position: 'TE' },
  { id: 2, name: 'Julian Edelman', age: 1, position: 'WR' },
  { id: 4, name: 'Stephon Gilmore', age: 2, position: 'CB' },
  { id: 5, name: 'James White', age: 2, position: 'RB' }
];

let displayData = window.structuredClone(data) as IData[];

const positionOptions = [
  { label: '', value: '' },
  { label: 'QB', value: 'QB' },
  { label: 'WR', value: 'WR' },
  { label: 'TE', value: 'TE' },
  { label: 'RB', value: 'RB' },
  { label: 'OT', value: 'OT' },
  { label: 'DE', value: 'DE' },
  { label: 'CB', value: 'CB' }
];

const columnConfigurations: IColumnConfiguration[] = [
  {
    header: 'Player name',
    property: 'name',
    template: (_index, _parent, { name }, _colIndex) => name,
    sortable: true,
    initialSort: { direction: SortDirection.Descending, sortOrder: 1 } as ISortedColumn,
    headerTemplate: () => Promise.resolve('<span>Player names</span>'),
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: 'Filter name...' }})
  },
  {
    header: 'Age',
    property: 'age',
    align: CellAlign.Right,
    sortable: true,
    initialSort: true,
    sortDirection: SortDirection.Descending,
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter age...' }})
  },
  {
    header: 'Position',
    property: 'position',
    resizable: false,
    sortable: true,
    preventUnsort: true,
    filter: true,
    filterDebounceTime: 0,
    filterDelegate: new SelectComponentDelegate({ props: { options: positionOptions, placeholder: 'Filter position...' }})
  },
  { template: getMenuColumnTemplate, resizable: false, align: CellAlign.Center, headerCellStyle: { width: '50px' }, stopCellTemplateClickPropagation: true },
  {
    filter: true,
    filterDelegate: new ButtonComponentDelegate({ options: { text: 'Clear filters '} }),
    template: getExpandRowColumnTemplate, resizable: false, align: CellAlign.Center, headerCellStyle: { width: '50px' }
  }
];

let sortDirection = 'DESC';
let sortPropertyName = 'age';
const tableFilter = { name: '', age: null, position: '' } as Pick<IData, 'name' | 'age' | 'position'>;

table.selectKey = 'id';
table.select = true;
table.data = displayData;
table.columnConfigurations = columnConfigurations;

table.rowCreated = (rowElement, rowIndex, _rowData) => {
  rowElement.id = `custom-row-id-${rowIndex}`;
};
table.cellCreated = (cellElement, rowIndex, columnIndex) => {
  cellElement.id = `custom-cell-id-${rowIndex}-${columnIndex}`;
};

const selectToggle = document.querySelector('#opt-select') as ISwitchComponent;
selectToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.select = selected;
});

const multiselectToggle = document.querySelector('#opt-multiselect') as ISwitchComponent;
multiselectToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.multiselect = selected;
});

const tooltipSelectAllToggle = document.querySelector('#opt-tooltip-select-all') as ISwitchComponent;
tooltipSelectAllToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.tooltipSelectAll = selected ? 'Select all' : undefined;
});

const tooltipSelectToggle = document.querySelector('#opt-tooltip-select') as ISwitchComponent;
tooltipSelectToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.tooltipSelect = selected ? 'Select' : undefined;
});

const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.dense = selected;
});

const roomyToggle = document.querySelector('#opt-roomy') as ISwitchComponent;
roomyToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.roomy = selected;
});

const filterToggle = document.querySelector('#opt-filter') as ISwitchComponent;
filterToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.filter = selected;
});

const wrapContentToggle = document.querySelector('#opt-wrap-content') as ISwitchComponent;
wrapContentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.wrapContent = selected;
});

const fixedHeadersToggle = document.querySelector('#opt-fixed-headers') as ISwitchComponent;
fixedHeadersToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.fixedHeaders = selected;

  if (selected) {
    tableScrollContainer.style.height = '200px';
    tableScrollContainer.style.overflow = 'auto';
  } else {
    tableScrollContainer.style.removeProperty('height');
    tableScrollContainer.style.removeProperty('overflow');
  }
});

const resizableToggle = document.querySelector('#opt-resizable') as ISwitchComponent;
resizableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.resizable = selected;
});

const allowRowClickToggle = document.querySelector('#opt-allow-row-click') as ISwitchComponent;
allowRowClickToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.allowRowClick = selected;
});

const multiColumnSortToggle = document.querySelector('#opt-multi-column-sort') as ISwitchComponent;
multiColumnSortToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  table.multiColumnSort = selected;
});

const customSelectAllToggle = document.querySelector('#opt-custom-select-all') as ISwitchComponent;
customSelectAllToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    table.selectAllTemplate = getSelectAllTemplate;
    selectAlignmentSelect.style.display = '';
  }
  else {
    table.selectAllTemplate = null;
    selectAlignmentSelect.style.display = 'none';
  }
});

const layoutTypeSelect = document.querySelector('#opt-layout-type') as ISelectComponent;
layoutTypeSelect.addEventListener('change', ({ detail }) => {
  table.layoutType = detail;
});

const selectAlignmentSelect = document.querySelector('#opt-select-alignment') as ISelectComponent;
selectAlignmentSelect.addEventListener('change', ({ detail }) => {
  table.selectCheckboxAlignment = detail;
});

// Event listeners
table.addEventListener('forge-table-sort', ({ detail }) => {
  console.log('[table] forge-table-sort:', detail);
  if (Array.isArray(detail)) {
    table.data = sortMultiColumnData(detail);
    return;
  }

  sortDirection = detail.direction;
  sortPropertyName = columnConfigurations[detail.columnIndex].property;
  table.data = sortData();
});
table.addEventListener('forge-table-column-resize', ({ detail }) => {
  console.log('[table] forge-table-column-resize:', detail);
});

table.addEventListener('forge-table-select', ({ detail }) => {
  console.log('[table] forge-table-select:', detail);
});

table.addEventListener('forge-table-select-double', ({ detail }) => {
  console.log('[table] forge-table-select-double:', detail);
  alert('forge-select-double event: ' + detail.index);
});

table.addEventListener('forge-table-row-click', ({ detail }) => {
  console.log('[table] forge-table-row-click:', detail);
});

table.addEventListener('forge-table-select-all', ({ detail }) => {
  console.log('[table] forge-table-select-all:', detail);
});

table.addEventListener('forge-table-filter', ({ detail }) => {
  console.log('[table] forge-table-filter:', detail);

  displayData = window.structuredClone(data) as IData[];
  switch (detail.columnIndex) {
    case 0:
      if (detail.value.length === 0) {
        tableFilter.name = '';
      } else {
        tableFilter.name = detail.value;
      }
      break;
    case 1:
      if (detail.value.length === 0) {
        tableFilter.age = null;
      } else {
        tableFilter.age = detail.value;
      }
      break;
    case 2:
      if (detail.value.length === 0) {
        tableFilter.position = '';
      } else {
        tableFilter.position = detail.value;
      }
      break;
  }

  if (tableFilter.name.length || tableFilter.age != null || tableFilter.position.length) {
    displayData = data.filter(({ name, position, age }) => {
      if (tableFilter.name.length && name.toLowerCase().indexOf(tableFilter.name.toLowerCase()) === -1) {
        return false;
      }

      if (tableFilter.age != null && age.toString().indexOf(String(tableFilter.age)) === -1) {
        return false;
      }

      if (tableFilter.position.length && position.toLowerCase().indexOf(tableFilter.position.toLowerCase()) === -1) {
        return false;
      }

      return true;
    });
  } else {
    displayData = [].concat(data);
  }

  table.data = sortData();
});

function getMenuColumnTemplate(rowIndex: number): HTMLElement {
  const button = document.createElement('forge-icon-button');
  button.type = 'button';
  button.setAttribute('aria-label', `Menu for row ${rowIndex}`);

  const icon = document.createElement('forge-icon');
  icon.name = 'more_vert';
  button.appendChild(icon);

  const menu = document.createElement('forge-menu');
  menu.placement = 'bottom-right' as PositionPlacement;
  menu.options = [
    { value: 'delete', label: 'Delete', leadingIcon: 'delete', leadingIconType: 'component' },
    { value: 'edit', label: 'Edit', leadingIcon: 'edit', leadingIconType: 'component' }
  ];
  menu.addEventListener('forge-menu-select', ({ detail }) => {
    console.log('forge-menu-select', rowIndex, detail);
    if (detail.value === 'delete') {
      data.splice(rowIndex, 1);
      table.data = data;
    }
  });
  menu.appendChild(button);

  return menu;
}

function getExpandRowColumnTemplate(rowIndex: number): ITableTemplateBuilderResult {
  const button = document.createElement('forge-icon-button');
  button.type = 'button';
  button.setAttribute('aria-label', `Expand row ${rowIndex}`);

  const icon = document.createElement('forge-icon');
  icon.name = 'chevron_right';
  button.appendChild(icon);

  button.addEventListener('click', () => {
    if (table.isRowExpanded(rowIndex)) {
      table.collapseRow(rowIndex);
    } else {
      table.expandRow(rowIndex, buildRowTemplate(rowIndex));
    }
  });

  return {
    content: button,
    stopClickPropagation: true
  };
}

function buildRowTemplate(rowIndex: number): HTMLElement {
  const div = document.createElement('div');
  div.classList.add('forge-table-expandable-row');
  div.textContent = `Expanded row: ${rowIndex}`;
  return div;
}

function sortData(): IData[] {
  if (sortPropertyName.length) {
    return [...displayData].sort((a, b) => {
      if (sortDirection === 'DESC') {
        return b[sortPropertyName].toString().localeCompare(a[sortPropertyName]);
      } else if (sortDirection === 'ASC') {
        return a[sortPropertyName].toString().localeCompare(b[sortPropertyName]);
      } else {
        return 0;
      }
    });
  } else {
    return displayData;
  }
}

function sortMultiColumnData(columns: ITableSortMultipleEventData): IData[] {
  if (columns.length) {
    return [...displayData].sort((a, b) => {
      let i = 0;
      let result = 0;
      columns = columns.sort((columnA, columnB) => columnA.sortOrder - columnB.sortOrder);
      while (i < columns.length && result === 0) {
        const { direction, propertyName } = columns[i];
        const sortDir = direction === 'ASC' ? -1 : 1;
        const propertyCompare = a[propertyName].toString() < b[propertyName].toString();
        result = sortDir * (propertyCompare ? -1 : a[propertyName].toString() > b[propertyName].toString() ? 1 : 0);
        i++;
      }
      return result;
    });
  }

  return displayData;
}

function getSelectAllTemplate(): string {
  return `
    <div style="display: flex; flex-direction: row; align-items: center;">
      <forge-checkbox>
        <input type="checkbox" />
      </forge-checkbox>
      <forge-button>Custom</forge-button>
    </div>
  `;
}
