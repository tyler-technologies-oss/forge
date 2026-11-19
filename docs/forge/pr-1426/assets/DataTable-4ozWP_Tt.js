import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-ZJ8aMbiH.js";import{a as r}from"./chunk-W22LQPXL-GAEDUBbC.js";import{h as i,n as a,p as o,u as s}from"./blocks-Caw44hWB.js";import{n as c,t as l}from"./CustomArgTypes-ir3Vf9C1.js";import{C as u,D as d,E as f,S as p,T as m,_ as h,a as g,b as _,c as v,d as y,f as b,g as x,h as S,i as C,l as w,m as T,n as E,o as D,p as O,r as k,s as A,t as j,u as M,v as N,w as P,x as F,y as I}from"./DataTable.stories-BygFqvTh.js";function L(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(s,{of:w}),`
`,(0,z.jsx)(o,{}),`
`,(0,z.jsx)(n.p,{children:`The Data Table component provides a powerful and flexible way to display and interact with tabular data.
It supports features such as sorting, filtering, column resizing and reordering, row selection, and more.`}),`
`,(0,z.jsx)(n.h2,{id:`features`,children:`Features`}),`
`,(0,z.jsxs)(n.ul,{children:[`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Sorting`}),`: Click on column headers to sort data`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Filtering`}),`: Apply filters to columns to narrow down displayed data`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Resizing`}),`: Adjust column widths by dragging column dividers`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Reordering`}),`: Drag and drop columns to rearrange them`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Row Selection`}),`: Select single or multiple rows`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Row Clicking`}),`: Respond to row click events`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Toolbar`}),`: Show and hide columns, export to CSV, print, and toggle filtering or row selection`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Column Visibility`}),`: Right-click headers to open a column menu or control visibility programmatically`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Cell Templates`}),`: Render badges, links, meters, ratings, action buttons, inputs, or your own content in a cell`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Aggregation`}),`: Show sums, averages, counts, ranges, or custom results in a footer`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Row Grouping`}),`: Group rows by one or more columns, with group totals and a checkbox that selects a whole group`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Column Renaming`}),`: Let users rename column headers`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Formatters`}),`: Format numbers, currency, and dates, or transform values with a function`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Styling Options`}),`: Apply various styling options like striped rows, hover effects, and more`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Virtualization`}),`: Efficiently handle large datasets with row virtualization for improved performance`]}),`
`,(0,z.jsxs)(n.li,{children:[(0,z.jsx)(n.strong,{children:`Fixed Headers`}),`: Keep column headers visible while scrolling through large datasets`]}),`
`]}),`
`,(0,z.jsx)(n.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,z.jsx)(a,{of:C}),`
`,(0,z.jsx)(n.h2,{id:`interactive-table`,children:`Interactive Table`}),`
`,(0,z.jsx)(n.p,{children:`This example showcases a fully interactive table with sorting, filtering, resizing, and row selection enabled:`}),`
`,(0,z.jsx)(a,{of:h}),`
`,(0,z.jsx)(n.h2,{id:`toolbar`,children:`Toolbar`}),`
`,(0,z.jsxs)(n.p,{children:[`Add a `,(0,z.jsx)(n.code,{children:`forge-data-table-toolbar`}),` above the table and connect it by setting `,(0,z.jsx)(n.code,{children:`table`}),` to the id of the data table.
The `,(0,z.jsx)(n.code,{children:`features`}),` attribute picks the icon buttons to show: `,(0,z.jsx)(n.code,{children:`columns`}),` (show and hide columns), `,(0,z.jsx)(n.code,{children:`export`}),` (download as CSV),
`,(0,z.jsx)(n.code,{children:`filter`}),` (toggle column filters), `,(0,z.jsx)(n.code,{children:`print`}),`, and `,(0,z.jsx)(n.code,{children:`select`}),` (toggle row selection). Use the `,(0,z.jsx)(n.code,{children:`title`}),` slot for the table's title.`]}),`
`,(0,z.jsx)(a,{of:m}),`
`,(0,z.jsx)(n.h2,{id:`sortable-table`,children:`Sortable Table`}),`
`,(0,z.jsx)(n.p,{children:`Enable sorting by clicking on column headers:`}),`
`,(0,z.jsx)(a,{of:P}),`
`,(0,z.jsx)(n.h2,{id:`row-selection`,children:`Row Selection`}),`
`,(0,z.jsx)(n.p,{children:`Enable row selection with checkbox column:`}),`
`,(0,z.jsx)(a,{of:u}),`
`,(0,z.jsx)(n.h2,{id:`column-visibility`,children:`Column Visibility`}),`
`,(0,z.jsx)(n.p,{children:`Right-click any column header to open the column visibility menu. This example hides a column by default and prevents another column from being hidden:`}),`
`,(0,z.jsx)(a,{of:D}),`
`,(0,z.jsx)(n.h2,{id:`compact-and-bordered-table`,children:`Compact and Bordered Table`}),`
`,(0,z.jsx)(n.p,{children:`Apply compact and bordered styling for a denser, more defined table:`}),`
`,(0,z.jsx)(a,{of:A}),`
`,(0,z.jsx)(n.h2,{id:`expandable-rows`,children:`Expandable Rows`}),`
`,(0,z.jsx)(n.p,{children:`Enable expandable rows to show additional details:`}),`
`,(0,z.jsxs)(n.p,{children:[`Use the exported `,(0,z.jsx)(n.code,{children:`createExpanderColumn()`}),` helper to add the toggle column, then set `,(0,z.jsx)(n.code,{children:`expandable`}),` to `,(0,z.jsx)(n.code,{children:`true`}),` and provide slotted row content.`]}),`
`,(0,z.jsx)(a,{of:O}),`
`,(0,z.jsx)(n.h2,{id:`virtualized-table`,children:`Virtualized Table`}),`
`,(0,z.jsx)(n.p,{children:`Enable row virtualization for efficiently handling large datasets with improved performance:`}),`
`,(0,z.jsx)(a,{of:f}),`
`,(0,z.jsx)(n.h2,{id:`fixed-headers-table`,children:`Fixed Headers Table`}),`
`,(0,z.jsx)(n.p,{children:`Enable fixed headers to keep column headers visible while scrolling through large datasets:`}),`
`,(0,z.jsx)(a,{of:T}),`
`,(0,z.jsx)(n.h2,{id:`cell-templates`,children:`Cell Templates`}),`
`,(0,z.jsxs)(n.p,{children:[`By default a cell shows its value as text. Set a column's `,(0,z.jsx)(n.code,{children:`template`}),` to change how the cell renders. The package exports helpers
that create common templates, and you can write your own. Each example below shows its column definitions under `,(0,z.jsx)(n.strong,{children:`Show code`}),`.`]}),`
`,(0,z.jsx)(n.h3,{id:`badge`,children:`Badge`}),`
`,(0,z.jsx)(a,{of:k}),`
`,(0,z.jsx)(n.h3,{id:`link`,children:`Link`}),`
`,(0,z.jsx)(a,{of:N}),`
`,(0,z.jsx)(n.h3,{id:`meter`,children:`Meter`}),`
`,(0,z.jsx)(a,{of:I}),`
`,(0,z.jsx)(n.h3,{id:`rating`,children:`Rating`}),`
`,(0,z.jsx)(a,{of:F}),`
`,(0,z.jsx)(n.h3,{id:`actions`,children:`Actions`}),`
`,(0,z.jsx)(a,{of:j}),`
`,(0,z.jsx)(n.h3,{id:`editable`,children:`Editable`}),`
`,(0,z.jsx)(a,{of:M}),`
`,(0,z.jsx)(n.h3,{id:`custom`,children:`Custom`}),`
`,(0,z.jsx)(a,{of:v}),`
`,(0,z.jsx)(n.h2,{id:`formatters`,children:`Formatters`}),`
`,(0,z.jsxs)(n.p,{children:[`Set a column's `,(0,z.jsx)(n.code,{children:`format`}),` to transform the value that is displayed, exported and printed, without changing the underlying data.`]}),`
`,(0,z.jsx)(a,{of:S}),`
`,(0,z.jsx)(n.h2,{id:`empty-state`,children:`Empty State`}),`
`,(0,z.jsx)(n.p,{children:`A table with no rows shows a message. When a filter is what removed the rows, the message says so and offers a button to clear the filters.`}),`
`,(0,z.jsx)(a,{of:y}),`
`,(0,z.jsx)(a,{of:b}),`
`,(0,z.jsx)(n.h2,{id:`aggregation`,children:`Aggregation`}),`
`,(0,z.jsxs)(n.p,{children:[`Set a column's `,(0,z.jsx)(n.code,{children:`aggregate`}),` to show a calculated value in the footer. The built-in aggregations are `,(0,z.jsx)(n.code,{children:`sum`}),`, `,(0,z.jsx)(n.code,{children:`mean`}),`, `,(0,z.jsx)(n.code,{children:`median`}),`, `,(0,z.jsx)(n.code,{children:`min`}),`,
`,(0,z.jsx)(n.code,{children:`max`}),`, `,(0,z.jsx)(n.code,{children:`extent`}),`, `,(0,z.jsx)(n.code,{children:`count`}),`, `,(0,z.jsx)(n.code,{children:`uniqueCount`}),`, `,(0,z.jsx)(n.code,{children:`unique`}),`, `,(0,z.jsx)(n.code,{children:`first`}),` and `,(0,z.jsx)(n.code,{children:`last`}),`. The aggregates are calculated over the filtered rows.`]}),`
`,(0,z.jsx)(a,{of:E}),`
`,(0,z.jsx)(n.h2,{id:`row-grouping`,children:`Row Grouping`}),`
`,(0,z.jsxs)(n.p,{children:[`Set `,(0,z.jsx)(n.code,{children:`grouping`}),` to the ids of the columns to group the rows by, or set `,(0,z.jsx)(n.code,{children:`groupable`}),` to let users group from the column menu. Groups are collapsed until
they are expanded, and the grouped columns move to the start of the table, after the selection column.`]}),`
`,(0,z.jsx)(a,{of:p}),`
`,(0,z.jsx)(n.h3,{id:`nested-groups-and-selection`,children:`Nested groups and selection`}),`
`,(0,z.jsx)(a,{of:_}),`
`,(0,z.jsx)(n.h3,{id:`group-aggregation`,children:`Group aggregation`}),`
`,(0,z.jsxs)(n.p,{children:[`Group rows show the `,(0,z.jsx)(n.code,{children:`aggregate`}),` of each column that sets one, calculated over the rows in the group.`]}),`
`,(0,z.jsx)(a,{of:x}),`
`,(0,z.jsx)(n.h2,{id:`column-renaming`,children:`Column Renaming`}),`
`,(0,z.jsx)(a,{of:g}),`
`,(0,z.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,z.jsx)(l,{})]})}function R(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,z.jsx)(n,{...e,children:(0,z.jsx)(L,{...e})}):L(e)}var z;function B(){return(B=e((()=>{z=r(),n(),i(),c(),d()})))()}B();export{R as default};