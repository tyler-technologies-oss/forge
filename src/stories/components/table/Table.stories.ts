import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { SortDirection, type IColumnConfiguration, type ITableComponent, type ITableSortEventData } from '@tylertech/forge/table';
import { TextFieldComponentDelegate } from '@tylertech/forge/text-field';

import '@tylertech/forge/table';
import '@tylertech/forge/text-field';
import { html } from 'lit';

const component = 'forge-table';

const rowClickAction = action('forge-table-row-click');
const filterAction = action('forge-table-filter');
const sortAction = action('forge-table-sort');
const selectAction = action('forge-table-select');
const selectDoubleAction = action('forge-table-select-double');
const initializedAction = action('forge-table-initialized');
const columnResizeAction = action('forge-table-column-resize');

const DATA = [
  { id: 0, firstName: 'Alice', lastName: 'Smith', age: 25 },
  { id: 1, firstName: 'Bob', lastName: 'Johnson', age: 35 },
  { id: 2, firstName: 'Charlie', lastName: 'Brown', age: 45 },
  { id: 3, firstName: 'David', lastName: 'Miller', age: 55 },
  { id: 4, firstName: 'Eve', lastName: 'Williams', age: 65 }
];

const COLUMNS: IColumnConfiguration[] = [
  {
    header: 'First Name',
    property: 'firstName',
    sortable: true,
    initialSort: true,
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: 'Filter first name...' }, props: { showClear: true } })
  },
  {
    header: 'Last Name',
    property: 'lastName',
    sortable: true,
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: 'Filter last name...' }, props: { showClear: true } })
  },
  {
    header: 'Age',
    property: 'age',
    sortable: true,
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: 'Filter age...' }, props: { showClear: true } })
  }
];

const TABLE_FILTER_VALUES = { firstName: '', lastName: '', age: '' };

const meta = {
  title: 'Components/Table',
  render: args => {
    const tableEl = customElementStoryRenderer(component, args);

    tableEl.selectKey = 'id';
    tableEl.addEventListener('forge-table-row-click', rowClickAction);
    tableEl.addEventListener('forge-table-select', selectAction);
    tableEl.addEventListener('forge-table-select-double', selectDoubleAction);
    tableEl.addEventListener('forge-table-initialized', initializedAction);
    tableEl.addEventListener('forge-table-column-resize', columnResizeAction);

    tableEl.addEventListener('forge-table-filter', evt => {
      filterAction(evt);

      const filter = evt.detail.value;
      const columnIndex = evt.detail.columnIndex;

      TABLE_FILTER_VALUES[COLUMNS[columnIndex].property as string] = filter;

      tableEl.data = DATA.filter(row => {
        return Object.keys(TABLE_FILTER_VALUES).every(key => {
          if (TABLE_FILTER_VALUES[key] === '') {
            return true;
          }
          return row[key].toString().toLowerCase().includes(TABLE_FILTER_VALUES[key].toLowerCase());
        });
      });
    });

    tableEl.addEventListener('forge-table-sort', (evt: CustomEvent<ITableSortEventData>) => {
      sortAction(evt);

      const direction = evt.detail.direction;
      const columnIndex = evt.detail.columnIndex;

      tableEl.data = DATA.sort((a, b) => {
        const aVal = a[COLUMNS[columnIndex].property as string];
        const bVal = b[COLUMNS[columnIndex].property as string];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return direction === SortDirection.Ascending ? aVal - bVal : bVal - aVal;
        }

        return direction === SortDirection.Ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
    });

    return tableEl;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['selectKey', 'rowCreated', 'cellCreated', 'selectAllTemplate'],
      controls: {
        columnConfigurations: { control: { type: 'object' } },
        data: { control: { type: 'object' } },
        multiselect: { if: { arg: 'select', eq: true } }
      }
    })
  },
  args: {
    data: DATA,
    columnConfigurations: COLUMNS,
    select: true,
    multiselect: true,
    tooltipSelect: 'Select row',
    tooltipSelectAll: 'Select all rows',
    dense: false,
    roomy: false,
    filter: false,
    fixedHeaders: false,
    layoutType: 'auto',
    wrapContent: true,
    resizable: false,
    minResizeWidth: 100,
    allowRowClick: false,
    multiColumnSort: false,
    selectCheckboxAlignment: 'center'
  }
} satisfies Meta<ITableComponent>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  parameters: {
    docs: {
      source: {
        code: `<forge-table></forge-table>`
      }
    }
  }
};

export const CSSOnly: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <table class="forge-data-table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Col 1</td>
            <td>Row 1, Col 2</td>
            <td>Row 1, Col 3</td>
            <td>Row 1, Col 4</td>
          </tr>
          <tr>
            <td>Row 2, Col 1</td>
            <td>Row 2, Col 2</td>
            <td>Row 2, Col 3</td>
            <td>Row 2, Col 4</td>
          </tr>
          <tr>
            <td>Row 3, Col 1</td>
            <td>Row 3, Col 2</td>
            <td>Row 3, Col 3</td>
            <td>Row 3, Col 4</td>
          </tr>
        </tbody>
      </table>
    `;
  }
};
