# Forge Table

Lit-based data table Web Component for `@tylertech/forge`, built on
[TanStack Table](https://tanstack.com/table) (`@tanstack/lit-table`) with row virtualization from
`@tanstack/lit-virtual`.

## Purpose

Lifted out of the base `@tylertech/forge` package into its own so consumers of the main library do not
pay for TanStack. `@tylertech/forge` is a **peerDependency** — the table renders Forge elements
(`forge-checkbox`, `forge-popover`, `forge-dropdown-menu`, `forge-list`, `forge-tooltip`, `forge-date-picker`, and with the
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
  not use `BaseLitElement` or `defineCustomElement`, unlike most of Forge. It holds the public properties and methods, the lifecycle, the
  TanStack options and the handlers that write the table state (sorting, filters, row selection, pinning, ...), and otherwise delegates:
  rendering goes to pure functions in `templates/`, and behavior that needs its own state goes to reactive controllers in `features/`
  (`ColumnRenameController`, `CellSelectionController`, `RowVirtualization`) that the element creates and hands
  callbacks to. Templates take the element and the table as arguments, so they only read public properties; state that is private to the
  element (the sorting) is passed in explicitly. The element is not split by the TanStack state it owns, so a new `@state` stays in the element.
- `DataTableElement.config` (`DataTableDef`, in `types.ts`) reads or sets every configuration property as one object. The getter builds it from the element's properties; the setter assigns only the fields present (merging, so it composes with individual properties and attributes) and skips `undefined` except for `dataSource` and `maxMultiSortColCount`, where it clears the value. `DATA_TABLE_DEF_KEYS` in `constants.ts` lists the fields and is type-checked against `DataTableDef`, so a new public configuration property must be added to both. It is a plain accessor, not a Lit property, so it has no attribute.
- `src/lib/data-table/table-features.ts` — the TanStack Table v9 `tableFeatures({...})` registration (`dataTableFeatures` /
  `DataTableFeatures`). v9 only exposes an API when its feature is registered, so using a new table, column, or row API
  (pinning, pagination, faceting, ...) means adding the feature here first. Built-in sort functions are registered
  individually, and the filter functions live in a mutable registry (`dataTableFilterFns`, see `filter-fn.ts`) that starts with only `includesString`;
  the `'auto'` filter and sort resolution only finds registered ones, so a column without `filterFn` filters only if the function `'auto'` picks for its values is registered. Every TanStack `Table`, `Column`, `Cell`
  and `ColumnDef` type takes `DataTableFeatures` as its first generic.
- Rows come from the `dataSource` property, a `DataSource` from `@tylertech/forge-core`. `willUpdate` calls its
  `fetch()` whenever the property changes and stores the result in internal state, so the first render is empty
  and rows arrive in a follow-up update. `await element.updateComplete` therefore does not wait for the fetch.
  `forge-core` is a regular dependency (not a peer) because `DataSource` is in the public type surface; the
  source only does `import type` from it, so the built JS has no runtime import.
- `src/lib/data-table/templates/` — the render functions, one file per part of the table: `header.ts`, `body.ts` (rows, and the virtualized rows), `body-cell.ts`,
  `footer.ts`, `column-group.ts`, `rename-input.ts` and `empty-state.ts`, plus the cell templates (`input-cell.ts`, `badge-cell.ts`, ...).
  A template that needs more than a table gets a context object (`HeaderContext`, `BodyContext`) from `render()`.
- `src/lib/data-table/controllers/` — Lit reactive controllers for column reordering, column visibility,
  and the shared `ColumnHierarchyHelper` for grouped (nested) columns.
- `src/lib/data-table/directives/light-dom-render.ts` — renders custom cell templates into the light DOM
  and projects them through named slots (`col-<id>:row-<id>`).
- `src/lib/data-table/features/` — opt-in pieces.
  `expander.ts` holds everything specific to expandable rows; none of it is public API beyond the element's `expandable`, `getSubRows`, `getRowHasDetail` and `getRowDetail`. `expandable` adds a leading expander column (`EXPANDER_COLUMN_ID`, `prependExpanderColumn`) with a `forge-icon-button` holding a `forge-open-icon` (its `open` reflects the expanded state) per data row, after the row selection column and before the groups/grouped columns (`getGroupedColumnOrder`, `pinSelectColumn` and `getGroupLabelCell` all know it). It has no column menu, sorting, filter, reordering or cell selection, stops row clicks, and group rows leave its cell empty. Double clicking a group row or an expandable data row toggles it (`toggleRowOnDoubleClick`), ignoring double clicks that land on interactive content such as the toggle buttons and checkboxes.
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
  are never aligned. Group rows show the aggregate of their rows (see `row-grouping.ts`, below).
  `row-grouping.ts` backs row grouping, on TanStack's `columnGroupingFeature` and `groupedRowModel` (and `expandedRowModel`, which is what shows the sub-rows of an expanded group). The `grouping` property (ordered column ids) is the TanStack `grouping`
  state; changes made through the column menu update it and dispatch `forge-data-table-grouping` (detail: the ids). `groupable` (`enableGrouping`) only controls whether the column menu offers a "Group" checkbox item (`ColumnDef.groupable: false` opts a column out);
  setting `grouping` groups the rows either way. Group rows are collapsed until expanded (TanStack's `expanded` state, so `getRowCanExpand` is true for them regardless of `expandable`).
  Grouped columns move to the start of the table, in grouping order, right after the row selection column. `groupedColumnMode` is `false` on purpose: TanStack's `'reorder'` puts them ahead of the selection column (the selection column is only pinned when other
  columns are pinned, so it is first by definition order alone). `getGroupedColumnOrder` builds the `columnOrder` state handed to TanStack instead (selection column, grouped columns, then the element's own `columnOrder`), without touching the public `columnOrder` property.
  A group row renders a cell per visible column, through `renderGroupRowCell`: the group cell (`getGroupLabelCell`: the cell of the column the row is grouped by, or the first visible cell after the selection column when that column is hidden) holds the toggle, the label and the data row
  count, is start aligned, and takes no format attribute; cells of columns with `ColumnDef.aggregate` show the group's aggregate (the same `aggregationFn` that backs the footer, run over the group's rows; formatted like the footer through `ColumnDefMeta.aggregate`/`aggregateFormatter`); every other cell is empty,
  because column templates expect a data row. `cell.getIsAggregated()` is not used: the feature's default `'auto'` aggregation would make it true for every numeric column. Data rows leave the cells of grouped columns empty (`FlexRender` returns nothing for `cell.getIsPlaceholder()` cells), so the value only appears in the group row; the export and print still include it.
  The group row's cell in the selection column holds a checkbox (`renderGroupCheckbox`) in `multiple` mode, over the group's selectable data rows including those of nested groups: checked when all are selected, indeterminate when only some are. Changing it calls `setGroupSelected`, which updates only the data rows'
  ids in one `table.setRowSelection` call (one `forge-data-table-row-select` event). It deliberately avoids `row.toggleSelected()` on the group row, which would add the group row's own id to the selection state. In `single` mode the cell is empty.
  `singleGroupColumn` (attribute `single-group-column`) shows the grouped columns as one "Groups" column (`GROUPS_COLUMN_ID`, `prependGroupsColumn` in `column-utils.ts`, added after the selection column like `prependSelectColumn`) instead: it sets `groupedColumnMode: 'remove'`, so TanStack drops the grouped columns from the ordered, visible columns (their `getIsVisible()` is unchanged), and the element hands TanStack a `columnVisibility` that shows the groups column only while `grouping` is non-empty (the public `columnVisibility` is not touched). `getGroupedColumnOrder` keeps the groups column right after the selection column, and `pinSelectColumn` pins it behind the selection column when other columns are start-pinned. The groups column has no column menu, sorting, filter or reordering, and data rows leave its cell empty; the group row's label cell falls back to it (`getGroupLabelCell`, no cell is `getIsGrouped()`), indented by `row.depth`. `getCsvColumns` puts the removed grouped columns, in grouping order, ahead of the displayed ones so export and print keep their data.
  Group rows get the `group-row` class and a `group-tr` part, are named `{column header}: {label}` for `aria-label`, and are not row-clickable, expandable (detail content) or cell-selectable; their `row.original` is the first data row of the group, so never pass it to user callbacks.
  `getDataRows(table)` lists the sorted and filtered data rows without group rows or expansion state; CSV export and print use it, so they export every row of a collapsed group (columns in display order, so the grouped column comes first). The footer aggregate is unaffected by grouping.
  `getSubRows` (`(row, index) => TData[] | undefined`, no attribute) is handed to TanStack as its `getSubRows` option, so rows get `subRows` from the data itself. TanStack memoizes the core row model on `data`, so `willUpdate` copies `_data` when `getSubRows` changes after the first update. Expanding a row (`expandable`) shows its sub rows as ordinary rows (`expandedRowModel`). There is no tree indentation yet, and rows that have sub rows are still only expandable while `expandable` is on.
  `expander.ts` also backs `getRowHasDetail` / `getRowDetail` and TanStack's `getRowCanExpand` (`canExpandRow`, so the expander column and double click, which check `row.getCanExpand()`, follow it). Group rows always expand; other rows need `expandable`, and then: with neither `getSubRows` nor `getRowHasDetail` set every row expands and its content is the `expanded:row-<id>` slot; otherwise a row expands when it has sub rows (`row.subRows.length > 0`), `getRowHasDetail(row.original, row.index)` is true, or it has a direct child in its `expanded:row-<id>` slot (`rowHasSlottedContent`, whatever `getRowHasDetail` returns; `ExpandedSlotController` watches the host's children and `slot` attributes with a `MutationObserver` and requests an update, because unexpanded rows have no `<slot>` to fire `slotchange`). An expanded row with a detail gets one full span `<tr part="body-tr tr detail-tr">` (`.expanded-content`, colspan the visible cell count) right after it holding the element from `getRowDetail`, rendered straight into the shadow root (not slotted) and wrapped in `guard` so it is created once per expansion and kept across re-renders unless the row data, index or `getRowDetail` change. When `getRowDetail` is not set, a row that `getRowHasDetail` says has a detail renders the `expanded:row-<id>` slot there instead, and so does a row with slotted content that has no detail (`getRowDetail` wins when a row has both). Its sub rows follow the detail row, because TanStack lists them after their parent. When `getSubRows` or `getRowHasDetail` is set, an expanded row with neither a detail nor slotted content renders no detail row. Detail rows are not rendered when `virtualized`.
  The virtualizer's row count follows `getRowModel().rows`, not the data length, because grouping and expanding change it.
  `csv-export.ts` backs `DataTableElement.exportToCsv(filename?)`: `buildCsv` writes the visible data columns in display order (start-pinned, center,
  end-pinned, so it follows `columnOrder`, visibility and renames) and the data rows from `getDataRows()` (sorted and filtered, no group rows), and `downloadCsv` saves it with a
  UTF-8 BOM. Columns without an accessor (selection, expander, actions) are skipped. Values are accessor values, so a `format` column exports its formatted text
  and templates are ignored. The element keeps the table from its last render in `#table` (also what the cell selection controller reads through `getTable`), so nothing is exported before the first render.
  `print.ts` backs `DataTableElement.print(title?)`: `buildPrintDocument` writes the same columns, header text and rows as the CSV export (it reuses `csv-export.ts`'s
  helpers) into a static HTML table, with cells aligned by `ColumnDef.align`, because the live table only renders the rows scrolled into view when `virtualized`.
  `printDocument` loads it into a hidden iframe (`srcdoc`), calls the iframe's `print()` on load and removes the iframe on `afterprint`. Nothing is printed before the first render.
  `row-meta.ts` holds the accessible name of each row. On every render the element calls `getRowName(row, index)` (default `Row N`) and stores the result with a generated element id in a `WeakMap` keyed by the TanStack row
  (TanStack v9 rows have no meta slot). The `<tr>` gets that id and an `aria-label` with the name, so cell templates can reference the row from `aria-labelledby`: `getCellLabelledBy(cell)` yields `{row name} {column header}` (the
  header `.cell-text` span has the id `column-header-text-<columnId>`) for the rating, meter, input and select-checkbox cells, and `labelWithRowName(element, row)` yields `{own label} {row name}` for the expander and action buttons. Both return
  nothing outside a data table. `aria-labelledby` cannot cross shadow roots, so `useTemplateSlot` (light DOM) cells are not labelled this way.
  `filter-fn.ts` backs `ColumnDef.filter`: a `ColumnFilter` (`{ filterFn, label?, field? }`), a bare TanStack filter function (built-in `filterFn_*` or custom, same API) or the name of a registered one, or an array of them (`resolveColumnFilters`
  turns each into a `ResolvedColumnFilter`). Functions are
  passed straight to TanStack as the column's `filterFn`, so they need no registration; `registerFilterFns({ name: fn })` only adds names (for string `filterFn`, `'auto'`
  and the menu labels). Nothing but `includesString` is registered or imported up front, and `features/filter-fns.ts` re-exports TanStack's
  `filterFn_*` and `constructFilterFn` from the main entry, so a function the consumer never imports is tree-shaken out. With more than one function the first is the default, `mapColumns` keeps the list in `meta.filters`
  (when there is at least one; the menu only shows for more than one), and `renderFilterFnMenu` (`templates/filter-fn-menu.ts`) shows a `forge-dropdown-menu` of radio items beside the filter field (the menu label is the filter's `label`, else a fixed label for some registered built-in names — `includesString`/`arrIncludes` "Contains", `equalsString`/`weakEquals` "Equals", `arrIncludesAll` "Contains all", `arrIncludesSome` "Contains some", `arrHas` "Has", `inNumberRange`/`inDateRange` "In range" — else the registered name as words, else `Filter N`).
  `ColumnFilterFnController` owns the choice per column id and applies it over the mapped columns like the renames (`apply`), so `columns` is never mutated and the choice resets when `columns` is set. Choosing dispatches `forge-data-table-filter-fn-change`
  (detail: `columnId`, the chosen `filterFn`, `index`) before anything else, then filters again through the element's `#onFilter` with a new `columnFilters` array (TanStack skips structurally equal writes, so writing the same value back does nothing), which also
  emits `forge-data-table-filter` with `manualFilter` while the column has a value. The filter value is kept when switching between functions whose fields produce the same value shape (`getFilterFieldShape`: `text`, `range`, `select`, `select-multiple`), and cleared when the shapes differ.
  `ColumnDef.dataType` (`string`, `number`, `date`, `time`, `boolean`, `array`) picks the filter field: `number` is a text input with the number mask, `date` a `forge-date-picker`, `time` an `<input type="time">`, everything else a text input. Without it, `getColumnDataType` (`columns/data-type.ts`) infers it from the first non-empty raw value of the column's `property` in the _unfiltered_ core rows (number, boolean, string, `Date`, array), and is `undefined` for columns with no `property` or no values; unfiltered so the field does not change type (and lose focus) when a filter hides every row.
  `ColumnFilter.field` (`FilterFieldConfig`: `type` `text` | `select` | `range`, `options` as `{ value, label }[]`, `multiple` for `select`) configures the field of a filter. `features/filter-field.ts` `resolveFilterField(column, filter)` yields the field to render: the filter's `field`, which for a bare built-in function is its default (`resolveColumnFilters` copies the function's `field` in), else `text`; a `select` without `options` gets the distinct values of the column (array items flattened) via `getColumnValues`. `text` and `range` follow the column's `dataType` (`renderValueInput` in `templates/filter-fields.ts`: date picker, number-masked text, time input, else text); a `range` renders two of them and produces `[min, max]` (bounds `undefined` when empty, the whole value `undefined` when both are), a `select` produces the option value (or an array when `multiple`; single selects add an "All" option that clears it). Built-in functions are told apart from custom ones by being the copies `features/filter-fns.ts` exports (made with `withDefaultField`, which puts `field` on the function; it is not public API): `between`, `betweenInclusive`, `inNumberRange` and `inDateRange` have a `range` field, `arrHas`, `arrIncludes`, `arrIncludesAll` and `arrIncludesSome` a `multiple` `select`; the same functions imported from `@tanstack/lit-table` are plain functions and get a `text` field.
  `features/fuzzy/` backs fuzzy column filtering, following TanStack's fuzzy filtering guide: `fuzzyFilter` (a `FilterFn` that ranks the cell value against the filter text with `rankItem` from `@tanstack/match-sorter-utils`, stores the `itemRank` in the row's filter meta through `addMeta`, and keeps the row when it passes) and `fuzzySort` (a `SortFn` for `ColumnDef.sortFn` that compares those ranks, best match first, and falls back to `sortFn_alphanumeric` for equal ranks and for rows without a rank, such as an unfiltered column). `fuzzyFilter` works anywhere a filter function does (`ColumnDef.filter`, alone or in a list, or `registerFilterFns({ fuzzy: fuzzyFilter })`); nothing sorts by rank unless the column sets `sortFn: fuzzySort`, and the table does not sort for you when the filter changes. It is opt-in and tree-shakable because it is its own entry point, `@tylertech/forge-table/data-table/features/fuzzy` (`features/fuzzy/index.ts`, picked up by the build's `index.ts` glob and the `./*` export), and is never re-exported from the main entry or imported by the element. `@tanstack/match-sorter-utils` is therefore an optional `peerDependency` (and a devDependency), only needed by consumers of that entry. Do not import it from anywhere else in `src/lib`. `FuzzyFilterMeta` types the meta, but `filterMeta` is not registered in `dataTableFeatures` (its type would pull the optional package into the main typings), so `row.columnFiltersMeta[id]` is untyped for consumers and `fuzzySort` casts it.
  `cell-render.ts` backs `onCellRender` (`CellRenderFn`, on `DataTableElement` and `ColumnDef`; the column's wins, stored as `meta.onCellRender`): `renderBodyCell` puts the `queueCellRender` directive (`directives/cell-render.ts`) on each `<td>`, which registers the cell with `CellRenderController` while rendering, and the controller's `hostUpdated` calls the callbacks with `{ ...cell.getContext(), element }` (the `TemplateFn` props plus the `<td>`), so they see the committed DOM. They run after every render and must be idempotent, because Lit rewrites changed content. Group rows and the selection, expander and groups columns are skipped, and a throwing callback is reported with `reportError` without stopping the others.
  `row-click.ts` backs `allowRowClick`. A data row is clickable when it contains an element with a `forge-default-action` attribute (`findDefaultAction`, which also looks into light DOM content slotted into its cells), or `row.getCanSelect()`, or `row.getCanExpand()`; group rows never are. Only clickable rows get the click handler (`getRowClickHandler`) and the styles: `.clickable` (selectable or expandable, set by the template) and `.has-default-action` (set by `RowClickController.hostUpdated` after each render, because the element can be slotted). Their `td::before` is a CSS-only Forge state layer (hover and pressed, no ripple) and the row gets `cursor: pointer`. The handler dispatches `forge-data-table-row-click`, then clicks the default action element, else toggles selection, else toggles expansion. It ignores clicks from interactive content (`isFromInteractiveContent`, shared with the double click toggle) and clicks that originate from the default action element itself, which also stops the programmatic click from re-entering the handler. The row is not focusable and has no role: keyboard and screen reader users use the default action element, the checkbox or the expander button.
  `ColumnDef.headerColumn` (`meta.headerColumn`) makes `renderBodyCell` render the column's data row cells as `<th scope="row" role="rowheader">` (class `header-column-cell`, bold) instead of `<td>`, so they name their row; group row cells stay `<td>`. The header cell is unchanged. Because body cells can be `th`, the body styles and the cell selection queries match `:is(td, th)`, so a new body cell selector must too.
  `ColumnDef.sortFn` (a TanStack `SortFn`, `ColumnSortFn`) is passed straight to TanStack as the column's `sortFn` by `mapColumns` only when set, so it needs no registration.
  `filter/index.ts` is only side-effect imports that register `forge-select` and `forge-text-field`; it is
  a directory so the `./*` export pattern can resolve it as `@tylertech/forge-table/data-table/features/filter`.
- Cell selection is the `cell-selection` boolean (`cellSelection`) on the element, backed by TanStack's `cellSelectionFeature`, and is independent of `rowSelection`. The state is a list of ranges (anchor and focus corner as row and column ids),
  held by `CellSelectionController` (`features/cell-selection.ts`, which owns everything below that is not TanStack's) and reported through `forge-data-table-cell-select` (detail: that list; not fired when it stays empty, e.g. TanStack's reset when `dataSource` rows change, which also clears the selection). Each selectable `<td>` binds
  TanStack's `getSelectionStartHandler` (`mousedown`, primary button only) and `getSelectionExtendHandler` (`mouseenter`, for drags); the handlers read the table's atoms, which only sync to the controller's state on render, so a
  `mouseenter` dispatched in the same tick as the `mousedown` is ignored (await `updateComplete` between them in tests). Which cells are selectable is `cell.getCanSelect()`: `mapColumns` sets the TanStack column `enableCellSelection: false` for columns that are
  `editable` or `stopRowClickPropagation` (their content is interactive, which includes the expander column) unless the column sets its own `enableCellSelection`, and `prependSelectColumn` does the same for the row selection column.
  `ColumnDef.enableCellSelection` (`boolean | (cell) => boolean`) and the element's `enableCellSelection` property (same type, default `true`, only read while `cellSelection` is on) are both resolved by `CellSelectionController.canSelect`, which is what the element hands TanStack as its table option. The column value (kept in `meta.enableCellSelection`, since TanStack's own column flag is boolean only and `true` there does not beat a table `false`) wins over the element's when set; only a static `false` is also mirrored to TanStack's column flag so select-all and counts skip it. The selection tint and outline are drawn by `td::after`
  (`cell-selected` plus `selection-top/right/bottom/left` classes from `getSelectionEdges()`, only the range's outer sides are outlined, so the anchor cell has no outline of its own inside a range) so they layer over striped, hover and pinned backgrounds; the overlay extends one border width past the cell (the tint is clipped back to the cell) so the outline covers the cell borders and a bordered table's collapsed borders instead of being cut by them. With the option on, the `<table>` gets `role="grid"` and
  `aria-multiselectable`, and cells get `aria-selected`. Keyboard: cells use a roving `tabindex` (`CellSelectionController.tabStopId`: the anchor cell, else the first selectable cell of the first row). Arrow keys call `moveCellSelection` and then focus the new tab stop in `updated()`
  (a pending flag the controller acts on in `hostUpdated`; with `virtualized` it scrolls the row into view first and retries on the next update), Shift+arrow `extendCellSelection`, Ctrl/Cmd+A `selectAllCells`, Escape `resetCellSelection(true)`. A cell focused with no selection selects itself.
  `selectCellRange(range, options?)` is the public wrapper for TanStack's `table.selectCellRange` (modes `replace`, `include`, `exclude`; types re-exported from `data-table.ts`). It goes through the same `onCellSelectionChange` path, so it emits
  `forge-data-table-cell-select`, and it is a no-op while `cellSelection` is off or before the first render (it uses `#table`). TanStack does not validate the ids, and the selection is cleared when the rows change.
  `getSelectedCellRangesData()` wraps TanStack's method of the same name (a `[region][row][column]` grid of accessor values in displayed order). The table's atoms only pick up `_cellSelection` on render, so it first calls `performUpdate()` when an update
  is pending (and the element has rendered once); without that, a call from a `forge-data-table-cell-select` listener, or right after `selectCellRange`, returns the previous selection.
  While a drag is held, `features/cell-selection-autoscroll.ts` (`CellSelectionAutoScroller`, started from the controller's `onCellMouseDown`) runs a `requestAnimationFrame` loop that scrolls `.table-container` when the pointer is within `AUTO_SCROLL_EDGE_SIZE` of
  (or beyond) an edge, faster the closer it gets, and ends on `mouseup` or a `mousemove` with no buttons pressed. `mouseenter` does not fire for the cell that scrolls under an idle pointer or while the pointer is outside the table, so on those frames the loop
  hit-tests a point clamped to the scrollable area (inside the pinned columns and fixed header, see the controller's `#getStickyInsets`) and calls that cell's `getSelectionExtendHandler`; body cells carry `data-row-id` and `data-column-id` for the lookup. Only
  `.table-container` scrolls, so vertical auto-scroll needs it to overflow vertically (`virtualized` with a constrained height).
  Cells set `user-select: none`, so native text copy is unavailable on them. Instead, Ctrl/Cmd+C in the controller's `onCellKeydown` passes `getSelectedCellRangesData()` to the element's `getSelectionClipboardValue` property (default `buildSelectionCsv` in
  `csv-export.ts`: the rows of every region one after another, same escaping as `exportToCsv`) and writes the result with `navigator.clipboard.writeText`. Nothing happens, and the key is not prevented, when no cells are selected. Failed clipboard writes are ignored.
- `src/lib/column-menu/` — `forge-data-table-column-menu`, an icon button + `forge-menu` of actions for one column.
  Takes the TanStack `column` and `table` as properties; right-clicking a header cell calls its `openMenu()` (and prevents the browser menu), so the column menu is also the context menu, and columns are unhidden through `showColumn`, `columnVisibility` or the toolbar's `columns` button; sort, move, hide and pin (to the start) are applied directly, while
  rename (offered when `ColumnDef.renamable` is set and the header is a string) and maximize only dispatch `forge-data-table-column-menu-action` (every action dispatches it). It assigns `forge-menu`'s `options` in
  `firstUpdated` because `forge-menu` drops an `options` value that Lit sets during the first render.
  The data table owns renaming, in `ColumnRenameController` (`features/column-rename.ts`): `ColumnDef.renamable` (carried as `meta.renamable`) opts a column in, the action swaps the header text for an inline native text input (Enter or blur commits,
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
  The title slot labels the table: the toolbar adds its slotted `slot="title"` elements (the light DOM children, resynced on `slotchange`) to the data table host's native `ariaLabelledByElements`. The `.title` div in the toolbar's shadow root is not used, because an element reference must point into the host's own scope or an ancestor's. It is removed again when the toolbar disconnects or connects to another table.
- `src/lib/table-caption/` — `forge-data-table-caption`, a note or caption shown alongside a data table in a single unnamed slot. Connected like the toolbar (`table` id looked up in the caption's root node, or `tableElement`). It makes its content the table's accessible description by adding itself to the data table host's native `ariaDescribedByElements`, and removes itself on disconnect and when `table`/`tableElement` changes, leaving other captions on the same table in the list.
- Accessibility semantics: the table or grid role is on the `forge-data-table` **host**, so `aria-labelledby`, `aria-describedby` and the `aria*Elements` properties work on it directly (the toolbar and caption use them). `HostSemantics.updateRole` (`features/host-semantics.ts`, which also keeps the host's custom states in sync) sets `role` as an attribute, `grid` while `cellSelection` is on and `table` otherwise, and leaves a `role` the consumer set alone; it is an attribute, not `ElementInternals.role`, because axe cannot see internals roles and reports `aria-required-parent` on every `rowgroup`. `aria-multiselectable` is on `ElementInternals`. The inner `<table>` is `role="presentation"`, which also strips the implicit roles of its descendants, so every `thead`/`tbody`/`tfoot` (`rowgroup`), `tr` (`row`), `th` (`columnheader`) and `td` (`cell`, or `gridcell` while `cellSelection` is on, via `getCellRole` in `features/cell-selection.ts`; the empty state takes it as `cellRole`) carries an explicit `role`. A new table element in a template needs one too. Tests read the computed role, name and description from Chromium's accessibility tree through `getTableAccessibility()` in `src/testing/accessibility.ts`, which has to request the test iframe's frame (`Page.getFrameTree`) because the top frame's tree does not contain it.
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
