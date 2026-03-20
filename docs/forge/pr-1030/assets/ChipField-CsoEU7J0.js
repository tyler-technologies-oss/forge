import{j as e,M as s,T as a,C as o}from"./blocks-BdW-JRDP.js";import{useMDXComponents as n}from"./index-BnTRphRj.js";import{C as l}from"./CustomArgTypes-QtILoSqP.js";import{C as p,D as d,W as c}from"./ChipField.stories-aCi3ZZW0.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Asho65FF.js";import"./utils-BnVlj7nJ.js";import"./style-map-DdwerjMx.js";import"./directive-jorct-Oe.js";import"./ref-CxOg43zT.js";import"./base-lit-element-D-61VVdk.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-Dq3xdvGW.js";import"./base-component-DL0YqY-6.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-BZsNucGb.js";import"./tyler-icons-DVioSIZH.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-C9TQBd92.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-DP1CUIRM.js";import"./with-default-aria-DIbVfoWG.js";import"./a11y-utils-5_BtrjMB.js";import"./list-u-aXIwek.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-CK5iHsfr.js";import"./focus-indicator-DztOJIuF.js";import"./list-dropdown-aware-core-W5KFKwGT.js";import"./list-dropdown-DkirfKiF.js";import"./event-utils-C1SDeUaq.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-DtujUGDy.js";import"./a11y-BxM9_46k.js";import"./text-field-BK9kW_r2.js";import"./base-field-Dy3mMKxM.js";import"./label-BlALC_Py.js";import"./button-Bfaok-Rq.js";import"./base-button-core-C5h74KHs.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-Dm7qf12n.js";import"./with-form-associated-C0Ge4dkG.js";import"./checkbox-CFFoZkK0.js";import"./icon-button-qfTNvDaF.js";import"./switch-QL4gUCy-.js";import"./tooltip-C_eok51I.js";import"./chip-set-C4JUB-Fo.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:d}),`
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
`]})]})}function me(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{me as default};
