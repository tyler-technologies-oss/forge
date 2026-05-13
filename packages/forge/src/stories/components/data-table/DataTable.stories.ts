import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import type { DataTableElement } from '@tylertech/forge/data-table';
import { generateLargeDataset, sampleData, sampleColumns } from './sample-data.js';

import '@tylertech/forge/data-table';

const component = 'forge-data-table';

const largeDataset = generateLargeDataset();

const sortAction = action('forge-data-table-sort');
const filterAction = action('forge-data-table-filter');
const rowSelectAction = action('forge-data-table-row-select');
const rowClickAction = action('forge-data-table-row-click');
const columnOrderAction = action('forge-data-table-column-order');
const columnVisibilityAction = action('forge-data-table-column-visibility');

const meta = {
  title: 'Components/Data Table',
  component,
  render: args => {
    const dataTableRef = createRef<DataTableElement>();

    return html`
      <div class="forge-data-table-container">
        <forge-data-table
          ${ref(dataTableRef)}
          .data=${args.data}
          .columns=${args.columns}
          ?sortable=${args.sortable}
          ?filterable=${args.filterable}
          ?resizable=${args.resizable}
          ?striped=${args.striped}
          ?hover=${args.hover}
          ?compact=${args.compact}
          ?bordered=${args.bordered}
          ?reorderable=${args.reorderable}
          ?expandable=${args.expandable}
          ?virtualized=${args.virtualized}
          ?fixed-headers=${args.fixedHeaders}
          row-selection=${args.rowSelection}
          ?allow-row-click=${args.allowRowClick}
          ?manual-sort=${args.manualSort}
          ?manual-filter=${args.manualFilter}
          @forge-data-table-sort=${sortAction}
          @forge-data-table-filter=${filterAction}
          @forge-data-table-row-select=${rowSelectAction}
          @forge-data-table-row-click=${rowClickAction}
          @forge-data-table-column-order=${columnOrderAction}
          @forge-data-table-column-visibility=${columnVisibilityAction}>
        </forge-data-table>
      </div>
    `;
  },
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    sortable: { control: 'boolean' },
    filterable: { control: 'boolean' },
    resizable: { control: 'boolean' },
    striped: { control: 'boolean' },
    hover: { control: 'boolean' },
    compact: { control: 'boolean' },
    bordered: { control: 'boolean' },
    reorderable: { control: 'boolean' },
    expandable: { control: 'boolean' },
    virtualized: { control: 'boolean' },
    fixedHeaders: { control: 'boolean' },
    rowSelection: {
      control: 'select',
      options: ['off', 'single', 'multiple']
    },
    allowRowClick: { control: 'boolean' },
    manualSort: { control: 'boolean' },
    manualFilter: { control: 'boolean' }
  },
  args: {
    data: sampleData,
    columns: sampleColumns,
    sortable: false,
    filterable: false,
    resizable: false,
    striped: false,
    hover: false,
    compact: false,
    bordered: false,
    reorderable: false,
    expandable: false,
    virtualized: false,
    fixedHeaders: false,
    rowSelection: 'off',
    allowRowClick: false,
    manualSort: false,
    manualFilter: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

// Basic story
export const Basic: Story = {
  args: {}
};

// Interactive story with all features enabled
export const Interactive: Story = {
  args: {
    sortable: true,
    filterable: true,
    resizable: true,
    striped: true,
    hover: true,
    reorderable: true,
    rowSelection: 'multiple',
    allowRowClick: true
  }
};

// Story with sorting enabled
export const Sortable: Story = {
  args: {
    sortable: true
  }
};

// Story with row selection
export const RowSelection: Story = {
  args: {
    rowSelection: 'multiple'
  }
};

// Story highlighting column visibility controls
export const ColumnVisibility: Story = {
  args: {
    columns: [
      { header: 'ID', property: 'id' },
      { header: 'Name', property: 'name', hidden: true },
      { header: 'Email', property: 'email' },
      { header: 'Status', property: 'status', hideable: false },
      { header: 'Created Date', property: 'createdAt' }
    ]
  }
};

// Story with compact and bordered styles
export const CompactAndBordered: Story = {
  args: {
    compact: true,
    bordered: true,
    striped: true
  }
};

// Story with expandable rows
export const ExpandableRows: Story = {
  args: {
    expandable: true
  }
};

// Story with virtualization
export const Virtualization: Story = {
  args: {
    data: largeDataset,
    virtualized: true
  },
  render: args => html`
    <div style="height: 400px;">
      <forge-data-table
        .data=${args.data}
        .columns=${args.columns}
        ?virtualized=${args.virtualized}
        ?sortable=${args.sortable}
        ?striped=${args.striped}
        ?hover=${args.hover}>
      </forge-data-table>
    </div>
  `
};

// Story with fixed headers
export const FixedHeaders: Story = {
  args: {
    fixedHeaders: true
  }
};
