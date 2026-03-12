import{j as e,M as s,T as a,C as o}from"./blocks-I0BN1K0k.js";import{useMDXComponents as n}from"./index-BeyQyiNF.js";import{C as l}from"./CustomArgTypes-BEo72cfI.js";import{C as p,D as d,W as c}from"./ChipField.stories-CXWRgUXi.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-B9Mn3MTF.js";import"./utils-Dr8ZxV_m.js";import"./style-map-CVgFEsOJ.js";import"./directive-jorct-Oe.js";import"./ref-BNYyBmpP.js";import"./base-lit-element-BV-NU-5y.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-DPmkfLd7.js";import"./base-component-CO2WY6zR.js";import"./dom-utils-DwwuHIHk.js";import"./utils-BAu2K3HG.js";import"./base-adapter-D5-g7qkF.js";import"./tyler-icons-Cfjef8Hp.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-BhCygk1f.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-C9rKJPwB.js";import"./with-default-aria-DAVgwKPN.js";import"./a11y-utils-DMBxzGbw.js";import"./list-DpG-mQpV.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D0SSeJ16.js";import"./focus-indicator-CYJ4ta_a.js";import"./list-dropdown-aware-core-DIgGejSB.js";import"./list-dropdown-pMpgS4V2.js";import"./event-utils-C1SDeUaq.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-7bCDpj6R.js";import"./a11y-BxM9_46k.js";import"./text-field-DluAQgMq.js";import"./base-field-B7MphIDB.js";import"./label-Dxps7CO4.js";import"./button-4-N4P9ye.js";import"./base-button-core-BfPfdeML.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-84yse_00.js";import"./with-form-associated-CEg80Bzz.js";import"./checkbox-T1_XI6FM.js";import"./icon-button-2xWdivGS.js";import"./switch-9JcCyNt4.js";import"./tooltip-P-CrpSEv.js";import"./chip-set-YJ14PC_u.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
