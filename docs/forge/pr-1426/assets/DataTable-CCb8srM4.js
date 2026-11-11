import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-ZJ8aMbiH.js";import{a as r}from"./chunk-W22LQPXL-GAEDUBbC.js";import{h as i,n as a,p as o,u as s}from"./blocks-DkB5TUuh.js";import{n as c,t as l}from"./CustomArgTypes-Cj47iDkW.js";import{C as u,S as d,_ as f,a as p,b as m,c as h,d as g,f as _,g as v,h as y,i as b,l as x,m as S,n as C,o as w,p as T,r as E,s as D,t as O,u as k,v as A,w as j,x as M,y as N}from"./DataTable.stories-Dam5djo_.js";function P(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(s,{of:x}),`
`,(0,I.jsx)(o,{}),`
`,(0,I.jsx)(n.p,{children:`The Data Table component provides a powerful and flexible way to display and interact with tabular data.
It supports features such as sorting, filtering, column resizing and reordering, row selection, and more.`}),`
`,(0,I.jsx)(n.h2,{id:`features`,children:`Features`}),`
`,(0,I.jsxs)(n.ul,{children:[`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Sorting`}),`: Click on column headers to sort data`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Filtering`}),`: Apply filters to columns to narrow down displayed data`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Resizing`}),`: Adjust column widths by dragging column dividers`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Reordering`}),`: Drag and drop columns to rearrange them`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Row Selection`}),`: Select single or multiple rows`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Row Clicking`}),`: Respond to row click events`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Toolbar`}),`: Show and hide columns, export to CSV, print, and toggle filtering or row selection`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Column Visibility`}),`: Right-click headers to open a column menu or control visibility programmatically`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Cell Templates`}),`: Render badges, links, meters, ratings, action buttons, inputs, or your own content in a cell`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Aggregation`}),`: Show sums, averages, counts, ranges, or custom results in a footer`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Column Renaming`}),`: Let users rename column headers`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Formatters`}),`: Format numbers, currency, and dates, or transform values with a function`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Styling Options`}),`: Apply various styling options like striped rows, hover effects, and more`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Virtualization`}),`: Efficiently handle large datasets with row virtualization for improved performance`]}),`
`,(0,I.jsxs)(n.li,{children:[(0,I.jsx)(n.strong,{children:`Fixed Headers`}),`: Keep column headers visible while scrolling through large datasets`]}),`
`]}),`
`,(0,I.jsx)(n.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,I.jsx)(a,{of:b}),`
`,(0,I.jsx)(n.h2,{id:`interactive-table`,children:`Interactive Table`}),`
`,(0,I.jsx)(n.p,{children:`This example showcases a fully interactive table with sorting, filtering, resizing, and row selection enabled:`}),`
`,(0,I.jsx)(a,{of:v}),`
`,(0,I.jsx)(n.h2,{id:`toolbar`,children:`Toolbar`}),`
`,(0,I.jsxs)(n.p,{children:[`Add a `,(0,I.jsx)(n.code,{children:`forge-data-table-toolbar`}),` above the table and connect it by setting `,(0,I.jsx)(n.code,{children:`table`}),` to the id of the data table.
The `,(0,I.jsx)(n.code,{children:`features`}),` attribute picks the icon buttons to show: `,(0,I.jsx)(n.code,{children:`columns`}),` (show and hide columns), `,(0,I.jsx)(n.code,{children:`export`}),` (download as CSV),
`,(0,I.jsx)(n.code,{children:`filter`}),` (toggle column filters), `,(0,I.jsx)(n.code,{children:`print`}),`, and `,(0,I.jsx)(n.code,{children:`select`}),` (toggle row selection). Use the `,(0,I.jsx)(n.code,{children:`title`}),` slot for the table's title.`]}),`
`,(0,I.jsx)(a,{of:d}),`
`,(0,I.jsx)(n.h2,{id:`sortable-table`,children:`Sortable Table`}),`
`,(0,I.jsx)(n.p,{children:`Enable sorting by clicking on column headers:`}),`
`,(0,I.jsx)(a,{of:M}),`
`,(0,I.jsx)(n.h2,{id:`row-selection`,children:`Row Selection`}),`
`,(0,I.jsx)(n.p,{children:`Enable row selection with checkbox column:`}),`
`,(0,I.jsx)(a,{of:m}),`
`,(0,I.jsx)(n.h2,{id:`column-visibility`,children:`Column Visibility`}),`
`,(0,I.jsx)(n.p,{children:`Right-click any column header to open the column visibility menu. This example hides a column by default and prevents another column from being hidden:`}),`
`,(0,I.jsx)(a,{of:w}),`
`,(0,I.jsx)(n.h2,{id:`compact-and-bordered-table`,children:`Compact and Bordered Table`}),`
`,(0,I.jsx)(n.p,{children:`Apply compact and bordered styling for a denser, more defined table:`}),`
`,(0,I.jsx)(a,{of:D}),`
`,(0,I.jsx)(n.h2,{id:`expandable-rows`,children:`Expandable Rows`}),`
`,(0,I.jsx)(n.p,{children:`Enable expandable rows to show additional details:`}),`
`,(0,I.jsxs)(n.p,{children:[`Use the exported `,(0,I.jsx)(n.code,{children:`createExpanderColumn()`}),` helper to add the toggle column, then set `,(0,I.jsx)(n.code,{children:`expandable`}),` to `,(0,I.jsx)(n.code,{children:`true`}),` and provide slotted row content.`]}),`
`,(0,I.jsx)(a,{of:T}),`
`,(0,I.jsx)(n.h2,{id:`virtualized-table`,children:`Virtualized Table`}),`
`,(0,I.jsx)(n.p,{children:`Enable row virtualization for efficiently handling large datasets with improved performance:`}),`
`,(0,I.jsx)(a,{of:u}),`
`,(0,I.jsx)(n.h2,{id:`fixed-headers-table`,children:`Fixed Headers Table`}),`
`,(0,I.jsx)(n.p,{children:`Enable fixed headers to keep column headers visible while scrolling through large datasets:`}),`
`,(0,I.jsx)(a,{of:S}),`
`,(0,I.jsx)(n.h2,{id:`cell-templates`,children:`Cell Templates`}),`
`,(0,I.jsxs)(n.p,{children:[`By default a cell shows its value as text. Set a column's `,(0,I.jsx)(n.code,{children:`template`}),` to change how the cell renders. The package exports helpers
that create common templates, and you can write your own. Each example below shows its column definitions under `,(0,I.jsx)(n.strong,{children:`Show code`}),`.`]}),`
`,(0,I.jsx)(n.h3,{id:`badge`,children:`Badge`}),`
`,(0,I.jsx)(a,{of:E}),`
`,(0,I.jsx)(n.h3,{id:`link`,children:`Link`}),`
`,(0,I.jsx)(a,{of:f}),`
`,(0,I.jsx)(n.h3,{id:`meter`,children:`Meter`}),`
`,(0,I.jsx)(a,{of:A}),`
`,(0,I.jsx)(n.h3,{id:`rating`,children:`Rating`}),`
`,(0,I.jsx)(a,{of:N}),`
`,(0,I.jsx)(n.h3,{id:`actions`,children:`Actions`}),`
`,(0,I.jsx)(a,{of:O}),`
`,(0,I.jsx)(n.h3,{id:`editable`,children:`Editable`}),`
`,(0,I.jsx)(a,{of:k}),`
`,(0,I.jsx)(n.h3,{id:`custom`,children:`Custom`}),`
`,(0,I.jsx)(a,{of:h}),`
`,(0,I.jsx)(n.h2,{id:`formatters`,children:`Formatters`}),`
`,(0,I.jsxs)(n.p,{children:[`Set a column's `,(0,I.jsx)(n.code,{children:`format`}),` to transform the value that is displayed, exported and printed, without changing the underlying data.`]}),`
`,(0,I.jsx)(a,{of:y}),`
`,(0,I.jsx)(n.h2,{id:`empty-state`,children:`Empty State`}),`
`,(0,I.jsx)(n.p,{children:`A table with no rows shows a message. When a filter is what removed the rows, the message says so and offers a button to clear the filters.`}),`
`,(0,I.jsx)(a,{of:g}),`
`,(0,I.jsx)(a,{of:_}),`
`,(0,I.jsx)(n.h2,{id:`aggregation`,children:`Aggregation`}),`
`,(0,I.jsxs)(n.p,{children:[`Set a column's `,(0,I.jsx)(n.code,{children:`aggregate`}),` to show a calculated value in the footer. The built-in aggregations are `,(0,I.jsx)(n.code,{children:`sum`}),`, `,(0,I.jsx)(n.code,{children:`mean`}),`, `,(0,I.jsx)(n.code,{children:`median`}),`, `,(0,I.jsx)(n.code,{children:`min`}),`,
`,(0,I.jsx)(n.code,{children:`max`}),`, `,(0,I.jsx)(n.code,{children:`extent`}),`, `,(0,I.jsx)(n.code,{children:`count`}),`, `,(0,I.jsx)(n.code,{children:`uniqueCount`}),`, `,(0,I.jsx)(n.code,{children:`unique`}),`, `,(0,I.jsx)(n.code,{children:`first`}),` and `,(0,I.jsx)(n.code,{children:`last`}),`. The aggregates are calculated over the filtered rows.`]}),`
`,(0,I.jsx)(a,{of:C}),`
`,(0,I.jsx)(n.h2,{id:`column-renaming`,children:`Column Renaming`}),`
`,(0,I.jsx)(a,{of:p}),`
`,(0,I.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,I.jsx)(l,{})]})}function F(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,I.jsx)(n,{...e,children:(0,I.jsx)(P,{...e})}):P(e)}var I;function L(){return(L=e((()=>{I=r(),n(),i(),c(),j()})))()}L();export{F as default};