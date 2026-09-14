import{u as s,j as e,M as n,T as a,C as o}from"./blocks-BgtMngCL.js";import{C as l}from"./CustomArgTypes-CKCySg6G.js";import{C as p,D as d,W as c}from"./ChipField.stories-Bf6hiyxk.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BJPqycEt.js";import"./utils-CRT-IimF.js";import"./style-map-DHKItbxO.js";import"./directive-CwRn8Fwj.js";import"./ref-sYcdSB-8.js";import"./base-lit-element-CQG-AtY-.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-B0fQFgbw.js";import"./base-component-BoZ3BOE8.js";import"./utils-C1mY2kke.js";import"./base-adapter-CKKMXnbe.js";import"./dom-utils-QqrulHvL.js";import"./tyler-icons-DNkpPon9.js";import"./constants-Bh7MAe75.js";import"./feature-detection-DY5_mT0R.js";import"./divider-BafjqDBo.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-C6Yw2NU-.js";import"./with-default-aria-DABKcY2o.js";import"./a11y-utils-BgIwxT0N.js";import"./list-DgxEhhpR.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BUK1_NC2.js";import"./focus-indicator-DFu3RSBr.js";import"./list-dropdown-aware-core-BdzIaC-Z.js";import"./list-dropdown-Dq-uc9wy.js";import"./event-utils-C1SDeUaq.js";import"./popover-DmcVXRTb.js";import"./overlay-Dzu_blL_.js";import"./with-longpress-listener-Btjqfhxk.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-PcZLAGQ_.js";import"./a11y-BxM9_46k.js";import"./text-field-ClU7jdd4.js";import"./base-field-BraIRaqt.js";import"./label-iiA2WfmW.js";import"./button-constants-CcgnJViY.js";import"./button-toggle-group-constants-CKL7Htsw.js";import"./checkbox-constants-CFwsuRRE.js";import"./icon-button-constants-DAKzMzQw.js";import"./switch-constants-BjjMpZKZ.js";import"./with-label-aware-BsHeQvUJ.js";import"./icon-button-BZVzCxro.js";import"./base-button-core-ClXD_I1p.js";import"./tooltip-2qibAw6I.js";import"./chip-set-BGTK1FJM.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
