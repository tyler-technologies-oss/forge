import{j as e,M as s,T as a,C as o}from"./blocks-D4ub_yPT.js";import{useMDXComponents as n}from"./index-DxBq2O4s.js";import{C as l}from"./CustomArgTypes-C94KCKJE.js";import{C as d,D as p,W as c}from"./ChipField.stories-BkaHmB06.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-C59kGrZS.js";import"./utils-C8r5kb6v.js";import"./style-map-DGTSLoBI.js";import"./directive-jorct-Oe.js";import"./ref-BmV7t-_C.js";import"./service-adapter-CffG5Lhq.js";import"./autocomplete-EWepZoEN.js";import"./base-component-DX3NI00Q.js";import"./feature-detection-eeAKFJs_.js";import"./base-adapter-B0TZVCzP.js";import"./tyler-icons-B0WPf66k.js";import"./index-DTwfV0k0.js";import"./divider-DtS4IZ9-.js";import"./linear-progress-CsYLd0m5.js";import"./with-default-aria-BRt53Z3x.js";import"./a11y-utils-TtXB9tdK.js";import"./list-W62pTBYF.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-u9rLNX9t.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-CcblENpV.js";import"./property-D9G_9Yqv.js";import"./base-lit-element-IG0MuGvj.js";import"./list-dropdown-aware-core-p82-A-VW.js";import"./list-dropdown-e2VvWR5C.js";import"./event-utils-C1SDeUaq.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./with-longpress-listener-BrDMZc2j.js";import"./dismissible-stack-CFeZREPK.js";import"./skeleton-DllEP8un.js";import"./a11y-BxM9_46k.js";import"./text-field-HwCw5WeW.js";import"./base-field-B_OzG14Y.js";import"./label-BeqvASeS.js";import"./button-CJiBebGB.js";import"./base-button-core-B-OVNsg6.js";import"./with-label-aware-CY27dNzM.js";import"./button-toggle-group-D5W7BKmk.js";import"./with-form-associated-PGX6jmWi.js";import"./checkbox-MvCMF9O-.js";import"./icon-button-DlkFfYJR.js";import"./switch-CAkpXHuZ.js";import"./tooltip-D8ywo7jr.js";import"./chip-set-3q_ww13H.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:c}),`
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
`]})]})}function de(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{de as default};
