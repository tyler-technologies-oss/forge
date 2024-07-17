import{j as e}from"./jsx-runtime-KvxOeJA1.js";import{u as s}from"./index-DfxnnCCN.js";import{M as n,T as a,C as o}from"./index-DyZB1HIv.js";import{C as l}from"./CustomArgTypes-BZo0685U.js";import{C as p,D as d,W as m}from"./ChipField.stories-Bha9OUo7.js";import"./iframe-csYPrapo.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-BJOK626P.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./ref-BorTy8X1.js";import"./directive-helpers-DYUueT8w.js";import"./constants-DjE6emXm.js";import"./autocomplete-xfn9Jt5Y.js";import"./base-adapter-F7QHxK2H.js";import"./index-CIZ3m0iD.js";import"./divider-V8nRRqMS.js";import"./icon-DjINFoyU.js";import"./index-Dh0vMUMR.js";import"./linear-progress-CVy9jv9h.js";import"./with-default-aria-B4PYKb3X.js";import"./list-D6JyyFFB.js";import"./state-layer-D8bHAvjj.js";import"./focus-indicator-BPFZRBe9.js";import"./list-dropdown-aware-core-UCywCe51.js";import"./list-dropdown-DHieYSiY.js";import"./event-utils-C1SDeUaq.js";import"./popover-Cuxqrsc4.js";import"./overlay-CyEwb-fW.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DN8agUZv.js";import"./skeleton-yxWgwnDD.js";import"./a11y-BxM9_46k.js";import"./text-field-RvdQEqTJ.js";import"./base-field-DI05trcI.js";import"./label-u49DyhbP.js";import"./button-BZEZMHKM.js";import"./base-button-adapter-hYZsLwCN.js";import"./with-label-aware-CLWydNrR.js";import"./button-toggle-group-CVRZEG3N.js";import"./with-form-associated-w46sHrbT.js";import"./checkbox-an-Xb1xB.js";import"./icon-button-B2LQlK1e.js";import"./switch-CiP8pWu1.js";import"./tooltip-9A6XBLdW.js";import"./chip-set-DIrRrxj7.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Add an ",e.jsx(i.code,{children:"id"})," to your ",e.jsx(i.code,{children:"<input>"})," element and bind it to your ",e.jsx(i.code,{children:"<label>"})," element using the for attribute on the ",e.jsx(i.code,{children:"<label>"}),"."]}),`
`,e.jsxs(i.li,{children:["Ensure that the chips that are added to the field have descriptive ",e.jsx(i.code,{children:"aria-label"})," or ",e.jsx(i.code,{children:"aria-labelledby"})," attributes."]}),`
`,e.jsxs(i.li,{children:["Make sure that the member chips that are added can be accessed via the keyboard left and right arrows.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"There should be a distinct visual cue that indicates which chip is focused"}),`
`]}),`
`]}),`
`,e.jsx(i.li,{children:"Similarly, make sure that when a chip is focused using the arrow keys, that the backspace and delete keys do remove them."}),`
`,e.jsx(i.li,{children:"Ensure that when disabled, the entire field as well as the member chips all appear visually and interactively disabled."}),`
`]})]})}function he(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{he as default};
