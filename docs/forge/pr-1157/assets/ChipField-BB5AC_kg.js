import{u as s,j as e,M as n,T as a,C as o}from"./blocks-WBMqB3dw.js";import{C as l}from"./CustomArgTypes-D6797DrT.js";import{C as p,D as d,W as c}from"./ChipField.stories-Dxim57YC.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-B1NHwC0_.js";import"./utils-BzaDkCLg.js";import"./style-map-BMTxmd4x.js";import"./directive-jorct-Oe.js";import"./ref-D5o3ouzE.js";import"./base-lit-element-Hjfzuoth.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-EtciugmD.js";import"./base-component-CjLGUkBU.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-CWZvffxF.js";import"./tyler-icons-C6cWHI1A.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-1b50YxJD.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-BmTkV8LG.js";import"./with-default-aria-CU1tsccO.js";import"./a11y-utils-Cc0M_rsz.js";import"./list-CifI-izk.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-B-p_OOit.js";import"./focus-indicator-BsYlmvD4.js";import"./list-dropdown-aware-core-CWwgPMLl.js";import"./list-dropdown-q7CiwWEX.js";import"./event-utils-C1SDeUaq.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-D_iZGXuR.js";import"./a11y-BxM9_46k.js";import"./text-field-orEQl3Wg.js";import"./base-field-Cu9APC8D.js";import"./label-CuTyvnbB.js";import"./button-CLrzbLUD.js";import"./base-button-core-BDEyRDqg.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-CY1bqjfd.js";import"./with-form-associated-Cz_4VqQM.js";import"./checkbox-DYjZE3fs.js";import"./icon-button-srYMMv1X.js";import"./switch-DUtY78dW.js";import"./tooltip-BDO8tOZg.js";import"./chip-set-6RmtjtRa.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
`]})]})}function ce(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ce as default};
