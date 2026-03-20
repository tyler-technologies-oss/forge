import{j as e,M as s,T as a,C as o}from"./blocks-CWoHgLAF.js";import{useMDXComponents as n}from"./index-BPwPoCnf.js";import{C as l}from"./CustomArgTypes-D1w1GklQ.js";import{C as p,D as d,W as c}from"./ChipField.stories-BAoUzTUz.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-i7EfaxWb.js";import"./utils-BnVlj7nJ.js";import"./style-map-6WUpEBVp.js";import"./directive-jorct-Oe.js";import"./ref-DPacPhkY.js";import"./base-lit-element-DKhpB9Dj.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-Dc_Mr1ZR.js";import"./base-component-DL0YqY-6.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-BZsNucGb.js";import"./tyler-icons-CEYO8wS0.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-BC-oTkGr.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-DP1CUIRM.js";import"./with-default-aria-DIbVfoWG.js";import"./a11y-utils-5_BtrjMB.js";import"./list-C0gUFmp0.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-CK5iHsfr.js";import"./focus-indicator-BRH0wIUg.js";import"./list-dropdown-aware-core-CGIyMtu9.js";import"./list-dropdown-CZMSG6Ms.js";import"./event-utils-C1SDeUaq.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-DtujUGDy.js";import"./a11y-BxM9_46k.js";import"./text-field-BpTk0Gli.js";import"./base-field-DCd2jOV_.js";import"./label-B9WHx3Cm.js";import"./button-CnDgXLC2.js";import"./base-button-core-C_VRfNPO.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-YC3LFCAo.js";import"./with-form-associated-C0Ge4dkG.js";import"./checkbox-wDBbk7Bn.js";import"./icon-button-FxLtxm1R.js";import"./switch-CEVlZ-s7.js";import"./tooltip-C_eok51I.js";import"./chip-set-CMPo06Nt.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
