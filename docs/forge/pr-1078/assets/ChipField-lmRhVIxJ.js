import{j as e,M as s,T as a,C as o}from"./blocks-BGXNjPUL.js";import{useMDXComponents as n}from"./index-C9aBCO2c.js";import{C as l}from"./CustomArgTypes-DKQaY4X4.js";import{C as p,D as d,W as c}from"./ChipField.stories-CT777XsF.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-6jvvl83j.js";import"./utils-BQsOXphk.js";import"./style-map-OsH3dYIv.js";import"./directive-jorct-Oe.js";import"./ref-CcO1L0WB.js";import"./service-adapter-CoGDs2_3.js";import"./autocomplete-DcNQ85oY.js";import"./base-component-B5xZY7DP.js";import"./dom-utils-CBD4z_3d.js";import"./feature-detection-DBnB2p_f.js";import"./base-adapter-DZ7lVcI0.js";import"./tyler-icons-_ZRRE207.js";import"./base-lit-element-DuNePglZ.js";import"./constants-uy-3DCWv.js";import"./divider-B_OILhdX.js";import"./linear-progress-DAF_c_Qg.js";import"./with-default-aria-qCwd8R18.js";import"./a11y-utils-OON17uxD.js";import"./list-n8XxbbWm.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-CDycYdPe.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-uWMef9QC.js";import"./list-dropdown-aware-core-C_SgFd9S.js";import"./list-dropdown-CYOM7X8_.js";import"./event-utils-C1SDeUaq.js";import"./popover-DVUMrAH6.js";import"./overlay-CeKA2Vs0.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-CURrVc38.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-BEzRyBrd.js";import"./a11y-BxM9_46k.js";import"./text-field-DRhXxEw0.js";import"./base-field-Zo4to8fb.js";import"./label-DeJt3_F9.js";import"./button-gG20MWYF.js";import"./base-button-core-l79ZJf1a.js";import"./with-label-aware-rB4nYfN7.js";import"./button-toggle-group-BEE-9owA.js";import"./with-form-associated-FNJFgCdg.js";import"./checkbox-C-zSna6d.js";import"./icon-button-Bs31_lcM.js";import"./switch-DDhwKpy9.js";import"./tooltip-D6IG9xiN.js";import"./chip-set-BnlBtPoY.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function ce(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ce as default};
