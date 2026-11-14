# Forge Table

Lit-based data table Web Component for `@tylertech/forge`, built on
[TanStack Table](https://tanstack.com/table) (`@tanstack/lit-table`) with row virtualization from
`@tanstack/lit-virtual`.

## Purpose

Lifted out of the base `@tylertech/forge` package into its own so consumers of the main library do not
pay for TanStack. `@tylertech/forge` is a **peerDependency** — the table renders Forge elements
(`forge-checkbox`, `forge-popover`, `forge-dropdown-menu`, `forge-list`, `forge-text-field` (column rename), `forge-tooltip`, `forge-date-picker`, and with the
filter feature `forge-select`) and does not bundle them.

The element is **`forge-data-table`**, not `forge-table`: `forge-table` is an existing, unrelated element
in the base package. The package name and the tag intentionally differ.

## Status

`package.json` is `"private": true`, so this package is not versioned or published. `changeset publish`
publishes any non-private package whose version is not on npm yet, so the flag is what keeps this WIP
component out of a release. To publish: remove `private`, add a changeset, and review the peer range.

## Architecture

- `src/lib/data-table/data-table.ts` — the `DataTableElement`. A plain `LitElement` that registers itself
  with `@customElement('forge-data-table')`, so importing the module is what defines the element. It does
  not use `BaseLitElement` or `defineCustomElement`, unlike most of Forge.
- `src/lib/data-table/table-features.ts` — the TanStack Table v9 `tableFeatures({...})` registration (`dataTableFeatures` /
  `DataTableFeatures`). v9 only exposes an API when its feature is registered, so using a new table, column, or row API
  (pinning, pagination, faceting, ...) means adding the feature here first. Built-in filter and sort functions are registered
  individually; the `'auto'` filter and sort resolution only finds registered ones. Every TanStack `Table`, `Column`, `Cell`
  and `ColumnDef` type takes `DataTableFeatures` as its first generic.
- Rows come from the `dataSource` property, a `DataSource` from `@tylertech/forge-core`. `willUpdate` calls its
  `fetch()` whenever the property changes and stores the result in internal state, so the first render is empty
  and rows arrive in a follow-up update. `await element.updateComplete` therefore does not wait for the fetch.
  `forge-core` is a regular dependency (not a peer) because `DataSource` is in the public type surface; the
  source only does `import type` from it, so the built JS has no runtime import.
- `src/lib/data-table/controllers/` — Lit reactive controllers for column reordering, column visibility,
  and the shared `ColumnHierarchyHelper` for grouped (nested) columns.
- `src/lib/data-table/directives/light-dom-render.ts` — renders custom cell templates into the light DOM
  and projects them through named slots (`col-<id>:row-<id>`).
- `src/lib/data-table/features/` — opt-in pieces. `expander.ts` is re-exported from the main entry.
  `column-pinning.ts` holds the column pinning logic: it turns `ColumnDef.pin` (`'start' | 'end'`, cascading from a column group to its
  children) into TanStack's `columnPinning` state and computes each cell's sticky offset and `pinned*` classes. TanStack only partitions
  and orders the columns, so the element renders a `<colgroup>` with every column's model size (the offsets are sums of those sizes) and
  `table.has-pinned-columns` switches to `table-layout: fixed`. The row selection column is pinned ahead of start-pinned columns.
  `aggregation.ts` backs `ColumnDef.aggregate` (a built-in name such as `'sum'` or a TanStack `AggregationFnDef`). It registers the built-in
  `aggregationFn_*` definitions and resolves the option; `mapColumns` passes it to TanStack as `aggregationFn` only when set, because the
  feature's default `'auto'` would otherwise aggregate every column. The result of `column.getAggregationValue()` (over the filtered rows,
  ignoring pagination) is the column's footer unless `footer` is a string; a footer callback also receives it as `aggregate`. Columns with a
  `Formatter` aggregate the raw property, not the formatted string, and the footer then runs the formatter over the result (each end of an
  `extent` range). `count`, `uniqueCount` and custom aggregation functions are not formatted, and a `CustomFormatter` function is never
  applied because it takes a row, not a value. A footer cell that shows an aggregate (`ColumnDefMeta.aggregated`: `aggregate` set and `footer`
  not a string) also gets the column's `align` and format attribute, so it right-aligns and styles like the body cells; other footer cells
  are never aligned. Grouped-row aggregation (`columnGroupingFeature`) is not registered.
  `csv-export.ts` backs `DataTableElement.exportToCsv(filename?)`: `buildCsv` writes the visible data columns in display order (start-pinned, center,
  end-pinned, so it follows `columnOrder`, visibility and renames) and the rows of `getRowModel()` (sorted and filtered), and `downloadCsv` saves it with a
  UTF-8 BOM. Columns without an accessor (selection, expander, actions) are skipped. Values are accessor values, so a `format` column exports its formatted text
  and templates are ignored. The element keeps the table from its last render in `#table`, so nothing is exported before the first render.
  `print.ts` backs `DataTableElement.print(title?)`: `buildPrintDocument` writes the same columns, header text and rows as the CSV export (it reuses `csv-export.ts`'s
  helpers) into a static HTML table, with cells aligned by `ColumnDef.align`, because the live table only renders the rows scrolled into view when `virtualized`.
  `printDocument` loads it into a hidden iframe (`srcdoc`), calls the iframe's `print()` on load and removes the iframe on `afterprint`. Nothing is printed before the first render.
  `row-meta.ts` holds the accessible name of each row. On every render the element calls `getRowName(row, index)` (default `Row N`) and stores the result with a generated element id in a `WeakMap` keyed by the TanStack row
  (TanStack v9 rows have no meta slot). The `<tr>` gets that id and an `aria-label` with the name, so cell templates can reference the row from `aria-labelledby`: `getCellLabelledBy(cell)` yields `{row name} {column header}` (the
  header `.cell-text` span has the id `column-header-text-<columnId>`) for the rating, meter, input and select-checkbox cells, and `labelWithRowName(element, row)` yields `{own label} {row name}` for the expander and action buttons. Both return
  nothing outside a data table. `aria-labelledby` cannot cross shadow roots, so `useTemplateSlot` (light DOM) cells are not labelled this way.
  `filter/index.ts` is only side-effect imports that register `forge-select` and `forge-text-field`; it is
  a directory so the `./*` export pattern can resolve it as `@tylertech/forge-table/data-table/features/filter`.
