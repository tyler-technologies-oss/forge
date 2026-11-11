import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { CurrencyFormatter, DataSource, DateFormatter, NumberFormatter } from '@tylertech/forge-core';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconBlock, tylIconCheckCircle, tylIconDelete, tylIconEdit, tylIconEmail, tylIconPauseCircle, tylIconVisibility } from '@tylertech/tyler-icons';
import { actionCell, badgeCell, linkCell, meterCell, ratingCell, type ColumnDef, type DataTableElement } from '@tylertech/forge-table';
import { employeeData, generateLargeDataset, sampleData, sampleColumns, sampleDataColumns, type EmployeeData, type EmployeeStatus } from './sample-data.js';

import '@tylertech/forge/button';
import '@tylertech/forge-table';

IconRegistry.define([tylIconBlock, tylIconCheckCircle, tylIconDelete, tylIconEdit, tylIconEmail, tylIconPauseCircle, tylIconVisibility]);

const component = 'forge-data-table';

const largeDataset = generateLargeDataset();

const sortAction = action('forge-data-table-sort');
const filterAction = action('forge-data-table-filter');
const rowSelectAction = action('forge-data-table-row-select');
const cellSelectAction = action('forge-data-table-cell-select');
const rowClickAction = action('forge-data-table-row-click');
const columnOrderAction = action('forge-data-table-column-order');
const columnVisibilityAction = action('forge-data-table-column-visibility');
const columnRenameAction = action('forge-data-table-column-rename');

const actionCellClickAction = action('action-cell-click');

const TOOLBAR_FEATURES = ['columns', 'export', 'filter', 'print', 'select'];

let tableCount = 0;

