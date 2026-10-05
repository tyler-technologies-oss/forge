import{u as n,j as e,M as l,T as r,C as o}from"./blocks-CirCQbee.js";import{C as d}from"./CustomArgTypes-Dc8OxB10.js";import{L as c,D as a,M as h,a as x,b as p,W as j,R as m,c as b}from"./Listbox.stories-noHFp-cI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CF6N-kpB.js";import"./iframe-QHnGQDtP.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BRc3IP6u.js";import"./service-adapter-8tADcN_b.js";import"./icon-BWWEOavI.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-f3DW9gPR.js";import"./base-lit-element-CcRb-sAO.js";import"./async-directive-qle1HN31.js";import"./directive-CwRn8Fwj.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./tyler-icons-_o7MAz4c.js";import"./style-map-D69N4WVg.js";import"./listbox-qdfVdpZd.js";import"./provide-CZDhzwTe.js";import"./consume-DtITIqjN.js";import"./custom-element-C-crYl4r.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./event-utils-zQ4FLDwK.js";import"./focus-group-DCWcbOG8.js";import"./key-action-lsAysfb-.js";import"./utils-C31il88P.js";import"./option-Z4BKmanb.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./class-map-BTaYBOLy.js";import"./context-root-BrWOZWcP.js";import"./state-DY2-o1CP.js";import"./focus-indicator-Dgurg4EK.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./base-component-BFu9bkgC.js";import"./card-BMRDEp9B.js";function s(i){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"Listboxes allow users to select one or more options from a list."}),`
`,e.jsx(o,{of:a}),`
`,e.jsx(t.h2,{id:"multiple-selection",children:"Multiple Selection"}),`
`,e.jsxs(t.p,{children:["Set ",e.jsx(t.code,{children:"multiple"})," to allow more than one option to be selected at a time. When ",e.jsx(t.code,{children:"multiple"}),` is set, the
`,e.jsx(t.code,{children:"value"})," property contains an array of selected values."]}),`
`,e.jsx(o,{of:h}),`
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
`,e.jsx(t.p,{children:`When reordering is enabled, be sure to also include buttons alongside the listbox to allow users to
accessibly reorder the options without relying solely on drag and drop.`}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(t.h2,{id:"dragging-between-listboxes",children:"Dragging Between Listboxes"}),`
`,e.jsxs(t.p,{children:["Options can be dragged from one listbox to another. Both listboxes must opt in: set ",e.jsx(t.code,{children:"drag-link"}),` on
the source listbox with a space-separated list of target listbox `,e.jsx(t.code,{children:"id"}),`s that it's allowed to drop
into, and set `,e.jsx(t.code,{children:"drop-link"}),` on the target listbox with a space-separated list of source listbox
`,e.jsx(t.code,{children:"id"}),"s that are allowed to drop into it."]}),`
`,e.jsxs(t.p,{children:["When an option is dropped, the target listbox dispatches a ",e.jsx(t.code,{children:"forge-listbox-drop"}),` event and the
source listbox dispatches a `,e.jsx(t.code,{children:"forge-listbox-drag-out"})," event."]}),`
`,e.jsx(o,{of:b}),`
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
`]})]})}function ce(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(s,{...i})}):s(i)}export{ce as default};
