import{j as e,M as s,T as a,C as o}from"./blocks-B6y53uqq.js";import{useMDXComponents as n}from"./index-Iq9ILhej.js";import{C as l}from"./CustomArgTypes-DEqu4UWS.js";import{C as p,D as d,W as c}from"./ChipField.stories-DcVqLwGs.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-HlIX8nsI.js";import"./utils-DhPatzMP.js";import"./style-map-CJVXeR4e.js";import"./directive-jorct-Oe.js";import"./ref-DHmNwni-.js";import"./base-lit-element-_81_THYZ.js";import"./service-adapter-CoGDs2_3.js";import"./autocomplete-Czj5S6PY.js";import"./base-component-VHVExFFl.js";import"./dom-utils-DrFTp_YE.js";import"./base-adapter-Bv1ZGQ1S.js";import"./tyler-icons-B1nAV5VC.js";import"./index-DTwfV0k0.js";import"./constants-d60dfpEV.js";import"./feature-detection-DlorGArm.js";import"./divider-DhuFTWtL.js";import"./utils-DU-9AqTO.js";import"./linear-progress-Buvtsnzw.js";import"./with-default-aria-DhENBwsq.js";import"./a11y-utils-BAVI_s0s.js";import"./list-2JCez8nQ.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-DNIS1N8s.js";import"./focus-indicator-DO-4oH1N.js";import"./list-dropdown-aware-core-DlIijfmL.js";import"./list-dropdown-B5G69bZ5.js";import"./event-utils-C1SDeUaq.js";import"./popover-OppO9jQP.js";import"./overlay-CKBuRB0A.js";import"./with-longpress-listener-v9rKrqen.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-D4yo0sfy.js";import"./a11y-BxM9_46k.js";import"./text-field-DXuIdBiY.js";import"./base-field-BqEaAztZ.js";import"./label-YoDu1hYe.js";import"./button-C32nRzKT.js";import"./base-button-core-P_-z6ImB.js";import"./with-label-aware-DpjVJhjv.js";import"./button-toggle-group-C7Z2oquR.js";import"./with-form-associated-5ixz8BLc.js";import"./checkbox-IEt9rg4t.js";import"./icon-button-kXhWo8t5.js";import"./switch-D4m-nLTp.js";import"./tooltip-CfnSp6nA.js";import"./chip-set-BvTqyg0d.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function de(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{de as default};
