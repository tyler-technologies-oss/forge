import { Meta, Story } from '@storybook/react';
import { ITableProps, argTypes } from './table-args';
import { CellAlign, IColumnConfiguration, ITableComponent, ITableFilterEventData, ITableRowClickEventData, ITableSortEventData, TextFieldComponentDelegate } from '@tylertech/forge';
import { ForgeTable, useForgeToast } from '@tylertech/forge-react';
import React, { CSSProperties, useRef, useState } from 'react';

const MDX = require('./table.mdx').default;

export default {
  title: 'Components/Table',
  argTypes,
  parameters: {
    docs: {
      page: MDX
    }
  }
} as Meta;

const people = [
  { id: 1, name: 'First1 Last1', description: 'Test description 1', age: '25' },
  { id: 2, name: 'First2 Last2', description: 'Test description 2', age: '26' },
  { id: 3, name: 'First3 Last3', description: 'Test description 3', age: '27' },
  { id: 4, name: 'First4 Last4', description: 'Test description 4', age: '28' },
  { id: 5, name: 'First5 Last5', description: 'Test description 5', age: '29' },
  { id: 6, name: 'First6 Last6', description: 'Test description 6', age: '30' },
  { id: 7, name: 'First7 Last7', description: 'Test description 7', age: '31' },
  { id: 8, name: 'First8 Last8', description: 'Test description 8', age: '32' },
  { id: 9, name: 'First9 Last9', description: 'Test description 9', age: '33' },
  { id: 10, name: 'First10 Last10', description: 'Test description 10', age: '34' }
];

const columnConfigurations: IColumnConfiguration[] = [
  {
    property: 'name',
    header: 'Name',
    sortable: true,
    initialSort: true,
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter name...' } })
  },
  {
    property: 'description',
    header: 'Description',
    sortable: true,
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter description...' } })
  },
  {
    property: 'age',
    header: 'Age',
    sortable: true,
    align: CellAlign.Right,
    filter: true,
    filterDelegate: new TextFieldComponentDelegate({ options: { placeholder: 'Filter age...', type: 'number' } })
  }
];

export const Default: Story<ITableProps> = ({
  select = false,
  multiselect = true,
  dense = false,
  roomy = false,
  filter = false,
  fixedHeaders = false,
  layoutType = 'auto',
  wrapContent = true,
  resizable = false,
  minResizeWidth = 100,
  allowRowClick = false,
  multiColumnSort = false
}) => {
  const [sortDirection, setSortDirection] = useState('DESC');
  const [sortPropertyName, setSortPropertyName] = useState('id');
  const [displayData, setData] = useState([...people]);
  const [showToast] = useForgeToast();
  const filters = { name: '', description: '', age: '' };

  const styles: CSSProperties = {};

  if (fixedHeaders) {
    styles.maxHeight = '300px';
    styles.overflow = 'auto';
  }


  function onFilter(evt: CustomEvent<ITableFilterEventData>): void {
    // Update our filters state
    switch (evt.detail.columnIndex) {
      case 0:
        filters.name = evt.detail.value || '';
        break;
      case 1:
        filters.description = evt.detail.value || '';
        break;
      case 2:
        filters.age = evt.detail.value || ''
        break;
    }

    // If we have any filters applied, then update our data
    if (filters.name.length ||filters.description.length || filters.age.length) {
      setData(people.filter(p => {
        if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) {
          return false;
        }
        if (filters.description && !p.description.toString().includes(filters.description)) {
          return false;
        }
        if (filters.age && !p.age.toLowerCase().includes(filters.age.toLowerCase())) {
          return false;
        }
        return true;
      }));
    } else {
      setData([...people]);
    }
  }

  function onSort(evt: CustomEvent<ITableSortEventData>): void {
    if (Array.isArray(evt.detail)) {
      setData(sortMultiColumnData(evt.detail));
      return;
    }

    setSortDirection(evt.detail.direction);
    setSortPropertyName(columnConfigurations[evt.detail.columnIndex].property as string);
    setData(sortData());
  }

  function sortData() {
    if (sortPropertyName.length) {
      return [...displayData].sort(function (a, b) {
        if (sortDirection === 'DESC') {
          return b[sortPropertyName].toString().localeCompare(a[sortPropertyName]);
        } else if (sortDirection === 'ASC') {
          return a[sortPropertyName].toString().localeCompare(b[sortPropertyName]);
        } else {
          return 0;
        }
      });
    } else {
      return [...displayData];
    }
  }

  function sortMultiColumnData(columns) {
    if (columns.length) {
      return [...displayData].sort(function (a, b) {
        let i = 0, result = 0;
        columns = columns.sort(function (a, b) { a.sortOrder - b.sortOrder });
        while (i < columns.length && result === 0) {
          result = (columns[i].direction === 'ASC' ? -1 : 1) * (a[columns[i].propertyName].toString() < b[columns[i].propertyName].toString() ? -1 : (a[columns[i].propertyName].toString() > b[columns[i].propertyName].toString() ? 1 : 0));
          i++;
        }
        return result;
      });
    } else {
      return [...displayData];
    }
  }

  function onRowClick(evt: CustomEvent<ITableRowClickEventData>): void {
    showToast({ message: `Clicked row index ${evt.detail.index}` });
  }

  return <ForgeTable
            select={select}
            multiselect={multiselect}
            dense={dense}
            roomy={roomy}
            filter={filter}
            fixedHeaders={fixedHeaders}
            layoutType={layoutType}
            wrapContent={wrapContent}
            resizable={resizable}
            minResizeWidth={minResizeWidth}
            allowRowClick={allowRowClick}
            multiColumnSort={multiColumnSort}
            select-key="id"
            data={displayData}
            columnConfigurations={columnConfigurations}
            on-forge-table-row-click={onRowClick}
            on-forge-table-sort={onSort}
            on-forge-table-filter={onFilter}
            style={styles}/>;
};
Default.args = {
  select: false,
  multiselect: true,
  dense: false,
  roomy: false,
  filter: false,
  fixedHeaders: false,
  layoutType: 'auto',
  wrapContent: true,
  resizable: false,
  minResizeWidth: 100,
  allowRowClick: false,
  multiColumnSort: false
} as ITableProps;
