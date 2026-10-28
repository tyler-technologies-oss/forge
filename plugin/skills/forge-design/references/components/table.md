# Table

Tables display sets of data in sortable, filterable, selectable rows and columns, configured through data and column definitions.

## Usage

`forge-table` renders rows and columns from two JS properties — `data` (an array of row objects) and `columnConfigurations` (column definitions) — rather than static HTML attributes, plus `select`/`multiselect`, `filter`, `dense`/`roomy`, `resizable`, and `fixedHeaders`. It's a basic data table, not a fully-featured grid — use it when content has three or more well-defined, sortable dimensions and users need to compare across rows. For content that's primarily scanned rather than compared, or that's mostly viewed on mobile, use a [list](./list.md) instead. And if you need virtual or infinite scrolling, or more advanced filtering than a single input per column, reach for a dedicated grid library like [AG Grid](https://www.ag-grid.com/) instead — `forge-table` intentionally stays basic.

## Rules

**Do**

- Order columns left to right by importance, so the most critical information needs the least scrolling.
- Use sentence case for column headers.
- Use the dense variant for data-dense applications where more rows need to fit on screen.
- Pair a table with a paginator when the data set is too large to show all at once.

**Don't**

- Don't use a table when users primarily scan and identify a single item — a list is simpler.
- Don't use a table as the primary view on mobile — it doesn't adapt well to narrow screens.
- Don't display more than two custom header actions inline — tuck the rest into an overflow menu.

## Basic usage

Set `data` and `columnConfigurations` as JS properties to populate the table — they can't be expressed as static HTML attributes, so explore the live behavior in the Storybook playground above. The markup below shows the table's underlying structure using the plain, CSS-only escape hatch instead of the full component.

Example (The table's row/column structure, shown with the CSS-only markup fallback.): `get_forge_blocks(blockId: "components/table/css-only/css-only")`

## Inside a card

Place a table in a `forge-card no-padding` with a `forge-scaffold`, so it runs edge to edge. Put the table title and icon actions (filter, export, more) in the header toolbar, and a `forge-paginator` in an `inverted` footer toolbar. The primary page action, like "New order", goes in the page's body header, not the card.

```html
<forge-card no-padding>
  <forge-scaffold>
    <forge-toolbar slot="header">
      <h3 slot="start" class="forge-typography--heading3">Orders</h3>
      <forge-icon-button slot="end" density="medium" aria-label="Filter orders">
        <forge-icon name="filter_list"></forge-icon>
      </forge-icon-button>
    </forge-toolbar>
    <forge-table slot="body"></forge-table>
    <forge-toolbar slot="footer" inverted>
      <forge-paginator slot="end"></forge-paginator>
    </forge-toolbar>
  </forge-scaffold>
</forge-card>
```

## Configuring columns

Each entry in `columnConfigurations` describes one column: `header` (and optional `footer`) text, the `property` to read from each row in `data`, and whether it's `sortable` (with `initialSort` marking the column sorted by default) or `filter`-able.

```ts
import type { IColumnConfiguration } from "@tylertech/forge";

const columnConfigurations: IColumnConfiguration[] = [
  { header: "First name", property: "firstName", sortable: true, initialSort: true },
  { header: "Last name", property: "lastName", sortable: true },
  { header: "Age", property: "age", sortable: true },
];

tableEl.columnConfigurations = columnConfigurations;
tableEl.data = data;
```

## Column filters

Set `filter: true` on a column and give it a `filterDelegate` to render a filter input in the header. Use the built-in `TextFieldComponentDelegate` or `SelectComponentDelegate` for common input types, or build a custom delegate by extending `BaseComponentDelegate` or `FormFieldComponentDelegate` — either way, the delegate is a consistent interface for getting/setting a value and toggling `invalid`/`disabled`/`required` on whatever component it wraps.

```ts
import { TextFieldComponentDelegate, SelectComponentDelegate } from "@tylertech/forge";

table.columnConfigurations = [
  {
    property: "name",
    header: "Name",
    filter: true,
    filterDelegate: () => new TextFieldComponentDelegate({ options: { placeholder: "Filter name..." } }),
  },
  {
    property: "color",
    header: "Favorite color",
    filter: true,
    filterDelegate: () => new SelectComponentDelegate({ props: { placeholder: "Filter color..." } }),
  },
];
```

## Footer row

Set `includeFooter` to add a footer row, then give each column either a static `footer` string or a `footerTemplate` callback for custom content, like a computed average. Style footer cells individually via `footerCellStyle`.

```ts
tableEl.includeFooter = true;
tableEl.columnConfigurations = [
  { header: "First name", property: "firstName", footer: "Total" },
  {
    header: "Age",
    property: "age",
    footerTemplate: () => {
      const span = document.createElement("span");
      span.textContent = `Avg: ${average}`;
      return span;
    },
  },
];
```

## Transforming values

Use a column's `transform` callback to map a raw value to display text — a boolean to "Enabled"/"Disabled", for example — without changing the underlying `data`.

```ts
{
  property: "active",
  header: "Status",
  transform: (value) => (value ? "Enabled" : "Disabled"),
}
```

## Accessibility

### Don't use a table for layout

Reserve `forge-table` for actual tabular data — using it to lay out unrelated content makes the page harder to parse for screen reader users, who rely on table semantics to mean an actual data grid.

### Row selection

The selection checkbox in each row automatically receives an `aria-label="Select row"`, so no extra labeling is needed there.

### Interactive cell content

If a column renders an interactive control (a button, a link, a form field), make sure it's reachable and operable by keyboard, the same as it would be with a mouse.