const meta = {
  title: 'Components/Data Table',
  component,
  render: args => {
    const dataTableRef = createRef<DataTableElement>();
    const tableId = `data-table-${tableCount++}`;

    return html`
      <div class="forge-data-table-container">
        ${args.toolbar
          ? html`
              <forge-data-table-toolbar table=${tableId} features=${args.toolbarFeatures.join(',')}>
                <span slot="title">Users</span>
              </forge-data-table-toolbar>
            `
          : nothing}
        <forge-data-table
          ${ref(dataTableRef)}
          id=${tableId}
          .dataSource=${new DataSource(() => args.data)}
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
          ?cell-selection=${args.cellSelection}
          ?allow-row-click=${args.allowRowClick}
          ?manual-sort=${args.manualSort}
          ?manual-filter=${args.manualFilter}
          @forge-data-table-sort=${sortAction}
          @forge-data-table-filter=${filterAction}
          @forge-data-table-row-select=${rowSelectAction}
          @forge-data-table-cell-select=${cellSelectAction}
          @forge-data-table-row-click=${rowClickAction}
          @forge-data-table-column-order=${columnOrderAction}
          @forge-data-table-column-visibility=${columnVisibilityAction}
          @forge-data-table-column-rename=${columnRenameAction}>
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
    cellSelection: { control: 'boolean' },
    allowRowClick: { control: 'boolean' },
    manualSort: { control: 'boolean' },
    manualFilter: { control: 'boolean' },
    toolbar: { control: 'boolean' },
    toolbarFeatures: { control: 'multi-select', options: TOOLBAR_FEATURES, if: { arg: 'toolbar' } }
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
    cellSelection: false,
    allowRowClick: false,
    manualSort: false,
    manualFilter: false,
    toolbar: false,
    toolbarFeatures: TOOLBAR_FEATURES
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

// Story with the table toolbar
export const Toolbar: Story = {
  args: {
    toolbar: true,
    sortable: true
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

// Story with cell selection
export const CellSelection: Story = {
  args: {
    cellSelection: true
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
    columns: sampleDataColumns,
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
        .dataSource=${new DataSource(() => args.data)}
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

type CellStoryOptions = Pick<Story, 'args'> & { code: string; description?: string };

const exampleStory = ({ args, code, description }: CellStoryOptions): Story => ({
  args: { data: employeeData, ...args },
  argTypes: { data: { control: false }, columns: { control: false } },
  parameters: {
    docs: {
      description: { story: description },
      source: { code, language: 'ts' }
    }
  }
});

const STATUS_BADGES: Record<EmployeeStatus, { text: string; icon: string; theme: 'success' | 'warning' | 'danger' }> = {
  Active: { text: 'Active', icon: 'check_circle', theme: 'success' },
  'On leave': { text: 'On leave', icon: 'pause_circle', theme: 'warning' },
  Terminated: { text: 'Terminated', icon: 'block', theme: 'danger' }
};

const employeeColumn = <K extends keyof EmployeeData>(property: K, header: string, rest: Partial<ColumnDef<EmployeeData>> = {}): ColumnDef<EmployeeData> => ({
  header,
  property,
  ...rest
});

// Cell templates

export const BadgeCell: Story = exampleStory({
  description:
    'Use `badgeCell()` to render the value as a `forge-badge`. Pass `badges` to return a config (or an array of them) with `text`, `theme`, `icon` and `strong` for each cell.',
  args: {
    columns: [
      employeeColumn('name', 'Name'),
      employeeColumn('department', 'Department', { template: badgeCell() }),
      employeeColumn('status', 'Status', {
        template: badgeCell({ badges: ({ cell }) => STATUS_BADGES[cell.getValue() as EmployeeStatus] })
      }),
      employeeColumn('rating', 'Highlights', {
        id: 'highlights',
        template: badgeCell({
          badges: ({ cell }) => {
            const { rating, utilization } = cell.row.original as EmployeeData;
            return [
              ...(rating >= 4.5 ? [{ text: 'Top rated', theme: 'primary' as const, strong: true }] : []),
              ...(utilization >= 85 ? [{ text: 'High utilization', theme: 'tertiary' as const }] : [])
            ];
          }
        })
      })
    ]
  },
  code: `import { badgeCell } from '@tylertech/forge-table';

const columns: ColumnDef<Employee>[] = [
  { header: 'Department', property: 'department', template: badgeCell() },
  {
    header: 'Status',
    property: 'status',
    template: badgeCell({
      badges: ({ cell }) => {
        switch (cell.getValue()) {
          case 'Active':
            return { text: 'Active', icon: 'check_circle', theme: 'success' };
          case 'On leave':
            return { text: 'On leave', icon: 'pause_circle', theme: 'warning' };
          default:
            return { text: 'Terminated', icon: 'block', theme: 'danger' };
        }
      }
    })
  },
  {
    header: 'Highlights',
    property: 'rating',
    template: badgeCell({
      // Return an array to render several badges in one cell
      badges: ({ cell }) => {
        const { rating, utilization } = cell.row.original;
        return [
          ...(rating >= 4.5 ? [{ text: 'Top rated', theme: 'primary', strong: true }] : []),
          ...(utilization >= 85 ? [{ text: 'High utilization', theme: 'tertiary' }] : [])
        ];
      }
    })
  }
];`
});

export const LinkCell: Story = exampleStory({
  description:
    'Use `linkCell()` to render the value as an anchor. The `type` option adds the `mailto:` or `tel:` prefix, and `text` replaces the visible text with a string or a function of the value.',
  args: {
    columns: [
      employeeColumn('name', 'Name'),
      employeeColumn('email', 'Email', { width: 256, template: linkCell({ type: 'email' }) }),
      employeeColumn('phone', 'Phone', { template: linkCell({ type: 'phone' }) }),
      employeeColumn('website', 'Website', {
        width: 256,
        template: linkCell({ text: value => value.replace(/^https?:\/\//, ''), target: '_blank', rel: 'noopener noreferrer' })
      })
    ]
  },
  code: `import { linkCell } from '@tylertech/forge-table';

const columns: ColumnDef<Employee>[] = [
  { header: 'Email', property: 'email', template: linkCell({ type: 'email' }) },
  { header: 'Phone', property: 'phone', template: linkCell({ type: 'phone' }) },
  {
    header: 'Website',
    property: 'website',
    template: linkCell({
      text: value => value.replace(/^https?:\\/\\//, ''),
      target: '_blank',
      rel: 'noopener noreferrer'
    })
  }
];`
});

export const MeterCell: Story = exampleStory({
  description:
    'Use `meterCell()` to render the value as a small `forge-meter` with a tooltip. It accepts the meter `min`, `max`, `low`, `high`, `optimum`, `valueMode` and styling properties.',
  args: {
    columns: [
      employeeColumn('name', 'Name'),
      employeeColumn('utilization', 'Utilization', {
        width: 160,
        template: meterCell({ min: 0, max: 100, low: 40, high: 75, optimum: 100, valueMode: 'percentage' })
      }),
      employeeColumn('salary', 'Salary', { width: 160, template: meterCell({ min: 0, max: 160000 }) })
    ]
  },
  code: `import { meterCell } from '@tylertech/forge-table';

const columns: ColumnDef<Employee>[] = [
  {
    header: 'Utilization',
    property: 'utilization',
    template: meterCell({ min: 0, max: 100, low: 40, high: 75, optimum: 100, valueMode: 'percentage' })
  },
  { header: 'Salary', property: 'salary', template: meterCell({ min: 0, max: 160000 }) }
];`
});

export const RatingCell: Story = exampleStory({
  description:
    'Use `ratingCell()` to map the value from the `min`/`max` range onto a row of `steps` stars. In-between values partially fill a star, and a tooltip shows the value.',
  args: {
    columns: [
      employeeColumn('name', 'Name'),
      employeeColumn('rating', 'Rating', { template: ratingCell({ min: 0, max: 5, steps: 5 }) }),
      employeeColumn('utilization', 'Utilization', { template: ratingCell({ min: 0, max: 100, steps: 10 }) })
    ]
  },
  code: `import { ratingCell } from '@tylertech/forge-table';

const columns: ColumnDef<Employee>[] = [
  { header: 'Rating', property: 'rating', template: ratingCell({ min: 0, max: 5, steps: 5 }) },
  { header: 'Utilization', property: 'utilization', template: ratingCell({ min: 0, max: 100, steps: 10 }) }
];`
});

export const ActionCell: Story = exampleStory({
  description:
    'Use `actionCell()` to render buttons in a cell. Each config is an icon button (with a tooltip) by default, or a text button when `type` is `button`. `text` can be a function of the row, and `onClick` receives the TanStack row.',
  args: {
    columns: [
      employeeColumn('name', 'Name'),
      employeeColumn('department', 'Department'),
      {
        id: 'actions',
        header: 'Actions',
        width: 200,
        align: 'end',
        template: actionCell([
          { text: row => `View ${row.original.name}`, icon: 'visibility', onClick: row => actionCellClickAction('view', row.original) },
          { text: row => `Email ${row.original.name}`, icon: 'email', onClick: row => actionCellClickAction('email', row.original) },
          { text: 'Edit', icon: 'edit', type: 'button', onClick: row => actionCellClickAction('edit', row.original) }
        ])
      }
    ]
  },
  code: `import { actionCell } from '@tylertech/forge-table';

const columns: ColumnDef<Employee>[] = [
  {
    id: 'actions',
    header: 'Actions',
    align: 'end',
    template: actionCell([
      // Icon buttons use \`text\` as their tooltip and accessible label
      { text: row => \`View \${row.original.name}\`, icon: 'visibility', onClick: row => view(row.original) },
      { text: row => \`Email \${row.original.name}\`, icon: 'email', onClick: row => email(row.original) },
      // Text buttons use \`text\` as their label
      { text: 'Edit', icon: 'edit', type: 'button', onClick: row => edit(row.original) }
    ])
  }
];`
});

export const EditableCell: Story = exampleStory({
  description: 'Set `editable` on a column to render a text input that fills each cell. Editable cells are not selectable and do not trigger row clicks.',
  args: {
    columns: [employeeColumn('id', 'ID'), employeeColumn('name', 'Name', { editable: true }), employeeColumn('department', 'Department', { editable: true })]
  },
  code: `const columns: ColumnDef<Employee>[] = [
  { header: 'ID', property: 'id' },
  { header: 'Name', property: 'name', editable: true },
  { header: 'Department', property: 'department', editable: true }
];`
});

export const CustomTemplate: Story = exampleStory({
  description:
    'A `template` is a function that receives `row`, `column` and `cell` and returns a string or an element. Set `useTemplateSlot` to render the result in the light DOM of the table instead of its shadow DOM, which lets document styles reach it.',
  args: {
    columns: [
      employeeColumn('name', 'Name', {
        template: ({ cell }) => {
          const strong = document.createElement('strong');
          strong.textContent = String(cell.getValue());
          return strong;
        }
      }),
      employeeColumn('salary', 'Salary tier', {
        id: 'tier',
        template: ({ cell }) => ((cell.getValue() as number) >= 120000 ? 'Senior' : 'Standard')
      }),
      employeeColumn('department', 'Department', {
        useTemplateSlot: true,
        stopRowClickPropagation: true,
        template: ({ cell }) => {
          const button = document.createElement('forge-button');
          button.variant = 'outlined';
          button.textContent = String(cell.getValue());
          button.addEventListener('click', () => actionCellClickAction('department', cell.getValue()));
          return button;
        }
      })
    ]
  },
  code: `const columns: ColumnDef<Employee>[] = [
  {
    header: 'Name',
    property: 'name',
    template: ({ cell }) => {
      const strong = document.createElement('strong');
      strong.textContent = String(cell.getValue());
      return strong;
    }
  },
  {
    id: 'tier',
    header: 'Salary tier',
    property: 'salary',
    template: ({ cell }) => (cell.getValue() >= 120000 ? 'Senior' : 'Standard')
  },
  {
    // Rendered into the light DOM of the table
    header: 'Department',
    property: 'department',
    useTemplateSlot: true,
    stopRowClickPropagation: true,
    template: ({ cell }) => {
      const button = document.createElement('forge-button');
      button.variant = 'outlined';
      button.textContent = String(cell.getValue());
      return button;
    }
  }
];`
});

// Formatters

export const Formatters: Story = exampleStory({
  description:
    'Set `format` to a `NumberFormatter`, `CurrencyFormatter` or `DateFormatter` from `@tylertech/forge-core`, or to a function of the row. Columns that use a number or currency formatter are right-aligned unless `align` is set, and the formatted text is what the CSV export and print use.',
  args: {
    columns: [
      employeeColumn('name', 'Name', { format: row => `${row.name} (${row.department})`, width: 256 }),
      employeeColumn('salary', 'Salary', { format: new CurrencyFormatter() }),
      employeeColumn('salary', 'Salary (EUR)', { id: 'salary-eur', format: new CurrencyFormatter({ locale: 'de-DE', currency: 'EUR' }) }),
      employeeColumn('salary', 'Salary (compact)', { id: 'salary-compact', format: new NumberFormatter({ notation: 'compact', maximumFractionDigits: 1 }) }),
      employeeColumn('bonusRate', 'Bonus', { format: new NumberFormatter({ percentage: true, minimumFractionDigits: 1 }) }),
      employeeColumn('hireDate', 'Hire date', { format: new DateFormatter({ pattern: 'MMM d, yyyy', timeZone: 'UTC' }) })
    ]
  },
  code: `import { CurrencyFormatter, DateFormatter, NumberFormatter } from '@tylertech/forge-core';

const columns: ColumnDef<Employee>[] = [
  // A function receives the whole row
  { header: 'Name', property: 'name', format: row => \`\${row.name} (\${row.department})\` },
  { header: 'Salary', property: 'salary', format: new CurrencyFormatter() },
  {
    id: 'salary-eur',
    header: 'Salary (EUR)',
    property: 'salary',
    format: new CurrencyFormatter({ locale: 'de-DE', currency: 'EUR' })
  },
  {
    id: 'salary-compact',
    header: 'Salary (compact)',
    property: 'salary',
    format: new NumberFormatter({ notation: 'compact', maximumFractionDigits: 1 })
  },
  { header: 'Bonus', property: 'bonusRate', format: new NumberFormatter({ percentage: true, minimumFractionDigits: 1 }) },
  { header: 'Hire date', property: 'hireDate', format: new DateFormatter({ pattern: 'MMM d, yyyy', timeZone: 'UTC' }) }
];`
});

// Empty state

export const EmptyState: Story = exampleStory({
  description: 'A table without rows shows an empty state message.',
  args: {
    data: [],
    columns: [employeeColumn('name', 'Name'), employeeColumn('department', 'Department'), employeeColumn('status', 'Status')]
  },
  code: `const columns: ColumnDef<Employee>[] = [
  { header: 'Name', property: 'name' },
  { header: 'Department', property: 'department' },
  { header: 'Status', property: 'status' }
];

// A data source that returns no rows
table.dataSource = new DataSource(() => []);
table.columns = columns;`
});

export const EmptyStateFiltered: Story = {
  ...exampleStory({
    description:
      'When a filter removes every row, the empty state says so and offers a **Clear filters** button that restores the rows. This story types a filter that matches nothing.',
    args: {
      filterable: true,
      columns: [employeeColumn('name', 'Name'), employeeColumn('department', 'Department'), employeeColumn('status', 'Status')]
    },
    code: `const columns: ColumnDef<Employee>[] = [
  { header: 'Name', property: 'name' },
  { header: 'Department', property: 'department' },
  { header: 'Status', property: 'status' }
];

table.filterable = true;
table.columns = columns;`
  }),
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('forge-data-table');
    await table?.updateComplete;
    const input = table?.shadowRoot?.querySelector<HTMLInputElement>('.filter-container input');
    if (input) {
      input.value = 'no matching name';
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
  }
};

// Aggregation

export const Aggregation: Story = exampleStory({
  description:
    'Set `aggregate` on a column to show the result in the footer. These columns use the numeric aggregations: `sum`, `mean`, `median`, `min`, `max` and `extent`. Aggregates are calculated over the filtered rows, so filter the table to see them update. A column with a `Formatter` aggregates the raw value, then formats the result.',
  args: {
    filterable: true,
    columns: [
      employeeColumn('name', 'Name', { footer: 'Totals' }),
      employeeColumn('salary', 'Salary (sum)', { id: 'salary-sum', aggregate: 'sum', format: new CurrencyFormatter() }),
      employeeColumn('salary', 'Salary (mean)', { id: 'salary-mean', aggregate: 'mean', format: new CurrencyFormatter() }),
      employeeColumn('salary', 'Salary (median)', { id: 'salary-median', aggregate: 'median', format: new CurrencyFormatter() }),
      employeeColumn('rating', 'Rating (min)', { id: 'rating-min', aggregate: 'min' }),
      employeeColumn('rating', 'Rating (max)', { id: 'rating-max', aggregate: 'max' }),
      employeeColumn('utilization', 'Utilization (extent)', { aggregate: 'extent', format: new NumberFormatter({ maximumFractionDigits: 0 }) })
    ]
  },
  code: `import { CurrencyFormatter, NumberFormatter } from '@tylertech/forge-core';

const columns: ColumnDef<Employee>[] = [
  // A string footer is shown as-is
  { header: 'Name', property: 'name', footer: 'Totals' },
  { id: 'salary-sum', header: 'Salary (sum)', property: 'salary', aggregate: 'sum', format: new CurrencyFormatter() },
  { id: 'salary-mean', header: 'Salary (mean)', property: 'salary', aggregate: 'mean', format: new CurrencyFormatter() },
  { id: 'salary-median', header: 'Salary (median)', property: 'salary', aggregate: 'median', format: new CurrencyFormatter() },
  { id: 'rating-min', header: 'Rating (min)', property: 'rating', aggregate: 'min' },
  { id: 'rating-max', header: 'Rating (max)', property: 'rating', aggregate: 'max' },
  // \`extent\` shows the range from the lowest to the highest value
  { header: 'Utilization (extent)', property: 'utilization', aggregate: 'extent', format: new NumberFormatter({ maximumFractionDigits: 0 }) }
];`
});

// Column renaming

export const ColumnRenaming: Story = exampleStory({
  description:
    'Set `renamable` on a column to let users rename its header. Choose **Rename** from the column menu, or double-click the header text. Press Enter or move focus away to save, or Escape to cancel. Renames do not change the `columns` you provide, and the table fires `forge-data-table-column-rename` for each one.',
  args: {
    columns: [
      employeeColumn('id', 'ID'),
      employeeColumn('name', 'Name', { renamable: true }),
      employeeColumn('department', 'Department', { renamable: true }),
      employeeColumn('status', 'Status', { renamable: true }),
      employeeColumn('salary', 'Salary', { format: new CurrencyFormatter() })
    ]
  },
  code: `const columns: ColumnDef<Employee>[] = [
  { header: 'ID', property: 'id' },
  { header: 'Name', property: 'name', renamable: true },
  { header: 'Department', property: 'department', renamable: true },
  { header: 'Status', property: 'status', renamable: true },
  { header: 'Salary', property: 'salary' }
];

table.addEventListener('forge-data-table-column-rename', ({ detail }) => {
  console.log(detail.columnId, detail.header);
});`
});
