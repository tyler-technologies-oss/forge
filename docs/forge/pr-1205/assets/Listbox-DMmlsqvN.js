import{u as n,j as e,M as l,T as r,C as o}from"./blocks-g3JYf6KR.js";import{C as d}from"./CustomArgTypes-CpxwWQaS.js";import{L as c,D as h,M as a,a as x,b as p,W as j,R as b,c as f}from"./Listbox.stories-ozXmtpXJ.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CdbO8ZWL.js";import"./utils-CjnDZgMw.js";import"./service-adapter-8tADcN_b.js";import"./tyler-icons-CP3IuoxV.js";import"./utils-CjYv_z18.js";import"./base-lit-element-C3hu__mR.js";import"./directive-CwRn8Fwj.js";import"./constants-B0fflZN8.js";import"./feature-detection-DY5_mT0R.js";import"./style-map-GYvMt1fF.js";import"./option-group-BPrct8lp.js";import"./consume-C-3suYJo.js";import"./state-DRVGkA82.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./class-map-B443CMvP.js";import"./a11y-utils-CFmkCOLc.js";import"./dom-utils-D0uG6d5z.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-CP_rFuyY.js";import"./state-layer-BkRErCgp.js";import"./base-component-DdGiO9ZD.js";import"./base-adapter-CbRstNNQ.js";import"./event-utils-zQ4FLDwK.js";import"./focus-group-BBuA2mQJ.js";import"./key-action-lsAysfb-.js";import"./card-Cd5hCNYZ.js";function i(s){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"Listboxes allow users to select one or more options from a list."}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(t.h2,{id:"multiple-selection",children:"Multiple Selection"}),`
`,e.jsxs(t.p,{children:["Set ",e.jsx(t.code,{children:"multiple"})," to allow more than one option to be selected at a time. When ",e.jsx(t.code,{children:"multiple"}),` is set, the
`,e.jsx(t.code,{children:"value"})," property contains an array of selected values."]}),`
`,e.jsx(o,{of:a}),`
`,e.jsx(t.h2,{id:"dense",children:"Dense"}),`
`,e.jsxs(t.p,{children:["Set ",e.jsx(t.code,{children:"dense"})," for a compact listbox."]}),`
`,e.jsx(o,{of:x}),`
`,e.jsx(t.h2,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(t.p,{children:["Individual options can be disabled by setting ",e.jsx(t.code,{children:"disabled"})," directly on a ",e.jsx(t.code,{children:"<forge-option>"}),` element.
Disabled options cannot be selected, and are skipped when navigating with the keyboard.`]}),`
`,e.jsxs(t.p,{children:["To disable the entire listbox, set ",e.jsx(t.code,{children:"disabled"})," on the ",e.jsx(t.code,{children:"<forge-listbox>"})," element instead."]}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(t.h2,{id:"option-groups",children:"Option Groups"}),`
`,e.jsxs(t.p,{children:[`Related options can be grouped together with a label by using the
`,e.jsx(t.a,{href:"?path=/docs/components-option--docs",children:"<forge-option-group>"}),` component. Provide the group's
label via the `,e.jsx(t.code,{children:"label"})," slot."]}),`
`,e.jsx(o,{of:j}),`
`,e.jsx(t.h2,{id:"reordering",children:"Reordering"}),`
`,e.jsxs(t.p,{children:["Set ",e.jsx(t.code,{children:"reorderable"}),` to allow options to be reordered within the listbox via drag and drop. Dropped
options are not automatically rearranged in the listbox. You'll need to use information provided in
the `,e.jsx(t.code,{children:"forge-listbox-drop"})," event to rearrange the DOM elements via your own script."]}),`
`,e.jsx(o,{of:b}),`
`,e.jsx(t.h2,{id:"dragging-between-listboxes",children:"Dragging Between Listboxes"}),`
`,e.jsxs(t.p,{children:["Options can be dragged from one listbox to another. Set ",e.jsx(t.code,{children:"drag-out"}),` on the source listbox and
`,e.jsx(t.code,{children:"drop-from"})," on the target listbox with a space-separated list of the source listbox ",e.jsx(t.code,{children:"id"}),`s that
are allowed to drop into it.`]}),`
`,e.jsxs(t.p,{children:["When an option is dropped, the target listbox dispatches a ",e.jsx(t.code,{children:"forge-listbox-drop"}),` event and the
source listbox dispatches a `,e.jsx(t.code,{children:"forge-listbox-drag-out"})," event."]}),`
`,e.jsx(o,{of:f}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(t.h2,{id:"keyboard-shortcuts",children:"Keyboard Shortcuts"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Name"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"arrow up / arrow down"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Moves focus to the previous/next option, wrapping at the ends."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"home"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Moves focus to the first option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"end"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Moves focus to the last option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"space / enter"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects the focused option."})]})]})]}),`
`,e.jsx(t.h3,{id:"multiple-selection-1",children:"Multiple Selection"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Name"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"ctrl/cmd + a"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects all options."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"shift + arrow up"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Moves focus to and toggles selection of the previous option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"shift + arrow down"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Moves focus to and toggles selection of the next option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"shift + space"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects all options between the last selected option and the focused option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"ctrl/cmd + shift + home"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects all options between the focused option and the first option. Moves focus to the first option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"ctrl/cmd + shift + end"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects all options between the focused option and the last option. Moves focus to the last option."})]})]})]}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The listbox automatically applies the ",e.jsx(t.code,{children:"listbox"}),` role, along with the appropriate
`,e.jsx(t.code,{children:"aria-multiselectable"}),", ",e.jsx(t.code,{children:"aria-disabled"}),", and ",e.jsx(t.code,{children:"aria-readonly"}),` attributes based on its current
state.`]}),`
`,e.jsxs(t.li,{children:["Ensure that the listbox is labelled with a visible label or an ",e.jsx(t.code,{children:"aria-label"})," or ",e.jsx(t.code,{children:"aria-labelledby"}),`
attribute.`]}),`
`,e.jsx(t.li,{children:`If a listbox allows options to be reordered or moved to another listbox, ensure that the
functionality is available without requiring users to drag and drop options. As an example, you
may provide clearly labeled buttons alongside the listbox to shift a selected option up or down,
or to move it to another listbox.`}),`
`]})]})}function Q(s={}){const{wrapper:t}={...n(),...s.components};return t?e.jsx(t,{...s,children:e.jsx(i,{...s})}):i(s)}export{Q as default};
