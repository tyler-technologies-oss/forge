import{j as e,M as s,T as a,C as o}from"./blocks-DMVEWOyl.js";import{useMDXComponents as n}from"./index-LGoYPsEU.js";import{C as l}from"./CustomArgTypes-D2eQa72R.js";import{C as p,D as d,W as c}from"./ChipField.stories-DCdu6xrf.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-C07_izNT.js";import"./utils-B3m7KQiq.js";import"./style-map-DKtD9blK.js";import"./directive-jorct-Oe.js";import"./ref-CW9FHhmW.js";import"./base-lit-element-Bqgryvb_.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-CI7Bh8Zy.js";import"./base-component-DKBBFC2R.js";import"./dom-utils-DBb1ZGPZ.js";import"./base-adapter-Ca-TK4Oz.js";import"./tyler-icons-fP-z9z1i.js";import"./index-DTwfV0k0.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-BUGsg7NB.js";import"./utils-DU-9AqTO.js";import"./linear-progress-g34J3BlM.js";import"./with-default-aria-QS4QwZJb.js";import"./a11y-utils-ZQk7jpnB.js";import"./list-D_-uWQM4.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BsCfz34t.js";import"./focus-indicator-CXn9rWMK.js";import"./list-dropdown-aware-core-sAc772-s.js";import"./list-dropdown-DS-QcN3u.js";import"./event-utils-C1SDeUaq.js";import"./popover-DSGvC3fA.js";import"./overlay-Bcsgewax.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-C_yfi0NG.js";import"./a11y-BxM9_46k.js";import"./text-field-BXpA3LZ6.js";import"./base-field-CEekToEX.js";import"./label-C6FUeE-w.js";import"./button-BHFcZZh0.js";import"./base-button-core-DZQiiZ0T.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-fHeSNXzP.js";import"./with-form-associated-nT7v4ZFs.js";import"./checkbox-gX6kE-qO.js";import"./icon-button-DM1nATYu.js";import"./switch-CK2cqgnY.js";import"./tooltip-D8EeGsiQ.js";import"./chip-set-BdyeEYKz.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