- Cell selection is the `cell-selection` boolean (`cellSelection`) on the element, backed by TanStack's `cellSelectionFeature`, and is independent of `rowSelection`. The state is a list of ranges (anchor and focus corner as row and column ids),
  held in `_cellSelection` and reported through `forge-data-table-cell-select` (detail: that list; not fired when it stays empty, e.g. TanStack's reset when `dataSource` rows change, which also clears the selection). Each selectable `<td>` binds
  TanStack's `getSelectionStartHandler` (`mousedown`, primary button only) and `getSelectionExtendHandler` (`mouseenter`, for drags); the handlers read the table's atoms, which only sync to `_cellSelection` on render, so a
  `mouseenter` dispatched in the same tick as the `mousedown` is ignored (await `updateComplete` between them in tests). Which cells are selectable is `cell.getCanSelect()`: `mapColumns` sets the TanStack column `enableCellSelection: false` for columns that are
  `editable` or `stopRowClickPropagation` (their content is interactive, which includes the expander column) unless the column sets its own `enableCellSelection`, and `prependSelectColumn` does the same for the row selection column.
  `ColumnDef.enableCellSelection` (`boolean | (cell) => boolean`) and the element's `enableCellSelection` property (same type, default `true`, only read while `cellSelection` is on) are both resolved by `#canSelectCell`, which is what the element hands TanStack as its table option. The column value (kept in `meta.enableCellSelection`, since TanStack's own column flag is boolean only and `true` there does not beat a table `false`) wins over the element's when set; only a static `false` is also mirrored to TanStack's column flag so select-all and counts skip it. The selection tint and outline are drawn by `td::after`
  (`cell-selected` plus `selection-top/right/bottom/left` classes from `getSelectionEdges()`, only the range's outer sides are outlined, so the anchor cell has no outline of its own inside a range) so they layer over striped, hover and pinned backgrounds; the overlay extends one border width past the cell (the tint is clipped back to the cell) so the outline covers the cell borders and a bordered table's collapsed borders instead of being cut by them. With the option on, the `<table>` gets `role="grid"` and
  `aria-multiselectable`, and cells get `aria-selected`. Keyboard: cells use a roving `tabindex` (`#cellTabStopId`: the anchor cell, else the first selectable cell of the first row). Arrow keys call `moveCellSelection` and then focus the new tab stop in `updated()`
  (`#pendingCellFocus`; with `virtualized` it scrolls the row into view first and retries on the next update), Shift+arrow `extendCellSelection`, Ctrl/Cmd+A `selectAllCells`, Escape `resetCellSelection(true)`. A cell focused with no selection selects itself.
  `selectCellRange(range, options?)` is the public wrapper for TanStack's `table.selectCellRange` (modes `replace`, `include`, `exclude`; types re-exported from `data-table.ts`). It goes through the same `onCellSelectionChange` path, so it emits
  `forge-data-table-cell-select`, and it is a no-op while `cellSelection` is off or before the first render (it uses `#table`). TanStack does not validate the ids, and the selection is cleared when the rows change.
  `getSelectedCellRangesData()` wraps TanStack's method of the same name (a `[region][row][column]` grid of accessor values in displayed order). The table's atoms only pick up `_cellSelection` on render, so it first calls `performUpdate()` when an update
  is pending (and the element has rendered once); without that, a call from a `forge-data-table-cell-select` listener, or right after `selectCellRange`, returns the previous selection.
  While a drag is held, `features/cell-selection-autoscroll.ts` (`CellSelectionAutoScroller`, started from `#onCellMouseDown`) runs a `requestAnimationFrame` loop that scrolls `.table-container` when the pointer is within `AUTO_SCROLL_EDGE_SIZE` of
  (or beyond) an edge, faster the closer it gets, and ends on `mouseup` or a `mousemove` with no buttons pressed. `mouseenter` does not fire for the cell that scrolls under an idle pointer or while the pointer is outside the table, so on those frames the loop
  hit-tests a point clamped to the scrollable area (inside the pinned columns and fixed header, see `#getStickyInsets`) and calls that cell's `getSelectionExtendHandler`; body cells carry `data-row-id` and `data-column-id` for the lookup. Only
  `.table-container` scrolls, so vertical auto-scroll needs it to overflow vertically (`virtualized` with a constrained height).
  Cells set `user-select: none`, so native text copy is unavailable on them. Instead, Ctrl/Cmd+C in `#onCellKeydown` passes `getSelectedCellRangesData()` to the element's `getSelectionClipboardValue` property (default `buildSelectionCsv` in
  `csv-export.ts`: the rows of every region one after another, same escaping as `exportToCsv`) and writes the result with `navigator.clipboard.writeText`. Nothing happens, and the key is not prevented, when no cells are selected. Failed clipboard writes are ignored.
