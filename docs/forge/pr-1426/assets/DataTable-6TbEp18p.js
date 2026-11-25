import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-ZJ8aMbiH.js";import{a as r}from"./chunk-W22LQPXL-GAEDUBbC.js";import{h as i,n as a,p as o,u as s}from"./blocks-HzwEWNd2.js";import{n as c,t as l}from"./CustomArgTypes-DVmHtJnd.js";import{A as u,C as d,D as f,E as p,F as m,M as h,N as g,O as _,P as v,S as y,T as b,_ as x,a as S,b as C,c as w,d as T,f as E,g as D,h as O,i as k,j as A,k as j,l as M,m as N,n as P,o as F,p as I,r as L,s as R,t as z,u as B,v as V,w as H,x as U,y as W}from"./DataTable.stories-ChZH46s_.js";function G(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(s,{of:B}),`
`,(0,q.jsx)(o,{}),`
`,(0,q.jsx)(n.p,{children:`The Data Table component provides a powerful and flexible way to display and interact with tabular data.
It supports features such as sorting, filtering, column resizing and reordering, row selection, and more.`}),`
`,(0,q.jsx)(n.h2,{id:`features`,children:`Features`}),`
`,(0,q.jsxs)(n.ul,{children:[`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Sorting`}),`: Click on column headers to sort data`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Filtering`}),`: Apply filters to columns to narrow down displayed data`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Resizing`}),`: Adjust column widths by dragging column dividers`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Reordering`}),`: Drag and drop columns to rearrange them`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Row Selection`}),`: Select single or multiple rows`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Row Clicking`}),`: Click anywhere on a row to select it, expand it, or run its default action`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Toolbar`}),`: Show and hide columns, export to CSV, print, and toggle filtering or row selection`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Column Visibility`}),`: Right-click headers to open a column menu or control visibility programmatically`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Cell Templates`}),`: Render badges, links, meters, ratings, action buttons, inputs, or your own content in a cell`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Aggregation`}),`: Show sums, averages, counts, ranges, or custom results in a footer`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Row Grouping`}),`: Group rows by one or more columns, with group totals and a checkbox that selects a whole group`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Column Renaming`}),`: Let users rename column headers`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Formatters`}),`: Format numbers, currency, and dates, or transform values with a function`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Styling Options`}),`: Apply various styling options like striped rows, hover effects, and more`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Virtualization`}),`: Efficiently handle large datasets with row virtualization for improved performance`]}),`
`,(0,q.jsxs)(n.li,{children:[(0,q.jsx)(n.strong,{children:`Fixed Headers`}),`: Keep column headers visible while scrolling through large datasets`]}),`
`]}),`
`,(0,q.jsx)(n.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,q.jsx)(a,{of:S}),`
`,(0,q.jsx)(n.h2,{id:`interactive-table`,children:`Interactive Table`}),`
`,(0,q.jsx)(n.p,{children:`This example showcases a fully interactive table with sorting, filtering, resizing, and row selection enabled:`}),`
`,(0,q.jsx)(a,{of:C}),`
`,(0,q.jsx)(n.h2,{id:`toolbar`,children:`Toolbar`}),`
`,(0,q.jsxs)(n.p,{children:[`Add a `,(0,q.jsx)(n.code,{children:`forge-data-table-toolbar`}),` above the table and connect it by setting `,(0,q.jsx)(n.code,{children:`table`}),` to the id of the data table.
The `,(0,q.jsx)(n.code,{children:`features`}),` attribute picks the icon buttons to show: `,(0,q.jsx)(n.code,{children:`columns`}),` (show and hide columns), `,(0,q.jsx)(n.code,{children:`export`}),` (download as CSV),
`,(0,q.jsx)(n.code,{children:`filter`}),` (toggle column filters), `,(0,q.jsx)(n.code,{children:`print`}),`, and `,(0,q.jsx)(n.code,{children:`select`}),` (toggle row selection). Use the `,(0,q.jsx)(n.code,{children:`title`}),` slot for the table's title.`]}),`
`,(0,q.jsx)(a,{of:g}),`
`,(0,q.jsx)(n.h2,{id:`sortable-table`,children:`Sortable Table`}),`
`,(0,q.jsx)(n.p,{children:`Enable sorting by clicking on column headers:`}),`
`,(0,q.jsx)(a,{of:j}),`
`,(0,q.jsx)(n.h2,{id:`row-selection`,children:`Row Selection`}),`
`,(0,q.jsx)(n.p,{children:`Enable row selection with checkbox column:`}),`
`,(0,q.jsx)(a,{of:_}),`
`,(0,q.jsx)(n.h2,{id:`row-clicking`,children:`Row Clicking`}),`
`,(0,q.jsxs)(n.p,{children:[`Set `,(0,q.jsx)(n.code,{children:`allow-row-click`}),` to let users click anywhere on a row instead of aiming for a checkbox, a toggle or a button. A row is only clickable when
there is something for the click to do, so it only gets the clickable styles and click handling when it:`]}),`
`,(0,q.jsxs)(n.ol,{children:[`
`,(0,q.jsxs)(n.li,{children:[`contains an element with a `,(0,q.jsx)(n.code,{children:`forge-default-action`}),` attribute,`]}),`
`,(0,q.jsxs)(n.li,{children:[`can be selected (`,(0,q.jsx)(n.code,{children:`rowSelection`}),` is `,(0,q.jsx)(n.code,{children:`single`}),` or `,(0,q.jsx)(n.code,{children:`multiple`}),`), or`]}),`
`,(0,q.jsxs)(n.li,{children:[`can be expanded (`,(0,q.jsx)(n.code,{children:`expandable`}),`).`]}),`
`]}),`
`,(0,q.jsxs)(n.p,{children:[`Clicking a clickable row dispatches `,(0,q.jsx)(n.code,{children:`forge-data-table-row-click`}),` (detail: `,(0,q.jsx)(n.code,{children:`data`}),` and `,(0,q.jsx)(n.code,{children:`index`}),`), then does the first of these that applies:`]}),`
`,(0,q.jsxs)(n.ol,{children:[`
`,(0,q.jsxs)(n.li,{children:[`Clicks the element with `,(0,q.jsx)(n.code,{children:`forge-default-action`}),`.`]}),`
`,(0,q.jsx)(n.li,{children:`Selects the row, or deselects it when it is already selected.`}),`
`,(0,q.jsx)(n.li,{children:`Expands the row, or collapses it when it is already expanded.`}),`
`]}),`
`,(0,q.jsx)(n.p,{children:`Rows that match none of the above, and group rows, get no pointer cursor, no state layer and no event.
Clickable rows show a Forge state layer, which is CSS only, when hovered or pressed.`}),`
`,(0,q.jsx)(a,{of:p}),`
`,(0,q.jsx)(a,{of:b}),`
`,(0,q.jsx)(n.h3,{id:`default-action`,children:`Default action`}),`
`,(0,q.jsxs)(n.p,{children:[`Add a `,(0,q.jsx)(n.code,{children:`forge-default-action`}),` attribute to the element in a row that should run when the row is clicked, such as a link to the record or an edit button.
It can be in a cell template or in content slotted into a cell with `,(0,q.jsx)(n.code,{children:`useTemplateSlot`}),`. If a row has more than one, the first one is used.
It takes precedence over selecting and expanding the row.`]}),`
`,(0,q.jsx)(n.pre,{children:(0,q.jsx)(n.code,{className:`language-ts`,children:`const columns: ColumnDef<Employee>[] = [
  {
    header: 'Name',
    property: 'name',
    template: ({ row }) => html\`<a href=\${\`/employees/\${row.original.id}\`} forge-default-action>\${row.original.name}</a>\`
  }
];
`})}),`
`,(0,q.jsxs)(n.p,{children:[`For action buttons, set `,(0,q.jsx)(n.code,{children:`defaultAction`}),` on a button config of `,(0,q.jsx)(n.code,{children:`actionCell()`}),` instead (see `,(0,q.jsx)(n.a,{href:`#actions`,children:`Actions`}),`).`]}),`
`,(0,q.jsx)(a,{of:P}),`
`,(0,q.jsx)(n.h3,{id:`accessibility`,children:`Accessibility`}),`
`,(0,q.jsxs)(n.p,{children:[`A clicked row is a convenience for pointer users. The row itself is not focusable and has no role, so every action it triggers must also be reachable
by keyboard and screen reader: the selection checkbox, the expand toggle, and the element with `,(0,q.jsx)(n.code,{children:`forge-default-action`}),`. Make sure that element is a
real control, such as a link or a button, with an accessible name.`]}),`
`,(0,q.jsxs)(n.p,{children:[`Clicks that land on interactive content in a row (links, buttons, form controls, checkboxes) are left to that content and do not trigger the row click.
Set `,(0,q.jsx)(n.code,{children:`stopRowClickPropagation`}),` on a column to also ignore clicks anywhere in its cells.`]}),`
`,(0,q.jsx)(n.h2,{id:`column-visibility`,children:`Column Visibility`}),`
`,(0,q.jsx)(n.p,{children:`Right-click any column header to open the column visibility menu. This example hides a column by default and prevents another column from being hidden:`}),`
`,(0,q.jsx)(a,{of:R}),`
`,(0,q.jsx)(n.h2,{id:`compact-and-bordered-table`,children:`Compact and Bordered Table`}),`
`,(0,q.jsx)(n.p,{children:`Apply compact and bordered styling for a denser, more defined table:`}),`
`,(0,q.jsx)(a,{of:w}),`
`,(0,q.jsx)(n.h2,{id:`expandable-rows`,children:`Expandable Rows`}),`
`,(0,q.jsxs)(n.p,{children:[`Set `,(0,q.jsx)(n.code,{children:`expandable`}),` to `,(0,q.jsx)(n.code,{children:`true`}),` to add a toggle column. Expanding a row shows its content in a full-width row below it. Where that content comes from depends on how the table is configured:`]}),`
`,(0,q.jsxs)(n.ul,{children:[`
`,(0,q.jsxs)(n.li,{children:[`With no `,(0,q.jsx)(n.code,{children:`getSubRows`}),` or `,(0,q.jsx)(n.code,{children:`getRowHasDetail`}),`, every row expands, and its content is whatever you put in its `,(0,q.jsx)(n.code,{children:`expanded:row-<id>`}),` slot.`]}),`
`,(0,q.jsxs)(n.li,{children:[`With `,(0,q.jsx)(n.code,{children:`getSubRows`}),`, a row that has sub rows expands to show them.`]}),`
`,(0,q.jsxs)(n.li,{children:[`With `,(0,q.jsx)(n.code,{children:`getRowHasDetail`}),`, a row that returns `,(0,q.jsx)(n.code,{children:`true`}),` expands to show its detail. The detail is the element returned by `,(0,q.jsx)(n.code,{children:`getRowDetail`}),`, or, when `,(0,q.jsx)(n.code,{children:`getRowDetail`}),` is not set, the content in the row's slot.`]}),`
`,(0,q.jsxs)(n.li,{children:[`A row with content in its slot always expands, whatever `,(0,q.jsx)(n.code,{children:`getRowHasDetail`}),` returns for it.`]}),`
`]}),`
`,(0,q.jsxs)(n.p,{children:[`Rows that cannot expand have no toggle. Double-clicking a row that can expand, or clicking it when `,(0,q.jsx)(n.code,{children:`allowRowClick`}),` is set, toggles it too.`]}),`
`,(0,q.jsx)(a,{of:x}),`
`,(0,q.jsx)(n.h3,{id:`sub-rows`,children:`Sub rows`}),`
`,(0,q.jsxs)(n.p,{children:[`Set `,(0,q.jsx)(n.code,{children:`getSubRows`}),` to return the child rows of a row, or `,(0,q.jsx)(n.code,{children:`undefined`}),` when it has none. The sub rows are rendered as ordinary rows, right after their parent.`]}),`
`,(0,q.jsx)(a,{of:h}),`
`,(0,q.jsx)(n.h3,{id:`detail-rows`,children:`Detail rows`}),`
`,(0,q.jsxs)(n.p,{children:[`Set `,(0,q.jsx)(n.code,{children:`getRowHasDetail`}),` to choose which rows have a detail, and `,(0,q.jsx)(n.code,{children:`getRowDetail`}),` to create its content. `,(0,q.jsx)(n.code,{children:`getRowDetail`}),` returns an element, and is called once each time the row is expanded rather than on every render.`]}),`
`,(0,q.jsx)(a,{of:T}),`
`,(0,q.jsx)(n.p,{children:`A row can have both sub rows and a detail. The detail row comes first, followed by the sub rows.`}),`
`,(0,q.jsx)(n.h3,{id:`detail-rows-in-slots`,children:`Detail rows in slots`}),`
`,(0,q.jsxs)(n.p,{children:[`To write the content as markup instead, put it in the `,(0,q.jsx)(n.code,{children:`expanded:row-<id>`}),` slot of the table. `,(0,q.jsx)(n.code,{children:`<id>`}),` is the id of the row, which is its index in the data unless the table uses another row id. The slotted element stays in your own DOM, so your styles, templates and event listeners apply to it.`]}),`
`,(0,q.jsx)(a,{of:I}),`
`,(0,q.jsxs)(n.p,{children:[`Slotted content and `,(0,q.jsx)(n.code,{children:`getRowDetail`}),` can be combined. A row with slotted content expands even when `,(0,q.jsx)(n.code,{children:`getRowHasDetail`}),` is `,(0,q.jsx)(n.code,{children:`false`}),` for it, or when it does not have one at all, and the table adds and removes toggles as slotted content comes and goes. When a row has both, `,(0,q.jsx)(n.code,{children:`getRowDetail`}),` wins.`]}),`
`,(0,q.jsx)(a,{of:E}),`
`,(0,q.jsxs)(n.p,{children:[`Detail rows are not rendered when `,(0,q.jsx)(n.code,{children:`virtualized`}),` is set.`]}),`
`,(0,q.jsx)(n.h2,{id:`slotted-cells`,children:`Slotted Cells`}),`
`,(0,q.jsxs)(n.p,{children:[`To write the content of a cell as markup, put an element in the `,(0,q.jsx)(n.code,{children:`col-<id>:row-<id>`}),` slot of the table, where `,(0,q.jsx)(n.code,{children:`<id>`}),` is the id of the column and then the id of the row (its index in the data unless the table uses another row id). The slotted element stays in your own DOM, so your styles, templates and event listeners apply to it.`]}),`
`,(0,q.jsx)(n.pre,{children:(0,q.jsx)(n.code,{className:`language-html`,children:`<forge-data-table>
  <forge-button slot="col-actions:row-0">Edit</forge-button>
</forge-data-table>
`})}),`
`,(0,q.jsxs)(n.p,{children:[`A cell with slotted content shows it instead of its value, and shows its value again when the content is removed. Slotted content also takes precedence over what the column renders, including columns that set `,(0,q.jsx)(n.code,{children:`useTemplateSlot`}),` or a `,(0,q.jsx)(n.code,{children:`template`}),`. Group rows do not show slotted cells.`]}),`
`,(0,q.jsx)(n.h2,{id:`virtualized-table`,children:`Virtualized Table`}),`
`,(0,q.jsx)(n.p,{children:`Enable row virtualization for efficiently handling large datasets with improved performance:`}),`
`,(0,q.jsx)(a,{of:v}),`
`,(0,q.jsx)(n.h2,{id:`sticky-header`,children:`Sticky Header`}),`
`,(0,q.jsxs)(n.p,{children:[`Set `,(0,q.jsx)(n.code,{children:`sticky-header`}),` to keep the column headers visible while scrolling through large datasets:`]}),`
`,(0,q.jsx)(a,{of:A}),`
`,(0,q.jsx)(n.h2,{id:`sticky-footer`,children:`Sticky Footer`}),`
`,(0,q.jsxs)(n.p,{children:[`Set `,(0,q.jsx)(n.code,{children:`sticky-footer`}),` to keep the footer row visible while scrolling. It only applies when a column defines a `,(0,q.jsx)(n.code,{children:`footer`}),`:`]}),`
`,(0,q.jsx)(a,{of:u}),`
`,(0,q.jsx)(n.h2,{id:`cell-templates`,children:`Cell Templates`}),`
`,(0,q.jsxs)(n.p,{children:[`By default a cell shows its value as text. Set a column's `,(0,q.jsx)(n.code,{children:`template`}),` to change how the cell renders. The package exports helpers
that create common templates, and you can write your own. Each example below shows its column definitions under `,(0,q.jsx)(n.strong,{children:`Show code`}),`.`]}),`
`,(0,q.jsx)(n.h3,{id:`badge`,children:`Badge`}),`
`,(0,q.jsx)(a,{of:k}),`
`,(0,q.jsx)(n.h3,{id:`link`,children:`Link`}),`
`,(0,q.jsx)(a,{of:U}),`
`,(0,q.jsx)(n.h3,{id:`meter`,children:`Meter`}),`
`,(0,q.jsx)(a,{of:y}),`
`,(0,q.jsx)(n.h3,{id:`rating`,children:`Rating`}),`
`,(0,q.jsx)(a,{of:H}),`
`,(0,q.jsx)(n.h3,{id:`actions`,children:`Actions`}),`
`,(0,q.jsx)(a,{of:z}),`
`,(0,q.jsxs)(n.p,{children:[(0,q.jsx)(n.code,{children:`actionCell()`}),` takes an array of button configs (`,(0,q.jsx)(n.code,{children:`ActionButtonConfig`}),`):`]}),`
`,(0,q.jsxs)(n.table,{children:[(0,q.jsx)(n.thead,{children:(0,q.jsxs)(n.tr,{children:[(0,q.jsx)(n.th,{children:`Property`}),(0,q.jsx)(n.th,{children:`Type`}),(0,q.jsx)(n.th,{children:`Description`})]})}),(0,q.jsxs)(n.tbody,{children:[(0,q.jsxs)(n.tr,{children:[(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`text`})}),(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`string | (row) => string`})}),(0,q.jsx)(n.td,{children:`The label of a text button, or the tooltip and accessible label of an icon button. A function receives the TanStack row. The accessible name also includes the row name.`})]}),(0,q.jsxs)(n.tr,{children:[(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`icon`})}),(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`string`})}),(0,q.jsx)(n.td,{children:`The name of the icon to show.`})]}),(0,q.jsxs)(n.tr,{children:[(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`type`})}),(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`'icon' | 'button'`})}),(0,q.jsxs)(n.td,{children:[(0,q.jsx)(n.code,{children:`icon`}),` (default) renders an icon button with a tooltip. `,(0,q.jsx)(n.code,{children:`button`}),` renders a text button.`]})]}),(0,q.jsxs)(n.tr,{children:[(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`defaultAction`})}),(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`boolean`})}),(0,q.jsxs)(n.td,{children:[`Marks the button as the default action of the row. When `,(0,q.jsx)(n.code,{children:`allow-row-click`}),` is on, clicking the row clicks this button. Only the first button with `,(0,q.jsx)(n.code,{children:`defaultAction`}),` in a cell is used.`]})]}),(0,q.jsxs)(n.tr,{children:[(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`onClick`})}),(0,q.jsx)(n.td,{children:(0,q.jsx)(n.code,{children:`(row) => void`})}),(0,q.jsx)(n.td,{children:`Called with the TanStack row when the button is clicked, including when the row click triggers it.`})]})]})]}),`
`,(0,q.jsxs)(n.p,{children:[`With `,(0,q.jsx)(n.code,{children:`defaultAction`}),`, a click on the row runs the same `,(0,q.jsx)(n.code,{children:`onClick`}),` as a click on the button. See `,(0,q.jsx)(n.a,{href:`#row-clicking`,children:`Row Clicking`}),`.`]}),`
`,(0,q.jsx)(n.h3,{id:`editable`,children:`Editable`}),`
`,(0,q.jsx)(a,{of:N}),`
`,(0,q.jsx)(n.h3,{id:`custom`,children:`Custom`}),`
`,(0,q.jsx)(a,{of:M}),`
`,(0,q.jsx)(n.h2,{id:`formatters`,children:`Formatters`}),`
`,(0,q.jsxs)(n.p,{children:[`Set a column's `,(0,q.jsx)(n.code,{children:`format`}),` to transform the value that is displayed, exported and printed, without changing the underlying data.`]}),`
`,(0,q.jsx)(a,{of:V}),`
`,(0,q.jsx)(n.h2,{id:`empty-state`,children:`Empty State`}),`
`,(0,q.jsx)(n.p,{children:`A table with no rows shows a message. When a filter is what removed the rows, the message says so and offers a button to clear the filters.`}),`
`,(0,q.jsx)(a,{of:O}),`
`,(0,q.jsx)(a,{of:D}),`
`,(0,q.jsx)(n.h2,{id:`aggregation`,children:`Aggregation`}),`
`,(0,q.jsxs)(n.p,{children:[`Set a column's `,(0,q.jsx)(n.code,{children:`aggregate`}),` to show a calculated value in the footer. The built-in aggregations are `,(0,q.jsx)(n.code,{children:`sum`}),`, `,(0,q.jsx)(n.code,{children:`mean`}),`, `,(0,q.jsx)(n.code,{children:`median`}),`, `,(0,q.jsx)(n.code,{children:`min`}),`,
`,(0,q.jsx)(n.code,{children:`max`}),`, `,(0,q.jsx)(n.code,{children:`extent`}),`, `,(0,q.jsx)(n.code,{children:`count`}),`, `,(0,q.jsx)(n.code,{children:`uniqueCount`}),`, `,(0,q.jsx)(n.code,{children:`unique`}),`, `,(0,q.jsx)(n.code,{children:`first`}),` and `,(0,q.jsx)(n.code,{children:`last`}),`. The aggregates are calculated over the filtered rows.`]}),`
`,(0,q.jsx)(a,{of:L}),`
`,(0,q.jsx)(n.h2,{id:`row-grouping`,children:`Row Grouping`}),`
`,(0,q.jsxs)(n.p,{children:[`Set `,(0,q.jsx)(n.code,{children:`grouping`}),` to the ids of the columns to group the rows by, or set `,(0,q.jsx)(n.code,{children:`groupable`}),` to let users group from the column menu. Groups are collapsed until
they are expanded, and the grouped columns move to the start of the table, after the selection column.`]}),`
`,(0,q.jsx)(a,{of:f}),`
`,(0,q.jsx)(n.h3,{id:`nested-groups-and-selection`,children:`Nested groups and selection`}),`
`,(0,q.jsx)(a,{of:d}),`
`,(0,q.jsx)(n.h3,{id:`group-aggregation`,children:`Group aggregation`}),`
`,(0,q.jsxs)(n.p,{children:[`Group rows show the `,(0,q.jsx)(n.code,{children:`aggregate`}),` of each column that sets one, calculated over the rows in the group.`]}),`
`,(0,q.jsx)(a,{of:W}),`
`,(0,q.jsx)(n.h2,{id:`column-renaming`,children:`Column Renaming`}),`
`,(0,q.jsx)(a,{of:F}),`
`,(0,q.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,q.jsx)(l,{})]})}function K(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,q.jsx)(n,{...e,children:(0,q.jsx)(G,{...e})}):G(e)}var q;function J(){return(J=e((()=>{q=r(),n(),i(),c(),m()})))()}J();export{K as default};