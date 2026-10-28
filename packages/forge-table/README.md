# Tyler Forge™ Table

A data table Web Component library for [Tyler Forge™](https://github.com/tyler-technologies-oss/forge), built on
[TanStack Table](https://tanstack.com/table) and [TanStack Virtual](https://tanstack.com/virtual).

## Installation

```bash
npm install @tylertech/forge-table
```

`@tylertech/forge` is a peer dependency and must be installed alongside this package.

## Usage

```ts
import '@tylertech/forge-table';
```

```html
<forge-data-table sortable resizable></forge-data-table>
```

```ts
import { DataSource } from '@tylertech/forge-core';
import type { ColumnDef, DataTableElement } from '@tylertech/forge-table';

const table = document.querySelector<DataTableElement<Person>>('forge-data-table')!;
const columns: ColumnDef<Person>[] = [
  { header: 'Name', property: 'name' },
  { header: 'Salary', property: 'salary', filterType: 'number', transform: row => `$${row.salary.toLocaleString()}` }
];

table.columns = columns;
table.dataSource = new DataSource<Person>((skip, take) => people.slice(skip, skip + take));
```

The table calls `fetch()` on the data source whenever `dataSource` is set and renders the rows it returns. The fetcher
may return the rows directly or a promise of them, so it can load from a server.

Column filtering renders `forge-select` and `forge-text-field`. Import the filter feature to register them when
`filterable` is set:

```ts
import '@tylertech/forge-table/data-table/features/filter';
```

Expandable rows use the exported `createExpanderColumn()` helper to add the toggle column.

## Development

```bash
pnpm dev     # serve a scratch page at localhost:3470
pnpm test    # run the suite in a real browser
pnpm build   # rollup ESM, custom elements manifest and types
```

`src/dev` is a page for looking at the table in a real browser. It is never published, and it imports the built `esm/`
output rather than source, so it exercises the same artifact a consumer gets.

## License

Apache-2.0