- `src/lib/column-menu/` — `forge-data-table-column-menu`, an icon button + `forge-menu` of actions for one column.
  Takes the TanStack `column` and `table` as properties; sort, move, hide and pin (to the start) are applied directly, while
  rename (offered when `ColumnDef.renamable` is set and the header is a string) and maximize only dispatch `forge-data-table-column-menu-action` (every action dispatches it). It assigns `forge-menu`'s `options` in
  `firstUpdated` because `forge-menu` drops an `options` value that Lit sets during the first render.
  The data table owns renaming: `ColumnDef.renamable` (carried as `meta.renamable`) opts a column in, the action swaps the header text for an inline `forge-text-field` (Enter or blur commits,
  Escape cancels, blank or unchanged is ignored), and renames live in an override map applied over the mapped columns (`applyColumnHeaders`), so
  `columns` is never mutated and the overrides reset when `columns` is set. A commit dispatches `forge-data-table-column-rename`. The input is
  focused in `updated()`, not a `ref` callback, because the callback runs before the new template is attached.
  Double-clicking the header text of a renamable column also starts it; the two clicks of the double click each toggle sorting, so the sorting
  captured at the first click is restored before editing begins.
- `src/lib/table-toolbar/` — `forge-data-table-toolbar`, a toolbar for a data table built on the CSS-only `.forge-toolbar` styles (not the `forge-toolbar` element). Connected through `table` (the id of a data table, looked up in the toolbar's root node when `table` changes) or by assigning a `DataTableElement` to `tableElement`; the id lookup sets `tableElement`, so a table that is not in the DOM yet when the toolbar first updates is not found.
  The `features` attribute picks the icon buttons; `export` calls the table's `exportToCsv()` and `print` calls its `print()`, `select` and `filter` are toggle buttons that set the table's `rowSelection` (`multiple`/`off`) and `filterable`, `columns` opens a menu (below), and `reload` and `search` have no behavior yet.
  It shows an "N selected" summary and the `selection-actions` slot while rows are selected. Features in `MENU_FEATURES` (just `columns` for now) also render a `forge-dropdown-menu` right after the button and tooltip,
  triggered by the button's id (`<feature>-button`). The menu is always in the DOM while the button is, and its items are built in `#renderMenuItems`, so a new menu button needs an entry in both. `columns` lists a
  "Show all" item and a divider, then a `forge-dropdown-menu-item-checkbox` per hideable column (checked when visible) that shows and hides the column through the table's public `showColumn`/`hideColumn`; the select event is canceled so the menu stays open while toggling.
  The selected count comes from `forge-data-table-row-select`, so a selection made before the table is connected is not counted.
  The items are rebuilt when the table's column visibility changes and when the menu opens, so they show the column definitions' headers, not renamed ones.
- `src/dev/` — a dev page on **localhost:3470**, written like forge's own dev pages (`pages/data-table/data-table.{html,ejs,ts,scss}`;
  the options drawer is the `options` array in the `.html`). It reuses forge's page shell (`packages/forge/src/dev/src`: scaffold, app bar,
  options drawer, theme toggle) through the `$src` alias and the EJS `views` list in `vite.config.mts`. `vite.config.mts` aliases this package to `src/lib` and
  compiles its SCSS from source (including forge's SCSS), so edits reload the page with no rebuild. forge itself
  still resolves to its built `esm/`, so forge changes need a forge rebuild. Not published.

## Commands

```bash
pnpm run --filter @tylertech/forge-table build   # rollup ESM + CEM + types
pnpm run --filter @tylertech/forge-table test    # Vitest browser mode
pnpm run --filter @tylertech/forge-table dev     # scratch page at localhost:3470 (reloads on source edits)
```

### Build through turbo, not just this package

The SCSS takes theme, shape, spacing, border, animation and elevation from `@tylertech/forge-tokens/sass/*` (a devDependency). Only the table core and scrollbar styles still come from `@tylertech/forge/sass/*`, which is forge's **built, gitignored**
`sass/` directory — a copy of `src/lib/**/*.scss`. If forge has not been rebuilt since its SCSS changed,
that copy is stale and this build fails with a confusing `Can't find stylesheet to import` pointing at a
file inside `node_modules/@tylertech/forge/sass/`. Run `pnpm exec turbo run build --filter=@tylertech/forge-table`
so forge is rebuilt first. Vitest does not hit this: its config reads forge's SCSS from source.

The build also removes `esm/` and `custom-elements.json` first, so a failed build leaves them gone.

### Importing from forge

- Import elements as side effects from their public subpath: `import '@tylertech/forge/checkbox'`.
- Import everything else from the **root**: `import { toggleState } from '@tylertech/forge'`.
- **Do not import from `@tylertech/forge/core`.** Its type declarations are real, but forge's built
  `esm/core/index.js` contains no exports, so it type-checks and then fails in the browser with
  `does not provide an export named ...`. Neither the build nor the tests catch this because the tests
  alias forge to its source — only the dev page (which uses forge's build) or a real consumer does.

### Storybook

The stories live in `packages/forge/src/stories/components/data-table/`, not here. `packages/forge/.storybook/main.ts`
aliases this package to its built `esm/`, and `packages/forge/src/stories/utils.ts` merges this package's
`custom-elements.json` so the API table resolves. After changing source, rebuild **and restart storybook**.

## Testing

Vitest browser mode in real Chromium, mirroring `packages/forge`.

- `vitest.setup.ts` is forge's own setup: per-test cleanup (viewport reset, removing leftover popovers and
  tooltips, clearing `DismissibleStack`) and the `toBeAccessible` matcher, typed in `src/testing/vitest.d.ts`.
  A setup file with only cleanup makes the suite fail with `Invalid Chai property: toBeAccessible`.
- `vitest.config.ts` aliases `@tylertech/forge` to `../forge/src/lib`, so tests run against forge's source,
  not its build.
